# Lesson 7 — Profiling With SQL

**Chapter 2 · Profiling · Lesson 7 of 30**

## What you'll learn

- The exact SSMS workflow for writing and running a profiling query
- The foundational `COUNT` / `COUNT(DISTINCT)` pattern every profiling
  query builds on
- How to profile NULLs across several columns in a single query
- How to turn a raw profiling result into a percentage a human can act on

## The mechanics: new query, execute, read results

Lesson 6 introduced SSMS's two panels — Object Explorer and the Query
Editor. Every profiling query in this chapter follows the same three-step
loop:

1. **Open a New Query.** Right-click a server or database in Object
   Explorer and choose **New Query** (or use the toolbar button), which
   opens a fresh Query Editor tab pointed at that database.

   ![SQL Server Management Studio's Object Explorer with a server right-clicked, showing a context menu with New Query highlighted.](/courses/data-quality-management/ch02/07-profiling-with-sql/new-query.png)
   *Right-click a server or database and choose New Query — this is how every profiling query in this chapter gets started.*

2. **Write the query, then Execute.** Type the T-SQL into the editor
   and click **Execute** (or press F5) to run it against the connected
   database.

   ![SQL Server Management Studio's toolbar with the Execute button highlighted, and a query editor showing a CREATE DATABASE script.](/courses/data-quality-management/ch02/07-profiling-with-sql/execute.png)
   *Click Execute (or press F5) to run the query that's currently in the editor.*

3. **Read the Results grid.** The output appears below the query as a
   grid — this is where every profiling number in this chapter actually
   shows up.

   ![SQL Server Management Studio's query editor and Results grid showing a SELECT * query against a Customers table, with CustomerId, Name, Location, and Email columns.](/courses/data-quality-management/ch02/07-profiling-with-sql/query-results.png)
   *SQL Server Management Studio's query editor and results grid — profiling output lands here the same way any query's output does.*

(These three screenshots show SSMS's general query workflow, not the
literal output of the profiling queries below — the mechanics are
identical regardless of what query you run.)

## The foundational pattern: COUNT and COUNT(DISTINCT)

Nearly every profiling query starts from the same two building blocks:
`COUNT(*)` for the total row count, and `COUNT(DISTINCT column)` for how
many unique values exist. Against a `Sales.Customer` table (the kind of
schema this course uses, consistent with AdventureWorks-style examples
elsewhere in this catalog):

```sql
SELECT
    COUNT(*)                        AS total_rows,
    COUNT(DISTINCT CustomerID)      AS distinct_customers,
    COUNT(DISTINCT EmailAddress)    AS distinct_emails
FROM Sales.Customer;
```

If `total_rows` and `distinct_customers` don't match, you already know
something Lesson 15 (Uniqueness) will care about — more rows than
unique customer IDs usually means duplicates, unless `CustomerID` is
genuinely allowed to repeat for a legitimate reason (such as multiple
addresses per customer, which the schema would need to explain).

## Profiling NULLs across several columns at once

A single query can profile the NULL rate of every column you care about
at the same time using `SUM(CASE WHEN ... THEN 1 ELSE 0 END)`:

```sql
SELECT
    COUNT(*)                                                   AS total_rows,
    SUM(CASE WHEN EmailAddress IS NULL THEN 1 ELSE 0 END)      AS null_emails,
    SUM(CASE WHEN Phone IS NULL THEN 1 ELSE 0 END)             AS null_phones,
    SUM(CASE WHEN PersonID IS NULL THEN 1 ELSE 0 END)          AS null_person_id
FROM Sales.Customer;
```

This single result row gives you a NULL count for three columns side by
side — exactly the kind of quick, wide profiling pass you'd run first on
an unfamiliar table, before drilling into any one column (Lesson 8
picks that up).

## Turning counts into a percentage

Raw counts are useful, but a NULL rate as a percentage is what actually
gets compared against a threshold in Chapter 4. Multiply by `100.0` (not
`100`) to force decimal division in T-SQL, since integer division would
otherwise silently truncate the result to zero:

```sql
SELECT
    COUNT(*) AS total_rows,
    SUM(CASE WHEN EmailAddress IS NULL THEN 1 ELSE 0 END) AS null_emails,
    CAST(
        100.0 * SUM(CASE WHEN EmailAddress IS NULL THEN 1 ELSE 0 END)
        / COUNT(*)
    AS DECIMAL(5,2)) AS null_email_pct
FROM Sales.Customer;
```

That `null_email_pct` column is the number a data steward (Lesson 4)
would actually look at when deciding whether this column's quality is
acceptable.

## Key terms

| Term | Meaning |
|---|---|
| `COUNT(*)` | Total number of rows, including NULLs |
| `COUNT(DISTINCT col)` | Number of unique, non-NULL values in a column |
| Results grid | SSMS's panel where query output (including profiling results) appears |
| Integer division | T-SQL's default behavior when dividing two integer columns — truncates decimals unless you force a decimal type |

## Lab

1. In SSMS, connect to any SQL Server instance you have access to (or
   a local AdventureWorks/Northwind install, consistent with this
   catalog's SQL labs).
2. Open a New Query and run a `COUNT(*)` / `COUNT(DISTINCT ...)` query
   against any table with a supposed primary identifier column.
3. Extend the query to profile the NULL rate of two more columns in the
   same table, using the `SUM(CASE WHEN ... )` pattern above.
4. Convert one of those NULL counts into a percentage using
   `100.0 * ... / COUNT(*)`, and note whether the result surprises you
   compared to what you expected.

## Check yourself

Without looking back, can you write the `SUM(CASE WHEN col IS NULL
THEN 1 ELSE 0 END)` pattern from memory, and explain why `100.0` is
used instead of `100` when calculating a percentage in T-SQL? If yes,
you're ready for Lesson 8's deeper column-level profiling techniques.
