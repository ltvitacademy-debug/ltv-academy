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
    title: "Performance Foundations",
    lessons: [
      L(1, "what-makes-salesforce-code-slow", "What Makes Salesforce Code Slow"),
      L(2, "governor-limits-recap", "Governor Limits Recap"),
      L(3, "bulk-processing", "Bulk Processing"),
      L(4, "query-optimization", "Query Optimization"),
      L(5, "transaction-limits", "Transaction Limits"),
    ],
  },
  {
    n: 2,
    title: "Measuring and Diagnosing",
    lessons: [
      L(6, "scalability", "Scalability"),
      L(7, "debug-logs-and-monitoring", "Debug Logs and Monitoring"),
      L(8, "the-developer-console-performance-tools", "The Developer Console Performance Tools"),
      L(9, "event-monitoring-overview", "Event Monitoring Overview"),
      L(10, "performance-troubleshooting", "Performance Troubleshooting"),
    ],
  },
  {
    n: 3,
    title: "Fixing Performance",
    lessons: [
      L(11, "optimizing-triggers-and-flows", "Optimizing Triggers and Flows"),
      L(12, "caching-strategies", "Caching Strategies"),
      L(13, "reducing-data-volume-in-transactions", "Reducing Data Volume in Transactions"),
      L(14, "performance-case-study", "Performance Case Study"),
      L(15, "performance-review-checklist", "Performance Review Checklist"),
      L(16, "performance-practice-lab", "Performance Practice Lab"),
    ],
  },
];
