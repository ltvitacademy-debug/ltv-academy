# Active Sessions & Expensive Queries

Lesson 5 introduced `sys.dm_exec_requests`. This lesson turns it into a real triage query:
finding exactly which currently running query is burning the most CPU or I/O, pulling its full
text, and pulling its execution plan — all without leaving T-SQL.

## What you'll learn

- Extending `sys.dm_exec_requests` to rank active requests by resource consumption
- `sys.dm_exec_sql_text()` — turning a `sql_handle` into the actual query text
- `sys.dm_exec_query_plan()` — turning a `plan_handle` into the actual execution plan
- Why `CROSS APPLY` is the standard pattern for both

## Ranking active requests by cost

```sql
SELECT r.session_id, r.status, r.cpu_time, r.logical_reads,
       r.total_elapsed_time, r.wait_type, r.blocking_session_id
FROM sys.dm_exec_requests AS r
WHERE r.session_id <> @@SPID
ORDER BY r.cpu_time DESC;
```

`cpu_time` and `logical_reads` are cumulative for the request so far — sort by either to surface
the most expensive thing currently running. `blocking_session_id` (non-zero when a request is
blocked) is a preview of Lesson 9.

## Getting the actual query text

`sys.dm_exec_requests` gives you a `sql_handle`, not the text itself. `sys.dm_exec_sql_text()`
is a DMF that turns that handle into readable T-SQL:

```sql
SELECT r.session_id, r.cpu_time, r.logical_reads,
       t.text AS query_text
FROM sys.dm_exec_requests AS r
CROSS APPLY sys.dm_exec_sql_text(r.sql_handle) AS t
WHERE r.session_id <> @@SPID
ORDER BY r.cpu_time DESC;
```

`CROSS APPLY` calls the function once per row of `sys.dm_exec_requests`, passing in that row's
`sql_handle` — the standard pattern for combining a DMV with a DMF.

## Getting the execution plan

The same pattern gets you the plan, using `plan_handle` instead:

```sql
SELECT r.session_id, r.cpu_time, t.text AS query_text, p.query_plan
FROM sys.dm_exec_requests AS r
CROSS APPLY sys.dm_exec_sql_text(r.sql_handle) AS t
CROSS APPLY sys.dm_exec_query_plan(r.plan_handle) AS p
WHERE r.session_id <> @@SPID
ORDER BY r.cpu_time DESC;
```

`query_plan` returns as XML — in SSMS, clicking the result cell opens it as a graphical
execution plan, exactly like right-clicking "Include Actual Execution Plan," but without ever
having to re-run the query yourself.

## Key terms

| Term | Meaning |
|---|---|
| `sql_handle` | An identifier for a cached batch's text, resolved via `sys.dm_exec_sql_text()` |
| `plan_handle` | An identifier for a cached execution plan, resolved via `sys.dm_exec_query_plan()` |
| `CROSS APPLY` | Join syntax that calls a table-valued function once per row of the left-hand table |

## Check yourself

Why does `sys.dm_exec_requests` store a `sql_handle` instead of the actual query text directly
in the row?
