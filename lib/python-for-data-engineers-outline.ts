// The full Python for Data Engineers course outline. Only lessons with a
// contentDir + videoUrl are playable; everything else renders as "in
// production". Shared course — see lib/career-paths.ts for which paths
// assign it (Snowflake Data Engineer, Azure Database Engineer).

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/python-for-data-engineers/
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

export const PYTHON_FOR_DATA_ENGINEERS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Python Fundamentals",
    lessons: [
      L(1, "setting-up-your-python-environment", "What Is Python & Setting Up Your Environment", { contentDir: "ch01/01-setting-up-your-python-environment", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792142696/ltv-python-for-data-engineers/setting-up-your-python-environment.mp4", durationLabel: "2 min 43 s" }),
      L(2, "variables-data-types-and-operators", "Variables, Data Types & Operators", { contentDir: "ch01/02-variables-data-types-and-operators", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792142830/ltv-python-for-data-engineers/variables-data-types-and-operators.mp4", durationLabel: "2 min 53 s" }),
      L(3, "strings-and-string-formatting", "Strings & String Formatting", { contentDir: "ch01/03-strings-and-string-formatting", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792142950/ltv-python-for-data-engineers/strings-and-string-formatting.mp4", durationLabel: "2 min 35 s" }),
      L(4, "lists-tuples-and-sets", "Lists, Tuples & Sets", { contentDir: "ch01/04-lists-tuples-and-sets", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792143083/ltv-python-for-data-engineers/lists-tuples-and-sets.mp4", durationLabel: "2 min 44 s" }),
      L(5, "dictionaries", "Dictionaries", { contentDir: "ch01/05-dictionaries", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792143201/ltv-python-for-data-engineers/dictionaries.mp4", durationLabel: "2 min 36 s" }),
      L(6, "control-flow-conditions-and-loops", "Control Flow: Conditions & Loops", { contentDir: "ch01/06-control-flow-conditions-and-loops", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792143321/ltv-python-for-data-engineers/control-flow-conditions-and-loops.mp4", durationLabel: "2 min 34 s" }),
    ],
  },
  {
    n: 2,
    title: "Functions, Modules and Data Structures",
    lessons: [
      L(7, "writing-functions", "Writing Functions", { contentDir: "ch02/07-writing-functions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792143455/ltv-python-for-data-engineers/writing-functions.mp4", durationLabel: "2 min 48 s" }),
      L(8, "default-keyword-and-variable-arguments", "Default, Keyword & Variable Arguments", { contentDir: "ch02/08-default-keyword-and-variable-arguments", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792143585/ltv-python-for-data-engineers/default-keyword-and-variable-arguments.mp4", durationLabel: "2 min 43 s" }),
      L(9, "scope-and-returning-multiple-values", "Scope & Returning Multiple Values", { contentDir: "ch02/09-scope-and-returning-multiple-values", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792143716/ltv-python-for-data-engineers/scope-and-returning-multiple-values.mp4", durationLabel: "2 min 50 s" }),
      L(10, "modules-and-packages", "Modules & Packages", { contentDir: "ch02/10-modules-and-packages", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792143856/ltv-python-for-data-engineers/modules-and-packages.mp4", durationLabel: "3 min 6 s" }),
      L(11, "list-and-dict-comprehensions", "List & Dict Comprehensions", { contentDir: "ch02/11-list-and-dict-comprehensions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792143981/ltv-python-for-data-engineers/list-and-dict-comprehensions.mp4", durationLabel: "2 min 27 s" }),
      L(12, "working-with-dates-and-times", "Working With Dates & Times", { contentDir: "ch02/12-working-with-dates-and-times", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792144137/ltv-python-for-data-engineers/working-with-dates-and-times.mp4", durationLabel: "3 min 16 s" }),
    ],
  },
  {
    n: 3,
    title: "Files, JSON, CSV and APIs",
    lessons: [
      L(13, "reading-and-writing-text-files", "Reading & Writing Text Files", { contentDir: "ch03/13-reading-and-writing-text-files", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792144246/ltv-python-for-data-engineers/reading-and-writing-text-files.mp4", durationLabel: "2 min 15 s" }),
      L(14, "working-with-csv-files", "Working With CSV Files", { contentDir: "ch03/14-working-with-csv-files", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792144363/ltv-python-for-data-engineers/working-with-csv-files.mp4", durationLabel: "2 min 19 s" }),
      L(15, "working-with-json", "Working With JSON", { contentDir: "ch03/15-working-with-json", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792144488/ltv-python-for-data-engineers/working-with-json.mp4", durationLabel: "2 min 36 s" }),
      L(16, "exception-handling-for-real-pipelines", "Exception Handling for Real Pipelines", { contentDir: "ch03/16-exception-handling-for-real-pipelines", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792144603/ltv-python-for-data-engineers/exception-handling-for-real-pipelines.mp4", durationLabel: "2 min 25 s" }),
      L(17, "calling-a-rest-api-with-requests", "Calling a REST API With requests", { contentDir: "ch03/17-calling-a-rest-api-with-requests", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792144720/ltv-python-for-data-engineers/calling-a-rest-api-with-requests.mp4", durationLabel: "2 min 25 s" }),
      L(18, "pagination-and-rate-limits-in-real-apis", "Pagination & Rate Limits in Real APIs", { contentDir: "ch03/18-pagination-and-rate-limits-in-real-apis", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792144852/ltv-python-for-data-engineers/pagination-and-rate-limits-in-real-apis.mp4", durationLabel: "2 min 44 s" }),
    ],
  },
  {
    n: 4,
    title: "Pandas and Data Transformation",
    lessons: [
      L(19, "pandas-series-and-dataframes", "Pandas Series & DataFrames", { contentDir: "ch04/19-pandas-series-and-dataframes" }),
      L(20, "reading-data-into-pandas", "Reading Data Into Pandas (CSV, JSON, Excel)", { contentDir: "ch04/20-reading-data-into-pandas" }),
      L(21, "selecting-filtering-and-indexing", "Selecting, Filtering & Indexing", { contentDir: "ch04/21-selecting-filtering-and-indexing" }),
      L(22, "cleaning-data-missing-values-and-duplicates", "Cleaning Data: Missing Values & Duplicates", { contentDir: "ch04/22-cleaning-data-missing-values-and-duplicates" }),
      L(23, "transforming-columns-and-applying-functions", "Transforming Columns & Applying Functions", { contentDir: "ch04/23-transforming-columns-and-applying-functions" }),
      L(24, "groupby-and-aggregation", "groupBy() & Aggregation", { contentDir: "ch04/24-groupby-and-aggregation" }),
      L(25, "merging-and-joining-dataframes", "Merging & Joining DataFrames", { contentDir: "ch04/25-merging-and-joining-dataframes" }),
    ],
  },
  {
    n: 5,
    title: "Database Connectivity and SQL Integration",
    lessons: [
      L(26, "connecting-python-to-sql-server", "Connecting Python to SQL Server", { contentDir: "ch05/26-connecting-python-to-sql-server" }),
      L(27, "running-queries-and-loading-results-into-pandas", "Running Queries & Loading Results Into Pandas", { contentDir: "ch05/27-running-queries-and-loading-results-into-pandas" }),
      L(28, "writing-data-back-to-a-database", "Writing Data Back to a Database", { contentDir: "ch05/28-writing-data-back-to-a-database" }),
      L(29, "parameterized-queries-and-sql-injection", "Parameterized Queries & SQL Injection", { contentDir: "ch05/29-parameterized-queries-and-sql-injection" }),
      L(30, "working-with-sqlalchemy", "Working With SQLAlchemy", { contentDir: "ch05/30-working-with-sqlalchemy" }),
      L(31, "transactions-and-error-handling-in-database-code", "Transactions & Error Handling in Database Code", { contentDir: "ch05/31-transactions-and-error-handling-in-database-code" }),
    ],
  },
  {
    n: 6,
    title: "Python ETL Pipeline Development",
    lessons: [
      L(32, "designing-an-etl-pipeline", "Designing an ETL Pipeline", { contentDir: "ch06/32-designing-an-etl-pipeline" }),
      L(33, "extracting-from-multiple-sources", "Extracting From Multiple Sources", { contentDir: "ch06/33-extracting-from-multiple-sources" }),
      L(34, "transformation-logic-and-data-validation", "Transformation Logic & Data Validation", { contentDir: "ch06/34-transformation-logic-and-data-validation" }),
      L(35, "loading-to-a-target", "Loading to a Target (File, Database, Warehouse)", { contentDir: "ch06/35-loading-to-a-target" }),
      L(36, "incremental-loads-and-watermarks", "Incremental Loads & Watermarks", { contentDir: "ch06/36-incremental-loads-and-watermarks" }),
      L(37, "idempotency-and-error-recovery", "Idempotency & Error Recovery", { contentDir: "ch06/37-idempotency-and-error-recovery" }),
      L(38, "building-a-config-driven-etl-script", "Building a Config-Driven ETL Script", { contentDir: "ch06/38-building-a-config-driven-etl-script" }),
    ],
  },
  {
    n: 7,
    title: "Logging, Testing, Error Handling and Automation",
    lessons: [
      L(39, "logging-in-python", "Logging in Python (the logging Module)", { contentDir: "ch07/39-logging-in-python" }),
      L(40, "writing-unit-tests-with-pytest", "Writing Unit Tests With pytest", { contentDir: "ch07/40-writing-unit-tests-with-pytest" }),
      L(41, "robust-error-handling-patterns", "Robust Error Handling Patterns", { contentDir: "ch07/41-robust-error-handling-patterns" }),
      L(42, "scheduling-and-automating-scripts", "Scheduling & Automating Scripts", { contentDir: "ch07/42-scheduling-and-automating-scripts" }),
      L(43, "environment-variables-and-secrets-management", "Environment Variables & Secrets Management", { contentDir: "ch07/43-environment-variables-and-secrets-management" }),
    ],
  },
  {
    n: 8,
    title: "PySpark Foundations and Mini Capstone",
    lessons: [
      L(44, "introduction-to-pyspark-and-sparksession", "Introduction to PySpark & SparkSession", { contentDir: "ch08/44-introduction-to-pyspark-and-sparksession" }),
      L(45, "pyspark-dataframes-reading-and-transforming-data", "PySpark DataFrames: Reading & Transforming Data", { contentDir: "ch08/45-pyspark-dataframes-reading-and-transforming-data" }),
      L(46, "pyspark-aggregations-and-joins", "PySpark Aggregations & Joins", { contentDir: "ch08/46-pyspark-aggregations-and-joins" }),
      L(47, "mini-capstone-part-1-building-the-pipeline", "Mini Capstone Part 1: Building the Pipeline", { contentDir: "ch08/47-mini-capstone-part-1-building-the-pipeline" }),
      L(48, "mini-capstone-part-2-validating-and-presenting-results", "Mini Capstone Part 2: Validating & Presenting Results", { contentDir: "ch08/48-mini-capstone-part-2-validating-and-presenting-results" }),
    ],
  },
];
