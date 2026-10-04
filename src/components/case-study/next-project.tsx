import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ProjectCardMotion } from "@/components/projects/project-card-motion";
import { ProjectMedia } from "@/components/projects/project-media";
import type { Project } from "@/types";

export function NextProject({ project }: { project: Project }) {
  return (
    <ProjectCardMotion className="group relative grid items-center gap-8 rounded-xl border border-border bg-surface p-5 transition-colors duration-500 hover:border-border-strong has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-ring sm:p-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-12">
      <div className="order-2 md:order-1 md:pl-4">
        <p data-reveal-text data-hover-meta className="text-label text-subtle-foreground">
          Next case study
        </p>
        <h2 data-reveal-text className="mt-4 text-[1.75rem] font-semibold leading-tight tracking-[-0.03em] sm:text-[2.25rem]">
          <Link href={`/work/${project.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {project.title}
          </Link>
        </h2>
        <p data-reveal-text className="mt-3 text-muted-foreground">
          {project.category}
        </p>
        <span data-reveal-text aria-hidden="true" className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium">
          Read case study
          <span data-hover-arrow className="inline-flex text-primary-strong">
            <ArrowUpRight className="size-4" />
          </span>
        </span>
      </div>
      <div data-reveal-media className="relative order-1 aspect-[16/10] overflow-hidden rounded-lg border border-border md:order-2">
        <div data-hover-image className="absolute inset-0">
          <ProjectMedia project={project} sizes="(min-width: 768px) 560px, 100vw" />
        </div>
      </div>
    </ProjectCardMotion>
  );
}
