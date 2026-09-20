# Recompilation & Performance Baselines

Chapter 9 closes on the question underneath every "it got slower" complaint: slower compared
to what? Without a recorded baseline, that claim is unprovable — and this lesson is about
building the habit and the T-SQL that makes it provable.

## What you'll learn

- How to tell whether a plan has recompiled using `plan_generation_num`
- Why recompilation itself isn't automatically a problem
- How to capture and compare a real performance baseline over time

## Detecting recompilation with plan_generation_num

`sys.dm_exec_query_stats` includes `plan_generation_num` — a counter that increments every
time a specific plan gets recompiled (as opposed to a brand-new plan getting a fresh
`plan_handle`):

```sql
SELECT
    st.text,
    qs.plan_generation_num,
    qs.execution_count,
    qs.total_worker_time
FROM sys.dm_exec_query_stats AS qs
CROSS APPLY sys.dm_exec_sql_text(qs.sql_handle) AS st
WHERE qs.plan_generation_num > 1
ORDER BY qs.plan_generation_num DESC;
```

A high `plan_generation_num` for a query that should be stable is worth investigating —
common triggers are frequent statistics updates on a volatile table, schema changes, or
`sp_recompile` being called somewhere in a maintenance script.

## Why recompilation isn't automatically bad

Recompilation gets a bad reputation because it costs CPU, but a fresh plan based on current
statistics is sometimes exactly what's needed — this is literally what `OPTION (RECOMPILE)`
from Lesson 39 deliberately forces to fix parameter sniffing. The problem case is *excessive,
unplanned* recompilation: a query recompiling on every single execution because of something
like a schema change happening constantly, burning CPU on compilation instead of execution
with no corresponding benefit.

## Building a real performance baseline

"It got slower" is only provable with a recorded number from before. The discipline is
straightforward: capture the same metrics on a schedule and keep history, the same pattern
used for capacity monitoring in Lesson 35:

```sql
INSERT INTO DBAdmin.dbo.QueryBaseline
    (captured_at, query_text, execution_count, avg_cpu_ms, avg_duration_ms, avg_logical_reads)
SELECT
    SYSUTCDATETIME(),
    st.text,
    qs.execution_count,
    qs.total_worker_time / qs.execution_count / 1000.0,
    qs.total_elapsed_time / qs.execution_count / 1000.0,
    qs.total_logical_reads / qs.execution_count
FROM sys.dm_exec_query_stats AS qs
CROSS APPLY sys.dm_exec_sql_text(qs.sql_handle) AS st
WHERE st.text LIKE '%GetOrdersByStatus%';
```

Run weekly (or after any deploy) and kept in a history table, this turns "the report feels
slower" into an answerable question: pull last month's row for the same query and compare
`avg_duration_ms` directly. Without that recorded row, there's nothing to compare against —
just a feeling.

## Key terms

| Term | Meaning |
|---|---|
| `plan_generation_num` | Counter on a cached plan that increments each time it's recompiled |
| Excessive recompilation | Unplanned, frequent recompilation burning CPU without improving plan quality |
| Performance baseline | A recorded, dated snapshot of a query's metrics, kept to make "it got slower" comparable and provable |

## Check yourself

Why is "the report got slower" an unprovable claim without a previously recorded baseline?
