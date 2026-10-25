# Lesson 24 — Window Functions: What's Standard, What's Not

**Chapter 4 · Joins, Subqueries & Set Operations · Lesson 5 of 5**

## What you'll learn

- Why window functions are one of the MORE portable areas of modern SQL
- `ROW_NUMBER`, `RANK`, `DENSE_RANK`, and the `OVER`/`PARTITION BY`/`ORDER BY` syntax everywhere
- `LAG`/`LEAD` and aggregates-as-window-functions, also consistent
- Where small, real differences still exist: default frames and advanced frame syntax

## The SQL:2003 standard did its job here

Window functions were standardized in SQL:2003, and — unlike the procedural extensions you'll
meet in the next chapter — vendors actually implemented the standard closely. The result: this
is genuinely one of the more portable corners of SQL across T-SQL, Oracle, MySQL (8.0+), and
PostgreSQL.

```sql
-- T-SQL — ranking within groups
SELECT
  SalesPersonID,
  OrderDate,
  TotalDue,
  ROW_NUMBER() OVER (PARTITION BY SalesPersonID ORDER BY OrderDate DESC) AS RecencyRank,
  RANK()       OVER (PARTITION BY SalesPersonID ORDER BY TotalDue DESC)  AS SalesRank,
  DENSE_RANK() OVER (PARTITION BY SalesPersonID ORDER BY TotalDue DESC)  AS SalesDenseRank
FROM Sales.SalesOrderHeader;
```

```sql
-- Oracle, MySQL 8.0+, PostgreSQL — same functions, same OVER/PARTITION BY/ORDER BY syntax
SELECT
  sales_person_id,
  order_date,
  total_due,
  ROW_NUMBER() OVER (PARTITION BY sales_person_id ORDER BY order_date DESC) AS recency_rank,
  RANK()       OVER (PARTITION BY sales_person_id ORDER BY total_due DESC)  AS sales_rank,
  DENSE_RANK() OVER (PARTITION BY sales_person_id ORDER BY total_due DESC)  AS sales_dense_rank
FROM sales_order_header;
```

The only difference between those two queries is identifier casing convention — not syntax.

## LAG/LEAD and aggregates as window functions

`LAG` and `LEAD` (reaching to a previous or following row within the same partition) and using
an aggregate function like `SUM` or `AVG` as a window function instead of a `GROUP BY` aggregate
are both part of the same standard, and both are equally consistent:

```sql
-- Identical shape across T-SQL, Oracle, MySQL 8.0+, PostgreSQL
SELECT
  OrderDate,
  TotalDue,
  LAG(TotalDue)  OVER (ORDER BY OrderDate) AS PreviousOrderTotal,
  LEAD(TotalDue) OVER (ORDER BY OrderDate) AS NextOrderTotal,
  SUM(TotalDue)  OVER (ORDER BY OrderDate) AS RunningTotal
FROM Sales.SalesOrderHeader;
```

A running total, a month-over-month comparison, a top-N-per-group query — all of this transfers
directly from your T-SQL knowledge with no new concepts, on every platform in this course.

## Where the small, real differences live

The core mental model is fully portable, but two areas have minor platform-specific variation
worth knowing about, so you're not caught off guard:

- **Default frame behavior**: when no explicit frame clause (`ROWS BETWEEN ...` / `RANGE
  BETWEEN ...`) is given, the default frame an aggregate window function uses can differ subtly
  between platforms in edge cases involving ties in the `ORDER BY`.
- **Advanced frame clause syntax**: features like named windows (`WINDOW w AS (...)`, a
  PostgreSQL/MySQL convenience not in T-SQL) and some of the newer frame-exclusion options
  (`EXCLUDE CURRENT ROW`, etc.) vary in exactly which platform supports which extension.

Neither of these affects the core, everyday usage shown above — they only matter once you're
writing unusually precise running-total or frame-based logic.

## Why this matters going into the next chapter

This chapter closes on a genuinely reassuring note: the SQL *language* for querying — joins,
CTEs, set operations, window functions — is largely one shared vocabulary with a few naming
quirks. The next chapter is a sharp contrast: procedural SQL (stored procedures, control flow,
error handling) never got fully standardized, which is exactly why T-SQL and PL/SQL look so
different from each other. Window functions are about as portable as this course gets.

## Key terms

| Term | Meaning |
|---|---|
| Window function | A function that operates across a set of rows related to the current row, without collapsing them into groups |
| `PARTITION BY` | Divides rows into groups the window function operates on separately |
| `ROW_NUMBER` / `RANK` / `DENSE_RANK` | Standard ranking functions, identical syntax across all four dialects |
| `LAG` / `LEAD` | Reach to a previous/following row within the same partition |

## Lab

Write a query against any of the four dialects that returns, per salesperson, a running total
of `TotalDue` ordered by `OrderDate`, plus the previous order's total using `LAG`. Confirm the
syntax needs zero changes if you port it to a different one of the four dialects.

## Check yourself

You're ready for Lesson 25 when you can answer, without looking: which SQL standard
standardized window functions, which four functions from this lesson are identical across all
four dialects, and what two areas still have minor platform-specific variation?
