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
      L(2, "point-to-point-integration", "Point-to-Point Integration"),
      L(3, "middleware", "Middleware"),
      L(4, "synchronous-communication", "Synchronous Communication"),
      L(5, "asynchronous-communication", "Asynchronous Communication"),
      L(6, "event-driven-architecture", "Event-Driven Architecture"),
    ],
  },
  {
    n: 2,
    title: "Integration Design",
    lessons: [
      L(7, "apis-in-integration-architecture", "APIs in Integration Architecture"),
      L(8, "enterprise-integration-patterns", "Enterprise Integration Patterns"),
      L(9, "choosing-an-integration-pattern", "Choosing an Integration Pattern"),
      L(10, "error-handling-and-idempotency", "Error Handling and Idempotency"),
      L(11, "integration-governance", "Integration Governance"),
      L(12, "integration-architecture-review", "Integration Architecture Review"),
    ],
  },
];
