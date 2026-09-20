# Tools Overview

Every step of the workflow from Lesson 4 leans on specific tools, and it's worth knowing
honestly what each one is actually for before Chapter 2 goes deep on execution plans.
None of these tools does the thinking for you — they surface data; the workflow is what
turns that data into a fix.

## What you'll learn

- What SSMS's execution plan viewer, Query Store, Extended Events, and DMVs each actually give you
- Where third-party tools fit in, honestly, without oversell
- Which tool to reach for at which step of the tuning workflow

## SSMS's built-in execution plan viewer

SSMS can show both the *estimated* plan (`Ctrl+L`, compiled without running the query)
and the *actual* plan (`Ctrl+M` toggles "Include Actual Execution Plan" before running).
It's the primary tool for the "measure" and "isolate" steps of the workflow — the visual
tree of operators, with cost percentages and row counts, is where you go to see exactly
what the optimizer decided to do and where the time actually went (Chapter 2 covers this
in depth).

## Query Store

Already covered in Lesson 3 as a baseline source, Query Store is also the tool for
spotting plan regressions over time — a query that had a good plan last week and a bad
one today, without anyone touching the query text. Its "Regressed Queries" report in SSMS
is a good starting point for "what got slower recently" investigations, and
`sp_query_store_force_plan` (Lesson 11) lets you pin a known-good plan without touching
code.

## Extended Events

Extended Events (XEvents) is the lightweight, modern successor to SQL Trace/Profiler —
it lets you capture detailed event data (query completions, lock waits, deadlocks, plan
recompiles) with much lower overhead than the old Profiler GUI. It's the right tool when
DMVs and Query Store don't have enough detail — for example, capturing every individual
execution of a specific query with its exact parameter values, to catch a parameter
sniffing case in the act (Lesson 9).

```sql
CREATE EVENT SESSION CaptureSlowQueries ON SERVER
ADD EVENT sqlserver.sql_statement_completed(
    WHERE duration > 1000000) -- microseconds; 1 second
ADD TARGET package0.event_file(SET filename = N'SlowQueries');
```

## DMVs (Dynamic Management Views)

DMVs are the always-on, query-with-T-SQL window into SQL Server's internal state:
`sys.dm_exec_query_stats` (per-plan stats), `sys.dm_exec_requests` (what's running right
now), `sys.dm_os_wait_stats` (cumulative waits, central to Chapter 5), `sys.dm_db_index_usage_stats`
(which indexes are actually being used). They cost nothing extra to enable and answer "what
is happening or has happened" questions directly in T-SQL — no separate tool to install.

## Third-party tools, honestly

Commercial and free third-party monitoring tools (application performance monitoring
suites, dedicated SQL Server monitoring products) exist as a category, and many DBA teams
use one. What they genuinely add: continuous historical dashboards, alerting, and a
friendlier UI over the same underlying DMV and Extended Events data you could query
yourself. What they don't add: they don't tune anything for you, and they don't replace
understanding *why* a query is slow — they surface the same signals this course teaches
you to read directly, wrapped in a nicer interface. Worth having at scale; not a
substitute for the fundamentals in this course.

## Key terms

| Term | Meaning |
|---|---|
| Estimated plan | Compiled plan shown without executing the query (Ctrl+L in SSMS) |
| Actual plan | Plan shown after execution, including real row counts (Ctrl+M toggle) |
| Extended Events | Lightweight, low-overhead event capture; the modern successor to SQL Trace/Profiler |
| DMV | Dynamic Management View — T-SQL-queryable window into SQL Server's internal state |

## Check yourself

A DBA installs a third-party monitoring tool and expects it to automatically fix a slow
report query. What's the honest limit of what that tool can actually do, per this lesson?
