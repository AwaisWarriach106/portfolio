export type SystemDesignCard = {
  title: string;
  description: string;
  diagram: {
    nodes: string[];
    flows: string[];
  };
  scalingNotes: string[];
};

export const systemDesigns: SystemDesignCard[] = [
  {
    title: "Authentication + Authorization",
    description:
      "JWT sessions with RBAC, refresh strategy, and audit trails for privileged actions.",
    diagram: {
      nodes: ["Client", "API Gateway", "Auth Service", "User DB", "Redis"],
      flows: [
        "Login → issue access/refresh tokens",
        "Request → validate JWT → authorize role/permission",
        "Cache user/session lookups in Redis",
      ],
    },
    scalingNotes: [
      "Keep tokens short-lived; rotate refresh tokens",
      "Centralize policy checks; log sensitive actions",
      "Cache hot auth reads; avoid caching permissions blindly",
    ],
  },
  {
    title: "Notification System",
    description:
      "Event-driven notifications with queues, retries, and idempotency for reliability.",
    diagram: {
      nodes: ["API", "Event Bus", "Worker", "Email/SMS Provider", "DB"],
      flows: [
        "Domain event → enqueue notification",
        "Worker → send → record delivery state",
        "Retry with backoff; dedupe by idempotency key",
      ],
    },
    scalingNotes: [
      "Separate high/low priority queues",
      "Idempotency keys to prevent double-sends",
      "Provider fallback and dead-letter queues",
    ],
  },
  {
    title: "File Upload Pipeline",
    description:
      "Signed URL uploads + async processing (scan, transform) with lifecycle states.",
    diagram: {
      nodes: ["Client", "API", "Object Storage", "Queue", "Worker"],
      flows: [
        "Init upload → signed URL",
        "Direct upload to storage",
        "Worker processes → updates DB state",
      ],
    },
    scalingNotes: [
      "Horizontal workers; isolate CPU-heavy transforms",
      "Idempotent processing steps",
      "Store state machine in DB for observability",
    ],
  },
];

