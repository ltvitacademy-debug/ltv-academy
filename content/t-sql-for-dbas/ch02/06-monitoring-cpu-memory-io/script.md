# Script — Monitoring CPU, Memory & I/O With T-SQL

## Segment 1 (title)

Chapter 1 covered the catalog views and DMVs a DBA needs to know exist. Chapter 2 puts them to work: real, repeatable T-SQL queries for the three resources every performance problem traces back to — CPU, memory, and disk I/O.

## Segment 2 (code: performance counters)

SQL Server maintains hundreds of internal counters, the same ones Performance Monitor graphs, exposed as a queryable DMV. Page life expectancy estimates how long a data page stays in memory before being pushed out — a sustained drop compared to this server's own baseline is a classic memory pressure signal.

## Segment 3 (code: I/O latency)

Sys.dm_io_virtual_file_stats is a function returning read and write stall time per database file. Dividing stall milliseconds by the number of reads gives you the average wait per read — a sustained high average points squarely at the storage subsystem, not at whatever query happened to be running.

## Segment 4 (steps: reading them together)

None of these numbers mean much alone. Watch three things together: a dropping page life expectancy, high I/O stalls on the same file, and rising CPU — a compounding problem shows up across more than one counter at once, not just one.

## Segment 5 (outro)

CPU, memory, and I/O are the three resources everything else traces back to. Next up: active sessions and expensive queries — finding exactly what's consuming them right now.
