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
      L(1, "integration-basics", "Integration Basics", { contentDir: "ch01/01-integration-basics" }),
      L(2, "why-integrations-fail", "Why Integrations Fail", { contentDir: "ch01/02-why-integrations-fail" }),
      L(3, "point-to-point-integration", "Point-to-Point Integration", { contentDir: "ch01/03-point-to-point-integration" }),
      L(4, "middleware-and-ipaas", "Middleware and iPaaS", { contentDir: "ch01/04-middleware-and-ipaas" }),
      L(5, "enterprise-service-bus-and-api-gateways", "Enterprise Service Bus and API Gateways", { contentDir: "ch01/05-enterprise-service-bus-and-api-gateways" }),
      L(6, "synchronous-communication", "Synchronous Communication", { contentDir: "ch01/06-synchronous-communication" }),
      L(7, "asynchronous-communication", "Asynchronous Communication", { contentDir: "ch01/07-asynchronous-communication" }),
      L(8, "event-driven-architecture", "Event-Driven Architecture", { contentDir: "ch01/08-event-driven-architecture" }),
    ],
  },
  {
    n: 2,
    title: "Integration Design",
    lessons: [
      L(9, "apis-in-integration-architecture", "APIs in Integration Architecture", { contentDir: "ch02/09-apis-in-integration-architecture" }),
      L(10, "enterprise-integration-patterns", "Enterprise Integration Patterns", { contentDir: "ch02/10-enterprise-integration-patterns" }),
      L(11, "choosing-an-integration-pattern", "Choosing an Integration Pattern", { contentDir: "ch02/11-choosing-an-integration-pattern" }),
      L(12, "remote-process-invocation-patterns", "Remote Process Invocation Patterns", { contentDir: "ch02/12-remote-process-invocation-patterns" }),
      L(13, "batch-data-synchronization-patterns", "Batch Data Synchronization Patterns", { contentDir: "ch02/13-batch-data-synchronization-patterns" }),
      L(14, "data-virtualization-and-salesforce-connect", "Data Virtualization and Salesforce Connect", { contentDir: "ch02/14-data-virtualization-and-salesforce-connect" }),
    ],
  },
  {
    n: 3,
    title: "Reliability and Operations",
    lessons: [
      L(15, "error-handling-and-idempotency", "Error Handling and Idempotency", { contentDir: "ch03/15-error-handling-and-idempotency" }),
      L(16, "retry-backoff-and-dead-letter-handling", "Retry, Backoff and Dead-Letter Handling", { contentDir: "ch03/16-retry-backoff-and-dead-letter-handling" }),
      L(17, "integration-governance", "Integration Governance", { contentDir: "ch03/17-integration-governance" }),
      L(18, "monitoring-and-observability", "Monitoring and Observability", { contentDir: "ch03/18-monitoring-and-observability" }),
      L(19, "integration-performance-and-limits", "Integration Performance and Limits", { contentDir: "ch03/19-integration-performance-and-limits" }),
      L(20, "api-management-and-versioning", "API Management and Versioning", { contentDir: "ch03/20-api-management-and-versioning" }),
    ],
  },
  {
    n: 4,
    title: "Applying Integration Architecture",
    lessons: [
      L(21, "integration-architecture-review", "Integration Architecture Review", { contentDir: "ch04/21-integration-architecture-review" }),
      L(22, "choosing-middleware-build-vs-buy", "Choosing Middleware: Build vs. Buy", { contentDir: "ch04/22-choosing-middleware-build-vs-buy" }),
      L(23, "integration-landscape-diagrams", "Integration Landscape Diagrams", { contentDir: "ch04/23-integration-landscape-diagrams" }),
      L(24, "integration-case-study-order-management", "Integration Case Study: Order Management", { contentDir: "ch04/24-integration-case-study-order-management" }),
      L(25, "integration-case-study-customer-360", "Integration Case Study: Customer 360", { contentDir: "ch04/25-integration-case-study-customer-360" }),
      L(26, "exam-style-integration-scenarios", "Exam-Style Integration Scenarios", { contentDir: "ch04/26-exam-style-integration-scenarios" }),
      L(27, "integration-architecture-review-board-practice", "Integration Architecture Review Board Practice", { contentDir: "ch04/27-integration-architecture-review-board-practice" }),
      L(28, "integration-documentation", "Integration Documentation", { contentDir: "ch04/28-integration-documentation" }),
    ],
  },
];
