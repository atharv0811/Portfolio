import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { Eyebrow } from "@/components/layout/section-header";
import { ButtonArrow, ButtonLink } from "@/components/ui/button";
import { CopyEmailButton } from "@/components/ui/copy-email-button";
import { SocialLinks } from "@/components/ui/social-links";
import { siteConfig } from "@/data/site-config";
import { ContactForm } from "./contact-form";

const briefChecklist = [
  "What you're building and who it's for",
  "Your timeline and any fixed dates",
  "Designs, a Figma link or an existing codebase",
  "What a successful outcome looks like",
];

export function Contact() {
  return (
    <section id="contact" data-nav-section="contact" aria-labelledby="cta-title" className="section-y">
      <div className="container-page">
        <FinalCta />

        <div id="project-form" className="mt-20 grid gap-12 md:mt-28 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <Reveal className="lg:pt-2">
            <Eyebrow>Contact</Eyebrow>
            <h2 className="mt-4 text-section">Tell me about your project</h2>
            <p className="mt-4 max-w-md text-lead text-muted-foreground">
              A few details help me reply with useful questions, a realistic estimate and next steps.
            </p>
            <ul className="mt-8 space-y-3 border-t border-border pt-8">
              {briefChecklist.map((item, index) => (
                <li key={item} className="flex gap-4 text-[0.9375rem] text-muted-foreground">
                  <span className="font-mono text-xs leading-6 text-subtle-foreground">0{index + 1}</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10 rounded-lg border border-border p-4">
              <p className="text-caption text-subtle-foreground">Prefer email?</p>
              <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
                <CopyEmailButton className="-ml-2" />
                <SocialLinks />
              </div>
            </div>
          </Reveal>

          <Reveal y={32}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <div className="relative isolate overflow-hidden rounded-2xl bg-surface-inverse px-6 py-16 text-white sm:px-12 sm:py-20 lg:px-16 lg:py-24 dark:border dark:border-border">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 [background-image:linear-gradient(to_right,rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.05)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_80%_70%_at_80%_0%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-24 -z-10 size-[28rem] rounded-full bg-[radial-gradient(closest-side,rgb(45_212_191/0.16),transparent)]"
      />

      <div className="max-w-3xl">
        <Eyebrow tone="inverse">Let&apos;s build it</Eyebrow>
        <TextReveal
          id="cta-title"
          text={[
            { text: "Have a product idea or" },
            { text: "frontend problem?", className: "text-secondary" },
          ]}
          className="mt-5 text-[clamp(2.125rem,1.5rem+2.6vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.04em]"
        />
        <p className="mt-6 max-w-xl text-lead text-white/65">
          Let&apos;s turn it into a polished, responsive and production-ready experience.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="#project-form" variant="inverse" size="lg">
            Start a Project
            <ButtonArrow />
          </ButtonLink>
          <ButtonLink href={`mailto:${siteConfig.email}`} variant="inverse-outline" size="lg">
            Email Me
          </ButtonLink>
        </div>
        <p className="mt-10 flex items-center gap-2 text-caption text-white/55">
          <span className="relative flex size-2" aria-hidden="true">
            <span className="status-ping absolute inset-0 rounded-full bg-secondary" />
            <span className="relative size-2 rounded-full bg-secondary" />
          </span>
          {siteConfig.availability.label} · {siteConfig.responseTime}
        </p>
      </div>
    </div>
  );
}
