# Lesson 85 — Window Frames: ROWS vs. RANGE

**Chapter 10 · Window and Ranking Functions · Lesson 7 of 8**

## What you'll learn

- The frame clause — exactly which rows a window function includes
- `ROWS` — counting physical rows
- `RANGE` — counting by logical value, including ties
- The common frame boundaries: `UNBOUNDED PRECEDING`, `CURRENT ROW`,
  `N PRECEDING/FOLLOWING`, `UNBOUNDED FOLLOWING`

## What the frame clause actually controls

Last lesson's `LAST_VALUE` gotcha came down to one thing: the **frame**.
The frame clause — `ROWS BETWEEN ... AND ...` or
`RANGE BETWEEN ... AND ...` — controls exactly **which rows within the
current partition** are included in the window function's calculation,
relative to the current row. Everything in this chapter so far has used
the default frame without naming it; now it's time to control it
directly.

## The frame boundaries

Both `ROWS` and `RANGE` use the same boundary vocabulary:

| Boundary | Meaning |
|---|---|
| `UNBOUNDED PRECEDING` | Start of the partition |
| `N PRECEDING` | `N` rows/values before the current one |
| `CURRENT ROW` | The current row itself |
| `N FOLLOWING` | `N` rows/values after the current one |
| `UNBOUNDED FOLLOWING` | End of the partition |

A frame is always written as `BETWEEN <start> AND <end>`.

## ROWS — counting physical rows

```sql
USE AdventureWorks2012;
GO

SELECT OrderDate, TotalDue,
       SUM(TotalDue) OVER (
         ORDER BY OrderDate
         ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
       ) AS SumOfLast3Rows
FROM Sales.SalesOrderHeader;
```

`ROWS BETWEEN 2 PRECEDING AND CURRENT ROW` counts **physical rows**: the
two rows immediately before the current one, plus the current row
itself — three rows total, always, regardless of what values they
contain. `ROWS` doesn't care whether `OrderDate` repeats; it only counts
positions in the ordered sequence.

## RANGE — counting by logical value, including ties

```sql
SELECT OrderDate, TotalDue,
       SUM(TotalDue) OVER (
         ORDER BY OrderDate
         RANGE BETWEEN CURRENT ROW AND CURRENT ROW
       ) AS SumOfRowsWithSameDate
FROM Sales.SalesOrderHeader;
```

`RANGE` works on the **logical value** in the `ORDER BY` column instead
of physical position. `RANGE BETWEEN CURRENT ROW AND CURRENT ROW` means
"every row whose `OrderDate` **equals** the current row's `OrderDate`" —
if three different orders share the exact same `OrderDate`, all three are
**peers**, and `RANGE` includes all of them in every one of their frames,
not just the single current row. This is the surprise `RANGE` springs on
people: it treats tied rows as a group, not as individual positions.

## Why this matters for LAST_VALUE

The default frame from Lesson 84 — `RANGE BETWEEN UNBOUNDED PRECEDING AND
CURRENT ROW` — uses `RANGE`, which is exactly why rows with a **tied**
`ORDER BY` value all see each other as "current." Switching to
`ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING`, as that
lesson did, swaps to counting physical rows across the **whole**
partition, sidestepping the tie behavior entirely.

## Choosing between them

Reach for `ROWS` almost all the time — it's predictable, it's what
running totals and moving averages (next lesson) are built from, and it
doesn't surprise you with tie behavior. Reach for `RANGE` only when you
specifically want tied `ORDER BY` values treated as one logical group.

## Key terms

| Term | Meaning |
|---|---|
| Frame clause | `ROWS`/`RANGE BETWEEN <start> AND <end>` — controls which rows are included |
| `ROWS` | Counts physical row positions |
| `RANGE` | Counts by logical ORDER BY value, grouping tied rows together |
| `UNBOUNDED PRECEDING`/`FOLLOWING` | Start/end of the partition |

## Lab

Run this against AdventureWorks2012 and compare the two sums:

```sql
SELECT OrderDate, TotalDue,
       SUM(TotalDue) OVER (
         ORDER BY OrderDate
         ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
       ) AS ByPhysicalRows,
       SUM(TotalDue) OVER (
         ORDER BY OrderDate
         RANGE BETWEEN 2 PRECEDING AND CURRENT ROW
       ) AS ByLogicalValue
FROM Sales.SalesOrderHeader
ORDER BY OrderDate;
```

## Check yourself

You're ready for Lesson 86 when you can answer, without looking: what's
the difference between how `ROWS` and `RANGE` decide which rows belong to
the current frame, and why does that difference matter for tied
`ORDER BY` values?
