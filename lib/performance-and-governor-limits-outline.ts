// The Performance & Governor Limits course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/performance-and-governor-limits/
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

export const SFTA_PERFORMANCE_AND_GOVERNOR_LIMITS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Performance and Limits",
    lessons: [
      L(1, "bulk-processing", "Bulk Processing"),
      L(2, "query-optimization", "Query Optimization"),
      L(3, "transaction-limits", "Transaction Limits"),
      L(4, "scalability", "Scalability"),
      L(5, "debug-logs-and-monitoring", "Debug Logs and Monitoring"),
      L(6, "performance-troubleshooting", "Performance Troubleshooting"),
    ],
  },
];
