"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { type Theme, getTheme, setTheme, subscribeToTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const options: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

export function ThemeSwitcher({ className, size = "sm" }: { className?: string; size?: "sm" | "lg" }) {
  // The server can't know the stored theme, so nothing is selected until hydration completes.
  const theme = useSyncExternalStore(subscribeToTheme, getTheme, () => null);

  return (
    <div
      role="group"
      aria-label="Colour theme"
      className={cn("inline-flex items-center gap-0.5 rounded-full border border-border bg-surface/60 p-0.5", className)}
    >
      {options.map(({ value, label, icon: Icon }) => {
        const active = theme === value;
        return (
          <button
            key={value}
            type="button"
            aria-pressed={active}
            aria-label={label}
            title={label}
            onClick={() => setTheme(value)}
            className={cn(
              "grid place-items-center rounded-full transition-colors duration-200",
              size === "sm" ? "size-7" : "size-10",
              active
                ? "bg-surface-muted text-foreground shadow-[0_0_0_1px_var(--border-strong)]"
                : "text-subtle-foreground hover:text-foreground",
            )}
          >
            <Icon className="size-3.5" aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}
