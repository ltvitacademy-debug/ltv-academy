# Lesson 52 — Single-Value Subqueries

**Chapter 6 · Subqueries, CTEs, and Views · Lesson 1 of 10**

## What you'll learn

- What a subquery is — a query inside another query
- The single-value (scalar) subquery
- Where a scalar subquery is allowed to appear
- Why the query must genuinely return exactly one value

## What is a subquery?

A **subquery** is a complete `SELECT` statement written **inside** another
query, usually in parentheses. The **outer** query uses the subquery's
result as part of its own logic. This chapter covers several shapes of
subquery — we start with the simplest: one that returns exactly **one**
value.

## A single-value (scalar) subquery

```sql
USE AdventureWorks2012;
GO

SELECT Name, ListPrice
FROM Production.Product
WHERE ListPrice > (SELECT AVG(ListPrice) FROM Production.Product);
```

The **inner** query, `(SELECT AVG(ListPrice) FROM Production.Product)`,
computes one single number — the average price across all products. The
**outer** query then compares each product's `ListPrice` against that one
value. This finds every product priced **above average**, without you
ever having to calculate or hard-code that average yourself.

## Where scalar subqueries can appear

A subquery that returns exactly one value can be used **anywhere a single
value is expected** — in `WHERE`, in a `SELECT` column, even standing in
for a literal:

```sql
SELECT Name, ListPrice,
       (SELECT AVG(ListPrice) FROM Production.Product) AS OverallAverage
FROM Production.Product;
```

Here, every row shows the same overall average alongside its own price —
useful for direct comparison in a report.

## The rule: exactly one value, or it fails

If a scalar subquery's `SELECT` unexpectedly returns **more than one row**,
SQL Server raises a runtime error — it has no way to compare a single
value against multiple results in this context. This is why scalar
subqueries almost always wrap an aggregate function (`AVG`, `COUNT`,
`MAX`, `MIN`, `SUM`) — aggregates are guaranteed to collapse to one value.

## Key terms

| Term | Meaning |
|---|---|
| Subquery | A `SELECT` statement nested inside another query |
| Scalar subquery | A subquery guaranteed to return exactly one value |
| Outer query | The query that uses the subquery's result |

## Lab

Run this against AdventureWorks2012:

```sql
SELECT Name, ListPrice
FROM Production.Product
WHERE ListPrice > (SELECT AVG(ListPrice) FROM Production.Product)
ORDER BY ListPrice DESC;
```

## Check yourself

You're ready for Lesson 53 when you can answer, without looking: what
happens if a scalar subquery unexpectedly returns more than one row, and
where in a query can a scalar subquery be used?
