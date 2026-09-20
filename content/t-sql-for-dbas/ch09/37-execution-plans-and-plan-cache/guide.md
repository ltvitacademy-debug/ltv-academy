# Execution Plans & the Plan Cache

Query Store answers "what happened over time." The plan cache answers "what's compiled and
sitting in memory right now" — and it's queryable with T-SQL just as directly, without
opening a graphical execution plan viewer at all.

## What you'll learn

- The three DMVs that expose the live plan cache
- How to pull a query's actual text alongside its cached plan
- Why the plan cache is volatile in a way Query Store is not

## The three DMVs

| DMV | What it holds |
|---|---|
| `sys.dm_exec_query_stats` | One row per cached plan, with aggregate execution statistics (worker time, logical reads, execution count) since it was compiled |
| `sys.dm_exec_query_plan` | Takes a `plan_handle` and returns the actual XML execution plan |
| `sys.dm_exec_sql_text` | Takes a `sql_handle` (or `plan_handle`) and returns the SQL text that produced it |

`sys.dm_exec_query_stats` is the anchor — it has the handles (`plan_handle`, `sql_handle`)
needed to pull both the plan and the text for any cached query.

## Pulling text and plan together

```sql
SELECT
    qs.plan_handle,
    qs.execution_count,
    qs.total_worker_time,
    qs.total_logical_reads,
    st.text AS query_text,
    qp.query_plan
FROM sys.dm_exec_query_stats AS qs
CROSS APPLY sys.dm_exec_sql_text(qs.sql_handle) AS st
CROSS APPLY sys.dm_exec_query_plan(qs.plan_handle) AS qp
WHERE st.text LIKE '%SalesOrderDetail%'
ORDER BY qs.total_worker_time DESC;
```

Clicking the `query_plan` XML result in SQL Server Management Studio opens it as the same
graphical plan a developer gets from "Include Actual Execution Plan" — the difference is
this pulls it for a query that's *already run and is sitting cached*, with no need to
re-run it.

## Why the plan cache is volatile

Unlike Query Store, the plan cache lives entirely in memory, and SQL Server evicts plans
from it constantly, under memory pressure, or immediately on:

- `DBCC FREEPROCCACHE` — clears the entire cache (or one plan, given a `plan_handle`)
- A service restart
- Certain schema changes (an index rebuild, a statistics update in some cases) invalidating
  a specific plan

That means `sys.dm_exec_query_stats` only ever shows what's *currently* cached — a plan that
ran once overnight and got evicted by morning simply isn't there anymore. Query Store's
persisted history (Lesson 36) is the tool for anything that needs to survive past the next
eviction or restart; the plan cache is the tool for "what's actually running right now."

## Key terms

| Term | Meaning |
|---|---|
| Plan cache | In-memory store of compiled execution plans, evicted under memory pressure or on restart |
| `sys.dm_exec_query_stats` | DMV: aggregate execution statistics per cached plan, with handles to pull text and plan |
| `plan_handle` | Identifier for a specific cached plan, used to look up its XML or clear it from cache |

## Check yourself

Why might a query that ran heavily last night show zero rows in `sys.dm_exec_query_stats`
this morning?
