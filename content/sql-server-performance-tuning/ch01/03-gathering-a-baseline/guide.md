# Gathering a Performance Baseline

The systematic loop from Lesson 1 starts with "measure" — and that measurement has to
happen *before* anything changes, not after. Without a recorded "normal," you have no way
to tell whether a change actually helped, hurt, or did nothing. This lesson covers the
real sources SQL Server gives you for building that baseline.

## What you'll learn

- Why a baseline has to exist before you make a change, not just after
- Three real sources for baseline data: Query Store, DMV snapshots, and PerfMon counters
- What to actually capture, and how long to let it run

## Why "after" isn't enough

If you only measure after making a change, you're comparing the new number to your
memory, a guess, or nothing at all. "It feels faster" is not evidence — server load,
time of day, cache warmth, and a dozen other factors change minute to minute. A baseline
is a recorded snapshot of key metrics taken *before* you touch anything, specifically so
the after-measurement has something real to compare against. Skipping this step is how
teams end up in circular arguments about whether a change actually helped.

## Source 1: Query Store

Query Store (enabled per-database, `ALTER DATABASE ... SET QUERY_STORE = ON`) is the best
baseline source for query-level performance because it automatically persists historical
execution statistics — duration, CPU time, logical reads, execution count — bucketed into
time intervals, without you having to run anything yourself ahead of time. If it's
already on, you likely already have a baseline sitting in it.

```sql
SELECT qsq.query_id, qsqt.query_sql_text,
       rs.avg_duration, rs.avg_cpu_time, rs.avg_logical_io_reads,
       rs.count_executions, rsi.start_time
FROM sys.query_store_query AS qsq
JOIN sys.query_store_query_text AS qsqt ON qsqt.query_text_id = qsq.query_text_id
JOIN sys.query_store_plan AS qsp ON qsp.query_id = qsq.query_id
JOIN sys.query_store_runtime_stats AS rs ON rs.plan_id = qsp.plan_id
JOIN sys.query_store_runtime_stats_interval AS rsi ON rsi.runtime_stats_interval_id = rs.runtime_stats_interval_id
WHERE qsq.query_id = 4821
ORDER BY rsi.start_time;
```

## Source 2: sys.dm_exec_query_stats snapshots

If Query Store isn't on, `sys.dm_exec_query_stats` gives you cumulative execution
statistics for every plan currently in the cache — but it's cumulative *since the plan was
compiled*, and it empties on a plan eviction or a server restart. To use it as a baseline,
capture a snapshot into a table now, then capture another snapshot later and diff the
two, rather than trusting the raw cumulative numbers at a single point in time.

```sql
SELECT qs.query_hash, qs.execution_count,
       qs.total_worker_time, qs.total_elapsed_time,
       qs.total_logical_reads, GETDATE() AS captured_at
INTO dbo.QueryStatsBaseline_20260919
FROM sys.dm_exec_query_stats AS qs;
```

## Source 3: PerfMon counters

Query Store and DMVs tell you about individual queries. PerfMon (or the equivalent
`sys.dm_os_performance_counters` DMV, which exposes the same counters inside T-SQL)
tells you about the *server as a whole*: Batch Requests/sec, Page Life Expectancy,
Buffer cache hit ratio, Processor Queue Length, Avg. Disk sec/Read. A query-level baseline
without a server-level baseline can miss the actual cause — a query that "got slower"
might not have changed at all; the server it runs on might be under more memory or I/O
pressure than it was last month.

```sql
SELECT object_name, counter_name, cntr_value
FROM sys.dm_os_performance_counters
WHERE counter_name IN ('Page life expectancy', 'Batch Requests/sec')
  AND object_name LIKE '%Buffer Manager%' OR counter_name = 'Batch Requests/sec';
```

## How long to let it run

A baseline captured during a quiet 2 a.m. maintenance window doesn't represent the
workload you actually care about tuning. Capture across at least one full representative
business cycle — a full day for a system with daytime load, a full week if there's a
meaningful weekly pattern (month-end close, weekly batch jobs) — so the baseline reflects
real peak and average conditions, not a lucky or unlucky moment.

## Key terms

| Term | Meaning |
|---|---|
| Query Store | Per-database feature that automatically persists historical query execution statistics over time |
| sys.dm_exec_query_stats | DMV of cumulative per-plan execution stats since compilation; empties on eviction/restart |
| PerfMon counter | Server-wide performance metric (also exposed via sys.dm_os_performance_counters) |
| Representative window | A capture period long enough to include real peak and average load, not just a quiet moment |

## Check yourself

A DBA captures a single PerfMon snapshot at 2 a.m., calls it "the baseline," then compares
it to a snapshot taken at 2 p.m. the next day. What's wrong with that comparison, per this
lesson?
