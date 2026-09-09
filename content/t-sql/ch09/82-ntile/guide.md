# Lesson 82 — NTILE

**Chapter 9 · Window and Ranking Functions · Lesson 4 of 4**

## What you'll learn

- `NTILE()` — splitting rows into a specified number of roughly equal groups
- How NTILE decides which bucket each row falls into
- What happens when rows don't divide evenly
- Wrapping up Chapter 9

## The problem NTILE solves

`RANK()`/`DENSE_RANK()` (Lesson 81) rank rows individually.
Sometimes what you actually want is coarser: split all rows into a
**fixed number** of roughly equal-sized groups — quartiles, deciles, or
any number of buckets — for a task like "which price quartile does this
product fall into?"

## NTILE — dividing into buckets

```sql
USE AdventureWorks2012;
GO

SELECT Name, ListPrice,
       NTILE(4) OVER (ORDER BY ListPrice DESC) AS PriceQuartile
FROM Production.Product;
```

`NTILE(4)` divides the ordered rows into **4** roughly equal groups,
numbered `1` through `4`. Group `1` here holds the most expensive quarter
of products (because of the `DESC` order); group `4` holds the cheapest
quarter. Change `4` to any number — `NTILE(10)` gives deciles,
`NTILE(100)` gives percentiles.

## When rows don't divide evenly

If the total row count isn't evenly divisible by the bucket count, SQL
Server distributes the **extra** rows to the **earliest** groups, one
extra row each, so no group differs from another by more than one row:

```sql
-- 22 rows into NTILE(4): groups get 6, 6, 5, 5 rows respectively
```

You don't control which groups get the extra rows — SQL Server assigns
them starting from group `1`.

## Combining with PARTITION BY

Exactly like every function this chapter, `NTILE` can be partitioned:

```sql
SELECT Name, Color, ListPrice,
       NTILE(4) OVER (PARTITION BY Color ORDER BY ListPrice DESC) AS QuartileInColor
FROM Production.Product;
```

This computes price quartiles **separately within each color**, instead
of across the whole table.

## Chapter 9 recap

You now have the full set of ranking tools: `OVER()`/`PARTITION BY` as
the foundation, `ROW_NUMBER()` for unique sequencing,
`RANK()`/`DENSE_RANK()` for handling ties two different ways, and
`NTILE()` for splitting data into equal-sized buckets. Chapter 10 moves
into Performance Tuning — including revisiting execution plans, indexes,
and the comparative topics (joins vs. subqueries, `EXISTS` vs. `IN`) that
tie everything you've learned so far together from a speed perspective.

## Key terms

| Term | Meaning |
|---|---|
| `NTILE(n)` | Divides ordered rows into `n` roughly equal groups |

## Lab

Run this against AdventureWorks2012:

```sql
SELECT Name, ListPrice,
       NTILE(4) OVER (ORDER BY ListPrice DESC) AS PriceQuartile
FROM Production.Product
ORDER BY PriceQuartile, ListPrice DESC;
```

## Check yourself

You're ready for Chapter 10 when you can answer, without looking: what
does `NTILE(4)` do, and how does SQL Server handle rows that don't divide
evenly into the requested number of groups?
