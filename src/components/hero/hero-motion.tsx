"use client";

import { useRef, type ReactNode } from "react";
import { MOTION, ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";

/**
 * Orchestrates the hero entrance, ambient float and pointer parallax.
 * Markup stays server-rendered; this wrapper only targets `data-hero*` attributes.
 */
export function HeroMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add({ desktop: MOTION.desktop, mobile: MOTION.mobile }, (context) => {
        const { desktop } = context.conditions as { desktop: boolean };
        const distance = desktop ? 1 : 0.6;
        const floats = q("[data-hero-float]");

        const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.1 });
        tl.from(q("[data-hero='badge']"), { y: 12 * distance, autoAlpha: 0, duration: 0.6 })
          .from(
            q("[data-hero='title'] [data-word]"),
            { yPercent: 110, duration: 0.95, stagger: desktop ? 0.035 : 0.02, ease: "power4.out" },
            "-=0.4",
          )
          .from(q("[data-hero='lead']"), { y: 16 * distance, autoAlpha: 0, duration: 0.7 }, "-=0.65")
          .from(q("[data-hero='cta'] > *"), { y: 14 * distance, autoAlpha: 0, stagger: 0.08, duration: 0.6 }, "-=0.5")
          .from(q("[data-hero='social']"), { autoAlpha: 0, duration: 0.6 }, "-=0.35")
          .from(
            q("[data-hero='visual']"),
            { y: 28 * distance, scale: 0.96, autoAlpha: 0, duration: 1.1, ease: "expo.out" },
            0.35,
          )
          .from(q("[data-hero-ui]"), { y: 8, autoAlpha: 0, stagger: 0.045, duration: 0.6 }, 0.7)
          .from(floats, { y: 16 * distance, scale: 0.94, autoAlpha: 0, stagger: 0.12, duration: 0.9, ease: "expo.out" }, 1);

        if (!desktop) return;

        // Slow ambient drift on the floating cards, paused whenever the hero is off-screen.
        const drift = floats.map((element, index) =>
          gsap.to(element, {
            y: "-=7",
            duration: 3.2 + index * 0.7,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            paused: true,
          }),
        );
        tl.call(() => drift.forEach((tween) => tween.play()));
        ScrollTrigger.create({
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => drift.forEach((tween) => (self.isActive && tl.progress() === 1 ? tween.play() : tween.pause())),
        });
      });

      // Separate block so a pointer-capability change never replays the entrance timeline.
      mm.add(`${MOTION.finePointer} and (min-width: 768px)`, () => {
        // Pointer parallax: deeper layers move further, creating a sense of depth.
        const layers = q("[data-depth]").map((element) => ({
          depth: Number(element.getAttribute("data-depth")) || 0,
          x: gsap.quickTo(element, "x", { duration: 0.9, ease: "power3.out" }),
          y: gsap.quickTo(element, "y", { duration: 0.9, ease: "power3.out" }),
        }));
        const onPointerMove = (event: PointerEvent) => {
          const nx = event.clientX / window.innerWidth - 0.5;
          const ny = event.clientY / window.innerHeight - 0.5;
          layers.forEach((layer) => {
            layer.x(nx * layer.depth * 16);
            layer.y(ny * layer.depth * 12);
          });
        };
        const onPointerLeave = () => layers.forEach((layer) => (layer.x(0), layer.y(0)));
        root.addEventListener("pointermove", onPointerMove);
        root.addEventListener("pointerleave", onPointerLeave);
        return () => {
          root.removeEventListener("pointermove", onPointerMove);
          root.removeEventListener("pointerleave", onPointerLeave);
        };
      });

      root.classList.remove("is-pending");
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`is-pending ${className ?? ""}`}>
      {children}
    </div>
  );
}
