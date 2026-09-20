# Script — Gathering a Performance Baseline

## Segment 1 (title)

The systematic loop starts with measure — and that has to happen before anything changes. Without a recorded normal, you can't tell whether a change actually helped, hurt, or did nothing.

## Segment 2 (code: Query Store)

Query Store is the best baseline source for query-level performance — it automatically persists historical duration, CPU time, and logical reads bucketed over time, without you having to run anything ahead of time.

## Segment 3 (code: DMV snapshot)

If Query Store isn't on, sys.dm_exec_query_stats gives cumulative stats since each plan compiled. It empties on eviction or restart, so snapshot it into a table now and diff against a later snapshot.

## Segment 4 (steps: three real sources)

Query-level data alone can miss the cause. PerfMon counters — or sys.dm_os_performance_counters in T-SQL — show the server as a whole: page life expectancy, batch requests per second, queue length.

## Segment 5 (outro)

Capture across at least one full representative business cycle, not a quiet 2 a.m. window, so the baseline reflects real peak and average load. Next up: turning all this into a repeatable tuning workflow.
