# Script — Validating the Full Pipeline, End to End

## Segment 1 (title)

Everything in this pipeline runs by now. Running and correct aren't the same claim. This lesson is a repeatable checklist for proving the second one.

## Segment 2 (code: row counts)

Check one: row counts. Count Production.WorkOrder, stg.WorkOrder, and dw.FactWorkOrder. All three should match, since this fact table's grain is one row per work order with no aggregation. A lower count means SSIS is dropping rows; a higher count means a join is duplicating them.

## Segment 3 (code: orphaned keys)

Check two: orphaned keys. Left join FactWorkOrder to DimProduct on ProductKey, and look for nulls on the dimension side. The same pattern applies to every role-playing date key. The expected result, every time, is zero.

## Segment 4 (steps: cross-tool agreement)

Check three: the numbers agree across tools. Pick one product and compute its scrap rate three ways — raw SQL, the SSRS report, and the Power BI dashboard. All three should agree to the decimal. If they don't, the bug is almost never the warehouse — it's a difference in how each tool's expression was written.

## Segment 5 (outro)

This same four-check habit is exactly what you'll lean on next lesson, when a schema change lands mid-project and you need to prove it didn't break anything downstream.
