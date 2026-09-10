// The full Snowflake course outline. Only lessons with a contentDir +
// videoUrl are playable; everything else renders as "in production".
// Deliberately a short specialization, not a mega-course: assumes prior SQL
// knowledge from T-SQL Development and the broader LTV data track (joins,
// CTEs, indexes, PK/FK, fact/dimension tables aren't retaught) — every
// lesson teaches how that already-known work gets done in Snowflake
// specifically.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/snowflake/
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

export const SNOWFLAKE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Snowflake Architecture & Getting Started",
    lessons: [
      L(1, "welcome-to-snowflake-course-overview", "Welcome to Snowflake: Course Overview & What You'll Build"),
      L(2, "snowflake-architecture-storage-compute-cloud-services", "Snowflake Architecture: Storage, Compute & Cloud Services"),
      L(3, "databases-schemas-and-tables", "Databases, Schemas & Tables in Snowflake"),
      L(4, "virtual-warehouses-scaling-auto-suspend-resume", "Virtual Warehouses, Scaling & Auto-Suspend/Auto-Resume"),
      L(5, "lab-your-first-snowflake-account-and-warehouse", "Lab: Your First Snowflake Account & Warehouse"),
    ],
  },
  {
    n: 2,
    title: "Snowflake SQL — What's Different From T-SQL",
    lessons: [
      L(6, "snowflake-sql-vs-t-sql", "Snowflake SQL vs. T-SQL: Syntax Differences That Matter"),
      L(7, "ctes-and-window-functions", "CTEs and Window Functions in Snowflake"),
      L(8, "views-temporary-and-transient-tables", "Views, Temporary & Transient Tables"),
      L(9, "merge-in-snowflake", "MERGE in Snowflake"),
      L(10, "stored-procedures-and-udfs-basics", "Stored Procedures & User-Defined Functions, Basics"),
      L(11, "exercise-rewriting-t-sql-in-snowflake", "Exercise: Rewriting a T-SQL Query in Snowflake SQL"),
    ],
  },
  {
    n: 3,
    title: "Loading Data Into Snowflake",
    lessons: [
      L(12, "internal-vs-external-stages", "Internal vs. External Stages"),
      L(13, "file-formats-csv-json-parquet", "File Formats: CSV, JSON & Parquet"),
      L(14, "copy-into-bulk-loading-fundamentals", "COPY INTO — Bulk Loading Fundamentals"),
      L(15, "loading-from-cloud-storage", "Loading From Cloud Storage"),
      L(16, "handling-load-errors-and-validation", "Handling Load Errors & Validation"),
      L(17, "lab-loading-a-real-dataset", "Lab: Loading a Real Dataset Into Snowflake"),
    ],
  },
  {
    n: 4,
    title: "Snowpipe & Automated Ingestion",
    lessons: [
      L(18, "snowpipe-and-continuous-ingestion", "Snowpipe & Continuous Ingestion"),
      L(19, "automated-file-loading-and-monitoring-loads", "Automated File Loading & Monitoring Loads"),
      L(20, "handling-failed-snowpipe-loads", "Handling Failed Snowpipe Loads"),
    ],
  },
  {
    n: 5,
    title: "Data Transformation / ELT",
    lessons: [
      L(21, "the-elt-pattern-in-snowflake", "Raw → Cleaned → Business-Ready: The ELT Pattern in Snowflake"),
      L(22, "ctas-and-sql-transformations", "CTAS & SQL-Based Transformations"),
      L(23, "incremental-loading-patterns", "Incremental Loading Patterns"),
      L(24, "deduplication-strategies", "Deduplication Strategies"),
      L(25, "data-quality-checks-in-snowflake-sql", "Data Quality Checks in Snowflake SQL"),
    ],
  },
  {
    n: 6,
    title: "Data Warehousing & Dimensional Modeling in Snowflake",
    lessons: [
      L(26, "star-schemas-fact-and-dimension-tables-in-snowflake", "Star Schemas, Fact & Dimension Tables — Implementing Them in Snowflake"),
      L(27, "surrogate-keys-in-snowflake", "Surrogate Keys in Snowflake"),
      L(28, "scd-type-1-in-snowflake", "SCD Type 1 in Snowflake"),
      L(29, "scd-type-2-in-snowflake", "SCD Type 2 in Snowflake"),
      L(30, "staging-warehouse-reporting-layers", "Staging → Warehouse → Reporting Layers"),
    ],
  },
  {
    n: 7,
    title: "Semi-Structured Data",
    lessons: [
      L(31, "json-and-the-variant-data-type", "JSON & the VARIANT Data Type"),
      L(32, "querying-nested-json", "Querying Nested JSON"),
      L(33, "flatten-semi-structured-to-relational", "FLATTEN — Converting Semi-Structured Data to Relational"),
      L(34, "lab-json-feed-to-reporting-tables", "Lab: Turning a Raw JSON Feed Into Reporting Tables"),
    ],
  },
  {
    n: 8,
    title: "Streams & Tasks",
    lessons: [
      L(35, "streams-change-tracking", "Streams: Change Tracking in Snowflake"),
      L(36, "tasks-scheduled-processing", "Tasks: Scheduled Processing"),
      L(37, "incremental-pipelines-with-streams-and-tasks", "Building Incremental Pipelines With Streams + Tasks"),
      L(38, "task-dependencies-and-automating-transformations", "Task Dependencies & Automating Transformations"),
    ],
  },
  {
    n: 9,
    title: "Security & RBAC",
    lessons: [
      L(39, "users-roles-and-role-hierarchy", "Users, Roles & the Snowflake Role Hierarchy"),
      L(40, "grant-privileges-and-least-privilege", "GRANT, Privileges & Least Privilege in Snowflake"),
      L(41, "secure-views-and-row-access-policies", "Secure Views & Row Access Policies"),
      L(42, "dynamic-data-masking-in-snowflake", "Dynamic Data Masking in Snowflake"),
    ],
  },
  {
    n: 10,
    title: "Performance Optimization",
    lessons: [
      L(43, "query-profile-and-query-history", "Query Profile & Query History"),
      L(44, "micro-partitions-and-partition-pruning", "Micro-Partitions & Partition Pruning"),
      L(45, "clustering-and-caching", "Clustering & Caching"),
      L(46, "warehouse-sizing-and-expensive-queries", "Warehouse Sizing & Finding Expensive/Slow Queries"),
    ],
  },
  {
    n: 11,
    title: "Cost Management",
    lessons: [
      L(47, "snowflake-credits-and-warehouse-costs", "Snowflake Credits & Warehouse Costs"),
      L(48, "resource-monitors-preventing-runaway-costs", "Resource Monitors — Preventing Runaway Compute Costs"),
    ],
  },
  {
    n: 12,
    title: "Power BI + Snowflake",
    lessons: [
      L(49, "connecting-power-bi-to-snowflake", "Connecting Power BI to Snowflake"),
      L(50, "import-vs-directquery-considerations", "Import vs. DirectQuery Considerations"),
      L(51, "reporting-views-and-performance-considerations", "Building Reporting Views & Performance Considerations"),
    ],
  },
  {
    n: 13,
    title: "Snowflake in the Modern Data Stack",
    lessons: [
      L(52, "snowflake-and-the-modern-data-stack", "Snowflake + ADF, dbt, Python & Airflow — Where Each Tool Fits"),
      L(53, "choosing-the-right-tool-for-the-job", "Choosing the Right Tool for the Job"),
    ],
  },
  {
    n: 14,
    title: "Monitoring & Troubleshooting",
    lessons: [
      L(54, "query-history-and-load-history-for-troubleshooting", "Query History & Load History for Troubleshooting"),
      L(55, "diagnosing-warehouse-and-permissions-problems", "Diagnosing Warehouse & Permissions Problems"),
      L(56, "pipeline-troubleshooting-end-to-end", "Pipeline Troubleshooting, End to End"),
    ],
  },
  {
    n: 15,
    title: "End-to-End Capstone Project",
    lessons: [
      L(57, "capstone-kickoff-source-to-snowflake-to-power-bi", "Capstone Kickoff: SQL Server/CSV/JSON → Snowflake → Power BI"),
      L(58, "capstone-staging-loading-and-transformation", "Capstone: Staging, Loading & Transformation"),
      L(59, "capstone-dimensional-model-streams-tasks-rbac", "Capstone: Dimensional Model, Streams/Tasks & RBAC"),
      L(60, "capstone-performance-monitoring-and-presenting", "Capstone: Performance, Monitoring & Presenting Your Project"),
    ],
  },
];
