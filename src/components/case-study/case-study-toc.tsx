"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type TocItem = { id: string; label: string };

export function CaseStudyToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    // The reading line sits ~30% from the top; whichever section crosses it becomes active.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Case study sections" className="sticky top-[calc(var(--header-height)+2rem)] hidden lg:block">
      <p className="text-label text-subtle-foreground">On this page</p>
      <ul className="mt-4 border-l border-border">
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "-ml-px block border-l py-1.5 pl-4 text-sm transition-colors duration-200",
                  isActive
                    ? "border-primary text-foreground"
                    : "border-transparent text-subtle-foreground hover:border-border-strong hover:text-foreground",
                )}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
