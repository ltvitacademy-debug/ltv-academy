# Lesson 18 — Writing SQL Data Quality Checks

**Chapter 4 · Rules and Checks · Lesson 18 of 30**

## What you'll learn

- The standard anatomy of a data quality check query, step by step
- How to connect, open a query window, and run a check in SSMS
- How to combine several rules into a single "failures" report with
  `UNION ALL`
- Practical best practices: keeping checks read-only, fast, and safe
  to run against production

## Connecting and opening a query window

Every check in this course runs the same way: connect to a server in
Object Explorer, open a New Query window against the right database,
write the check, run it, read the grid.

![SQL Server Management Studio's Object Explorer panel with the Connect menu open, showing Database Engine highlighted as the connection option.](/courses/data-quality-management/ch04/18-writing-sql-data-quality-checks/connect-object-explorer.png)
*Connect → Database Engine — the first step for every check session, real or scripted.*

![SQL Server Management Studio with a right-click context menu open on a connected server in Object Explorer, with New Query highlighted.](/courses/data-quality-management/ch04/18-writing-sql-data-quality-checks/new-query.png)
*Right-click the connected server (or use the toolbar) → New Query opens an editor against that connection.*

## The anatomy of a check query

Nearly every data quality check follows the same shape:

```sql
SELECT <key columns, enough to identify the bad row>
FROM <table>
WHERE <condition that is TRUE only when the row is BAD>
ORDER BY <something useful for triage>;
```

The one habit worth building early: **write the `WHERE` clause for
the failure, not the success.** You're not selecting good rows — you're
selecting the rows that need attention. It reads backward from how
most people first learn `SELECT`, and it's worth the adjustment.

```sql
-- RULE: ORD-002 — OrderTotal must be positive
SELECT OrderId, CustomerId, OrderTotal
FROM dbo.Orders
WHERE OrderTotal <= 0
ORDER BY OrderTotal ASC;
```

## Running it

Click **Execute** (or `F5`) to run the query against the connected
database.

![SQL Server Management Studio toolbar with the Execute button highlighted, above a query editor showing a CREATE DATABASE script.](/courses/data-quality-management/ch04/18-writing-sql-data-quality-checks/execute.png)
*Execute (or F5) — runs the whole script, check included, against the connected server.*

## Combining multiple checks into one report

A single check is useful. A **failures report** — every rule's
violations, in one result set, labeled by which rule fired — is what
you actually want to run and review daily. `UNION ALL` is the
workhorse:

```sql
SELECT 'ORD-002: OrderTotal must be positive' AS RuleName,
       CAST(OrderId AS VARCHAR(20)) AS RecordKey
FROM dbo.Orders
WHERE OrderTotal <= 0

UNION ALL

SELECT 'CUST-004: Email must be present and well-formed',
       CAST(CustomerId AS VARCHAR(20))
FROM dbo.Customers
WHERE Email IS NULL OR Email NOT LIKE '%_@_%._%'

UNION ALL

SELECT 'INV-001: Quantity must be non-negative',
       CAST(ProductId AS VARCHAR(20))
FROM dbo.Inventory
WHERE Quantity < 0;
```

Each branch of the `UNION ALL` is one rule from Lesson 17, reduced to
two consistent columns: which rule failed, and the key of the row that
failed it. Run this once and you get a single, scannable failures list
spanning every table you check.

![SQL Server Management Studio results grid displaying four rows of query output with column headers.](/courses/data-quality-management/ch04/18-writing-sql-data-quality-checks/query-results.png)
*A real SSMS results grid — a combined failures report reads exactly like this: one row per violation, labeled by rule.*

## Best practices for writing checks

- **Keep checks read-only.** A check queries; it never updates or
  deletes. Remediation (Chapter 5) is a separate, deliberate step.
- **Make `WHERE` clauses SARGable** where you can — avoid wrapping the
  indexed column itself in a function (`WHERE YEAR(OrderDate) = 2024`
  can't use an index on `OrderDate`; `WHERE OrderDate >= '2024-01-01'
  AND OrderDate < '2025-01-01'` can).
- **Cast consistently** when `UNION ALL`-ing keys of different types
  (`OrderId` might be `INT`, `CustomerId` might already be `VARCHAR`)
  — mismatched types across `UNION` branches raise an error or force
  an implicit, sometimes slow, conversion.
- **Schedule heavy checks outside business hours** once they're
  automated (Lesson 22) — a full-table scan check run hourly during
  checkout traffic is its own incident waiting to happen.

## Key terms

| Term | Meaning |
|---|---|
| Failures report | A single result set combining multiple rules' violations via UNION ALL |
| SARGable | A WHERE condition written so the query engine can use an index on it |
| Read-only check | A check query that only selects data, never modifies it |

## Lab

1. Write three separate single-rule check queries against any tables
   you have (or test tables you create), each following the
   `SELECT key FROM table WHERE <bad condition>` anatomy.
2. Combine all three into one `UNION ALL` failures report with a
   `RuleName` and `RecordKey` column, matching the pattern shown
   above.
3. Run it, and note in a comment how many total failures came back
   across all three rules.

## Check yourself

- Why does the lesson recommend writing the `WHERE` clause for the
  failure condition, not the success condition?
- What problem does casting every `RecordKey` to the same type solve
  in a `UNION ALL` failures report?
- Name one SARGable and one non-SARGable way to write the same date
  filter.
