// The full SQL Dialects for Developers course outline. Only lessons with a
// contentDir + videoUrl are playable; everything else renders as "in production".

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/sql-dialects/
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

export const SQL_DIALECTS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "The Landscape",
    lessons: [
      L(1, "sql-standard-vs-vendor-dialects", "SQL Standard vs. Vendor Dialects: Why They Diverge", { contentDir: "ch01/01-sql-standard-vs-vendor-dialects", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/sql-standard-vs-vendor-dialects.mp4", durationLabel: "1 min 57 s" }),
      L(2, "meet-the-players", "Meet the Players: SQL Server, Oracle, MySQL, PostgreSQL & Cloud Warehouses", { contentDir: "ch01/02-meet-the-players", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/meet-the-players.mp4", durationLabel: "1 min 28 s" }),
      L(3, "multi-dialect-practice-setup", "Setting Up a Multi-Dialect Practice Environment", { contentDir: "ch01/03-multi-dialect-practice-setup", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/multi-dialect-practice-setup.mp4", durationLabel: "1 min 39 s" }),
      L(4, "reading-vendor-docs", "Reading Vendor Documentation Like a Developer, Not a DBA", { contentDir: "ch01/04-reading-vendor-docs", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/reading-vendor-docs.mp4", durationLabel: "1 min 50 s" }),
      L(5, "one-query-five-dialects", "A Side-by-Side Query: The Same SELECT in Five Dialects", { contentDir: "ch01/05-one-query-five-dialects", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/one-query-five-dialects.mp4", durationLabel: "1 min 44 s" }),
    ],
  },
  {
    n: 2,
    title: "Data Types Across Dialects",
    lessons: [
      L(6, "string-types-across-dialects", "String Types: VARCHAR, NVARCHAR, TEXT & CLOB", { contentDir: "ch02/01-string-types-across-dialects", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/string-types-across-dialects.mp4", durationLabel: "1 min 29 s" }),
      L(7, "numeric-precision-differences", "Numeric Types: Precision Differences That Bite", { contentDir: "ch02/02-numeric-precision-differences", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/numeric-precision-differences.mp4", durationLabel: "1 min 32 s" }),
      L(8, "date-time-types-across-platforms", "Date and Time Types Across Platforms", { contentDir: "ch02/03-date-time-types-across-platforms", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/date-time-types-across-platforms.mp4", durationLabel: "1 min 27 s" }),
      L(9, "the-missing-boolean", "Boolean: A Type That Doesn't Really Exist Everywhere", { contentDir: "ch02/04-the-missing-boolean", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/the-missing-boolean.mp4", durationLabel: "1 min 34 s" }),
      L(10, "auto-incrementing-keys-compared", "Auto-Incrementing Keys: IDENTITY vs. SEQUENCE vs. AUTO_INCREMENT vs. SERIAL", { contentDir: "ch02/05-auto-incrementing-keys-compared", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/auto-incrementing-keys-compared.mp4", durationLabel: "1 min 25 s" }),
      L(11, "null-handling-surprises", "NULL Handling Differences That Surprise Developers", { contentDir: "ch02/06-null-handling-surprises", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/null-handling-surprises.mp4", durationLabel: "1 min 40 s" }),
    ],
  },
  {
    n: 3,
    title: "Querying Basics Compared",
    lessons: [
      L(12, "pagination-across-dialects", "Pagination: TOP vs. ROWNUM/FETCH FIRST vs. LIMIT", { contentDir: "ch03/01-pagination-across-dialects", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/pagination-across-dialects.mp4", durationLabel: "2 min 12 s" }),
      L(13, "string-concatenation-across-dialects", "String Concatenation: +, ||, and CONCAT", { contentDir: "ch03/02-string-concatenation-across-dialects", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/string-concatenation-across-dialects.mp4", durationLabel: "1 min 55 s" }),
      L(14, "quoting-identifiers", "Quoting Identifiers: Brackets, Double Quotes & Backticks", { contentDir: "ch03/03-quoting-identifiers", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/quoting-identifiers.mp4", durationLabel: "1 min 48 s" }),
      L(15, "case-sensitivity-across-platforms", "Case Sensitivity: Object Names Across Platforms", { contentDir: "ch03/04-case-sensitivity-across-platforms", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/case-sensitivity-across-platforms.mp4", durationLabel: "1 min 59 s" }),
      L(16, "date-arithmetic-across-dialects", "Date Arithmetic Across Dialects", { contentDir: "ch03/05-date-arithmetic-across-dialects", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/date-arithmetic-across-dialects.mp4", durationLabel: "1 min 55 s" }),
      L(17, "the-dual-table", "The DUAL Table and Equivalent Patterns", { contentDir: "ch03/06-the-dual-table", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/the-dual-table.mp4", durationLabel: "1 min 41 s" }),
      L(18, "comments-and-terminators", "Comments and Statement Terminators Across Dialects", { contentDir: "ch03/07-comments-and-terminators", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/comments-and-terminators.mp4", durationLabel: "1 min 46 s" }),
      L(19, "string-function-reference", "Dialect-Specific String Functions: A Side-by-Side Reference", { contentDir: "ch03/08-string-function-reference", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/string-function-reference.mp4", durationLabel: "1 min 46 s" }),
    ],
  },
  {
    n: 4,
    title: "Joins, Subqueries & Set Operations",
    lessons: [
      L(20, "join-syntax-differences", "Join Syntax Differences: Old-Style vs. ANSI Joins", { contentDir: "ch04/01-join-syntax-differences", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/join-syntax-differences.mp4", durationLabel: "3 min 50 s" }),
      L(21, "apply-vs-lateral", "CROSS APPLY/OUTER APPLY vs. LATERAL Joins", { contentDir: "ch04/02-apply-vs-lateral", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/apply-vs-lateral.mp4", durationLabel: "3 min 29 s" }),
      L(22, "ctes-across-dialects", "Common Table Expressions Across Dialects", { contentDir: "ch04/03-ctes-across-dialects", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/ctes-across-dialects.mp4", durationLabel: "3 min 23 s" }),
      L(23, "set-operations-across-dialects", "Set Operations: UNION, INTERSECT, EXCEPT vs. MINUS", { contentDir: "ch04/04-set-operations-across-dialects", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/set-operations-across-dialects.mp4", durationLabel: "2 min 58 s" }),
      L(24, "window-functions-portability", "Window Functions: What's Standard, What's Not", { contentDir: "ch04/05-window-functions-portability", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/window-functions-portability.mp4", durationLabel: "3 min 14 s" }),
    ],
  },
  {
    n: 5,
    title: "Procedural Code Compared",
    lessons: [
      L(25, "procedural-sql-overview", "Procedural SQL Overview: T-SQL vs. PL/SQL vs. Stored Programs Elsewhere", { contentDir: "ch05/01-procedural-sql-overview", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/procedural-sql-overview.mp4", durationLabel: "3 min 43 s" }),
      L(26, "variables-and-declarations-compared", "Variables and Declarations Across Dialects", { contentDir: "ch05/02-variables-and-declarations-compared", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/variables-and-declarations-compared.mp4", durationLabel: "3 min 4 s" }),
      L(27, "control-flow-compared", "Control Flow: IF/CASE/Loops Compared", { contentDir: "ch05/03-control-flow-compared", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/control-flow-compared.mp4", durationLabel: "3 min 2 s" }),
      L(28, "stored-proc-tsql-vs-plsql", "Writing a Stored Procedure: T-SQL vs. PL/SQL Side by Side", { contentDir: "ch05/04-stored-proc-tsql-vs-plsql", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/stored-proc-tsql-vs-plsql.mp4", durationLabel: "2 min 54 s" }),
      L(29, "stored-proc-mysql-postgresql", "Writing a Stored Procedure: MySQL and PostgreSQL", { contentDir: "ch05/05-stored-proc-mysql-postgresql", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/stored-proc-mysql-postgresql.mp4", durationLabel: "3 min 1 s" }),
      L(30, "functions-across-dialects", "Functions Across Dialects: Scalar and Table-Returning", { contentDir: "ch05/06-functions-across-dialects", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/functions-across-dialects.mp4", durationLabel: "3 min 8 s" }),
      L(31, "cursors-compared", "Cursors Compared Across Platforms", { contentDir: "ch05/07-cursors-compared", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/cursors-compared.mp4", durationLabel: "3 min 4 s" }),
      L(32, "error-handling-compared", "Error Handling: TRY/CATCH vs. EXCEPTION Blocks", { contentDir: "ch05/08-error-handling-compared", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/error-handling-compared.mp4", durationLabel: "2 min 56 s" }),
      L(33, "triggers-across-dialects", "Triggers Across Dialects", { contentDir: "ch05/09-triggers-across-dialects", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/triggers-across-dialects.mp4", durationLabel: "3 min 2 s" }),
      L(34, "dynamic-sql-across-platforms", "Dynamic SQL Across Platforms", { contentDir: "ch05/10-dynamic-sql-across-platforms", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/dynamic-sql-across-platforms.mp4", durationLabel: "2 min 57 s" }),
    ],
  },
  {
    n: 6,
    title: "PL/SQL Deep Dive for T-SQL Developers",
    lessons: [
      L(35, "plsql-blocks", "PL/SQL Blocks: DECLARE, BEGIN, EXCEPTION, END", { contentDir: "ch06/01-plsql-blocks", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/plsql-blocks.mp4", durationLabel: "2 min 56 s" }),
      L(36, "plsql-packages", "PL/SQL Packages: A Concept T-SQL Doesn't Have", { contentDir: "ch06/02-plsql-packages", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/plsql-packages.mp4", durationLabel: "2 min 5 s" }),
      L(37, "plsql-anonymous-blocks", "Anonymous Blocks and DBMS_OUTPUT", { contentDir: "ch06/03-plsql-anonymous-blocks", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/plsql-anonymous-blocks.mp4", durationLabel: "2 min 4 s" }),
      L(38, "plsql-ref-cursors", "REF CURSORs in PL/SQL", { contentDir: "ch06/04-plsql-ref-cursors", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/plsql-ref-cursors.mp4", durationLabel: "2 min 6 s" }),
      L(39, "plsql-collections", "PL/SQL Collections: Arrays, Nested Tables & Associative Arrays", { contentDir: "ch06/05-plsql-collections", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/plsql-collections.mp4", durationLabel: "2 min 12 s" }),
      L(40, "plsql-autonomous-transactions", "Autonomous Transactions in PL/SQL", { contentDir: "ch06/06-plsql-autonomous-transactions", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/plsql-autonomous-transactions.mp4", durationLabel: "1 min 57 s" }),
      L(41, "plsql-bulk-collect-forall", "Bulk Operations: BULK COLLECT and FORALL", { contentDir: "ch06/07-plsql-bulk-collect-forall", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/plsql-bulk-collect-forall.mp4", durationLabel: "1 min 57 s" }),
      L(42, "translating-tsql-to-plsql", "Translating a Real T-SQL Stored Procedure into PL/SQL", { contentDir: "ch06/08-translating-tsql-to-plsql", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/translating-tsql-to-plsql.mp4", durationLabel: "2 min 36 s" }),
    ],
  },
  {
    n: 7,
    title: "MySQL Deep Dive for T-SQL Developers",
    lessons: [
      L(43, "mysql-sql-mode", "MySQL's SQL Mode and Why It Changes Behavior", { contentDir: "ch07/01-mysql-sql-mode", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/mysql-sql-mode.mp4", durationLabel: "2 min 53 s" }),
      L(44, "mysql-stored-procs-delimiter", "MySQL Stored Procedures and the DELIMITER Trick", { contentDir: "ch07/02-mysql-stored-procs-delimiter", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/mysql-stored-procs-delimiter.mp4", durationLabel: "2 min 15 s" }),
      L(45, "mysql-functions-and-quirks", "MySQL-Specific Functions and Syntax Quirks", { contentDir: "ch07/03-mysql-functions-and-quirks", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/mysql-functions-and-quirks.mp4", durationLabel: "2 min 21 s" }),
      L(46, "mysql-storage-engines-for-developers", "Storage Engines and Why They Matter to a Developer", { contentDir: "ch07/04-mysql-storage-engines-for-developers", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/mysql-storage-engines-for-developers.mp4", durationLabel: "2 min 8 s" }),
      L(47, "translating-tsql-to-mysql", "Translating a Real T-SQL Query into MySQL", { contentDir: "ch07/05-translating-tsql-to-mysql", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/translating-tsql-to-mysql.mp4", durationLabel: "2 min 12 s" }),
    ],
  },
  {
    n: 8,
    title: "PostgreSQL Deep Dive for T-SQL Developers",
    lessons: [
      L(48, "plpgsql-vs-tsql", "PostgreSQL's PL/pgSQL vs. T-SQL", { contentDir: "ch08/01-plpgsql-vs-tsql", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/plpgsql-vs-tsql.mp4", durationLabel: "2 min 2 s" }),
      L(49, "postgresql-arrays-and-jsonb", "Arrays and JSONB: PostgreSQL's Native Types", { contentDir: "ch08/02-postgresql-arrays-and-jsonb", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/postgresql-arrays-and-jsonb.mp4", durationLabel: "2 min 7 s" }),
      L(50, "postgresql-ctes-and-recursion", "Common Table Expressions and Recursive Queries in PostgreSQL", { contentDir: "ch08/03-postgresql-ctes-and-recursion", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/postgresql-ctes-and-recursion.mp4", durationLabel: "2 min 9 s" }),
      L(51, "postgresql-specific-operators", "PostgreSQL-Specific Operators and Functions", { contentDir: "ch08/04-postgresql-specific-operators", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/postgresql-specific-operators.mp4", durationLabel: "2 min 2 s" }),
      L(52, "translating-tsql-to-postgresql", "Translating a Real T-SQL Query into PostgreSQL", { contentDir: "ch08/05-translating-tsql-to-postgresql", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/translating-tsql-to-postgresql.mp4", durationLabel: "1 min 49 s" }),
    ],
  },
  {
    n: 9,
    title: "Cloud Warehouse SQL Dialects",
    lessons: [
      L(53, "snowflake-sql-vs-tsql", "Snowflake SQL: What's Different From T-SQL", { contentDir: "ch09/01-snowflake-sql-vs-tsql", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/snowflake-sql-vs-tsql.mp4", durationLabel: "3 min 29 s" }),
      L(54, "snowflake-variant-and-semi-structured", "Snowflake Semi-Structured Data: VARIANT and Dot Notation", { contentDir: "ch09/02-snowflake-variant-and-semi-structured", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/snowflake-variant-and-semi-structured.mp4", durationLabel: "3 min 17 s" }),
      L(55, "databricks-and-spark-sql-basics", "Databricks SQL and Spark SQL Basics", { contentDir: "ch09/03-databricks-and-spark-sql-basics", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/databricks-and-spark-sql-basics.mp4", durationLabel: "2 min 53 s" }),
      L(56, "bigquery-and-redshift-orientation", "BigQuery and Redshift: A Quick Orientation", { contentDir: "ch09/04-bigquery-and-redshift-orientation", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/bigquery-and-redshift-orientation.mp4", durationLabel: "2 min 53 s" }),
      L(57, "why-warehouse-dialects-converge", "Why Warehouse SQL Dialects Converge More Than OLTP Dialects Do", { contentDir: "ch09/05-why-warehouse-dialects-converge", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/why-warehouse-dialects-converge.mp4", durationLabel: "3 min 14 s" }),
    ],
  },
  {
    n: 10,
    title: "Migration, Translation & Capstone",
    lessons: [
      L(58, "reading-a-migration-guide", "Reading a Migration Guide: What to Look For", { contentDir: "ch10/01-reading-a-migration-guide", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/reading-a-migration-guide.mp4", durationLabel: "4 min 42 s" }),
      L(59, "common-translation-pitfalls", "Common Translation Pitfalls (and How to Catch Them Before Production)", { contentDir: "ch10/02-common-translation-pitfalls", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/common-translation-pitfalls.mp4", durationLabel: "3 min 28 s" }),
      L(60, "capstone-translate-a-real-query", "Capstone: Translate a Real T-SQL Reporting Query Into Three Other Dialects", { contentDir: "ch10/03-capstone-translate-a-real-query", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/capstone-translate-a-real-query.mp4", durationLabel: "3 min 60 s" }),
      L(61, "choosing-the-right-dialect-reference", "Choosing the Right Dialect Reference for the Job", { contentDir: "ch10/04-choosing-the-right-dialect-reference", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/choosing-the-right-dialect-reference.mp4", durationLabel: "2 min 56 s" }),
      L(62, "course-wrap-up-staying-fluent", "Course Wrap-Up: Staying Fluent Across Platforms", { contentDir: "ch10/05-course-wrap-up-staying-fluent", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-sql-dialects/course-wrap-up-staying-fluent.mp4", durationLabel: "3 min 33 s" }),
    ],
  },
];
