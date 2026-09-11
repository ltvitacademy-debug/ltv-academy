# Lesson 21 — The Staging Layer's Purpose

**Chapter 5 · Staging & ETL Design · Lesson 21 of 39**

## What you'll learn

- Why raw source data lands in an intermediate "staging" area before
  it ever reaches the warehouse
- What a staging layer is allowed to do that a warehouse table isn't
- The concrete problems a staging layer solves that loading straight
  from source to warehouse doesn't
- How staging fits into the classic Extract-Transform-Load pipeline

## The problem: source and warehouse rarely agree

By this point in the course you can design a star schema, choose a
grain, and handle Slowly Changing Dimensions. But none of that data
arrives at the warehouse in warehouse-shaped form. It starts out
scattered across OLTP databases, flat files, and other systems —
correctly typed for *their* jobs, not yours. Loading it directly into
final fact and dimension tables means every transformation, cleanup,
and lookup has to happen in the same breath as the load itself. One
slow step or one bad row can block or corrupt the whole operation.

The **staging layer** is the answer: a dedicated set of tables (often
its own schema or database) that holds source data temporarily, in a
form close to how the source produced it, before any of that
warehouse-shaping work happens.

## Where staging sits in the pipeline

![Diagram of the Extract, Transform, Load process: two data sources feeding a transformation engine, which loads into a target.](/courses/data-warehousing/ch05/21-the-staging-layers-purpose/etl.png)
*Microsoft's own description of this Extract stage: the transformation phase "often involves staging tables that temporarily hold data as it is processed."*

Read left to right: **Extract** pulls rows out of the source systems
essentially as-is. **Transform** is where staging earns its keep —
cleansing, deduplicating, type conversion, business-rule
transformations, and dimension lookups all happen against staged data,
not live source systems and not the final warehouse tables. **Load**
only happens once the data is already warehouse-shaped, so the
final insert or merge into fact and dimension tables is fast and
comparatively low-risk.

## What staging actually buys you

- **Isolation from the source system.** Once data is extracted, the
  source database is out of the picture. A slow transformation step
  no longer holds a connection or a lock against the production OLTP
  system that's still taking live orders.
- **A safe place to fail.** If a transformation step throws a bad row,
  it fails against a staging table you can inspect, fix, and re-run —
  not against a warehouse fact table that reports are actively
  querying.
- **Restart without re-extracting.** If a load fails halfway through,
  you can usually re-run the transform-and-load steps from the staged
  data without hitting the source system a second time — important
  when the source is a fragile legacy system or a rate-limited API.
- **A single place to look before it's a warehouse problem.** Data
  quality checks (Lesson 24) run against staging, before anything
  wrong has a chance to reach a table an analyst is actively querying.

## What a staging table is *not*

Staging tables are not reporting tables. Nobody outside the ETL
process should query them, they carry no guarantee of being
well-formed, and they're frequently truncated and reloaded from
scratch (Lesson 22 covers exactly how they're structured to make
that safe). Thinking of staging as "a rough draft, not a published
document" is the right mental model going into the rest of this
chapter.

## Key terms

| Term | Meaning |
|---|---|
| Staging layer | An intermediate set of tables holding source data temporarily before transformation and load into the warehouse |
| ETL | Extract, Transform, Load — the pipeline pattern where staging typically sits inside the Transform stage |
| Extract | Pulling data out of a source system, largely unchanged |
| Load | Inserting or merging already-transformed, warehouse-shaped data into fact and dimension tables |

## Lab

Sketch (on paper or in a diagram tool) the staging layer you'd design
for loading `AdventureWorks2012`'s `Sales.SalesOrderHeader` and
`Sales.SalesOrderDetail` into the `FactInternetSales` structure used
by `AdventureWorksDW2014`. Name the staging tables you'd create, and
for each one, write one sentence on what would go wrong if you skipped
it and transformed straight from the OLTP tables into the fact table
in one step.

## Check yourself

You're ready for Lesson 22 when you can explain, without looking, two
concrete things a staging layer protects you from that loading
directly from source to warehouse does not.
