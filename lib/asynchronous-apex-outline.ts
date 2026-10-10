// The Asynchronous Apex course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/asynchronous-apex/
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

export const SFTA_ASYNCHRONOUS_APEX_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Asynchronous Processing",
    lessons: [
      L(1, "asynchronous-processing-overview", "Asynchronous Processing Overview", { contentDir: "ch01/01-asynchronous-processing-overview" }),
      L(2, "why-asynchronous-apex-exists", "Why Asynchronous Apex Exists", { contentDir: "ch01/02-why-asynchronous-apex-exists" }),
      L(3, "future-methods", "Future Methods", { contentDir: "ch01/03-future-methods" }),
      L(4, "queueable-apex", "Queueable Apex", { contentDir: "ch01/04-queueable-apex" }),
      L(5, "batch-apex", "Batch Apex", { contentDir: "ch01/05-batch-apex" }),
      L(6, "scheduled-apex", "Scheduled Apex", { contentDir: "ch01/06-scheduled-apex" }),
    ],
  },
  {
    n: 2,
    title: "Working With Async Jobs",
    lessons: [
      L(7, "chaining-queueable-jobs", "Chaining Queueable Jobs", { contentDir: "ch02/07-chaining-queueable-jobs" }),
      L(8, "batch-apex-scope-and-state", "Batch Apex Scope and State", { contentDir: "ch02/08-batch-apex-scope-and-state" }),
      L(9, "monitoring-jobs-in-setup", "Monitoring Jobs in Setup", { contentDir: "ch02/09-monitoring-jobs-in-setup" }),
      L(10, "error-handling-in-asynchronous-apex", "Error Handling in Asynchronous Apex", { contentDir: "ch02/10-error-handling-in-asynchronous-apex" }),
      L(11, "asynchronous-limits", "Asynchronous Limits", { contentDir: "ch02/11-asynchronous-limits" }),
    ],
  },
  {
    n: 3,
    title: "Choosing and Practicing",
    lessons: [
      L(12, "choosing-the-right-asynchronous-tool", "Choosing the Right Asynchronous Tool", { contentDir: "ch03/12-choosing-the-right-asynchronous-tool" }),
      L(13, "async-practice-lab-data-cleanup", "Async Practice Lab: Data Cleanup", { contentDir: "ch03/13-async-practice-lab-data-cleanup" }),
      L(14, "async-practice-lab-nightly-sync", "Async Practice Lab: Nightly Sync", { contentDir: "ch03/14-async-practice-lab-nightly-sync" }),
      L(15, "testing-asynchronous-apex", "Testing Asynchronous Apex", { contentDir: "ch03/15-testing-asynchronous-apex" }),
      L(16, "async-apex-design-review", "Async Apex Design Review", { contentDir: "ch03/16-async-apex-design-review" }),
    ],
  },
];
