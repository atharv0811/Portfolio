import { Accessibility, Boxes, FileCode2, Gauge, MonitorSmartphone, ShieldCheck, Workflow } from "lucide-react";
import type { ProcessStep, ValueItem } from "@/types";

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Understand",
    description: "Understand the business, the users and the requirements before writing code.",
    deliverable: "Clear scope & questions answered",
  },
  {
    step: "02",
    title: "Plan",
    description: "Define the UI structure, component breakdown and technical approach.",
    deliverable: "Component map & estimate",
  },
  {
    step: "03",
    title: "Build",
    description: "Develop reusable, typed and maintainable components with regular previews.",
    deliverable: "Working preview links",
  },
  {
    step: "04",
    title: "Integrate",
    description: "Connect APIs, authentication and application state, including loading and error states.",
    deliverable: "Data-connected screens",
  },
  {
    step: "05",
    title: "Polish",
    description: "Handle responsive behaviour, edge cases, accessibility and performance.",
    deliverable: "Cross-device QA pass",
  },
  {
    step: "06",
    title: "Deliver",
    description: "Test, deploy and hand over with documentation so the work is easy to continue.",
    deliverable: "Deployment & handoff notes",
  },
];

export const values: ValueItem[] = [
  {
    icon: ShieldCheck,
    title: "Production-focused development",
    description: "Loading, empty and error states are part of the feature, not an afterthought.",
    tag: "Edge cases",
  },
  {
    icon: MonitorSmartphone,
    title: "Responsive across devices",
    description: "Layouts designed for 320px phones through wide desktop screens.",
    tag: "320 → 1920",
  },
  {
    icon: Boxes,
    title: "Reusable component architecture",
    description: "Small, typed components that your team can extend without rewriting.",
    tag: "TypeScript",
  },
  {
    icon: Workflow,
    title: "API-driven applications",
    description: "Caching, pagination and optimistic updates handled deliberately.",
    tag: "REST",
  },
  {
    icon: Gauge,
    title: "Performance-conscious UI",
    description: "Server rendering where it helps, lean bundles and smooth interactions.",
    tag: "Core Web Vitals",
  },
  {
    icon: FileCode2,
    title: "Maintainable code",
    description: "Consistent structure, meaningful names and code reviewed like it will be read again.",
    tag: "Readable",
  },
  {
    icon: Accessibility,
    title: "Clean user experiences",
    description: "Clear hierarchy, keyboard support and accessible interactions by default.",
    tag: "a11y",
  },
];
