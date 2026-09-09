# Lesson 84 — The Cartesian Product: What Happens When Joins Go Wrong

**Chapter 10 · Performance Tuning · Lesson 2 of 12**

## What you'll learn

- A deeper look at the Cartesian product, beyond Lesson 26's introduction
- Exactly how it happens by accident in real, otherwise-reasonable code
- Measuring the real cost with row-count math
- How to catch one before it reaches production

## A quick recap

Lesson 26 introduced `CROSS JOIN` and the Cartesian product: every row of
one table paired with every row of another, with row counts
**multiplying**, not adding. This lesson goes deeper — specifically into
how a Cartesian product sneaks into **real** queries that were never
meant to have one at all.

## How it happens by accident

The classic accidental Cartesian product isn't from typing `CROSS JOIN`
on purpose — it's from a **missing or incomplete** `ON` condition on what
was meant to be a normal join:

```sql
-- BUG: missing the ON clause entirely
SELECT p.Name, sod.OrderQty
FROM Production.Product AS p, Sales.SalesOrderDetail AS sod;
```

This old-style comma join has **no join condition at all**, so SQL
Server has no basis for matching rows — it falls back to pairing
**every** product with **every** order detail line, exactly like an
explicit `CROSS JOIN`. The same bug appears with modern `JOIN` syntax if
the `ON` clause is accidentally left out or references the wrong columns.

## A subtler version: a partial ON condition

```sql
-- BUG: ON clause exists, but doesn't actually relate the tables
SELECT p.Name, sod.OrderQty
FROM Production.Product AS p
INNER JOIN Sales.SalesOrderDetail AS sod
    ON p.Name IS NOT NULL; -- true for almost every row — not a real match condition
```

This one is more dangerous because it **looks** correct — there's an
`ON` clause — but the condition doesn't actually relate the two tables
to each other. Since it evaluates to `TRUE` for nearly every row
combination, the result is a Cartesian product in disguise.

## Measuring the real cost

`Production.Product` has roughly 500 rows; `Sales.SalesOrderDetail` has
over 100,000. A Cartesian product between them doesn't return
"500 plus 100,000" rows — it returns **500 × 100,000 = 50 million** rows.
On genuinely large tables, this can exhaust server memory or run for
hours before anyone notices something is wrong.

## Catching one before production

The practical habit: after writing **any** join, sanity-check the
resulting row count. If a query joining a 500-row table to a
100,000-row table returns **millions** of rows instead of a number in
that same rough range, that's an immediate signal to re-check the `ON`
clause — not to assume the data is simply "that big."

## Key terms

| Term | Meaning |
|---|---|
| Accidental Cartesian product | A join missing (or with an ineffective) `ON` condition, falling back to pairing every row with every row |

## Lab

Predict the row count, then run this against AdventureWorks2012 to check
your prediction (only if you're prepared for a genuinely large result —
consider adding `TOP 10` first):

```sql
SELECT TOP 10 p.Name, sod.OrderQty
FROM Production.Product AS p, Sales.SalesOrderDetail AS sod;
```

## Check yourself

You're ready for Lesson 85 when you can answer, without looking: what's
the most common real-world cause of an accidental Cartesian product, and
what row-count red flag should make you suspect one?
