# Lesson 10 — Validating the Full Pipeline, End to End

**Chapter 2 · Building the Full Stack · Lesson 10 of 25**

## What you'll learn

- Why "it built without errors" and "it's correct" are two different
  claims, and this lesson only cares about the second one
- A concrete, repeatable checklist for validating a pipeline from raw
  source data all the way through to both finished reports
- The specific row-count and scrap-rate cross-checks this project
  needs, and how to run them
- How this connects back to Data Modeling & Data Warehousing's
  Chapter 5 on data quality in staging — the same discipline, applied
  to a finished, end-to-end system instead of one staging table

## Why validation is its own lesson

By this point in the project, SQL Server holds raw data (Lesson 3),
SSIS has moved it (Lesson 4), the warehouse has facts and dimensions
(Lessons 5-6), and both SSRS and Power BI read from it (Lessons 7-9).
Everything *runs*. That's not the same as everything being *right* —
a package can complete successfully while silently dropping rows, a
join can silently produce duplicates, and a measure can compute a
number that's precise and wrong at the same time.

Data Modeling & Data Warehousing's Chapter 5 taught data-quality
checks against a single staging table, in isolation. This lesson
applies that same QA mindset across the **entire** pipeline, because a
warehouse that's correct in isolation can still disagree with its
sources once every stage is chained together.

## Check 1: row counts match, source to warehouse

The most basic check there is: did every source row make it through?

```sql
SELECT COUNT(*) AS SourceRows FROM Production.WorkOrder;
SELECT COUNT(*) AS StagingRows FROM stg.WorkOrder;
SELECT COUNT(*) AS FactRows FROM dw.FactWorkOrder;
```

All three should match, since this fact table's grain is one row per
work order with no aggregation. If `FactRows` is lower, the SSIS
package (Lesson 4) is dropping rows — check its error output and any
lookup transformations that might be failing silently on a missing
dimension key. If `FactRows` is higher, something is duplicating rows,
almost always a join fan-out during a lookup.

## Check 2: no orphaned keys

Every fact row's foreign keys should resolve to a real dimension row —
if they don't, the report renders that row's product or date as blank
or wrong instead of failing loudly:

```sql
SELECT COUNT(*) AS OrphanedProductKeys
FROM dw.FactWorkOrder f
LEFT JOIN dw.DimProduct p ON f.ProductKey = p.ProductKey
WHERE p.ProductKey IS NULL;
```

Run the same pattern against `StartDateKey`, `EndDateKey`,
`DueDateKey`, and (where not null) `ScrapReasonKey`. The expected
result for every one of these is zero.

## Check 3: the numbers agree across tools

This is Lesson 9's promise, tested directly. Pick a product, then
compare its scrap rate computed three separate ways:

```sql
SELECT
  SUM(ScrappedQty) * 1.0 / SUM(OrderQty) AS ScrapRateFromSQL
FROM dw.FactWorkOrder f
JOIN dw.DimProduct p ON f.ProductKey = p.ProductKey
WHERE p.ProductName = @ProductName;
```

Run that raw SQL number against the same product filtered in
`WorkOrderProductionSummary.rdl`, and against the same product
filtered on the Power BI dashboard. All three numbers — raw SQL, SSRS,
Power BI — should agree to the decimal. If they don't, the mismatch is
almost never the warehouse; it's a difference in how each tool's
expression or measure was written (see Lesson 9's note on this exact
failure mode).

## Check 4: dates are in range

```sql
SELECT MIN(d.FullDate) AS Earliest, MAX(d.FullDate) AS Latest
FROM dw.FactWorkOrder f
JOIN dw.DimDate d ON f.EndDateKey = d.DateKey;
```

Compare this against the row count and date range you noted back in
Lesson 1's lab from raw `Production.WorkOrder` — the warehouse
shouldn't show dates outside the range the source data actually
covers.

## The QA mindset

None of these four checks require anything exotic — they're plain
`SELECT` statements. What matters is running them **every time** the
pipeline changes, not just once at the end. This is exactly the habit
Lesson 11 depends on: when a schema change lands, these same four
checks are how you confirm the change didn't quietly break something
downstream.

## Key terms

| Term | Meaning |
|---|---|
| Orphaned key | A foreign key value on a fact row with no matching row in the dimension it points to |
| Row-count parity | The check that the same number of logical rows exists at every stage of the pipeline |
| Cross-tool agreement | Confirming two different reporting tools compute the same business number from the same source |

## Lab

1. Run the row-count check across `Production.WorkOrder`,
   `stg.WorkOrder`, and `dw.FactWorkOrder`. Confirm all three match.
2. Run the orphaned-key check against all three role-playing date keys
   and `ProductKey`. Confirm each returns zero.
3. Pick one product and compute its scrap rate three ways — raw SQL,
   the SSRS report, and the Power BI dashboard. Confirm they agree.
4. Save these four queries in a script file — you'll reuse them
   verbatim after every future change to this pipeline, starting with
   Lesson 11.

## Check yourself

You're ready for Lesson 11 when you can run all four validation checks
from memory and explain, for each one, exactly what a failing result
would mean and where in the pipeline you'd go look first.
