import { Reveal } from "@/components/animations/reveal";
import { SectionHeader } from "@/components/layout/section-header";
import { ButtonArrow, ButtonLink } from "@/components/ui/button";
import { values } from "@/data/process";

/**
 * Capabilities presented as a "spec sheet" panel — deliberately no invented statistics.
 * Cell contents animate (not the cells) so the 1px grid lines never flash as a solid block.
 */
export function Values() {
  const fillsGrid = values.length % 2 === 1;

  return (
    <section data-nav-section="about" aria-labelledby="values-title" className="section-y">
      <div className="container-page">
        <SectionHeader
          id="values-title"
          eyebrow="Standards"
          title="What you can expect"
          description="The defaults I bring to every project, whether it's a landing page or a complex dashboard."
        />

        <div className="mt-14 overflow-hidden rounded-xl border border-border bg-surface shadow-soft md:mt-16">
          <div className="flex h-11 items-center justify-between gap-4 border-b border-border bg-surface-muted/60 px-4">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-border-strong" />
                <span className="size-2.5 rounded-full bg-border-strong" />
                <span className="size-2.5 rounded-full bg-border-strong" />
              </span>
              <span className="whitespace-nowrap font-mono text-xs text-subtle-foreground">project-standards.ts</span>
            </div>
            <span className="flex items-center gap-2 whitespace-nowrap font-mono text-xs text-subtle-foreground">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />
              {values.length} defaults<span className="hidden sm:inline"> · always on</span>
            </span>
          </div>

          <Reveal
            as="ul"
            selector="[data-value]"
            stagger={0.06}
            y={14}
            className="grid gap-px bg-border sm:grid-cols-2"
          >
            {values.map(({ icon: Icon, title, description, tag }) => (
              <li key={title} className="group bg-surface transition-colors duration-300 hover:bg-background">
                <div data-value className="flex h-full gap-4 p-6 sm:p-7">
                  <span className="grid size-10 shrink-0 place-items-center rounded-md border border-border bg-background text-primary-strong transition-colors duration-300 group-hover:border-primary/40">
                    <Icon className="size-4.5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                      <h3 className="font-semibold tracking-[-0.015em] sm:text-[1.0625rem]">{title}</h3>
                      <span className="rounded-sm border border-border px-1.5 py-px font-mono text-[0.6875rem] uppercase tracking-wider text-subtle-foreground transition-colors duration-300 group-hover:text-primary-strong">
                        {tag}
                      </span>
                    </div>
                    <p className="mt-2 text-pretty text-[0.9375rem] leading-relaxed text-muted-foreground">{description}</p>
                  </div>
                </div>
              </li>
            ))}

            {fillsGrid ? (
              <li className="hidden bg-primary-soft sm:block">
                <div data-value className="flex h-full flex-col items-start justify-center gap-4 p-6 sm:p-7">
                  <p className="text-[1.0625rem] font-semibold tracking-[-0.015em]">Want this on your project?</p>
                  <ButtonLink href="/#contact" size="sm">
                    Let&apos;s talk
                    <ButtonArrow />
                  </ButtonLink>
                </div>
              </li>
            ) : null}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
