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
      L(1, "asynchronous-processing-overview", "Asynchronous Processing Overview"),
      L(2, "why-asynchronous-apex-exists", "Why Asynchronous Apex Exists"),
      L(3, "future-methods", "Future Methods"),
      L(4, "queueable-apex", "Queueable Apex"),
      L(5, "batch-apex", "Batch Apex"),
      L(6, "scheduled-apex", "Scheduled Apex"),
    ],
  },
  {
    n: 2,
    title: "Working With Async Jobs",
    lessons: [
      L(7, "chaining-queueable-jobs", "Chaining Queueable Jobs"),
      L(8, "batch-apex-scope-and-state", "Batch Apex Scope and State"),
      L(9, "monitoring-jobs-in-setup", "Monitoring Jobs in Setup"),
      L(10, "error-handling-in-asynchronous-apex", "Error Handling in Asynchronous Apex"),
      L(11, "asynchronous-limits", "Asynchronous Limits"),
    ],
  },
  {
    n: 3,
    title: "Choosing and Practicing",
    lessons: [
      L(12, "choosing-the-right-asynchronous-tool", "Choosing the Right Asynchronous Tool"),
      L(13, "async-practice-lab-data-cleanup", "Async Practice Lab: Data Cleanup"),
      L(14, "async-practice-lab-nightly-sync", "Async Practice Lab: Nightly Sync"),
      L(15, "testing-asynchronous-apex", "Testing Asynchronous Apex"),
      L(16, "async-apex-design-review", "Async Apex Design Review"),
    ],
  },
];
