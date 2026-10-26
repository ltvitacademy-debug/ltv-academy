# Lesson 3 — Designing the Star Schema

**Chapter 2 · Building the T-SQL Warehouse Layer · Lesson 3 of 26**

## What you'll learn

- The real source tables in AdventureWorks2012 this warehouse is built
  from, column by column
- The finished star schema design: one fact table, four dimensions
- Why `dw.DimProduct` flattens category and subcategory onto itself
  instead of using three separate, joined dimension tables
- Why the fact and dimension tables are built in a specific order —
  and why that order defers the fact table's foreign-key constraints

## The real source tables

Every table in this warehouse is built from real columns in real
AdventureWorks2012 tables — nothing here is invented:

| Source table | Columns this warehouse uses |
|---|---|
| `Sales.SalesOrderDetail` | `SalesOrderID`, `SalesOrderDetailID`, `ProductID`, `OrderQty`, `LineTotal` |
| `Sales.SalesOrderHeader` | `SalesOrderID`, `OrderDate`, `CustomerID`, `TerritoryID` |
| `Production.Product` | `ProductID`, `Name`, `ProductSubcategoryID` |
| `Production.ProductSubcategory` | `ProductSubcategoryID`, `ProductCategoryID`, `Name` |
| `Production.ProductCategory` | `ProductCategoryID`, `Name` |
| `Sales.SalesTerritory` | `TerritoryID`, `Name`, `Group` |
| `Sales.Customer` | `CustomerID`, `PersonID`, `StoreID` |

Notice `Sales.Customer.PersonID` and `StoreID` are both real, and both
nullable — in AdventureWorks2012, a customer is *either* an individual
person *or* a store account, never both. `dw.DimCustomer` has to carry
that distinction forward honestly, not paper over it.

## The grain, decided first

Before naming a single column, this warehouse's grain gets fixed:
**one row per order line** — one row per `Sales.SalesOrderDetail`
record. Every column added to the fact table from here forward has to
be true at that grain. A column that describes something coarser (like
a whole order) or finer (like a single unit within a line) doesn't
belong on this table.

## The star, named

| Object | Role | Key columns |
|---|---|---|
| `dw.FactProductSales` | Fact — one row per order line | `ProductKey`, `OrderDateKey`, `TerritoryKey`, `CustomerKey` (FKs), `SalesOrderID`/`SalesOrderDetailID` (degenerate), `OrderQty`/`LineTotal` (measures) |
| `dw.DimProduct` | Dimension — flattened | `ProductKey` (surrogate), `ProductAlternateKey` (= `ProductID`), `ProductName`, `SubcategoryName`, `CategoryName` |
| `dw.DimDate` | Dimension — conformed calendar | `DateKey` (surrogate, `yyyyMMdd` integer), `FullDate`, `DayName`, `MonthName`, `Quarter`, `Year` |
| `dw.DimTerritory` | Dimension | `TerritoryKey` (surrogate), `TerritoryAlternateKey` (= `TerritoryID`), `TerritoryName`, `TerritoryGroup` |
| `dw.DimCustomer` | Dimension | `CustomerKey` (surrogate), `CustomerAlternateKey` (= `CustomerID`), `PersonID`, `StoreID`, `CustomerType` |

## Why dw.DimProduct flattens category and subcategory

In the raw OLTP schema, a product's category is three joins away:
`Production.Product` → `Production.ProductSubcategory` →
`Production.ProductCategory`. If `dw.DimProduct` only carried
`ProductSubcategoryID`, every single report in every one of the three
front-ends would have to re-derive the category name by re-running that
same two-table join, every time. Flattening `SubcategoryName` and
`CategoryName` directly onto `dw.DimProduct` — resolved once, during
the warehouse load — means every front-end gets one simple dimension
table instead of three joined ones. This is the exact same flattening
technique the Microsoft BI Capstone used for its product dimension,
applied here to a sales fact instead of a work-order fact.

## Build order: why the fact table comes before the dimensions are populated

Lesson 4 writes `dw.FactProductSales`'s `CREATE TABLE` statement with
plain `INT` columns for its foreign keys — no `REFERENCES` constraints
yet, because the dimension tables those constraints would point at
don't exist yet. Lesson 5 then creates and **populates** all four
dimension tables. Only once the dimensions have real surrogate keys in
them does Lesson 6 load the fact table and add the foreign-key
constraints via `ALTER TABLE`. Declaring a `REFERENCES` constraint
against a table that doesn't exist yet simply fails in SQL Server —
so the constraint has to wait until its target exists and is
populated, even though the column itself is defined up front.

## Key terms

| Term | Meaning |
|---|---|
| Star schema | A fact table at the center, surrounded by dimension tables it joins to |
| Grain | The level of detail one row in a fact table represents |
| Flattened dimension | A dimension where related attributes (like category) are resolved and stored directly on it, instead of requiring a further join |
| Degenerate dimension | An identifying column (like `SalesOrderID`) kept directly on the fact table instead of its own dimension table |

## Lab

1. In AdventureWorks2012, run the three-table join yourself:
   `SELECT p.Name, sc.Name AS Subcategory, c.Name AS Category FROM Production.Product p JOIN Production.ProductSubcategory sc ON p.ProductSubcategoryID = sc.ProductSubcategoryID JOIN Production.ProductCategory c ON sc.ProductCategoryID = c.ProductCategoryID;`
   — this is exactly the join `dw.DimProduct`'s load will run once, so
   no front-end has to run it ever again.
2. Run `SELECT DISTINCT PersonID, StoreID FROM Sales.Customer WHERE PersonID IS NOT NULL AND StoreID IS NOT NULL;` and confirm it returns zero rows — proof that a customer is always one or the other, never both.
3. Write out the five-table list above from memory, with each one's
   real key columns.

## Check yourself

You're ready for Lesson 4 when you can name the fact table's grain,
name all four dimensions and their surrogate keys, and explain why
`dw.FactProductSales`'s foreign-key constraints have to be added after
the dimensions exist rather than at the moment the fact table itself
is created.
