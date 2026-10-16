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
      L(1, "welcome-to-snowflake-course-overview", "Welcome to Snowflake: Course Overview & What You'll Build", { contentDir: "ch01/01-welcome-to-snowflake-course-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792126635/ltv-snowflake/welcome-to-snowflake-course-overview.mp4", durationLabel: "1 min 48 s" }),
      L(2, "snowflake-architecture-storage-compute-cloud-services", "Snowflake Architecture: Storage, Compute & Cloud Services", { contentDir: "ch01/02-snowflake-architecture-storage-compute-cloud-services", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792126684/ltv-snowflake/snowflake-architecture-storage-compute-cloud-services.mp4", durationLabel: "1 min 40 s" }),
      L(3, "databases-schemas-and-tables", "Databases, Schemas & Tables in Snowflake", { contentDir: "ch01/03-databases-schemas-and-tables", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792126732/ltv-snowflake/databases-schemas-and-tables.mp4", durationLabel: "1 min 31 s" }),
      L(4, "virtual-warehouses-scaling-auto-suspend-resume", "Virtual Warehouses, Scaling & Auto-Suspend/Auto-Resume", { contentDir: "ch01/04-virtual-warehouses-scaling-auto-suspend-resume", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792126783/ltv-snowflake/virtual-warehouses-scaling-auto-suspend-resume.mp4", durationLabel: "1 min 40 s" }),
      L(5, "lab-your-first-snowflake-account-and-warehouse", "Lab: Your First Snowflake Account & Warehouse", { contentDir: "ch01/05-lab-your-first-snowflake-account-and-warehouse", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792126832/ltv-snowflake/lab-your-first-snowflake-account-and-warehouse.mp4", durationLabel: "1 min 36 s" }),
    ],
  },
  {
    n: 2,
    title: "Snowflake SQL — What's Different From T-SQL",
    lessons: [
      L(6, "snowflake-sql-vs-t-sql", "Snowflake SQL vs. T-SQL: Syntax Differences That Matter", { contentDir: "ch02/06-snowflake-sql-vs-t-sql", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792126900/ltv-snowflake/snowflake-sql-vs-t-sql.mp4", durationLabel: "2 min 12 s" }),
      L(7, "ctes-and-window-functions", "CTEs and Window Functions in Snowflake", { contentDir: "ch02/07-ctes-and-window-functions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792126946/ltv-snowflake/ctes-and-window-functions.mp4", durationLabel: "1 min 28 s" }),
      L(8, "views-temporary-and-transient-tables", "Views, Temporary & Transient Tables", { contentDir: "ch02/08-views-temporary-and-transient-tables", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792126997/ltv-snowflake/views-temporary-and-transient-tables.mp4", durationLabel: "1 min 37 s" }),
      L(9, "merge-in-snowflake", "MERGE in Snowflake", { contentDir: "ch02/09-merge-in-snowflake", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792127050/ltv-snowflake/merge-in-snowflake.mp4", durationLabel: "1 min 41 s" }),
      L(10, "stored-procedures-and-udfs-basics", "Stored Procedures & User-Defined Functions, Basics", { contentDir: "ch02/10-stored-procedures-and-udfs-basics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792127104/ltv-snowflake/stored-procedures-and-udfs-basics.mp4", durationLabel: "1 min 44 s" }),
      L(11, "exercise-rewriting-t-sql-in-snowflake", "Exercise: Rewriting a T-SQL Query in Snowflake SQL", { contentDir: "ch02/11-exercise-rewriting-t-sql-in-snowflake", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792127162/ltv-snowflake/exercise-rewriting-t-sql-in-snowflake.mp4", durationLabel: "1 min 53 s" }),
    ],
  },
  {
    n: 3,
    title: "Loading Data Into Snowflake",
    lessons: [
      L(12, "internal-vs-external-stages", "Internal vs. External Stages", { contentDir: "ch03/12-internal-vs-external-stages", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792127219/ltv-snowflake/internal-vs-external-stages.mp4", durationLabel: "1 min 45 s" }),
      L(13, "file-formats-csv-json-parquet", "File Formats: CSV, JSON & Parquet", { contentDir: "ch03/13-file-formats-csv-json-parquet", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792127272/ltv-snowflake/file-formats-csv-json-parquet.mp4", durationLabel: "1 min 39 s" }),
      L(14, "copy-into-bulk-loading-fundamentals", "COPY INTO — Bulk Loading Fundamentals", { contentDir: "ch03/14-copy-into-bulk-loading-fundamentals", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792127325/ltv-snowflake/copy-into-bulk-loading-fundamentals.mp4", durationLabel: "1 min 33 s" }),
      L(15, "loading-from-cloud-storage", "Loading From Cloud Storage", { contentDir: "ch03/15-loading-from-cloud-storage", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792127374/ltv-snowflake/loading-from-cloud-storage.mp4", durationLabel: "1 min 30 s" }),
      L(16, "handling-load-errors-and-validation", "Handling Load Errors & Validation", { contentDir: "ch03/16-handling-load-errors-and-validation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792127433/ltv-snowflake/handling-load-errors-and-validation.mp4", durationLabel: "1 min 46 s" }),
      L(17, "lab-loading-a-real-dataset", "Lab: Loading a Real Dataset Into Snowflake", { contentDir: "ch03/17-lab-loading-a-real-dataset", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792127492/ltv-snowflake/lab-loading-a-real-dataset.mp4", durationLabel: "1 min 47 s" }),
    ],
  },
  {
    n: 4,
    title: "Snowpipe & Automated Ingestion",
    lessons: [
      L(18, "snowpipe-and-continuous-ingestion", "Snowpipe & Continuous Ingestion", { contentDir: "ch04/18-snowpipe-and-continuous-ingestion", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792127541/ltv-snowflake/snowpipe-and-continuous-ingestion.mp4", durationLabel: "1 min 37 s" }),
      L(19, "automated-file-loading-and-monitoring-loads", "Automated File Loading & Monitoring Loads", { contentDir: "ch04/19-automated-file-loading-and-monitoring-loads", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792127596/ltv-snowflake/automated-file-loading-and-monitoring-loads.mp4", durationLabel: "1 min 44 s" }),
      L(20, "handling-failed-snowpipe-loads", "Handling Failed Snowpipe Loads", { contentDir: "ch04/20-handling-failed-snowpipe-loads", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792127651/ltv-snowflake/handling-failed-snowpipe-loads.mp4", durationLabel: "1 min 41 s" }),
    ],
  },
  {
    n: 5,
    title: "Data Transformation / ELT",
    lessons: [
      L(21, "the-elt-pattern-in-snowflake", "Raw → Cleaned → Business-Ready: The ELT Pattern in Snowflake", { contentDir: "ch05/21-the-elt-pattern-in-snowflake", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792127703/ltv-snowflake/the-elt-pattern-in-snowflake.mp4", durationLabel: "1 min 42 s" }),
      L(22, "ctas-and-sql-transformations", "CTAS & SQL-Based Transformations", { contentDir: "ch05/22-ctas-and-sql-transformations", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792127752/ltv-snowflake/ctas-and-sql-transformations.mp4", durationLabel: "1 min 33 s" }),
      L(23, "incremental-loading-patterns", "Incremental Loading Patterns", { contentDir: "ch05/23-incremental-loading-patterns", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792127799/ltv-snowflake/incremental-loading-patterns.mp4", durationLabel: "1 min 26 s" }),
      L(24, "deduplication-strategies", "Deduplication Strategies", { contentDir: "ch05/24-deduplication-strategies", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792127848/ltv-snowflake/deduplication-strategies.mp4", durationLabel: "1 min 38 s" }),
      L(25, "data-quality-checks-in-snowflake-sql", "Data Quality Checks in Snowflake SQL", { contentDir: "ch05/25-data-quality-checks-in-snowflake-sql", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792127896/ltv-snowflake/data-quality-checks-in-snowflake-sql.mp4", durationLabel: "1 min 35 s" }),
    ],
  },
  {
    n: 6,
    title: "Data Warehousing & Dimensional Modeling in Snowflake",
    lessons: [
      L(26, "star-schemas-fact-and-dimension-tables-in-snowflake", "Star Schemas, Fact & Dimension Tables — Implementing Them in Snowflake", { contentDir: "ch06/26-star-schemas-fact-and-dimension-tables-in-snowflake", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792127947/ltv-snowflake/star-schemas-fact-and-dimension-tables-in-snowflake.mp4", durationLabel: "1 min 40 s" }),
      L(27, "surrogate-keys-in-snowflake", "Surrogate Keys in Snowflake", { contentDir: "ch06/27-surrogate-keys-in-snowflake", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792127991/ltv-snowflake/surrogate-keys-in-snowflake.mp4", durationLabel: "1 min 21 s" }),
      L(28, "scd-type-1-in-snowflake", "SCD Type 1 in Snowflake", { contentDir: "ch06/28-scd-type-1-in-snowflake", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792128042/ltv-snowflake/scd-type-1-in-snowflake.mp4", durationLabel: "1 min 37 s" }),
      L(29, "scd-type-2-in-snowflake", "SCD Type 2 in Snowflake", { contentDir: "ch06/29-scd-type-2-in-snowflake", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792128101/ltv-snowflake/scd-type-2-in-snowflake.mp4", durationLabel: "1 min 55 s" }),
      L(30, "staging-warehouse-reporting-layers", "Staging → Warehouse → Reporting Layers", { contentDir: "ch06/30-staging-warehouse-reporting-layers", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792128157/ltv-snowflake/staging-warehouse-reporting-layers.mp4", durationLabel: "1 min 50 s" }),
    ],
  },
  {
    n: 7,
    title: "Semi-Structured Data",
    lessons: [
      L(31, "json-and-the-variant-data-type", "JSON & the VARIANT Data Type", { contentDir: "ch07/31-json-and-the-variant-data-type", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792128212/ltv-snowflake/json-and-the-variant-data-type.mp4", durationLabel: "1 min 43 s" }),
      L(32, "querying-nested-json", "Querying Nested JSON", { contentDir: "ch07/32-querying-nested-json", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792128270/ltv-snowflake/querying-nested-json.mp4", durationLabel: "1 min 51 s" }),
      L(33, "flatten-semi-structured-to-relational", "FLATTEN — Converting Semi-Structured Data to Relational", { contentDir: "ch07/33-flatten-semi-structured-to-relational", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792128325/ltv-snowflake/flatten-semi-structured-to-relational.mp4", durationLabel: "1 min 51 s" }),
      L(34, "lab-json-feed-to-reporting-tables", "Lab: Turning a Raw JSON Feed Into Reporting Tables", { contentDir: "ch07/34-lab-json-feed-to-reporting-tables", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792128386/ltv-snowflake/lab-json-feed-to-reporting-tables.mp4", durationLabel: "2 min 2 s" }),
    ],
  },
  {
    n: 8,
    title: "Streams & Tasks",
    lessons: [
      L(35, "streams-change-tracking", "Streams: Change Tracking in Snowflake", { contentDir: "ch08/35-streams-change-tracking", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792128441/ltv-snowflake/streams-change-tracking.mp4", durationLabel: "1 min 44 s" }),
      L(36, "tasks-scheduled-processing", "Tasks: Scheduled Processing", { contentDir: "ch08/36-tasks-scheduled-processing", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792128491/ltv-snowflake/tasks-scheduled-processing.mp4", durationLabel: "1 min 34 s" }),
      L(37, "incremental-pipelines-with-streams-and-tasks", "Building Incremental Pipelines With Streams + Tasks", { contentDir: "ch08/37-incremental-pipelines-with-streams-and-tasks", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792128547/ltv-snowflake/incremental-pipelines-with-streams-and-tasks.mp4", durationLabel: "1 min 49 s" }),
      L(38, "task-dependencies-and-automating-transformations", "Task Dependencies & Automating Transformations", { contentDir: "ch08/38-task-dependencies-and-automating-transformations", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792128601/ltv-snowflake/task-dependencies-and-automating-transformations.mp4", durationLabel: "1 min 40 s" }),
    ],
  },
  {
    n: 9,
    title: "Security & RBAC",
    lessons: [
      L(39, "users-roles-and-role-hierarchy", "Users, Roles & the Snowflake Role Hierarchy", { contentDir: "ch09/39-users-roles-and-role-hierarchy", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792128668/ltv-snowflake/users-roles-and-role-hierarchy.mp4", durationLabel: "2 min 8 s" }),
      L(40, "grant-privileges-and-least-privilege", "GRANT, Privileges & Least Privilege in Snowflake", { contentDir: "ch09/40-grant-privileges-and-least-privilege", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792128729/ltv-snowflake/grant-privileges-and-least-privilege.mp4", durationLabel: "1 min 56 s" }),
      L(41, "secure-views-and-row-access-policies", "Secure Views & Row Access Policies", { contentDir: "ch09/41-secure-views-and-row-access-policies", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792128783/ltv-snowflake/secure-views-and-row-access-policies.mp4", durationLabel: "1 min 39 s" }),
      L(42, "dynamic-data-masking-in-snowflake", "Dynamic Data Masking in Snowflake", { contentDir: "ch09/42-dynamic-data-masking-in-snowflake", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792128837/ltv-snowflake/dynamic-data-masking-in-snowflake.mp4", durationLabel: "1 min 41 s" }),
    ],
  },
  {
    n: 10,
    title: "Performance Optimization",
    lessons: [
      L(43, "query-profile-and-query-history", "Query Profile & Query History", { contentDir: "ch10/43-query-profile-and-query-history", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792128884/ltv-snowflake/query-profile-and-query-history.mp4", durationLabel: "1 min 27 s" }),
      L(44, "micro-partitions-and-partition-pruning", "Micro-Partitions & Partition Pruning", { contentDir: "ch10/44-micro-partitions-and-partition-pruning", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792128938/ltv-snowflake/micro-partitions-and-partition-pruning.mp4", durationLabel: "1 min 37 s" }),
      L(45, "clustering-and-caching", "Clustering & Caching", { contentDir: "ch10/45-clustering-and-caching", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792128992/ltv-snowflake/clustering-and-caching.mp4", durationLabel: "1 min 40 s" }),
      L(46, "warehouse-sizing-and-expensive-queries", "Warehouse Sizing & Finding Expensive/Slow Queries", { contentDir: "ch10/46-warehouse-sizing-and-expensive-queries", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792129048/ltv-snowflake/warehouse-sizing-and-expensive-queries.mp4", durationLabel: "1 min 44 s" }),
    ],
  },
  {
    n: 11,
    title: "Cost Management",
    lessons: [
      L(47, "snowflake-credits-and-warehouse-costs", "Snowflake Credits & Warehouse Costs", { contentDir: "ch11/47-snowflake-credits-and-warehouse-costs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792129122/ltv-snowflake/snowflake-credits-and-warehouse-costs.mp4", durationLabel: "2 min 21 s" }),
      L(48, "resource-monitors-preventing-runaway-costs", "Resource Monitors — Preventing Runaway Compute Costs", { contentDir: "ch11/48-resource-monitors-preventing-runaway-compute-costs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792129186/ltv-snowflake/resource-monitors-preventing-runaway-compute-costs.mp4", durationLabel: "2 min 2 s" }),
    ],
  },
  {
    n: 12,
    title: "Power BI + Snowflake",
    lessons: [
      L(49, "connecting-power-bi-to-snowflake", "Connecting Power BI to Snowflake", { contentDir: "ch12/49-connecting-power-bi-to-snowflake", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792129251/ltv-snowflake/connecting-power-bi-to-snowflake.mp4", durationLabel: "2 min 6 s" }),
      L(50, "import-vs-directquery-considerations", "Import vs. DirectQuery Considerations", { contentDir: "ch12/50-import-vs-directquery-considerations", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792129316/ltv-snowflake/import-vs-directquery-considerations.mp4", durationLabel: "2 min 1 s" }),
      L(51, "reporting-views-and-performance-considerations", "Building Reporting Views & Performance Considerations", { contentDir: "ch12/51-reporting-views-and-performance-considerations", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792129392/ltv-snowflake/reporting-views-and-performance-considerations.mp4", durationLabel: "2 min 31 s" }),
    ],
  },
  {
    n: 13,
    title: "Snowflake in the Modern Data Stack",
    lessons: [
      L(52, "snowflake-and-the-modern-data-stack", "Snowflake + ADF, dbt, Python & Airflow — Where Each Tool Fits", { contentDir: "ch13/52-snowflake-and-the-modern-data-stack", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792129456/ltv-snowflake/snowflake-and-the-modern-data-stack.mp4", durationLabel: "2 min 5 s" }),
      L(53, "choosing-the-right-tool-for-the-job", "Choosing the Right Tool for the Job", { contentDir: "ch13/53-choosing-the-right-tool-for-the-job", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792129522/ltv-snowflake/choosing-the-right-tool-for-the-job.mp4", durationLabel: "2 min 10 s" }),
    ],
  },
  {
    n: 14,
    title: "Monitoring & Troubleshooting",
    lessons: [
      L(54, "query-history-and-load-history-for-troubleshooting", "Query History & Load History for Troubleshooting", { contentDir: "ch14/54-query-history-and-load-history-for-troubleshooting" }),
      L(55, "diagnosing-warehouse-and-permissions-problems", "Diagnosing Warehouse & Permissions Problems", { contentDir: "ch14/55-diagnosing-warehouse-and-permissions-problems", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792129599/ltv-snowflake/diagnosing-warehouse-and-permissions-problems.mp4", durationLabel: "2 min 15 s" }),
      L(56, "pipeline-troubleshooting-end-to-end", "Pipeline Troubleshooting, End to End", { contentDir: "ch14/56-pipeline-troubleshooting-end-to-end", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792129672/ltv-snowflake/pipeline-troubleshooting-end-to-end.mp4", durationLabel: "2 min 8 s" }),
    ],
  },
  {
    n: 15,
    title: "End-to-End Capstone Project",
    lessons: [
      L(57, "capstone-kickoff-source-to-snowflake-to-power-bi", "Capstone Kickoff: SQL Server/CSV/JSON → Snowflake → Power BI", { contentDir: "ch15/57-capstone-kickoff-source-to-snowflake-to-power-bi", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792129738/ltv-snowflake/capstone-kickoff-source-to-snowflake-to-power-bi.mp4", durationLabel: "2 min 12 s" }),
      L(58, "capstone-staging-loading-and-transformation", "Capstone: Staging, Loading & Transformation", { contentDir: "ch15/58-capstone-staging-loading-and-transformation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792129797/ltv-snowflake/capstone-staging-loading-and-transformation.mp4", durationLabel: "1 min 55 s" }),
      L(59, "capstone-dimensional-model-streams-tasks-rbac", "Capstone: Dimensional Model, Streams/Tasks & RBAC", { contentDir: "ch15/59-capstone-dimensional-model-streams-tasks-rbac", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792129865/ltv-snowflake/capstone-dimensional-model-streams-tasks-rbac.mp4", durationLabel: "2 min 9 s" }),
      L(60, "capstone-performance-monitoring-and-presenting", "Capstone: Performance, Monitoring & Presenting Your Project", { contentDir: "ch15/60-capstone-performance-monitoring-and-presenting", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792129942/ltv-snowflake/capstone-performance-monitoring-and-presenting.mp4", durationLabel: "2 min 32 s" }),
    ],
  },
  {
    n: 16,
    title: "Cortex AI & Agents on Snowflake",
    lessons: [
      L(61, "cortex-ai-llm-functions-overview", "Snowflake Cortex AI: LLM Functions Overview", { contentDir: "ch16/61-cortex-ai-llm-functions-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792130011/ltv-snowflake/cortex-ai-llm-functions-overview.mp4", durationLabel: "2 min 10 s" }),
      L(62, "cortex-analyst-natural-language-to-sql", "Cortex Analyst: Natural Language to SQL", { contentDir: "ch16/62-cortex-analyst-natural-language-to-sql", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792130088/ltv-snowflake/cortex-analyst-natural-language-to-sql.mp4", durationLabel: "2 min 38 s" }),
      L(63, "cortex-search-hybrid-semantic-search", "Cortex Search: Hybrid Semantic Search for RAG", { contentDir: "ch16/63-cortex-search-hybrid-semantic-search", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792130164/ltv-snowflake/cortex-search-hybrid-semantic-search.mp4", durationLabel: "2 min 31 s" }),
      L(64, "cortex-agents-multi-step-orchestration", "Cortex Agents: Multi-Step Agentic Orchestration", { contentDir: "ch16/64-cortex-agents-multi-step-orchestration", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792130227/ltv-snowflake/cortex-agents-multi-step-orchestration.mp4", durationLabel: "2 min 5 s" }),
      L(65, "agent-memory-and-context-threads", "Agent Memory & Context: Threads in Cortex Agents", { contentDir: "ch16/65-agent-memory-and-context-threads" }),
      L(66, "the-snowflake-managed-mcp-server", "The Snowflake-Managed MCP Server", { contentDir: "ch16/66-the-snowflake-managed-mcp-server" }),
      L(67, "connecting-agents-across-platforms-via-mcp", "Connecting Agents Across Platforms via MCP", { contentDir: "ch16/67-connecting-agents-across-platforms-via-mcp" }),
      L(68, "fine-tuning-models-in-snowflake", "Fine-Tuning Models in Snowflake with Cortex", { contentDir: "ch16/68-fine-tuning-models-in-snowflake" }),
    ],
  },
  {
    n: 17,
    title: "AI Governance, Evaluation & Security",
    lessons: [
      L(69, "ai-observability-and-evaluations-in-cortex", "AI Observability and Evaluations in Cortex", { contentDir: "ch17/69-ai-observability-and-evaluations-in-cortex" }),
      L(70, "horizon-catalog-governance-for-enterprise-ai", "Horizon Catalog: Governance for Enterprise AI", { contentDir: "ch17/70-horizon-catalog-governance-for-enterprise-ai" }),
      L(71, "ai-readiness-score-and-horizon-context", "AI Readiness Score and Horizon Context", { contentDir: "ch17/71-ai-readiness-score-and-horizon-context" }),
      L(72, "ai-guardrails-prompt-injection-and-jailbreak-prevention", "AI Guardrails: Prompt Injection & Jailbreak Prevention", { contentDir: "ch17/72-ai-guardrails-prompt-injection-and-jailbreak-prevention" }),
      L(73, "agent-identity-and-auditability", "Agent Identity and Auditability", { contentDir: "ch17/73-agent-identity-and-auditability" }),
      L(74, "human-in-the-loop-approval-patterns-for-cortex-agents", "Human-in-the-Loop: Approval Patterns for Cortex Agents", { contentDir: "ch17/74-human-in-the-loop-approval-patterns-for-cortex-agents" }),
      L(75, "governing-agent-access-rbac-masking-row-access", "Governing Agent Access: RBAC, Masking & Row Access Policies for AI", { contentDir: "ch17/75-governing-agent-access-rbac-masking-row-access" }),
      L(76, "lab-building-and-governing-a-cortex-agent", "Lab: Building and Governing a Cortex Search + Analyst Agent", { contentDir: "ch17/76-lab-building-and-governing-a-cortex-agent" }),
    ],
  },
];
