# Lesson 112 — ETL vs. ELT

**Chapter 12 · Data Warehouse Concepts · Lesson 6 of 12**

## What you'll learn

- What **ETL** (Extract, Transform, Load) and **ELT** (Extract, Load,
  Transform) each mean
- Where the "transform" step actually happens, and why that difference
  matters
- A real, T-SQL-shaped example of the transform your source and warehouse
  tables actually need
- Why T-SQL itself is often the engine doing the "T" in ELT

## Same three letters, different order

Both approaches move data from a source system (like `AdventureWorks2012`)
into a warehouse (like `AdventureWorksDW2014`). The difference is **where**
the transformation step happens:

- **ETL**: Extract the data, **Transform** it in a separate staging area
  or dedicated engine, *then* Load the already-clean result into the
  warehouse.
- **ELT**: Extract the data, **Load** the raw data into the target system
  first, *then* Transform it there, using the target's own compute power.

## Why this actually matters

ETL keeps the warehouse itself simple — it only ever receives finished,
transformed data. But it needs a separate transformation engine, and
that engine can become its own bottleneck. ELT pushes the transformation
work onto the destination system's own processing power — which, for a
database like SQL Server, means **T-SQL itself becomes the transformation
engine**. Modern cloud warehouses lean toward ELT specifically because
their compute is cheap and scales well; loading raw first and transforming
with a `SELECT` afterward is often simpler than maintaining separate
transformation tooling.

## A real transformation, T-SQL shaped

Getting a row from `AdventureWorks2012`'s `Sales.SalesOrderDetail` into
`AdventureWorksDW2014`'s `FactInternetSales` isn't just a copy — it needs
real transformation: looking up the right `DimDate` key for the order
date, the right `DimProduct` key for the product, and computing derived
columns:

```sql
-- The "T" in ELT — a transformation written entirely in T-SQL,
-- run AFTER raw data has already landed
INSERT INTO dbo.FactInternetSales
    (ProductKey, OrderDateKey, SalesAmount, OrderQuantity)
SELECT
    dp.ProductKey,
    dd.DateKey,
    sod.UnitPrice * sod.OrderQty * (1 - sod.UnitPriceDiscount),
    sod.OrderQty
FROM Staging.SalesOrderDetail AS sod
JOIN dbo.DimProduct AS dp ON dp.ProductAlternateKey = sod.ProductID
JOIN dbo.DimDate AS dd ON dd.FullDateAlternateKey = CAST(sod.OrderDate AS DATE);
```

This single `INSERT...SELECT` **is** the transform step — joining raw
staged data against the warehouse's own dimension tables to translate
source keys into warehouse keys, and computing `SalesAmount` from raw
price and discount columns. In an ELT pipeline, exactly this kind of
statement runs *after* the raw rows have already been loaded into a
staging table.

## Key terms

| Term | Meaning |
|---|---|
| ETL | Extract, Transform (in a separate engine), then Load into the warehouse |
| ELT | Extract, Load (raw) into the target first, then Transform there |
| Staging table | A temporary landing area for raw, not-yet-transformed data |

## Lab

Run against `AdventureWorksDW2014` to see the shape of a completed
transformation:

```sql
-- See a fully-transformed fact row and its resolved dimension keys
SELECT TOP 5 f.SalesOrderNumber, dp.EnglishProductName, dd.FullDateAlternateKey, f.SalesAmount
FROM dbo.FactInternetSales AS f
JOIN dbo.DimProduct AS dp ON dp.ProductKey = f.ProductKey
JOIN dbo.DimDate AS dd ON dd.DateKey = f.OrderDateKey
ORDER BY f.OrderDateKey DESC;
```

## Check yourself

You're ready for Lesson 113 when you can explain, without looking: what's
the difference between where ETL and ELT perform their transformation
step, and why can T-SQL itself act as the transformation engine in ELT?
