import { Reveal } from "@/components/animations/reveal";
import { SectionHeader } from "@/components/layout/section-header";
import { ButtonArrow, ButtonLink } from "@/components/ui/button";
import { engagementTypes, services } from "@/data/services";

export function Services() {
  return (
    <section id="services" data-nav-section="services" aria-labelledby="services-title" className="section-y bg-surface/60">
      <div className="container-page">
        <SectionHeader
          id="services-title"
          eyebrow="Services"
          title="What I Can Help You Build"
          description="From a first version of your product to fixing the screens that slow your team down."
        />

        {/* A shared-border grid instead of floating cards keeps this section calm and scannable. */}
        {/* Cell contents animate (not the cells) so the 1px grid lines never flash as a solid block. */}
        <Reveal
          as="ul"
          selector="[data-service]"
          stagger={0.07}
          className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 md:mt-16 lg:grid-cols-3"
        >
          {services.map(({ title, description, icon: Icon, technologies }) => (
            <li key={title} className="group relative bg-background transition-colors duration-300 hover:bg-surface">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
              <div data-service className="flex h-full flex-col p-6 sm:p-8">
                <span className="grid size-10 place-items-center rounded-md border border-border bg-surface text-primary-strong transition-transform duration-300 group-hover:-translate-y-0.5">
                  <Icon className="size-4.5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em]">{title}</h3>
                <p className="mt-2 flex-1 text-pretty text-[0.9375rem] leading-relaxed text-muted-foreground">{description}</p>
                <p className="mt-6 font-mono text-xs text-subtle-foreground">{technologies.join(" · ")}</p>
              </div>
            </li>
          ))}
        </Reveal>

        <Reveal className="mt-8 flex flex-col gap-8 rounded-xl border border-border bg-surface p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h3 className="text-title">Have a project in mind?</h3>
            <p className="mt-2 text-muted-foreground">New builds, existing applications or a single stubborn bug — tell me what you need.</p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Typical engagements">
              {engagementTypes.map((type) => (
                <li key={type} className="rounded-full border border-border px-3 py-1 text-caption text-muted-foreground">
                  {type}
                </li>
              ))}
            </ul>
          </div>
          <ButtonLink href="/#contact" size="lg" className="self-start lg:self-center">
            Let&apos;s Work Together
            <ButtonArrow />
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
