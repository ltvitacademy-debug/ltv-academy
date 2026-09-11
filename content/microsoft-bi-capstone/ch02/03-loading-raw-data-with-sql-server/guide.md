# Lesson 3 — Loading Raw Data With SQL Server

**Chapter 2 · Building the Full Stack · Lesson 3 of 25**

## What you'll learn

- Where this pipeline actually starts: not the warehouse, but a
  loosely-typed landing table
- Why raw `Production.WorkOrder` data lands in a **staging table**
  before anything transforms it — the same staging discipline Data
  Modeling & Data Warehousing's Chapter 5 taught, now applied to a new
  business process
- The real T-SQL that creates the `stg` schema and `stg.WorkOrder`
  table
- What this lesson's SQL Server work sets up for Lesson 4's SSIS
  package to actually execute

## Where the pipeline starts

Lesson 1 named the business process this capstone models — manufacturing
work orders, captured in `AdventureWorks2012`'s `Production.WorkOrder`
table. Lesson 2 planned how data moves through this pipeline's five
tools. This lesson does the first real work: getting that raw data onto
SQL Server in a form the rest of the pipeline can build on.

That form is **not** the warehouse. It's a staging table — a landing
copy of the source data, changed as little as possible, that exists
purely as a safe place for Lesson 4's SSIS package to write to and
Lesson 5's transformation logic to read from.

## Why staging, not straight into the warehouse

Data Modeling & Data Warehousing's Chapter 5 covered this exact
question: why not just load source rows directly into the warehouse?
The answer holds here without modification. A staging layer:

- Gives a bad load somewhere safe to fail. If `Production.WorkOrder`
  sends a row SSIS can't handle, it fails against a table you can
  inspect and fix — not against the warehouse tables SSRS and Power BI
  are already reading from.
- Separates *extraction* from *transformation*. Lesson 4's first Data
  Flow Task only has to move rows; it doesn't have to resolve surrogate
  keys or classify anything at the same time.
- Gives Lesson 5's dimension and fact loads a stable, already-landed
  source to read from, instead of hitting the live OLTP table twice.

## The real source columns

`Production.WorkOrder` is a real `AdventureWorks2012` table. This
capstone's fact table (Lesson 6) will eventually need every one of
these columns:

| Column | What it holds |
|---|---|
| `WorkOrderID` | The work order's identifier — becomes a degenerate dimension on the fact table |
| `ProductID` | The product being manufactured — resolves to `dw.DimProduct` |
| `OrderQty` | The quantity planned |
| `StockedQty` | The quantity actually produced and stocked so far |
| `ScrappedQty` | The quantity scrapped so far |
| `StartDate` / `EndDate` / `DueDate` | Three milestone dates — resolve to three separate roles on `dw.DimDate` (Lesson 6) |
| `ScrapReasonID` | Why units were scrapped, if any — resolves to `dw.DimScrapReason`, nullable |
| `ModifiedDate` | When the source row last changed |

## Creating the staging table

`stg.WorkOrder` gets its own schema — `stg` — kept separate from `dw`,
the schema the warehouse tables will live in starting Lesson 5. Following
the same loosely-typed, forgiving pattern Data Warehousing's staging
lessons taught: wide string types, no constraints, and an audit column
recording when the row landed.

```sql
CREATE SCHEMA stg;
GO
CREATE TABLE stg.WorkOrder (
    WorkOrderID VARCHAR(20) NULL,
    ProductID   VARCHAR(20) NULL,
    OrderQty    VARCHAR(20) NULL,
    LoadDate    DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
```

This is deliberately a *start*, not the finished table — Lesson 5
completes it with every remaining source column (`StockedQty`,
`ScrappedQty`, the three date columns, and `ScrapReasonID`) once you've
seen the full warehouse shape those columns need to feed. For now,
notice what's already true of it: every business column is a wide,
nullable `VARCHAR`, there's no primary key, and there's nothing that
could make a load fail because of a data type mismatch.

## What this sets up for Lesson 4

After running the script above, the pipeline has exactly two things
that didn't exist before: an empty `stg` schema, and an empty
`stg.WorkOrder` table with the right shape to receive rows. Nothing has
moved yet — that's Lesson 4's job. `WorkOrderETL.dtsx`'s first Data Flow
Task will use an OLE DB Source pointed at `Production.WorkOrder` and an
OLE DB Destination pointed at exactly this table.

## Key terms

| Term | Meaning |
|---|---|
| Staging table | A loosely-typed landing copy of source data, kept separate from the warehouse, that exists as a buffer before transformation |
| Landing zone | Another name for where extracted rows are written before any transform logic runs |
| Loosely typed | Using wide, forgiving column types so a load never fails on a data type mismatch |
| Audit column | A column like `LoadDate` that records metadata about the load itself, not the business data |

## Lab

1. In SSMS, against a scratch database (not `AdventureWorks2012` or
   `AdventureWorksDW2014` — you don't want to alter either source),
   run the `CREATE SCHEMA` and `CREATE TABLE` statements above.
2. Confirm the table exists with the right columns:
   ```sql
   SELECT * FROM sys.columns
   WHERE object_id = OBJECT_ID('stg.WorkOrder');
   ```
3. Re-run the row count query from Lesson 1's lab
   (`SELECT COUNT(*) FROM Production.WorkOrder;`) and write down the
   number — you'll compare it against `stg.WorkOrder`'s row count once
   Lesson 4's package actually runs.

## Check yourself

You're ready for Lesson 4 when you can explain, without looking: why
does `stg.WorkOrder` use `VARCHAR` columns and no constraints instead
of matching `Production.WorkOrder`'s real data types, and what specific
problem does that forgiveness protect the load against?
