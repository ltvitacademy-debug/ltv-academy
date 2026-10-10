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
      L(1, "soql-basics", "SOQL Basics", { contentDir: "ch01/01-soql-basics" }),
      L(2, "selecting-fields-and-filtering", "Selecting Fields and Filtering", { contentDir: "ch01/02-selecting-fields-and-filtering" }),
      L(3, "sorting-and-limiting", "Sorting and Limiting", { contentDir: "ch01/03-sorting-and-limiting" }),
      L(4, "operators-and-logical-expressions", "Operators and Logical Expressions", { contentDir: "ch01/04-operators-and-logical-expressions" }),
      L(5, "working-with-dates-and-date-literals", "Working With Dates and Date Literals", { contentDir: "ch01/05-working-with-dates-and-date-literals" }),
      L(6, "working-with-nulls", "Working With NULLs", { contentDir: "ch01/06-working-with-nulls" }),
    ],
  },
  {
    n: 2,
    title: "Relationships and Aggregates",
    lessons: [
      L(7, "relationship-queries-child-to-parent", "Relationship Queries: Child to Parent", { contentDir: "ch02/07-relationship-queries-child-to-parent" }),
      L(8, "relationship-queries-parent-to-child", "Relationship Queries: Parent to Child", { contentDir: "ch02/08-relationship-queries-parent-to-child" }),
      L(9, "aggregate-queries", "Aggregate Queries", { contentDir: "ch02/09-aggregate-queries" }),
      L(10, "group-by-and-having", "GROUP BY and HAVING", { contentDir: "ch02/10-group-by-and-having" }),
      L(11, "semi-joins-and-anti-joins", "Semi-Joins and Anti-Joins", { contentDir: "ch02/11-semi-joins-and-anti-joins" }),
      L(12, "polymorphic-relationships", "Polymorphic Relationships", { contentDir: "ch02/12-polymorphic-relationships" }),
    ],
  },
  {
    n: 3,
    title: "Search and SOSL",
    lessons: [
      L(13, "sosl-searching", "SOSL Searching", { contentDir: "ch03/13-sosl-searching" }),
      L(14, "sosl-vs-soql", "SOSL vs. SOQL", { contentDir: "ch03/14-sosl-vs-soql" }),
      L(15, "searching-multiple-objects", "Searching Multiple Objects", { contentDir: "ch03/15-searching-multiple-objects" }),
      L(16, "query-practice-sales-data", "Query Practice: Sales Data", { contentDir: "ch03/16-query-practice-sales-data" }),
      L(17, "query-practice-service-data", "Query Practice: Service Data", { contentDir: "ch03/17-query-practice-service-data" }),
    ],
  },
  {
    n: 4,
    title: "Advanced Queries and Optimization",
    lessons: [
      L(18, "dynamic-soql", "Dynamic SOQL", { contentDir: "ch04/18-dynamic-soql" }),
      L(19, "soql-injection-and-bind-variables", "SOQL Injection and Bind Variables", { contentDir: "ch04/19-soql-injection-and-bind-variables" }),
      L(20, "query-optimization", "Query Optimization", { contentDir: "ch04/20-query-optimization" }),
      L(21, "selective-queries-and-indexes", "Selective Queries and Indexes", { contentDir: "ch04/21-selective-queries-and-indexes" }),
      L(22, "query-plan-tool", "Query Plan Tool", { contentDir: "ch04/22-query-plan-tool" }),
      L(23, "soql-in-large-data-volume-orgs", "SOQL in Large Data Volume Orgs", { contentDir: "ch04/23-soql-in-large-data-volume-orgs" }),
    ],
  },
];
