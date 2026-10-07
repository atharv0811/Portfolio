// import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Badge, PlaceholderBadge, TechList } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";
import { ProjectCardMotion } from "./project-card-motion";
import { ProjectLinks } from "./project-links";
import { ProjectMedia } from "./project-media";

export type ProjectCardLayout = "featured" | "featured-reverse" | "compact";

type ProjectCardProps = {
  project: Project;
  index: number;
  layout?: ProjectCardLayout;
  headingLevel?: "h2" | "h3";
};

export function ProjectCard({ project, index, layout = "compact", headingLevel: Heading = "h3" }: ProjectCardProps) {
  const featured = layout !== "compact";
  const href = `/work/${project.slug}`;

  return (
    <ProjectCardMotion
      className={cn(
        "group relative rounded-xl has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-8 has-[a:focus-visible]:outline-ring",
        featured && "grid items-center gap-8 lg:grid-cols-12 lg:gap-14",
      )}
    >
      <div
        data-reveal-media
        className={cn(
          "relative overflow-hidden rounded-xl border border-border bg-surface-muted transition-colors duration-500 group-hover:border-border-strong",
          featured ? "aspect-[16/11] lg:col-span-7" : "aspect-[16/11]",
          layout === "featured-reverse" && "lg:order-2",
        )}
      >
        <div data-hover-image className="absolute inset-0 origin-bottom">
          <ProjectMedia
            project={project}
            sizes={featured ? "(min-width: 1024px) 680px, 100vw" : "(min-width: 768px) 560px, 100vw"}
          />
        </div>
        <div
          data-hover-overlay
          aria-hidden="true"
          className="invisible absolute inset-0 bg-[linear-gradient(to_top,var(--primary-soft),transparent_60%)] opacity-0"
        />
      </div>

      <div className={cn("flex flex-col", featured ? "lg:col-span-5" : "mt-6")}>
        <div data-reveal-text data-hover-meta className="flex flex-wrap items-center gap-x-3 gap-y-2 text-caption text-subtle-foreground">
          <span className="font-mono">{String(index + 1).padStart(2, "0")}</span>
          <span aria-hidden="true" className="h-px w-4 bg-border-strong" />
          <span>{project.category}</span>
          <span aria-hidden="true">·</span>
          <span>{project.year}</span>
          {project.isPlaceholder ? (
            <PlaceholderBadge className="ml-1" />
          ) : project.tag ? (
            <Badge variant="primary" className="ml-1">
              {project.tag}
            </Badge>
          ) : null}
        </div>

        <Heading
          data-reveal-text
          className={cn("mt-4 font-semibold tracking-[-0.03em]", featured ? "text-[1.75rem] leading-tight sm:text-[2rem]" : "text-title")}
        >
          <Link href={href} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {project.title}
          </Link>
        </Heading>

        <p data-reveal-text className={cn("mt-3 text-pretty text-muted-foreground", featured ? "max-w-md text-lead" : "max-w-lg")}>
          {project.description}
        </p>

        <div data-reveal-text>
          <TechList items={project.technologies.slice(0, featured ? 7 : 4)} className="mt-6" />
        </div>

        {/* Hidden for now — restore along with the ArrowUpRight import.
        <span data-reveal-text className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium" aria-hidden="true">
          View Case Study
          <span data-hover-arrow className="inline-flex text-primary-strong">
            <ArrowUpRight className="size-4" />
          </span>
        </span>
        */}

        {project.links?.live || project.links?.repository ? (
          <div data-reveal-text className="relative z-10 mt-6">
            <ProjectLinks links={project.links} />
          </div>
        ) : null}
      </div>
    </ProjectCardMotion>
  );
}
