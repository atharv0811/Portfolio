import { Check, Clock, MapPin } from "lucide-react";
import { Parallax } from "@/components/animations/parallax";
import { Reveal } from "@/components/animations/reveal";
import { Eyebrow } from "@/components/layout/section-header";
import { TextReveal } from "@/components/animations/text-reveal";
import { ButtonArrow, ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/data/site-config";
import { ProfileImage } from "./profile-image";

const focusAreas = [
  "Responsive interfaces",
  "Reusable components",
  "Frontend architecture",
  "API integration",
  "Performance",
  "Maintainability",
  "User experience",
  "Clean, consistent UI",
];

export function About() {
  return (
    <section id="about" data-nav-section="about" aria-labelledby="about-title" className="section-y border-t border-border">
      <div className="container-page grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div className="relative mx-auto w-full max-w-md lg:mx-0">
          <Parallax distance={28}>
            <Reveal scale y={0}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-border">
                <ProfileImage />
              </div>
            </Reveal>
          </Parallax>
          <dl className="relative -mt-10 ml-4 mr-4 grid gap-3 rounded-lg border border-border bg-surface/95 p-4 text-sm shadow-float backdrop-blur sm:ml-8 sm:mr-auto sm:w-72">
            <div>
              <dt className="sr-only">Location</dt>
              <dd className="flex items-center gap-2.5">
                <MapPin className="size-4 text-subtle-foreground" aria-hidden="true" />
                {siteConfig.location}
              </dd>
            </div>
            <div>
              <dt className="sr-only">Time zone</dt>
              <dd className="flex items-center gap-2.5">
                <Clock className="size-4 text-subtle-foreground" aria-hidden="true" />
                {siteConfig.timezone}
              </dd>
            </div>
            <div>
              <dt className="sr-only">Availability</dt>
              <dd className="flex items-center gap-2.5">
                <span className="grid size-4 place-items-center" aria-hidden="true">
                  <span className="size-2 rounded-full bg-primary" />
                </span>
                {siteConfig.availability.label}
              </dd>
            </div>
          </dl>
        </div>

        <div className="lg:pt-6">
          <Eyebrow>About</Eyebrow>
          <TextReveal id="about-title" text="I build interfaces that hold up in production." className="mt-4 max-w-xl text-section" />

          <Reveal className="mt-8 max-w-2xl space-y-5 text-lead text-muted-foreground">
            <p>
              I&apos;m {siteConfig.name}, a frontend developer with {siteConfig.experience} of professional experience
              building React and Next.js applications — dashboards, portals and the data-heavy screens that teams rely
              on every day.
            </p>
            <p>
              I care about the parts users notice and the parts they don&apos;t: clear interfaces, sensible component
              structure, predictable state and code the next developer can pick up without a walkthrough.
            </p>
          </Reveal>

          <Reveal
            as="ul"
            stagger={0.04}
            y={12}
            className="mt-10 grid max-w-2xl gap-x-8 gap-y-3 border-t border-border pt-8 sm:grid-cols-2"
          >
            {focusAreas.map((area) => (
              <li key={area} className="flex items-center gap-3 text-[0.9375rem]">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary-soft text-primary-strong">
                  <Check className="size-3" strokeWidth={2.5} aria-hidden="true" />
                </span>
                {area}
              </li>
            ))}
          </Reveal>

          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={siteConfig.resume} variant="secondary">
              View Resume
              <ButtonArrow diagonal />
            </ButtonLink>
            <ButtonLink href={siteConfig.linkedin} variant="ghost">
              LinkedIn
              <ButtonArrow diagonal />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
