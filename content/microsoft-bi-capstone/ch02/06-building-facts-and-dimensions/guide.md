# Lesson 6 — Building Facts & Dimensions

**Chapter 2 · Building the Full Stack · Lesson 6 of 25**

## What you'll learn

- The real `CREATE TABLE` statement for `dw.FactWorkOrder`, column by
  column
- Why this fact table is classified as an **accumulating snapshot**,
  and what that classification actually changes about how it's loaded
- Why `StartDateKey`, `EndDateKey`, and `DueDateKey` are all foreign
  keys to the *same* `dw.DimDate` table — a role-playing dimension,
  the pattern Data Modeling & Data Warehousing's Lesson 27 already
  taught, now applied to a new fact table
- An honest scope decision: why `Production.Location` is **not**
  modeled as a dimension here, even though it's a real, related table

This is the most conceptually important lesson in this chapter — every
other lesson in this stack (SSRS's report, Power BI's dashboard) reads
from what you build here. Get the grain and the keys right, and
everything downstream is straightforward. Get them wrong, and every
downstream lesson inherits the mistake.

## The grain, restated

Lesson 1 established the grain: **one row per work order**. Every
column on `dw.FactWorkOrder` has to make sense at that grain — a
column that doesn't (like something specific to one operation within a
work order) doesn't belong on this table at all.

## Building the fact table

```sql
CREATE TABLE dw.FactWorkOrder (
    WorkOrderKey    INT IDENTITY(1,1) PRIMARY KEY,

    -- Dimension foreign keys (surrogate keys, resolved by Lesson 4's Lookups)
    ProductKey      INT NOT NULL REFERENCES dw.DimProduct(ProductKey),
    ScrapReasonKey  INT NULL     REFERENCES dw.DimScrapReason(ScrapReasonKey),

    -- Role-playing dimension: three roles, one physical DimDate table
    StartDateKey    INT NOT NULL REFERENCES dw.DimDate(DateKey),
    EndDateKey      INT NULL     REFERENCES dw.DimDate(DateKey),
    DueDateKey      INT NOT NULL REFERENCES dw.DimDate(DateKey),

    -- Degenerate dimension — identifies the work order itself, no own table
    WorkOrderID     INT NOT NULL,

    -- Measures — StockedQty and ScrappedQty update as production progresses
    OrderQty        INT NOT NULL,
    StockedQty      INT NOT NULL DEFAULT 0,
    ScrappedQty     INT NOT NULL DEFAULT 0
);
```

Every column falls into exactly one of four groups, and it's worth
being able to name which group each one is in without looking at the
comments:

| Group | Columns | Why |
|---|---|---|
| Surrogate FK | `ProductKey`, `ScrapReasonKey` | Resolved from staging by Lesson 4's Lookup transformations, not carried straight from the source |
| Role-playing FK | `StartDateKey`, `EndDateKey`, `DueDateKey` | Three distinct roles, one physical `DimDate` table |
| Degenerate dimension | `WorkOrderID` | Identifies the row itself; not worth a separate one-column dimension table |
| Measure | `OrderQty`, `StockedQty`, `ScrappedQty` | The numbers a report actually aggregates |

`ScrapReasonKey` is nullable for the same reason `stg.WorkOrder`'s
`ScrapReasonID` was: a work order that scraps nothing has nothing to
resolve. `EndDateKey` is nullable too, but for a different reason —
covered next.

## Why this is an accumulating snapshot

A work order has a defined lifecycle: it's **started**, it's
**due** by some date, and it eventually **ends**. That's a pipeline
with a beginning, a predictable sequence, and an end — exactly the
shape Data Modeling & Data Warehousing's Lesson 9 defined an
**accumulating snapshot fact table** around, not a plain transaction
fact or a periodic snapshot.

That classification isn't just terminology — it changes how this table
actually gets loaded:

1. **Insert** a row the moment a work order starts. At that point,
   `StartDateKey` and `DueDateKey` are known, but the work order hasn't
   finished — `EndDateKey` is `NULL`, and `StockedQty`/`ScrappedQty`
   are both `0`.
2. **Update** that same row as production progresses. Every time more
   units get stocked or scrapped, `StockedQty` and `ScrappedQty` on
   *that exact row* increase — this table is not insert-only.
3. **Complete** the row once the work order ends: `EndDateKey` gets
   filled in with the real completion date, and the quantities reach
   their final values.

This is a genuinely different ETL pattern than `dw.DimProduct`'s
insert-or-overwrite load — Lesson 4's second Data Flow Task has to be
able to find an *existing* `dw.FactWorkOrder` row by `WorkOrderID` and
update it, not just always insert a new one.

## Role-playing dimensions, on a new fact table

`StartDateKey`, `EndDateKey`, and `DueDateKey` all point at the exact
same physical `dw.DimDate` table — three different business questions
("when did this start," "when did it end," "when was it due")
answered by one dimension, referenced three times. This is precisely
the pattern Data Modeling & Data Warehousing's Lesson 27 taught with a
different business entirely:

![Diagram shows an illustration of a star schema for airline flight facts, where the Airport dimension is related twice to the fact table as the Departure Airport dimension and the Arrival Airport dimension.](/courses/microsoft-bi-capstone/ch02/06-building-facts-and-dimensions/role-playing-dimensions.svg)
*One physical dimension, referenced multiple times, as multiple distinct roles — Lesson 27's Airport/Flight example. `dw.FactWorkOrder`'s three `DimDate` keys follow this exact mechanism.*

Just like that lesson's `Airport` table, there is only **one** physical
`dw.DimDate` table in this warehouse — never three copies of it. The
Power BI dashboard Lesson 8 builds will need to decide, at the semantic
model layer, which of these three relationships is *active* by default
(most likely `DueDateKey`, for on-time-vs-late reporting) and use
`USERELATIONSHIP` in DAX to reach the other two — the same decision
Lesson 27 flagged as living outside a warehouse course's own scope.

## Scope note: why Location isn't a dimension here

`Production.Location` is a real, related `AdventureWorks2012` table —
it's tempting to reach for it as a fourth dimension. It's deliberately
left out, and it's worth understanding exactly why, rather than just
noting its absence.

`Production.Location` records *where* a step of production happened —
but that's tracked at the `Production.WorkOrderRouting` table's grain,
one level **finer** than the grain this fact table chose. A single
work order passes through several routing operations, potentially at
several different locations, before it's done. Attaching a single
`LocationKey` to `dw.FactWorkOrder` would silently pick just one
location for a work order that may have touched several — which isn't
a modeling simplification, it's a factual error dressed up as one.

Modeling location correctly would mean either building a *second* fact
table at the `WorkOrderRouting` grain (a legitimate, larger project:
one row per operation, not per work order), or accepting a many-to-many
bridge between work orders and locations. Both are real options — and
both are out of scope for this capstone, which chose the work order
grain specifically. Noting that honestly, instead of quietly shipping
a `LocationKey` that lies about the grain, is itself part of doing this
job correctly.

## Key terms

| Term | Meaning |
|---|---|
| Accumulating snapshot fact table | One row per process instance, inserted at the start and updated as it reaches each milestone, until it completes |
| Role-playing dimension | One physical dimension table referenced multiple times by the same fact table, each reference a distinct business role |
| Degenerate dimension | An identifying column (like `WorkOrderID`) that rides directly on the fact table instead of getting its own dimension table |
| Grain mismatch | When a candidate dimension actually describes something finer or coarser than the fact table's chosen grain, making it unsafe to attach directly |

## Lab

1. Run the `CREATE TABLE dw.FactWorkOrder` statement above against the
   same scratch database as Lesson 5, after `dw.DimProduct` and
   `dw.DimScrapReason` already exist (foreign keys need their target
   tables to exist first).
2. Write, in your own words, the three-step load sequence (insert →
   update → complete) for one specific `WorkOrderID` of your choosing,
   naming which columns change at each step.
3. In `AdventureWorks2012`, run
   `SELECT DISTINCT LocationID FROM Production.WorkOrderRouting WHERE WorkOrderID = <pick one>;`
   for a work order with more than one routing step, and confirm it
   really does touch more than one location — the concrete proof
   behind this lesson's scope note.

## Check yourself

You're ready for Lesson 7 when you can explain, without looking: why
is `dw.FactWorkOrder` an accumulating snapshot and not a plain
transaction fact, why do its three date keys all reference the same
physical table, and why doesn't `Production.Location` get a foreign
key on this fact table even though it's a real, related table?
