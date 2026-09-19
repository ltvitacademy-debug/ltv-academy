# Lesson 41 — Dynamic Management Views for DBAs

**Chapter 7 · Monitoring Azure SQL · Lesson 41 of 95**

## What you'll learn

- What dynamic management views (DMVs) are, as a quick recap you already
  half-know
- The specific DMVs a DBA queries for day-to-day monitoring — not query
  tuning, which is Chapter 8's job
- `sys.dm_exec_sessions` and `sys.dm_exec_connections` for who's connected
- `sys.dm_db_resource_stats`, an Azure SQL-specific view for resource
  history

## A quick recap, then straight to the DBA-specific ones

DMVs return real-time server and database state as ordinary queryable
views — you already know how to `SELECT` from one. What changes in this
lesson isn't the mechanics; it's the *purpose*. This chapter is about
**monitoring** — is the system healthy right now, and what does its
recent history look like. Chapter 8 comes back to DMVs for a completely
different job: diagnosing a specific slow query's execution plan. Same
tool, different question. This lesson sticks to the monitoring side.

## Who's connected and what are they doing: sessions and connections

```sql
SELECT
    s.session_id,
    s.login_name,
    s.host_name,
    s.program_name,
    s.status,
    s.cpu_time,
    s.memory_usage,
    c.client_net_address
FROM sys.dm_exec_sessions AS s
LEFT JOIN sys.dm_exec_connections AS c
    ON s.session_id = c.session_id
WHERE s.is_user_process = 1
ORDER BY s.cpu_time DESC;
```

`sys.dm_exec_sessions` is one row per authenticated session — who logged
in, from where, and how much CPU and memory that session has used since
it connected. `sys.dm_exec_connections` is one row per physical
connection, and joining the two gets you the client's network address
alongside the session's own login and resource-usage detail. Filtering to
`is_user_process = 1` drops SQL Server's own internal system sessions
so you're only looking at real client activity.

## Azure SQL's own resource-history view

```sql
SELECT TOP 60
    end_time,
    avg_cpu_percent,
    avg_data_io_percent,
    avg_log_write_percent,
    avg_memory_usage_percent,
    dtu_limit,
    avg_instance_cpu_percent
FROM sys.dm_db_resource_stats
ORDER BY end_time DESC;
```

`sys.dm_db_resource_stats` is specific to Azure SQL Database — it doesn't
exist on on-prem SQL Server, because on-prem doesn't have a
provisioned-tier concept to report utilization against. It returns one
row every 15 seconds for roughly the last hour, giving you exactly the
resource-consumption side of the baseline from Lesson 38 without needing
Azure Monitor at all — straight T-SQL, run from inside the database.

## The DBA's monitoring DMV set

| DMV | Category | What it shows |
|---|---|---|
| `sys.dm_exec_sessions` | Session/connection | Who's connected, login, host, resource usage since connect |
| `sys.dm_exec_connections` | Session/connection | Physical connection detail — protocol, client address |
| `sys.dm_db_resource_stats` | Resource (Azure SQL only) | Rolling ~1 hour of CPU/IO/memory %, sampled every 15 seconds |
| `sys.dm_os_wait_stats` | Wait statistics | Cumulative wait time by wait type since the last restart or manual reset |

`sys.dm_exec_requests`, execution plan DMVs, and index-usage DMVs are
deliberately not in this list — those answer "why is *this* query slow,"
which is Chapter 8's dedicated deep dive, not a monitoring question.

## Key terms

| Term | Meaning |
|---|---|
| DMV | Dynamic management view — a system view exposing real-time server/database state as queryable rows |
| `sys.dm_db_resource_stats` | Azure SQL-only DMV returning ~1 hour of resource utilization history, sampled every 15 seconds |
| `is_user_process` | A `sys.dm_exec_sessions` column that filters out SQL Server's own internal system sessions |

## Check yourself

You're ready for Lesson 42 when you can explain: what does
`sys.dm_db_resource_stats` give you that no on-prem SQL Server DMV can,
and why do query-plan DMVs belong in Chapter 8 instead of this lesson?
