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
      L(1, "what-makes-salesforce-code-slow", "What Makes Salesforce Code Slow", { contentDir: "ch01/01-what-makes-salesforce-code-slow" }),
      L(2, "governor-limits-recap", "Governor Limits Recap", { contentDir: "ch01/02-governor-limits-recap" }),
      L(3, "bulk-processing", "Bulk Processing", { contentDir: "ch01/03-bulk-processing" }),
      L(4, "query-optimization", "Query Optimization", { contentDir: "ch01/04-query-optimization" }),
      L(5, "transaction-limits", "Transaction Limits", { contentDir: "ch01/05-transaction-limits" }),
    ],
  },
  {
    n: 2,
    title: "Measuring and Diagnosing",
    lessons: [
      L(6, "scalability", "Scalability", { contentDir: "ch02/06-scalability" }),
      L(7, "debug-logs-and-monitoring", "Debug Logs and Monitoring", { contentDir: "ch02/07-debug-logs-and-monitoring" }),
      L(8, "the-developer-console-performance-tools", "The Developer Console Performance Tools", { contentDir: "ch02/08-the-developer-console-performance-tools" }),
      L(9, "event-monitoring-overview", "Event Monitoring Overview", { contentDir: "ch02/09-event-monitoring-overview" }),
      L(10, "performance-troubleshooting", "Performance Troubleshooting", { contentDir: "ch02/10-performance-troubleshooting" }),
    ],
  },
  {
    n: 3,
    title: "Fixing Performance",
    lessons: [
      L(11, "optimizing-triggers-and-flows", "Optimizing Triggers and Flows", { contentDir: "ch03/11-optimizing-triggers-and-flows" }),
      L(12, "caching-strategies", "Caching Strategies", { contentDir: "ch03/12-caching-strategies" }),
      L(13, "reducing-data-volume-in-transactions", "Reducing Data Volume in Transactions", { contentDir: "ch03/13-reducing-data-volume-in-transactions" }),
      L(14, "performance-case-study", "Performance Case Study", { contentDir: "ch03/14-performance-case-study" }),
      L(15, "performance-review-checklist", "Performance Review Checklist", { contentDir: "ch03/15-performance-review-checklist" }),
      L(16, "performance-practice-lab", "Performance Practice Lab", { contentDir: "ch03/16-performance-practice-lab" }),
    ],
  },
];
