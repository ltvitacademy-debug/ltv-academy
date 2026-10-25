# Lesson 86 — Running Totals and Moving Averages

**Chapter 10 · Window and Ranking Functions · Lesson 8 of 8**

## What you'll learn

- A running total, built with `SUM()` and an explicit frame
- A moving average, built with `AVG()` and a sliding frame
- Why `ROWS` is the right choice for both
- Wrapping up Chapter 10

## The payoff lesson

Everything in this chapter has been building toward this: `OVER()` and
`PARTITION BY` (Lesson 79), `LAG`/`LEAD` (Lesson 83), and the frame
clause (Lesson 85) combine to solve two of the most common real-world
reporting requests — a **running total** and a **moving average** —
without a single self-join, cursor, or temp table.

## Running total

```sql
USE AdventureWorks2012;
GO

SELECT OrderDate, TotalDue,
       SUM(TotalDue) OVER (
         ORDER BY OrderDate
         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS RunningTotalDue
FROM Sales.SalesOrderHeader;
```

`ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` means "every row from
the start of the result set up to and including the current row." For
each order, `SUM(TotalDue)` adds up every `TotalDue` value **so far**,
ordered by `OrderDate` — a running total, one query, no loop.

This is actually the **same frame** as the default frame from Lesson 84
(`RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`) — just written
explicitly with `ROWS` instead of left implicit with `RANGE`. Writing it
out explicitly, as here, avoids the tie behavior `RANGE` would otherwise
introduce if two orders shared the exact same `OrderDate`.

## Moving average

```sql
SELECT OrderDate, TotalDue,
       AVG(TotalDue) OVER (
         ORDER BY OrderDate
         ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
       ) AS SevenRowMovingAverage
FROM Sales.SalesOrderHeader;
```

A moving average is a running total's sliding cousin: instead of growing
to include every row from the start, the frame **slides along** with the
current row, always covering a **fixed** number of rows.
`ROWS BETWEEN 6 PRECEDING AND CURRENT ROW` covers the current row plus
the 6 before it — 7 rows total — so this is a 7-row moving average of
`TotalDue`.

## Combining with PARTITION BY

```sql
SELECT SalesPersonID, OrderDate, TotalDue,
       SUM(TotalDue) OVER (
         PARTITION BY SalesPersonID
         ORDER BY OrderDate
         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS RunningTotalPerSalesPerson
FROM Sales.SalesOrderHeader
WHERE SalesPersonID IS NOT NULL;
```

Exactly like every other window function in this chapter, adding
`PARTITION BY` scopes the running total to **restart at zero for each
salesperson**, instead of accumulating across the whole table.

## Why ROWS, not RANGE

Both running totals and moving averages need a frame measured in
**physical rows** — "the last 7 rows," not "every row sharing the same
value." `RANGE` would behave unpredictably the moment two rows tied on
the `ORDER BY` column, silently pulling extra rows into the sum or
average. This is exactly the guidance from Lesson 85: reach for `ROWS`
for predictable, physical-position calculations like these.

## Chapter 10 recap

Chapter 10 built a complete toolkit: `OVER()`/`PARTITION BY` as the
foundation, `ROW_NUMBER()`/`RANK()`/`DENSE_RANK()`/`NTILE()` for ranking
and bucketing, `LAG()`/`LEAD()` for comparing neighboring rows,
`FIRST_VALUE()`/`LAST_VALUE()` for the edges of a window, the frame
clause for controlling exactly which rows are included, and now running
totals and moving averages tying it all together. Chapter 11 moves into
Performance Tuning — execution plans, indexes, and the comparative
topics (joins vs. subqueries, `EXISTS` vs. `IN`) that look at everything
you've learned so far from a speed perspective.

## Key terms

| Term | Meaning |
|---|---|
| Running total | `SUM()` with `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` |
| Moving average | `AVG()` with `ROWS BETWEEN N PRECEDING AND CURRENT ROW` |

## Lab

Run this against AdventureWorks2012:

```sql
SELECT OrderDate, TotalDue,
       SUM(TotalDue) OVER (
         ORDER BY OrderDate
         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS RunningTotalDue,
       AVG(TotalDue) OVER (
         ORDER BY OrderDate
         ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
       ) AS SevenRowMovingAverage
FROM Sales.SalesOrderHeader
ORDER BY OrderDate;
```

## Check yourself

You're ready for Chapter 11 when you can answer, without looking: what
frame turns `SUM()` into a running total, what frame turns `AVG()` into a
moving average, and why is `ROWS` the right choice for both instead of
`RANGE`?
