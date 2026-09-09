# Lesson 59 — Indexed Views

**Chapter 6 · Subqueries, CTEs, and Views · Lesson 8 of 10**

## What you'll learn

- Indexed views — the one case where a view genuinely stores data
- Why you'd trade storage for speed
- The real requirements and restrictions
- When an indexed view is (and isn't) worth it

## The normal view, revisited

Lesson 58 established the core fact about views: they store the query,
not the data, and re-run fresh every time. That's true for a **regular**
view. There's one exception.

## Adding an index materializes the view

```sql
USE AdventureWorks2012;
GO

CREATE VIEW vw_ProductPriceSummary
WITH SCHEMABINDING
AS
SELECT ProductSubcategoryID,
       COUNT_BIG(*) AS ProductCount,
       SUM(ListPrice) AS TotalListPrice
FROM Production.Product
WHERE ProductSubcategoryID IS NOT NULL
GROUP BY ProductSubcategoryID;

CREATE UNIQUE CLUSTERED INDEX IX_vw_ProductPriceSummary
ON vw_ProductPriceSummary (ProductSubcategoryID);
```

Once a **unique clustered index** is created on a view, SQL Server
**materializes** it — physically storing the computed result on disk,
just like a real table. From that point on, querying the view doesn't
re-run the underlying `SELECT` at all; it reads the pre-computed data
directly, which can be dramatically faster for expensive aggregations
queried often.

## The real cost: SQL Server maintains it for you

This isn't free. Every time the underlying `Production.Product` table
changes (an `INSERT`, `UPDATE`, or `DELETE`), SQL Server has to update the
indexed view's stored data too, to keep it consistent — extra work on
every write, in exchange for faster reads.

## Real restrictions worth knowing

Indexed views come with genuine constraints not present on regular views:
- `WITH SCHEMABINDING` is required — it locks the underlying table's
  structure so SQL Server can guarantee the view stays valid.
- `COUNT_BIG(*)`, not `COUNT(*)`, is required when aggregating.
- Several T-SQL features (`TOP`, certain functions, outer joins in some
  configurations) aren't allowed inside an indexed view's definition.

## When it's worth it

Indexed views make sense for **expensive aggregations, queried very
often, on data that doesn't change constantly** — the classic profile of
a reporting/dashboard summary. For most everyday views, a regular
(non-indexed) view is the right, simpler default.

## Key terms

| Term | Meaning |
|---|---|
| Indexed view | A view materialized on disk via a unique clustered index |
| `WITH SCHEMABINDING` | Required for indexed views — locks the underlying table structure |

## Lab

In AdventureWorks2012, check whether any existing views (via Object
Explorer → Views) have indexes defined — that's a real indexed view you
can inspect.

## Check yourself

You're ready for Lesson 60 when you can answer, without looking: what
actually changes when you add a unique clustered index to a view, and
what's the ongoing cost of that decision?
