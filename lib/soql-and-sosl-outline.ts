// The SOQL & SOSL course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/soql-and-sosl/
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

export const SFTA_SOQL_AND_SOSL_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Querying Salesforce",
    lessons: [
      L(1, "soql-basics", "SOQL Basics"),
      L(2, "filtering-and-sorting", "Filtering and Sorting"),
      L(3, "relationship-queries", "Relationship Queries"),
      L(4, "aggregate-queries", "Aggregate Queries"),
    ],
  },
  {
    n: 2,
    title: "Search and Optimization",
    lessons: [
      L(5, "sosl-searching", "SOSL Searching"),
      L(6, "dynamic-soql", "Dynamic SOQL"),
      L(7, "query-optimization", "Query Optimization"),
      L(8, "query-practice", "Query Practice"),
    ],
  },
];
