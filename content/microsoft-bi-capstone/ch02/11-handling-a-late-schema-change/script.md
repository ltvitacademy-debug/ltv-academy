# Script — Handling a Late Schema Change

## Segment 1 (title)

Midway through this project, the source system changes. Production.WorkOrder gets a new ShiftCode column. This lesson walks through handling that change without breaking anything already built.

## Segment 2 (code: the ALTER TABLE)

The change originates with one small ALTER TABLE, adding a nullable ShiftCode column to Production.WorkOrder. From here, it has to ripple through every stage this capstone already built.

## Segment 3 (steps: fact or dimension)

Before touching any code, this is a modeling decision. ShiftCode is a low-cardinality descriptive attribute — the same shape as ScrapReason. That points at a new DimShift dimension with a ShiftKey foreign key on the fact table, not a raw code column bolted onto the fact table itself.

## Segment 4 (steps: the five-stop ripple)

The change has five real stops, in order: staging table, SSIS mapping, warehouse — new dimension and new foreign key, SSRS report, and Power BI model. Each stop only works because the one before it already landed.

## Segment 5 (outro)

Because every one of these changes is additive, nothing already in production breaks. Re-run Lesson 10's checklist, add one check for the new key, and this capstone's technical build is complete — Chapter 3 picks up with production practices next.
