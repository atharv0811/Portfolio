import Link from "next/link";
import type { ComponentProps } from "react";
import { cn, isExternalUrl } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "inverse" | "inverse-outline";
type Size = "sm" | "md" | "lg";

const base =
  "group/button relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium tracking-[-0.01em] transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out active:translate-y-px disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-4 [&_svg]:shrink-0";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary-strong text-primary-foreground shadow-[0_1px_0_rgb(255_255_255/0.18)_inset,0_1px_2px_rgb(0_0_0/0.12)] hover:bg-[color-mix(in_oklab,var(--primary-strong),black_12%)] dark:hover:bg-[color-mix(in_oklab,var(--primary-strong),white_14%)]",
  secondary:
    "border border-border-strong bg-surface text-foreground hover:border-foreground/25 hover:bg-surface-muted",
  ghost: "text-muted-foreground hover:bg-surface-muted hover:text-foreground",
  inverse: "bg-[#faf9f9] text-[#1c1917] hover:bg-white",
  "inverse-outline": "border border-white/15 text-white hover:border-white/30 hover:bg-white/5",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-12 px-6 text-base",
};

export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonProps = ComponentProps<"button"> & { variant?: Variant; size?: Size };

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonVariants({ variant, size, className })} {...props} />;
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  variant?: Variant;
  size?: Size;
};

/** Link styled as a button. External links open in a new tab with safe rel attributes. */
export function ButtonLink({ href, variant, size, className, children, ...props }: ButtonLinkProps) {
  const classes = buttonVariants({ variant, size, className });
  if (isExternalUrl(href) || href.endsWith(".pdf")) {
    const opensNewTab = !href.startsWith("mailto:");
    return (
      <a
        href={href}
        className={classes}
        {...(opensNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(props as ComponentProps<"a">)}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}

/** Arrow that nudges on hover of the parent button/link. */
export function ButtonArrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={cn(
        "transition-transform duration-300 ease-out",
        diagonal
          ? "group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
          : "group-hover/button:translate-x-0.5",
      )}
    >
      {diagonal ? (
        <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}
