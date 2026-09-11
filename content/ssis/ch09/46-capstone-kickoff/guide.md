# Lesson 46 — Capstone Kickoff

**Chapter 9 · Capstone · Lesson 46 of 49**

## What you'll learn

- The scope of the capstone project you'll build across this chapter's
  four lessons: a real, end-to-end SSIS package, not a toy example
- The two real databases this project uses — the same ones the rest of
  this catalog already builds against — and exactly which tables from
  each one are in play
- The Extract → Transform → Load → Log architecture every lesson in this
  chapter adds one more piece to
- What you need in place before Lesson 47 starts building the package

## Why a capstone, and why now

Chapters 1 through 8 taught SSIS one piece at a time: control flow tasks
in Chapter 2, data flow components in Chapters 3–4, variables and
expressions in Chapter 5, error handling and logging in Chapter 6,
incremental loads and script components in Chapter 7, deployment in
Chapter 8. Real SSIS packages don't use those pieces one at a time — a
production package chains a dozen of them together, and the only way to
prove you can do that is to actually do it. That's this chapter.

Across Lessons 47–49 you'll build one continuous package, not four
separate ones. Lesson 47 gets a working version loading data end to end.
Lesson 48 makes it production-shaped by adding an incremental load and
real error handling. Lesson 49 wraps it up and turns it into something
you can put in front of a hiring manager.

## The project: extract, transform, load, log

| Stage | What it means for this project |
|---|---|
| **Extract** | Pull order data out of `AdventureWorks2012` — the same OLTP-style transactional database this catalog's T-SQL course queries directly |
| **Transform** | Reshape those rows into a warehouse-friendly fact, resolving business keys to surrogate keys along the way |
| **Load** | Land the result in a small dimensional target inside `AdventureWorksDW2014` — the same warehouse database that course's Chapter 12 already queries |
| **Log** | Record what happened on every run — rows loaded, errors caught, when it last succeeded — so the package is trustworthy without babysitting |

```
EXTRACT  ->  TRANSFORM  ->  LOAD  ->  LOG
(Ch09-47)    (Ch09-47)      (Ch09-47)  (Ch09-48)
             + incremental filter (Ch09-48)
```

Lesson 47 builds Extract, Transform, and Load end to end. Lesson 48 adds
Log — plus makes Extract incremental and makes the whole thing resilient
to bad rows. Nothing here is thrown away between lessons; each one edits
the same package.

## The source: AdventureWorks2012

Your package extracts from three real OLTP tables in `AdventureWorks2012`
— the exact database this catalog's T-SQL course already queries in its
early chapters:

- **`Sales.SalesOrderHeader`** — one row per order (`SalesOrderID`,
  `OrderDate`, `CustomerID`, `TotalDue`, `ModifiedDate`)
- **`Sales.SalesOrderDetail`** — one row per line item on an order
  (`SalesOrderID`, `ProductID`, `OrderQty`, `UnitPrice`, `LineTotal`)
- **`Production.Product`** — the product catalog (`ProductID`, `Name`,
  `ProductSubcategoryID`, `StandardCost`, `ListPrice`)

These are ordinary transactional tables — no dimensional shape, no
surrogate keys, just the rows a sales system actually writes.

## The target: a small warehouse-style star, inside AdventureWorksDW2014

Rather than writing into the real `FactInternetSales`/`DimProduct`
tables this catalog's T-SQL course already queries, this capstone
creates its own small, clearly-labeled star so it can't collide with
anything else living in that database:

- **`dbo.CapstoneDimProduct`** — `ProductKey` (identity), `ProductID`,
  `ProductName`
- **`dbo.CapstoneFactOrderSales`** — `SalesOrderID`, `DateKey`,
  `ProductKey`, `OrderQty`, `ExtendedAmount`

`CapstoneFactOrderSales.DateKey` joins straight to `AdventureWorksDW2014`'s
own real `dbo.DimDate` table (its `DateKey` is an `int` in `yyyymmdd`
format, e.g. `20140315`) — there's no need to build your own date
dimension when a correct one already exists in the same database.

## Key terms

| Term | Meaning |
|---|---|
| OLTP source | The transactional system data gets extracted from — here, `AdventureWorks2012` |
| Warehouse-style target | A dimensional, query-friendly destination shaped for reporting — here, the new `Capstone*` tables in `AdventureWorksDW2014` |
| Surrogate key | A warehouse-generated key (like `ProductKey`) standing in for a source system's business key (`ProductID`) |
| ETL vs. ELT | This capstone is ETL — SSIS does the transform in-flight, inside the data flow, before the row ever reaches the destination |

## Lab

Before Lesson 47, get both sides of the pipeline ready:

1. In SSMS, connect to the SQL Server instance holding both
   `AdventureWorks2012` and `AdventureWorksDW2014` (the same instance
   this catalog's T-SQL and Data Warehousing courses use).
2. Run this against `AdventureWorksDW2014` to create the capstone target:

   ```sql
   CREATE TABLE dbo.CapstoneDimProduct (
       ProductKey   INT IDENTITY(1,1) PRIMARY KEY,
       ProductID    INT NOT NULL,
       ProductName  NVARCHAR(50) NOT NULL
   );

   CREATE TABLE dbo.CapstoneFactOrderSales (
       SalesOrderID    INT NOT NULL,
       DateKey         INT NOT NULL,
       ProductKey      INT NOT NULL,
       OrderQty        SMALLINT NOT NULL,
       ExtendedAmount  MONEY NOT NULL
   );
   ```

3. In SSDT, create a new Integration Services project called
   `SSIS_Capstone` (Lesson 2 covers project setup if you need a refresher).
   Add two OLE DB connection managers: one to `AdventureWorks2012`, one to
   `AdventureWorksDW2014` (Lesson 5).
4. Sketch — on paper or in a text file, not in the designer yet — the
   control flow and data flow you think Lesson 47 is about to build,
   based on the Extract/Transform/Load stages above. You'll compare it
   against what you actually build next lesson.

## Check yourself

You're ready for Lesson 47 when both connection managers exist in your
new project, both `Capstone*` tables exist in `AdventureWorksDW2014`,
and you can explain in one sentence why the fact table stores
`ProductKey` instead of `ProductID`.
