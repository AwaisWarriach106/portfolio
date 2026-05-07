export type ExperienceItem = {
  period: string;
  title: string;
  company: string;
  summary: string;
  highlights: string[];
};

export const experience: ExperienceItem[] = [
  {
    period: "01/2024 — Present",
    title: "Full Stack Engineer",
    company: "Izylogic Software House",
    summary:
      "Built scalable web and mobile apps with ASP.NET Core APIs, role-based systems, and production deployments.",
    highlights: [
      "Designed RESTful APIs with ASP.NET Core + EF Core",
      "Optimized SQL & Dapper queries to reduce API response times by 30%",
      "Implemented JWT auth + RBAC (Admin/Manager/Employee) and deployed to IIS with production hardening",
    ],
  },
  {
    period: "07/2023 — 2024",
    title: "Freelance Web & App Developer",
    company: "Self-employed",
    summary:
      "Delivered full-stack web and cross-platform mobile apps end-to-end, from requirements to deployment and support.",
    highlights: [
      "Built RESTful APIs (MVC & Minimal API), database schemas, and indexing strategies",
      "Deployed to Azure/AWS/IIS; handled production troubleshooting and configuration",
    ],
  },
];

