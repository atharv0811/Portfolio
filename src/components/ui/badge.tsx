import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "neutral" | "primary" | "placeholder" | "outline";

const variants: Record<BadgeVariant, string> = {
  neutral: "border-border bg-surface text-muted-foreground",
  outline: "border-border-strong text-muted-foreground",
  primary: "border-transparent bg-primary-soft text-primary-strong",
  placeholder: "border-transparent bg-accent-soft text-accent-foreground",
};

export function Badge({
  children,
  variant = "neutral",
  className,
}: {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 font-mono text-[0.75rem] leading-5 tracking-[-0.01em]",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Marks sample content so placeholder material is never mistaken for a real claim. */
export function PlaceholderBadge({ label = "Sample content", className }: { label?: string; className?: string }) {
  return (
    <Badge variant="placeholder" className={className}>
      <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
      {label}
    </Badge>
  );
}

export function TechList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label="Technologies">
      {items.map((item) => (
        <li key={item}>
          <Badge>{item}</Badge>
        </li>
      ))}
    </ul>
  );
}
