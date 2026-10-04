"use client";

import { useRef, type ReactNode } from "react";
import { MOTION, gsap, useGSAP } from "@/lib/gsap";

/**
 * Scroll reveal + hover choreography for a project card.
 * Reveal: the media frame scales from 0.96 and the text stack fades up.
 * Hover (fine pointers only): image eases in and lifts, arrow travels, overlay and metadata shift.
 */
export function ProjectCardMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const card = ref.current;
      if (!card) return;
      const q = gsap.utils.selector(card);
      const mm = gsap.matchMedia();

      mm.add({ desktop: MOTION.desktop, mobile: MOTION.mobile }, (context) => {
        const { desktop } = context.conditions as { desktop: boolean };
        const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: "top 82%", once: true } });
        tl.from(q("[data-reveal-media]"), {
          scale: desktop ? 0.96 : 0.98,
          autoAlpha: 0,
          duration: desktop ? 1.1 : 0.8,
          ease: "expo.out",
        }).from(
          q("[data-reveal-text]"),
          { y: desktop ? 16 : 10, autoAlpha: 0, duration: 0.7, stagger: desktop ? 0.07 : 0.04, ease: "power3.out" },
          desktop ? 0.15 : 0.1,
        );
      });

      mm.add(MOTION.finePointer, () => {
        const ease = "power3.out";
        const enter = () => {
          gsap.to(q("[data-hover-image]"), { scale: 1.035, y: -6, duration: 0.8, ease });
          gsap.to(q("[data-hover-arrow]"), { x: 3, y: -3, duration: 0.45, ease });
          gsap.to(q("[data-hover-overlay]"), { autoAlpha: 1, duration: 0.5, ease });
          gsap.to(q("[data-hover-meta]"), { x: 4, duration: 0.5, ease });
        };
        const leave = () => {
          gsap.to(q("[data-hover-image]"), { scale: 1, y: 0, duration: 0.9, ease });
          gsap.to(q("[data-hover-arrow]"), { x: 0, y: 0, duration: 0.45, ease });
          gsap.to(q("[data-hover-overlay]"), { autoAlpha: 0, duration: 0.5, ease });
          gsap.to(q("[data-hover-meta]"), { x: 0, duration: 0.5, ease });
        };

        card.addEventListener("mouseenter", enter);
        card.addEventListener("mouseleave", leave);
        card.addEventListener("focusin", enter);
        card.addEventListener("focusout", leave);
        return () => {
          card.removeEventListener("mouseenter", enter);
          card.removeEventListener("mouseleave", leave);
          card.removeEventListener("focusin", enter);
          card.removeEventListener("focusout", leave);
        };
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <article ref={ref} className={className}>
      {children}
    </article>
  );
}
