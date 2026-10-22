import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "saas-analytics-dashboard",
    title: "SaaS Analytics Dashboard",
    category: "SaaS Dashboard",
    tag: "Personal Project",
    description:
      "A modern SaaS analytics dashboard built with Next.js, TypeScript and Tailwind CSS, featuring revenue analytics, customer insights, transaction management, interactive charts, filtering, responsive layouts and dark mode.",
    year: "2026",
    role: "Frontend Developer",
    timeline: "4 weeks",
    isPlaceholder: false,

    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Recharts",
      "Zustand",
    ],

    image: "/images/projects/saas-dashboard.png",
    visual: "analytics",

    gallery: [
      {
        src: "/images/projects/saas-dashboard-1.png",
        alt: "SaaS analytics dashboard with KPI cards, charts and revenue analytics",
        caption:
          "Analytics overview with KPI cards, revenue trends and performance insights",
      },
      {
        src: "/images/projects/saas-dashboard-2.png",
        alt: "SaaS analytics reports table with filters and transaction data",
        caption: "Data-rich reports with filtering, sorting and pagination",
      },
    ],

    links: {
      live: "https://saas-analytics-dashboard-flame.vercel.app",
      repository: "https://github.com/atharv0811/SAAS_Analytics_Dashboard",
    },

    overview:
      "A modern analytics platform designed to give SaaS teams a centralized view of revenue, customers, transactions and business performance through a clean and responsive dashboard experience.",

    responsibilities: [
      "Designed and built the complete dashboard interface and application shell",
      "Implemented responsive analytics dashboards with reusable UI components",
      "Built revenue, customer and transaction views with interactive charts and data tables",
      "Implemented filtering, search, sorting and pagination experiences",
      "Created reusable forms and UI patterns using shadcn/ui",
      "Implemented dark mode and responsive behaviour across the application",
    ],

    challenge:
      "The goal was to design a data-heavy SaaS dashboard that could present business metrics clearly without overwhelming users. The interface needed to balance information density, visual hierarchy and responsive behaviour across different screen sizes.",

    challenges: [
      {
        title: "Information density",
        description:
          "Multiple KPIs, charts, tables and filters needed to fit into a clear hierarchy without making the dashboard feel cluttered.",
      },
      {
        title: "Responsive analytics",
        description:
          "Charts, tables and dashboard cards needed to remain useful and readable across desktop, tablet and mobile layouts.",
      },
      {
        title: "Consistent UI",
        description:
          "Different pages needed to share the same visual language, spacing, components and interaction patterns.",
      },
    ],

    solution:
      "The dashboard was structured around reusable components, consistent spacing and typography, responsive layouts, interactive data visualizations and clear loading, empty and error states. Shared UI primitives were used to keep the experience consistent across analytics, customers, transactions and settings.",

    features: [
      "Analytics dashboard with KPI cards and revenue visualizations",
      "Revenue, MRR, customer and conversion analytics",
      "Customer management with search and filtering",
      "Transaction management with filtering and pagination",
      "Interactive charts using Recharts",
      "Responsive data tables and dashboard layouts",
      "Settings and profile management forms",
      "Dark mode",
      "Loading, empty and error states",
    ],

    architecture: [
      {
        title: "Application shell",
        description:
          "Next.js App Router layouts provide the shared sidebar, header and responsive navigation structure.",
      },
      {
        title: "UI system",
        description:
          "Reusable shadcn/ui components provide consistent cards, buttons, dialogs, forms, tables and navigation patterns.",
      },
      {
        title: "State management",
        description:
          "Zustand is used for client-side UI state while page-level data is kept separate from presentation components.",
      },
      {
        title: "Data visualization",
        description:
          "Recharts provides reusable chart components for revenue, customer and performance analytics.",
      },
    ],

    uxDecisions: [
      {
        title: "Numbers first",
        description:
          "Important business metrics are presented first through compact KPI cards before deeper analytics.",
      },
      {
        title: "Clear visual hierarchy",
        description:
          "Spacing, typography and card grouping separate primary metrics from supporting information.",
      },
      {
        title: "Responsive by default",
        description:
          "Dashboard layouts adapt instead of simply shrinking desktop components for smaller screens.",
      },
    ],

    implementation: [
      {
        title: "Reusable dashboard components",
        description:
          "Common cards, tables, charts, filters and layout components are shared across multiple screens.",
      },
      {
        title: "Interactive charts",
        description:
          "Chart components provide tooltips and responsive visualizations for understanding business trends.",
      },
      {
        title: "Consistent form patterns",
        description:
          "Forms use reusable validation and UI patterns to keep user interactions predictable.",
      },
    ],

    codeSample: {
      filename: "dashboard-overview.tsx",
      code: `export function DashboardOverview() {
  return (
    <div className="grid gap-6">
      <KpiCards />
      <RevenueChart />
      <RecentTransactions />
    </div>
  );
}`,
    },

    responsive: [
      "Sidebar navigation adapts for smaller screens",
      "Dashboard cards reflow based on available space",
      "Charts resize while maintaining readable labels",
      "Tables adapt their layout for smaller screens",
    ],

    performance: [
      "Reusable components reduce duplicated UI logic",
      "Charts are isolated into focused components",
      "Responsive layouts avoid unnecessary client-side complexity",
      "Dashboard sections are structured to keep rendering predictable",
    ],

    outcome: [
      "Created a polished SaaS analytics experience suitable for demonstrating modern frontend development skills.",
      "Demonstrates the ability to design and implement data-heavy dashboards with reusable components and responsive layouts.",
      "Provides a strong showcase of Next.js, TypeScript, Tailwind CSS, component architecture and data visualization.",
    ],

    learnings: [
      "Good dashboard design is primarily about hierarchy and information density rather than adding more visual elements.",
      "Reusable UI patterns make large dashboard interfaces easier to maintain and keep visually consistent.",
      "Responsive behaviour needs to be considered at the component level rather than added as a final step.",
    ],
  },

  {
    slug: "project-task-management-platform",
    title: "Project & Task Management Platform",
    category: "Productivity Platform",
    tag: "Personal Project",
    description:
      "A modern project and task management platform for organizing projects, workflows, sprints and tasks, with Kanban boards, real-time collaboration, rich-text editing, role-based access and responsive team workflows.",
    year: "2026",
    role: "Frontend Developer",
    timeline: "6 weeks",
    isPlaceholder: false,

    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "React Router",
      "TanStack Query",
      "Zustand",
      "Tailwind CSS",
      "shadcn/ui",
      "Radix UI",
      "React Hook Form",
      "Zod",
      "dnd-kit",
      "Tiptap",
      "Socket.IO",
    ],

    image: "/images/projects/project-2.webp",
    visual: "workspace",

    // links: {
    //   live: "https://saas-analytics-dashboard-flame.vercel.app",
    //   repository: "https://github.com/atharv0811/SAAS_Analytics_Dashboard",
    // },

    gallery: [
      {
        src: "/images/projects/project-2-board.webp",
        alt: "Project management board with workflow columns and task cards",
        caption: "Kanban board with drag-and-drop workflow management",
      },
      {
        src: "/images/projects/project-2-task.webp",
        alt: "Task detail panel with rich-text description and activity",
        caption: "Task details with rich-text content and activity",
      },
    ],

    overview:
      "A collaborative workspace where teams can organize projects, manage tasks through customizable workflows, plan sprints, write rich-text notes and stay synchronized through real-time updates.",

    responsibilities: [
      "Built the application shell, routing and workspace navigation with React Router",
      "Implemented Kanban boards and drag-and-drop interactions with dnd-kit",
      "Created typed data hooks using TanStack Query and client-side state with Zustand",
      "Built validated forms using React Hook Form, Zod and reusable shadcn/ui components",
      "Integrated Tiptap for rich-text task and project content",
      "Integrated Socket.IO for real-time updates across connected users",
    ],

    challenge:
      "The platform needed to support complex project workflows while keeping the interface simple and responsive. Users needed to move tasks quickly, manage large amounts of work, edit detailed task information and stay synchronized with other collaborators.",

    challenges: [
      {
        title: "Real-time collaboration",
        description:
          "Changes from other users needed to appear quickly while avoiding unnecessary refetches or disrupting the current user's workflow.",
      },
      {
        title: "Drag-and-drop workflows",
        description:
          "Tasks needed to move between workflow columns smoothly while maintaining a responsive and predictable interaction.",
      },
      {
        title: "Complex forms",
        description:
          "Projects, tasks, members and workflow settings required consistent validation and error handling.",
      },
    ],

    solution:
      "The application separates server state and client UI state using TanStack Query and Zustand, while Socket.IO keeps connected users synchronized. dnd-kit powers interactive Kanban workflows, and shared React Hook Form with Zod validation keeps forms consistent across the platform.",

    features: [
      "Workspace and project management",
      "Custom project workflow columns",
      "Drag-and-drop Kanban boards",
      "Sprint and task management",
      "Task details with rich-text descriptions",
      "Task assignees, due dates and labels",
      "Real-time updates across connected users",
      "Search and project-level filtering",
      "Progress tracking",
      "Role-based access and team management",
    ],

    architecture: [
      {
        title: "Application shell",
        description:
          "Vite and React Router provide nested layouts for workspace, project and task-level routes.",
      },
      {
        title: "Server state",
        description:
          "TanStack Query manages API data, caching, mutations and optimistic updates.",
      },
      {
        title: "Client state",
        description:
          "Zustand manages UI-focused state such as active workspace, panels and board preferences.",
      },
      {
        title: "Real-time layer",
        description:
          "Socket.IO events update the relevant cached data instead of triggering unnecessary full refetches.",
      },
    ],

    uxDecisions: [
      {
        title: "Stay in context",
        description:
          "Task details open in a panel so users can inspect and edit tasks without losing their board or list context.",
      },
      {
        title: "Instant feedback",
        description:
          "Task moves and edits provide immediate visual feedback while failed operations can be rolled back.",
      },
      {
        title: "Consistent interactions",
        description:
          "Shared UI primitives provide predictable dialogs, menus, forms and interaction patterns across the application.",
      },
    ],

    implementation: [
      {
        title: "Optimistic updates",
        description:
          "Task movements update the UI immediately and synchronize with the server in the background.",
      },
      {
        title: "Schema-driven forms",
        description:
          "Zod schemas provide consistent validation and typed form behaviour across the application.",
      },
      {
        title: "Cache-aware real-time updates",
        description:
          "Incoming Socket.IO events update relevant TanStack Query data without requiring full page refreshes.",
      },
    ],

    codeSample: {
      filename: "use-task-sync.ts",
      code: `export function useTaskSync(projectId: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const onUpdate = (task: Task) => {
      queryClient.setQueryData<Task[]>(
        taskKeys.list(projectId),
        (tasks = []) =>
          tasks.map((item) =>
            item.id === task.id ? task : item
          )
      );
    };

    socket.on("task:updated", onUpdate);

    return () => {
      socket.off("task:updated", onUpdate);
    };
  }, [projectId, queryClient]);
}`,
    },

    responsive: [
      "Kanban boards support horizontal scrolling on smaller screens",
      "Task details become full-screen sheets on mobile",
      "Sidebar navigation collapses into a mobile drawer",
      "Layouts adapt across desktop, tablet and mobile breakpoints",
    ],

    performance: [
      "Optimistic updates keep task interactions responsive",
      "Socket events update cached data instead of triggering unnecessary refetches",
      "Route-level code splitting reduces the initial application bundle",
      "The rich-text editor is loaded only where required",
    ],

    outcome: [
      "Created a substantial project management experience demonstrating complex frontend workflows and SaaS application architecture.",
      "Brings project planning, task management, collaboration and workflow tracking into a single interface.",
      "Demonstrates practical experience with state management, real-time updates, drag-and-drop interactions and complex form workflows.",
    ],

    learnings: [
      "Separating server state from UI state makes complex applications easier to reason about.",
      "Optimistic updates can make collaborative workflows feel significantly more responsive.",
      "Real-time events can be integrated cleanly by updating cached server state rather than refetching entire resources.",
      "Consistent validation schemas reduce duplication across complex forms.",
    ],
  },

  {
  slug: "react-nextjs-bug-fix-lab",
  title: "React & Next.js Bug Fix Lab",
  category: "Frontend Engineering",
  description:
    "An interactive debugging lab demonstrating common React and Next.js bugs, their root causes, practical fixes and verification steps.",
  year: "2026",
  role: "Frontend Developer",
  timeline: "2 days",
  isPlaceholder: false,
  technologies: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Lucide React",
  ],
  image: "/images/projects/project-3.png",
  visual: "debugging",
  gallery: [
    {
      src: "/images/projects/project-3.1.png",
      alt: "Bug Fix Lab homepage with debugging case cards",
      caption: "Browse frontend debugging cases by category and difficulty",
    },
    {
      src: "/images/projects/project-3.2.png",
      alt: "Debugging case detail with root cause and solution",
      caption: "Understand the issue, investigate the cause and verify the fix",
    },
  ],
  overview:
    "An interactive educational project that demonstrates common frontend bugs through structured case studies. Each case guides developers from reproducing a problem to understanding its root cause, applying a fix and verifying the result.",

  responsibilities: [
    "Designed and developed the debugging lab interface",
    "Built reusable case cards, filters and case detail layouts",
    "Implemented interactive demonstrations for frontend debugging scenarios",
    "Documented symptoms, reproduction steps, root causes and fixes",
    "Added responsive layouts and accessible form-validation examples",
  ],

  challenge:
    "Frontend bug fixes are often presented as code snippets without explaining how to reproduce the issue, identify its root cause or verify the solution.",

  challenges: [
    {
      title: "Reproducing bugs",
      description:
        "Each case needed a clear, repeatable way to understand the problem before attempting a fix.",
    },
    {
      title: "Explaining root causes",
      description:
        "The lab needed to explain why a bug occurs rather than simply showing replacement code.",
    },
    {
      title: "Verifying solutions",
      description:
        "Each case needed a practical way to understand whether the proposed fix addresses the original issue.",
    },
  ],

  solution:
    "Created a structured debugging workflow with symptoms, reproduction steps, interactive or simulated demonstrations, investigation notes, root-cause explanations, fixes and verification guidance.",

  features: [
    "Six frontend debugging case studies",
    "Search, category and difficulty filters",
    "Interactive demonstrations for selected bugs",
    "Step-by-step investigation and root-cause explanations",
    "Before-and-after fixes with verification guidance",
    "Related cases and previous/next navigation",
    "Responsive interface for desktop and mobile",
  ],

  architecture: [
    {
      title: "Reusable case structure",
      description:
        "Organized debugging cases into consistent sections for symptoms, reproduction, investigation, root cause, fix and verification.",
    },
    {
      title: "Interactive demonstrations",
      description:
        "Implemented local demonstrations for selected scenarios and clearly identified simulated examples.",
    },
    {
      title: "Component-driven UI",
      description:
        "Used reusable layouts and interface components to keep case cards, filters and detail pages consistent.",
    },
    {
      title: "Educational verification",
      description:
        "Provided verification steps to help developers understand the expected behavior after applying a fix.",
    },
  ],

  uxDecisions: [
    {
      title: "Problem-first learning",
      description:
        "Every case starts with the symptom and reproduction steps before explaining the solution.",
    },
    {
      title: "Structured debugging workflow",
      description:
        "Investigation, root cause, fix and verification are separated into clear sections.",
    },
    {
      title: "Honest demo labels",
      description:
        "Live and simulated demonstrations are distinguished so users understand what each example actually runs.",
    },
  ],

  implementation: [
    {
      title: "Responsive layout debugging",
      description:
        "Demonstrates how fixed-width content can cause horizontal overflow and how fluid sizing can resolve it.",
    },
    {
      title: "React state updates",
      description:
        "Explains the difference between direct state updates and functional updater patterns.",
    },
    {
      title: "API and form states",
      description:
        "Covers loading, error handling, field-level validation and accessible error messaging.",
    },
    {
      title: "Rendering and routing",
      description:
        "Explores unnecessary React re-renders and common Next.js routing and rendering concepts.",
    },
  ],

  responsive: [
    "Responsive layouts for different viewport widths",
    "Flexible case cards and filter controls",
    "Readable case details on smaller screens",
  ],

  performance: [
    "Reusable components to reduce duplicated UI code",
    "Focused interactive demonstrations for individual debugging scenarios",
    "Practical explanations of rendering behavior and frontend performance",
  ],

  outcome: [
    "Delivered a deployed, interactive educational debugging lab",
    "Documented six common React and Next.js debugging scenarios",
    "Created a portfolio project demonstrating frontend problem-solving and technical communication",
  ],

  learnings: [
    "Reproducing a bug is an important first step toward finding its root cause",
    "Understanding state updates and rendering behavior helps prevent subtle React bugs",
    "Accessible error states improve form usability",
    "Verification steps make debugging solutions easier to evaluate",
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
