# Lesson 3 — Writing the Category Performance Extract Query

**Chapter 1 · Beginner Capstone: Product Category Performance Snapshot · Lesson 3 of 10**

## What you'll learn

- Turning the Lesson 2 plan into real, syntactically correct T-SQL across five tables
- Filtering to "the current quarter" with `DATEFROMPARTS` and `DATEPART`
- Grouping and aggregating so each row answers the stakeholder's actual question

## The real query

Here's the full extract query against AdventureWorks2012, built directly from the Lesson 2 plan
— detail table first, joined outward through the category hierarchy, filtered to the current
quarter, grouped by category:

```sql
USE AdventureWorks2012;
GO

SELECT
    pc.Name                                   AS CategoryName,
    SUM(sod.LineTotal)                        AS TotalSalesAmount,
    COUNT(DISTINCT soh.SalesOrderID)          AS OrderCount
FROM Sales.SalesOrderDetail AS sod
JOIN Sales.SalesOrderHeader AS soh
    ON sod.SalesOrderID = soh.SalesOrderID
JOIN Production.Product AS p
    ON sod.ProductID = p.ProductID
JOIN Production.ProductSubcategory AS psc
    ON p.ProductSubcategoryID = psc.ProductSubcategoryID
JOIN Production.ProductCategory AS pc
    ON psc.ProductCategoryID = pc.ProductCategoryID
WHERE soh.OrderDate >= DATEFROMPARTS(
        YEAR(GETDATE()),
        (DATEPART(QUARTER, GETDATE()) - 1) * 3 + 1,
        1)
  AND soh.OrderDate < DATEADD(MONTH, 3, DATEFROMPARTS(
        YEAR(GETDATE()),
        (DATEPART(QUARTER, GETDATE()) - 1) * 3 + 1,
        1))
GROUP BY pc.Name
ORDER BY pc.Name;
```

Every piece traces straight back to the plan from Lesson 2 — nothing here should be a surprise,
just one hop deeper through the category hierarchy than a report that grouped by something
already sitting on `Product`.

## Reading the FROM/JOIN block

The query starts at `Sales.SalesOrderDetail`, exactly as planned, to avoid summing `LineTotal`
more than once per order. From there:

- `JOIN Sales.SalesOrderHeader ON sod.SalesOrderID = soh.SalesOrderID` — gets the order date onto
  each detail row.
- `JOIN Production.Product ON sod.ProductID = p.ProductID` — gets the product, and its
  subcategory ID, onto each detail row.
- `JOIN Production.ProductSubcategory ON p.ProductSubcategoryID = psc.ProductSubcategoryID` —
  gets the subcategory, and its category ID, onto each row.
- `JOIN Production.ProductCategory ON psc.ProductCategoryID = pc.ProductCategoryID` — finally
  turns that category ID into a readable category name.

Table aliases (`sod`, `soh`, `p`, `psc`, `pc`) keep the query readable once five tables are in
play — one more than the four-table joins you may have seen in other lessons, because of the
extra hierarchy hop.

## The "current quarter" filter

`DATEFROMPARTS(YEAR(GETDATE()), (DATEPART(QUARTER, GETDATE()) - 1) * 3 + 1, 1)` builds the
**first day of the current calendar quarter** without hardcoding a date:

- `DATEPART(QUARTER, GETDATE())` returns 1, 2, 3, or 4 for today's quarter.
- `(quarter - 1) * 3 + 1` converts that into the starting month — quarter 3 becomes month 7.
- `DATEFROMPARTS(year, month, 1)` assembles the first of that month.

The upper bound adds three months to that same date, so the `WHERE` clause reads as "on or
after the quarter's first day, and before the next quarter starts" — a clean half-open range
that never double-counts a boundary date and automatically rolls forward every quarter without
edits.

## The SELECT and GROUP BY

- `pc.Name AS CategoryName` is the single grouping column — exactly the grain decided in
  Lesson 2.
- `SUM(sod.LineTotal) AS TotalSalesAmount` answers "how much."
- `COUNT(DISTINCT soh.SalesOrderID) AS OrderCount` answers "how many orders" — `DISTINCT` is
  required here because joining to `SalesOrderDetail` means each order's ID repeats once per
  line item, and a plain `COUNT(*)` would count line items, not orders.

`GROUP BY pc.Name` matches the one non-aggregated column in the `SELECT` list, the same rule
that governs every `GROUP BY` query: anything not wrapped in an aggregate function must appear
in the grouping.

## What the result should look like

AdventureWorks2012 has exactly four rows in `Production.ProductCategory` — Bikes, Components,
Clothing, and Accessories — so a correct run of this query returns **at most four rows**, one
per category that had any sales this quarter. That's a useful, real sanity check to carry into
Lesson 4: if this query ever returns more than four rows, something upstream is wrong.

## Key terms

| Term | Meaning |
|---|---|
| `DATEFROMPARTS` | Builds a date from separate year/month/day values |
| Half-open date range | A filter using `>=` on the start and `<` on the end, avoiding boundary double-counts |
| `COUNT(DISTINCT ...)` | Counts unique values of a column, needed here because joins repeat `SalesOrderID` per line item |

## Lab

Run the query above against your own AdventureWorks2012 instance. Confirm it returns four rows
or fewer. Then change `COUNT(DISTINCT soh.SalesOrderID)` to a plain `COUNT(*)` and compare the
two `OrderCount` columns — they will differ. Explain, in one sentence, why.

## Check yourself

You're ready for Lesson 4 when you can explain, without looking, why `COUNT(DISTINCT
soh.SalesOrderID)` is necessary instead of `COUNT(*)`, how the date filter builds "the current
quarter" without a hardcoded date, and why this particular query can never return more than four
rows.
