export type SkillGroup = {
  title: string;
  level: "Core" | "Comfortable" | "Familiar";
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    level: "Comfortable",
    items: [
      "React, Angular, React Native",
      "Tailwind + UI systems, responsive design, accessibility",
      "Performance optimization (rendering, network, perceived UX)",
    ],
  },
  {
    title: "Backend",
    level: "Core",
    items: [
      "ASP.NET Core (MVC & Minimal API), clean/layered architecture",
      "Entity Framework Core + Dapper for high-performance queries",
      "RESTful API design, secure auth flows",
      "Authentication / Authorization (RBAC)",
    ],
  },
  {
    title: "Infrastructure",
    level: "Familiar",
    items: [
      "Azure, AWS, IIS deployments",
      "CI/CD & deployment pipelines",
      "Production debugging & troubleshooting, Git workflows",
    ],
  },
];

