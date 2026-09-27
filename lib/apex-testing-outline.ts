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
      L(1, "why-test-apex", "Why Test Apex"),
      L(2, "unit-testing-basics", "Unit Testing Basics"),
      L(3, "test-data-and-test-factories", "Test Data and Test Factories"),
      L(4, "assertions", "Assertions"),
      L(5, "code-coverage", "Code Coverage"),
      L(6, "test-setup-and-testsetup", "Test Setup and @TestSetup"),
    ],
  },
  {
    n: 2,
    title: "Testing Well",
    lessons: [
      L(7, "positive-and-negative-tests", "Positive and Negative Tests"),
      L(8, "testing-triggers-and-bulk-behavior", "Testing Triggers and Bulk Behavior"),
      L(9, "testing-with-different-users-system-runas", "Testing With Different Users: System.runAs"),
      L(10, "testing-callouts-with-mocks", "Testing Callouts With Mocks"),
      L(11, "testing-asynchronous-apex", "Testing Asynchronous Apex"),
      L(12, "testing-exceptions", "Testing Exceptions"),
    ],
  },
  {
    n: 3,
    title: "Test Strategy",
    lessons: [
      L(13, "test-design-patterns", "Test Design Patterns"),
      L(14, "avoiding-common-test-mistakes", "Avoiding Common Test Mistakes"),
      L(15, "testing-governor-limits", "Testing Governor Limits"),
      L(16, "deployment-requirements", "Deployment Requirements"),
      L(17, "test-practice-lab", "Test Practice Lab"),
      L(18, "testing-standards-for-a-team", "Testing Standards for a Team"),
    ],
  },
];
