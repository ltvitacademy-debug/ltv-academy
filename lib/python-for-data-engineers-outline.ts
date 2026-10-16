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
      L(1, "setting-up-your-python-environment", "What Is Python & Setting Up Your Environment"),
      L(2, "variables-data-types-and-operators", "Variables, Data Types & Operators"),
      L(3, "strings-and-string-formatting", "Strings & String Formatting"),
      L(4, "lists-tuples-and-sets", "Lists, Tuples & Sets"),
      L(5, "dictionaries", "Dictionaries"),
      L(6, "control-flow-conditions-and-loops", "Control Flow: Conditions & Loops"),
    ],
  },
  {
    n: 2,
    title: "Functions, Modules and Data Structures",
    lessons: [
      L(7, "writing-functions", "Writing Functions"),
      L(8, "default-keyword-and-variable-arguments", "Default, Keyword & Variable Arguments"),
      L(9, "scope-and-returning-multiple-values", "Scope & Returning Multiple Values"),
      L(10, "modules-and-packages", "Modules & Packages"),
      L(11, "list-and-dict-comprehensions", "List & Dict Comprehensions"),
      L(12, "working-with-dates-and-times", "Working With Dates & Times"),
    ],
  },
  {
    n: 3,
    title: "Files, JSON, CSV and APIs",
    lessons: [
      L(13, "reading-and-writing-text-files", "Reading & Writing Text Files"),
      L(14, "working-with-csv-files", "Working With CSV Files"),
      L(15, "working-with-json", "Working With JSON"),
      L(16, "exception-handling-for-real-pipelines", "Exception Handling for Real Pipelines"),
      L(17, "calling-a-rest-api-with-requests", "Calling a REST API With requests"),
      L(18, "pagination-and-rate-limits-in-real-apis", "Pagination & Rate Limits in Real APIs"),
    ],
  },
  {
    n: 4,
    title: "Pandas and Data Transformation",
    lessons: [
      L(19, "pandas-series-and-dataframes", "Pandas Series & DataFrames"),
      L(20, "reading-data-into-pandas", "Reading Data Into Pandas (CSV, JSON, Excel)"),
      L(21, "selecting-filtering-and-indexing", "Selecting, Filtering & Indexing"),
      L(22, "cleaning-data-missing-values-and-duplicates", "Cleaning Data: Missing Values & Duplicates"),
      L(23, "transforming-columns-and-applying-functions", "Transforming Columns & Applying Functions"),
      L(24, "groupby-and-aggregation", "groupBy() & Aggregation"),
      L(25, "merging-and-joining-dataframes", "Merging & Joining DataFrames"),
    ],
  },
  {
    n: 5,
    title: "Database Connectivity and SQL Integration",
    lessons: [
      L(26, "connecting-python-to-sql-server", "Connecting Python to SQL Server"),
      L(27, "running-queries-and-loading-results-into-pandas", "Running Queries & Loading Results Into Pandas"),
      L(28, "writing-data-back-to-a-database", "Writing Data Back to a Database"),
      L(29, "parameterized-queries-and-sql-injection", "Parameterized Queries & SQL Injection"),
      L(30, "working-with-sqlalchemy", "Working With SQLAlchemy"),
      L(31, "transactions-and-error-handling-in-database-code", "Transactions & Error Handling in Database Code"),
    ],
  },
  {
    n: 6,
    title: "Python ETL Pipeline Development",
    lessons: [
      L(32, "designing-an-etl-pipeline", "Designing an ETL Pipeline"),
      L(33, "extracting-from-multiple-sources", "Extracting From Multiple Sources"),
      L(34, "transformation-logic-and-data-validation", "Transformation Logic & Data Validation"),
      L(35, "loading-to-a-target", "Loading to a Target (File, Database, Warehouse)"),
      L(36, "incremental-loads-and-watermarks", "Incremental Loads & Watermarks"),
      L(37, "idempotency-and-error-recovery", "Idempotency & Error Recovery"),
      L(38, "building-a-config-driven-etl-script", "Building a Config-Driven ETL Script"),
    ],
  },
  {
    n: 7,
    title: "Logging, Testing, Error Handling and Automation",
    lessons: [
      L(39, "logging-in-python", "Logging in Python (the logging Module)"),
      L(40, "writing-unit-tests-with-pytest", "Writing Unit Tests With pytest"),
      L(41, "robust-error-handling-patterns", "Robust Error Handling Patterns"),
      L(42, "scheduling-and-automating-scripts", "Scheduling & Automating Scripts"),
      L(43, "environment-variables-and-secrets-management", "Environment Variables & Secrets Management"),
    ],
  },
  {
    n: 8,
    title: "PySpark Foundations and Mini Capstone",
    lessons: [
      L(44, "introduction-to-pyspark-and-sparksession", "Introduction to PySpark & SparkSession"),
      L(45, "pyspark-dataframes-reading-and-transforming-data", "PySpark DataFrames: Reading & Transforming Data"),
      L(46, "pyspark-aggregations-and-joins", "PySpark Aggregations & Joins"),
      L(47, "mini-capstone-part-1-building-the-pipeline", "Mini Capstone Part 1: Building the Pipeline"),
      L(48, "mini-capstone-part-2-validating-and-presenting-results", "Mini Capstone Part 2: Validating & Presenting Results"),
    ],
  },
];
