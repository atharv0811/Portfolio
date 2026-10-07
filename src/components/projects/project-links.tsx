import { ButtonArrow, ButtonLink } from "@/components/ui/button";
import { GitHubIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

/** Live demo and repository buttons. Renders nothing when the project has neither link. */
export function ProjectLinks({
  links,
  size = "sm",
  className,
}: {
  links: Project["links"];
  size?: "sm" | "md";
  className?: string;
}) {
  if (!links?.live && !links?.repository) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {links.live ? (
        <ButtonLink href={links.live} size={size}>
          Live Demo
          <ButtonArrow diagonal />
        </ButtonLink>
      ) : null}
      {links.repository ? (
        <ButtonLink href={links.repository} variant="secondary" size={size}>
          <GitHubIcon aria-hidden="true" />
          GitHub Repo
        </ButtonLink>
      ) : null}
    </div>
  );
}
