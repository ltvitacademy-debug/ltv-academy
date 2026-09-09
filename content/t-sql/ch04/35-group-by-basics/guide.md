# Lesson 35 — GROUP BY Basics

**Chapter 4 · Grouping and Aggregating · Lesson 4 of 9**

## What you'll learn

- `GROUP BY` — aggregating within groups instead of the whole table
- Why every non-aggregated column in `SELECT` must appear in `GROUP BY`
- The mental model: split, aggregate, combine

## The problem: one number isn't enough

Every aggregate function so far has produced **one** number for the
**entire table**. But a much more common real question is "one number
**per group**" — the average price **per color**, not one average for
everything:

```sql
USE AdventureWorks2012;
GO

SELECT Color, AVG(ListPrice) AS AveragePrice
FROM Production.Product
GROUP BY Color;
```

## How GROUP BY works: split, aggregate, combine

Think of `GROUP BY Color` in three steps:

1. **Split** the table into groups — one group per distinct `Color` value.
2. **Aggregate** within each group separately — `AVG(ListPrice)` runs once
   per group, not once overall.
3. **Combine** the results into one row per group.

The result has exactly one row per distinct value of `Color` — the same
number of rows `SELECT DISTINCT Color` (Lesson 9) would return.

## The rule: non-aggregated columns must be in GROUP BY

This is the single most important rule about `GROUP BY`, and the source of
most beginner errors:

```sql
-- ERROR: Name isn't aggregated and isn't in GROUP BY
SELECT Name, Color, AVG(ListPrice) AS AveragePrice
FROM Production.Product
GROUP BY Color;
```

This fails because SQL Server has grouped rows by `Color`, but `Name`
varies **within** each color group — there's no single, unambiguous `Name`
to show per group. Every column in `SELECT` must be either:
- Wrapped in an aggregate function (`AVG`, `COUNT`, `SUM`, `MIN`, `MAX`), or
- Listed in `GROUP BY` itself

```sql
-- Fixed: Name removed, since it can't be resolved per group
SELECT Color, AVG(ListPrice) AS AveragePrice
FROM Production.Product
GROUP BY Color;
```

## Key terms

| Term | Meaning |
|---|---|
| `GROUP BY` | Splits rows into groups by one or more columns before aggregating |
| Group | A set of rows sharing the same value(s) in the `GROUP BY` column(s) |

## Lab

Run this against AdventureWorks2012 and confirm the row count matches
`SELECT COUNT(DISTINCT Color) FROM Production.Product`:

```sql
SELECT Color, COUNT(*) AS ProductCount, AVG(ListPrice) AS AveragePrice
FROM Production.Product
GROUP BY Color;
```

## Check yourself

You're ready for Lesson 36 when you can answer, without looking: what are
the three conceptual steps `GROUP BY` performs, and why must every
non-aggregated `SELECT` column appear in `GROUP BY`?
