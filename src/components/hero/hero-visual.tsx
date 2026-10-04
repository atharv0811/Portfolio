import { Check, Monitor, Smartphone, Tablet } from "lucide-react";
import { cn } from "@/lib/utils";

// Illustrative interface only — values are sample UI data, not claims about real projects.
const kpis = [
  { label: "Revenue", value: "$48.2k", delta: "+12.4%", positive: true },
  { label: "Active users", value: "2,841", delta: "+5.1%", positive: true },
  { label: "Churn", value: "1.8%", delta: "-0.3%", positive: false },
];

const rows = [
  { name: "Northwind Co.", plan: "Business", status: "Active", amount: "$1,240" },
  { name: "Acme Studio", plan: "Starter", status: "Pending", amount: "$320" },
  { name: "Lumen Labs", plan: "Business", status: "Overdue", amount: "$980" },
];

const navigation = ["Overview", "Reports", "Customers", "Billing", "Settings"];

const statusStyles: Record<string, string> = {
  Active: "bg-primary-soft text-primary-strong",
  Pending: "bg-surface-muted text-muted-foreground",
  Overdue: "bg-accent-soft text-accent-foreground",
};

export function HeroVisual() {
  return (
    <div
      role="img"
      aria-label="Illustration of a product dashboard with analytics cards, a revenue chart, a customer table and an API status panel"
      className="relative mx-auto w-full max-w-[620px] select-none lg:max-w-none"
    >
      {/* Soft teal wash behind the window — restrained, not a glowing blob. */}
      <div
        aria-hidden="true"
        className="absolute -inset-x-10 -inset-y-12 -z-10 bg-[radial-gradient(closest-side,var(--primary-soft),transparent)] opacity-90"
      />

      <div data-depth="0.35">
        <div className="overflow-hidden rounded-xl border border-border-strong bg-surface shadow-float">
          <BrowserBar />
          <div className="grid grid-cols-1 sm:grid-cols-[128px_1fr]">
            <Sidebar />
            <div className="min-w-0 space-y-2.5 p-3 sm:p-4">
              <div data-hero-ui className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-[13px] font-semibold tracking-tight">Overview</p>
                  <p className="text-[10px] text-subtle-foreground">Updated just now</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="rounded-md border border-border px-2 py-1 text-[10px] text-muted-foreground">Last 30 days</span>
                  <span className="hidden rounded-md bg-foreground px-2 py-1 text-[10px] font-medium text-background sm:inline">Export</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {kpis.map((kpi) => (
                  <div key={kpi.label} data-hero-ui className="rounded-lg border border-border p-2 sm:p-2.5">
                    <p className="truncate text-[10px] text-subtle-foreground">{kpi.label}</p>
                    <p className="mt-0.5 text-sm font-semibold tabular-nums tracking-tight sm:text-base">{kpi.value}</p>
                    <span
                      className={cn(
                        "mt-1 inline-block rounded px-1 font-mono text-[9px] tabular-nums",
                        kpi.positive ? "bg-primary-soft text-primary-strong" : "bg-accent-soft text-accent-foreground",
                      )}
                    >
                      {kpi.delta}
                    </span>
                  </div>
                ))}
              </div>

              <ChartCard />

              <div data-hero-ui className="overflow-hidden rounded-lg border border-border">
                {rows.map((row, index) => (
                  <div
                    key={row.name}
                    className={cn(
                      "grid grid-cols-[1fr_auto_auto] items-center gap-3 px-2.5 py-1.5 text-[10.5px] sm:grid-cols-[1fr_70px_64px_auto]",
                      index > 0 && "border-t border-border",
                    )}
                  >
                    <span className="truncate font-medium">{row.name}</span>
                    <span className="hidden text-subtle-foreground sm:block">{row.plan}</span>
                    <span className={cn("w-fit rounded px-1.5 py-px text-[9.5px]", statusStyles[row.status])}>{row.status}</span>
                    <span className="text-right font-mono tabular-nums text-muted-foreground">{row.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating detail cards */}
      <div data-depth="1.1" className="absolute -bottom-8 -left-3 w-[210px] sm:-left-8 sm:w-[236px] lg:-left-12">
        <ApiCard />
      </div>
      <div data-depth="1.4" className="absolute -right-3 -top-8 hidden w-[176px] sm:block lg:-right-6">
        <BreakpointsCard />
      </div>
      <div data-depth="0.9" className="absolute -bottom-5 right-6 hidden sm:block lg:right-10">
        <DeployCard />
      </div>
    </div>
  );
}

function BrowserBar() {
  return (
    <div data-hero-ui className="flex h-9 items-center gap-3 border-b border-border bg-surface-muted/60 px-3">
      <div className="flex gap-1.5" aria-hidden="true">
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="size-2.5 rounded-full bg-border-strong" />
      </div>
      <div className="mx-auto flex h-5 w-full max-w-[220px] items-center justify-center gap-1.5 rounded-md border border-border bg-surface px-2 font-mono text-[10px] text-subtle-foreground">
        <span className="size-1.5 rounded-full bg-primary" />
        app.yourproduct.com/overview
      </div>
      <div className="w-[42px]" />
    </div>
  );
}

function Sidebar() {
  return (
    <div data-hero-ui className="hidden flex-col gap-0.5 border-r border-border p-2.5 sm:flex">
      <div className="mb-2 flex items-center gap-2 px-1.5 py-1">
        <span className="size-4 rounded-[5px] bg-primary" />
        <span className="text-[11px] font-semibold">Workspace</span>
      </div>
      {navigation.map((item, index) => (
        <div
          key={item}
          className={cn(
            "flex items-center gap-2 rounded-md px-1.5 py-1 text-[11px]",
            index === 0 ? "bg-surface-muted font-medium text-foreground" : "text-subtle-foreground",
          )}
        >
          <span className={cn("size-1.5 rounded-full", index === 0 ? "bg-primary" : "bg-border-strong")} />
          {item}
        </div>
      ))}
      <div className="mt-auto flex items-center gap-1.5 px-1.5 pt-6 text-[10px] text-subtle-foreground">
        <span className="relative flex size-1.5">
          <span className="status-ping absolute inset-0 rounded-full bg-primary" />
          <span className="relative size-1.5 rounded-full bg-primary" />
        </span>
        All systems normal
      </div>
    </div>
  );
}

function ChartCard() {
  return (
    <div data-hero-ui className="rounded-lg border border-border p-2.5 sm:p-3">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-medium">Revenue trend</p>
        <div className="flex items-center gap-2.5 text-[9.5px] text-subtle-foreground">
          <span className="flex items-center gap-1">
            <span className="h-0.5 w-2.5 rounded-full bg-primary" />
            This period
          </span>
          <span className="flex items-center gap-1">
            <span className="h-0.5 w-2.5 rounded-full bg-accent" />
            Previous
          </span>
        </div>
      </div>
      <svg viewBox="0 0 320 96" className="mt-2 h-auto w-full" aria-hidden="true">
        <defs>
          <linearGradient id="hero-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[24, 48, 72].map((y) => (
          <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="var(--border)" strokeWidth="1" />
        ))}
        <path
          d="M0 74 C 28 70, 44 60, 70 62 S 116 44, 142 48 S 190 34, 214 30 S 262 26, 284 16 S 312 12, 320 10"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.25"
          strokeDasharray="3 4"
          opacity="0.7"
          transform="translate(0 14)"
        />
        <path
          d="M0 78 C 30 72, 46 66, 72 58 S 118 52, 146 40 S 194 38, 218 28 S 262 22, 286 14 S 310 10, 320 8 L 320 96 L 0 96 Z"
          fill="url(#hero-area)"
        />
        <path
          d="M0 78 C 30 72, 46 66, 72 58 S 118 52, 146 40 S 194 38, 218 28 S 262 22, 286 14 S 310 10, 320 8"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <line x1="218" x2="218" y1="28" y2="96" stroke="var(--border-strong)" strokeDasharray="2 3" />
        <circle cx="218" cy="28" r="3.5" fill="var(--surface)" stroke="var(--primary)" strokeWidth="1.75" />
      </svg>
    </div>
  );
}

function ApiCard() {
  return (
    <div data-hero-float className="rounded-lg border border-border-strong bg-surface p-3 font-mono text-[10.5px] shadow-float">
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5">
          <span className="rounded bg-primary-soft px-1 py-px font-semibold text-primary-strong">GET</span>
          <span className="text-muted-foreground">/api/v1/metrics</span>
        </span>
      </div>
      <div className="mt-2 flex items-center gap-2 text-subtle-foreground">
        <span className="flex items-center gap-1 text-foreground">
          <span className="size-1.5 rounded-full bg-primary" />
          200 OK
        </span>
        <span>·</span>
        <span>118 ms</span>
        <span>·</span>
        <span>cached</span>
      </div>
      <pre className="mt-2 rounded-md bg-surface-muted p-2 leading-[1.55] text-muted-foreground">
        <span className="text-subtle-foreground">{"{"}</span>
        {"\n  "}
        <span className="text-primary-strong">&quot;range&quot;</span>: &quot;30d&quot;,
        {"\n  "}
        <span className="text-primary-strong">&quot;series&quot;</span>: [ … ]
        {"\n"}
        <span className="text-subtle-foreground">{"}"}</span>
      </pre>
    </div>
  );
}

function BreakpointsCard() {
  const devices = [
    { icon: Smartphone, label: "sm" },
    { icon: Tablet, label: "md" },
    { icon: Monitor, label: "lg", active: true },
  ];
  return (
    <div data-hero-float className="rounded-lg border border-border-strong bg-surface p-3 shadow-float">
      <p className="text-[10px] font-medium text-subtle-foreground">Responsive layout</p>
      <div className="mt-2 grid grid-cols-3 gap-1.5">
        {devices.map(({ icon: Icon, label, active }) => (
          <div
            key={label}
            className={cn(
              "flex flex-col items-center gap-1 rounded-md border py-1.5",
              active ? "border-primary/40 bg-primary-soft text-primary-strong" : "border-border text-subtle-foreground",
            )}
          >
            <Icon className="size-3.5" aria-hidden="true" />
            <span className="font-mono text-[9px]">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DeployCard() {
  return (
    <div data-hero-float className="flex items-center gap-2 rounded-full border border-border-strong bg-surface py-1.5 pl-1.5 pr-3 shadow-float">
      <span className="grid size-5 place-items-center rounded-full bg-primary text-primary-foreground dark:text-[#042f2e]">
        <Check className="size-3" strokeWidth={3} aria-hidden="true" />
      </span>
      <span className="text-[11px] font-medium">Deployed</span>
      <span className="font-mono text-[10px] text-subtle-foreground">main · 2m ago</span>
    </div>
  );
}
