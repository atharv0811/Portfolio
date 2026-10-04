import { FallbackImage } from "@/components/ui/fallback-image";
import { publicAssetExists } from "@/lib/assets";
import type { Project } from "@/types";
import { ProjectVisual } from "./project-visual";

/**
 * Shows the project's cover image when it exists, otherwise a rendered interface preview.
 * The file check runs on the server, so a missing image never flashes a broken state.
 */
export function ProjectMedia({
  project,
  sizes,
  priority = false,
}: {
  project: Pick<Project, "image" | "title" | "visual">;
  sizes: string;
  priority?: boolean;
}) {
  const fallback = <ProjectVisual variant={project.visual} title={project.title} />;
  if (!publicAssetExists(project.image)) return fallback;

  return (
    <FallbackImage
      src={project.image}
      alt={`${project.title} — interface screenshot`}
      fill
      sizes={sizes}
      priority={priority}
      className="object-cover object-top"
      fallback={fallback}
    />
  );
}
