import { Quote } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeader } from "@/components/layout/section-header";
import { PlaceholderBadge } from "@/components/ui/badge";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section data-nav-section="contact" aria-labelledby="testimonials-title" className="section-y border-t border-border bg-surface/60">
      <div className="container-page">
        <SectionHeader
          id="testimonials-title"
          eyebrow="Testimonials"
          title="What people say"
          description="Feedback from people I've worked with."
        />

        <Reveal as="ul" stagger={0.1} className="mt-14 grid gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <li key={index}>
              <figure className="flex h-full flex-col rounded-xl border border-border bg-background p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <Quote className="size-5 text-primary" aria-hidden="true" />
                  {testimonial.isPlaceholder ? <PlaceholderBadge label="Placeholder testimonial" /> : null}
                </div>
                <blockquote className="mt-6 flex-1 text-pretty leading-relaxed text-foreground/85">
                  <p>{testimonial.quote}</p>
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3 border-t border-border pt-5">
                  <span aria-hidden="true" className="grid size-9 place-items-center rounded-full bg-surface-muted font-mono text-xs text-subtle-foreground">
                    {testimonial.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                  <span>
                    <span className="block text-sm font-medium">{testimonial.name}</span>
                    <span className="block text-caption text-subtle-foreground">{testimonial.role}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
