// The Environment Strategy course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/salesforce-environment-strategy/
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

export const SFTA_SALESFORCE_ENVIRONMENT_STRATEGY_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Environments",
    lessons: [
      L(1, "environment-strategy-overview", "Environment Strategy Overview"),
      L(2, "development-environments", "Development Environments"),
      L(3, "sandboxes-and-sandbox-types", "Sandboxes and Sandbox Types"),
      L(4, "scratch-orgs", "Scratch Orgs"),
      L(5, "testing-environments", "Testing Environments"),
      L(6, "staging", "Staging"),
      L(7, "production", "Production"),
    ],
  },
  {
    n: 2,
    title: "Managing Environments",
    lessons: [
      L(8, "sandbox-refresh-strategy", "Sandbox Refresh Strategy"),
      L(9, "data-in-non-production-environments", "Data in Non-Production Environments"),
      L(10, "data-masking-concepts", "Data Masking Concepts"),
      L(11, "environment-access-and-security", "Environment Access and Security"),
      L(12, "environment-diagrams", "Environment Diagrams"),
    ],
  },
  {
    n: 3,
    title: "Practice",
    lessons: [
      L(13, "environment-strategy-case-study-small-team", "Environment Strategy Case Study: Small Team"),
      L(14, "environment-strategy-case-study-enterprise", "Environment Strategy Case Study: Enterprise"),
    ],
  },
];
