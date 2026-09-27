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
      L(2, "indexing-concepts", "Indexing Concepts"),
      L(3, "selective-queries", "Selective Queries"),
      L(4, "data-skew", "Data Skew"),
      L(5, "archiving", "Archiving"),
      L(6, "performance-strategies-for-large-data", "Performance Strategies for Large Data"),
    ],
  },
];
