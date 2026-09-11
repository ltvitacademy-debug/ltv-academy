# Script — Loading Raw Data With SQL Server

## Segment 1 (title)

This lesson is where the pipeline actually starts — not with the warehouse, but with a loosely-typed staging table that gives raw work order data somewhere safe to land first.

## Segment 2 (steps: extract, stage, transform)

Data Modeling & Data Warehousing's Chapter 5 already taught you why: a staging layer gives a bad load somewhere safe to fail, and it separates extraction from transformation. Production.WorkOrder gets extracted as-is, staged into stg.WorkOrder, and only transformed once it's already safely landed — that's exactly the discipline this capstone reuses for a new business process.

## Segment 3 (code: the staging DDL)

Here's the real T-SQL: a dedicated stg schema, kept separate from the warehouse's dw schema, and a stg.WorkOrder table that mirrors the source with wide, forgiving VARCHAR columns and no constraints. If a row arrives with a value SSIS can't cleanly convert yet, this table still accepts it — the fix happens downstream, not mid-load.

## Segment 4 (steps: what Lesson 4 builds on this)

After running this script, nothing has moved yet — you just have an empty schema and an empty table with the right shape. That's deliberate. Lesson 4's SSIS package is what actually writes rows here, using an OLE DB Destination pointed at exactly this table.

## Segment 5 (outro)

Next lesson, you'll build WorkOrderETL.dtsx in SSIS Designer — the actual package that reads Production.WorkOrder and writes into the staging table you just created.
