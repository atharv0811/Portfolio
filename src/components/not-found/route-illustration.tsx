"use client";

import { useRef } from "react";
import { MOTION, gsap, useGSAP } from "@/lib/gsap";

/** A route that draws itself, misses its turn and stops at a dead end. */
export function RouteIllustration() {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const svg = ref.current;
      if (!svg) return;
      const path = svg.querySelector<SVGPathElement>("[data-route]");
      if (!path) return;
      const length = path.getTotalLength();

      const mm = gsap.matchMedia();
      mm.add(`${MOTION.desktop}, ${MOTION.mobile}`, () => {
        gsap
          .timeline({ delay: 0.2 })
          .fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" })
          .from("[data-start]", { scale: 0, transformOrigin: "center", duration: 0.4, ease: "back.out(2)" }, 0)
          .from("[data-end]", { scale: 0, autoAlpha: 0, transformOrigin: "center", duration: 0.5, ease: "power3.out" }, "-=0.2");
      });
      svg.classList.remove("is-pending");
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <svg ref={ref} viewBox="0 0 320 120" className="is-pending h-auto w-full max-w-sm" aria-hidden="true">
      <path
        d="M20 90 H 110 C 140 90, 140 40, 170 40 H 220 C 250 40, 252 72, 276 72"
        fill="none"
        stroke="var(--border-strong)"
        strokeWidth="1.5"
        strokeDasharray="4 6"
      />
      <path
        data-route
        data-animate
        d="M20 90 H 110 C 140 90, 140 40, 170 40 H 220 C 250 40, 252 72, 276 72"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle data-start data-animate cx="20" cy="90" r="6" fill="var(--primary)" />
      <g data-end data-animate>
        <circle cx="290" cy="72" r="12" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
        <path d="M285 67l10 10M295 67l-10 10" stroke="var(--accent)" strokeWidth="1.75" strokeLinecap="round" />
      </g>
    </svg>
  );
}
