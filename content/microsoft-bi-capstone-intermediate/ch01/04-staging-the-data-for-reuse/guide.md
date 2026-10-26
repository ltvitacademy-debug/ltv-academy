# Lesson 4 — Staging the Data for Repeatable Use

**Chapter 1 · Intermediate Capstone: The Weekly Sales & Fulfillment Report · Lesson 4 of 16**

## What you'll learn

- Why a recurring report needs staged views, not a query pasted into Power BI
- Building the keys-only fact view from Lesson 3's query
- Building the two small dimension views that carry the names
- Confirming the staged objects match the row counts from Lesson 2-3

## The problem with pasting a query into Power BI

You *could* paste Lesson 3's query straight into Power BI's "SQL Server" connector as a native
query and call it done. It would even work — once. But every week, when the scheduled refresh in
Lesson 9 runs, Power BI would re-run that exact same literal query text against
`AdventureWorks2012` with no single place to review, test, or fix the logic if something about the
business rule changes. A **view** fixes that: it lives in the database, it's one object you can
test independently in SSMS, and Power BI just reads from it like any other table.

## The fact view: keys only, per Lesson 2's plan

```sql
USE AdventureWorks2012;
GO

CREATE OR ALTER VIEW dbo.vw_CarrawayWeeklySalesFact AS
SELECT
    soh.SalesOrderID,
    soh.OrderDate,
    soh.DueDate,
    soh.ShipDate,
    soh.TerritoryID,
    sod.ProductID,
    sod.OrderQty,
    sod.UnitPrice,
    sod.UnitPriceDiscount,
    sod.LineTotal
FROM Sales.SalesOrderHeader AS soh
INNER JOIN Sales.SalesOrderDetail AS sod
    ON sod.SalesOrderID = soh.SalesOrderID
WHERE soh.Status = 5;
GO
```

Notice this is almost the same join as Lesson 3 — minus `SalesTerritory`, `Product`, and
`ProductSubcategory`. Those joins move into their own small views below, exactly per the
architecture from Lesson 2: the fact view carries `TerritoryID` and `ProductID`, not the names.

## The two dimension views

```sql
CREATE OR ALTER VIEW dbo.vw_CarrawayProductDim AS
SELECT
    p.ProductID,
    p.Name AS ProductName,
    psc.Name AS SubcategoryName
FROM Production.Product AS p
LEFT JOIN Production.ProductSubcategory AS psc
    ON psc.ProductSubcategoryID = p.ProductSubcategoryID;
GO

CREATE OR ALTER VIEW dbo.vw_CarrawayTerritoryDim AS
SELECT
    TerritoryID,
    Name  AS TerritoryName,
    [Group] AS TerritoryGroup
FROM Sales.SalesTerritory;
GO
```

`vw_CarrawayProductDim` keeps the same `LEFT JOIN` reasoning from Lesson 3 — products with no
subcategory still get a row, just with a `NULL` `SubcategoryName`. `vw_CarrawayTerritoryDim` is a
straight pass-through of `Sales.SalesTerritory`, renamed for clarity in the Power BI model.

## Why `CREATE OR ALTER` instead of `CREATE`

`CREATE OR ALTER VIEW` lets you re-run this script safely while you're iterating — it updates the
view if it already exists, instead of erroring with "there is already an object named...". That
matters here specifically because Lesson 15's change request comes back to modify
`vw_CarrawayWeeklySalesFact` again, and you'll want to re-run the same style of script to update
it in place.

## Confirming nothing broke

```sql
SELECT COUNT(*) AS FactRowCount FROM dbo.vw_CarrawayWeeklySalesFact;
```

This should return the exact same number you got from Lesson 2's `COUNT(*)` lab query and Lesson
3's full query. If it doesn't, the view's `WHERE` clause or join doesn't match what you verified
earlier — fix it here, before Power BI ever sees it.

## Key terms

| Term | Meaning |
|---|---|
| View | A saved, named query in the database that acts like a read-only table |
| `CREATE OR ALTER VIEW` | Creates the view, or updates it in place if it already exists |
| Staging layer | Views/tables that sit between raw source tables and the report, owning the business logic |

## Lab

Create all three views in `AdventureWorks2012` using the scripts above, then run:

```sql
SELECT TOP 5 * FROM dbo.vw_CarrawayWeeklySalesFact ORDER BY OrderDate DESC;
SELECT TOP 5 * FROM dbo.vw_CarrawayProductDim;
SELECT TOP 5 * FROM dbo.vw_CarrawayTerritoryDim;
```

Confirm each returns sensible, readable rows before moving on.

## Check yourself

You're ready for Lesson 5 when you can answer, without looking: why does a recurring report need
a staged view instead of a pasted-in query, and why did the fact view drop `SalesTerritory` and
`Product` out into their own separate views?
