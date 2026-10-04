import { SectionHeader } from "@/components/layout/section-header";
import { ButtonArrow, ButtonLink } from "@/components/ui/button";
import { projects } from "@/data/projects";
import type { Project } from "@/types";
import { ProjectCard, type ProjectCardLayout } from "./project-card";

type Row =
  | { kind: "single"; project: Project; index: number; layout: ProjectCardLayout }
  | { kind: "pair"; items: { project: Project; index: number }[] };

/** Alternates wide featured rows with two-column pairs to give the section rhythm. */
function buildRows(list: Project[]): Row[] {
  const rows: Row[] = [];
  let index = 0;
  let featuredCount = 0;
  while (index < list.length) {
    const project = list[index];
    if (!project) break;
    rows.push({
      kind: "single",
      project,
      index,
      layout: featuredCount % 2 === 0 ? "featured" : "featured-reverse",
    });
    featuredCount += 1;
    index += 1;
    const pair = list.slice(index, index + 2).map((item, offset) => ({ project: item, index: index + offset }));
    if (pair.length) rows.push({ kind: "pair", items: pair });
    index += pair.length;
  }
  return rows;
}

export function SelectedWork() {
  const rows = buildRows(projects);

  return (
    <section id="work" data-nav-section="work" aria-labelledby="work-title" className="section-y">
      <div className="container-page">
        <SectionHeader
          id="work-title"
          eyebrow="Case studies"
          title="Selected Work"
          description="Real-world interfaces, complex business applications and production-focused frontend engineering."
        />

        <div className="mt-14 space-y-20 md:mt-20 md:space-y-28">
          {rows.map((row) =>
            row.kind === "single" ? (
              <ProjectCard key={row.project.slug} project={row.project} index={row.index} layout={row.layout} />
            ) : (
              <div key={row.items[0]?.project.slug} className="grid gap-x-10 gap-y-20 md:grid-cols-2">
                {row.items.map(({ project, index }) => (
                  <ProjectCard key={project.slug} project={project} index={index} />
                ))}
              </div>
            ),
          )}
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-border pt-10 sm:flex-row sm:items-center md:mt-28">
          <div>
            <p className="text-title">Need something similar built?</p>
            <p className="mt-1.5 text-muted-foreground">Dashboards, portals and SaaS interfaces are my favourite kind of work.</p>
          </div>
          <ButtonLink href="/#contact" variant="secondary">
            Discuss your project
            <ButtonArrow />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
