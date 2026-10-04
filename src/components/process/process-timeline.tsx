"use client";

import { useRef, type ReactNode } from "react";
import { MOTION, ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";

/**
 * Progressive timeline: the teal line is scrubbed with scroll, and each step's marker
 * switches to its active state as the step crosses the reading line.
 */
export function ProcessTimeline({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const steps = gsap.utils.toArray<HTMLElement>("[data-process-step]", root);

      // Marker state is not motion, so it applies even with reduced motion.
      steps.forEach((step) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 65%",
          toggleClass: { targets: step.querySelector("[data-process-marker]"), className: "is-active" },
        });
      });

      const mm = gsap.matchMedia();
      mm.add({ desktop: MOTION.desktop, mobile: MOTION.mobile }, (context) => {
        const { desktop } = context.conditions as { desktop: boolean };
        gsap.fromTo(
          root.querySelector("[data-process-progress]"),
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: root, start: "top 65%", end: "bottom 65%", scrub: 0.4 },
          },
        );
        steps.forEach((step) => {
          gsap.from(step.querySelectorAll("[data-process-content] > *"), {
            autoAlpha: 0,
            x: desktop ? 16 : 8,
            duration: 0.7,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: { trigger: step, start: "top 85%", once: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="relative">
      <span aria-hidden="true" className="absolute bottom-4 left-[15px] top-4 w-px bg-border-strong" />
      <span
        aria-hidden="true"
        data-process-progress
        className="absolute bottom-4 left-[15px] top-4 w-px origin-top bg-primary"
      />
      {children}
    </div>
  );
}
