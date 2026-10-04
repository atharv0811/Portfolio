"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { navItems, siteConfig } from "@/data/site-config";
import { MOTION, ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { ThemeSwitcher } from "./theme-switcher";

const SCROLL_THRESHOLD = 24;
const INDICATOR_BASE_WIDTH = 100;

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [homeSection, setHomeSection] = useState("top");
  const [menuOpen, setMenuOpen] = useState(false);

  const activeSection = isHome ? homeSection : pathname.startsWith("/work") ? "work" : null;

  const headerRef = useRef<HTMLElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const hasPositionedIndicator = useRef(false);

  // Entrance + condensed state on scroll. Only transforms and opacity are animated.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${MOTION.desktop}, ${MOTION.mobile}`, () => {
        gsap.from(shellRef.current, { y: -12, autoAlpha: 0, duration: 0.6, ease: "power2.out" });
      });
      headerRef.current?.classList.remove("is-pending");

      const setCondensed = (condensed: boolean, immediate = false) => {
        const duration = immediate ? 0 : 0.35;
        gsap.to(panelRef.current, {
          autoAlpha: condensed ? 1 : 0,
          scaleY: condensed ? 0.84 : 1,
          duration,
          ease: "power2.out",
          overwrite: "auto",
        });
        gsap.to(barRef.current, { y: condensed ? -6 : 0, duration, ease: "power2.out", overwrite: "auto" });
      };

      setCondensed(window.scrollY > SCROLL_THRESHOLD, true);
      ScrollTrigger.create({
        start: SCROLL_THRESHOLD,
        end: "max",
        // Compare the actual position: at the very bottom ("max") the trigger deactivates.
        onToggle: (self) => setCondensed(self.scroll() > SCROLL_THRESHOLD),
      });
      return () => mm.revert();
    },
    { scope: headerRef },
  );

  // Track which home section is in view.
  useGSAP(
    () => {
      if (!isHome) return;
      gsap.utils.toArray<HTMLElement>("[data-nav-section]").forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 45%",
          end: "bottom 45%",
          onToggle: (self) => {
            if (self.isActive && section.dataset.navSection) setHomeSection(section.dataset.navSection);
          },
        });
      });
    },
    { dependencies: [isHome], revertOnUpdate: true },
  );

  const positionIndicator = useCallback(
    (immediate = false) => {
      const list = listRef.current;
      const indicator = indicatorRef.current;
      if (!list || !indicator) return;
      const link = activeSection ? list.querySelector<HTMLElement>(`[data-section="${activeSection}"]`) : null;
      if (!link) {
        gsap.to(indicator, { autoAlpha: 0, duration: 0.2 });
        return;
      }
      const inset = 12;
      const x = link.offsetLeft + inset;
      const scaleX = (link.offsetWidth - inset * 2) / INDICATOR_BASE_WIDTH;
      const instant = immediate || !hasPositionedIndicator.current || window.matchMedia(MOTION.reduced).matches;
      gsap.to(indicator, { x, scaleX, autoAlpha: 1, duration: instant ? 0 : 0.45, ease: "power3.inOut", overwrite: true });
      hasPositionedIndicator.current = true;
    },
    [activeSection],
  );

  useEffect(() => {
    positionIndicator();
    const onResize = () => positionIndicator(true);
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(() => positionIndicator(true));
    return () => window.removeEventListener("resize", onResize);
  }, [positionIndicator]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header ref={headerRef} className="is-pending fixed inset-x-0 top-0 z-50 h-[var(--header-height)]">
        <div ref={shellRef} data-animate className="relative h-full">
          <div
            ref={panelRef}
            aria-hidden="true"
            className="invisible absolute inset-0 origin-top border-b border-border bg-background/80 opacity-0 backdrop-blur-xl backdrop-saturate-150"
          />
          <div ref={barRef} className="container-page relative flex h-full items-center justify-between gap-6">
            <Logo onClick={closeMenu} />

            <nav aria-label="Primary" className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
              <ul ref={listRef} className="relative flex items-center">
                {navItems.map((item) => {
                  const active = activeSection === item.sectionId;
                  return (
                    <li key={item.sectionId}>
                      <Link
                        href={item.href}
                        data-section={item.sectionId}
                        aria-current={active ? "location" : undefined}
                        className={cn(
                          "relative block rounded-md px-3 py-2 text-sm transition-colors duration-200",
                          active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
                <span
                  ref={indicatorRef}
                  aria-hidden="true"
                  style={{ width: INDICATOR_BASE_WIDTH }}
                  className="pointer-events-none invisible absolute bottom-0.5 left-0 h-[1.5px] origin-left rounded-full bg-primary opacity-0"
                />
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <ThemeSwitcher className="hidden lg:inline-flex" />
              <ButtonLink href={siteConfig.resume} variant="ghost" size="sm" className="hidden lg:inline-flex">
                Resume
              </ButtonLink>
              <ButtonLink href="/#contact" size="sm" className="hidden sm:inline-flex" onClick={closeMenu}>
                Let&apos;s Talk
              </ButtonLink>
              <MenuToggle open={menuOpen} onToggle={() => setMenuOpen((open) => !open)} />
            </div>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={closeMenu} activeSection={activeSection} />
    </>
  );
}

function MenuToggle({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      id="mobile-menu-toggle"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls="mobile-menu"
      aria-label={open ? "Close menu" : "Open menu"}
      className="relative -mr-1.5 grid size-11 place-items-center rounded-md text-foreground transition-colors hover:bg-surface-muted lg:hidden"
    >
      <span aria-hidden="true" className="relative block h-3 w-[18px]">
        <span
          className={cn(
            "absolute left-0 top-0 h-[1.5px] w-full rounded-full bg-current transition-transform duration-300 ease-out",
            open && "translate-y-[5.25px] rotate-45",
          )}
        />
        <span
          className={cn(
            "absolute bottom-0 left-0 h-[1.5px] w-full rounded-full bg-current transition-transform duration-300 ease-out",
            open && "-translate-y-[5.25px] -rotate-45",
          )}
        />
      </span>
    </button>
  );
}
