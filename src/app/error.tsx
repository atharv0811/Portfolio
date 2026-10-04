"use client";

import { RotateCcw } from "lucide-react";
import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="container-page flex min-h-[80dvh] flex-col items-center justify-center pb-20 pt-[calc(var(--header-height)+3rem)] text-center">
      <p className="font-mono text-sm text-subtle-foreground">Something went wrong</p>
      <h1 className="mt-3 max-w-xl text-balance text-section">This page hit an unexpected error.</h1>
      <p className="mt-4 max-w-md text-lead text-muted-foreground">
        Try again — if it keeps happening, the home page should still work.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button size="lg" onClick={reset}>
          <RotateCcw aria-hidden="true" />
          Try again
        </Button>
        <ButtonLink href="/" variant="secondary" size="lg">
          Back Home
        </ButtonLink>
      </div>
    </section>
  );
}
