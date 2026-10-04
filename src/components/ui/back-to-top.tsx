"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setVisible(window.scrollY > window.innerHeight * 1.2);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    document.getElementById("main-content")?.focus({ preventScroll: true });
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={cn(
        "fixed bottom-5 right-5 z-40 grid size-11 place-items-center rounded-full border border-border-strong bg-surface/90 text-muted-foreground shadow-soft backdrop-blur transition-[opacity,transform,color] duration-300 hover:text-foreground sm:bottom-8 sm:right-8",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <ArrowUp className="size-4" aria-hidden="true" />
    </button>
  );
}
