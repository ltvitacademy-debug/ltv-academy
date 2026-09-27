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
      L(1, "large-data-volumes-overview", "Large Data Volumes Overview"),
      L(2, "what-counts-as-large-data", "What Counts as Large Data"),
      L(3, "indexing-concepts", "Indexing Concepts"),
      L(4, "selective-queries", "Selective Queries"),
      L(5, "skinny-tables-and-custom-indexes", "Skinny Tables and Custom Indexes"),
      L(6, "query-optimization-at-scale", "Query Optimization at Scale"),
    ],
  },
  {
    n: 2,
    title: "Skew and Locking",
    lessons: [
      L(7, "data-skew-ownership-parent-and-lookup-skew", "Data Skew: Ownership, Parent and Lookup Skew"),
      L(8, "record-locking-and-lock-contention", "Record Locking and Lock Contention"),
      L(9, "bulk-loads-and-parallel-processing", "Bulk Loads and Parallel Processing"),
      L(10, "sharing-recalculation-impacts", "Sharing Recalculation Impacts"),
    ],
  },
  {
    n: 3,
    title: "Managing Volume",
    lessons: [
      L(11, "archiving", "Archiving"),
      L(12, "big-objects-for-archiving", "Big Objects for Archiving"),
      L(13, "deletion-strategies-and-soft-deletes", "Deletion Strategies and Soft Deletes"),
      L(14, "performance-strategies-for-large-data", "Performance Strategies for Large Data"),
      L(15, "large-data-volume-case-study", "Large Data Volume Case Study"),
      L(16, "large-data-volume-review-checklist", "Large Data Volume Review Checklist"),
    ],
  },
];
