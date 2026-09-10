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
      L(1, "select-from-where", "SELECT, FROM & WHERE"),
      L(2, "order-by-and-limit", "ORDER BY & LIMIT"),
      L(3, "comparison-and-logical-operators", "Comparison & Logical Operators"),
      L(4, "soql-vs-sql", "SOQL vs. SQL: What's Actually Different"),
      L(5, "querying-standard-objects", "Querying Standard Objects"),
      L(6, "querying-custom-objects", "Querying Custom Objects"),
    ],
  },
  {
    n: 2,
    title: "SOQL Aggregation & Grouping",
    lessons: [
      L(7, "aggregate-functions", "Aggregate Functions"),
      L(8, "group-by-in-soql", "GROUP BY in SOQL"),
      L(9, "having-in-soql", "HAVING in SOQL"),
      L(10, "date-functions-in-soql", "Date Functions in SOQL"),
    ],
  },
  {
    n: 3,
    title: "Relationship Queries",
    lessons: [
      L(11, "parent-to-child-queries", "Parent-to-Child Queries"),
      L(12, "child-to-parent-queries", "Child-to-Parent Queries"),
      L(13, "dot-notation-traversal", "Dot-Notation Traversal"),
      L(14, "semi-joins-and-anti-joins", "Semi-Joins & Anti-Joins"),
      L(15, "subqueries-in-soql", "Subqueries in SOQL"),
    ],
  },
  {
    n: 4,
    title: "SOSL & Search",
    lessons: [
      L(16, "what-is-sosl", "What Is SOSL?"),
      L(17, "sosl-vs-soql", "SOSL vs. SOQL: When to Use Each"),
      L(18, "multi-object-search", "Multi-Object Search"),
    ],
  },
  {
    n: 5,
    title: "Data Loader",
    lessons: [
      L(19, "installing-and-configuring-data-loader", "Installing & Configuring Data Loader"),
      L(20, "exporting-data", "Exporting Data"),
      L(21, "inserting-and-updating-records", "Inserting & Updating Records"),
      L(22, "upserting-records", "Upserting Records"),
      L(23, "deleting-records-safely", "Deleting Records Safely"),
    ],
  },
  {
    n: 6,
    title: "Workbench & Import Wizard",
    lessons: [
      L(24, "workbench-overview", "Workbench, Overview"),
      L(25, "running-queries-in-workbench", "Running Queries in Workbench"),
      L(26, "the-import-wizard", "The Import Wizard"),
      L(27, "choosing-the-right-tool", "Choosing the Right Tool for the Job"),
    ],
  },
  {
    n: 7,
    title: "Data Quality & Cleansing",
    lessons: [
      L(28, "data-quality-issues-in-crm-data", "Data Quality Issues in CRM Data"),
      L(29, "deduplication-strategies", "Deduplication Strategies"),
      L(30, "standardizing-data", "Standardizing Data"),
      L(31, "salesforce-ids-explained", "Salesforce IDs, Explained"),
      L(32, "data-validation-rules", "Data Validation Rules"),
    ],
  },
  {
    n: 8,
    title: "Data Migration",
    lessons: [
      L(33, "planning-a-data-migration", "Planning a Data Migration"),
      L(34, "mapping-fields", "Mapping Fields"),
      L(35, "migration-sequencing", "Migration Sequencing: Parents Before Children"),
      L(36, "post-migration-validation", "Post-Migration Validation"),
    ],
  },
  {
    n: 9,
    title: "Capstone",
    lessons: [
      L(37, "capstone-kickoff", "Capstone Kickoff"),
      L(38, "capstone-extract-and-clean", "Capstone: Extract & Clean a Dataset"),
      L(39, "capstone-load-it-back-safely", "Capstone: Load It Back Safely"),
      L(40, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
