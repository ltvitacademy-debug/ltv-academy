# Lesson 3 — Writing the Multi-Table T-SQL Query

**Chapter 1 · Intermediate Capstone: The Weekly Sales & Fulfillment Report · Lesson 3 of 16**

## What you'll learn

- Writing a real multi-table join across five AdventureWorks2012 tables
- Using an "eyeball" query with names first, before building the keys-only staged version
- Filtering to shipped orders only, and why that matters for this project
- Pulling the fulfillment columns (`DueDate`, `ShipDate`) the Operations Manager needs

## Start with a query you can read, not the one you'll ship

Lesson 2 decided the fact table will carry keys only — `TerritoryID`, `ProductID` — not names.
But you shouldn't write that version first. Write the **readable** version first, with real
names joined in, so you can eyeball the data and sanity-check it before committing to the staged
shape in Lesson 4.

```sql
USE AdventureWorks2012;
GO

SELECT
    soh.SalesOrderID,
    soh.OrderDate,
    soh.DueDate,
    soh.ShipDate,
    tr.Name            AS TerritoryName,
    tr.[Group]          AS TerritoryGroup,
    p.Name              AS ProductName,
    psc.Name            AS SubcategoryName,
    sod.OrderQty,
    sod.UnitPrice,
    sod.UnitPriceDiscount,
    sod.LineTotal
FROM Sales.SalesOrderHeader AS soh
INNER JOIN Sales.SalesOrderDetail AS sod
    ON sod.SalesOrderID = soh.SalesOrderID
INNER JOIN Sales.SalesTerritory AS tr
    ON tr.TerritoryID = soh.TerritoryID
INNER JOIN Production.Product AS p
    ON p.ProductID = sod.ProductID
LEFT JOIN Production.ProductSubcategory AS psc
    ON psc.ProductSubcategoryID = p.ProductSubcategoryID
WHERE soh.Status = 5
ORDER BY soh.OrderDate DESC;
```

## Why `INNER JOIN` four times, but `LEFT JOIN` once

`SalesOrderHeader` to `SalesOrderDetail`, to `SalesTerritory`, to `Product` are all `INNER JOIN` —
every order line has exactly one header, one territory, and one product, so an inner join never
drops a row you need. `Product` to `ProductSubcategory` is a `LEFT JOIN` on purpose: a handful of
products in `AdventureWorks2012` have a `NULL` `ProductSubcategoryID`. An inner join there would
silently drop those order lines from the report — a `LEFT JOIN` keeps them, with `SubcategoryName`
showing `NULL` instead of quietly disappearing.

## Why `WHERE soh.Status = 5`

`SalesOrderHeader.Status` tracks an order's lifecycle; `5` means **Shipped**. Both stakeholders
care about completed business, not orders still in flight — the Sales Director's "total sales"
shouldn't include an order that hasn't actually shipped yet, and the Operations Manager's
fulfillment numbers only make sense for orders that *have* a real `ShipDate` to measure against
`DueDate`. Filtering to `Status = 5` here, once, means every measure built on top of this data
later inherits the same correct scope automatically.

## The fulfillment columns matter now, not later

Notice `DueDate` and `ShipDate` are in the `SELECT` list even though neither report page uses them
yet. That's deliberate: the Operations Manager's drill-down page (Lesson 8) needs a fulfillment
metric — how long an order actually took to ship versus how long it was supposed to take — and
Lesson 15's change request depends on these same two columns. Pulling them now, while you're
already in this query, is cheaper than adding them to a view later.

## Key terms

| Term | Meaning |
|---|---|
| `INNER JOIN` | Keeps only rows with a match on both sides |
| `LEFT JOIN` | Keeps every row from the left table, even without a match on the right |
| `Status = 5` | AdventureWorks2012's code for a Shipped order |
| Fulfillment | How an order's actual ship date compares to its due date |

## Lab

Run the query above against `AdventureWorks2012`, then compare its row count to the number you
saved from Lesson 2's lab query (`COUNT(*)` on the `Status = 5` join). They should match exactly —
if they don't, one of your joins is dropping or duplicating rows, and that's worth tracking down
before Lesson 4 turns this into a view.

## Check yourself

You're ready for Lesson 4 when you can answer, without looking: why is `Product` joined to
`ProductSubcategory` with a `LEFT JOIN` instead of an `INNER JOIN`, and why does this query filter
to `Status = 5`?
