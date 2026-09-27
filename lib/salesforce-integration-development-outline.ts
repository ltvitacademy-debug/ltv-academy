// The Integration Development course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/salesforce-integration-development/
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

export const SFTA_SALESFORCE_INTEGRATION_DEVELOPMENT_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Outbound Integration",
    lessons: [
      L(1, "callouts", "Callouts"),
      L(2, "named-credentials", "Named Credentials"),
      L(3, "mock-callouts-and-testing", "Mock Callouts and Testing"),
      L(4, "error-handling-and-retries", "Error Handling and Retries"),
    ],
  },
  {
    n: 2,
    title: "Inbound and Event-Based Integration",
    lessons: [
      L(5, "web-services-with-apex-rest", "Web Services with Apex REST"),
      L(6, "inbound-integration", "Inbound Integration"),
      L(7, "asynchronous-integration", "Asynchronous Integration"),
      L(8, "platform-events", "Platform Events"),
    ],
  },
  {
    n: 3,
    title: "Patterns and Practice",
    lessons: [
      L(9, "integration-patterns", "Integration Patterns"),
      L(10, "integration-practice-project", "Integration Practice Project"),
    ],
  },
];
