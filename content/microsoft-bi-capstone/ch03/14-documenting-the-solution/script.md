# Script — Documenting the Solution

## Segment 1 (title)

Picture a new hire inheriting this pipeline with no context. What do they need on day one? That's what real documentation for a finished BI solution actually looks like.

## Segment 2 (steps: three documents)

Three documents cover almost everything. A data dictionary describes every column in dw.FactWorkOrder and its dimensions. An ETL runbook describes what WorkOrderETL.dtsx does, in what order, and what to check first if it fails overnight. And a source-to-target mapping ties each warehouse column back to the exact AdventureWorks2012 column it came from.

## Segment 3 (screenshot: SSMS database diagrams)

SSMS's built-in Database Diagrams tool draws dw.FactWorkOrder's keys and relationships straight from the live schema — no separate tool, no risk of the diagram drifting out of date the way a hand-drawn one does.

## Segment 4 (code: sp_addextendedproperty)

Some of that documentation can live inside the database itself. sp_addextendedproperty attaches a description directly to a column — here, explaining that FactWorkOrder's ScrappedQty comes from Production.WorkOrder.ScrappedQty. That description travels with the schema and is queryable with a query, unlike a wiki page nobody remembers to update.

## Segment 5 (outro)

Documentation is what makes this pipeline someone else's problem to maintain, not just yours. Next lesson closes out production practices with monitoring — how you'd know, day to day, that everything you just documented is still healthy.
