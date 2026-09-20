# DMVs & DMFs, Overview

Catalog views describe *structure* — what tables, columns, and indexes exist. Dynamic
Management Views and Functions describe *activity* — what SQL Server is doing right this
second. They're the single most important query surface in a DBA's day-to-day work, and the
rest of this course leans on them constantly.

## What you'll learn

- The difference between a Dynamic Management View (DMV) and a Dynamic Management Function (DMF)
- The `sys.dm_*` naming convention and what the prefix after it tells you
- Two DMVs you'll use in nearly every future lesson: `sys.dm_exec_requests` and
  `sys.dm_os_wait_stats`
- Why DMV data is a snapshot, not a permanent log

## DMVs vs. DMFs

Both are queried with `SELECT`, but they behave differently:

- A **Dynamic Management View** (like `sys.dm_exec_requests`) is queried directly —
  `SELECT * FROM sys.dm_exec_requests`.
- A **Dynamic Management Function** (like `sys.dm_exec_sql_text`) takes a parameter and is
  called with `CROSS APPLY` or `OUTER APPLY`, usually against a handle returned by a DMV —
  `CROSS APPLY sys.dm_exec_sql_text(r.sql_handle)`.

Every DMV and DMF starts with `sys.dm_`, followed by a category prefix that tells you what
area it covers:

```sql
sys.dm_exec_*   -- query execution: requests, sessions, connections, sql text, query plans
sys.dm_os_*     -- operating-system-level: wait stats, memory, schedulers, performance counters
sys.dm_db_*     -- database-level: index physical stats, missing indexes, file space usage
sys.dm_io_*     -- I/O: virtual file stats (read/write latency per data/log file)
sys.dm_tran_*   -- transactions: active transactions, locks
```

## A first look: what's running right now

```sql
SELECT r.session_id, r.status, r.command,
       r.wait_type, r.wait_time, r.cpu_time, r.total_elapsed_time
FROM sys.dm_exec_requests AS r
WHERE r.session_id <> @@SPID
ORDER BY r.total_elapsed_time DESC;
```

`sys.dm_exec_requests` is a DMV — one row per currently executing request. Chapter 2 builds
entire monitoring queries around it.

## A first look: what the server has been waiting on

```sql
SELECT TOP 10 wait_type, wait_time_ms, waiting_tasks_count
FROM sys.dm_os_wait_stats
WHERE wait_time_ms > 0
ORDER BY wait_time_ms DESC;
```

`sys.dm_os_wait_stats` accumulates wait totals since the instance last started (or since the
last `DBCC SQLPERF('sys.dm_os_wait_stats', CLEAR)`). It's a snapshot of cumulative counters,
not a historical log — restart the service and the counters reset to zero. Lesson 8 covers it
in depth.

## Key terms

| Term | Meaning |
|---|---|
| DMV | Dynamic Management View — queried directly, one row per current entity (session, request, etc.) |
| DMF | Dynamic Management Function — takes a parameter, called via `CROSS APPLY`/`OUTER APPLY` |
| `sys.dm_*` prefix | The category tag (`exec`, `os`, `db`, `io`, `tran`) identifying what a DMV/DMF covers |

## Check yourself

`sys.dm_exec_sql_text()` needs a `sql_handle` to return anything. Why would you call it with
`CROSS APPLY` against `sys.dm_exec_requests` instead of querying it on its own?
