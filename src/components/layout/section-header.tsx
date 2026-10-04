import type { ReactNode } from "react";
import { TextReveal } from "@/components/animations/text-reveal";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  /** Optional element aligned to the right on desktop (e.g. a link). */
  action?: ReactNode;
  id?: string;
  className?: string;
  tone?: "default" | "inverse";
};

export function SectionHeader({ eyebrow, title, description, action, id, className, tone = "default" }: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12", className)}>
      <div className="max-w-2xl">
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        <TextReveal text={title} id={id} className="mt-4 text-section" />
        {description ? (
          <p className={cn("mt-4 max-w-xl text-lead", tone === "default" ? "text-muted-foreground" : "text-white/65")}>
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function Eyebrow({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "inverse" }) {
  return (
    <p className={cn("flex items-center gap-2.5 text-label", tone === "default" ? "text-subtle-foreground" : "text-white/55")}>
      <span aria-hidden="true" className="h-px w-5 bg-primary" />
      {children}
    </p>
  );
}
