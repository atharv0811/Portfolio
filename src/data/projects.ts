import type { Project } from "@/types";

/**
 * SAMPLE PROJECTS — every entry below is placeholder content that describes the kind of
 * work this portfolio is meant to show. Replace each with a real project (or delete it)
 * and set `isPlaceholder: false`. The UI labels placeholder projects automatically.
 *
 * Order matters: the home page layout uses index 0 and 3 as wide "featured" rows and
 * index 1 + 2 as a two-column pair.
 */
export const projects: Project[] = [
  {
    slug: "saas-analytics-dashboard",
    title: "SaaS Analytics Dashboard",
    category: "SaaS Dashboard",
    description:
      "A data-dense analytics workspace with filterable reports, saved views and role-aware navigation.",
    year: "2025",
    role: "Frontend Developer",
    timeline: "Placeholder · e.g. 10 weeks",
    isPlaceholder: true,
    technologies: ["Next.js", "TypeScript", "React Query", "Tailwind CSS", "Recharts"],
    image: "/images/projects/project-1.webp",
    visual: "analytics",
    gallery: [
      { src: "/images/projects/project-1-overview.webp", alt: "Analytics overview screen", caption: "Overview with KPI cards and trend chart" },
      { src: "/images/projects/project-1-reports.webp", alt: "Reports table with filters", caption: "Reports table with saved filters" },
    ],
    overview:
      "An analytics product for operations teams who needed to explore business metrics without exporting spreadsheets. The frontend had to make large datasets feel fast and understandable on desktop and usable on tablets.",
    responsibilities: [
      "Built the dashboard shell, navigation and layout system",
      "Implemented the report table with server-side pagination, sorting and filters",
      "Integrated REST endpoints with React Query, including caching and background refresh",
      "Collaborated with design on chart states, empty states and responsive behaviour",
    ],
    challenge:
      "Users were switching between multiple tools to answer simple questions. The existing screens loaded every record at once, filters reset on navigation and charts had no meaningful loading or empty states.",
    challenges: [
      { title: "Large datasets", description: "Reports could return thousands of rows, so rendering everything on the client was not an option." },
      { title: "Shareable state", description: "Filters and date ranges needed to survive refreshes and be shareable as links." },
      { title: "Consistent states", description: "Every widget needed predictable loading, empty and error states." },
    ],
    solution:
      "Filters were moved into the URL, data fetching was centralised in typed React Query hooks, and the report table was rebuilt around server-side pagination with a virtualised body for long pages.",
    features: [
      "URL-synced filters and date ranges",
      "Saved views per user",
      "Server-side paginated report table",
      "Skeleton, empty and error states for every widget",
      "Role-aware navigation",
    ],
    architecture: [
      { title: "App shell", description: "Next.js App Router layouts for the sidebar, header and nested report routes." },
      { title: "Data layer", description: "Typed API client plus React Query hooks per resource, with shared query keys." },
      { title: "State", description: "URL search params as the source of truth for filters; local UI state stays in components." },
      { title: "UI kit", description: "Small set of composable primitives — table, card, filter bar, chart frame." },
    ],
    uxDecisions: [
      { title: "Filters stay visible", description: "A sticky filter bar keeps context while scrolling long reports." },
      { title: "Numbers first", description: "KPI cards lead with the value and change, with detail available on hover or tap." },
      { title: "Calm density", description: "Tight spacing in tables, generous spacing around them, so dense data stays readable." },
    ],
    implementation: [
      { title: "Typed query hooks", description: "Each endpoint has a hook that owns its query key, parsing and stale time." },
      { title: "Virtualised rows", description: "Only visible table rows are rendered, keeping scroll smooth on long pages." },
      { title: "Prefetching", description: "The next page of results is prefetched when the user nears the end of the current page." },
    ],
    codeSample: {
      filename: "use-report.ts",
      code: `export function useReport(filters: ReportFilters) {
  return useQuery({
    queryKey: reportKeys.list(filters),
    queryFn: ({ signal }) => api.reports.list(filters, { signal }),
    placeholderData: keepPreviousData,
    staleTime: 60_000,
  });
}`,
    },
    responsive: [
      "Sidebar collapses to a bottom sheet on tablets and phones",
      "Tables switch to stacked rows below 768px with the most important columns first",
      "Charts reduce tick density on narrow screens instead of shrinking text",
    ],
    performance: [
      "Server-side pagination instead of loading full datasets",
      "Previous results stay visible while new filters load to avoid layout jumps",
      "Charts are code-split and loaded only on routes that use them",
    ],
    outcome: [
      "Placeholder: describe the real result, e.g. what users could now do that they couldn't before",
      "Placeholder: qualitative feedback from the team or stakeholders",
      "Placeholder: a verified metric, only if you can back it up",
    ],
    learnings: [
      "Treating the URL as state simplifies more than just sharing links",
      "Designing empty and error states early prevents late redesigns",
    ],
  },
  {
    slug: "customer-portal",
    title: "Customer Self-Service Portal",
    category: "Customer Portal",
    description:
      "A self-service portal where customers track requests, manage invoices and update account details.",
    year: "2025",
    role: "Frontend Developer",
    timeline: "Placeholder · e.g. 8 weeks",
    isPlaceholder: true,
    technologies: ["React", "TypeScript", "Redux Toolkit", "Axios", "Tailwind CSS"],
    image: "/images/projects/project-2.webp",
    visual: "portal",
    gallery: [
      { src: "/images/projects/project-2-requests.webp", alt: "Customer requests list", caption: "Request tracking with status timeline" },
      { src: "/images/projects/project-2-billing.webp", alt: "Billing and invoices screen", caption: "Billing and invoice history" },
    ],
    overview:
      "A customer-facing portal that reduces support emails by letting customers see the status of their requests, download invoices and manage their own account details.",
    responsibilities: [
      "Implemented authentication flows and protected routes",
      "Built request tracking with a status timeline and comments",
      "Created reusable form components with validation and inline errors",
      "Handled API error mapping into user-friendly messages",
    ],
    challenge:
      "Customers relied on email for every status update. The portal needed to feel trustworthy and simple for non-technical users while handling session expiry, permissions and many form flows.",
    challenges: [
      { title: "Session handling", description: "Expired sessions had to be handled without losing what the user was typing." },
      { title: "Many forms", description: "Dozens of forms needed consistent validation, errors and submission states." },
      { title: "Trust", description: "Billing information needed clarity and zero ambiguity." },
    ],
    solution:
      "A shared form system standardised validation and error display, an Axios interceptor handled token refresh transparently, and a status timeline replaced long email threads with a single source of truth.",
    features: [
      "Login, password reset and protected routes",
      "Request tracking with status timeline",
      "Invoice list with download links",
      "Profile and notification preferences",
    ],
    architecture: [
      { title: "Routing", description: "Public and authenticated route groups with a guarded layout." },
      { title: "API client", description: "Axios instance with interceptors for auth headers, refresh and error normalisation." },
      { title: "State", description: "Redux Toolkit for session and user preferences; server data fetched per screen." },
      { title: "Forms", description: "Reusable field components that share labels, hints and error semantics." },
    ],
    uxDecisions: [
      { title: "Status in plain language", description: "Internal ticket states were mapped to customer-friendly labels." },
      { title: "Inline validation", description: "Errors appear next to the field after the user leaves it, not while typing." },
      { title: "Clear next steps", description: "Every request shows what happens next and who is responsible." },
    ],
    implementation: [
      { title: "Token refresh queue", description: "Concurrent requests wait for a single refresh instead of triggering several." },
      { title: "Error normalisation", description: "API errors are converted into one typed shape the UI can render consistently." },
      { title: "Accessible forms", description: "Labels, descriptions and errors are linked with proper ARIA attributes." },
    ],
    codeSample: {
      filename: "api-client.ts",
      code: `api.interceptors.response.use(undefined, async (error) => {
  if (error.response?.status !== 401) throw normalizeError(error);
  await refreshSession(); // shared promise — one refresh at a time
  return api.request(error.config);
});`,
    },
    responsive: [
      "Mobile-first layouts — most customers open the portal from email on their phone",
      "Tables become cards on small screens",
      "Large touch targets for primary actions",
    ],
    performance: [
      "Route-level code splitting for rarely used settings screens",
      "Optimistic UI for comment posting",
      "Requests cancelled when users navigate away",
    ],
    outcome: [
      "Placeholder: describe how customers or the support team benefited",
      "Placeholder: note any feedback received after launch",
    ],
    learnings: [
      "Consistent form patterns save more time than any single component",
      "Error messages are part of the product's tone of voice",
    ],
  },
  {
    slug: "property-management-console",
    title: "Property Management Console",
    category: "Property Management",
    description:
      "An operations console for managing units, tenants, maintenance requests and payments in one place.",
    year: "2024",
    role: "Frontend Developer",
    timeline: "Placeholder · e.g. 12 weeks",
    isPlaceholder: true,
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
    image: "/images/projects/project-3.webp",
    visual: "property",
    gallery: [
      { src: "/images/projects/project-3-units.webp", alt: "Units overview grid", caption: "Units overview with occupancy status" },
      { src: "/images/projects/project-3-maintenance.webp", alt: "Maintenance requests board", caption: "Maintenance requests by priority" },
    ],
    overview:
      "An internal console for property managers to see occupancy, handle maintenance requests and track payments, replacing a mix of spreadsheets and messaging apps.",
    responsibilities: [
      "Built the units, tenants and maintenance modules",
      "Designed reusable status badges, filters and detail drawers",
      "Worked on Prisma queries and API routes for the modules I built",
      "Implemented role-based visibility for managers and staff",
    ],
    challenge:
      "Managers needed to answer \"what needs attention today?\" quickly. Information was spread across tools and nothing showed priorities clearly.",
    challenges: [
      { title: "Prioritisation", description: "Urgent maintenance requests had to stand out without making the UI noisy." },
      { title: "Relational data", description: "Units, tenants, leases and payments are deeply connected." },
      { title: "Roles", description: "Staff should only see and edit what is relevant to them." },
    ],
    solution:
      "A \"today\" overview surfaces urgent items first, detail drawers keep users in context instead of navigating away, and server components fetch relational data close to the database.",
    features: [
      "Occupancy overview",
      "Maintenance requests with priority and assignee",
      "Tenant and lease details in side drawers",
      "Payment status tracking",
    ],
    architecture: [
      { title: "Server-first pages", description: "Server Components query data via Prisma and stream to the client." },
      { title: "Client islands", description: "Only filters, drawers and forms are client components." },
      { title: "Mutations", description: "Server actions with validation, followed by targeted revalidation." },
      { title: "Access control", description: "Role checks in the data layer, mirrored in the UI." },
    ],
    uxDecisions: [
      { title: "Drawers over pages", description: "Details open in a drawer so the list context is never lost." },
      { title: "Status colour system", description: "A small, consistent palette for status — always paired with text." },
      { title: "Today view", description: "The default screen answers what needs attention now." },
    ],
    implementation: [
      { title: "Streaming", description: "Slow sections stream in with skeletons while the page shell renders immediately." },
      { title: "Typed queries", description: "Prisma types flow to components, catching shape changes at compile time." },
      { title: "Revalidation", description: "Mutations revalidate only the affected routes." },
    ],
    responsive: [
      "Drawers become full-screen sheets on phones",
      "Overview cards reflow from four columns to one",
      "Filters collapse into a single sheet on small screens",
    ],
    performance: [
      "Less client JavaScript by keeping data-heavy views on the server",
      "Streaming with Suspense boundaries per section",
      "Pagination for tenant and payment lists",
    ],
    outcome: [
      "Placeholder: describe how the team's workflow changed",
      "Placeholder: qualitative feedback from property managers",
    ],
    learnings: [
      "Server Components simplify data-heavy internal tools",
      "Status colours need text labels to be accessible and unambiguous",
    ],
  },
  {
    slug: "team-task-workspace",
    title: "Team Task Workspace",
    category: "Productivity Application",
    description:
      "A collaborative task board with drag-and-drop columns, keyboard shortcuts and real-time-ready architecture.",
    year: "2024",
    role: "Frontend Developer",
    timeline: "Placeholder · e.g. 6 weeks",
    isPlaceholder: true,
    technologies: ["React", "TypeScript", "Node.js", "Express", "MongoDB"],
    image: "/images/projects/project-4.webp",
    visual: "workspace",
    gallery: [
      { src: "/images/projects/project-4-board.webp", alt: "Kanban task board", caption: "Board view with columns and task cards" },
      { src: "/images/projects/project-4-task.webp", alt: "Task detail panel", caption: "Task details with checklist and activity" },
    ],
    overview:
      "A productivity tool for small teams to plan work on a board, with fast keyboard-driven interactions and a clean, focused interface.",
    responsibilities: [
      "Built the board, columns and task card components",
      "Implemented drag-and-drop with keyboard alternatives",
      "Created the Express API and MongoDB models for tasks and boards",
      "Added optimistic updates for moving and editing tasks",
    ],
    challenge:
      "Task tools often feel slow and cluttered. The goal was a board that responds instantly and stays usable with a keyboard alone.",
    challenges: [
      { title: "Instant feedback", description: "Moving a task should never wait for the network." },
      { title: "Accessible drag-and-drop", description: "Every drag interaction needed a keyboard equivalent." },
      { title: "Ordering", description: "Task order had to stay consistent across clients." },
    ],
    solution:
      "Optimistic updates with rollback on failure, fractional ordering keys for stable task positions, and a command-style keyboard layer for common actions.",
    features: [
      "Drag-and-drop board with keyboard support",
      "Task details with checklist and comments",
      "Keyboard shortcuts for create, move and search",
      "Filters by assignee and label",
    ],
    architecture: [
      { title: "Client", description: "React with feature-based folders and a small shared UI kit." },
      { title: "API", description: "Express REST API with validation middleware." },
      { title: "Data", description: "MongoDB documents for boards and tasks with fractional order keys." },
      { title: "Sync-ready", description: "State updates are modelled as events so real-time sync can be added later." },
    ],
    uxDecisions: [
      { title: "Keyboard first", description: "Every common action is reachable without the mouse." },
      { title: "Quiet cards", description: "Cards show only title, assignee and due date until opened." },
      { title: "Undo over confirm", description: "Destructive actions offer undo instead of blocking dialogs." },
    ],
    implementation: [
      { title: "Optimistic mutations", description: "UI updates instantly and rolls back with a message if the request fails." },
      { title: "Fractional ordering", description: "New positions are calculated between neighbours, avoiding full re-sorts." },
      { title: "Focus management", description: "Focus follows moved cards so keyboard users never lose their place." },
    ],
    responsive: [
      "Columns scroll horizontally with snap points on phones",
      "Task details open as a full-screen sheet on small screens",
      "Touch-friendly drag handles",
    ],
    performance: [
      "Memoised card components to avoid re-rendering whole columns",
      "Debounced search",
      "Lean dependency footprint",
    ],
    outcome: [
      "Placeholder: summarise what the project demonstrates or how it is used",
      "Placeholder: link to a live demo or repository if available",
    ],
    learnings: [
      "Optimistic UI needs a clear failure story",
      "Accessible drag-and-drop is mostly about focus management",
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
