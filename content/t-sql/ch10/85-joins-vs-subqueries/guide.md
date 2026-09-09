# Lesson 85 — Joins vs. Subqueries: Which Is Faster, and Why

**Chapter 10 · Performance Tuning · Lesson 3 of 12**

## What you'll learn

- Rewriting a correlated subquery as an equivalent join
- Why a `JOIN` usually outperforms an equivalent correlated subquery
- When a subquery is actually the right (or only) choice
- The role of the query optimizer

## Two equivalent queries

Recall Lesson 54's correlated subquery — products priced above their own
category's average:

```sql
-- Correlated subquery version
SELECT p1.Name, p1.ListPrice
FROM Production.Product AS p1
WHERE p1.ListPrice > (
    SELECT AVG(p2.ListPrice)
    FROM Production.Product AS p2
    WHERE p2.ProductSubcategoryID = p1.ProductSubcategoryID
);
```

```sql
-- Equivalent JOIN version, using a CTE for the per-category averages
WITH CategoryAverages AS (
    SELECT ProductSubcategoryID, AVG(ListPrice) AS AvgPrice
    FROM Production.Product
    GROUP BY ProductSubcategoryID
)
SELECT p.Name, p.ListPrice
FROM Production.Product AS p
INNER JOIN CategoryAverages AS ca
    ON p.ProductSubcategoryID = ca.ProductSubcategoryID
WHERE p.ListPrice > ca.AvgPrice;
```

Both return **identical** results.

## Why the JOIN version usually wins

The correlated subquery, per Lesson 54, re-evaluates its inner query
**once for every row** of the outer query. The `JOIN` version computes
each category's average **once**, in the CTE, and then joins that small,
pre-computed result against the main table a single time. For a table
with `N` rows and `M` categories, the subquery does roughly `N` separate
average calculations; the join version does `M` — a real difference once
`N` is large and `M` is comparatively small.

## When a subquery is genuinely the right choice

Not every subquery has a faster join equivalent — and readability matters
too:

- A **scalar** subquery (Lesson 52) computing one simple, table-wide
  value is often just as fast as any alternative, and clearer to read.
- Some logic (particularly `EXISTS`/`NOT EXISTS`, covered fully in
  Lesson 86) doesn't have a meaningfully faster join equivalent at all.

## The optimizer sometimes rewrites it for you

SQL Server's **query optimizer** doesn't always execute a query exactly
as literally written — for simpler cases, it may internally transform a
subquery into a join-like execution plan on its own. This doesn't mean
the choice never matters (correlated subqueries are the case where it
usually still does), but it does mean the honest answer to "which is
faster" is sometimes "check the execution plan" (Lesson 90) rather than
assuming from syntax alone.

## Key terms

| Term | Meaning |
|---|---|
| Correlated subquery cost | Re-evaluates once per outer row — Lesson 54's core cost |
| Query optimizer | The component that decides how a query actually executes, sometimes rewriting it internally |

## Lab

Run both versions of the query above against AdventureWorks2012 and
confirm they return the same rows.

## Check yourself

You're ready for Lesson 86 when you can answer, without looking: why
does a correlated subquery typically cost more than an equivalent join,
and is it always true that a join is faster than any subquery?
