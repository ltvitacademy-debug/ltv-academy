# Lesson 56 — Common Table Expressions (CTEs)

**Chapter 6 · Subqueries, CTEs, and Views · Lesson 5 of 10**

## What you'll learn

- `WITH` — naming a subquery so you can reference it by name
- Why CTEs make deeply nested subqueries readable
- Referencing a CTE multiple times in the same query
- CTEs are temporary — they only exist for one statement

## The readability problem with nested subqueries

A subquery inside a subquery inside a subquery gets hard to read fast —
you have to mentally track which closing parenthesis belongs to which
level. A **CTE (Common Table Expression)** solves this by giving a
subquery a **name**, defined once at the top of the query with `WITH`.

## Basic CTE syntax

```sql
USE AdventureWorks2012;
GO

WITH ExpensiveProducts AS (
    SELECT ProductID, Name, ListPrice
    FROM Production.Product
    WHERE ListPrice > 1000
)
SELECT Name, ListPrice
FROM ExpensiveProducts
ORDER BY ListPrice DESC;
```

`WITH ExpensiveProducts AS (...)` defines the CTE — a named, temporary
result set. The query **after** it then references `ExpensiveProducts`
exactly like a real table. This is functionally identical to putting that
same `SELECT` in a subquery in the `FROM` clause, but far easier to read,
especially as the logic grows more complex.

## Referencing the same CTE more than once

A CTE can be referenced **multiple times** in the statement that follows
it — useful when you need the same intermediate result compared against
itself:

```sql
WITH CategoryAverages AS (
    SELECT ProductSubcategoryID, AVG(ListPrice) AS AvgPrice
    FROM Production.Product
    GROUP BY ProductSubcategoryID
)
SELECT ca1.ProductSubcategoryID, ca1.AvgPrice
FROM CategoryAverages AS ca1
WHERE ca1.AvgPrice > (SELECT AVG(AvgPrice) FROM CategoryAverages);
```

## CTEs are temporary — scoped to one statement

A CTE only exists for the **single statement** immediately following its
`WITH` clause. It isn't saved anywhere, isn't reusable across separate
queries, and disappears the moment that statement finishes. (Lesson 58
covers `VIEW`, which **is** a genuinely reusable, saved named query — the
next logical step after CTEs.)

## Key terms

| Term | Meaning |
|---|---|
| CTE | A named, temporary result set defined with `WITH`, scoped to one statement |
| `WITH name AS (...)` | The syntax that defines a CTE |

## Lab

Run this against AdventureWorks2012:

```sql
WITH ProductsByCategory AS (
    SELECT ProductSubcategoryID, COUNT(*) AS ProductCount
    FROM Production.Product
    WHERE ProductSubcategoryID IS NOT NULL
    GROUP BY ProductSubcategoryID
)
SELECT * FROM ProductsByCategory
WHERE ProductCount > 10
ORDER BY ProductCount DESC;
```

## Check yourself

You're ready for Lesson 57 when you can answer, without looking: what
does `WITH name AS (...)` actually create, and how long does a CTE remain
usable?
