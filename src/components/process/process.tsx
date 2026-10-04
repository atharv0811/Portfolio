import { ArrowRight } from "lucide-react";
import { TextReveal } from "@/components/animations/text-reveal";
import { Eyebrow } from "@/components/layout/section-header";
import { processSteps } from "@/data/process";
import { ProcessTimeline } from "./process-timeline";

const commitments = ["Regular progress updates", "Preview links at each milestone", "Clear handoff documentation"];

export function Process() {
  return (
    <section data-nav-section="about" aria-labelledby="process-title" className="section-y border-y border-border bg-surface/60">
      <div className="container-page grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div className="self-start lg:sticky lg:top-[calc(var(--header-height)+3rem)]">
          <Eyebrow>Process</Eyebrow>
          <TextReveal id="process-title" text="How I Work" className="mt-4 text-section" />
          <p className="mt-4 max-w-md text-lead text-muted-foreground">
            A simple, transparent process — so you always know what&apos;s being built and what comes next.
          </p>
          <ul className="mt-8 space-y-3 border-t border-border pt-8">
            {commitments.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[0.9375rem] text-muted-foreground">
                <span aria-hidden="true" className="h-px w-4 bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <ProcessTimeline>
          <ol className="relative">
            {processSteps.map((step, index) => (
              <li
                key={step.step}
                data-process-step
                className={index === processSteps.length - 1 ? "relative pl-14" : "relative pb-12 pl-14 md:pb-14"}
              >
                <span
                  data-process-marker
                  aria-hidden="true"
                  className="absolute left-0 top-0 grid size-8 place-items-center rounded-full border border-border-strong bg-background font-mono text-[11px] text-subtle-foreground transition-colors duration-500 [&.is-active]:border-primary-strong [&.is-active]:bg-primary-strong [&.is-active]:text-primary-foreground"
                >
                  {step.step}
                </span>
                <div data-process-content className="pt-0.5">
                  <h3 className="text-title">
                    <span className="sr-only">Step {step.step}: </span>
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-lg text-pretty text-muted-foreground">{step.description}</p>
                  <p className="mt-4 inline-flex items-center gap-2 rounded-md border border-border bg-background px-2.5 py-1 font-mono text-xs text-muted-foreground">
                    <ArrowRight className="size-3 text-primary-strong" aria-hidden="true" />
                    {step.deliverable}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </ProcessTimeline>
      </div>
    </section>
  );
}
