import { siteConfig } from "@/data/site-config";
import { skillGroups } from "@/data/skills";
import type { Project } from "@/types";

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    description: siteConfig.description,
    url: absoluteUrl("/"),
    sameAs: [siteConfig.github, siteConfig.linkedin],
    knowsAbout: skillGroups.flatMap((group) => group.skills),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
    url: absoluteUrl("/"),
    inLanguage: "en",
  };
}

export function projectSchema(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: `${project.title} — case study`,
    description: project.description,
    url: absoluteUrl(`/work/${project.slug}`),
    dateCreated: project.year,
    genre: project.category,
    keywords: project.technologies.join(", "),
    author: { "@type": "Person", name: siteConfig.name, url: absoluteUrl("/") },
  };
}
