import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { ProjectVisualVariant } from "@/types";

/**
 * Rendered interface preview used whenever a project screenshot is missing.
 * It keeps the layout polished before real images are added, and is purely illustrative.
 */
export function ProjectVisual({ variant, title, className }: { variant: ProjectVisualVariant; title: string; className?: string }) {
  const Preview = previews[variant];
  return (
    <div
      role="img"
      aria-label={`Illustrative interface preview for ${title}`}
      className={cn("relative flex h-full w-full items-end justify-center overflow-hidden bg-surface-muted", className)}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-70 mask-fade-radial" />
      <div className="relative w-[88%] translate-y-[6%] overflow-hidden rounded-t-lg border border-b-0 border-border-strong bg-surface shadow-float">
        <div className="flex h-6 items-center gap-1 border-b border-border px-2.5">
          <span className="size-1.5 rounded-full bg-border-strong" />
          <span className="size-1.5 rounded-full bg-border-strong" />
          <span className="size-1.5 rounded-full bg-border-strong" />
        </div>
        <div className="p-3 sm:p-4">
          <Preview />
        </div>
      </div>
    </div>
  );
}

function Line({ className }: { className?: string }) {
  return <span className={cn("block h-1.5 rounded-full bg-border", className)} />;
}

function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-md border border-border p-2", className)}>{children}</div>;
}

function AnalyticsPreview() {
  const bars = [38, 52, 44, 66, 58, 74, 62, 84, 70, 92, 80, 96];
  return (
    <div className="grid gap-2">
      <div className="grid grid-cols-3 gap-2">
        {["w-10", "w-8", "w-12"].map((width, index) => (
          <Panel key={index}>
            <Line className="w-8" />
            <span className="mt-2 block text-[11px] font-semibold tabular-nums">{["$24.1k", "1,204", "3.2%"][index]}</span>
            <Line className={cn("mt-1.5 bg-primary-soft", width)} />
          </Panel>
        ))}
      </div>
      <Panel className="flex h-28 items-end gap-1.5 px-3 pb-2 sm:h-36">
        {bars.map((height, index) => (
          <span
            key={index}
            style={{ height: `${height}%` }}
            className={cn("flex-1 rounded-t-[3px]", index === bars.length - 1 ? "bg-primary" : "bg-primary/25")}
          />
        ))}
      </Panel>
      <Panel className="space-y-1.5">
        {[0, 1, 2].map((row) => (
          <div key={row} className="flex items-center gap-2">
            <span className="size-3 rounded bg-surface-muted" />
            <Line className="w-1/3" />
            <Line className="ml-auto w-8 bg-primary-soft" />
          </div>
        ))}
      </Panel>
    </div>
  );
}

function PortalPreview() {
  const steps = ["Received", "In review", "Scheduled", "Resolved"];
  return (
    <div className="grid gap-2">
      <div className="flex gap-3 border-b border-border pb-2 text-[10px]">
        <span className="font-semibold">Requests</span>
        <span className="text-subtle-foreground">Invoices</span>
        <span className="text-subtle-foreground">Account</span>
      </div>
      <Panel>
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold">Request #2048</span>
          <span className="rounded bg-primary-soft px-1.5 text-[9px] text-primary-strong">In review</span>
        </div>
        <div className="mt-3 flex items-center">
          {steps.map((step, index) => (
            <div key={step} className="flex flex-1 flex-col items-start gap-1.5">
              <div className="flex w-full items-center">
                <span className={cn("size-2.5 shrink-0 rounded-full border-2", index <= 1 ? "border-primary bg-primary" : "border-border-strong bg-surface")} />
                {index < steps.length - 1 ? <span className={cn("h-px flex-1", index < 1 ? "bg-primary" : "bg-border-strong")} /> : null}
              </div>
              <span className="text-[9px] text-subtle-foreground">{step}</span>
            </div>
          ))}
        </div>
      </Panel>
      {[0, 1, 2].map((row) => (
        <Panel key={row} className="flex items-center gap-2">
          <span className="size-5 rounded-full bg-surface-muted" />
          <div className="flex-1 space-y-1">
            <Line className="w-2/5" />
            <Line className="w-1/4 bg-surface-muted" />
          </div>
          <span className={cn("rounded px-1.5 text-[9px]", row === 0 ? "bg-accent-soft text-accent-foreground" : "bg-surface-muted text-subtle-foreground")}>
            {row === 0 ? "Action needed" : "Closed"}
          </span>
        </Panel>
      ))}
    </div>
  );
}

function PropertyPreview() {
  const units = ["o", "o", "v", "o", "m", "o", "o", "v", "o", "o", "o", "m"];
  const unitStyle: Record<string, string> = {
    o: "bg-primary/20 border-primary/30",
    v: "bg-surface border-border-strong",
    m: "bg-accent-soft border-accent/40",
  };
  return (
    <div className="grid grid-cols-[1.4fr_1fr] gap-2">
      <Panel>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] font-semibold">Units</span>
          <span className="text-[9px] text-subtle-foreground">Block A</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {units.map((state, index) => (
            <span key={index} className={cn("aspect-square rounded border", unitStyle[state])} />
          ))}
        </div>
      </Panel>
      <div className="grid gap-2">
        <Panel>
          <span className="text-[10px] font-semibold">Today</span>
          <div className="mt-2 space-y-1.5">
            {["bg-accent", "bg-primary", "bg-border-strong"].map((dot) => (
              <div key={dot} className="flex items-center gap-1.5">
                <span className={cn("size-1.5 rounded-full", dot)} />
                <Line className="flex-1" />
              </div>
            ))}
          </div>
        </Panel>
        <Panel>
          <span className="text-[10px] font-semibold">Occupancy</span>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-muted">
            <span className="block h-full w-3/4 rounded-full bg-primary" />
          </div>
        </Panel>
      </div>
    </div>
  );
}

function WorkspacePreview() {
  const columns = [
    { title: "To do", cards: 3 },
    { title: "In progress", cards: 2, highlight: true },
    { title: "Done", cards: 2 },
  ];
  return (
    <div className="grid grid-cols-3 gap-2">
      {columns.map((column) => (
        <div key={column.title} className="rounded-md bg-surface-muted p-1.5">
          <div className="mb-1.5 flex items-center justify-between px-0.5">
            <span className="text-[9.5px] font-semibold">{column.title}</span>
            <span className="text-[9px] text-subtle-foreground">{column.cards}</span>
          </div>
          <div className="space-y-1.5">
            {Array.from({ length: column.cards }, (_, index) => (
              <div
                key={index}
                className={cn(
                  "space-y-1.5 rounded border bg-surface p-1.5",
                  column.highlight && index === 0 ? "border-primary/50 shadow-soft" : "border-border",
                )}
              >
                <Line className="w-4/5" />
                <div className="flex items-center justify-between">
                  <span className="h-1.5 w-6 rounded-full bg-primary-soft" />
                  <span className="size-3 rounded-full bg-border" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const previews: Record<ProjectVisualVariant, () => ReactNode> = {
  analytics: AnalyticsPreview,
  portal: PortalPreview,
  property: PropertyPreview,
  workspace: WorkspacePreview,
};
