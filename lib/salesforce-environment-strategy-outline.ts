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
      L(1, "development-environments", "Development Environments"),
      L(2, "sandboxes", "Sandboxes"),
      L(3, "scratch-orgs", "Scratch Orgs"),
      L(4, "testing-environments", "Testing Environments"),
      L(5, "staging", "Staging"),
      L(6, "production", "Production"),
    ],
  },
];
