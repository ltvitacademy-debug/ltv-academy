# Top Resource-Consuming Queries

Lesson 37 showed how to pull one query's plan. This lesson flips the question around: out of
everything currently cached, which queries are actually costing the server the most —
CPU, reads, or both? This is the single query a DBA runs first on "the server feels slow."

## What you'll learn

- How to rank cached queries by total resource consumption, not average
- Why total, not average, is usually the right sort column
- Reading the same DMV three ways: CPU-bound, I/O-bound, and frequency-bound

## Ranking by total worker time (CPU)

```sql
SELECT TOP 20
    qs.execution_count,
    qs.total_worker_time / 1000 AS total_cpu_ms,
    qs.total_worker_time / qs.execution_count / 1000 AS avg_cpu_ms,
    qs.total_elapsed_time / 1000 AS total_duration_ms,
    st.text AS query_text
FROM sys.dm_exec_query_stats AS qs
CROSS APPLY sys.dm_exec_sql_text(qs.sql_handle) AS st
ORDER BY qs.total_worker_time DESC;
```

`total_worker_time` is CPU time in microseconds, summed across every execution the plan has
seen since it was cached. This is usually the right starting point when the complaint is
"the server's CPU is pegged."

## Total versus average — and why total usually wins

`sys.dm_exec_query_stats` reports both totals and can compute averages by dividing by
`execution_count`. They answer different questions:

- **Total** finds the query costing the server the most *in aggregate* — a query running
  100,000 times a day at 5ms each (500 seconds of CPU total) can easily outweigh a report
  that runs once a day and takes 30 seconds.
- **Average** finds the single worst individual execution — useful for "why did this one
  report take forever," but misleading as a first triage step, because it ignores volume.

A DBA doing first-pass triage on "the server is slow" sorts by total; a DBA investigating one
specific complaint about one specific report sorts by average.

## Sorting by I/O instead of CPU

The same DMV supports the I/O-bound version of the same question:

```sql
SELECT TOP 20
    qs.execution_count,
    qs.total_logical_reads,
    qs.total_logical_reads / qs.execution_count AS avg_logical_reads,
    st.text AS query_text
FROM sys.dm_exec_query_stats AS qs
CROSS APPLY sys.dm_exec_sql_text(qs.sql_handle) AS st
ORDER BY qs.total_logical_reads DESC;
```

Running both — sorted by `total_worker_time` and separately by `total_logical_reads` — and
comparing the two lists is standard triage: a query near the top of both lists is the one
worth tuning first.

## Key terms

| Term | Meaning |
|---|---|
| `total_worker_time` | Cumulative CPU time (microseconds) a cached plan has consumed across all its executions |
| `total_logical_reads` | Cumulative pages read from buffer cache across all executions of a cached plan |
| First-pass triage | Sorting by total resource consumption to find the biggest aggregate cost, as opposed to the single worst execution |

## Check yourself

Why can a query that runs in 5 milliseconds be a bigger problem for the server than a report
that takes 30 seconds to run?
