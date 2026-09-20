# Plan Cache Internals

Parameter sniffing (Lesson 9) is one symptom of how the plan cache behaves. This lesson
looks at the cache itself: what's actually stored there, how to inspect it, and a very
common, very avoidable way the cache gets flooded with plans that will never be reused.

## What you'll learn

- What `sys.dm_exec_cached_plans` actually tracks
- Plan reuse vs. ad hoc query plan bloat, and why the difference matters
- The `optimize for ad hoc workloads` server setting, and what it actually trades off

## Inspecting the cache: sys.dm_exec_cached_plans

Every compiled plan SQL Server keeps around lives in the plan cache, and
`sys.dm_exec_cached_plans` exposes it directly — one row per cached plan, with `usecounts`
(how many times that exact plan has been reused), `cacheobjtype`, `objtype`, and
`size_in_bytes`. Joining to `sys.dm_exec_sql_text` gets you the actual query text.

```sql
SELECT cp.usecounts, cp.objtype, cp.size_in_bytes,
       st.text
FROM sys.dm_exec_cached_plans AS cp
CROSS APPLY sys.dm_exec_sql_text(cp.plan_handle) AS st
ORDER BY cp.size_in_bytes DESC;
```

A healthy cache, for a well-designed OLTP workload, has a large number of plans with
`usecounts` well above 1 — the same parameterized queries and stored procedures running
over and over, reusing their compiled plan instead of recompiling every time.

## Plan reuse vs. ad hoc plan bloat

**Plan reuse** is the whole point of the cache: compile once, execute many times, skip the
optimization work on every subsequent call. Stored procedures and properly parameterized
queries get this for free.

**Ad hoc plan bloat** happens when an application builds SQL as a literal string with
values baked directly in — `SELECT * FROM Orders WHERE CustomerID = 29825` one call,
`WHERE CustomerID = 11000` the next — instead of parameterizing. Each literally-different
query text is a cache miss, so SQL Server compiles and caches a *new* plan for every
single call, most of which will have `usecounts = 1` and never be reused again. This
wastes CPU on constant recompilation and, at scale, can consume enough plan cache memory
to evict plans that *were* being reused, hurting the whole server's performance, not just
the ad hoc query's.

```sql
-- Bad: ad hoc bloat, one distinct plan per literal value
EXEC('SELECT * FROM Orders WHERE CustomerID = ' + @id);

-- Better: sp_executesql, plan can be reused across calls
EXEC sp_executesql N'SELECT * FROM Orders WHERE CustomerID = @CustomerID',
                    N'@CustomerID INT', @CustomerID = @id;
```

Finding it: a large count of rows in `sys.dm_exec_cached_plans` with `usecounts = 1` and
near-identical query text differing only by a literal value is the signature of ad hoc
plan bloat.

## optimize for ad hoc workloads

The server-level setting `optimize for ad hoc workloads`
(`sp_configure 'optimize for ad hoc workloads', 1;`) doesn't fix ad hoc bloat, but it
reduces its damage: instead of caching the full compiled plan on a query's *first*
execution, SQL Server caches a small "stub" plan. Only if that exact query text runs a
*second* time does it get the full plan cached. For a workload dominated by one-off ad hoc
queries, this trades a small amount of extra compile time on the (rare) second run for a
significant reduction in wasted cache memory from plans that were never going to run
again anyway. It's a mitigation, not a substitute for parameterizing the application
properly.

## Key terms

| Term | Meaning |
|---|---|
| sys.dm_exec_cached_plans | DMV listing every cached compiled plan, with usecounts and size |
| Plan reuse | Compiling once and executing the same cached plan many times |
| Ad hoc plan bloat | Cache filled with one-off plans from unparameterized literal SQL, rarely reused |
| optimize for ad hoc workloads | Server setting that caches a lightweight stub instead of a full plan on first execution |

## Check yourself

A query against `sys.dm_exec_cached_plans` shows thousands of rows with `usecounts = 1`
and query text that's identical except for a literal customer ID each time. What's
happening, and what's the actual fix versus the mitigation?
