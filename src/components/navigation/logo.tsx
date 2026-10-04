import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";

export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${siteConfig.name} — home`}
      className={cn("group inline-flex items-center gap-2.5 rounded-md", className)}
    >
      <span
        aria-hidden="true"
        className="relative grid size-8 place-items-center overflow-hidden rounded-[9px] bg-foreground font-mono text-[0.6875rem] font-semibold tracking-tight text-background"
      >
        {siteConfig.initials}
        <span className="absolute bottom-1 right-1 size-1 rounded-full bg-secondary transition-transform duration-300 group-hover:scale-150" />
      </span>
      <span className="text-[0.9375rem] font-semibold tracking-[-0.02em]">{siteConfig.name}</span>
    </Link>
  );
}
