import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Imported only from client components; registration is skipped during server rendering.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  gsap.defaults({ ease: "power3.out", duration: 0.7 });
}

/** Media queries shared by every gsap.matchMedia() call so motion rules stay consistent. */
export const MOTION = {
  desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
  finePointer: "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
} as const;

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia(MOTION.reduced).matches;
}

export { gsap, ScrollTrigger, useGSAP };
