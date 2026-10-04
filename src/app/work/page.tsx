import type { Metadata } from "next";
import { TextReveal } from "@/components/animations/text-reveal";
import { ProjectCard } from "@/components/projects/project-card";
import { ButtonArrow, ButtonLink } from "@/components/ui/button";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies covering dashboards, customer portals and production-focused frontend engineering.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <section className="container-page pb-24 pt-[calc(var(--header-height)+3rem)] md:pb-32 md:pt-[calc(var(--header-height)+5rem)]">
      <p className="text-label text-subtle-foreground">All case studies</p>
      <TextReveal as="h1" immediate text="Work" className="mt-4 text-display" />
      <p className="mt-5 max-w-xl text-lead text-muted-foreground">
        Real-world interfaces, complex business applications and production-focused frontend engineering.
      </p>

      <div className="mt-16 grid gap-x-10 gap-y-20 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} headingLevel="h2" />
        ))}
      </div>

      <div className="mt-24 flex justify-center">
        <ButtonLink href="/#contact" size="lg">
          Let&apos;s Work Together
          <ButtonArrow />
        </ButtonLink>
      </div>
    </section>
  );
}
