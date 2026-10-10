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
      L(1, "environment-strategy-overview", "Environment Strategy Overview", { contentDir: "ch01/01-environment-strategy-overview" }),
      L(2, "development-environments", "Development Environments", { contentDir: "ch01/02-development-environments" }),
      L(3, "sandboxes-and-sandbox-types", "Sandboxes and Sandbox Types", { contentDir: "ch01/03-sandboxes-and-sandbox-types" }),
      L(4, "scratch-orgs", "Scratch Orgs", { contentDir: "ch01/04-scratch-orgs" }),
      L(5, "testing-environments", "Testing Environments", { contentDir: "ch01/05-testing-environments" }),
      L(6, "staging", "Staging", { contentDir: "ch01/06-staging" }),
      L(7, "production", "Production", { contentDir: "ch01/07-production" }),
    ],
  },
  {
    n: 2,
    title: "Managing Environments",
    lessons: [
      L(8, "sandbox-refresh-strategy", "Sandbox Refresh Strategy", { contentDir: "ch02/08-sandbox-refresh-strategy" }),
      L(9, "data-in-non-production-environments", "Data in Non-Production Environments", { contentDir: "ch02/09-data-in-non-production-environments" }),
      L(10, "data-masking-concepts", "Data Masking Concepts", { contentDir: "ch02/10-data-masking-concepts" }),
      L(11, "environment-access-and-security", "Environment Access and Security", { contentDir: "ch02/11-environment-access-and-security" }),
      L(12, "environment-diagrams", "Environment Diagrams", { contentDir: "ch02/12-environment-diagrams" }),
    ],
  },
  {
    n: 3,
    title: "Practice",
    lessons: [
      L(13, "environment-strategy-case-study-small-team", "Environment Strategy Case Study: Small Team", { contentDir: "ch03/13-environment-strategy-case-study-small-team" }),
      L(14, "environment-strategy-case-study-enterprise", "Environment Strategy Case Study: Enterprise", { contentDir: "ch03/14-environment-strategy-case-study-enterprise" }),
    ],
  },
];
