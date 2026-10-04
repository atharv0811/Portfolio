import { SplitWords } from "@/components/animations/split-words";
import { ButtonArrow, ButtonLink } from "@/components/ui/button";
import { CopyEmailButton } from "@/components/ui/copy-email-button";
import { SocialLinks } from "@/components/ui/social-links";
import { siteConfig } from "@/data/site-config";
import { HeroMotion } from "./hero-motion";
import { HeroVisual } from "./hero-visual";

export function Hero() {
  return (
    <section
      id="top"
      data-nav-section="top"
      aria-labelledby="hero-title"
      className="relative overflow-hidden pb-24 pt-[calc(var(--header-height)+3rem)] sm:pb-28 lg:pb-32 lg:pt-[calc(var(--header-height)+5rem)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_70%_30%,black,transparent)]"
      />

      <HeroMotion className="container-page grid items-center gap-x-10 gap-y-20 lg:grid-cols-[1.05fr_1fr]">
        <div className="max-w-[40rem]">
          {siteConfig.availability.isAvailable ? (
            <p
              data-hero="badge"
              data-animate
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 py-1 pl-2 pr-3 text-caption font-medium text-muted-foreground shadow-soft backdrop-blur"
            >
              <span className="relative flex size-2" aria-hidden="true">
                <span className="status-ping absolute inset-0 rounded-full bg-primary" />
                <span className="relative size-2 rounded-full bg-primary" />
              </span>
              {siteConfig.availability.label}
            </p>
          ) : null}

          <h1 id="hero-title" data-hero="title" data-animate className="mt-7 text-balance text-display">
            <SplitWords
              segments={[
                { text: "Frontend Developer building polished," },
                { text: "production-ready", className: "text-primary-strong" },
                { text: "web experiences." },
              ]}
            />
          </h1>

          <p data-hero="lead" data-animate className="mt-6 max-w-[34rem] text-pretty text-lead text-muted-foreground">
            I build modern React and Next.js applications with a strong focus on responsive UI, performance, API
            integration and maintainable frontend architecture.
          </p>

          <div data-hero="cta" data-animate className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/#contact" size="lg">
              Let&apos;s Work Together
              <ButtonArrow />
            </ButtonLink>
            <ButtonLink href="/#work" variant="secondary" size="lg">
              View My Work
            </ButtonLink>
          </div>

          <div data-hero="social" data-animate className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-2">
            <SocialLinks className="-ml-2.5" />
            <span aria-hidden="true" className="hidden h-4 w-px bg-border-strong sm:block" />
            <CopyEmailButton />
          </div>
        </div>

        <div data-hero="visual" data-animate className="px-2 sm:px-6 lg:px-0">
          <HeroVisual />
        </div>
      </HeroMotion>
    </section>
  );
}
