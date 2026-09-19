# Lesson 51 — DMVs for Query Performance Troubleshooting

**Chapter 8 · Query Performance Tuning · Lesson 51 of 95**

## What you'll learn

- How this lesson's DMVs differ from Chapter 7's general monitoring DMVs
- `sys.dm_exec_query_stats` — cumulative execution statistics for every cached query plan
- `sys.dm_exec_sql_text` — turning a cached plan handle back into readable query text
- How to combine both into a single "worst queries right now" query, without Query Store

## How this differs from Chapter 7

Chapter 7's DMV coverage was about instance health — sessions,
connections, CPU, memory, I/O, general activity. This lesson is
narrower and specific to *query performance*: which cached queries
are consuming the most resources, and what those queries actually
say. Query Store (Lessons 48–49) gives you *history* across restarts;
these DMVs give you the *current plan cache*, live, right now — no
setup, no `ALTER DATABASE` required, but nothing persists once the
plan is evicted from cache or the instance restarts.

## `sys.dm_exec_query_stats`: cumulative stats per cached plan

Every plan sitting in the plan cache has running totals attached to
it — total and average CPU time, logical reads, execution count,
elapsed time — accumulated since that plan was compiled:

```sql
SELECT TOP 10
    qs.total_worker_time / qs.execution_count AS avg_cpu_time,
    qs.total_logical_reads / qs.execution_count AS avg_logical_reads,
    qs.execution_count,
    qs.total_elapsed_time / qs.execution_count AS avg_elapsed_time,
    qs.plan_handle,
    qs.sql_handle
FROM sys.dm_exec_query_stats qs
ORDER BY qs.total_worker_time DESC;
```

This is the same kind of ranking Query Store's Top Resource Consumers
report gives you, but sourced live from the plan cache instead of
persisted history — useful when Query Store isn't enabled, or you
want the picture since the last cache clear specifically, not the
last N days.

## `sys.dm_exec_sql_text`: turning a handle into readable text

`sys.dm_exec_query_stats` gives you `sql_handle` and `plan_handle` —
opaque binary identifiers, not the actual query. `sys.dm_exec_sql_text`
(and its cousin `sys.dm_exec_query_plan`, for the plan itself) convert
those handles into something you can actually read:

```sql
SELECT
    qs.total_worker_time / qs.execution_count AS avg_cpu_time,
    qs.execution_count,
    st.text AS query_text
FROM sys.dm_exec_query_stats qs
CROSS APPLY sys.dm_exec_sql_text(qs.sql_handle) st
ORDER BY qs.total_worker_time DESC;
```

`CROSS APPLY` here is doing real work: it calls
`sys.dm_exec_sql_text` once *per row* returned by
`dm_exec_query_stats`, passing that row's own `sql_handle` in —
exactly the kind of row-by-row function call `CROSS APPLY` was built
for, from T-SQL Development.

## Getting the plan itself, not just the text

Swap `sys.dm_exec_query_plan` in the same pattern to get the XML plan
straight from cache — click the resulting XML in SSMS results and it
renders as the same graphical plan from Lesson 45, without having to
re-run the query with Ctrl+M turned on:

```sql
SELECT TOP 5
    qs.total_worker_time / qs.execution_count AS avg_cpu_time,
    qp.query_plan
FROM sys.dm_exec_query_stats qs
CROSS APPLY sys.dm_exec_query_plan(qs.plan_handle) qp
ORDER BY qs.total_worker_time DESC;
```

This is genuinely useful for a plan that's *already* in cache from
whatever ran it originally (the application, a job, another user's
session) — you get the exact plan that actually ran, for a query
you may not have permission or opportunity to re-run yourself.

## When to reach for this vs. Query Store

Use these DMVs for "what's expensive right now, live, no setup."
Use Query Store for "was this always this slow, and can I see its
plan history over time." In practice you'll use both together: these
DMVs to spot something worth investigating on an instance where
Query Store isn't enabled or has a short retention window, and Query
Store whenever it's available for the fuller history.

## Key terms

| Term | Meaning |
|---|---|
| `sys.dm_exec_query_stats` | Cumulative execution statistics per cached plan since compilation |
| `sys.dm_exec_sql_text` | Converts a `sql_handle` into readable query text |
| `sys.dm_exec_query_plan` | Converts a `plan_handle` into the XML execution plan |
| Plan cache | In-memory store of compiled plans — the source for these DMVs, distinct from Query Store's persisted history |

## Check yourself

You're ready for Lesson 52 when you can explain, without looking: how
do these lesson's DMVs differ from Query Store, and why does
`CROSS APPLY` specifically fit the pattern of turning a `sql_handle`
into readable text for every row of `sys.dm_exec_query_stats`?
