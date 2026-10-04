"use client";

import { useRef, type ReactNode } from "react";
import { MOTION, gsap, useGSAP } from "@/lib/gsap";

/** Gentle scroll-linked vertical drift. Desktop only; disabled for reduced motion. */
export function Parallax({ children, className, distance = 32 }: { children: ReactNode; className?: string; distance?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION.desktop, () => {
        gsap.fromTo(
          ref.current,
          { y: distance / 2 },
          {
            y: -distance / 2,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 0.6 },
          },
        );
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
