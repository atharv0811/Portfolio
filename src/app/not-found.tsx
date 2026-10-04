import type { Metadata } from "next";
import { RouteIllustration } from "@/components/not-found/route-illustration";
import { ButtonArrow, ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[85dvh] items-center overflow-hidden pb-20 pt-[calc(var(--header-height)+3rem)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-grid mask-fade-radial" />
      <div className="container-page flex flex-col items-center text-center">
        <RouteIllustration />
        <p className="mt-10 font-mono text-sm text-subtle-foreground">Error 404</p>
        <h1 className="mt-3 max-w-xl text-balance text-section">Looks like this page took a wrong turn.</h1>
        <p className="mt-4 max-w-md text-lead text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg">
            Back Home
            <ButtonArrow />
          </ButtonLink>
          <ButtonLink href="/#work" variant="secondary" size="lg">
            View My Work
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
