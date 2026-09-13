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
      L(1, "welcome-to-snowflake-course-overview", "Welcome to Snowflake: Course Overview & What You'll Build", { contentDir: "ch01/01-welcome-to-snowflake-course-overview" }),
      L(2, "snowflake-architecture-storage-compute-cloud-services", "Snowflake Architecture: Storage, Compute & Cloud Services", { contentDir: "ch01/02-snowflake-architecture-storage-compute-cloud-services" }),
      L(3, "databases-schemas-and-tables", "Databases, Schemas & Tables in Snowflake", { contentDir: "ch01/03-databases-schemas-and-tables" }),
      L(4, "virtual-warehouses-scaling-auto-suspend-resume", "Virtual Warehouses, Scaling & Auto-Suspend/Auto-Resume", { contentDir: "ch01/04-virtual-warehouses-scaling-auto-suspend-resume" }),
      L(5, "lab-your-first-snowflake-account-and-warehouse", "Lab: Your First Snowflake Account & Warehouse", { contentDir: "ch01/05-lab-your-first-snowflake-account-and-warehouse" }),
    ],
  },
  {
    n: 2,
    title: "Snowflake SQL — What's Different From T-SQL",
    lessons: [
      L(6, "snowflake-sql-vs-t-sql", "Snowflake SQL vs. T-SQL: Syntax Differences That Matter", { contentDir: "ch02/06-snowflake-sql-vs-t-sql" }),
      L(7, "ctes-and-window-functions", "CTEs and Window Functions in Snowflake", { contentDir: "ch02/07-ctes-and-window-functions" }),
      L(8, "views-temporary-and-transient-tables", "Views, Temporary & Transient Tables", { contentDir: "ch02/08-views-temporary-and-transient-tables" }),
      L(9, "merge-in-snowflake", "MERGE in Snowflake", { contentDir: "ch02/09-merge-in-snowflake" }),
      L(10, "stored-procedures-and-udfs-basics", "Stored Procedures & User-Defined Functions, Basics", { contentDir: "ch02/10-stored-procedures-and-udfs-basics" }),
      L(11, "exercise-rewriting-t-sql-in-snowflake", "Exercise: Rewriting a T-SQL Query in Snowflake SQL", { contentDir: "ch02/11-exercise-rewriting-t-sql-in-snowflake" }),
    ],
  },
  {
    n: 3,
    title: "Loading Data Into Snowflake",
    lessons: [
      L(12, "internal-vs-external-stages", "Internal vs. External Stages", { contentDir: "ch03/12-internal-vs-external-stages" }),
      L(13, "file-formats-csv-json-parquet", "File Formats: CSV, JSON & Parquet", { contentDir: "ch03/13-file-formats-csv-json-parquet" }),
      L(14, "copy-into-bulk-loading-fundamentals", "COPY INTO — Bulk Loading Fundamentals", { contentDir: "ch03/14-copy-into-bulk-loading-fundamentals" }),
      L(15, "loading-from-cloud-storage", "Loading From Cloud Storage", { contentDir: "ch03/15-loading-from-cloud-storage" }),
      L(16, "handling-load-errors-and-validation", "Handling Load Errors & Validation", { contentDir: "ch03/16-handling-load-errors-and-validation" }),
      L(17, "lab-loading-a-real-dataset", "Lab: Loading a Real Dataset Into Snowflake", { contentDir: "ch03/17-lab-loading-a-real-dataset" }),
    ],
  },
  {
    n: 4,
    title: "Snowpipe & Automated Ingestion",
    lessons: [
      L(18, "snowpipe-and-continuous-ingestion", "Snowpipe & Continuous Ingestion", { contentDir: "ch04/18-snowpipe-and-continuous-ingestion" }),
      L(19, "automated-file-loading-and-monitoring-loads", "Automated File Loading & Monitoring Loads", { contentDir: "ch04/19-automated-file-loading-and-monitoring-loads" }),
      L(20, "handling-failed-snowpipe-loads", "Handling Failed Snowpipe Loads", { contentDir: "ch04/20-handling-failed-snowpipe-loads" }),
    ],
  },
  {
    n: 5,
    title: "Data Transformation / ELT",
    lessons: [
      L(21, "the-elt-pattern-in-snowflake", "Raw → Cleaned → Business-Ready: The ELT Pattern in Snowflake", { contentDir: "ch05/21-the-elt-pattern-in-snowflake" }),
      L(22, "ctas-and-sql-transformations", "CTAS & SQL-Based Transformations", { contentDir: "ch05/22-ctas-and-sql-transformations" }),
      L(23, "incremental-loading-patterns", "Incremental Loading Patterns", { contentDir: "ch05/23-incremental-loading-patterns" }),
      L(24, "deduplication-strategies", "Deduplication Strategies", { contentDir: "ch05/24-deduplication-strategies" }),
      L(25, "data-quality-checks-in-snowflake-sql", "Data Quality Checks in Snowflake SQL", { contentDir: "ch05/25-data-quality-checks-in-snowflake-sql" }),
    ],
  },
  {
    n: 6,
    title: "Data Warehousing & Dimensional Modeling in Snowflake",
    lessons: [
      L(26, "star-schemas-fact-and-dimension-tables-in-snowflake", "Star Schemas, Fact & Dimension Tables — Implementing Them in Snowflake", { contentDir: "ch06/26-star-schemas-fact-and-dimension-tables-in-snowflake" }),
      L(27, "surrogate-keys-in-snowflake", "Surrogate Keys in Snowflake", { contentDir: "ch06/27-surrogate-keys-in-snowflake" }),
      L(28, "scd-type-1-in-snowflake", "SCD Type 1 in Snowflake", { contentDir: "ch06/28-scd-type-1-in-snowflake" }),
      L(29, "scd-type-2-in-snowflake", "SCD Type 2 in Snowflake", { contentDir: "ch06/29-scd-type-2-in-snowflake" }),
      L(30, "staging-warehouse-reporting-layers", "Staging → Warehouse → Reporting Layers", { contentDir: "ch06/30-staging-warehouse-reporting-layers" }),
    ],
  },
  {
    n: 7,
    title: "Semi-Structured Data",
    lessons: [
      L(31, "json-and-the-variant-data-type", "JSON & the VARIANT Data Type", { contentDir: "ch07/31-json-and-the-variant-data-type" }),
      L(32, "querying-nested-json", "Querying Nested JSON", { contentDir: "ch07/32-querying-nested-json" }),
      L(33, "flatten-semi-structured-to-relational", "FLATTEN — Converting Semi-Structured Data to Relational", { contentDir: "ch07/33-flatten-semi-structured-to-relational" }),
      L(34, "lab-json-feed-to-reporting-tables", "Lab: Turning a Raw JSON Feed Into Reporting Tables", { contentDir: "ch07/34-lab-json-feed-to-reporting-tables" }),
    ],
  },
  {
    n: 8,
    title: "Streams & Tasks",
    lessons: [
      L(35, "streams-change-tracking", "Streams: Change Tracking in Snowflake", { contentDir: "ch08/35-streams-change-tracking" }),
      L(36, "tasks-scheduled-processing", "Tasks: Scheduled Processing", { contentDir: "ch08/36-tasks-scheduled-processing" }),
      L(37, "incremental-pipelines-with-streams-and-tasks", "Building Incremental Pipelines With Streams + Tasks", { contentDir: "ch08/37-incremental-pipelines-with-streams-and-tasks" }),
      L(38, "task-dependencies-and-automating-transformations", "Task Dependencies & Automating Transformations", { contentDir: "ch08/38-task-dependencies-and-automating-transformations" }),
    ],
  },
  {
    n: 9,
    title: "Security & RBAC",
    lessons: [
      L(39, "users-roles-and-role-hierarchy", "Users, Roles & the Snowflake Role Hierarchy", { contentDir: "ch09/39-users-roles-and-role-hierarchy" }),
      L(40, "grant-privileges-and-least-privilege", "GRANT, Privileges & Least Privilege in Snowflake", { contentDir: "ch09/40-grant-privileges-and-least-privilege" }),
      L(41, "secure-views-and-row-access-policies", "Secure Views & Row Access Policies", { contentDir: "ch09/41-secure-views-and-row-access-policies" }),
      L(42, "dynamic-data-masking-in-snowflake", "Dynamic Data Masking in Snowflake", { contentDir: "ch09/42-dynamic-data-masking-in-snowflake" }),
    ],
  },
  {
    n: 10,
    title: "Performance Optimization",
    lessons: [
      L(43, "query-profile-and-query-history", "Query Profile & Query History", { contentDir: "ch10/43-query-profile-and-query-history" }),
      L(44, "micro-partitions-and-partition-pruning", "Micro-Partitions & Partition Pruning", { contentDir: "ch10/44-micro-partitions-and-partition-pruning" }),
      L(45, "clustering-and-caching", "Clustering & Caching", { contentDir: "ch10/45-clustering-and-caching" }),
      L(46, "warehouse-sizing-and-expensive-queries", "Warehouse Sizing & Finding Expensive/Slow Queries", { contentDir: "ch10/46-warehouse-sizing-and-expensive-queries" }),
    ],
  },
  {
    n: 11,
    title: "Cost Management",
    lessons: [
      L(47, "snowflake-credits-and-warehouse-costs", "Snowflake Credits & Warehouse Costs", { contentDir: "ch11/47-snowflake-credits-and-warehouse-costs" }),
      L(48, "resource-monitors-preventing-runaway-costs", "Resource Monitors — Preventing Runaway Compute Costs", { contentDir: "ch11/48-resource-monitors-preventing-runaway-compute-costs" }),
    ],
  },
  {
    n: 12,
    title: "Power BI + Snowflake",
    lessons: [
      L(49, "connecting-power-bi-to-snowflake", "Connecting Power BI to Snowflake", { contentDir: "ch12/49-connecting-power-bi-to-snowflake" }),
      L(50, "import-vs-directquery-considerations", "Import vs. DirectQuery Considerations", { contentDir: "ch12/50-import-vs-directquery-considerations" }),
      L(51, "reporting-views-and-performance-considerations", "Building Reporting Views & Performance Considerations", { contentDir: "ch12/51-reporting-views-and-performance-considerations" }),
    ],
  },
  {
    n: 13,
    title: "Snowflake in the Modern Data Stack",
    lessons: [
      L(52, "snowflake-and-the-modern-data-stack", "Snowflake + ADF, dbt, Python & Airflow — Where Each Tool Fits", { contentDir: "ch13/52-snowflake-and-the-modern-data-stack" }),
      L(53, "choosing-the-right-tool-for-the-job", "Choosing the Right Tool for the Job", { contentDir: "ch13/53-choosing-the-right-tool-for-the-job" }),
    ],
  },
  {
    n: 14,
    title: "Monitoring & Troubleshooting",
    lessons: [
      L(54, "query-history-and-load-history-for-troubleshooting", "Query History & Load History for Troubleshooting", { contentDir: "ch14/54-query-history-and-load-history-for-troubleshooting" }),
      L(55, "diagnosing-warehouse-and-permissions-problems", "Diagnosing Warehouse & Permissions Problems", { contentDir: "ch14/55-diagnosing-warehouse-and-permissions-problems" }),
      L(56, "pipeline-troubleshooting-end-to-end", "Pipeline Troubleshooting, End to End", { contentDir: "ch14/56-pipeline-troubleshooting-end-to-end" }),
    ],
  },
  {
    n: 15,
    title: "End-to-End Capstone Project",
    lessons: [
      L(57, "capstone-kickoff-source-to-snowflake-to-power-bi", "Capstone Kickoff: SQL Server/CSV/JSON → Snowflake → Power BI", { contentDir: "ch15/57-capstone-kickoff-source-to-snowflake-to-power-bi" }),
      L(58, "capstone-staging-loading-and-transformation", "Capstone: Staging, Loading & Transformation", { contentDir: "ch15/58-capstone-staging-loading-and-transformation" }),
      L(59, "capstone-dimensional-model-streams-tasks-rbac", "Capstone: Dimensional Model, Streams/Tasks & RBAC", { contentDir: "ch15/59-capstone-dimensional-model-streams-tasks-rbac" }),
      L(60, "capstone-performance-monitoring-and-presenting", "Capstone: Performance, Monitoring & Presenting Your Project", { contentDir: "ch15/60-capstone-performance-monitoring-and-presenting" }),
    ],
  },
];
