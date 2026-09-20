# Memory Grants

Lesson 27 introduced `RESOURCE_SEMAPHORE` as the wait-stats-level signal that memory
grants are contended. This lesson goes deeper: what a memory grant actually is, how to
see exactly what's currently been handed out, and the real root cause behind most grant
problems — cardinality estimates that are simply wrong.

## What you'll learn

- What a memory grant is and which operators need one
- `sys.dm_exec_query_memory_grants` and what it exposes about live and pending grants
- Why `RESOURCE_SEMAPHORE` waits happen even when the server has "plenty" of memory
- Overestimated grants from bad cardinality estimates as the real root cause

## What needs a memory grant

Certain query plan operators — sorts, hash joins, hash aggregates — need a workspace in
memory to do their job, and SQL Server reserves that workspace, called a memory grant,
before the query starts executing. The optimizer estimates the size of this grant based
on the estimated number of rows and row width flowing through that part of the plan — an
estimate, not a measurement, which is the seed of most of what goes wrong here.

## Seeing live and pending grants

```sql
SELECT
    session_id, request_time, grant_time,
    requested_memory_kb, granted_memory_kb,
    used_memory_kb, max_used_memory_kb,
    query_cost, ideal_memory_kb
FROM sys.dm_exec_query_memory_grants
ORDER BY requested_memory_kb DESC;
```

A row with a `NULL` `grant_time` but a populated `request_time` is a query still *waiting*
for its grant — that's the `RESOURCE_SEMAPHORE` wait made visible at the query level.
Comparing `granted_memory_kb` against `max_used_memory_kb` for completed grants shows how
much was reserved versus how much was actually needed — a large gap between the two is
the signature of an overestimated grant.

## Why RESOURCE_SEMAPHORE happens even with "plenty" of memory

The total memory available for query workspace grants is itself bounded (a percentage of
the buffer pool budget, not all of physical RAM), and it's a shared, finite pool across
every concurrently running query that needs one. Even on a server with abundant RAM,
`RESOURCE_SEMAPHORE` waits appear when too many queries request large grants at the same
time and the *concurrent total* exceeds what the grant pool allows — the server isn't
"out of memory" in the broad sense, it's out of grantable workspace at that moment.

## The real root cause: overestimated grants from bad cardinality estimates

The most common underlying cause of memory grant problems isn't that queries need too
much memory — it's that the optimizer's cardinality estimate for a query is wrong, often
because of stale statistics, or the same parameter-sniffing issues covered in Lesson 9,
or a query pattern the estimator handles poorly (certain multi-predicate correlations,
for example). An estimate of ten million rows when the real number is ten thousand drives
the optimizer to request a memory grant sized for ten million rows — that request alone
can starve the shared grant pool for every other concurrently running query, even though
the query itself only ever *uses* a tiny fraction of what it reserved.

```sql
-- flag likely overestimated grants: big gap between granted and actually used
SELECT session_id, granted_memory_kb, max_used_memory_kb,
       granted_memory_kb - max_used_memory_kb AS wasted_kb
FROM sys.dm_exec_query_memory_grants
WHERE granted_memory_kb > max_used_memory_kb * 2
ORDER BY wasted_kb DESC;
```

Because the root cause is usually an estimation problem, the actual fix is usually the
same toolkit from Chapter 2 and Lesson 9 — updated statistics, addressing parameter
sniffing, or query rewrites that give the optimizer a more accurate row estimate to work
from — not simply "add more server memory," which treats the symptom while leaving the
estimate wrong.

## Key terms

| Term | Meaning |
|---|---|
| Memory grant | Workspace memory reserved for operators like sorts and hash joins before a query executes |
| `sys.dm_exec_query_memory_grants` | DMV exposing requested, granted, and actually-used memory for both live and pending grants |
| Grant pool | The finite, shared portion of memory available for concurrent query memory grants |
| Cardinality estimate | The optimizer's predicted row count for a part of a plan, used to size the memory grant request |

## Check yourself

`sys.dm_exec_query_memory_grants` shows a query with `granted_memory_kb` at 2,000,000 and
`max_used_memory_kb` at only 15,000. Per this lesson, what's the most likely underlying
cause, and is "increase max server memory" the right first fix?
