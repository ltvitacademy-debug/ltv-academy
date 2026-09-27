// The Apex Testing course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/apex-testing/
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

export const SFTA_APEX_TESTING_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Writing Apex Tests",
    lessons: [
      L(1, "unit-testing-basics", "Unit Testing Basics"),
      L(2, "test-data", "Test Data"),
      L(3, "assertions", "Assertions"),
      L(4, "code-coverage", "Code Coverage"),
    ],
  },
  {
    n: 2,
    title: "Testing Well",
    lessons: [
      L(5, "positive-and-negative-tests", "Positive and Negative Tests"),
      L(6, "testing-triggers-and-bulk-behavior", "Testing Triggers and Bulk Behavior"),
      L(7, "deployment-requirements", "Deployment Requirements"),
    ],
  },
];
