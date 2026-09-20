# Actual vs. Estimated Plans

Lesson 6 read a plan's shape. This lesson focuses on a single number pair inside that
shape — estimated rows vs. actual rows — and why a large gap between them is one of the
most reliable diagnostic signals in all of performance tuning.

## What you'll learn

- The real difference between an estimated plan and an actual plan
- How to capture both, including the STATISTICS PROFILE alternative
- Why a big estimated-vs-actual mismatch is a specific, actionable signal

## Estimated plan: a guess made before running anything

`Ctrl+L` in SSMS (or `SET SHOWPLAN_XML ON`) shows the plan the optimizer *would* use,
compiled from statistics alone, without executing the query at all. Every row count in an
estimated plan is the optimizer's prediction, based on column statistics (histograms,
density) at compile time. This is genuinely useful for previewing what a query will do
before running something expensive, or for checking a plan shape without touching data.

## Actual plan: what really happened

Toggling "Include Actual Execution Plan" (`Ctrl+M`) and then running the query produces a
plan that includes everything the estimated plan has, *plus* the real row counts that
actually flowed through each operator, actual number of executions (important for
operators inside a loop), and actual elapsed time per operator (SQL Server 2016+ shows
per-operator time directly in the plan). The older, script-based equivalent is:

```sql
SET STATISTICS PROFILE ON;  -- legacy text-based actual plan with real row counts
-- or, more modern:
SET STATISTICS XML ON;      -- actual plan as XML, same data SSMS's graphical view uses

SELECT * FROM Sales.SalesOrderDetail WHERE ProductID = 776;
```

## Reading the mismatch

Hover over any operator in an actual plan in SSMS, and the tooltip shows both
**Estimated Number of Rows** and **Actual Number of Rows** side by side. When these are
close, the optimizer's model matched reality and you can trust the rest of its
decisions in that plan. When they're wildly apart — say, an estimate of 12 rows against an
actual of 1.2 million — the optimizer built its entire plan (which join type, which index,
whether to go parallel) around a wrong picture of the data, and everything downstream of
that operator is suspect.

## The two usual causes

1. **Stale statistics** — the optimizer's histogram no longer reflects the table's
   current data distribution (heavy inserts/deletes since the last stats update). Fix:
   `UPDATE STATISTICS`, or ensure auto-update stats is keeping up (check
   `sys.dm_db_stats_properties` for `modification_counter` and `last_updated`).
2. **Parameter sniffing** — the plan was compiled for one parameter value and cached, then
   reused for a very different value where the row count assumption no longer holds
   (Lesson 9 covers this in full, including `OPTION (RECOMPILE)` and `OPTIMIZE FOR`).

Distinguishing the two matters: stale stats is fixed once, for everyone, by updating
statistics; parameter sniffing needs a plan-shape or compilation strategy fix, because the
statistics themselves might be perfectly current.

## Key terms

| Term | Meaning |
|---|---|
| Estimated plan | Compiled plan with predicted row counts, generated without running the query |
| Actual plan | Plan including real row counts, executions, and (2016+) per-operator time, from an actual run |
| STATISTICS PROFILE / XML | Script-based equivalents to SSMS's actual graphical plan |
| Estimated-vs-actual mismatch | A large gap signaling the optimizer's model of the data was wrong |

## Check yourself

An operator's tooltip shows Estimated Number of Rows: 8, Actual Number of Rows: 640,000.
Name the two most likely root causes this lesson gives you, and one concrete way to tell
which one it actually is.
