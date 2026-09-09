// The full T-SQL Development course outline. Only lessons with a contentDir +
// videoUrl are playable; everything else renders as "in production".

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/t-sql/
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

export const TSQL_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "T-SQL Foundations",
    lessons: [
      L(1, "what-is-t-sql", "What Is T-SQL? A Tour of SSMS", {
        contentDir: "ch01/01-what-is-t-sql",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788923886/ltv-t-sql/ch01-01-what-is-t-sql.mp4",
        durationLabel: "3 min 54 s",
      }),
      L(2, "connecting-and-use", "Connecting to a Database & the USE Statement", {
        contentDir: "ch01/02-connecting-and-use",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788924817/ltv-t-sql/ch01-02-connecting-and-use.mp4",
        durationLabel: "2 min 59 s",
      }),
      L(3, "select-basics", "The SELECT Statement Basics", {
        contentDir: "ch01/03-select-basics",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788925022/ltv-t-sql/ch01-03-select-basics.mp4",
        durationLabel: "2 min 29 s",
      }),
      L(4, "selecting-specific-columns", "Selecting Specific Columns", {
        contentDir: "ch01/04-selecting-specific-columns",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788925181/ltv-t-sql/ch01-04-selecting-specific-columns.mp4",
        durationLabel: "2 min 20 s",
      }),
      L(5, "column-aliases", "Column Aliases (AS)", {
        contentDir: "ch01/05-column-aliases",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788925323/ltv-t-sql/ch01-05-column-aliases.mp4",
        durationLabel: "2 min 9 s",
      }),
      L(6, "string-concatenation", "String Concatenation with +", {
        contentDir: "ch01/06-string-concatenation",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788925468/ltv-t-sql/ch01-06-string-concatenation.mp4",
        durationLabel: "2 min 9 s",
      }),
      L(7, "case-simple", "CASE Expressions (Simple)", {
        contentDir: "ch01/07-case-simple",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788925625/ltv-t-sql/ch01-07-case-simple.mp4",
        durationLabel: "1 min 58 s",
      }),
      L(8, "case-searched", "CASE Expressions (Searched)", {
        contentDir: "ch01/08-case-searched",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788925783/ltv-t-sql/ch01-08-case-searched.mp4",
        durationLabel: "2 min 12 s",
      }),
      L(9, "distinct", "DISTINCT", {
        contentDir: "ch01/09-distinct",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788925929/ltv-t-sql/ch01-09-distinct.mp4",
        durationLabel: "2 min 11 s",
      }),
      L(10, "comments-formatting", "Comments & Query Formatting", {
        contentDir: "ch01/10-comments-formatting",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788926088/ltv-t-sql/ch01-10-comments-formatting.mp4",
        durationLabel: "2 min 27 s",
      }),
    ],
  },
  {
    n: 2,
    title: "Filtering and Sorting",
    lessons: [
      L(11, "where-clause", "The WHERE Clause", {
        contentDir: "ch02/11-where-clause",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788926282/ltv-t-sql/ch02-11-where-clause.mp4",
        durationLabel: "2 min 38 s",
      }),
      L(12, "comparison-operators", "Relational/Comparison Operators", {
        contentDir: "ch02/12-comparison-operators",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788926431/ltv-t-sql/ch02-12-comparison-operators.mp4",
        durationLabel: "2 min 17 s",
      }),
      L(13, "and-or-not", "AND, OR, NOT", {
        contentDir: "ch02/13-and-or-not",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788926597/ltv-t-sql/ch02-13-and-or-not.mp4",
        durationLabel: "2 min 37 s",
      }),
      L(14, "like-wildcards", "LIKE and Wildcards", {
        contentDir: "ch02/14-like-wildcards",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788926751/ltv-t-sql/ch02-14-like-wildcards.mp4",
        durationLabel: "2 min 29 s",
      }),
      L(15, "in-and-between", "IN and BETWEEN", {
        contentDir: "ch02/15-in-and-between",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788926892/ltv-t-sql/ch02-15-in-and-between.mp4",
        durationLabel: "2 min 12 s",
      }),
      L(16, "null-handling", "Handling NULL (IS NULL / IS NOT NULL)", {
        contentDir: "ch02/16-null-handling",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788927055/ltv-t-sql/ch02-16-null-handling.mp4",
        durationLabel: "2 min 45 s",
      }),
      L(17, "order-by", "ORDER BY: Ascending & Descending", {
        contentDir: "ch02/17-order-by",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788927191/ltv-t-sql/ch02-17-order-by.mp4",
        durationLabel: "2 min 0 s",
      }),
      L(18, "top-top-percent", "TOP and TOP PERCENT", {
        contentDir: "ch02/18-top-top-percent",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788927329/ltv-t-sql/ch02-18-top-top-percent.mp4",
        durationLabel: "1 min 59 s",
      }),
      L(19, "top-with-ties", "TOP WITH TIES", {
        contentDir: "ch02/19-top-with-ties",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788927480/ltv-t-sql/ch02-19-top-with-ties.mp4",
        durationLabel: "2 min 10 s",
      }),
      L(20, "predicates", "Predicates: How SQL Server Filters Data", {
        contentDir: "ch02/20-predicates",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788927628/ltv-t-sql/ch02-20-predicates.mp4",
        durationLabel: "2 min 13 s",
      }),
    ],
  },
  {
    n: 3,
    title: "Joining Tables",
    lessons: [
      L(21, "keys-review", "Table Relationships & Keys Review", {
        contentDir: "ch03/21-keys-review",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788927778/ltv-t-sql/ch03-21-keys-review.mp4",
        durationLabel: "2 min 3 s",
      }),
      L(22, "inner-join", "INNER JOIN", {
        contentDir: "ch03/22-inner-join",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788927934/ltv-t-sql/ch03-22-inner-join.mp4",
        durationLabel: "2 min 21 s",
      }),
      L(23, "left-join", "LEFT JOIN", {
        contentDir: "ch03/23-left-join",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788928080/ltv-t-sql/ch03-23-left-join.mp4",
        durationLabel: "2 min 0 s",
      }),
      L(24, "right-join", "RIGHT JOIN", {
        contentDir: "ch03/24-right-join",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788928219/ltv-t-sql/ch03-24-right-join.mp4",
        durationLabel: "1 min 38 s",
      }),
      L(25, "full-outer-join", "FULL OUTER JOIN", {
        contentDir: "ch03/25-full-outer-join",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788928364/ltv-t-sql/ch03-25-full-outer-join.mp4",
        durationLabel: "2 min 19 s",
      }),
      L(26, "cross-join", "CROSS JOIN", {
        contentDir: "ch03/26-cross-join",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788928502/ltv-t-sql/ch03-26-cross-join.mp4",
        durationLabel: "2 min 4 s",
      }),
      L(27, "self-join", "SELF JOIN", {
        contentDir: "ch03/27-self-join",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788928650/ltv-t-sql/ch03-27-self-join.mp4",
        durationLabel: "1 min 47 s",
      }),
      L(28, "joining-three-tables", "Joining Three or More Tables", {
        contentDir: "ch03/28-joining-three-tables",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788928785/ltv-t-sql/ch03-28-joining-three-tables.mp4",
        durationLabel: "1 min 49 s",
      }),
      L(29, "cross-apply", "CROSS APPLY", {
        contentDir: "ch03/29-cross-apply",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788928921/ltv-t-sql/ch03-29-cross-apply.mp4",
        durationLabel: "1 min 54 s",
      }),
      L(30, "outer-apply", "OUTER APPLY", {
        contentDir: "ch03/30-outer-apply",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788929054/ltv-t-sql/ch03-30-outer-apply.mp4",
        durationLabel: "1 min 47 s",
      }),
      L(31, "choosing-the-right-join", "Choosing the Right Join"),
    ],
  },
  {
    n: 4,
    title: "Grouping and Aggregating",
    lessons: [
      L(32, "count", "COUNT"),
      L(33, "sum-avg", "SUM and AVG"),
      L(34, "min-max", "MIN and MAX"),
      L(35, "group-by-basics", "GROUP BY Basics"),
      L(36, "group-by-multiple-columns", "GROUP BY Multiple Columns"),
      L(37, "having-vs-where", "HAVING vs. WHERE"),
      L(38, "union-vs-union-all", "UNION vs. UNION ALL"),
      L(39, "var-statistical-aggregates", "VAR and Statistical Aggregates"),
      L(40, "summary-reports", "Building Summary Reports"),
    ],
  },
  {
    n: 5,
    title: "Data Types, Strings, and Dates",
    lessons: [
      L(41, "char-vs-varchar", "CHAR vs. VARCHAR"),
      L(42, "nvarchar-unicode", "NVARCHAR and Unicode"),
      L(43, "varchar-max", "VARCHAR(MAX)"),
      L(44, "len-upper-lower", "LEN, UPPER, LOWER"),
      L(45, "substring-charindex", "SUBSTRING and CHARINDEX"),
      L(46, "stuff-vs-replace", "STUFF vs. REPLACE"),
      L(47, "trim-ltrim-rtrim", "TRIM, LTRIM, RTRIM"),
      L(48, "date-time-data-types", "Date and Time Data Types"),
      L(49, "date-functions", "Date Functions: GETDATE, DATEADD, DATEDIFF"),
      L(50, "cast-convert", "Converting and Formatting Data (CAST/CONVERT)"),
      L(51, "deleting-duplicate-rows", "Deleting Duplicate Rows"),
    ],
  },
  {
    n: 6,
    title: "Subqueries, CTEs, and Views",
    lessons: [
      L(52, "single-value-subqueries", "Single-Value Subqueries"),
      L(53, "multi-value-subqueries", "Multi-Value Subqueries"),
      L(54, "correlated-subqueries", "Correlated Subqueries"),
      L(55, "exists-not-exists", "EXISTS and NOT EXISTS"),
      L(56, "ctes", "Common Table Expressions (CTEs)"),
      L(57, "recursive-ctes", "Recursive CTEs"),
      L(58, "views", "Views: Creating and Using"),
      L(59, "indexed-views", "Indexed Views"),
      L(60, "pivot", "PIVOT"),
      L(61, "unpivot", "UNPIVOT"),
    ],
  },
  {
    n: 7,
    title: "Programming with T-SQL",
    lessons: [
      L(62, "variables-declare", "Variables and DECLARE"),
      L(63, "batches-go", "Batches and GO"),
      L(64, "if-else", "IF/ELSE"),
      L(65, "begin-end", "BEGIN/END Blocks"),
      L(66, "while-loops", "WHILE Loops"),
      L(67, "cursors", "Cursors: Declaring and Fetching"),
      L(68, "stored-procedures-creating", "Stored Procedures: Creating"),
      L(69, "stored-procedures-parameters", "Stored Procedures: Parameters"),
      L(70, "dynamic-sql", "Dynamic SQL with sp_executesql"),
      L(71, "merge-statement", "The MERGE Statement"),
    ],
  },
  {
    n: 8,
    title: "Transactions and Error Handling",
    lessons: [
      L(72, "transactions", "Transactions: BEGIN/COMMIT/ROLLBACK"),
      L(73, "acid-properties", "ACID Properties"),
      L(74, "lock-types", "Lock Types"),
      L(75, "concurrency-blocking", "Concurrency and Blocking"),
      L(76, "try-catch", "TRY/CATCH Error Handling"),
      L(77, "raiserror-throw", "RAISERROR and THROW"),
      L(78, "auth-modes", "SQL Server Authentication Modes"),
    ],
  },
  {
    n: 9,
    title: "Window and Ranking Functions",
    lessons: [
      L(79, "over-partition-by", "OVER() and PARTITION BY"),
      L(80, "row-number", "ROW_NUMBER"),
      L(81, "rank-dense-rank", "RANK and DENSE_RANK"),
      L(82, "ntile", "NTILE"),
    ],
  },
  {
    n: 10,
    title: "Performance Tuning",
    lessons: [
      L(83, "what-is-performance-tuning", "What Is Query Performance Tuning?"),
      L(84, "cartesian-product", "The Cartesian Product: What Happens When Joins Go Wrong"),
      L(85, "joins-vs-subqueries", "Joins vs. Subqueries: Which Is Faster, and Why"),
      L(86, "exists-vs-in-vs-join", "EXISTS vs. IN vs. JOIN for Existence Checks"),
      L(87, "sargable-predicates", "SARGable vs. Non-SARGable WHERE Clauses"),
      L(88, "clustered-vs-nonclustered", "Clustered vs. Nonclustered Indexes: Choosing Wisely"),
      L(89, "filtered-included-indexes", "Filtered Indexes and Included Columns"),
      L(90, "execution-plans", "Reading Execution Plans: Scans vs. Seeks"),
      L(91, "set-statistics-time-io", "SET STATISTICS TIME and IO in Practice"),
      L(92, "set-statistics-profile-xml", "SET STATISTICS PROFILE and XML"),
      L(93, "temp-tables-vs-variables-vs-ctes", "Temp Tables vs. Table Variables vs. CTEs: Performance Tradeoffs"),
      L(94, "performance-anti-patterns", "Common T-SQL Performance Anti-Patterns"),
    ],
  },
  {
    n: 11,
    title: "Database Design Fundamentals",
    lessons: [
      L(95, "primary-keys", "Primary Keys"),
      L(96, "foreign-keys", "Foreign Keys"),
      L(97, "unique-constraints", "UNIQUE Constraints"),
      L(98, "not-null-check", "NOT NULL and CHECK Constraints"),
      L(99, "one-to-one", "Table Relationships: One-to-One"),
      L(100, "one-to-many", "Table Relationships: One-to-Many"),
      L(101, "many-to-many", "Table Relationships: Many-to-Many"),
      L(102, "first-normal-form", "Normalization: 1NF"),
      L(103, "second-third-normal-form", "Normalization: 2NF and 3NF"),
      L(104, "system-databases", "System Databases (master, msdb, tempdb, model)"),
      L(105, "local-vs-global-temp-tables", "Local vs. Global Temp Tables"),
      L(106, "sql-server-profiler", "SQL Server Profiler"),
    ],
  },
  {
    n: 12,
    title: "Data Warehouse Concepts",
    lessons: [
      L(107, "oltp-vs-olap", "OLTP vs. OLAP: Two Different Worlds"),
      L(108, "what-is-a-data-warehouse", "What Is a Data Warehouse?"),
      L(109, "what-is-a-data-mart", "What Is a Data Mart?"),
      L(110, "what-is-a-data-lake", "What Is a Data Lake?"),
      L(111, "warehouse-vs-lake-vs-mart", "Data Warehouse vs. Data Lake vs. Data Mart"),
      L(112, "etl-vs-elt", "ETL vs. ELT"),
      L(113, "fact-dimension-tables", "Fact Tables and Dimension Tables"),
      L(114, "star-schema", "Star Schema"),
      L(115, "snowflake-schema", "Snowflake Schema"),
      L(116, "slowly-changing-dimensions", "Slowly Changing Dimensions (SCD)"),
      L(117, "surrogate-vs-natural-keys", "Surrogate Keys vs. Natural Keys"),
      L(118, "t-sql-in-the-bi-pipeline", "Where T-SQL Fits in the BI/Warehousing Pipeline"),
    ],
  },
];
