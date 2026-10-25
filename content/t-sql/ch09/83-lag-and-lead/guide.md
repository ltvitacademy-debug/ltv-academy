# Lesson 83 — LAG and LEAD

**Chapter 10 · Window and Ranking Functions · Lesson 5 of 8**

## What you'll learn

- `LAG()` — reach back to a previous row without a self-join
- `LEAD()` — reach forward to a following row the same way
- The `offset` and `default` arguments
- A real month-over-month comparison against AdventureWorks2012

## The problem: comparing a row to its neighbor

Before window functions, comparing each row to the row before it meant a
**self-join** — joining a table to itself on some "one less than the
current key" condition, which is awkward and easy to get wrong. `LAG()`
and `LEAD()` solve this directly: they reach into a neighboring row
**within the current window** and pull a value from it, with no join at
all.

## LAG — look at the previous row

```sql
USE AdventureWorks2012;
GO

SELECT OrderDate, TotalDue,
       LAG(TotalDue) OVER (ORDER BY OrderDate) AS PreviousOrderTotalDue
FROM Sales.SalesOrderHeader;
```

For every row, `LAG(TotalDue)` returns the `TotalDue` value from the row
**immediately before it**, according to the `ORDER BY` inside `OVER()`.
The current row's own `TotalDue` is untouched — this is a second column
showing what came before it.

## LEAD — look at the following row

```sql
SELECT OrderDate, TotalDue,
       LEAD(TotalDue) OVER (ORDER BY OrderDate) AS NextOrderTotalDue
FROM Sales.SalesOrderHeader;
```

`LEAD()` is the mirror image of `LAG()` — it reaches **forward** to the
next row instead of back. Same syntax, opposite direction.

## The offset and default arguments

Both functions take two optional arguments: `LAG(column, offset,
default)`.

- `offset` — how many rows back (or forward, for `LEAD`) to reach. It
  defaults to `1`, meaning the immediately previous/next row.
- `default` — what to return when there's no such row. The very first
  row has no previous row for `LAG`, and the very last row has no next
  row for `LEAD` — without a `default`, both return `NULL` there.

```sql
SELECT OrderDate, TotalDue,
       LAG(TotalDue, 1, 0) OVER (ORDER BY OrderDate) AS PreviousOrDefaultZero,
       LAG(TotalDue, 2) OVER (ORDER BY OrderDate) AS TwoOrdersBack
FROM Sales.SalesOrderHeader;
```

The first query substitutes `0` instead of `NULL` for the very first
row. The second reaches back **two** rows instead of one, using the
`offset` argument — and still returns `NULL` for the first two rows,
because it has no `default` supplied.

## Putting it to work: a real row-over-row comparison

```sql
SELECT OrderDate, TotalDue,
       TotalDue - LAG(TotalDue) OVER (ORDER BY OrderDate) AS ChangeFromPreviousOrder
FROM Sales.SalesOrderHeader;
```

This is the classic use case: subtracting the previous row's value from
the current row's value, in a single pass, with no self-join. `PARTITION
BY` (Lesson 79) still works exactly the same way here — add it to compare
each row to the previous row **within its own group** instead of across
the whole table.

## Key terms

| Term | Meaning |
|---|---|
| `LAG(col, offset, default)` | Returns a value from a previous row relative to the current one |
| `LEAD(col, offset, default)` | Returns a value from a following row relative to the current one |
| `offset` | How many rows back/forward to reach; defaults to `1` |
| `default` | Value returned when no such row exists; defaults to `NULL` |

## Lab

Run this against AdventureWorks2012:

```sql
SELECT OrderDate, TotalDue,
       LAG(TotalDue) OVER (ORDER BY OrderDate) AS PreviousOrderTotalDue,
       LEAD(TotalDue) OVER (ORDER BY OrderDate) AS NextOrderTotalDue,
       TotalDue - LAG(TotalDue) OVER (ORDER BY OrderDate) AS ChangeFromPreviousOrder
FROM Sales.SalesOrderHeader
ORDER BY OrderDate;
```

## Check yourself

You're ready for Lesson 84 when you can answer, without looking: what
direction does `LAG()` look relative to the current row, what direction
does `LEAD()` look, and what does the `default` argument control?
