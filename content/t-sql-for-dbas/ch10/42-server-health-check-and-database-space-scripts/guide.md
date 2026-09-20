# Server Health Check & Database Space Scripts

The first real toolkit script combines three things you've already built separately:
server and instance properties from Chapter 1, wait statistics from Chapter 2, and
database file space from Chapter 2's tempdb lesson. On their own, each is a useful query.
Combined into one script with clear section headers, they become the first thing you run
against any server — known or unfamiliar — in the first thirty seconds of a ticket.

## What you'll learn

- Why "what version and edition is this?" is always the first question, not an afterthought
- How to combine server properties, wait stats, and file space into one script
- Reading the output as a story, not just three unrelated result sets

## Section 1: server and instance properties

Before diagnosing anything, confirm what you're actually looking at. `SERVERPROPERTY`
answers the instance-level questions; `sys.dm_os_sys_info` adds when it last restarted —
a fresh restart resets wait stats and the plan cache, which changes how you read
everything downstream.

```sql
-- =====================================================================
-- Script:         server-health-check.sql
-- Purpose:        One-shot server health snapshot: identity, top waits,
--                 and per-database file space, in one run.
-- Usage:          Run as-is for instance identity and waits. Run the
--                 file-space section separately inside each database
--                 you need to check (USE first).
-- Last verified:  SQL Server 2019 / 2022, September 2026
-- =====================================================================

-- Section 1: what am I looking at?
SELECT
    SERVERPROPERTY('MachineName')    AS machine_name,
    SERVERPROPERTY('ServerName')     AS instance_name,
    SERVERPROPERTY('Edition')        AS edition,
    SERVERPROPERTY('ProductVersion') AS product_version,
    SERVERPROPERTY('ProductLevel')   AS product_level,
    SERVERPROPERTY('IsClustered')    AS is_clustered,
    si.sqlserver_start_time,
    DATEDIFF(HOUR, si.sqlserver_start_time, GETDATE()) AS hours_since_restart
FROM sys.dm_os_sys_info AS si;
```

A `hours_since_restart` under an hour is worth noticing on its own — it means every wait
stat and cached plan you're about to look at only reflects the last few minutes, not a
representative picture of the server's normal behavior.

## Section 2: top waits, right after identity

Wait stats from Lesson 8, unchanged, but now living in the same script as the identity
check that explains whether they're trustworthy yet.

```sql
-- Section 2: what is the server spending time waiting on?
SELECT TOP (10)
    wait_type,
    wait_time_ms,
    waiting_tasks_count,
    wait_time_ms * 1.0 / NULLIF(waiting_tasks_count, 0) AS avg_wait_ms
FROM sys.dm_os_wait_stats
WHERE wait_type NOT IN (
    'SLEEP_TASK', 'BROKER_TASK_STOP', 'CLR_SEMAPHORE', 'LAZYWRITER_SLEEP',
    'XE_TIMER_EVENT', 'SQLTRACE_INCREMENTAL_FLUSH_SLEEP', 'WAITFOR',
    'BROKER_TO_FLUSH', 'BROKER_EVENTHANDLER', 'CHECKPOINT_QUEUE',
    'BROKER_TRANSMITTER', 'FT_IFTS_SCHEDULER_IDLE_WAIT'
)
ORDER BY wait_time_ms DESC;
```

The benign-wait exclusion list is the same one from Lesson 8 — without it, background
housekeeping waits crowd out the ones that actually explain slowness.

## Section 3: per-database file space

Space runs out quietly, then all at once. This section — run in the context of each
database you're checking — reports size, free space, and the autogrowth setting for
every file, so a drive filling up shows up before it becomes an outage.

```sql
-- Section 3: run inside the target database (USE first)
SELECT
    name AS logical_name,
    type_desc,
    size / 128.0 AS size_mb,
    size / 128.0 - CAST(FILEPROPERTY(name, 'SpaceUsed') AS int) / 128.0 AS free_mb,
    CASE WHEN is_percent_growth = 1
         THEN CAST(growth AS varchar(10)) + '%'
         ELSE CAST(growth / 128 AS varchar(10)) + ' MB'
    END AS autogrowth_setting
FROM sys.database_files
ORDER BY type_desc;
```

An autogrowth setting reported in a flat MB amount instead of a percentage, on a database
that's grown a lot since that setting was chosen, is worth flagging on its own — file
growth events pause writes, and a small fixed growth increment on a large, active file
means those pauses happen constantly.

## Reading the three sections as one story

Run in order, these three sections answer: what am I looking at, what's it been doing,
and is it about to run out of room. A DBA who runs this script first, before touching
anything else, walks into every incident with the same baseline context — which is the
entire point of a toolkit script over a memorized one-off query.

## Key terms

| Term | Meaning |
|---|---|
| `sqlserver_start_time` | Column in `sys.dm_os_sys_info` showing when the SQL Server service last started |
| Benign wait | A wait type that's normal background activity and should be filtered out of a "what's slow" investigation |
| Autogrowth | The setting controlling how much a data or log file expands automatically when it fills up |

## Check yourself

Why does the health check script check `hours_since_restart` before trusting the wait stats section that follows it?
