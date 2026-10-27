// The full Snowflake course outline. Only lessons with a contentDir +
// videoUrl are playable; everything else renders as "in production".
// Deliberately a short specialization, not a mega-course: assumes prior SQL
// knowledge from T-SQL Development and the broader LTV data track (joins,
// CTEs, indexes, PK/FK, fact/dimension tables aren't retaught) — every
// lesson teaches how that already-known work gets done in Snowflake
// specifically.
//
// Chapter 18 (lessons 77-79) is a deliberate exception added 2026-10-17:
// written case studies on Snowpark for Python (DataFrames/lazy evaluation,
// UDFs, stored procedures) and the Native App Framework, closing a real gap
// for the Snowflake Data Engineer path — a large share of current Snowflake
// postings ask for Snowpark by name, and the course previously had zero
// coverage of it. Researched and verified against current Snowflake docs —
// no video, contentDir only, same guide-only pattern used elsewhere in this
// catalog (e.g. AWS Data Engineering's Chapter 12).

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
      L(1, "welcome-to-snowflake-course-overview", "Welcome to Snowflake: Course Overview & What You'll Build", { contentDir: "ch01/01-welcome-to-snowflake-course-overview", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/welcome-to-snowflake-course-overview.mp4", durationLabel: "1 min 27 s" }),
      L(2, "snowflake-architecture-storage-compute-cloud-services", "Snowflake Architecture: Storage, Compute & Cloud Services", { contentDir: "ch01/02-snowflake-architecture-storage-compute-cloud-services", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/snowflake-architecture-storage-compute-cloud-services.mp4", durationLabel: "1 min 25 s" }),
      L(3, "databases-schemas-and-tables", "Databases, Schemas & Tables in Snowflake", { contentDir: "ch01/03-databases-schemas-and-tables", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/databases-schemas-and-tables.mp4", durationLabel: "1 min 21 s" }),
      L(4, "virtual-warehouses-scaling-auto-suspend-resume", "Virtual Warehouses, Scaling & Auto-Suspend/Auto-Resume", { contentDir: "ch01/04-virtual-warehouses-scaling-auto-suspend-resume", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/virtual-warehouses-scaling-auto-suspend-resume.mp4", durationLabel: "1 min 20 s" }),
      L(5, "lab-your-first-snowflake-account-and-warehouse", "Lab: Your First Snowflake Account & Warehouse", { contentDir: "ch01/05-lab-your-first-snowflake-account-and-warehouse", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/lab-your-first-snowflake-account-and-warehouse.mp4", durationLabel: "1 min 22 s" }),
    ],
  },
  {
    n: 2,
    title: "Snowflake SQL — What's Different From T-SQL",
    lessons: [
      L(6, "snowflake-sql-vs-t-sql", "Snowflake SQL vs. T-SQL: Syntax Differences That Matter", { contentDir: "ch02/06-snowflake-sql-vs-t-sql", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/snowflake-sql-vs-t-sql.mp4", durationLabel: "1 min 43 s" }),
      L(7, "ctes-and-window-functions", "CTEs and Window Functions in Snowflake", { contentDir: "ch02/07-ctes-and-window-functions", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/ctes-and-window-functions.mp4", durationLabel: "1 min 14 s" }),
      L(8, "views-temporary-and-transient-tables", "Views, Temporary & Transient Tables", { contentDir: "ch02/08-views-temporary-and-transient-tables", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/views-temporary-and-transient-tables.mp4", durationLabel: "1 min 21 s" }),
      L(9, "merge-in-snowflake", "MERGE in Snowflake", { contentDir: "ch02/09-merge-in-snowflake", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/merge-in-snowflake.mp4", durationLabel: "1 min 24 s" }),
      L(10, "stored-procedures-and-udfs-basics", "Stored Procedures & User-Defined Functions, Basics", { contentDir: "ch02/10-stored-procedures-and-udfs-basics", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/stored-procedures-and-udfs-basics.mp4", durationLabel: "1 min 25 s" }),
      L(11, "exercise-rewriting-t-sql-in-snowflake", "Exercise: Rewriting a T-SQL Query in Snowflake SQL", { contentDir: "ch02/11-exercise-rewriting-t-sql-in-snowflake", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/exercise-rewriting-t-sql-in-snowflake.mp4", durationLabel: "1 min 25 s" }),
    ],
  },
  {
    n: 3,
    title: "Loading Data Into Snowflake",
    lessons: [
      L(12, "internal-vs-external-stages", "Internal vs. External Stages", { contentDir: "ch03/12-internal-vs-external-stages", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/internal-vs-external-stages.mp4", durationLabel: "1 min 28 s" }),
      L(13, "file-formats-csv-json-parquet", "File Formats: CSV, JSON & Parquet", { contentDir: "ch03/13-file-formats-csv-json-parquet", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/file-formats-csv-json-parquet.mp4", durationLabel: "1 min 18 s" }),
      L(14, "copy-into-bulk-loading-fundamentals", "COPY INTO — Bulk Loading Fundamentals", { contentDir: "ch03/14-copy-into-bulk-loading-fundamentals", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/copy-into-bulk-loading-fundamentals.mp4", durationLabel: "1 min 20 s" }),
      L(15, "loading-from-cloud-storage", "Loading From Cloud Storage", { contentDir: "ch03/15-loading-from-cloud-storage", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/loading-from-cloud-storage.mp4", durationLabel: "1 min 15 s" }),
      L(16, "handling-load-errors-and-validation", "Handling Load Errors & Validation", { contentDir: "ch03/16-handling-load-errors-and-validation", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/handling-load-errors-and-validation.mp4", durationLabel: "1 min 29 s" }),
      L(17, "lab-loading-a-real-dataset", "Lab: Loading a Real Dataset Into Snowflake", { contentDir: "ch03/17-lab-loading-a-real-dataset", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/lab-loading-a-real-dataset.mp4", durationLabel: "1 min 25 s" }),
    ],
  },
  {
    n: 4,
    title: "Snowpipe & Automated Ingestion",
    lessons: [
      L(18, "snowpipe-and-continuous-ingestion", "Snowpipe & Continuous Ingestion", { contentDir: "ch04/18-snowpipe-and-continuous-ingestion", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/snowpipe-and-continuous-ingestion.mp4", durationLabel: "1 min 19 s" }),
      L(19, "automated-file-loading-and-monitoring-loads", "Automated File Loading & Monitoring Loads", { contentDir: "ch04/19-automated-file-loading-and-monitoring-loads", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/automated-file-loading-and-monitoring-loads.mp4", durationLabel: "1 min 23 s" }),
      L(20, "handling-failed-snowpipe-loads", "Handling Failed Snowpipe Loads", { contentDir: "ch04/20-handling-failed-snowpipe-loads", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/handling-failed-snowpipe-loads.mp4", durationLabel: "1 min 26 s" }),
    ],
  },
  {
    n: 5,
    title: "Data Transformation / ELT",
    lessons: [
      L(21, "the-elt-pattern-in-snowflake", "Raw → Cleaned → Business-Ready: The ELT Pattern in Snowflake", { contentDir: "ch05/21-the-elt-pattern-in-snowflake", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/the-elt-pattern-in-snowflake.mp4", durationLabel: "1 min 19 s" }),
      L(22, "ctas-and-sql-transformations", "CTAS & SQL-Based Transformations", { contentDir: "ch05/22-ctas-and-sql-transformations", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/ctas-and-sql-transformations.mp4", durationLabel: "1 min 11 s" }),
      L(23, "incremental-loading-patterns", "Incremental Loading Patterns", { contentDir: "ch05/23-incremental-loading-patterns", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/incremental-loading-patterns.mp4", durationLabel: "1 min 10 s" }),
      L(24, "deduplication-strategies", "Deduplication Strategies", { contentDir: "ch05/24-deduplication-strategies", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/deduplication-strategies.mp4", durationLabel: "1 min 20 s" }),
      L(25, "data-quality-checks-in-snowflake-sql", "Data Quality Checks in Snowflake SQL", { contentDir: "ch05/25-data-quality-checks-in-snowflake-sql", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/data-quality-checks-in-snowflake-sql.mp4", durationLabel: "1 min 15 s" }),
    ],
  },
  {
    n: 6,
    title: "Data Warehousing & Dimensional Modeling in Snowflake",
    lessons: [
      L(26, "star-schemas-fact-and-dimension-tables-in-snowflake", "Star Schemas, Fact & Dimension Tables — Implementing Them in Snowflake", { contentDir: "ch06/26-star-schemas-fact-and-dimension-tables-in-snowflake", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/star-schemas-fact-and-dimension-tables-in-snowflake.mp4", durationLabel: "1 min 18 s" }),
      L(27, "surrogate-keys-in-snowflake", "Surrogate Keys in Snowflake", { contentDir: "ch06/27-surrogate-keys-in-snowflake", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/surrogate-keys-in-snowflake.mp4", durationLabel: "1 min 10 s" }),
      L(28, "scd-type-1-in-snowflake", "SCD Type 1 in Snowflake", { contentDir: "ch06/28-scd-type-1-in-snowflake", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/scd-type-1-in-snowflake.mp4", durationLabel: "1 min 14 s" }),
      L(29, "scd-type-2-in-snowflake", "SCD Type 2 in Snowflake", { contentDir: "ch06/29-scd-type-2-in-snowflake", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/scd-type-2-in-snowflake.mp4", durationLabel: "1 min 33 s" }),
      L(30, "staging-warehouse-reporting-layers", "Staging → Warehouse → Reporting Layers", { contentDir: "ch06/30-staging-warehouse-reporting-layers", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/staging-warehouse-reporting-layers.mp4", durationLabel: "1 min 27 s" }),
    ],
  },
  {
    n: 7,
    title: "Semi-Structured Data",
    lessons: [
      L(31, "json-and-the-variant-data-type", "JSON & the VARIANT Data Type", { contentDir: "ch07/31-json-and-the-variant-data-type", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/json-and-the-variant-data-type.mp4", durationLabel: "1 min 26 s" }),
      L(32, "querying-nested-json", "Querying Nested JSON", { contentDir: "ch07/32-querying-nested-json", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/querying-nested-json.mp4", durationLabel: "1 min 27 s" }),
      L(33, "flatten-semi-structured-to-relational", "FLATTEN — Converting Semi-Structured Data to Relational", { contentDir: "ch07/33-flatten-semi-structured-to-relational", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/flatten-semi-structured-to-relational.mp4", durationLabel: "1 min 27 s" }),
      L(34, "lab-json-feed-to-reporting-tables", "Lab: Turning a Raw JSON Feed Into Reporting Tables", { contentDir: "ch07/34-lab-json-feed-to-reporting-tables", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/lab-json-feed-to-reporting-tables.mp4", durationLabel: "1 min 32 s" }),
    ],
  },
  {
    n: 8,
    title: "Streams & Tasks",
    lessons: [
      L(35, "streams-change-tracking", "Streams: Change Tracking in Snowflake", { contentDir: "ch08/35-streams-change-tracking", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/streams-change-tracking.mp4", durationLabel: "1 min 19 s" }),
      L(36, "tasks-scheduled-processing", "Tasks: Scheduled Processing", { contentDir: "ch08/36-tasks-scheduled-processing", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/tasks-scheduled-processing.mp4", durationLabel: "1 min 18 s" }),
      L(37, "incremental-pipelines-with-streams-and-tasks", "Building Incremental Pipelines With Streams + Tasks", { contentDir: "ch08/37-incremental-pipelines-with-streams-and-tasks", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/incremental-pipelines-with-streams-and-tasks.mp4", durationLabel: "1 min 29 s" }),
      L(38, "task-dependencies-and-automating-transformations", "Task Dependencies & Automating Transformations", { contentDir: "ch08/38-task-dependencies-and-automating-transformations", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/task-dependencies-and-automating-transformations.mp4", durationLabel: "1 min 19 s" }),
    ],
  },
  {
    n: 9,
    title: "Security & RBAC",
    lessons: [
      L(39, "users-roles-and-role-hierarchy", "Users, Roles & the Snowflake Role Hierarchy", { contentDir: "ch09/39-users-roles-and-role-hierarchy", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/users-roles-and-role-hierarchy.mp4", durationLabel: "1 min 43 s" }),
      L(40, "grant-privileges-and-least-privilege", "GRANT, Privileges & Least Privilege in Snowflake", { contentDir: "ch09/40-grant-privileges-and-least-privilege", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/grant-privileges-and-least-privilege.mp4", durationLabel: "1 min 22 s" }),
      L(41, "secure-views-and-row-access-policies", "Secure Views & Row Access Policies", { contentDir: "ch09/41-secure-views-and-row-access-policies", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/secure-views-and-row-access-policies.mp4", durationLabel: "1 min 22 s" }),
      L(42, "dynamic-data-masking-in-snowflake", "Dynamic Data Masking in Snowflake", { contentDir: "ch09/42-dynamic-data-masking-in-snowflake", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/dynamic-data-masking-in-snowflake.mp4", durationLabel: "1 min 16 s" }),
    ],
  },
  {
    n: 10,
    title: "Performance Optimization",
    lessons: [
      L(43, "query-profile-and-query-history", "Query Profile & Query History", { contentDir: "ch10/43-query-profile-and-query-history", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/query-profile-and-query-history.mp4", durationLabel: "1 min 14 s" }),
      L(44, "micro-partitions-and-partition-pruning", "Micro-Partitions & Partition Pruning", { contentDir: "ch10/44-micro-partitions-and-partition-pruning", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/micro-partitions-and-partition-pruning.mp4", durationLabel: "1 min 20 s" }),
      L(45, "clustering-and-caching", "Clustering & Caching", { contentDir: "ch10/45-clustering-and-caching", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/clustering-and-caching.mp4", durationLabel: "1 min 22 s" }),
      L(46, "warehouse-sizing-and-expensive-queries", "Warehouse Sizing & Finding Expensive/Slow Queries", { contentDir: "ch10/46-warehouse-sizing-and-expensive-queries", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/warehouse-sizing-and-expensive-queries.mp4", durationLabel: "1 min 26 s" }),
    ],
  },
  {
    n: 11,
    title: "Cost Management",
    lessons: [
      L(47, "snowflake-credits-and-warehouse-costs", "Snowflake Credits & Warehouse Costs", { contentDir: "ch11/47-snowflake-credits-and-warehouse-costs", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/snowflake-credits-and-warehouse-costs.mp4", durationLabel: "1 min 57 s" }),
      L(48, "resource-monitors-preventing-runaway-costs", "Resource Monitors — Preventing Runaway Compute Costs", { contentDir: "ch11/48-resource-monitors-preventing-runaway-compute-costs", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/resource-monitors-preventing-runaway-costs.mp4", durationLabel: "1 min 42 s" }),
    ],
  },
  {
    n: 12,
    title: "Power BI + Snowflake",
    lessons: [
      L(49, "connecting-power-bi-to-snowflake", "Connecting Power BI to Snowflake", { contentDir: "ch12/49-connecting-power-bi-to-snowflake", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/connecting-power-bi-to-snowflake.mp4", durationLabel: "1 min 38 s" }),
      L(50, "import-vs-directquery-considerations", "Import vs. DirectQuery Considerations", { contentDir: "ch12/50-import-vs-directquery-considerations", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/import-vs-directquery-considerations.mp4", durationLabel: "1 min 36 s" }),
      L(51, "reporting-views-and-performance-considerations", "Building Reporting Views & Performance Considerations", { contentDir: "ch12/51-reporting-views-and-performance-considerations", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/reporting-views-and-performance-considerations.mp4", durationLabel: "2 min 1 s" }),
    ],
  },
  {
    n: 13,
    title: "Snowflake in the Modern Data Stack",
    lessons: [
      L(52, "snowflake-and-the-modern-data-stack", "Snowflake + ADF, dbt, Python & Airflow — Where Each Tool Fits", { contentDir: "ch13/52-snowflake-and-the-modern-data-stack", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/snowflake-and-the-modern-data-stack.mp4", durationLabel: "1 min 37 s" }),
      L(53, "choosing-the-right-tool-for-the-job", "Choosing the Right Tool for the Job", { contentDir: "ch13/53-choosing-the-right-tool-for-the-job", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/choosing-the-right-tool-for-the-job.mp4", durationLabel: "1 min 47 s" }),
    ],
  },
  {
    n: 14,
    title: "Monitoring & Troubleshooting",
    lessons: [
      L(54, "query-history-and-load-history-for-troubleshooting", "Query History & Load History for Troubleshooting", { contentDir: "ch14/54-query-history-and-load-history-for-troubleshooting", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/query-history-and-load-history-for-troubleshooting.mp4", durationLabel: "1 min 58 s" }),
      L(55, "diagnosing-warehouse-and-permissions-problems", "Diagnosing Warehouse & Permissions Problems", { contentDir: "ch14/55-diagnosing-warehouse-and-permissions-problems", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/diagnosing-warehouse-and-permissions-problems.mp4", durationLabel: "1 min 49 s" }),
      L(56, "pipeline-troubleshooting-end-to-end", "Pipeline Troubleshooting, End to End", { contentDir: "ch14/56-pipeline-troubleshooting-end-to-end", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/pipeline-troubleshooting-end-to-end.mp4", durationLabel: "1 min 54 s" }),
    ],
  },
  {
    n: 15,
    title: "End-to-End Capstone Project",
    lessons: [
      L(57, "capstone-kickoff-source-to-snowflake-to-power-bi", "Capstone Kickoff: SQL Server/CSV/JSON → Snowflake → Power BI", { contentDir: "ch15/57-capstone-kickoff-source-to-snowflake-to-power-bi", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/capstone-kickoff-source-to-snowflake-to-power-bi.mp4", durationLabel: "1 min 43 s" }),
      L(58, "capstone-staging-loading-and-transformation", "Capstone: Staging, Loading & Transformation", { contentDir: "ch15/58-capstone-staging-loading-and-transformation", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/capstone-staging-loading-and-transformation.mp4", durationLabel: "1 min 32 s" }),
      L(59, "capstone-dimensional-model-streams-tasks-rbac", "Capstone: Dimensional Model, Streams/Tasks & RBAC", { contentDir: "ch15/59-capstone-dimensional-model-streams-tasks-rbac", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/capstone-dimensional-model-streams-tasks-rbac.mp4", durationLabel: "1 min 37 s" }),
      L(60, "capstone-performance-monitoring-and-presenting", "Capstone: Performance, Monitoring & Presenting Your Project", { contentDir: "ch15/60-capstone-performance-monitoring-and-presenting", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/capstone-performance-monitoring-and-presenting.mp4", durationLabel: "1 min 56 s" }),
    ],
  },
  {
    n: 16,
    title: "Cortex AI & Agents on Snowflake",
    lessons: [
      L(61, "cortex-ai-llm-functions-overview", "Snowflake Cortex AI: LLM Functions Overview", { contentDir: "ch16/61-cortex-ai-llm-functions-overview", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/cortex-ai-llm-functions-overview.mp4", durationLabel: "2 min 0 s" }),
      L(62, "cortex-analyst-natural-language-to-sql", "Cortex Analyst: Natural Language to SQL", { contentDir: "ch16/62-cortex-analyst-natural-language-to-sql", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/cortex-analyst-natural-language-to-sql.mp4", durationLabel: "2 min 1 s" }),
      L(63, "cortex-search-hybrid-semantic-search", "Cortex Search: Hybrid Semantic Search for RAG", { contentDir: "ch16/63-cortex-search-hybrid-semantic-search", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/cortex-search-hybrid-semantic-search.mp4", durationLabel: "2 min 3 s" }),
      L(64, "cortex-agents-multi-step-orchestration", "Cortex Agents: Multi-Step Agentic Orchestration", { contentDir: "ch16/64-cortex-agents-multi-step-orchestration", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/cortex-agents-multi-step-orchestration.mp4", durationLabel: "1 min 51 s" }),
      L(65, "agent-memory-and-context-threads", "Agent Memory & Context: Threads in Cortex Agents", { contentDir: "ch16/65-agent-memory-and-context-threads", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/agent-memory-and-context-threads.mp4", durationLabel: "2 min 1 s" }),
      L(66, "the-snowflake-managed-mcp-server", "The Snowflake-Managed MCP Server", { contentDir: "ch16/66-the-snowflake-managed-mcp-server", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/the-snowflake-managed-mcp-server.mp4", durationLabel: "2 min 13 s" }),
      L(67, "connecting-agents-across-platforms-via-mcp", "Connecting Agents Across Platforms via MCP", { contentDir: "ch16/67-connecting-agents-across-platforms-via-mcp", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/connecting-agents-across-platforms-via-mcp.mp4", durationLabel: "2 min 11 s" }),
      L(68, "fine-tuning-models-in-snowflake", "Fine-Tuning Models in Snowflake with Cortex", { contentDir: "ch16/68-fine-tuning-models-in-snowflake", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/fine-tuning-models-in-snowflake.mp4", durationLabel: "2 min 1 s" }),
    ],
  },
  {
    n: 17,
    title: "AI Governance, Evaluation & Security",
    lessons: [
      L(69, "ai-observability-and-evaluations-in-cortex", "AI Observability and Evaluations in Cortex", { contentDir: "ch17/69-ai-observability-and-evaluations-in-cortex", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/ai-observability-and-evaluations-in-cortex.mp4", durationLabel: "2 min 31 s" }),
      L(70, "horizon-catalog-governance-for-enterprise-ai", "Horizon Catalog: Governance for Enterprise AI", { contentDir: "ch17/70-horizon-catalog-governance-for-enterprise-ai", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/horizon-catalog-governance-for-enterprise-ai.mp4", durationLabel: "2 min 14 s" }),
      L(71, "ai-readiness-score-and-horizon-context", "AI Readiness Score and Horizon Context", { contentDir: "ch17/71-ai-readiness-score-and-horizon-context", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/ai-readiness-score-and-horizon-context.mp4", durationLabel: "1 min 48 s" }),
      L(72, "ai-guardrails-prompt-injection-and-jailbreak-prevention", "AI Guardrails: Prompt Injection & Jailbreak Prevention", { contentDir: "ch17/72-ai-guardrails-prompt-injection-and-jailbreak-prevention", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/ai-guardrails-prompt-injection-and-jailbreak-prevention.mp4", durationLabel: "2 min 11 s" }),
      L(73, "agent-identity-and-auditability", "Agent Identity and Auditability", { contentDir: "ch17/73-agent-identity-and-auditability", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/agent-identity-and-auditability.mp4", durationLabel: "2 min 22 s" }),
      L(74, "human-in-the-loop-approval-patterns-for-cortex-agents", "Human-in-the-Loop: Approval Patterns for Cortex Agents", { contentDir: "ch17/74-human-in-the-loop-approval-patterns-for-cortex-agents", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/human-in-the-loop-approval-patterns-for-cortex-agents.mp4", durationLabel: "2 min 32 s" }),
      L(75, "governing-agent-access-rbac-masking-row-access", "Governing Agent Access: RBAC, Masking & Row Access Policies for AI", { contentDir: "ch17/75-governing-agent-access-rbac-masking-row-access", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/governing-agent-access-rbac-masking-row-access.mp4", durationLabel: "2 min 2 s" }),
      L(76, "lab-building-and-governing-a-cortex-agent", "Lab: Building and Governing a Cortex Search + Analyst Agent", { contentDir: "ch17/76-lab-building-and-governing-a-cortex-agent", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/lab-building-and-governing-a-cortex-agent.mp4", durationLabel: "2 min 41 s" }),
    ],
  },
  {
    n: 18,
    title: "Snowpark & the Native Apps Framework",
    lessons: [
      L(77, "snowpark-dataframes-and-lazy-evaluation", "Snowpark for Python: DataFrames That Run Inside Snowflake", { contentDir: "ch18/77-snowpark-dataframes-and-lazy-evaluation", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/snowpark-dataframes-and-lazy-evaluation.mp4", durationLabel: "2 min 18 s" }),
      L(78, "snowpark-udfs-and-stored-procedures", "Snowpark UDFs, Stored Procedures, and Where the Code Actually Runs", { contentDir: "ch18/78-snowpark-udfs-and-stored-procedures", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/snowpark-udfs-and-stored-procedures.mp4", durationLabel: "1 min 59 s" }),
      L(79, "native-apps-framework", "The Snowflake Native App Framework: Packaging Logic, Not Just Data", { contentDir: "ch18/79-native-apps-framework", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake/native-apps-framework.mp4", durationLabel: "2 min 4 s" }),
    ],
  },
];
