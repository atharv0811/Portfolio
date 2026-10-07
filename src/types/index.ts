import type { LucideIcon } from "lucide-react";

export type SiteConfig = {
  name: string;
  /** Short monogram shown when there is no profile image. */
  initials: string;
  role: string;
  /** Shown in the About section. Keep it accurate. */
  experience: string;
  tagline: string;
  description: string;
  url: string;
  email: string;
  github: string;
  linkedin: string;
  resume: string;
  location: string;
  timezone: string;
  availability: {
    isAvailable: boolean;
    label: string;
  };
  responseTime: string;
  profileImage: string;
  keywords: string[];
};

export type NavItem = {
  label: string;
  href: string;
  /** Section id used for the active-state indicator on the home page. */
  sectionId: string;
};

export type ProjectVisualVariant = "analytics" | "portal" | "property" | "workspace";

export type ProjectImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type ProjectDetail = {
  title: string;
  description: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  /** Optional label shown as a badge on the card and case study, e.g. "Personal Project". */
  tag?: string;
  /** One-sentence summary used on cards and in metadata. */
  description: string;
  year: string;
  role: string;
  timeline: string;
  /** Marks sample content so it is labelled in the UI until replaced. */
  isPlaceholder: boolean;
  technologies: string[];
  /** Cover image path inside /public. Falls back to a rendered interface preview when missing. */
  image: string;
  visual: ProjectVisualVariant;
  gallery: ProjectImage[];
  overview: string;
  responsibilities: string[];
  challenge: string;
  challenges: ProjectDetail[];
  solution: string;
  features: string[];
  architecture: ProjectDetail[];
  uxDecisions: ProjectDetail[];
  implementation: ProjectDetail[];
  codeSample?: {
    filename: string;
    code: string;
  };
  responsive: string[];
  performance: string[];
  outcome: string[];
  learnings: string[];
  links?: {
    live?: string;
    repository?: string;
  };
};

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
  technologies: string[];
};

export type SkillGroup = {
  title: string;
  description: string;
  skills: string[];
  /** Skills used most often — visually emphasised. */
  primary?: string[];
};

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
  deliverable: string;
};

export type ValueItem = {
  icon: LucideIcon;
  title: string;
  description: string;
  tag: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  isPlaceholder: boolean;
};
