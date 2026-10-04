# Frontend Developer Portfolio

A portfolio and lead-generation site for a freelance frontend developer, built with Next.js (App Router), TypeScript, Tailwind CSS v4 and GSAP.

All personal details, projects and testimonials are **placeholders**. They are labelled in the UI ("Sample content", "Placeholder testimonial") until you replace them.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

| Command             | Purpose                         |
| ------------------- | ------------------------------- |
| `npm run dev`       | Development server (Turbopack)  |
| `npm run build`     | Production build                |
| `npm run start`     | Serve the production build      |
| `npm run lint`      | ESLint                          |
| `npm run typecheck` | TypeScript, no emit             |

Requires Node.js 20.9 or later.

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx               Root layout: fonts, theme script, metadata, nav, footer
│   ├── page.tsx                 Home page (composes the sections)
│   ├── work/page.tsx            All case studies
│   ├── work/[slug]/page.tsx     Case study page (static, with per-project metadata)
│   ├── work/[slug]/not-found.tsx
│   ├── not-found.tsx            Custom 404
│   ├── error.tsx, loading.tsx
│   ├── sitemap.ts, robots.ts, opengraph-image.tsx, icon.svg
│   └── globals.css              Design tokens, type scale, utilities
├── components/
│   ├── animations/              GSAP: TextReveal, Reveal, RevealGroup, Parallax, SplitWords
│   ├── navigation/              Navbar, MobileMenu, ThemeSwitcher, Logo
│   ├── hero/                    Hero, HeroVisual, HeroMotion
│   ├── projects/                SelectedWork, ProjectCard, ProjectVisual, ProjectMedia
│   ├── case-study/              Case study blocks, TOC, next project
│   ├── services/ skills/ about/ process/ values/ testimonials/
│   ├── contact/                 Contact section, final CTA, ContactForm
│   ├── footer/  not-found/
│   └── ui/                      Button, Badge, Toast, CopyEmailButton, BackToTop, icons…
├── data/                        All content: site-config, projects, services, skills, process, testimonials
├── lib/                         gsap.ts, theme.ts, seo.ts, assets.ts, contact/
└── types/                       Shared TypeScript types
```

Pages are Server Components. Client components are limited to animation wrappers, navigation, the theme switcher, the contact form, the toast, and copy-to-clipboard.

---

## Replacing placeholder content

| What                      | Where                                                                                           |
| ------------------------- | ----------------------------------------------------------------------------------------------- |
| Name, initials, role      | `src/data/site-config.ts` → `name`, `initials`                                                   |
| Experience                | `src/data/site-config.ts` → `experience` (shown in About; keep it accurate)                      |
| Email, GitHub, LinkedIn   | `src/data/site-config.ts` → `EMAIL_ADDRESS`, `GITHUB_URL`, `LINKEDIN_URL`                        |
| Resume                    | Put the file at `public/resume.pdf`, or set `RESUME_URL` to an external link                     |
| Location / availability   | `src/data/site-config.ts` → `location`, `timezone`, `availability`, `responseTime`               |
| Profile image             | Add `public/images/profile.jpg` (portrait, about 4:5). A monogram placeholder shows until then.  |
| Projects                  | `src/data/projects.ts`                                                                           |
| Project images            | `public/images/projects/…` (paths are set per project). A rendered UI preview shows if missing.  |
| Testimonials              | `src/data/testimonials.ts`. Set `isPlaceholder: false` for real ones, or empty the array to hide the section. |
| Services                  | `src/data/services.ts`                                                                           |
| Skills                    | `src/data/skills.ts`                                                                             |
| Process / standards       | `src/data/process.ts`                                                                            |
| Hero headline             | `src/components/hero/hero.tsx`                                                                   |

Search the codebase for `REPLACE` to find every placeholder value.

---

## Adding a project

1. Add an object to the `projects` array in `src/data/projects.ts`. TypeScript enforces the `Project` type in `src/types/index.ts`.
2. Choose a unique `slug`. It becomes `/work/<slug>`.
3. Add images to `public/images/projects/` and reference them in `image` and `gallery`.
4. Set `visual` (`analytics`, `portal`, `property` or `workspace`). This is the preview shown when the cover image is missing.
5. Set `isPlaceholder: false`.

The home page, `/work`, the case study page, the sitemap and the metadata all update automatically. On the home page the layout alternates: a wide featured row, then a two-column pair, then a reversed wide row.

**Honesty rule:** don't add metrics you can't back up. Outcome lines that start with `Placeholder:` are styled as placeholders.

## Modifying services

Edit `src/data/services.ts`. Each service takes a `title`, a `description`, a Lucide `icon` and a list of `technologies`. `engagementTypes` drives the chips under the services grid.

## Modifying colours

All colours are CSS variables in `src/app/globals.css`:

- `:root`: light theme
- `.dark`: dark theme (warm deep neutrals, intentionally not an inversion)

`--primary` (#0D9488) is the brand teal used for accents. `--primary-strong` is a darker teal in light mode, used for text and filled buttons so white text meets WCAG AA. Coral (`--accent`) is reserved for small details and placeholder markers. Tailwind classes such as `bg-primary` and `text-muted-foreground` map to these variables through `@theme inline`.

The type scale (`text-display`, `text-section`, `text-title`, `text-lead`, `text-label`, `text-caption`) and the layout utilities (`container-page`, `section-y`) are defined in the same file.

## Modifying GSAP animations

- **Shared setup:** `src/lib/gsap.ts` registers ScrollTrigger and `useGSAP`, and defines `MOTION` media queries (desktop, mobile, reduced, fine pointer).
- **Hero timeline:** `src/components/hero/hero-motion.tsx`. Elements are targeted by `data-hero` attributes, so the markup stays server-rendered.
- **Section headings:** `TextReveal` (word mask reveal).
- **Groups of items:** `Reveal` (one trigger per group, `once: true`).
- **Long pages:** `RevealGroup` (batches every `[data-reveal]` element).
- **Project cards:** `src/components/projects/project-card-motion.tsx` (scroll reveal plus hover).
- **Process timeline:** `src/components/process/process-timeline.tsx` (scrubbed progress line).
- **Navbar:** `src/components/navigation/navbar.tsx` (entrance, condensed state, active indicator).

Every animation runs inside `useGSAP` and `gsap.matchMedia()`, so it is cleaned up on unmount and switched off for `prefers-reduced-motion`. Mobile uses shorter distances and staggers. Only `transform` and `opacity` are animated.

Above-the-fold elements use the `is-pending` and `data-animate` pattern. CSS hides them until GSAP applies from-states, which prevents a flash before hydration. A CSS fallback reveals them after 2.5 s if JavaScript fails.

---

## Contact form

The form posts to a **Server Action** (`src/lib/contact/actions.ts`). Validation is shared between client and server (`src/lib/contact/schema.ts`). A honeypot field filters basic bots.

Delivery happens in `src/lib/contact/send.ts`:

- **Resend (built in):** set `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL`. The sender must be on a domain you have verified in Resend.
- **No key:** in development the form runs in *preview mode*. It logs to the server console and the success screen says nothing was sent. In production it shows an error asking visitors to email you, so leads are never lost silently.
- **Other providers** (Formspree, EmailJS, Supabase, your own API): replace the `deliver` function and keep its return shape. Keep secrets in server-only environment variables (no `NEXT_PUBLIC_` prefix).

For high traffic, consider adding rate limiting, for example Vercel Firewall rules or Upstash.

## Environment variables

Copy `.env.example` to `.env.local`:

| Variable               | Required          | Description                                                           |
| ---------------------- | ----------------- | --------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Yes (production)  | Public URL, e.g. `https://yourname.dev`. Used for canonical URLs, OG and sitemap. |
| `RESEND_API_KEY`       | For contact form  | Resend API key (server only)                                          |
| `CONTACT_TO_EMAIL`     | For contact form  | Inbox that receives inquiries                                         |
| `CONTACT_FROM_EMAIL`   | For contact form  | Verified sender, e.g. `Portfolio <hello@yourname.dev>`                |

---

## Deploying to Vercel

1. Push the project to a GitHub, GitLab or Bitbucket repository.
2. In Vercel, choose **Add New → Project** and import the repository. The framework is detected as Next.js, and no build settings need changing.
3. Add the environment variables above under **Settings → Environment Variables**.
4. Deploy, then add your custom domain under **Settings → Domains**.
5. Update `NEXT_PUBLIC_SITE_URL` to the final domain and redeploy.

---

## Pre-launch checklist

- [ ] Name, initials, email, GitHub, LinkedIn and location replaced (search for `REPLACE`)
- [ ] `experience` value is accurate
- [ ] `public/resume.pdf` added, or `RESUME_URL` points to a real file
- [ ] `public/images/profile.jpg` added
- [ ] Sample projects replaced with real work, each with `isPlaceholder: false`
- [ ] Project screenshots added to `public/images/projects/`
- [ ] Placeholder testimonials replaced with real ones, or removed
- [ ] No unverifiable metrics or claims anywhere
- [ ] `NEXT_PUBLIC_SITE_URL` set to the production domain
- [ ] Contact form tested end to end in production (Resend variables set)
- [ ] `npm run lint`, `npm run typecheck` and `npm run build` pass
- [ ] Checked on a real phone: navigation, mobile menu, form
- [ ] Light, dark and system themes checked
- [ ] Lighthouse run (Performance, Accessibility, SEO)
- [ ] Open Graph preview checked (e.g. opengraph.xyz) after deploying
- [ ] `/sitemap.xml` and `/robots.txt` load correctly
