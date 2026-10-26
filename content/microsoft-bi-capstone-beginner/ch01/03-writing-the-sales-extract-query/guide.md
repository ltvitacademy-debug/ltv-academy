# Lesson 3 — Writing the Sales Extract Query

**Chapter 1 · Beginner Capstone: Regional Sales Snapshot · Lesson 3 of 10**

## What you'll learn

- Turning the Lesson 2 plan into real, syntactically correct T-SQL
- Filtering to "the current quarter" with `DATEFROMPARTS` and `DATEPART`
- Grouping and aggregating so each row answers the stakeholder's actual question

## The real query

Here's the full extract query against AdventureWorks2012, built directly from the Lesson 2
plan — detail table first, joined outward, filtered to the current quarter, grouped by
territory and product line:

```sql
USE AdventureWorks2012;
GO

SELECT
    st.Name                                   AS Territory,
    p.ProductLine                             AS ProductLine,
    SUM(sod.LineTotal)                        AS TotalSalesAmount,
    COUNT(DISTINCT soh.SalesOrderID)          AS OrderCount
FROM Sales.SalesOrderDetail AS sod
JOIN Sales.SalesOrderHeader AS soh
    ON sod.SalesOrderID = soh.SalesOrderID
JOIN Production.Product AS p
    ON sod.ProductID = p.ProductID
JOIN Sales.SalesTerritory AS st
    ON soh.TerritoryID = st.TerritoryID
WHERE soh.OrderDate >= DATEFROMPARTS(
        YEAR(GETDATE()),
        (DATEPART(QUARTER, GETDATE()) - 1) * 3 + 1,
        1)
  AND soh.OrderDate < DATEADD(MONTH, 3, DATEFROMPARTS(
        YEAR(GETDATE()),
        (DATEPART(QUARTER, GETDATE()) - 1) * 3 + 1,
        1))
GROUP BY st.Name, p.ProductLine
ORDER BY st.Name, p.ProductLine;
```

Every piece traces straight back to the plan from Lesson 2 — nothing here should be a
surprise.

## Reading the FROM/JOIN block

The query starts at `Sales.SalesOrderDetail`, exactly as planned, to avoid summing
`LineTotal` more than once per order. From there:

- `JOIN Sales.SalesOrderHeader ON sod.SalesOrderID = soh.SalesOrderID` — gets the order date
  and territory ID onto each detail row.
- `JOIN Production.Product ON sod.ProductID = p.ProductID` — gets the product line onto each
  detail row.
- `JOIN Sales.SalesTerritory ON soh.TerritoryID = st.TerritoryID` — turns the numeric
  territory ID into a readable name.

Table aliases (`sod`, `soh`, `p`, `st`) keep the query readable once four tables are in play.

## The "current quarter" filter

`DATEFROMPARTS(YEAR(GETDATE()), (DATEPART(QUARTER, GETDATE()) - 1) * 3 + 1, 1)` builds the
**first day of the current calendar quarter** without hardcoding a date:

- `DATEPART(QUARTER, GETDATE())` returns 1, 2, 3, or 4 for today's quarter.
- `(quarter - 1) * 3 + 1` converts that into the starting month — quarter 3 becomes month 7.
- `DATEFROMPARTS(year, month, 1)` assembles the first of that month.

The upper bound adds three months to that same date, so the `WHERE` clause reads as "on or
after the quarter's first day, and before the next quarter starts" — a clean half-open range
that never double-counts a boundary date and automatically rolls forward every quarter
without edits.

## The SELECT and GROUP BY

- `st.Name AS Territory` and `p.ProductLine AS ProductLine` are the two grouping columns —
  exactly the grain decided in Lesson 2.
- `SUM(sod.LineTotal) AS TotalSalesAmount` answers "how much."
- `COUNT(DISTINCT soh.SalesOrderID) AS OrderCount` answers "how many orders" — `DISTINCT` is
  required here because joining to `SalesOrderDetail` means each order's ID repeats once per
  line item, and a plain `COUNT(*)` would count line items, not orders.

`GROUP BY st.Name, p.ProductLine` matches the two non-aggregated columns in the `SELECT`
list, the same rule that governs every `GROUP BY` query: anything not wrapped in an aggregate
function must appear in the grouping.

## Key terms

| Term | Meaning |
|---|---|
| `DATEFROMPARTS` | Builds a date from separate year/month/day values |
| Half-open date range | A filter using `>=` on the start and `<` on the end, avoiding boundary double-counts |
| `COUNT(DISTINCT ...)` | Counts unique values of a column, needed here because joins repeat `SalesOrderID` per line item |

## Lab

Run the query above against your own AdventureWorks2012 instance. Then change
`COUNT(DISTINCT soh.SalesOrderID)` to a plain `COUNT(*)` and compare the two `OrderCount`
columns — they will differ. Explain, in one sentence, why.

## Check yourself

You're ready for Lesson 4 when you can explain, without looking, why `COUNT(DISTINCT
soh.SalesOrderID)` is necessary instead of `COUNT(*)`, and how the date filter builds "the
current quarter" without a hardcoded date.
