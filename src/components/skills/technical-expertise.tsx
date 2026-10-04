import { Database, LayoutTemplate, Network, Wrench, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeader } from "@/components/layout/section-header";
import { skillGroups } from "@/data/skills";
import { cn } from "@/lib/utils";

// Icon and grid span per group, in data order. Spans form a 6-column bento on desktop.
const groupStyles: { icon: LucideIcon; span: string }[] = [
  { icon: LayoutTemplate, span: "lg:col-span-4" },
  { icon: Network, span: "lg:col-span-2" },
  { icon: Database, span: "lg:col-span-3" },
  { icon: Wrench, span: "lg:col-span-3" },
];

export function TechnicalExpertise() {
  return (
    <section data-nav-section="services" aria-labelledby="skills-title" className="section-y">
      <div className="container-page">
        <SectionHeader
          id="skills-title"
          eyebrow="Toolkit"
          title="Technical expertise"
          description="The stack I use to ship — grouped by where it fits, not ranked by a percentage."
          action={
            <p className="flex items-center gap-2 text-caption text-subtle-foreground">
              <span aria-hidden="true" className="size-2 rounded-full bg-primary" />
              Used most often
            </p>
          }
        />

        <Reveal stagger={0.1} className="mt-14 grid gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-6">
          {skillGroups.map((group, index) => {
            const style = groupStyles[index % groupStyles.length];
            const Icon = style?.icon ?? LayoutTemplate;
            const featured = index === 0;
            return (
              <article
                key={group.title}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface p-6 transition-colors duration-300 hover:border-border-strong sm:p-7",
                  style?.span,
                )}
              >
                {featured ? (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-grid opacity-60 mask-[linear-gradient(to_left,black,transparent)]"
                  />
                ) : null}

                <div className="relative flex items-start justify-between gap-4">
                  <span className="grid size-10 place-items-center rounded-md border border-border bg-background text-primary-strong transition-transform duration-300 group-hover:-translate-y-0.5">
                    <Icon className="size-4.5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className="font-mono text-xs text-subtle-foreground">
                    {String(index + 1).padStart(2, "0")} / {String(skillGroups.length).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="relative mt-6 text-lg font-semibold tracking-[-0.02em]">{group.title}</h3>
                <p className="relative mt-1.5 max-w-sm text-[0.9375rem] text-muted-foreground">{group.description}</p>

                <ul className="relative mt-6 flex flex-wrap gap-2 pt-0 lg:mt-auto lg:pt-8" aria-label={`${group.title} technologies`}>
                  {group.skills.map((skill) => {
                    const primary = group.primary?.includes(skill);
                    return (
                      <li
                        key={skill}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-sm transition-colors duration-200",
                          primary
                            ? "border-primary/30 bg-primary-soft font-medium text-primary-strong"
                            : "border-border bg-background text-muted-foreground hover:border-border-strong hover:text-foreground",
                        )}
                      >
                        {primary ? <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" /> : null}
                        {skill}
                      </li>
                    );
                  })}
                </ul>
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
