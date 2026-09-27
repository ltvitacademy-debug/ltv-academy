// The Integration Architecture course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/integration-architecture/
  videoUrl?: string;
  durationLabel?: string;
};

export type ChapterMeta = { n: number; title: string; lessons: LessonMeta[] };

const L = (n: number, slug: string, title: string, extra?: Partial<LessonMeta>): LessonMeta => ({
  n,
  slug,
  title,
  ...extra,
});

export const SFTA_INTEGRATION_ARCHITECTURE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Integration Foundations",
    lessons: [
      L(1, "integration-basics", "Integration Basics"),
      L(2, "why-integrations-fail", "Why Integrations Fail"),
      L(3, "point-to-point-integration", "Point-to-Point Integration"),
      L(4, "middleware-and-ipaas", "Middleware and iPaaS"),
      L(5, "enterprise-service-bus-and-api-gateways", "Enterprise Service Bus and API Gateways"),
      L(6, "synchronous-communication", "Synchronous Communication"),
      L(7, "asynchronous-communication", "Asynchronous Communication"),
      L(8, "event-driven-architecture", "Event-Driven Architecture"),
    ],
  },
  {
    n: 2,
    title: "Integration Design",
    lessons: [
      L(9, "apis-in-integration-architecture", "APIs in Integration Architecture"),
      L(10, "enterprise-integration-patterns", "Enterprise Integration Patterns"),
      L(11, "choosing-an-integration-pattern", "Choosing an Integration Pattern"),
      L(12, "remote-process-invocation-patterns", "Remote Process Invocation Patterns"),
      L(13, "batch-data-synchronization-patterns", "Batch Data Synchronization Patterns"),
      L(14, "data-virtualization-and-salesforce-connect", "Data Virtualization and Salesforce Connect"),
    ],
  },
  {
    n: 3,
    title: "Reliability and Operations",
    lessons: [
      L(15, "error-handling-and-idempotency", "Error Handling and Idempotency"),
      L(16, "retry-backoff-and-dead-letter-handling", "Retry, Backoff and Dead-Letter Handling"),
      L(17, "integration-governance", "Integration Governance"),
      L(18, "monitoring-and-observability", "Monitoring and Observability"),
      L(19, "integration-performance-and-limits", "Integration Performance and Limits"),
      L(20, "api-management-and-versioning", "API Management and Versioning"),
    ],
  },
  {
    n: 4,
    title: "Applying Integration Architecture",
    lessons: [
      L(21, "integration-architecture-review", "Integration Architecture Review"),
      L(22, "choosing-middleware-build-vs-buy", "Choosing Middleware: Build vs. Buy"),
      L(23, "integration-landscape-diagrams", "Integration Landscape Diagrams"),
      L(24, "integration-case-study-order-management", "Integration Case Study: Order Management"),
      L(25, "integration-case-study-customer-360", "Integration Case Study: Customer 360"),
      L(26, "exam-style-integration-scenarios", "Exam-Style Integration Scenarios"),
      L(27, "integration-architecture-review-board-practice", "Integration Architecture Review Board Practice"),
      L(28, "integration-documentation", "Integration Documentation"),
    ],
  },
];
