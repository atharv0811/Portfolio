import { Mail } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";
import { GitHubIcon, LinkedInIcon } from "./icons";

export const socialLinks = [
  { label: "GitHub", href: siteConfig.github, icon: GitHubIcon },
  { label: "LinkedIn", href: siteConfig.linkedin, icon: LinkedInIcon },
  { label: "Email", href: `mailto:${siteConfig.email}`, icon: Mail },
];

export function SocialLinks({ className, tone = "default" }: { className?: string; tone?: "default" | "inverse" }) {
  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {socialLinks.map(({ label, href, icon: Icon }) => {
        const external = !href.startsWith("mailto:");
        return (
          <li key={label}>
            <a
              href={href}
              aria-label={label}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={cn(
                "grid size-10 place-items-center rounded-md transition-colors",
                tone === "default"
                  ? "text-muted-foreground hover:bg-surface-muted hover:text-foreground"
                  : "text-white/70 hover:bg-white/5 hover:text-white",
              )}
            >
              <Icon className="size-[18px]" aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
