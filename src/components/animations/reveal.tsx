"use client";

import { useRef, type ReactNode } from "react";
import { MOTION, gsap, useGSAP } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol" | "section" | "article";
  /** CSS selector for items to animate. Defaults to direct children. */
  selector?: string;
  y?: number;
  stagger?: number;
  delay?: number;
  start?: string;
  /** Adds a subtle scale-in (used for imagery). */
  scale?: boolean;
};

/** Fades and lifts its items into view once, when the group enters the viewport. */
export function Reveal({
  children,
  className,
  as: Tag = "div",
  selector,
  y = 24,
  stagger = 0.08,
  delay = 0,
  start = "top 85%",
  scale = false,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const targets = selector ? root.querySelectorAll(selector) : root.children;
      if (!targets.length) return;

      const mm = gsap.matchMedia();
      mm.add({ desktop: MOTION.desktop, mobile: MOTION.mobile }, (context) => {
        const { desktop } = context.conditions as { desktop: boolean };
        gsap.from(targets, {
          autoAlpha: 0,
          y: desktop ? y : y * 0.5,
          scale: scale ? 0.96 : 1,
          duration: desktop ? 0.85 : 0.6,
          stagger: desktop ? stagger : stagger * 0.5,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start, once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    // The ref type is narrowed by Tag at runtime; all options are HTMLElements.
    <Tag ref={ref as React.Ref<never>} className={className}>
      {children}
    </Tag>
  );
}
