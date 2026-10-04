"use client";

import { useRef } from "react";
import { MOTION, gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { SplitWords, type TextSegment } from "./split-words";

type HeadingTag = "h1" | "h2" | "h3";

type TextRevealProps = {
  as?: HeadingTag;
  /** Plain text, or segments when some words need different styling. */
  text: string | TextSegment[];
  className?: string;
  id?: string;
  /** Reveal on mount instead of when scrolled into view (for above-the-fold headings). */
  immediate?: boolean;
  delay?: number;
};

export function TextReveal({ as: Tag = "h2", text, className, id, immediate = false, delay = 0 }: TextRevealProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const segments = typeof text === "string" ? [{ text }] : text;

  useGSAP(
    () => {
      const words = ref.current?.querySelectorAll("[data-word]");
      if (!words?.length) return;

      const mm = gsap.matchMedia();
      mm.add({ desktop: MOTION.desktop, mobile: MOTION.mobile }, (context) => {
        const { desktop } = context.conditions as { desktop: boolean };
        gsap.from(words, {
          yPercent: 110,
          duration: desktop ? 0.9 : 0.7,
          stagger: desktop ? 0.04 : 0.025,
          ease: "power4.out",
          delay,
          scrollTrigger: immediate ? undefined : { trigger: ref.current, start: "top 88%", once: true },
        });
      });
      // From-states are now applied, so the CSS pre-hide can be lifted without a flash.
      ref.current?.classList.remove("is-pending");
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={cn("text-balance", immediate && "is-pending", className)}>
      <SplitWords segments={segments} />
    </Tag>
  );
}
