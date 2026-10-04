import type { NavItem, SiteConfig } from "@/types";

/**
 * Single source of truth for personal details, links and SEO defaults.
 * Replace every value marked "REPLACE" before launch.
 */
const GITHUB_URL = "http://github.com/atharv0811";
const LINKEDIN_URL = "https://www.linkedin.com/in/atharv-karnekar";
const EMAIL_ADDRESS = "karnekaratharv12@gmail.com";
const RESUME_URL = "/resume.pdf"; // REPLACE: add public/resume.pdf or use an external link

export const siteConfig: SiteConfig = {
  name: "Atharv Karnekar",
  initials: "AK",
  role: "Frontend Developer",
  experience: "1.5+ years",
  tagline: "Frontend Developer building modern web experiences.",
  description:
    "Frontend developer specializing in React, Next.js, TypeScript and modern production-ready web applications.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: EMAIL_ADDRESS,
  github: GITHUB_URL,
  linkedin: LINKEDIN_URL,
  resume: RESUME_URL,
  location: "India · Working remotely",
  timezone: "IST (UTC+5:30)",
  availability: {
    isAvailable: true,
    label: "Available for freelance projects",
  },
  responseTime: "I usually reply within 1-2 working days.",
  profileImage: "/images/profile.png",
  keywords: [
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Freelance Frontend Developer",
    "Dashboard Development",
    "UI Development",
  ],
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/#top", sectionId: "top" },
  { label: "Work", href: "/#work", sectionId: "work" },
  { label: "Services", href: "/#services", sectionId: "services" },
  { label: "About", href: "/#about", sectionId: "about" },
  { label: "Contact", href: "/#contact", sectionId: "contact" },
];
