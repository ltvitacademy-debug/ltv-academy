// The full SOQL & Salesforce Data Management course outline. Only lessons
// with a contentDir + videoUrl are playable; everything else renders as
// "in production". This is the T-SQL to Salesforce bridge — assumes SQL
// from T-SQL Development, teaches SOQL/SOSL and the data-movement tools
// (Data Loader, Workbench) that current Salesforce Data Analyst postings
// explicitly ask for.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/soql-data-management/
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

export const SOQL_DATA_MANAGEMENT_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "SOQL Fundamentals",
    lessons: [
      L(1, "select-from-where", "SELECT, FROM & WHERE", {
        contentDir: "ch01/01-select-from-where",
        // videoUrl/durationLabel pending
      }),
      L(2, "order-by-and-limit", "ORDER BY & LIMIT", { contentDir: "ch01/02-order-by-and-limit" }),
      L(3, "comparison-and-logical-operators", "Comparison & Logical Operators", { contentDir: "ch01/03-comparison-and-logical-operators" }),
      L(4, "soql-vs-sql", "SOQL vs. SQL: What's Actually Different", { contentDir: "ch01/04-soql-vs-sql" }),
      L(5, "querying-standard-objects", "Querying Standard Objects", { contentDir: "ch01/05-querying-standard-objects" }),
      L(6, "querying-custom-objects", "Querying Custom Objects", { contentDir: "ch01/06-querying-custom-objects" }),
    ],
  },
  {
    n: 2,
    title: "SOQL Aggregation & Grouping",
    lessons: [
      L(7, "aggregate-functions", "Aggregate Functions", { contentDir: "ch02/07-aggregate-functions" }),
      L(8, "group-by-in-soql", "GROUP BY in SOQL", { contentDir: "ch02/08-group-by-in-soql" }),
      L(9, "having-in-soql", "HAVING in SOQL", { contentDir: "ch02/09-having-in-soql" }),
      L(10, "date-functions-in-soql", "Date Functions in SOQL", { contentDir: "ch02/10-date-functions-in-soql" }),
    ],
  },
  {
    n: 3,
    title: "Relationship Queries",
    lessons: [
      L(11, "parent-to-child-queries", "Parent-to-Child Queries", { contentDir: "ch03/11-parent-to-child-queries" }),
      L(12, "child-to-parent-queries", "Child-to-Parent Queries", { contentDir: "ch03/12-child-to-parent-queries" }),
      L(13, "dot-notation-traversal", "Dot-Notation Traversal", { contentDir: "ch03/13-dot-notation-traversal" }),
      L(14, "semi-joins-and-anti-joins", "Semi-Joins & Anti-Joins", { contentDir: "ch03/14-semi-joins-and-anti-joins" }),
      L(15, "subqueries-in-soql", "Subqueries in SOQL", { contentDir: "ch03/15-subqueries-in-soql" }),
    ],
  },
  {
    n: 4,
    title: "SOSL & Search",
    lessons: [
      L(16, "what-is-sosl", "What Is SOSL?", { contentDir: "ch04/16-what-is-sosl" }),
      L(17, "sosl-vs-soql", "SOSL vs. SOQL: When to Use Each", { contentDir: "ch04/17-sosl-vs-soql" }),
      L(18, "multi-object-search", "Multi-Object Search", { contentDir: "ch04/18-multi-object-search" }),
    ],
  },
  {
    n: 5,
    title: "Data Loader",
    lessons: [
      L(19, "installing-and-configuring-data-loader", "Installing & Configuring Data Loader", { contentDir: "ch05/19-installing-and-configuring-data-loader" }),
      L(20, "exporting-data", "Exporting Data", { contentDir: "ch05/20-exporting-data" }),
      L(21, "inserting-and-updating-records", "Inserting & Updating Records", { contentDir: "ch05/21-inserting-and-updating-records" }),
      L(22, "upserting-records", "Upserting Records", { contentDir: "ch05/22-upserting-records" }),
      L(23, "deleting-records-safely", "Deleting Records Safely", { contentDir: "ch05/23-deleting-records-safely" }),
    ],
  },
  {
    n: 6,
    title: "Workbench & Import Wizard",
    lessons: [
      L(24, "workbench-overview", "Workbench, Overview", { contentDir: "ch06/24-workbench-overview" }),
      L(25, "running-queries-in-workbench", "Running Queries in Workbench", { contentDir: "ch06/25-running-queries-in-workbench" }),
      L(26, "the-import-wizard", "The Import Wizard", { contentDir: "ch06/26-the-import-wizard" }),
      L(27, "choosing-the-right-tool", "Choosing the Right Tool for the Job", { contentDir: "ch06/27-choosing-the-right-tool" }),
    ],
  },
  {
    n: 7,
    title: "Data Quality & Cleansing",
    lessons: [
      L(28, "data-quality-issues-in-crm-data", "Data Quality Issues in CRM Data", { contentDir: "ch07/28-data-quality-issues-in-crm-data" }),
      L(29, "deduplication-strategies", "Deduplication Strategies", { contentDir: "ch07/29-deduplication-strategies" }),
      L(30, "standardizing-data", "Standardizing Data", { contentDir: "ch07/30-standardizing-data" }),
      L(31, "salesforce-ids-explained", "Salesforce IDs, Explained", { contentDir: "ch07/31-salesforce-ids-explained" }),
      L(32, "data-validation-rules", "Data Validation Rules", { contentDir: "ch07/32-data-validation-rules" }),
    ],
  },
  {
    n: 8,
    title: "Data Migration",
    lessons: [
      L(33, "planning-a-data-migration", "Planning a Data Migration", { contentDir: "ch08/33-planning-a-data-migration" }),
      L(34, "mapping-fields", "Mapping Fields", { contentDir: "ch08/34-mapping-fields" }),
      L(35, "migration-sequencing", "Migration Sequencing: Parents Before Children", { contentDir: "ch08/35-migration-sequencing" }),
      L(36, "post-migration-validation", "Post-Migration Validation", { contentDir: "ch08/36-post-migration-validation" }),
    ],
  },
  {
    n: 9,
    title: "Capstone",
    lessons: [
      L(37, "capstone-kickoff", "Capstone Kickoff", { contentDir: "ch09/37-capstone-kickoff" }),
      L(38, "capstone-extract-and-clean", "Capstone: Extract & Clean a Dataset", { contentDir: "ch09/38-capstone-extract-and-clean" }),
      L(39, "capstone-load-it-back-safely", "Capstone: Load It Back Safely", { contentDir: "ch09/39-capstone-load-it-back-safely" }),
      L(40, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch09/40-capstone-wrap-up" }),
    ],
  },
];
