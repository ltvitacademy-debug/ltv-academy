# Lesson 54 — Correlated Subqueries

**Chapter 6 · Subqueries, CTEs, and Views · Lesson 3 of 10**

## What you'll learn

- What makes a subquery "correlated"
- Referencing the outer query's current row from inside a subquery
- Why a correlated subquery runs once **per outer row**
- A real example: finding above-average-priced products **per category**

## Independent vs. correlated subqueries

Every subquery you've seen so far (Lessons 52–53) is **independent** — it
runs completely on its own, with no reference to the outer query at all,
and its result would be identical no matter what row the outer query
happens to be looking at.

A **correlated subquery** is different: it references a column from the
**outer** query, which means it must be re-evaluated **once for every row**
the outer query considers.

## A correlated subquery example

```sql
USE AdventureWorks2012;
GO

SELECT p1.Name, p1.ListPrice, p1.ProductSubcategoryID
FROM Production.Product AS p1
WHERE p1.ListPrice > (
    SELECT AVG(p2.ListPrice)
    FROM Production.Product AS p2
    WHERE p2.ProductSubcategoryID = p1.ProductSubcategoryID
);
```

Notice `p1.ProductSubcategoryID` inside the **inner** query — that's the
correlation. For **each** row `p1` in the outer query, the inner query
recomputes the average price **within that specific row's own
subcategory**, then compares. This finds products priced above average
**for their own category**, not above the overall average across every
product (which is what Lesson 52's plain scalar subquery computed).

## Why the aliasing matters here

Both the outer and inner query reference the **same table**,
`Production.Product` — this is why the two aliases (`p1` and `p2`) are
essential, not optional. Without them, T-SQL couldn't tell "the current
outer row's subcategory" apart from "some subcategory being scanned inside
the subquery." This is conceptually similar to the self-join aliasing from
Lesson 27, just applied to a subquery instead of a join.

## The performance tradeoff

Because a correlated subquery re-runs **once per outer row**, it can be
noticeably slower than an equivalent join on a large table — something
we'll return to properly in the Performance Tuning chapter. For now, focus
on understanding **what** a correlated subquery computes before worrying
about how fast it runs.

## Key terms

| Term | Meaning |
|---|---|
| Correlated subquery | A subquery that references the outer query's current row, re-evaluated per row |
| Independent subquery | A subquery with no reference to the outer query, evaluated once |

## Lab

Run the correlated subquery example above against AdventureWorks2012 and
compare its results to Lesson 52's overall-average version — are the same
products flagged?

## Check yourself

You're ready for Lesson 55 when you can answer, without looking: what
makes a subquery "correlated" rather than independent, and why does it
need to run once per outer row instead of just once?
