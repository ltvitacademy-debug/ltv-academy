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
      L(1, "why-test-apex", "Why Test Apex", { contentDir: "ch01/01-why-test-apex" }),
      L(2, "unit-testing-basics", "Unit Testing Basics", { contentDir: "ch01/02-unit-testing-basics" }),
      L(3, "test-data-and-test-factories", "Test Data and Test Factories", { contentDir: "ch01/03-test-data-and-test-factories" }),
      L(4, "assertions", "Assertions", { contentDir: "ch01/04-assertions" }),
      L(5, "code-coverage", "Code Coverage", { contentDir: "ch01/05-code-coverage" }),
      L(6, "test-setup-and-testsetup", "Test Setup and @TestSetup", { contentDir: "ch01/06-test-setup-and-testsetup" }),
    ],
  },
  {
    n: 2,
    title: "Testing Well",
    lessons: [
      L(7, "positive-and-negative-tests", "Positive and Negative Tests", { contentDir: "ch02/07-positive-and-negative-tests" }),
      L(8, "testing-triggers-and-bulk-behavior", "Testing Triggers and Bulk Behavior", { contentDir: "ch02/08-testing-triggers-and-bulk-behavior" }),
      L(9, "testing-with-different-users-system-runas", "Testing With Different Users: System.runAs", { contentDir: "ch02/09-testing-with-different-users-system-runas" }),
      L(10, "testing-callouts-with-mocks", "Testing Callouts With Mocks", { contentDir: "ch02/10-testing-callouts-with-mocks" }),
      L(11, "testing-asynchronous-apex", "Testing Asynchronous Apex", { contentDir: "ch02/11-testing-asynchronous-apex" }),
      L(12, "testing-exceptions", "Testing Exceptions", { contentDir: "ch02/12-testing-exceptions" }),
    ],
  },
  {
    n: 3,
    title: "Test Strategy",
    lessons: [
      L(13, "test-design-patterns", "Test Design Patterns", { contentDir: "ch03/13-test-design-patterns" }),
      L(14, "avoiding-common-test-mistakes", "Avoiding Common Test Mistakes", { contentDir: "ch03/14-avoiding-common-test-mistakes" }),
      L(15, "testing-governor-limits", "Testing Governor Limits", { contentDir: "ch03/15-testing-governor-limits" }),
      L(16, "deployment-requirements", "Deployment Requirements", { contentDir: "ch03/16-deployment-requirements" }),
      L(17, "test-practice-lab", "Test Practice Lab", { contentDir: "ch03/17-test-practice-lab" }),
      L(18, "testing-standards-for-a-team", "Testing Standards for a Team", { contentDir: "ch03/18-testing-standards-for-a-team" }),
    ],
  },
];
