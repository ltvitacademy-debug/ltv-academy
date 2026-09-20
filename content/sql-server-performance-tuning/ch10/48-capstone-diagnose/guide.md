# Capstone: Diagnose

Time to run the loop for real. This lesson gathers a baseline (Chapter 1), reads the
actual execution plan of `dbo.usp_CustomerOrderHistory` (Chapter 2), and checks real wait
statistics (Chapter 5) — in that order — until the bottleneck is a specific, named thing,
not a feeling.

## What you'll learn

- How to pull a real baseline for a specific procedure out of Query Store
- How to read the actual plan and spot the operator actually costing you time
- How wait statistics confirm the story the plan is already telling you

## Step 1: Measure — Query Store baseline

Query Store (Chapter 7) already has weeks of history, so there's no need to guess at
"normal." A query against `sys.query_store_query` joined to `sys.query_store_runtime_stats`
for `dbo.usp_CustomerOrderHistory` shows two very different populations of executions:

```sql
SELECT rs.avg_duration / 1000.0 AS avg_duration_ms,
       rs.avg_logical_io_reads,
       rs.count_executions
FROM sys.query_store_query AS q
JOIN sys.query_store_runtime_stats AS rs
    ON rs.plan_id = q.query_id  -- (via query_store_plan)
WHERE q.object_id = OBJECT_ID('dbo.usp_CustomerOrderHistory');
```

For a typical consumer account, this procedure averages about **15 ms** and **640
logical reads**. But when the parameter is a wholesale `CustomerID` like TrailWorks
Co-op's `48213`, running it directly with `SET STATISTICS IO, TIME ON` tells a different
story: **~28 seconds** of elapsed time and **~118,000 logical reads** for one execution.
That's the baseline — not "the database is slow," but "this exact procedure, for this
exact class of customer, costs 190x more than normal."

## Step 2: Identify — read the actual execution plan

Pulling the actual execution plan (Chapter 2) for the slow case shows a plan that looks
completely reasonable at a glance: an **Index Seek** on `IX_Orders_CustomerID`, feeding a
**Nested Loops** join into a **Key Lookup** against the clustered index, to fetch
`OrderDate`, `OrderStatus`, `OrderTotal`, and `ShipDate` — the columns the narrow
`CustomerID`-only index doesn't carry. Hovering the Key Lookup operator shows it running
**18,400 times** for this one execution — once per row the seek finds for
`CustomerID = 48213` — and its cost share of the plan is over 90%. For a 40-order
consumer account, 40 Key Lookups are invisible. For an 18,400-order wholesale account,
18,400 Key Lookups against random pages of a 14-million-row clustered index is exactly
what turns a millisecond query into a 28-second one.

## Step 3: Confirm — wait statistics

Chapter 5's methodology says don't stop at the plan — confirm it against what the engine
was actually waiting on. Checking `sys.dm_os_wait_stats` (server-wide) alongside Query
Store's own wait-stats breakdown for this query during the 10 AM–2 PM window shows one
category dominating: **`PAGEIOLATCH_SH`** — waits for shared latches on data pages being
read from disk into the buffer pool. That's consistent with the plan: thousands of Key
Lookups per execution, scattered across a 14-million-row table, don't all hit pages
already cached. Multiply that by several reps pulling wholesale-account histories in the
same peak window, and you get exactly the load-correlated symptom from Lesson 47.

## The specific, named bottleneck

`IX_Orders_CustomerID` is a **non-covering index** for this query. It seeks efficiently on
`CustomerID`, but every other column the query needs triggers a Key Lookup — cheap per
row, catastrophic multiplied by 18,400. This isn't "the database is slow." It's: *the
Order History query lacks a covering index, and the cost scales linearly with a
customer's order count* — which is exactly why only high-volume wholesale accounts, at
peak concurrency, are affected.

## Key terms

| Term | Meaning |
|---|---|
| Key Lookup | A plan operator that fetches additional columns from the clustered index/table when a nonclustered index doesn't carry them |
| Covering index | An index containing (as key or INCLUDE columns) every column a query needs, avoiding Key Lookups entirely |
| PAGEIOLATCH_SH | A wait type for a shared latch held while reading a data page from disk into the buffer pool |
| Baseline (this query) | ~15 ms / 640 logical reads for a consumer account vs. ~28 sec / 118,000 logical reads for a wholesale account |

## Check yourself

The execution plan shows a Key Lookup running 18,400 times with over 90% of the plan's
cost. Why does that single detail — rather than just "the query is slow" — already tell
you almost exactly what Lesson 49's fix needs to do?
