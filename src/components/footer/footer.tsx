import Link from "next/link";
import { Logo } from "@/components/navigation/logo";
import { ButtonArrow, ButtonLink } from "@/components/ui/button";
import { socialLinks } from "@/components/ui/social-links";
import { navItems, siteConfig } from "@/data/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="site-footer" className="border-t border-border">
      <div className="container-page py-14 md:py-16">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-muted-foreground">{siteConfig.tagline}</p>
            <ButtonLink href="/#contact" variant="secondary" size="sm" className="mt-6">
              Let&apos;s Talk
              <ButtonArrow />
            </ButtonLink>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-label text-subtle-foreground">Navigate</h2>
            <ul className="mt-4 space-y-1">
              {navItems.map((item) => (
                <li key={item.sectionId}>
                  <Link href={item.href} className="inline-flex min-h-8 items-center text-muted-foreground transition-colors hover:text-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-label text-subtle-foreground">Connect</h2>
            <ul className="mt-4 space-y-1">
              {socialLinks.map(({ label, href }) => {
                const external = !href.startsWith("mailto:");
                return (
                  <li key={label}>
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group inline-flex min-h-8 items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {label}
                      {external ? (
                        <span className="text-subtle-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true">
                          ↗
                        </span>
                      ) : null}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-8 text-caption text-subtle-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>
            Built with{" "}
            <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="underline decoration-border-strong underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground">
              Next.js
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
