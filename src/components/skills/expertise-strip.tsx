import { Reveal } from "@/components/animations/reveal";
import { coreStack } from "@/data/skills";

export function ExpertiseStrip() {
  return (
    <section aria-labelledby="expertise-strip-title" data-nav-section="top" className="border-y border-border bg-surface/50">
      <div className="container-page flex flex-col gap-5 py-7 lg:flex-row lg:items-center lg:gap-10">
        <h2 id="expertise-strip-title" className="shrink-0 text-label text-subtle-foreground lg:max-w-[13rem]">
          Building with modern frontend technologies
        </h2>
        <Reveal as="ul" y={10} stagger={0.03} start="top 95%" className="flex flex-wrap gap-2">
          {coreStack.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-border bg-surface px-2.5 py-1 text-sm text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
            >
              {tech}
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
