# Lesson 84 — FIRST_VALUE and LAST_VALUE

**Chapter 10 · Window and Ranking Functions · Lesson 6 of 8**

## What you'll learn

- `FIRST_VALUE()` — the first value in the window frame
- `LAST_VALUE()` — the last value in the window frame
- The single most common `LAST_VALUE` mistake, and how to avoid it
- Why the default frame is the root cause

## FIRST_VALUE — the first row of the window

```sql
USE AdventureWorks2012;
GO

SELECT Name, Color, ListPrice,
       FIRST_VALUE(Name) OVER (PARTITION BY Color ORDER BY ListPrice DESC) AS MostExpensiveInColor
FROM Production.Product;
```

`FIRST_VALUE(Name)` returns the `Name` of the **first row** in each
window, according to the `ORDER BY` inside `OVER()`. Here that's the most
expensive product name **for that color** — attached to every row in the
partition, not just the first one.

## LAST_VALUE — the mistake almost everyone makes first

```sql
SELECT Name, Color, ListPrice,
       LAST_VALUE(Name) OVER (PARTITION BY Color ORDER BY ListPrice DESC) AS SupposedlyCheapestInColor
FROM Production.Product;
```

This looks like the mirror image of `FIRST_VALUE` — but run it, and
`SupposedlyCheapestInColor` is almost always just **the current row's own
name**, not the actual last row of the partition. This is the single most
common `LAST_VALUE` mistake, and it's not a bug — it's the default frame
doing exactly what it's defined to do.

## Why: the default frame only sees up to the current row

Every window function has a **frame** (covered properly next lesson), and
when you add an `ORDER BY` inside `OVER()` without specifying one, SQL
Server applies a default frame of
`RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`. That phrase means
"everything from the start of the partition **up to and including the
current row**" — so from the point of view of `LAST_VALUE`, the "last"
row it can see **is** the current row, every single time.

## The fix: an explicit frame that sees the whole partition

```sql
SELECT Name, Color, ListPrice,
       LAST_VALUE(Name) OVER (
         PARTITION BY Color ORDER BY ListPrice DESC
         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
       ) AS CheapestInColor
FROM Production.Product;
```

Adding `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING`
explicitly tells SQL Server the frame is the **entire partition** —
everything before the current row **and** everything after it. Now
`LAST_VALUE` actually returns the cheapest product name in that color,
every time, instead of silently repeating the current row.

## FIRST_VALUE doesn't have this problem

`FIRST_VALUE` works correctly with the default frame because the first
row of the partition is **always** included in "start of partition up to
current row" — there's no case where the real first value falls outside
that default window. `LAST_VALUE` is the one that needs the explicit
frame, precisely because the true last row usually falls **outside** the
default frame's reach.

## Key terms

| Term | Meaning |
|---|---|
| `FIRST_VALUE(col)` | Returns the first value in the window frame |
| `LAST_VALUE(col)` | Returns the last value in the window frame |
| Default frame | `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` — applied automatically with `ORDER BY` |
| `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING` | Explicit frame covering the whole partition, needed for a correct `LAST_VALUE` |

## Lab

Run this against AdventureWorks2012, and compare the two `LAST_VALUE`
columns:

```sql
SELECT Name, Color, ListPrice,
       FIRST_VALUE(Name) OVER (PARTITION BY Color ORDER BY ListPrice DESC) AS MostExpensiveInColor,
       LAST_VALUE(Name) OVER (PARTITION BY Color ORDER BY ListPrice DESC) AS WrongDefaultFrame,
       LAST_VALUE(Name) OVER (
         PARTITION BY Color ORDER BY ListPrice DESC
         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
       ) AS CorrectExplicitFrame
FROM Production.Product;
```

## Check yourself

You're ready for Lesson 85 when you can answer, without looking: why does
`LAST_VALUE` with the default frame usually just return the current row's
own value, and what frame fixes it?
