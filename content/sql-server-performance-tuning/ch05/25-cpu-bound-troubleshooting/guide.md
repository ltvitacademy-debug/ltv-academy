# CPU-Bound Troubleshooting

When Lesson 24's methodology surfaces CPU-related waits as the dominant category, the
next step is narrowing from "the processor is busy" to "these specific queries are
consuming it." SQL Server gives you both the wait-type evidence and the query-level
evidence — you need both to be confident in the diagnosis.

## What you'll learn

- The two wait types that most directly signal CPU pressure
- Why `CXPACKET`/`CXCONSUMER` are more nuanced than "parallelism is bad"
- How to rank queries by actual CPU consumption with `sys.dm_exec_query_stats`
- What to check before blaming a single query for instance-wide CPU pressure

## The core CPU-pressure wait type: SOS_SCHEDULER_YIELD

`SOS_SCHEDULER_YIELD` occurs when a task voluntarily yields the CPU because it's used its
scheduler quantum (SQL Server's cooperative scheduler gives each task a slice of time,
typically around 4ms, before it must yield) and other runnable tasks are waiting for that
same scheduler. A high volume of `SOS_SCHEDULER_YIELD` — especially paired with high
signal wait time on other wait types — is one of the clearest single signals that the
instance doesn't have enough CPU capacity for its current runnable-task load.

```sql
SELECT wait_type, waiting_tasks_count, wait_time_ms, signal_wait_time_ms
FROM sys.dm_os_wait_stats
WHERE wait_type = 'SOS_SCHEDULER_YIELD';
```

Also check `sys.dm_os_schedulers` for `runnable_tasks_count` — a sustained, non-zero
number here means tasks are routinely queued waiting for a scheduler, which corroborates
the wait-stats evidence directly.

## CXPACKET and CXCONSUMER: not automatically a problem

`CXPACKET` (and, on newer builds, its refined successor `CXCONSUMER`) shows up whenever a
parallel query has to synchronize its worker threads — one thread finishing its portion
of work before others is completely normal for parallel execution. High `CXPACKET` time
on its own does **not** mean parallelism is bad; it means the instance is running a lot of
parallel plans, which may be perfectly appropriate for large analytical queries.

It becomes worth investigating when it's paired with **skew** — some parallel threads
doing far more work than others (visible in the actual execution plan's per-thread
row counts) — or when `MAXDOP`/cost threshold settings (covered in Chapter 8) are letting
small, high-frequency OLTP queries go parallel unnecessarily, multiplying CPU consumption
per execution.

## Finding the actual CPU-heavy queries

Wait stats tell you *that* CPU is the bottleneck category; `sys.dm_exec_query_stats`
tells you *which* queries are spending it:

```sql
SELECT TOP 20
    qs.total_worker_time / qs.execution_count AS avg_cpu_per_exec_us,
    qs.total_worker_time AS total_cpu_us,
    qs.execution_count,
    SUBSTRING(st.text, (qs.statement_start_offset/2) + 1,
        ((CASE qs.statement_end_offset
            WHEN -1 THEN DATALENGTH(st.text)
            ELSE qs.statement_end_offset END - qs.statement_start_offset)/2) + 1
        ) AS query_text
FROM sys.dm_exec_query_stats AS qs
CROSS APPLY sys.dm_exec_sql_text(qs.sql_handle) AS st
ORDER BY qs.total_worker_time DESC;
```

`total_worker_time` is CPU time in microseconds, cumulative since the plan entered cache.
Sorting by it directly (not just by duration, which can be dominated by waiting rather
than working) finds the queries actually burning processor time — the natural next step
being the plan-analysis and rewrite techniques from Chapters 2 and 4.

## Ruling out non-query causes first

Before pinning CPU pressure entirely on application queries, rule out instance-level
causes: outdated statistics driving bad cardinality estimates (which can turn a cheap
plan into an expensive one — Lesson 9 territory), missing indexes forcing scans instead
of seeks, or, less commonly, CPU contention from something outside SQL Server entirely on
a shared or virtualized host. A query that was fine last month and is CPU-heavy today,
with no code change, usually points at a plan or data-volume change, not a query design
flaw.

## Key terms

| Term | Meaning |
|---|---|
| `SOS_SCHEDULER_YIELD` | Wait type recorded when a task yields the CPU after its quantum, with other tasks waiting for that scheduler |
| `CXPACKET` / `CXCONSUMER` | Wait recorded during parallel-thread synchronization — normal for parallel plans, a concern mainly under thread skew |
| `sys.dm_exec_query_stats` | DMV exposing cumulative execution metrics, including `total_worker_time` (CPU time), per cached query plan |
| Scheduler quantum | The fixed time slice (~4ms) SQL Server's cooperative scheduler gives a task before it must yield |

## Check yourself

`sys.dm_os_wait_stats` shows `CXPACKET` as a top wait type with a large total, but every
parallel query's actual execution plan shows evenly balanced row counts across threads.
Based on this lesson, should you treat that as a CPU problem worth chasing? Why or why
not?
