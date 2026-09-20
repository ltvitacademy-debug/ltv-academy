# Script — Wait Stats Methodology

## Segment 1 (title)

Every earlier chapter looked at cost from the query's side. Wait statistics flip that view — instead of asking what a query is doing, you ask what SQL Server is waiting on, across the whole instance, right now.

## Segment 2 (code: sys.dm_os_wait_stats)

Every time a task can't make progress, SQL Server logs it in sys.dm_os_wait_stats — cumulative since the last restart or the last clear. Ordering by wait_time_ms descending is the single most useful triage query in SQL Server, and it tells you the category of problem before you've looked at a single query.

## Segment 3 (code: signal vs. resource wait)

Wait time splits into two very different things: resource wait time, genuinely waiting for the resource itself, and signal wait time, ready to run but queued for a free CPU scheduler. High signal wait spread across every wait type points at CPU pressure; high resource wait concentrated in one wait type points at a specific subsystem.

## Segment 4 (steps: the methodology)

Because the DMV accumulates since the last restart, raw numbers are nearly useless for a current problem. Clear the counters with DBCC SQLPERF, let the workload run for your measurement window, then query again and rank by percentage of total — filtering out the benign background waits every idle instance always shows.

## Segment 5 (outro)

The top three or four wait types almost always account for the overwhelming majority of the problem. Next up: what it actually looks like when that top wait type points at the CPU.
