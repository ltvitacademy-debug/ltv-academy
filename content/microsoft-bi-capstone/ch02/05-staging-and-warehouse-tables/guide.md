# Lesson 5 — Staging & Warehouse Tables

**Chapter 2 · Building the Full Stack · Lesson 5 of 25**

## What you'll learn

- The finished `stg.WorkOrder` DDL, with every real source column
  Lesson 3 left out
- The real `CREATE TABLE` statements for `dw.DimProduct` and
  `dw.DimScrapReason`
- Why this capstone references `dw.DimDate` instead of rebuilding it
- Why staging and warehouse tables live in separate schemas, even
  though they sit on the same SQL Server instance

## Completing stg.WorkOrder

Lesson 3 created `stg.WorkOrder` with three business columns, enough to
show the pattern. Here's the same table, completed with every column
`Production.WorkOrder` actually has, still following the same
loosely-typed, forgiving rule:

```sql
CREATE TABLE stg.WorkOrder (
    WorkOrderID   VARCHAR(20)  NULL,
    ProductID     VARCHAR(20)  NULL,
    OrderQty      VARCHAR(20)  NULL,
    StockedQty    VARCHAR(20)  NULL,
    ScrappedQty   VARCHAR(20)  NULL,
    StartDate     VARCHAR(30)  NULL,
    EndDate       VARCHAR(30)  NULL,
    DueDate       VARCHAR(30)  NULL,
    ScrapReasonID VARCHAR(20)  NULL,
    ModifiedDate  VARCHAR(30)  NULL,
    LoadDate      DATETIME2    NOT NULL DEFAULT SYSUTCDATETIME()
);
```

Notice `ScrapReasonID` is nullable here for the same reason it'll stay
nullable all the way through to `dw.FactWorkOrder.ScrapReasonKey`: most
work orders scrap nothing, so a real, valid row can legitimately arrive
with no scrap reason at all.

## Building the dimensions

Both of this capstone's dimensions follow the same shape Data Modeling
& Data Warehousing's capstone used: an identity **surrogate key** as
the primary key, and the OLTP **natural key** kept as an alternate key
so ETL can look rows up by their original source identifier.

```sql
-- Type 1 / conformed — overwritten in place, no history tracked
CREATE TABLE dw.DimProduct (
    ProductKey          INT IDENTITY(1,1) PRIMARY KEY,
    ProductAlternateKey INT          NOT NULL,   -- Production.Product.ProductID
    Name                NVARCHAR(50) NOT NULL,
    ProductNumber       NVARCHAR(25) NOT NULL
);

-- Type 0 — small, essentially static reference dimension
CREATE TABLE dw.DimScrapReason (
    ScrapReasonKey          INT IDENTITY(1,1) PRIMARY KEY,
    ScrapReasonAlternateKey INT          NOT NULL,   -- Production.ScrapReason.ScrapReasonID
    Name                    NVARCHAR(50) NOT NULL
);
```

`DimProduct` is Type 1 (overwrite) because this capstone doesn't need
to track how a product's name changed over time — the current name is
enough for a manufacturing report. `DimScrapReason` is Type 0 because
it's a small, essentially static reference table: `Production.ScrapReason`
in the real `AdventureWorks2012` database rarely changes, and when it
does, overwriting in place is the honest choice rather than pretending
this needs SCD Type 2 history tracking it doesn't.

## Referencing dw.DimDate, not rebuilding it

This capstone's fact table needs a date dimension, but it doesn't need
a *new* one. `dw.DimDate` is the same conformed calendar dimension Data
Modeling & Data Warehousing's capstone already built — one row per
calendar day, a surrogate `DateKey` (e.g. `20130615`), and the usual
calendar attributes (day name, month name, quarter, year). Lesson 6
references this exact table three separate times, once per milestone
date — that's the payoff of building a date dimension once and
reusing it, instead of building three near-identical copies for this
one fact table.

## Why stg and dw are separate schemas

Both schemas can live on the exact same SQL Server instance — there's
no requirement to split them across servers or even across databases.
The separation is about what each schema is *allowed* to guarantee:

| | `stg` schema | `dw` schema |
|---|---|---|
| Column types | Wide, forgiving (`VARCHAR`) | Strict, narrow (`INT`, `NVARCHAR(50)`, `DATE`) |
| Constraints | None | Primary keys, foreign keys |
| Keys | Natural/source keys only | Surrogate keys, resolved during ETL |
| Lifespan | Disposable — truncated and reloaded each run | Persistent — the durable version of the data |
| Who reads it | Only the ETL process itself | SSRS, Power BI, and anyone querying the warehouse |

If staging and warehouse tables shared one schema, there'd be no clean
way to tell, just by looking at an object name, whether a table is safe
to query for a report or is mid-load scratch space. Keeping them in
`stg` and `dw` makes that distinction visible in every single object
name, without anyone having to remember it.

## Key terms

| Term | Meaning |
|---|---|
| Surrogate key | A warehouse-generated key (here, `IDENTITY`), independent of any OLTP source key |
| Natural / alternate key | The original OLTP key (e.g. `ProductID`) kept on the dimension for lookup during ETL |
| Conformed dimension | A dimension built once and reused by multiple fact tables (or multiple roles on one fact table), rather than rebuilt per use |
| SCD Type 0 / Type 1 | Type 0: never changes, or changes are simply overwritten with no tracking. Type 1: overwritten in place, no history kept |

## Lab

1. Run the completed `stg.WorkOrder` statement above against the same
   scratch database from Lesson 3 (drop and recreate the table, or
   `ALTER TABLE` to add the missing columns).
2. Run both `CREATE TABLE` statements for `dw.DimProduct` and
   `dw.DimScrapReason` in a `dw` schema in the same scratch database
   (`CREATE SCHEMA dw;` first, if it doesn't already exist).
3. In `AdventureWorksDW2014`, run
   `SELECT TOP 5 * FROM dbo.DimDate ORDER BY DateKey;` and compare its
   columns to the description above — confirm it's the same shape
   Lesson 6 will reference.

## Check yourself

You're ready for Lesson 6 when you can explain, without looking: why
does `dw.DimScrapReason` get SCD Type 0 instead of Type 1 or Type 2,
and why does this capstone reference an existing `DimDate` table
instead of building its own?
