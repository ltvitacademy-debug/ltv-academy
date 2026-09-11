# Lesson 2 — Architecture Planning: Raw Data to Reporting

**Chapter 1 · Capstone Overview · Lesson 2 of 25**

## What you'll learn

- How to turn Lesson 1's five-tool sketch into a named, concrete
  architecture — the actual staging table, fact table, dimension
  tables, SSIS package, SSRS report, and Power BI connection this
  capstone builds
- Why `dw.FactWorkOrder` is an **accumulating snapshot** fact, not a
  transaction fact, and what that means for its columns
- Why the fact table needs three **role-playing** foreign keys to
  `DimDate` instead of one
- Why `Production.Location` is explicitly out of scope for this
  capstone's dimensional model

## Why this lesson exists

Lesson 1 sketched the pipeline in the abstract: SQL Server, then SSIS,
then a warehouse, then SSRS and Power BI. That's enough to understand
*that* a pipeline is coming, but it's not enough to start building one.
A real BI developer doesn't start writing SSIS packages against
"the warehouse" — they start against a named table with named columns,
because every downstream piece (the report, the dashboard, the
deployment) has to agree on those names before any of them can be
built. This lesson is where that agreement gets written down. Every
lesson from here through the end of Chapter 2 builds directly against
what's decided here.

## The pipeline, named

| Stage | Object | Role |
|---|---|---|
| Source | `Production.WorkOrder`, `Production.Product`, `Production.ScrapReason` (`AdventureWorks2012`) | Raw, untouched source data |
| Staging | `stg.WorkOrder` | Raw landing copy of `Production.WorkOrder` — no transformation yet |
| ETL | `WorkOrderETL.dtsx` | The SSIS package that moves data from staging into the warehouse |
| Warehouse (fact) | `dw.FactWorkOrder` | One row per work order — the accumulating snapshot at the center of this model |
| Warehouse (dimensions) | `dw.DimProduct`, `dw.DimScrapReason`, `dw.DimDate` | What the fact table's foreign keys point to |
| Reporting | `WorkOrderProductionSummary.rdl` | An SSRS paginated report, grouped by product |
| Visualization | A Power BI report reading `dw.FactWorkOrder` and its dimensions directly | Trend and comparison visuals a paginated report isn't built for |

Notice what this table does that Lesson 1's sketch couldn't: every row
names a real object. That's the difference between a plan and an
architecture — a plan says "a warehouse," an architecture says
`dw.FactWorkOrder`.

## The grain: one row per work order

Every dimensional model starts with a grain decision, and it has to be
made before a single column gets named. This capstone's grain is **one
row per work order**. Not one row per operation, not one row per day of
production — one row per `Production.WorkOrder` record. Every column
that gets added to the fact table from here on has to be true at that
grain, and every dimension has to join to it at that grain without
fanning rows out or collapsing them.

## The fact table: an accumulating snapshot

`dw.FactWorkOrder` is classified as an **accumulating snapshot** fact,
not a transaction fact. A transaction fact captures an event once, at
one moment, and never changes — a single sale, a single scan. A work
order isn't like that: it's opened, it progresses, and its measures
change as it does. `StockedQty` and `ScrappedQty` both start near zero
and update as production runs. That's the defining trait of an
accumulating snapshot — the same row gets revisited and updated as a
process moves through its lifecycle, rather than a new row being
inserted at each step.

| Column | Type | Purpose |
|---|---|---|
| `WorkOrderKey` | Surrogate PK | The warehouse's own identity for the row |
| `ProductKey` | FK to `DimProduct` | Which product this work order builds |
| `ScrapReasonKey` | FK to `DimScrapReason`, nullable | Why a unit was scrapped — null until one actually is |
| `StartDateKey` | FK to `DimDate` | When production started |
| `EndDateKey` | FK to `DimDate` | When production actually finished |
| `DueDateKey` | FK to `DimDate` | When production was due to finish |
| `WorkOrderID` | Degenerate dimension | The original `AdventureWorks2012` work order number, kept for traceability |
| `OrderQty` | Measure | Quantity planned |
| `StockedQty` | Measure | Quantity actually completed and stocked so far |
| `ScrappedQty` | Measure | Quantity scrapped so far |

`WorkOrderID` is a **degenerate dimension** — a dimension-like
attribute (an identifying number) that lives directly on the fact
table instead of in its own dimension table, because it has no other
attributes worth modeling separately. You'll recognize the pattern from
`SalesOrderNumber` on a sales fact, if you built one in an earlier
course.

## Three dates, one dimension: role-playing keys

`StartDateKey`, `EndDateKey`, and `DueDateKey` all point at the same
`dw.DimDate` table. That's deliberate, and it's a direct callback to
Data Modeling & Data Warehousing's Lesson 27. A **role-playing
dimension** is a single physical dimension table that gets referenced
by more than one foreign key on the same fact table, with each key
representing a different role that dimension plays. Building three
separate date dimensions — one for start, one for end, one for due —
would triple the maintenance cost of a table that never actually
changes shape. Instead, `DimDate` gets built once, and three foreign
keys reference it, each aliased to its role (`StartDate`, `EndDate`,
`DueDate`) at query time.

## The dimensions

| Dimension | Type | Key columns |
|---|---|---|
| `dw.DimProduct` | Type 1 (conformed) | `ProductKey` (surrogate), `ProductAlternateKey` (= `ProductID`), `Name`, `ProductNumber` |
| `dw.DimScrapReason` | Type 0 (static reference) | `ScrapReasonKey`, `ScrapReasonAlternateKey`, `Name` |
| `dw.DimDate` | Conformed | Same pattern as the Data Warehousing course's date dimension |

`DimProduct` is Type 1 because a product's name or number changing
doesn't need history tracked for this capstone's reporting needs — the
current value simply overwrites the old one. `DimScrapReason` is Type
0 because scrap reasons are small, static reference data: `Production.
ScrapReason` doesn't grow or change once loaded, so there's no slowly
changing dimension logic to apply at all.

## What's explicitly out of scope: Production.Location

`Production.Location` is a real table in `AdventureWorks2012`, and it's
tempting to reach for it — but it lives at the `WorkOrderRouting`
(operation) grain, one level finer than the work-order grain this
capstone chose. A single work order can pass through several
locations as it moves through production; modeling `Location` as a
dimension on `FactWorkOrder` would either fan the fact table out to a
finer grain than intended, or force an arbitrary "pick one location"
rule that doesn't reflect reality. Rather than force it in, this
architecture leaves it out. That's a scope decision, not a gap — and
it's one you'll learn to talk about as a strength in Lesson 24.

## How SSRS and Power BI connect

Both `WorkOrderProductionSummary.rdl` and the Power BI report read the
*same* warehouse tables — `dw.FactWorkOrder` joined to its three
dimensions. SSRS connects through a shared data source pointed at the
warehouse and renders a grouped, matrix-style paginated report: rows
grouped by product, columns for `OrderQty`, `StockedQty`,
`ScrappedQty`, and a computed scrap rate. Power BI connects
independently, through Power BI Desktop, and builds visuals SSRS isn't
suited for: a scrap rate trend over time, an on-time-versus-late
completion comparison (`EndDate` against `DueDate`), and production
volume by product. Neither tool feeds the other — they're two
independent consumers of one shared warehouse, which is exactly the
point of building the warehouse in the first place.

## Key terms

| Term | Meaning |
|---|---|
| Accumulating snapshot fact | A fact table row that gets revisited and updated as a business process moves through its lifecycle, rather than inserted once and left alone |
| Role-playing dimension | One physical dimension table referenced by more than one foreign key on the same fact table, each key representing a different role |
| Degenerate dimension | An identifying attribute kept directly on the fact table instead of given its own dimension table |
| Grain | The level of detail one row in a fact table represents — here, one row per work order |

## Lab

1. In SSMS, against `AdventureWorks2012`, run:
   ```sql
   SELECT WorkOrderID, ProductID, OrderQty, StockedQty, ScrappedQty,
          ScrapReasonID, StartDate, EndDate, DueDate
   FROM Production.WorkOrder
   ORDER BY WorkOrderID
   OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY;
   ```
   Match each column you see against the fact table design above —
   confirm for yourself that every measure and every foreign key this
   lesson names actually has a source column to come from.
2. Run `SELECT COUNT(*) FROM Production.WorkOrder WHERE ScrapReasonID
   IS NOT NULL;` compared against a plain `COUNT(*)`. The gap between
   the two numbers is exactly why `ScrapReasonKey` has to be nullable
   on the fact table.
3. Write down, in one sentence, why `StartDateKey`, `EndDateKey`, and
   `DueDateKey` all reference the same `DimDate` table instead of three
   separate date dimensions. You'll want this exact explanation again
   in Lesson 24.

## Check yourself

You're ready for Lesson 3 when you can name every object in this
architecture from memory — the staging table, the fact table, its
three dimensions, the SSIS package, the SSRS report — and explain why
`Production.Location` was deliberately left out of the model.
