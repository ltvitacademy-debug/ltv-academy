# Script — Wait Statistics

## Segment 1 (title)

Every task in SQL Server is either running, runnable, or suspended waiting on something else — a page from disk, a lock, a log flush. Sys.dm_os_wait_stats is where SQL Server keeps score on that third state.

## Segment 2 (code: sys.dm_os_wait_stats)

This is a cumulative counter since the instance last started. Wait_time_ms is total time waiting on that wait type. Signal_wait_time_ms is the slice spent waiting for a CPU afterward — subtract it out and you get genuine resource wait time. Filter out the background noise types before ranking.

## Segment 3 (steps: waits worth knowing)

A handful of wait types explain most tickets. PAGEIOLATCH means waiting on disk I/O for data pages. LCK_M waits mean blocking, which we cover fully next lesson. WRITELOG points at the transaction log drive. None of these are automatically bad — only when one dominates and keeps climbing.

## Segment 4 (code: clean baseline)

To take a clean snapshot around a specific workload, clear the counters first with DBCC SQLPERF, run the workload, then query sys.dm_os_wait_stats again. Every number now reflects only what happened since the clear.

## Segment 5 (outro)

Wait statistics tell you what SQL Server has been waiting on in aggregate. Next up: turning LCK_M waits into an actual blocking chain, tracing exactly which session is blocking which.
