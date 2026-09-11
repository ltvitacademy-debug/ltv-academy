# Script — Staging & Warehouse Tables

## Segment 1 (title)

This lesson finishes the real T-SQL Lesson 3 started, and builds the two dimension tables this capstone's fact table depends on.

## Segment 2 (code: completing stg.WorkOrder)

Here's stg.WorkOrder, completed — every real column from Production.WorkOrder, still wide and forgiving. ScrapReasonID stays nullable here for a real reason: most work orders scrap nothing, so a valid row legitimately has no scrap reason at all.

## Segment 3 (code: DimProduct)

DimProduct is a Type 1, conformed dimension — a surrogate ProductKey as the primary key, and the real ProductID kept as an alternate key so the SSIS Lookup transformation has something concrete to match against.

## Segment 4 (code: DimScrapReason)

DimScrapReason is Type 0 — small, essentially static reference data. Production.ScrapReason barely changes, so there's no history worth tracking here, and pretending otherwise would be over-engineering a five-row table.

## Segment 5 (steps: stg vs dw)

Both schemas can live on the same SQL Server instance, but they're not interchangeable. Staging is loosely typed, unconstrained, and disposable. The warehouse is strictly typed, keyed, and durable — the version SSRS and Power BI actually read from. Keeping them as separate schemas makes that distinction visible in every object name.

## Segment 6 (outro)

Next lesson builds dw.FactWorkOrder itself — the accumulating snapshot fact table this entire capstone is designed around, including the three role-playing date keys.
