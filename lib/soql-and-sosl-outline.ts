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
      L(2, "selecting-fields-and-filtering", "Selecting Fields and Filtering"),
      L(3, "sorting-and-limiting", "Sorting and Limiting"),
      L(4, "operators-and-logical-expressions", "Operators and Logical Expressions"),
      L(5, "working-with-dates-and-date-literals", "Working With Dates and Date Literals"),
      L(6, "working-with-nulls", "Working With NULLs"),
    ],
  },
  {
    n: 2,
    title: "Relationships and Aggregates",
    lessons: [
      L(7, "relationship-queries-child-to-parent", "Relationship Queries: Child to Parent"),
      L(8, "relationship-queries-parent-to-child", "Relationship Queries: Parent to Child"),
      L(9, "aggregate-queries", "Aggregate Queries"),
      L(10, "group-by-and-having", "GROUP BY and HAVING"),
      L(11, "semi-joins-and-anti-joins", "Semi-Joins and Anti-Joins"),
      L(12, "polymorphic-relationships", "Polymorphic Relationships"),
    ],
  },
  {
    n: 3,
    title: "Search and SOSL",
    lessons: [
      L(13, "sosl-searching", "SOSL Searching"),
      L(14, "sosl-vs-soql", "SOSL vs. SOQL"),
      L(15, "searching-multiple-objects", "Searching Multiple Objects"),
      L(16, "query-practice-sales-data", "Query Practice: Sales Data"),
      L(17, "query-practice-service-data", "Query Practice: Service Data"),
    ],
  },
  {
    n: 4,
    title: "Advanced Queries and Optimization",
    lessons: [
      L(18, "dynamic-soql", "Dynamic SOQL"),
      L(19, "soql-injection-and-bind-variables", "SOQL Injection and Bind Variables"),
      L(20, "query-optimization", "Query Optimization"),
      L(21, "selective-queries-and-indexes", "Selective Queries and Indexes"),
      L(22, "query-plan-tool", "Query Plan Tool"),
      L(23, "soql-in-large-data-volume-orgs", "SOQL in Large Data Volume Orgs"),
    ],
  },
];
