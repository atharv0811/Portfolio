import { ArrowLeft, Info } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RevealGroup } from "@/components/animations/reveal-group";
import { TextReveal } from "@/components/animations/text-reveal";
import {
  ArchitectureStack,
  CaseSection,
  CheckList,
  CodeSample,
  DetailGrid,
  Gallery,
  Statement,
} from "@/components/case-study/case-study-blocks";
import { CaseStudyToc, type TocItem } from "@/components/case-study/case-study-toc";
import { NextProject } from "@/components/case-study/next-project";
import { ProjectMedia } from "@/components/projects/project-media";
import { Badge, TechList } from "@/components/ui/badge";
import { ButtonArrow, ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { getNextProject, getProjectBySlug, projects } from "@/data/projects";
import { siteConfig } from "@/data/site-config";
import { projectSchema } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

function withArticle(phrase: string) {
  return `${/^[aeiou]/i.test(phrase) ? "an" : "a"} ${phrase}`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const title = `${project.title} — ${siteConfig.name}`;
  const description = `Case study showing the frontend architecture, UI implementation and technical approach behind ${withArticle(project.category.toLowerCase())}.`;
  const url = `/work/${project.slug}`;

  return {
    title: project.title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title, description, images: ["/opengraph-image"] },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
  };
}

const tocItems: TocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "role", label: "My role" },
  { id: "technologies", label: "Technologies" },
  { id: "problem", label: "Problem" },
  { id: "challenges", label: "Challenges" },
  { id: "solution", label: "Solution" },
  { id: "architecture", label: "Architecture" },
  { id: "ux", label: "UI/UX decisions" },
  { id: "implementation", label: "Implementation" },
  { id: "responsive", label: "Responsive" },
  { id: "performance", label: "Performance" },
  { id: "screenshots", label: "Screenshots" },
  { id: "outcome", label: "Outcome" },
  { id: "learnings", label: "Learnings" },
];

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  const next = getNextProject(project.slug);

  const meta = [
    { label: "Role", value: project.role },
    { label: "Timeline", value: project.timeline },
    { label: "Year", value: project.year },
    { label: "Category", value: project.category },
  ];

  return (
    <article>
      <JsonLd data={projectSchema(project)} />

      <header className="relative pt-[calc(var(--header-height)+2.5rem)] sm:pt-[calc(var(--header-height)+4rem)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-grid mask-[radial-gradient(ellipse_70%_80%_at_50%_0%,black,transparent)]"
        />
        <div className="container-page">
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" aria-hidden="true" />
            All work
          </Link>

          {project.isPlaceholder ? (
            <div className="mt-8 flex max-w-3xl gap-3 rounded-lg border border-accent/30 bg-accent-soft p-4 text-sm text-accent-foreground">
              <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <p>
                <strong className="font-semibold">Sample case study.</strong> This page shows the structure of a case
                study with placeholder content. It is not a real client project.
              </p>
            </div>
          ) : null}

          <div className="mt-10 flex flex-wrap items-center gap-2">
            <Badge variant="primary">{project.category}</Badge>
            <Badge>{project.year}</Badge>
          </div>
          <TextReveal as="h1" immediate text={project.title} className="mt-5 max-w-4xl text-display" />
          <p className="mt-6 max-w-2xl text-pretty text-lead text-muted-foreground">{project.description}</p>

          <dl className="mt-12 grid grid-cols-2 gap-x-4 gap-y-6 border-y border-border py-6 lg:grid-cols-4">
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="text-label text-subtle-foreground">{item.label}</dt>
                <dd className="mt-2 text-[0.9375rem] font-medium">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="container-page mt-10 sm:mt-14">
        <div className="relative aspect-16/10 overflow-hidden rounded-2xl border border-border bg-surface-muted sm:aspect-video">
          <ProjectMedia project={project} sizes="(min-width: 1280px) 1176px, 100vw" priority />
        </div>
      </div>

      <div className="container-page section-y grid gap-16 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-20">
        <aside>
          <CaseStudyToc items={tocItems} />
        </aside>

        <RevealGroup className="max-w-3xl space-y-20 md:space-y-24">
          <CaseSection id="overview" title="Overview">
            <p className="text-pretty text-lead">{project.overview}</p>
            <h3 className="mt-10 text-sm font-semibold">Key features</h3>
            <div className="mt-4">
              <CheckList items={project.features} columns={2} />
            </div>
          </CaseSection>

          <CaseSection id="role" title="My role">
            <p className="text-lead">
              <span className="font-medium">{project.role}</span>
              <span className="text-muted-foreground"> · {project.timeline}</span>
            </p>
            <div className="mt-6">
              <CheckList items={project.responsibilities} />
            </div>
          </CaseSection>

          <CaseSection id="technologies" title="Technologies">
            <TechList items={project.technologies} />
          </CaseSection>

          <CaseSection id="problem" title="Problem">
            <Statement>{project.challenge}</Statement>
          </CaseSection>

          <CaseSection id="challenges" title="Challenges">
            <DetailGrid items={project.challenges} numbered />
          </CaseSection>

          <CaseSection id="solution" title="Solution">
            <Statement>{project.solution}</Statement>
          </CaseSection>

          <CaseSection id="architecture" title="Architecture">
            <ArchitectureStack items={project.architecture} />
          </CaseSection>

          <CaseSection id="ux" title="UI/UX decisions">
            <DetailGrid items={project.uxDecisions} />
          </CaseSection>

          <CaseSection id="implementation" title="Technical implementation">
            <DetailGrid items={project.implementation} />
            {project.codeSample ? (
              <div className="mt-6">
                <CodeSample filename={project.codeSample.filename} code={project.codeSample.code} />
              </div>
            ) : null}
          </CaseSection>

          <CaseSection id="responsive" title="Responsive considerations">
            <CheckList items={project.responsive} />
          </CaseSection>

          <CaseSection id="performance" title="Performance considerations">
            <CheckList items={project.performance} />
          </CaseSection>

          <CaseSection id="screenshots" title="Screenshots">
            <Gallery images={project.gallery} />
          </CaseSection>

          <CaseSection id="outcome" title="Outcome">
            <CheckList items={project.outcome} />
          </CaseSection>

          <CaseSection id="learnings" title="Learnings">
            <CheckList items={project.learnings} />
          </CaseSection>

          <div data-reveal className="flex flex-col gap-5 rounded-xl border border-border bg-surface p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="text-title">Need something like this?</p>
              <p className="mt-1.5 text-muted-foreground">I can help you plan and build it.</p>
            </div>
            <ButtonLink href="/#contact">
              Let&apos;s Work Together
              <ButtonArrow />
            </ButtonLink>
          </div>
        </RevealGroup>
      </div>

      {next && next.slug !== project.slug ? (
        <div className="container-page pb-24 md:pb-32">
          <NextProject project={next} />
        </div>
      ) : null}
    </article>
  );
}
