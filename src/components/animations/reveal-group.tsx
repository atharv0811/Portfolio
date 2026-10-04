"use client";

import { useRef, type ReactNode } from "react";
import { MOTION, ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";

/**
 * Reveals every `[data-reveal]` descendant as it enters the viewport, batching
 * elements that arrive together. Suited to long pages such as case studies,
 * where one wrapper replaces dozens of individual animation components.
 */
export function RevealGroup({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = ref.current?.querySelectorAll<HTMLElement>("[data-reveal]");
      if (!items?.length) return;

      const mm = gsap.matchMedia();
      mm.add({ desktop: MOTION.desktop, mobile: MOTION.mobile }, (context) => {
        const { desktop } = context.conditions as { desktop: boolean };
        const distance = desktop ? 20 : 12;
        gsap.set(items, { autoAlpha: 0, y: distance });

        ScrollTrigger.batch(items, {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: desktop ? 0.8 : 0.6,
              stagger: desktop ? 0.08 : 0.05,
              ease: "power3.out",
              overwrite: true,
            }),
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
