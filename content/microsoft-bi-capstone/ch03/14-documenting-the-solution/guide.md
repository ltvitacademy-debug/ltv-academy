# Lesson 14 — Documenting the Solution

**Chapter 3 · Production Practices · Lesson 14 of 25**

## What you'll learn

- What real documentation for a finished BI pipeline actually looks
  like: a **data dictionary**, an **ETL runbook**, and
  **source-to-target mapping**
- Where each of those documents belongs, and what it needs to cover
- How to attach documentation directly to the database schema with
  `sp_addextendedproperty`, so it can't silently go stale

## The test: a new hire, day one

Deployment and scheduling make the pipeline run. Documentation is what
makes it someone else's problem to maintain, not just yours. The test
for whether documentation is actually good enough: could a new
teammate, with no other context, safely take this pipeline over from
what's written down?

Three documents answer almost everything they'd need.

## A data dictionary for the warehouse

A data dictionary describes every column in `dw.FactWorkOrder` and its
dimensions — `dw.DimProduct`, `dw.DimScrapReason`, `dw.DimDate` — in
plain language: what it holds, its grain, and anything non-obvious
about how it's populated (for example, that `ScrappedQty` can
legitimately be zero, or that `DimDate` covers a fixed date range set
when the warehouse was built).

## An ETL runbook for WorkOrderETL.dtsx

A runbook is operational, not architectural. It answers: what does the
package actually do, in what order, and — critically — what should
whoever's on call check first if it fails overnight? For
`WorkOrderETL.dtsx`, that's things like: which source table it reads
from, which staging tables it lands in first, what order the fact and
dimension loads run in, and where to check execution details when
something breaks (the SSISDB catalog reports covered in the next
lesson).

## Source-to-target mapping

Source-to-target mapping is the document that answers "where did this
number actually come from?" — tracing each column in `dw.FactWorkOrder`
back to the exact `AdventureWorks2012` column it was sourced from
(`Production.WorkOrder.ScrappedQty` feeding `FactWorkOrder.ScrappedQty`,
for example). It's the first place to check when a number in the
Power BI dashboard or the SSRS report looks wrong and you need to
trace it back to its source.

## Where ER-diagram documentation belongs

Some of this — table relationships in particular — doesn't need a
separate document at all. SSMS's built-in **Database Diagrams** tool
draws a live diagram straight from the schema itself.

![SSMS's Database Diagram designer, showing tables with their columns, primary keys, and the relationship lines connecting them.](/courses/microsoft-bi-capstone/ch03/14-documenting-the-solution/table-relationships.png)
*Because this reads the live schema, it can't drift out of date the way a hand-drawn diagram in a wiki page can.*

## Documentation that lives inside the database

Some documentation can go even further — attached directly to the
schema as metadata, rather than living in a separate file at all:

```sql
EXEC sp_addextendedproperty
  @name = N'MS_Description',
  @value = N'Units scrapped on this
    work order, from Production.WorkOrder.ScrappedQty.',
  @level0type = N'SCHEMA', @level0name = N'dw',
  @level1type = N'TABLE', @level1name = N'FactWorkOrder',
  @level2type = N'COLUMN', @level2name = N'ScrappedQty';
```

`sp_addextendedproperty` attaches that description directly to the
`ScrappedQty` column. It travels with the schema, is queryable with a
simple query against the system views, and can't quietly go stale the
way an external wiki page nobody remembers to update eventually does.

## Key terms

| Term | Meaning |
|---|---|
| Data dictionary | A document describing every column in the warehouse's fact and dimension tables — what it holds and how it's populated |
| ETL runbook | An operational document describing what an ETL package does, in what order, and what to check first if it fails |
| Source-to-target mapping | A document tracing each warehouse column back to the exact source column it came from |
| Extended property | Metadata attached directly to a database object via `sp_addextendedproperty`, queryable and stored with the schema itself |

## Lab

1. Write a one-page data dictionary entry for `dw.FactWorkOrder`,
   listing every column and one sentence describing what each one
   holds.
2. Write a short ETL runbook for `WorkOrderETL.dtsx`: the order its
   major steps run in, and the first two things you'd check if it
   failed overnight.
3. Run `sp_addextendedproperty` against one real column in your own
   `dw.FactWorkOrder` table (adjust the schema/table/column names to
   match what you built in Chapter 2), then confirm it's queryable via
   `sys.extended_properties`.

## Check yourself

You're ready for Lesson 15 when you can name the three documents a
finished BI pipeline needs, what question each one answers, and why
attaching a description with `sp_addextendedproperty` is more durable
than writing the same description in a separate wiki page.
