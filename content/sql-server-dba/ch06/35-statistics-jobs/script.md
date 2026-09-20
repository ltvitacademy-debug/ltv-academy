# Script — Statistics Jobs

## Segment 1 (title)

Statistics are a histogram-like summary of data distribution that the optimizer uses to estimate row counts and pick a plan. They auto-update once enough rows change, but that threshold can lag on a table that changes heavily and constantly.

## Segment 2 (code: updating statistics manually)

UPDATE STATISTICS refreshes one statistics object or every one on a table. The default is a sampled scan, fast and usually good enough; WITH FULLSCAN reads every row for more accuracy at a higher cost.

## Segment 3 (code: a database-wide sweep)

sp_updatestats walks every table in the database and updates only the statistics that actually changed since last time. It's a reasonable blanket step, but it always uses a sampled scan, never FULLSCAN.

## Segment 4 (steps: cadence for high-churn tables)

High-churn OLTP tables are where the auto-update threshold lags worst — a nightly scheduled update beats relying on auto-update alone. Static reference tables are fine with a weekly sweep. And after any large bulk load, always update statistics explicitly, regardless of the regular schedule.

## Segment 5 (outro)

Next up: backup jobs — scheduling full, differential, and transaction log backups through SQL Server Agent.
