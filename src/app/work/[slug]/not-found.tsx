import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ButtonArrow, ButtonLink } from "@/components/ui/button";
import { projects } from "@/data/projects";

export default function ProjectNotFound() {
  return (
    <section className="container-page pb-24 pt-[calc(var(--header-height)+5rem)] md:pb-32">
      <p className="text-label text-subtle-foreground">Case study not found</p>
      <h1 className="mt-4 max-w-2xl text-section">This project isn&apos;t here — it may have been renamed or removed.</h1>
      <p className="mt-4 max-w-xl text-lead text-muted-foreground">Here are the case studies that are available:</p>

      <ul className="mt-10 max-w-2xl border-t border-border">
        {projects.map((project) => (
          <li key={project.slug} className="border-b border-border">
            <Link href={`/work/${project.slug}`} className="group flex items-center justify-between gap-4 py-4">
              <span>
                <span className="block font-medium">{project.title}</span>
                <span className="text-caption text-subtle-foreground">{project.category}</span>
              </span>
              <ArrowUpRight className="size-4 text-subtle-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary-strong" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>

      <ButtonLink href="/" variant="secondary" className="mt-10">
        Back Home
        <ButtonArrow />
      </ButtonLink>
    </section>
  );
}
