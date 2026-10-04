import type { SkillGroup } from "@/types";

/** Compact list for the strip directly below the hero. */
export const coreStack = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "Redux",
  "React Query",
  "Node.js",
  "PostgreSQL",
  "MongoDB",
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    description: "Where I spend most of my time.",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
    primary: ["React", "Next.js", "TypeScript"],
  },
  {
    title: "State & Data",
    description: "Keeping server and client state predictable.",
    skills: ["Redux", "React Query", "REST APIs", "Axios", "Fetch"],
    primary: ["Redux", "React Query"],
  },
  {
    title: "Backend / Database",
    description: "Enough to build and reason about the APIs I consume.",
    skills: ["Node.js", "Express", "PostgreSQL", "Prisma", "MongoDB"],
  },
  {
    title: "Development Tools",
    description: "Day-to-day workflow and collaboration.",
    skills: ["Git", "GitHub", "VS Code", "Postman", "Chrome DevTools", "Jira"],
  },
];
