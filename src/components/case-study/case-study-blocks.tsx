import { Check, ImageIcon } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import { publicAssetExists } from "@/lib/assets";
import { cn } from "@/lib/utils";
import type { ProjectDetail, ProjectImage } from "@/types";

export function CaseSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} data-reveal className="flex items-center gap-3 text-label text-subtle-foreground">
        <span aria-hidden="true" className="h-px w-5 bg-primary" />
        {title}
      </h2>
      <div data-reveal className="mt-6">
        {children}
      </div>
    </section>
  );
}

/** Large editorial statement used for Problem / Solution. */
export function Statement({ children }: { children: ReactNode }) {
  return (
    <p className="text-pretty text-[1.25rem] font-medium leading-[1.5] tracking-[-0.02em] sm:text-[1.5rem]">{children}</p>
  );
}

const PLACEHOLDER_PREFIX = "Placeholder:";

export function CheckList({ items, columns = 1 }: { items: string[]; columns?: 1 | 2 }) {
  return (
    <ul className={cn("grid gap-3", columns === 2 && "sm:grid-cols-2 sm:gap-x-8")}>
      {items.map((item) => {
        const isPlaceholder = item.startsWith(PLACEHOLDER_PREFIX);
        return (
          <li key={item} className="flex gap-3 text-pretty leading-relaxed text-muted-foreground">
            <span
              aria-hidden="true"
              className={cn(
                "mt-[3px] grid size-5 shrink-0 place-items-center rounded-full",
                isPlaceholder ? "bg-accent-soft text-accent-foreground" : "bg-primary-soft text-primary-strong",
              )}
            >
              {isPlaceholder ? <span className="size-1.5 rounded-full bg-accent" /> : <Check className="size-3" strokeWidth={2.5} />}
            </span>
            <span className={cn(isPlaceholder && "italic")}>{item}</span>
          </li>
        );
      })}
    </ul>
  );
}

export function DetailGrid({ items, numbered = false }: { items: ProjectDetail[]; numbered?: boolean }) {
  return (
    <ul className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
      {items.map((item, index) => (
        <li key={item.title} className="bg-background p-5 sm:p-6">
          {numbered ? <span className="font-mono text-xs text-subtle-foreground">{String(index + 1).padStart(2, "0")}</span> : null}
          <h3 className={cn("font-semibold tracking-[-0.015em]", numbered && "mt-3")}>{item.title}</h3>
          <p className="mt-1.5 text-pretty text-[0.9375rem] leading-relaxed text-muted-foreground">{item.description}</p>
        </li>
      ))}
    </ul>
  );
}

/** Layered architecture shown as a connected stack. */
export function ArchitectureStack({ items }: { items: ProjectDetail[] }) {
  return (
    <ol className="relative space-y-3">
      <span aria-hidden="true" className="absolute bottom-6 left-[19px] top-6 w-px bg-border-strong" />
      {items.map((item, index) => (
        <li key={item.title} className="relative flex gap-4">
          <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-md border border-border-strong bg-surface font-mono text-xs text-primary-strong">
            L{index + 1}
          </span>
          <div className="flex-1 rounded-lg border border-border bg-surface px-4 py-3">
            <h3 className="font-semibold tracking-[-0.015em]">{item.title}</h3>
            <p className="mt-1 text-pretty text-[0.9375rem] leading-relaxed text-muted-foreground">{item.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function CodeSample({ filename, code }: { filename: string; code: string }) {
  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-surface-inverse text-[#e7e5e4]">
      <figcaption className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 font-mono text-xs text-white/55">
        <span>{filename}</span>
        <span>TypeScript</span>
      </figcaption>
      <pre className="overflow-x-auto p-4 font-mono text-[0.8125rem] leading-relaxed sm:p-5">
        <code>{code}</code>
      </pre>
    </figure>
  );
}

export function Gallery({ images }: { images: ProjectImage[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {images.map((image) => (
        <figure key={image.src}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-surface-muted">
            {publicAssetExists(image.src) ? (
              <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 420px, (min-width: 640px) 45vw, 100vw" className="object-cover" />
            ) : (
              <div className="absolute inset-0 grid place-items-center">
                <div aria-hidden="true" className="absolute inset-0 bg-grid mask-fade-radial" />
                <div className="relative flex flex-col items-center gap-3 px-6 text-center">
                  <span className="grid size-10 place-items-center rounded-full border border-dashed border-border-strong bg-surface text-subtle-foreground">
                    <ImageIcon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium">Screenshot coming soon</span>
                  <span className="break-all font-mono text-[0.6875rem] text-subtle-foreground">{image.src}</span>
                </div>
              </div>
            )}
          </div>
          {image.caption ? <figcaption className="mt-3 text-caption text-subtle-foreground">{image.caption}</figcaption> : null}
        </figure>
      ))}
    </div>
  );
}
