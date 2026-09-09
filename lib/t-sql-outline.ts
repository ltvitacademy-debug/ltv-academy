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
      L(31, "choosing-the-right-join", "Choosing the Right Join", {
        contentDir: "ch03/31-choosing-the-right-join",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788929201/ltv-t-sql/ch03-31-choosing-the-right-join.mp4",
        durationLabel: "2 min 2 s",
      }),
    ],
  },
  {
    n: 4,
    title: "Grouping and Aggregating",
    lessons: [
      L(32, "count", "COUNT", {
        contentDir: "ch04/32-count",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788929356/ltv-t-sql/ch04-32-count.mp4",
        durationLabel: "2 min 3 s",
      }),
      L(33, "sum-avg", "SUM and AVG", {
        contentDir: "ch04/33-sum-avg",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788929509/ltv-t-sql/ch04-33-sum-avg.mp4",
        durationLabel: "1 min 55 s",
      }),
      L(34, "min-max", "MIN and MAX", {
        contentDir: "ch04/34-min-max",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788929651/ltv-t-sql/ch04-34-min-max.mp4",
        durationLabel: "1 min 43 s",
      }),
      L(35, "group-by-basics", "GROUP BY Basics", {
        contentDir: "ch04/35-group-by-basics",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788929803/ltv-t-sql/ch04-35-group-by-basics.mp4",
        durationLabel: "2 min 13 s",
      }),
      L(36, "group-by-multiple-columns", "GROUP BY Multiple Columns", {
        contentDir: "ch04/36-group-by-multiple-columns",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788929938/ltv-t-sql/ch04-36-group-by-multiple-columns.mp4",
        durationLabel: "2 min 3 s",
      }),
      L(37, "having-vs-where", "HAVING vs. WHERE", {
        contentDir: "ch04/37-having-vs-where",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788930084/ltv-t-sql/ch04-37-having-vs-where.mp4",
        durationLabel: "2 min 11 s",
      }),
      L(38, "union-vs-union-all", "UNION vs. UNION ALL", {
        contentDir: "ch04/38-union-vs-union-all",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788930229/ltv-t-sql/ch04-38-union-vs-union-all.mp4",
        durationLabel: "2 min 15 s",
      }),
      L(39, "var-statistical-aggregates", "VAR and Statistical Aggregates", {
        contentDir: "ch04/39-var-statistical-aggregates",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788930378/ltv-t-sql/ch04-39-var-statistical-aggregates.mp4",
        durationLabel: "2 min 11 s",
      }),
      L(40, "summary-reports", "Building Summary Reports", {
        contentDir: "ch04/40-summary-reports",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788930521/ltv-t-sql/ch04-40-summary-reports.mp4",
        durationLabel: "2 min 7 s",
      }),
    ],
  },
  {
    n: 5,
    title: "Data Types, Strings, and Dates",
    lessons: [
      L(41, "char-vs-varchar", "CHAR vs. VARCHAR", {
        contentDir: "ch05/41-char-vs-varchar",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788930682/ltv-t-sql/ch05-41-char-vs-varchar.mp4",
        durationLabel: "2 min 9 s",
      }),
      L(42, "nvarchar-unicode", "NVARCHAR and Unicode", {
        contentDir: "ch05/42-nvarchar-unicode",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788930839/ltv-t-sql/ch05-42-nvarchar-unicode.mp4",
        durationLabel: "2 min 17 s",
      }),
      L(43, "varchar-max", "VARCHAR(MAX)", {
        contentDir: "ch05/43-varchar-max",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788931001/ltv-t-sql/ch05-43-varchar-max.mp4",
        durationLabel: "2 min 23 s",
      }),
      L(44, "len-upper-lower", "LEN, UPPER, LOWER", {
        contentDir: "ch05/44-len-upper-lower",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788931139/ltv-t-sql/ch05-44-len-upper-lower.mp4",
        durationLabel: "1 min 58 s",
      }),
      L(45, "substring-charindex", "SUBSTRING and CHARINDEX", {
        contentDir: "ch05/45-substring-charindex",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788931284/ltv-t-sql/ch05-45-substring-charindex.mp4",
        durationLabel: "2 min 5 s",
      }),
      L(46, "stuff-vs-replace", "STUFF vs. REPLACE", {
        contentDir: "ch05/46-stuff-vs-replace",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788931426/ltv-t-sql/ch05-46-stuff-vs-replace.mp4",
        durationLabel: "1 min 59 s",
      }),
      L(47, "trim-ltrim-rtrim", "TRIM, LTRIM, RTRIM", {
        contentDir: "ch05/47-trim-ltrim-rtrim",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788931575/ltv-t-sql/ch05-47-trim-ltrim-rtrim.mp4",
        durationLabel: "2 min 5 s",
      }),
      L(48, "date-time-data-types", "Date and Time Data Types", {
        contentDir: "ch05/48-date-time-data-types",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788931727/ltv-t-sql/ch05-48-date-time-data-types.mp4",
        durationLabel: "2 min 16 s",
      }),
      L(49, "date-functions", "Date Functions: GETDATE, DATEADD, DATEDIFF", {
        contentDir: "ch05/49-date-functions",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788931869/ltv-t-sql/ch05-49-date-functions.mp4",
        durationLabel: "2 min 1 s",
      }),
      L(50, "cast-convert", "Converting and Formatting Data (CAST/CONVERT)", {
        contentDir: "ch05/50-cast-convert",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788932007/ltv-t-sql/ch05-50-cast-convert.mp4",
        durationLabel: "1 min 59 s",
      }),
      L(51, "deleting-duplicate-rows", "Deleting Duplicate Rows", {
        contentDir: "ch05/51-deleting-duplicate-rows",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788932174/ltv-t-sql/ch05-51-deleting-duplicate-rows.mp4",
        durationLabel: "2 min 15 s",
      }),
    ],
  },
  {
    n: 6,
    title: "Subqueries, CTEs, and Views",
    lessons: [
      L(52, "single-value-subqueries", "Single-Value Subqueries", {
        contentDir: "ch06/52-single-value-subqueries",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788932333/ltv-t-sql/ch06-52-single-value-subqueries.mp4",
        durationLabel: "2 min 5 s",
      }),
      L(53, "multi-value-subqueries", "Multi-Value Subqueries", {
        contentDir: "ch06/53-multi-value-subqueries",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788932495/ltv-t-sql/ch06-53-multi-value-subqueries.mp4",
        durationLabel: "2 min 32 s",
      }),
      L(54, "correlated-subqueries", "Correlated Subqueries", {
        contentDir: "ch06/54-correlated-subqueries",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788932651/ltv-t-sql/ch06-54-correlated-subqueries.mp4",
        durationLabel: "2 min 21 s",
      }),
      L(55, "exists-not-exists", "EXISTS and NOT EXISTS", {
        contentDir: "ch06/55-exists-not-exists",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788932812/ltv-t-sql/ch06-55-exists-not-exists.mp4",
        durationLabel: "2 min 17 s",
      }),
      L(56, "ctes", "Common Table Expressions (CTEs)", {
        contentDir: "ch06/56-ctes",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788932975/ltv-t-sql/ch06-56-ctes.mp4",
        durationLabel: "2 min 11 s",
      }),
      L(57, "recursive-ctes", "Recursive CTEs", {
        contentDir: "ch06/57-recursive-ctes",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788933144/ltv-t-sql/ch06-57-recursive-ctes.mp4",
        durationLabel: "2 min 29 s",
      }),
      L(58, "views", "Views: Creating and Using", {
        contentDir: "ch06/58-views",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788933309/ltv-t-sql/ch06-58-views.mp4",
        durationLabel: "2 min 34 s",
      }),
      L(59, "indexed-views", "Indexed Views", {
        contentDir: "ch06/59-indexed-views",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788933460/ltv-t-sql/ch06-59-indexed-views.mp4",
        durationLabel: "2 min 7 s",
      }),
      L(60, "pivot", "PIVOT", {
        contentDir: "ch06/60-pivot",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788933622/ltv-t-sql/ch06-60-pivot.mp4",
        durationLabel: "2 min 13 s",
      }),
      L(61, "unpivot", "UNPIVOT", {
        contentDir: "ch06/61-unpivot",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788933771/ltv-t-sql/ch06-61-unpivot.mp4",
        durationLabel: "1 min 59 s",
      }),
    ],
  },
  {
    n: 7,
    title: "Programming with T-SQL",
    lessons: [
      L(62, "variables-declare", "Variables and DECLARE", {
        contentDir: "ch07/62-variables-declare",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788933933/ltv-t-sql/ch07-62-variables-declare.mp4",
        durationLabel: "2 min 10 s",
      }),
      L(63, "batches-go", "Batches and GO", {
        contentDir: "ch07/63-batches-go",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788934080/ltv-t-sql/ch07-63-batches-go.mp4",
        durationLabel: "2 min 6 s",
      }),
      L(64, "if-else", "IF/ELSE", {
        contentDir: "ch07/64-if-else",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788934244/ltv-t-sql/ch07-64-if-else.mp4",
        durationLabel: "2 min 7 s",
      }),
      L(65, "begin-end", "BEGIN/END Blocks", {
        contentDir: "ch07/65-begin-end",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788934389/ltv-t-sql/ch07-65-begin-end.mp4",
        durationLabel: "2 min 0 s",
      }),
      L(66, "while-loops", "WHILE Loops", {
        contentDir: "ch07/66-while-loops",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788934547/ltv-t-sql/ch07-66-while-loops.mp4",
        durationLabel: "2 min 3 s",
      }),
      L(67, "cursors", "Cursors: Declaring and Fetching", {
        contentDir: "ch07/67-cursors",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788934696/ltv-t-sql/ch07-67-cursors.mp4",
        durationLabel: "2 min 7 s",
      }),
      L(68, "stored-procedures-creating", "Stored Procedures: Creating", {
        contentDir: "ch07/68-stored-procedures-creating",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788934837/ltv-t-sql/ch07-68-stored-procedures-creating.mp4",
        durationLabel: "1 min 59 s",
      }),
      L(69, "stored-procedures-parameters", "Stored Procedures: Parameters", {
        contentDir: "ch07/69-stored-procedures-parameters",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788934994/ltv-t-sql/ch07-69-stored-procedures-parameters.mp4",
        durationLabel: "2 min 14 s",
      }),
      L(70, "dynamic-sql", "Dynamic SQL with sp_executesql", {
        contentDir: "ch07/70-dynamic-sql",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788935166/ltv-t-sql/ch07-70-dynamic-sql.mp4",
        durationLabel: "2 min 22 s",
      }),
      L(71, "merge-statement", "The MERGE Statement", {
        contentDir: "ch07/71-merge-statement",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788935462/ltv-t-sql/ch07-71-merge-statement.mp4",
        durationLabel: "2 min 26 s",
      }),
    ],
  },
  {
    n: 8,
    title: "Transactions and Error Handling",
    lessons: [
      L(72, "transactions", "Transactions: BEGIN/COMMIT/ROLLBACK", {
        contentDir: "ch08/72-transactions",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788935785/ltv-t-sql/ch08-72-transactions.mp4",
        durationLabel: "2 min 0 s",
      }),
      L(73, "acid-properties", "ACID Properties", {
        contentDir: "ch08/73-acid-properties",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788935925/ltv-t-sql/ch08-73-acid-properties.mp4",
        durationLabel: "1 min 34 s",
      }),
      L(74, "lock-types", "Lock Types", {
        contentDir: "ch08/74-lock-types",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788936071/ltv-t-sql/ch08-74-lock-types.mp4",
        durationLabel: "1 min 49 s",
      }),
      L(75, "concurrency-blocking", "Concurrency and Blocking", {
        contentDir: "ch08/75-concurrency-blocking",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788936227/ltv-t-sql/ch08-75-concurrency-blocking.mp4",
        durationLabel: "2 min 6 s",
      }),
      L(76, "try-catch", "TRY/CATCH Error Handling", {
        contentDir: "ch08/76-try-catch",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788936399/ltv-t-sql/ch08-76-try-catch.mp4",
        durationLabel: "2 min 1 s",
      }),
      L(77, "raiserror-throw", "RAISERROR and THROW", {
        contentDir: "ch08/77-raiserror-throw",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788936563/ltv-t-sql/ch08-77-raiserror-throw.mp4",
        durationLabel: "2 min 5 s",
      }),
      L(78, "auth-modes", "SQL Server Authentication Modes", {
        contentDir: "ch08/78-auth-modes",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788936732/ltv-t-sql/ch08-78-auth-modes.mp4",
        durationLabel: "2 min 11 s",
      }),
    ],
  },
  {
    n: 9,
    title: "Window and Ranking Functions",
    lessons: [
      L(79, "over-partition-by", "OVER() and PARTITION BY", {
        contentDir: "ch09/79-over-partition-by",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788936906/ltv-t-sql/ch09-79-over-partition-by.mp4",
        durationLabel: "2 min 9 s",
      }),
      L(80, "row-number", "ROW_NUMBER", {
        contentDir: "ch09/80-row-number",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788937062/ltv-t-sql/ch09-80-row-number.mp4",
        durationLabel: "2 min 10 s",
      }),
      L(81, "rank-dense-rank", "RANK and DENSE_RANK", {
        contentDir: "ch09/81-rank-dense-rank",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788937231/ltv-t-sql/ch09-81-rank-dense-rank.mp4",
        durationLabel: "2 min 27 s",
      }),
      L(82, "ntile", "NTILE", {
        contentDir: "ch09/82-ntile",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788937403/ltv-t-sql/ch09-82-ntile.mp4",
        durationLabel: "2 min 36 s",
      }),
    ],
  },
  {
    n: 10,
    title: "Performance Tuning",
    lessons: [
      L(83, "what-is-performance-tuning", "What Is Query Performance Tuning?", {
        contentDir: "ch10/83-what-is-performance-tuning",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788937580/ltv-t-sql/ch10-83-what-is-performance-tuning.mp4",
        durationLabel: "2 min 18 s",
      }),
      L(84, "cartesian-product", "The Cartesian Product: What Happens When Joins Go Wrong", {
        contentDir: "ch10/84-cartesian-product",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788937762/ltv-t-sql/ch10-84-cartesian-product.mp4",
        durationLabel: "2 min 20 s",
      }),
      L(85, "joins-vs-subqueries", "Joins vs. Subqueries: Which Is Faster, and Why", {
        contentDir: "ch10/85-joins-vs-subqueries",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788937954/ltv-t-sql/ch10-85-joins-vs-subqueries.mp4",
        durationLabel: "2 min 21 s",
      }),
      L(86, "exists-vs-in-vs-join", "EXISTS vs. IN vs. JOIN for Existence Checks", {
        contentDir: "ch10/86-exists-vs-in-vs-join",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788938145/ltv-t-sql/ch10-86-exists-vs-in-vs-join.mp4",
        durationLabel: "2 min 18 s",
      }),
      L(87, "sargable-predicates", "SARGable vs. Non-SARGable WHERE Clauses", {
        contentDir: "ch10/87-sargable-predicates",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788938321/ltv-t-sql/ch10-87-sargable-predicates.mp4",
        durationLabel: "2 min 20 s",
      }),
      L(88, "clustered-vs-nonclustered", "Clustered vs. Nonclustered Indexes: Choosing Wisely", {
        contentDir: "ch10/88-clustered-vs-nonclustered",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788938495/ltv-t-sql/ch10-88-clustered-vs-nonclustered.mp4",
        durationLabel: "2 min 23 s",
      }),
      L(89, "filtered-included-indexes", "Filtered Indexes and Included Columns", {
        contentDir: "ch10/89-filtered-included-indexes",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788938659/ltv-t-sql/ch10-89-filtered-included-indexes.mp4",
        durationLabel: "2 min 8 s",
      }),
      L(90, "execution-plans", "Reading Execution Plans: Scans vs. Seeks", {
        contentDir: "ch10/90-execution-plans",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788939159/ltv-t-sql/ch10-90-execution-plans.mp4",
        durationLabel: "2 min 15 s",
      }),
      L(91, "set-statistics-time-io", "SET STATISTICS TIME and IO in Practice", {
        contentDir: "ch10/91-set-statistics-time-io",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788939349/ltv-t-sql/ch10-91-statistics-time-io.mp4",
        durationLabel: "2 min 10 s",
      }),
      L(92, "set-statistics-profile-xml", "SET STATISTICS PROFILE and XML", {
        contentDir: "ch10/92-set-statistics-profile-xml",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788939553/ltv-t-sql/ch10-92-set-statistics-profile-xml.mp4",
        durationLabel: "1 min 58 s",
      }),
      L(93, "temp-tables-vs-variables-vs-ctes", "Temp Tables vs. Table Variables vs. CTEs: Performance Tradeoffs", {
        contentDir: "ch10/93-temp-tables-vs-variables-vs-ctes",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788939737/ltv-t-sql/ch10-93-temp-tables-vs-variables-vs-ctes.mp4",
        durationLabel: "2 min 25 s",
      }),
      L(94, "performance-anti-patterns", "Common T-SQL Performance Anti-Patterns", {
        contentDir: "ch10/94-performance-anti-patterns",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788939933/ltv-t-sql/ch10-94-performance-anti-patterns.mp4",
        durationLabel: "2 min 41 s",
      }),
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
