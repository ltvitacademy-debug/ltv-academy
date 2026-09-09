# Lesson 58 — Views: Creating and Using

**Chapter 6 · Subqueries, CTEs, and Views · Lesson 7 of 10**

## What you'll learn

- `CREATE VIEW` — a saved, reusable named query
- A view is not a copy of data — it's a stored `SELECT`
- Querying a view exactly like a table
- `ALTER VIEW` and `DROP VIEW`

## What is a view?

A **view** is a `SELECT` statement, saved in the database under a name,
that you can query exactly like a table. Unlike a CTE (Lesson 56), a view
**persists** — it's available to any query, any session, any user with
permission, until someone explicitly removes it.

## Creating a view

```sql
USE AdventureWorks2012;
GO

CREATE VIEW vw_ExpensiveProducts AS
SELECT ProductID, Name, ListPrice, Color
FROM Production.Product
WHERE ListPrice > 1000;
```

`vw_` is a common (optional) naming prefix that flags a database object as
a view at a glance — this course uses it consistently.

## Querying a view

```sql
SELECT * FROM vw_ExpensiveProducts
WHERE Color = 'Red'
ORDER BY ListPrice DESC;
```

This is the entire point of a view: `vw_ExpensiveProducts` behaves exactly
like a table in every query that follows — you can `SELECT` specific
columns, `WHERE`-filter, `JOIN` it to other tables, all as if it were a
real table.

## A view is not a copy of the data

Crucially, a view stores **no data of its own** — it stores the `SELECT`
statement itself. Every time you query a view, SQL Server runs that saved
`SELECT` fresh, against the live, current data in the underlying table(s).
This means a view is always up to date, automatically — there's no
"refresh" step.

## Modifying and removing a view

```sql
ALTER VIEW vw_ExpensiveProducts AS
SELECT ProductID, Name, ListPrice, Color, ProductSubcategoryID
FROM Production.Product
WHERE ListPrice > 1000;

DROP VIEW vw_ExpensiveProducts;
```

`ALTER VIEW` redefines an existing view's saved query; `DROP VIEW` removes
it permanently.

## Why use a view at all?

Views are how you package a complex, well-tested query (joins, filters,
calculations) once, under a friendly name, so everyone downstream — other
developers, reporting tools, even less-technical users — can reuse it
without re-deriving the logic every time.

## Key terms

| Term | Meaning |
|---|---|
| `CREATE VIEW` | Saves a `SELECT` statement under a name, queryable like a table |
| View | Stores the query, not the data — always reflects current data |
| `ALTER VIEW` / `DROP VIEW` | Redefine or remove an existing view |

## Lab

Create and query a view against AdventureWorks2012:

```sql
CREATE VIEW vw_RedProducts AS
SELECT Name, ListPrice
FROM Production.Product
WHERE Color = 'Red';

SELECT * FROM vw_RedProducts ORDER BY ListPrice DESC;
```

## Check yourself

You're ready for Lesson 59 when you can answer, without looking: does a
view store actual data, and how does a view differ from a CTE in terms of
how long it persists?
