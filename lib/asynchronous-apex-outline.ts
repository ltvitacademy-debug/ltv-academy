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
      L(2, "future-methods", "Future Methods"),
      L(3, "queueable-apex", "Queueable Apex"),
      L(4, "batch-apex", "Batch Apex"),
      L(5, "scheduled-apex", "Scheduled Apex"),
      L(6, "chaining-and-monitoring-jobs", "Chaining and Monitoring Jobs"),
      L(7, "choosing-the-right-asynchronous-tool", "Choosing the Right Asynchronous Tool"),
    ],
  },
];
