export type ProjectScreenshot = {
  src: string;
  alt: string;
  /** One-line “what this proves” under the screenshot (evidence caption) */
  evidenceLine?: string;
  /** Short label for the alternating text column */
  heading?: string;
  /** Primary narrative (case study body) */
  caption?: string;
  /** Small caps line above the title, e.g. "Angular · shell" */
  eyebrow?: string;
  /** Expert bullets: UX, validation, perf, or integration notes */
  bullets?: string[];
  /** Optional per-screen tech chips */
  tags?: string[];
  layout?: "landscape" | "portrait";
  fit?: "cover" | "contain";
  scale?: number;
};

export type ProjectFeature = {
  title: string;
  description: string;
  /** Optional capability lines (shown as a tight sub-list under the description) */
  bullets?: string[];
};

/** One row in the vertical system-flow diagram */
export type CaseStudySystemLayer = {
  title: string;
  subtitle?: string;
};

/** Hiring-signal narrative for the case study page (optional per project) */
export type CaseStudyNarrative = {
  problemBullets: string[];
  impactResults: string[];
  scaleConstraints: string[];
  engineeringDecisions: string[];
  approachBullets: string[];
  systemFlow: CaseStudySystemLayer[];
};

/** Rich content for `/projects/[slug]` only — homepage cards ignore this */
export type ProjectCaseStudyDetail = {
  gallery?: ProjectScreenshot[];
  features?: ProjectFeature[];
  /** What you specifically built / owned */
  contribution?: string[];
  /** Outcome bullets (can be estimated) */
  impactBullets?: string[];
  frontendNarrative?: string;
  /** Problem / impact / decisions / system flow (see `resolveCaseStudyNarrative`) */
  narrative?: CaseStudyNarrative;
  /** Architecture visuals for the stack section (large previews + captions below) */
  diagrams?: {
    frontend?: { src: string; alt: string };
    api?: { src: string; alt: string };
    sql?: { src: string; alt: string };
  };
};

export type Project = {
  slug: string;
  title: string;
  oneLiner: string;
  impact: string;
  role: string;
  stack: string[];
  links: {
    live?: string;
    docs?: string;
    github?: string;
  };
  /** Case study page; does not change featured card layout or images */
  detail?: ProjectCaseStudyDetail;
  frontend: {
    screenshots?: ProjectScreenshot[];
    screenshotSrc?: string;
    screenshotAlt: string;
    screenshotLayout?: "landscape" | "portrait";
    screenshotFit?: "cover" | "contain";
    highlights: string[];
  };
  backend: {
    architecture: string[];
    api: string[];
    data: string[];
    auth?: string[];
    cache?: string[];
    deployment?: string[];
  };
  engineering: {
    problem: string;
    solution: string;
    tradeoffs: string[];
  };
  tags: string[];
};

export function getCaseStudyGallery(project: Project): ProjectScreenshot[] {
  if (project.detail?.gallery?.length) return project.detail.gallery;
  if (project.frontend.screenshots?.length) return project.frontend.screenshots;
  if (project.frontend.screenshotSrc) {
    return [
      {
        src: project.frontend.screenshotSrc,
        alt: project.frontend.screenshotAlt,
        layout: project.frontend.screenshotLayout,
        fit: project.frontend.screenshotFit,
      },
    ];
  }
  return [];
}

export function getCaseStudyFeatures(project: Project): ProjectFeature[] {
  return project.detail?.features ?? [];
}

function defaultSystemFlow(project: Project): CaseStudySystemLayer[] {
  const has = (re: RegExp) => project.stack.some((s) => re.test(s));
  const layers: CaseStudySystemLayer[] = [];
  const clients = project.stack.filter((s) => /Angular|React|Vue|Next|Native|Expo/i.test(s));
  if (clients.length) {
    layers.push({
      title: clients.slice(0, 3).join(" · "),
      subtitle: "Client applications",
    });
  } else {
    layers.push({ title: "Client tier", subtitle: "Web / mobile UI" });
  }
  if (has(/ASP\.NET|Minimal API|Node|Express|FastAPI|GraphQL/i)) {
    layers.push({ title: "Application API", subtitle: "HTTP contracts & domain services" });
  }
  if (has(/PostgreSQL|SQL Server|MySQL|Mongo|Redis/i)) {
    const db = project.stack.find((s) => /PostgreSQL|SQL Server|MySQL|Mongo|Redis/i.test(s));
    layers.push({ title: db ?? "Data tier", subtitle: "Persistence & queries" });
  }
  layers.push({
    title: project.backend.auth?.[0] ?? "Auth & authorization",
    subtitle: "RBAC, tokens, policy enforcement",
  });
  return layers.slice(0, 5);
}

/** Merges `detail.narrative` with sensible defaults so every case study has signal */
export function resolveCaseStudyNarrative(project: Project): CaseStudyNarrative {
  const n = project.detail?.narrative;
  if (n) return n;
  return {
    problemBullets: [project.engineering.problem],
    impactResults: [project.impact],
    scaleConstraints: [],
    engineeringDecisions: [
      ...project.engineering.tradeoffs.slice(0, 2),
      ...project.backend.architecture.slice(0, 2),
    ],
    approachBullets: [project.engineering.solution],
    systemFlow: defaultSystemFlow(project),
  };
}

export const projects: Project[] = [
  {
    slug: "hr-management-system",
    title: "HR Management System",
    oneLiner:
      "Full-stack HR management system with attendance tracking, approvals, and mobile field support.",
    impact:
      "One platform for people operations, scheduling, collaboration, and project delivery—with RBAC, approvals, and optimized Postgres-backed APIs.",
    role: "Full Stack Engineer",
    stack: [
      "Angular",
      "React Native",
      "ASP.NET Core",
      "PostgreSQL",
      "Layered Architecture",
    ],
    links: { live: "#", docs: "#", github: "#" },
    detail: {
      contribution: [
        "Designed system architecture and API contracts for core HR domains.",
        "Implemented RBAC across API + UI (Admin / Manager / Employee).",
        "Built attendance and timesheet workflows (validation, approvals, audit trail).",
        "Designed PostgreSQL schema and indexing strategy.",
        "Optimized queries for dashboards and roll-ups.",
        "Frontend ownership: employee profiles, timesheets, projects, and ticket management.",
      ],
      impactBullets: [
        "Reduced manual HR operations by consolidating time, attendance, approvals, and project tracking into one system.",
        "Improved workflow efficiency with a consistent approvals model and role-scoped experiences.",
        "Designed for scalable employee management with optimized Postgres reads for dashboards and roll-ups.",
      ],
      narrative: {
        problemBullets: [
          "Manual attendance tracking spread across spreadsheets and ad-hoc files.",
          "Time approvals and downstream reporting were inconsistent across teams.",
          "No single place for centralized, role-based control across HR, managers, and employees.",
        ],
        impactResults: [
          "Reduced manual HR workflow overhead by ~40% through unified screens and clearer ownership.",
          "Improved time tracking accuracy and traceability with approval chains and auditable transitions.",
          "Designed RBAC supporting Admin, Manager, and Employee experiences without cross-role leakage.",
          "Optimized query performance for large attendance datasets powering dashboards and roll-ups.",
        ],
        scaleConstraints: [
          "Built to absorb growing employee counts and time-series punch volume without degrading list UX.",
          "Tuned read/write paths for high-frequency attendance logging and concurrent manager views.",
        ],
        engineeringDecisions: [
          "Chose layered ASP.NET architecture → maintainability and clear separation of concerns across HR domains.",
          "Standardized on PostgreSQL → relational integrity for HR/time entities and audit-friendly schemas.",
          "RBAC-first authorization → necessary for multi-role enterprise control and least-privilege UI.",
          "Angular + React Native clients → one backend serving desk workflows and field attendance equally.",
        ],
        approachBullets: [
          "Delivered a unified HR platform with explicit RBAC boundaries across web and mobile surfaces.",
          "Modelled core workflows as predictable, state-driven processes (timesheets and absences).",
          "Applied optimized data access patterns so aggregations and exception views stay fast at scale.",
          "Emphasized observability for approvals and exports so finance could reconcile with confidence.",
        ],
        systemFlow: [
          { title: "Angular & React Native", subtitle: "Web shell + mobile field apps" },
          { title: "ASP.NET Core API", subtitle: "Layered services · REST contracts" },
          { title: "PostgreSQL", subtitle: "HR and time relational data" },
          { title: "RBAC · JWT", subtitle: "Policies, tokens, audit-friendly actions" },
        ],
      },
      diagrams: {
        api: {
          src: "/assets/img/diagrams/hr-architecture.svg",
          alt: "HR Management architecture diagram (web/mobile, JWT/RBAC, layered ASP.NET Core API, AWS Lambda cron automation, and PostgreSQL).",
        },
      },
      features: [
        {
          title: "Attendance & timesheets",
          description: "Time capture that stays clean and export-ready.",
          bullets: [
            "Weekly grid with conflict detection + policy hints",
            "Approval-ready states with an audit trail",
          ],
        },
        {
          title: "Role-based access (RBAC)",
          description: "Least-privilege access across HR, managers, and employees.",
          bullets: ["Enforced at API + UI level", "Prevents cross-role leakage by design"],
        },
        {
          title: "Project & task tracking",
          description: "Project hubs with tickets and knowledge docs.",
          bullets: ["Statuses, assignees, priorities", "Docs for specs, runbooks, decisions"],
        },
        {
          title: "Mobile attendance",
          description: "Field punch capture with sync and reconciliation.",
          bullets: ["Offline-tolerant capture", "Fast sync when back online"],
        },
        {
          title: "Approvals workflow",
          description: "Predictable state transitions for reviews and approvals.",
          bullets: ["Manager review queues", "Auditable transitions (who/when/what)"],
        },
        {
          title: "Account & employee profiles",
          description: "Role-aware profiles and account settings.",
        },
        {
          title: "Team chat",
          description: "In-product messaging tied to teams and work context.",
        },
        {
          title: "Absence management",
          description: "Leave requests with balances, entitlements, and approvals.",
        },
        {
          title: "Departments, teams, and rota",
          description: "Org structure plus shift scheduling aligned to attendance.",
        },
      ],
      gallery: [
        {
          heading: "HR dashboard",
          caption:
            "Landing view aggregates attendance risk, open tickets, and shortcuts into the workflows managers run every morning.",
          bullets: [
            "Role-scoped widgets so the same shell renders different cards for Admin vs Manager.",
            "Exception-first layout: late/absent signals and ticket queues surface before drill-down.",
            "Shared layout primitives with the rest of the suite for predictable navigation and faster QA.",
          ],
          tags: ["Angular", "RBAC", "KPIs"],
          src: "/assets/img/hr/dashboard.webp",
          alt: "HR web dashboard",
          layout: "landscape",
        },
        {
          eyebrow: "Angular · time module",
          heading: "Timesheets & approvals",
          caption:
            "Weekly entry uses a familiar grid with row-level validation, attachments, and policy hints before submit.",
          bullets: [
            "Client-side guards for overlaps, breaks, and weekly caps; server re-validates on POST.",
            "Approval chain mirrors org hierarchy with audit trail on every transition.",
            "Optimized for keyboard tabbing through cells for power users in finance ops.",
          ],
          tags: ["Forms", "Workflow", "PostgreSQL"],
          src: "/assets/img/hr/timesheet.webp",
          alt: "Timesheet entry grid",
          layout: "landscape",
        },
        {
          eyebrow: "React Native · field",
          heading: "Mobile attendance",
          caption:
            "Field teams clock in/out with geofence-aware prompts where policy allows, offline-tolerant capture, and immediate sync when connectivity returns.",
          bullets: [
            "Biometric-friendly auth session paired with short-lived API tokens from the ASP.NET backend.",
            "Optimistic UI with server reconciliation for punch timestamps when offline.",
            "Haptic and large-target controls for glove-friendly use on site.",
          ],
          tags: ["React Native", "API"],
          src: "/assets/img/hr/mobileattendance.webp",
          alt: "Mobile attendance screen",
          layout: "portrait",
          fit: "cover",
          scale: 1.1,
        },
        {
          eyebrow: "Angular · absences",
          heading: "My absences",
          caption:
            "Absence requests are streamlined into a single list with clear status and policy hints, reducing back-and-forth with managers and HR.",
          bullets: [
            "State-driven statuses (draft → submitted → approved/rejected).",
            "Role-scoped actions: employees request; managers approve; HR audits.",
          ],
          tags: ["Workflow", "RBAC"],
          src: "/assets/img/hr/myabsence.webp",
          alt: "My absence requests screen",
          layout: "landscape",
        },
        {
          eyebrow: "Angular · projects",
          heading: "Taskboard (Kanban)",
          caption:
            "Project taskboard groups tickets by status with fast triage, assignees, and priority—so delivery work stays visible without leaving the HR suite.",
          bullets: [
            "Status columns designed for quick scanning and rapid updates.",
            "RBAC-scoped visibility for project members vs managers/admin.",
          ],
          tags: ["Tickets", "Workflow"],
          src: "/assets/img/hr/taskboard.webp",
          alt: "Project taskboard (Kanban) screen",
          layout: "landscape",
        },
      ],
    },
    frontend: {
      screenshotSrc: "/assets/img/hr/dashboard.webp",
      screenshotAlt: "HR dashboard UI preview",
      highlights: [
        "Angular web shell covering profiles, org, time, attendance, absences, rota, chat, and project hubs (tickets + docs)",
        "React Native flows for attendance and quick actions on the go",
        "Consistent form patterns for approvals, attachments, and validation messaging",
        "Dense tables paired with filters, saved views, and export-friendly layouts",
      ],
    },
    backend: {
      architecture: [
        "Layered backend with clear separation of concerns",
        "Modular domains: profiles/accounts, timesheets, attendance, absences, departments & teams, rota/shifts, team chat, projects with tickets and documents",
      ],
      api: ["RESTful APIs with ASP.NET Core", "Secure authentication + authorization"],
      data: [
        "Optimized PostgreSQL schema",
        "Indexing + query optimization for performance",
      ],
      auth: ["Role-based access control (Admin/Manager/Employee)"],
      deployment: ["Deployment + production troubleshooting"],
    },
    engineering: {
      problem:
        "HR operations were split across tools, causing slow processes and inconsistent approvals.",
      solution:
        "Built a unified HR platform with RBAC, workflow validations, and optimized data access patterns.",
      tradeoffs: [
        "Workflow rules add complexity but prevent time and approval errors",
        "Schema optimization requires ongoing monitoring as features grow",
      ],
    },
    tags: ["ASP.NET Core", "RBAC", "PostgreSQL", "Angular","Layered architecture"],
  },
  {
    slug: "healthcare-web-app",
    title: "Health Care Web App",
    oneLiner:
      "Full-stack healthcare web app with role-based access and discrepancy tracking.",
    impact:
      "Reduced manual tracking by centralizing role-based workflows, ticket handling, and discrepancy resolution in one system.",
    role: "Backend-leaning Full Stack Engineer",
    stack: ["React", "ASP.NET Core Minimal API", "PostgreSQL", "EF Core", "Dapper"],
    links: { live: "#", docs: "#" },
    detail: {
      diagrams: {
        api: {
          src: "/assets/img/diagrams/healthcare-architecture.svg",
          alt: "Health Care Web App architecture diagram (React client, JWT/RBAC boundary, layered ASP.NET Core API, Data API integration, nightly patient metrics job, and PostgreSQL).",
        },
      },
      contribution: [
        "Implemented simple Minimal API endpoints for list/detail workflows (GET/POST/PATCH) under senior guidance.",
        "Added/updated UI screens and forms to consume those endpoints (tables, filters, basic validation, loading/error states).",
        "Fixed small bugs across API + UI (request/response mapping, validation messages, edge cases).",
        "Helped with role-scoped UI behavior by following existing RBAC patterns already in the codebase.",
      ],
      impactBullets: [
        "Reduced manual tracking by centralizing workflows and queues in one system.",
        "Improved review speed with scannable queues and stable list UX patterns.",
        "Kept response times predictable under load with query and contract optimization.",
      ],
      features: [
        {
          title: "Role-based access & least privilege",
          description:
            "Clinical and operational surfaces separated by role so users only see workflows and data appropriate to their job—reducing risk and noise in high-stakes environments.",
        },
        {
          title: "Analytics dashboard",
          description:
            "A command view for throughput, ticket pressure, staffing signals, and shortcuts into daily triage—fed by aggregated Minimal API endpoints to stay responsive under load.",
          bullets: [
            "Server-driven KPIs with deferred chart hydration",
            "Per-site alert thresholds without redeploying the SPA",
          ],
        },
        {
          title: "Patient index & clinical lists",
          description:
            "High-volume lists with stable row identity, debounced filters, and actions that respect access policy—built for long sessions and keyboard-heavy use.",
        },
        {
          title: "Discrepancy resolution",
          description:
            "Queues that expose assignee, severity, SLA, and discussion in one scannable layout, with optimistic locking on updates so concurrent reviewers do not overwrite each other.",
          bullets: [
            "Row-level versioning on contested updates",
            "Inline audit fields for survey and operational readiness",
          ],
        },
      ],
      gallery: [
        {
          eyebrow: "React · operations",
          heading: "Analytics dashboard",
          caption:
            "Analytics dashboard for throughput, SLA risk on tickets, and staffing alerts.",
          bullets: [
            "Server-driven aggregates reduce over-fetching; charts hydrate after critical KPI text.",
            "Alert thresholds are configurable per site without redeploying the SPA bundle.",
            "Color system meets contrast targets for long night-shift sessions on lower-end displays.",
          ],
          tags: ["React", "Minimal API"],
          src: "/assets/img/healthcare/dashboard.webp",
          alt: "Healthcare dashboard",
          layout: "landscape",
        },
        {
          eyebrow: "React · clinical lists",
          heading: "Patient index",
          caption:
            "High-volume patient lists lean on virtualized scrolling patterns, sticky filters, and row actions that respect HIPAA-style least privilege.",
          bullets: [
            "Debounced filter queries with cancel tokens to avoid race conditions on slow networks.",
            "Column presets saved per user in app settings for recurring ward rounds.",
            "Empty and error states carry explicit next steps instead of dead ends.",
          ],
          tags: ["UX", "PostgreSQL"],
          src: "/assets/img/healthcare/patientlist.webp",
          alt: "Patient list",
          layout: "landscape",
        },
        {
          eyebrow: "React · quality",
          heading: "Discrepancy resolution",
          caption:
            "Discrepancy queues expose assignee, severity, SLA clock, and comment thread in one row-readable layout.",
          bullets: [
            "Row-level versioning on PATCH prevents lost updates when two clinicians edit notes.",
            "Audit fields (who/when/what) render inline for survey readiness.",
            "Deep links from dashboard cards land on filtered queue slices.",
          ],
          tags: ["RBAC", "Concurrency"],
          src: "/assets/img/healthcare/discrepencylist.webp",
          alt: "Discrepancy list",
          layout: "landscape",
        },
      ],
    },
    frontend: {
      screenshotSrc: "/assets/img/healthcare/dashboard.webp",
      screenshotAlt: "Healthcare web UI preview",
      highlights: [
        "React SPA with route-level code splitting for faster first paint on large datasets",
        "Reusable table and filter primitives for consistent list UX across modules",
        "Accessible focus states, skip links, and semantic landmarks for keyboard-heavy workflows",
        "Optimistic UI where safe, with rollback paths for server validation failures",
      ],
    },
    backend: {
      architecture: [
        "Minimal API backend with clear modules for features",
        "EF Core for standard operations + Dapper for complex queries",
      ],
      api: ["RESTful APIs", "Secure auth flows"],
      data: ["PostgreSQL schema design", "Query optimization for performance"],
      deployment: ["Deployment support and troubleshooting"],
    },
    engineering: {
      problem:
        "Needed a secure, role-based healthcare system with fast API responses under real usage.",
      solution:
        "Built RBAC-first flows and optimized database access by combining EF Core with Dapper.",
      tradeoffs: [
        "Dapper adds manual mapping, but improved performance on complex queries",
        "More RBAC rules increase testing surface area",
      ],
    },
    tags: ["Minimal API", "Dapper", "RBAC", "React"],
  },
  // {
  //   slug: "ride-booking-admin-panel",
  //   title: "Ride Booking App & Admin Panel",
  //   oneLiner:
  //     "Cross-platform ride booking app with real-time trip tracking and a web-based admin panel for operations.",
  //   impact:
  //     "Unified rider, driver, and operations workflows with secure APIs and optimized SQL Server data access.",
  //   role: "Full Stack Engineer",
  //   stack: ["React Native", "React", "ASP.NET Core", "EF Core", "SQL Server"],
  //   links: { live: "#", docs: "#" },
  //   detail: {
  //     diagrams: {
  //       api: {
  //         src: "/assets/img/diagrams/api-structure.svg",
  //         alt: "Ride service API and solution structure",
  //       },
  //     },
  //     contribution: [
  //       "Designed secure APIs for booking, dispatching, and trip-state transitions.",
  //       "Implemented role-based access for admin, driver, and rider experiences.",
  //       "Built operational endpoints for the admin panel (drivers, customers, pricing).",
  //       "Optimized SQL Server reads for history and operational lists.",
  //     ],
  //     impactBullets: [
  //       "Unified mobile + admin workflows into one coordinated platform.",
  //       "Improved operational visibility with centralized admin controls.",
  //       "Maintained reliable performance with optimized SQL access patterns.",
  //     ],
  //     features: [
  //       {
  //         title: "Rider booking & live trip tracking",
  //         description:
  //           "End-to-end trip lifecycle on mobile: request, assignment, in-progress state, and history—with UI that degrades gracefully on flaky networks.",
  //         bullets: [
  //           "Client-side trip state mirrored from server for resilient transitions",
  //           "Keyset-paginated history for predictable SQL Server reads",
  //         ],
  //       },
  //       {
  //         title: "Secure authentication",
  //         description:
  //           "Credential and policy-appropriate sign-in paths with platform secure storage, refresh rotation, and clear error surfaces for support and abuse deterrence.",
  //       },
  //       {
  //         title: "Operations admin panel",
  //         description:
  //           "Web-based control for drivers, customers, pricing, and ride operations—backed by centralized admin APIs with strict authorization boundaries.",
  //       },
  //       {
  //         title: "Dispatch-friendly updates",
  //         description:
  //           "Status and assignment hooks designed for push and polling backoff so riders get timely updates without draining battery on idle screens.",
  //       },
  //     ],
  //   },
  //   frontend: {
  //     screenshotLayout: "portrait",
  //     screenshotFit: "contain",
  //     screenshots: [
  //       {
  //         eyebrow: "React Native · onboarding",
  //         heading: "Launch & entry",
  //         caption:
  //           "First-run experience orients riders and drivers with role-aware copy, legal acknowledgements where required, and a single primary CTA per screen to reduce funnel drop-off. Assets are lazy-loaded so cold start stays within budget on mid-tier Android devices.",
  //         bullets: [
  //           "Telemetry on step completion (no PII) to spot friction without invasive tracking.",
  //           "Deep links from SMS/email land on the correct role flow with token-scoped validation.",
  //           "Layout uses safe areas + dynamic type so text never collides with notches.",
  //         ],
  //         tags: ["React Native", "UX"],
  //         src: "/assets/img/ridebooking_default.webp",
  //         alt: "Ride booking app default screen",
  //         layout: "portrait",
  //         fit: "contain",
  //         scale: 1.04,
  //       },
  //       {
  //         eyebrow: "React Native · auth",
  //         heading: "Secure sign-in",
  //         caption:
  //           "Auth is split between passwordless-friendly paths where policy allows and traditional credential flows elsewhere. Tokens are stored in platform secure storage with refresh rotation coordinated by ASP.NET Core identity endpoints.",
  //         bullets: [
  //           "Rate-limited login attempts surfaced with backoff timers to deter abuse.",
  //           "Biometric unlock reuses refresh tokens instead of persisting long-lived passwords.",
  //           "Error copy differentiates network, credential, and lockout cases for support triage.",
  //         ],
  //         tags: ["Security", "ASP.NET Core"],
  //         src: "/assets/img/ridebooking_login.webp",
  //         alt: "Ride booking app login screen",
  //         layout: "portrait",
  //         fit: "contain",
  //         scale: 1.04,
  //       },
  //       {
  //         eyebrow: "React Native · trip",
  //         heading: "Live trip & history",
  //         caption:
  //           "Home prioritizes the active trip card—map snippet, ETA, driver contact—above history. Polling intervals back off when idle to preserve battery while still converging quickly when dispatch updates trip phase.",
  //         bullets: [
  //           "Trip state machine mirrored client-side for resilient UI during flaky networks.",
  //           "History list paginates with keyset cursors to keep SQL Server reads predictable.",
  //           "Push-friendly hooks for driver assignment without requiring constant foreground polling.",
  //         ],
  //         tags: ["Real-time", "SQL Server"],
  //         src: "/assets/img/ridebooking_home.webp",
  //         alt: "Ride booking app home screen",
  //         layout: "portrait",
  //         fit: "contain",
  //         scale: 1.04,
  //       },
  //     ],
  //     screenshotSrc: "/assets/img/ridebooking_home.webp",
  //     screenshotAlt: "Ride booking app and admin panel preview",
  //     highlights: [
  //       "Mobile booking experience for requesting rides and tracking drivers",
  //       "Trip history and ride status updates in real time",
  //       "Admin dashboard for drivers, customers, and pricing control",
  //     ],
  //   },
  //   backend: {
  //     architecture: [
  //       "ASP.NET Core backend serving mobile app and admin panel",
  //       "Operational modules for rides, drivers, customers, and pricing",
  //     ],
  //     api: [
  //       "Secure RESTful APIs for booking, dispatching, and status updates",
  //       "Centralized admin endpoints for ride control operations",
  //     ],
  //     data: [
  //       "EF Core-powered data layer for ride and transaction flows",
  //       "Optimized SQL Server queries for reliable operational performance",
  //     ],
  //     auth: ["Role-based access for admins, drivers, and riders"],
  //   },
  //   engineering: {
  //     problem:
  //       "Ride operations needed real-time visibility and centralized control across mobile and web surfaces.",
  //     solution:
  //       "Delivered a rider app plus admin control panel backed by secure APIs and optimized EF Core data operations.",
  //     tradeoffs: [
  //       "Real-time ride state handling increased backend coordination complexity",
  //       "Admin flexibility required stricter authorization boundaries",
  //     ],
  //   },
  //   tags: ["ASP.NET Core", "EF Core", "SQL Server", "React / React Native"],
  // },
  {
    slug: "expense-management-app",
    title: "Expense Management Application",
    oneLiner:
      "Cross-platform expense manager built with React Native and a Modular Monolith backend using ASP.NET Core Minimal API.",
    impact:
      "Improved financial tracking consistency with modular budgeting/reporting flows and optimized PostgreSQL processing.",
    role: "Full Stack Engineer",
    stack: [
      "ASP.NET Core Minimal API",
      "Modular Monolith",
      "React Native",
      "PostgreSQL",
    ],
    links: { live: "#", docs: "#" },
    detail: {
      diagrams: {
        api: {
          src: "/assets/img/diagrams/expense-architecture.svg",
          alt: "Expense Management architecture diagram (React Native client, JWT boundary, modular monolith ASP.NET Core API with modules, and PostgreSQL).",
        },
      },
      contribution: [
        "Designed modular monolith boundaries and API contracts for expenses, budgets, and reports.",
        "Implemented performance-focused reporting endpoints and aggregates.",
        "Optimized PostgreSQL queries and indexing for analytics paths.",
        "Built mobile UX flows for capture, ledger edits, and insights.",
      ],
      impactBullets: [
        "Improved financial tracking consistency through structured capture + categorization.",
        "Kept reporting fast with pre-aggregated paths and batched reads.",
        "Made the system easier to evolve by enforcing clear module boundaries.",
      ],
      features: [
        {
          title: "Expense capture & categorization",
          description:
            "Fast mobile flows to log spend with categories and receipts, keeping daily capture lightweight while the backend enforces consistency.",
        },
        {
          title: "Ledger & transaction management",
          description:
            "Day-grouped activity with inline corrections, merchant hints, and reversible actions until the server confirms—so mistakes are easy to fix.",
          bullets: [
            "Optimistic updates with rollback on validation failures",
            "Streaming exports for large histories instead of buffering in memory",
          ],
        },
        {
          title: "Budgets & rules",
          description:
            "Thresholds and chips driven by modular monolith rules over typed API contracts, so the app reflects policy changes without ad-hoc client logic.",
        },
        {
          title: "Insights & reporting",
          description:
            "High-signal analytics backed by pre-aggregated PostgreSQL paths—batched round-trips and drill-through that preserve filters for efficient review.",
        },
      ],
    },
    frontend: {
      screenshots: [
        {
          eyebrow: "React Native · overview",
          heading: "Home & cashflow",
          caption:
            "Home balances quick capture against month-to-date burn so users see consequences immediately after logging spend.",
          bullets: [
            "Pull-to-refresh invalidates only the slices that changed, not the whole dashboard.",
            "Budget chips derive thresholds from modular monolith rules exposed as typed API contracts.",
            "Skeleton loaders match final layout to avoid CLS on slower devices.",
          ],
          tags: ["React Native", "Minimal API"],
          src: "/assets/img/expense/home.webp",
          alt: "Expense management app home screen",
          layout: "portrait",
          fit: "contain",
          scale: 1.04,
        },
        {
          eyebrow: "React Native · ledger",
          heading: "Transactions",
          caption:
            "Ledger view groups by day with inline edit for category mistakes, receipt thumbnails, and merchant normalization hints from the backend.",
          bullets: [
            "Optimistic row updates with rollback snackbars on validation failures.",
            "Merchant dedupe hints powered by fuzzy match jobs—not blocking the main thread.",
            "Export/share flows stream CSV from API for large histories instead of buffering in RAM.",
          ],
          tags: ["UX", "PostgreSQL"],
          src: "/assets/img/expense/transactions.webp",
          alt: "Expense transactions screen",
          layout: "portrait",
          fit: "contain",
          scale: 1.04,
        },
        {
          eyebrow: "React Native · analytics",
          heading: "Insights",
          caption:
            "Analytics strip complexity to a few high-signal charts: category variance, cadence, and anomaly callouts.",
          bullets: [
            "Chart data batched in one round-trip to cut radio wakeups on metered connections.",
            "Drill-through preserves filters when navigating to underlying transactions.",
            "Dark-native palette aligned with OS theme to reduce eye strain in evening review.",
          ],
          tags: ["Reporting", "Performance"],
          src: "/assets/img/expense/analysis.webp",
          alt: "Expense analytics screen",
          layout: "portrait",
          fit: "contain",
          scale: 1.04,
        },
      ],
      screenshotAlt: "Expense management mobile app preview",
      highlights: [
        "Simple mobile flows for expense capture and categorization",
        "Budget and reporting views for day-to-day financial monitoring",
        "Clean user journeys for managing personal finance records",
      ],
    },
    backend: {
      architecture: [
        "Modular Monolith with clear domain boundaries",
        "Structured modules for expenses, categories, budgets, and reports",
      ],
      api: [
        "Secure RESTful Minimal API endpoints",
        "Consistent contracts for expense and reporting operations",
      ],
      data: [
        "PostgreSQL schema optimized for financial records and aggregations",
        "Tuned queries for efficient reporting workloads",
      ],
      auth: ["Secure access patterns for user financial data"],
    },
    engineering: {
      problem:
        "Expense tracking systems often become hard to evolve when domains are tightly coupled.",
      solution:
        "Implemented a modular backend and optimized PostgreSQL query paths to keep reporting fast and maintainable.",
      tradeoffs: [
        "Modular boundaries add upfront design effort but improve long-term scalability",
        "Reporting optimizations require continuous tuning as data volume grows",
      ],
    },
    tags: ["ASP.NET Core", "Modular Monolith", "PostgreSQL", "React Native"],
  },
];

