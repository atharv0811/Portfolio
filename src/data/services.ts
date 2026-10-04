import { Code2, Gauge, LayoutDashboard, PanelsTopLeft, Plug, Wrench } from "lucide-react";
import type { Service } from "@/types";

export const services: Service[] = [
  {
    title: "Frontend Development",
    description:
      "Production-ready React and Next.js applications, structured to be extended by you or your team later.",
    icon: Code2,
    technologies: ["React", "Next.js", "TypeScript"],
  },
  {
    title: "UI Development",
    description:
      "Pixel-perfect, responsive interfaces built from your Figma files or an existing design system.",
    icon: PanelsTopLeft,
    technologies: ["Tailwind CSS", "Figma handoff", "Accessibility"],
  },
  {
    title: "Dashboard Development",
    description:
      "Data-heavy dashboards, analytics views and admin panels with tables, filters, charts and roles.",
    icon: LayoutDashboard,
    technologies: ["Tables", "Charts", "Filters"],
  },
  {
    title: "API Integration",
    description:
      "REST APIs, authentication flows, caching and state management that keep data-driven screens predictable.",
    icon: Plug,
    technologies: ["REST", "React Query", "Redux"],
  },
  {
    title: "Frontend Performance",
    description:
      "Diagnosing slow screens: unnecessary re-renders, large lists, heavy bundles and API waterfalls.",
    icon: Gauge,
    technologies: ["Profiling", "Code splitting", "Virtualization"],
  },
  {
    title: "Existing App Improvements",
    description:
      "Bug fixes, responsive fixes, UI polish, refactoring and gradual modernization of an existing codebase.",
    icon: Wrench,
    technologies: ["Refactoring", "Bug fixing", "Migration"],
  },
];

/** Engagement types shown alongside services so visitors can self-identify quickly. */
export const engagementTypes = [
  "New products & MVPs",
  "SaaS interfaces",
  "Dashboards & admin panels",
  "Figma to React/Next.js",
  "Responsive fixes",
  "Frontend refactoring",
];
