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
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792531123/ltv-soql-data-management/select-from-where.mp4",
        durationLabel: "1 min 3 s",
      }),
      L(2, "order-by-and-limit", "ORDER BY & LIMIT", { contentDir: "ch01/02-order-by-and-limit", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792531599/ltv-soql-data-management/order-by-and-limit.mp4", durationLabel: "1 min 7 s" }),
      L(3, "comparison-and-logical-operators", "Comparison & Logical Operators", { contentDir: "ch01/03-comparison-and-logical-operators", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792532019/ltv-soql-data-management/comparison-and-logical-operators.mp4", durationLabel: "0 min 58 s" }),
      L(4, "soql-vs-sql", "SOQL vs. SQL: What's Actually Different", { contentDir: "ch01/04-soql-vs-sql", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792532488/ltv-soql-data-management/soql-vs-sql.mp4", durationLabel: "1 min 23 s" }),
      L(5, "querying-standard-objects", "Querying Standard Objects", { contentDir: "ch01/05-querying-standard-objects", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792532970/ltv-soql-data-management/querying-standard-objects.mp4", durationLabel: "1 min 52 s" }),
      L(6, "querying-custom-objects", "Querying Custom Objects", { contentDir: "ch01/06-querying-custom-objects", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792533372/ltv-soql-data-management/querying-custom-objects.mp4", durationLabel: "1 min 51 s" }),
    ],
  },
  {
    n: 2,
    title: "SOQL Aggregation & Grouping",
    lessons: [
      L(7, "aggregate-functions", "Aggregate Functions", { contentDir: "ch02/07-aggregate-functions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792600229/ltv-soql-data-management/aggregate-functions.mp4", durationLabel: "1 min 56 s" }),
      L(8, "group-by-in-soql", "GROUP BY in SOQL", { contentDir: "ch02/08-group-by-in-soql", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792600740/ltv-soql-data-management/group-by-in-soql.mp4", durationLabel: "1 min 41 s" }),
      L(9, "having-in-soql", "HAVING in SOQL", { contentDir: "ch02/09-having-in-soql", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792601202/ltv-soql-data-management/having-in-soql.mp4", durationLabel: "1 min 43 s" }),
      L(10, "date-functions-in-soql", "Date Functions in SOQL", { contentDir: "ch02/10-date-functions-in-soql", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792601703/ltv-soql-data-management/date-functions-in-soql.mp4", durationLabel: "1 min 50 s" }),
    ],
  },
  {
    n: 3,
    title: "Relationship Queries",
    lessons: [
      L(11, "parent-to-child-queries", "Parent-to-Child Queries", { contentDir: "ch03/11-parent-to-child-queries", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792602204/ltv-soql-data-management/parent-to-child-queries.mp4", durationLabel: "1 min 26 s" }),
      L(12, "child-to-parent-queries", "Child-to-Parent Queries", { contentDir: "ch03/12-child-to-parent-queries", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792602574/ltv-soql-data-management/child-to-parent-queries.mp4", durationLabel: "1 min 23 s" }),
      L(13, "dot-notation-traversal", "Dot-Notation Traversal", { contentDir: "ch03/13-dot-notation-traversal", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792602984/ltv-soql-data-management/dot-notation-traversal.mp4", durationLabel: "1 min 20 s" }),
      L(14, "semi-joins-and-anti-joins", "Semi-Joins & Anti-Joins", { contentDir: "ch03/14-semi-joins-and-anti-joins", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792603356/ltv-soql-data-management/semi-joins-and-anti-joins.mp4", durationLabel: "1 min 19 s" }),
      L(15, "subqueries-in-soql", "Subqueries in SOQL", { contentDir: "ch03/15-subqueries-in-soql", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792603735/ltv-soql-data-management/subqueries-in-soql.mp4", durationLabel: "1 min 19 s" }),
    ],
  },
  {
    n: 4,
    title: "SOSL & Search",
    lessons: [
      L(16, "what-is-sosl", "What Is SOSL?", { contentDir: "ch04/16-what-is-sosl", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792604231/ltv-soql-data-management/what-is-sosl.mp4", durationLabel: "1 min 19 s" }),
      L(17, "sosl-vs-soql", "SOSL vs. SOQL: When to Use Each", { contentDir: "ch04/17-sosl-vs-soql", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792604587/ltv-soql-data-management/sosl-vs-soql.mp4", durationLabel: "1 min 16 s" }),
      L(18, "multi-object-search", "Multi-Object Search", { contentDir: "ch04/18-multi-object-search", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792605010/ltv-soql-data-management/multi-object-search.mp4", durationLabel: "1 min 26 s" }),
    ],
  },
  {
    n: 5,
    title: "Data Loader",
    lessons: [
      L(19, "installing-and-configuring-data-loader", "Installing & Configuring Data Loader", { contentDir: "ch05/19-installing-and-configuring-data-loader", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792605534/ltv-soql-data-management/installing-and-configuring-data-loader.mp4", durationLabel: "1 min 22 s" }),
      L(20, "exporting-data", "Exporting Data", { contentDir: "ch05/20-exporting-data", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792605880/ltv-soql-data-management/exporting-data.mp4", durationLabel: "1 min 10 s" }),
      L(21, "inserting-and-updating-records", "Inserting & Updating Records", { contentDir: "ch05/21-inserting-and-updating-records", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792606177/ltv-soql-data-management/inserting-and-updating-records.mp4", durationLabel: "1 min 10 s" }),
      L(22, "upserting-records", "Upserting Records", { contentDir: "ch05/22-upserting-records", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792606528/ltv-soql-data-management/upserting-records.mp4", durationLabel: "1 min 11 s" }),
      L(23, "deleting-records-safely", "Deleting Records Safely", { contentDir: "ch05/23-deleting-records-safely", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792606801/ltv-soql-data-management/deleting-records-safely.mp4", durationLabel: "1 min 8 s" }),
    ],
  },
  {
    n: 6,
    title: "Workbench & Import Wizard",
    lessons: [
      L(24, "workbench-overview", "Workbench, Overview", { contentDir: "ch06/24-workbench-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792607283/ltv-soql-data-management/workbench-overview.mp4", durationLabel: "1 min 16 s" }),
      L(25, "running-queries-in-workbench", "Running Queries in Workbench", { contentDir: "ch06/25-running-queries-in-workbench", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792607583/ltv-soql-data-management/running-queries-in-workbench.mp4", durationLabel: "1 min 4 s" }),
      L(26, "the-import-wizard", "The Import Wizard", { contentDir: "ch06/26-the-import-wizard", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792607879/ltv-soql-data-management/the-import-wizard.mp4", durationLabel: "1 min 3 s" }),
      L(27, "choosing-the-right-tool", "Choosing the Right Tool for the Job", { contentDir: "ch06/27-choosing-the-right-tool", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792608211/ltv-soql-data-management/choosing-the-right-tool.mp4", durationLabel: "1 min 20 s" }),
    ],
  },
  {
    n: 7,
    title: "Data Quality & Cleansing",
    lessons: [
      L(28, "data-quality-issues-in-crm-data", "Data Quality Issues in CRM Data", { contentDir: "ch07/28-data-quality-issues-in-crm-data", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792608856/ltv-soql-data-management/data-quality-issues-in-crm-data.mp4", durationLabel: "1 min 50 s" }),
      L(29, "deduplication-strategies", "Deduplication Strategies", { contentDir: "ch07/29-deduplication-strategies", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792609436/ltv-soql-data-management/deduplication-strategies.mp4", durationLabel: "1 min 51 s" }),
      L(30, "standardizing-data", "Standardizing Data", { contentDir: "ch07/30-standardizing-data", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792609860/ltv-soql-data-management/standardizing-data.mp4", durationLabel: "1 min 39 s" }),
      L(31, "salesforce-ids-explained", "Salesforce IDs, Explained", { contentDir: "ch07/31-salesforce-ids-explained", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792610343/ltv-soql-data-management/salesforce-ids-explained.mp4", durationLabel: "1 min 56 s" }),
      L(32, "data-validation-rules", "Data Validation Rules", { contentDir: "ch07/32-data-validation-rules", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792610861/ltv-soql-data-management/data-validation-rules.mp4", durationLabel: "1 min 54 s" }),
    ],
  },
  {
    n: 8,
    title: "Data Migration",
    lessons: [
      L(33, "planning-a-data-migration", "Planning a Data Migration", { contentDir: "ch08/33-planning-a-data-migration", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792611707/ltv-soql-data-management/planning-a-data-migration.mp4", durationLabel: "1 min 51 s" }),
      L(34, "mapping-fields", "Mapping Fields", { contentDir: "ch08/34-mapping-fields", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792612312/ltv-soql-data-management/mapping-fields.mp4", durationLabel: "1 min 43 s" }),
      L(35, "migration-sequencing", "Migration Sequencing: Parents Before Children", { contentDir: "ch08/35-migration-sequencing", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792612909/ltv-soql-data-management/migration-sequencing.mp4", durationLabel: "1 min 48 s" }),
      L(36, "post-migration-validation", "Post-Migration Validation", { contentDir: "ch08/36-post-migration-validation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792613439/ltv-soql-data-management/post-migration-validation.mp4", durationLabel: "1 min 52 s" }),
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
