// The Large Data Volumes course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/large-data-volumes/
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

export const SFTA_LARGE_DATA_VOLUMES_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Working at Scale",
    lessons: [
      L(1, "large-data-volumes-overview", "Large Data Volumes Overview", { contentDir: "ch01/01-large-data-volumes-overview" }),
      L(2, "what-counts-as-large-data", "What Counts as Large Data", { contentDir: "ch01/02-what-counts-as-large-data" }),
      L(3, "indexing-concepts", "Indexing Concepts", { contentDir: "ch01/03-indexing-concepts" }),
      L(4, "selective-queries", "Selective Queries", { contentDir: "ch01/04-selective-queries" }),
      L(5, "skinny-tables-and-custom-indexes", "Skinny Tables and Custom Indexes", { contentDir: "ch01/05-skinny-tables-and-custom-indexes" }),
      L(6, "query-optimization-at-scale", "Query Optimization at Scale", { contentDir: "ch01/06-query-optimization-at-scale" }),
    ],
  },
  {
    n: 2,
    title: "Skew and Locking",
    lessons: [
      L(7, "data-skew-ownership-parent-and-lookup-skew", "Data Skew: Ownership, Parent and Lookup Skew", { contentDir: "ch02/07-data-skew-ownership-parent-and-lookup-skew" }),
      L(8, "record-locking-and-lock-contention", "Record Locking and Lock Contention", { contentDir: "ch02/08-record-locking-and-lock-contention" }),
      L(9, "bulk-loads-and-parallel-processing", "Bulk Loads and Parallel Processing", { contentDir: "ch02/09-bulk-loads-and-parallel-processing" }),
      L(10, "sharing-recalculation-impacts", "Sharing Recalculation Impacts", { contentDir: "ch02/10-sharing-recalculation-impacts" }),
    ],
  },
  {
    n: 3,
    title: "Managing Volume",
    lessons: [
      L(11, "archiving", "Archiving", { contentDir: "ch03/11-archiving" }),
      L(12, "big-objects-for-archiving", "Big Objects for Archiving", { contentDir: "ch03/12-big-objects-for-archiving" }),
      L(13, "deletion-strategies-and-soft-deletes", "Deletion Strategies and Soft Deletes", { contentDir: "ch03/13-deletion-strategies-and-soft-deletes" }),
      L(14, "performance-strategies-for-large-data", "Performance Strategies for Large Data", { contentDir: "ch03/14-performance-strategies-for-large-data" }),
      L(15, "large-data-volume-case-study", "Large Data Volume Case Study", { contentDir: "ch03/15-large-data-volume-case-study" }),
      L(16, "large-data-volume-review-checklist", "Large Data Volume Review Checklist", { contentDir: "ch03/16-large-data-volume-review-checklist" }),
    ],
  },
];
