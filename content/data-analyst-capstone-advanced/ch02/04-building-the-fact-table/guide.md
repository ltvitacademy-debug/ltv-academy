# Lesson 4 — Building the Fact Table

**Chapter 2 · Building the T-SQL Warehouse Layer · Lesson 4 of 26**

## What you'll learn

- The real `CREATE TABLE` statement for `dw.FactProductSales`
- Why its foreign-key columns are declared as plain `INT`, with no
  `REFERENCES` constraint, at this point in the build
- How to tell a surrogate foreign key, a degenerate dimension, and a
  measure apart just by looking at a fact table's column list
- Why `LineTotal` is loaded as a stored value instead of being
  recalculated by every front-end

## Creating the schema

Everything in this warehouse lives in a `dw` schema, kept separate
from the raw OLTP tables:

```sql
CREATE SCHEMA dw;
GO
```

## The fact table

```sql
CREATE TABLE dw.FactProductSales (
    SalesLineKey       INT IDENTITY(1,1) PRIMARY KEY,

    -- Dimension foreign keys (constraints added in Lesson 6,
    -- once dw.DimProduct, dw.DimDate, dw.DimTerritory, and
    -- dw.DimCustomer exist and are populated)
    ProductKey         INT NOT NULL,
    OrderDateKey        INT NOT NULL,
    TerritoryKey        INT NOT NULL,
    CustomerKey         INT NOT NULL,

    -- Degenerate dimensions — identify the source row, no own table
    SalesOrderID        INT NOT NULL,
    SalesOrderDetailID  INT NOT NULL,

    -- Measures
    OrderQty            INT NOT NULL,
    LineTotal           MONEY NOT NULL
);
```

## Reading the column list by group

Every column on this table falls into exactly one of three groups:

| Group | Columns | Why |
|---|---|---|
| Surrogate FK | `ProductKey`, `OrderDateKey`, `TerritoryKey`, `CustomerKey` | Will be resolved from the real source IDs by joining to each dimension's `AlternateKey` column during the load |
| Degenerate dimension | `SalesOrderID`, `SalesOrderDetailID` | Identify exactly which source row this fact row came from, with no attributes worth their own dimension table |
| Measure | `OrderQty`, `LineTotal` | The numbers every report in all three front-ends ultimately aggregates |

`SalesOrderDetailID` matters here specifically because it's the real
primary key of `Sales.SalesOrderDetail` — keeping it on the fact table
means you can always trace a warehouse row back to the exact source
row it came from, which Lesson 6's validation step depends on.

## Why no REFERENCES clause yet

`ProductKey`, `OrderDateKey`, `TerritoryKey`, and `CustomerKey` are
plain `INT NOT NULL` columns here — not `INT NOT NULL REFERENCES
dw.DimProduct(ProductKey)`. That's deliberate, not an oversight.
`dw.DimProduct`, `dw.DimDate`, `dw.DimTerritory`, and `dw.DimCustomer`
don't exist yet at this point in the build — Lesson 5 creates them.
Declaring a foreign key against a table that doesn't exist fails
immediately in SQL Server. The constraint gets added with `ALTER
TABLE ... ADD CONSTRAINT ... FOREIGN KEY` in Lesson 6, once every
dimension this fact table points at is built and populated.

## Why LineTotal is stored, not recalculated

In the raw OLTP source, `Sales.SalesOrderDetail.LineTotal` is itself a
computed column (`UnitPrice * (1 - UnitPriceDiscount) * OrderQty`).
This warehouse loads that already-computed value directly into
`dw.FactProductSales.LineTotal` as a stored measure, rather than
re-deriving it from `UnitPrice` and `UnitPriceDiscount` in every
front-end. If Power BI, Tableau, and Excel each recalculated
`LineTotal` from its raw inputs independently, a single rounding or
logic difference between three independent implementations becomes
exactly the kind of silent discrepancy this capstone's whole
architecture exists to prevent.

## Key terms

| Term | Meaning |
|---|---|
| Surrogate foreign key | A fact table column that will resolve to a dimension's warehouse-generated key, not its original source ID |
| Degenerate dimension | An identifying column kept directly on the fact table instead of its own dimension table |
| Stored measure | A value loaded into the warehouse once and reused by every consumer, instead of recalculated independently by each one |

## Lab

1. Run `CREATE SCHEMA dw;` and the `CREATE TABLE dw.FactProductSales`
   statement above against your own scratch SQL Server database.
2. In AdventureWorks2012, run
   `SELECT TOP 5 SalesOrderID, SalesOrderDetailID, ProductID, OrderQty, UnitPrice, UnitPriceDiscount, LineTotal FROM Sales.SalesOrderDetail;`
   and confirm `LineTotal` really does equal
   `UnitPrice * (1 - UnitPriceDiscount) * OrderQty` for each row.
3. Sort `dw.FactProductSales`'s nine columns into the three groups
   from memory — surrogate FK, degenerate dimension, measure.

## Check yourself

You're ready for Lesson 5 when you can explain, without looking, why
`ProductKey` is declared as a plain `INT` here instead of a column
with a `REFERENCES` constraint, and why `LineTotal` is loaded as a
stored value rather than recalculated by each front-end tool.
