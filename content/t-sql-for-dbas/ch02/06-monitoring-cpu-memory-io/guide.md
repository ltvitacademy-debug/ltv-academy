# Monitoring CPU, Memory & I/O With T-SQL

Chapter 1 covered the catalog views and DMVs a DBA needs to know exist. Chapter 2 puts them to
work: real, repeatable T-SQL queries for the three resources every performance problem traces
back to — CPU, memory, and disk I/O.

## What you'll learn

- `sys.dm_os_performance_counters` — SQL Server's internal perfmon-style counters, queryable
  with T-SQL
- `sys.dm_io_virtual_file_stats` — per-file read/write latency for every database file
- What a high I/O stall actually means, and why it points at storage, not the query itself
- How to spot a memory-pressure signal without leaving T-SQL

## sys.dm_os_performance_counters: perfmon, in T-SQL

SQL Server maintains hundreds of internal performance counters — the same ones Performance
Monitor (perfmon) graphs — and exposes them as a queryable DMV:

```sql
SELECT counter_name, cntr_value
FROM sys.dm_os_performance_counters
WHERE counter_name IN ('Page life expectancy', 'Buffer cache hit ratio',
                        'Batch Requests/sec', 'SQL Compilations/sec')
  AND object_name LIKE '%Buffer Manager%' OR counter_name IN ('Batch Requests/sec', 'SQL Compilations/sec');
```

**Page life expectancy** (in seconds) estimates how long a data page stays in memory before
being pushed out — a sustained low value versus the server's own baseline is a classic memory
pressure signal. There's no single universal "safe" number; what matters is a sudden drop
compared to this server's normal.

## sys.dm_io_virtual_file_stats: I/O latency per file

```sql
SELECT DB_NAME(vfs.database_id) AS database_name,
       mf.physical_name,
       vfs.num_of_reads, vfs.io_stall_read_ms,
       vfs.num_of_writes, vfs.io_stall_write_ms,
       vfs.io_stall_read_ms / NULLIF(vfs.num_of_reads, 0)  AS avg_read_stall_ms,
       vfs.io_stall_write_ms / NULLIF(vfs.num_of_writes, 0) AS avg_write_stall_ms
FROM sys.dm_io_virtual_file_stats(NULL, NULL) AS vfs
JOIN sys.master_files AS mf
  ON mf.database_id = vfs.database_id AND mf.file_id = vfs.file_id
ORDER BY avg_read_stall_ms DESC;
```

`sys.dm_io_virtual_file_stats` is a DMF — it accepts `database_id` and `file_id`, and `NULL, NULL`
returns every file on the instance. `io_stall_read_ms` divided by `num_of_reads` gives the
average time, in milliseconds, each read had to wait on that file. A sustained average well
above a few milliseconds for data files (or tens of milliseconds for log files) points squarely
at the storage subsystem, not at the query that happened to be running at the time.

## Reading these numbers together

None of these counters mean much alone. A dropping page life expectancy *and* high read stalls
on the same data file points at memory pressure forcing pages out, which then have to be reread
from slow storage — a compounding problem, not two separate ones.

## Key terms

| Term | Meaning |
|---|---|
| `sys.dm_os_performance_counters` | DMV exposing SQL Server's internal perfmon-style counters |
| Page life expectancy | Counter estimating how long, in seconds, a data page stays in the buffer pool |
| I/O stall | Time (ms) a read or write had to wait — high average stall points at slow storage |

## Check yourself

Why is a single low reading of page life expectancy less useful than watching it drop compared
to this server's own normal baseline?
