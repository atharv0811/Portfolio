"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ButtonArrow, ButtonLink } from "@/components/ui/button";
import { SocialLinks } from "@/components/ui/social-links";
import { navItems, siteConfig } from "@/data/site-config";
import { MOTION, gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "./theme-switcher";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  activeSection: string | null;
};

export function MobileMenu({ open, onClose, activeSection }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      timeline.current = gsap
        .timeline({ paused: true })
        .fromTo(panelRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25, ease: "power2.out" })
        .from(
          "[data-menu-item]",
          { y: 18, autoAlpha: 0, duration: 0.45, stagger: 0.04, ease: "power3.out" },
          "-=0.1",
        );
    },
    { scope: panelRef },
  );

  // Play or reverse the timeline, and manage focus, scroll lock and background inertness.
  useEffect(() => {
    const tl = timeline.current;
    if (tl) {
      if (window.matchMedia(MOTION.reduced).matches) tl.progress(open ? 1 : 0).pause();
      else if (open) tl.timeScale(1).play();
      else tl.timeScale(1.6).reverse();
    }

    if (!open) return;

    const root = document.documentElement;
    const background = [document.getElementById("main-content"), document.getElementById("site-footer")];
    root.style.overflow = "hidden";
    background.forEach((element) => element?.setAttribute("inert", ""));
    // Wait for the panel to become visible; hidden elements can't receive focus.
    const focusTimer = window.setTimeout(() => panelRef.current?.querySelector<HTMLElement>("a, button")?.focus(), 80);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        document.getElementById("mobile-menu-toggle")?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      window.clearTimeout(focusTimer);
      root.style.overflow = "";
      background.forEach((element) => element?.removeAttribute("inert"));
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open, onClose]);

  return (
    <div
      ref={panelRef}
      id="mobile-menu"
      inert={!open}
      className="invisible fixed inset-0 z-40 flex flex-col overflow-y-auto bg-background pt-(--header-height) opacity-0 lg:hidden"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid opacity-60 mask-[linear-gradient(to_bottom,black,transparent_60%)]" />

      <nav aria-label="Mobile" className="container-page relative flex flex-1 flex-col pb-8 pt-6">
        <ul className="border-t border-border">
          {navItems.map((item, index) => {
            const active = activeSection === item.sectionId;
            return (
              <li key={item.sectionId} data-menu-item className="border-b border-border">
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={active ? "location" : undefined}
                  className="group flex items-center justify-between gap-4 py-4"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="w-6 font-mono text-xs text-subtle-foreground">0{index + 1}</span>
                    <span className={cn("text-[1.75rem] font-semibold tracking-[-0.03em]", !active && "text-muted-foreground")}>
                      {item.label}
                    </span>
                  </span>
                  {active ? (
                    <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
                  ) : (
                    <ArrowUpRight className="size-5 text-subtle-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div data-menu-item className="mt-8 grid gap-3 sm:grid-cols-2">
          <ButtonLink href="/#contact" size="lg" onClick={onClose}>
            Let&apos;s Work Together
            <ButtonArrow />
          </ButtonLink>
          <ButtonLink href={siteConfig.resume} variant="secondary" size="lg">
            Resume
          </ButtonLink>
        </div>

        <div data-menu-item className="mt-auto flex items-center justify-between gap-4 pt-10">
          <SocialLinks className="-ml-2.5" />
          <ThemeSwitcher size="lg" />
        </div>
        <p data-menu-item className="mt-6 flex items-center gap-2 text-caption text-subtle-foreground">
          <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
          {siteConfig.availability.label} · {siteConfig.location}
        </p>
      </nav>
    </div>
  );
}
