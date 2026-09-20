# Parallelism Troubleshooting

Lesson 38 covered the two settings that decide whether and how wide a query goes parallel.
This lesson is about diagnosing parallelism that's already causing pain — the wait types
involved, how to tell coordination overhead from a genuinely uneven workload, and how to find
the specific queries responsible.

## What you'll learn

- What `CXPACKET` and `CXCONSUMER` waits actually mean, and how they differ
- How to recognize skewed parallelism — one thread doing most of the work
- Using `sys.dm_exec_query_stats` to find over-parallelized queries

## CXPACKET vs. CXCONSUMER

Both wait types show up specifically on parallel query plans, and both represent one
parallel worker thread waiting on another — but they point at different situations:

- **`CXPACKET`** — a thread is waiting for other threads in the same parallel operation to
  finish their portion of the work. Some `CXPACKET` wait is completely normal on any system
  running parallel queries; it only signals a real problem when it's a disproportionately
  large share of total waits, which usually means either the cost threshold is too low
  (small queries going parallel needlessly) or the parallel work itself is badly skewed.
- **`CXCONSUMER`** — a specific, more benign subtype of the same coordination wait, isolated
  starting in SQL Server 2016 specifically to make it clear when a thread is waiting on
  another purely as part of *normal, expected* parallel coordination (e.g., waiting on a
  producer thread), rather than a sign of a genuine bottleneck. Since this split, high
  `CXCONSUMER` alone is far less alarming than high `CXPACKET`.

If wait stats (Chapter 5's methodology) show `CXPACKET` as a top wait, the next step isn't
"turn off parallelism" — it's finding out *why*: too many small queries going parallel, or a
real skew problem in a specific query.

## Skewed parallelism

A parallel plan splits work across threads, but that split isn't always even. A hash join or
aggregation with poor cardinality estimates, or a nonuniform data distribution (one value in
a column showing up far more often than others), can leave one thread doing most of the real
work while the rest sit idle, waiting — this is skew, and it's a common, specific cause of
high `CXPACKET` waits that isn't fixed by adjusting MAXDOP or cost threshold at all.

The execution plan itself shows this: hover over a parallel operator (like a Parallelism
exchange operator) in SSMS, and the tooltip or properties pane shows the actual row counts
each individual thread processed. A wildly uneven distribution across threads — one thread
with the bulk of the rows, the others nearly empty — is skew, and the fix is usually on the
query or statistics side (better cardinality estimates, a rewrite, updated statistics) rather
than a parallelism setting.

## Finding over-parallelized queries

To find queries that are going parallel frequently and consuming a lot of aggregate worker
time — candidates for either a cost-threshold adjustment or a query-level `MAXDOP` hint:

```sql
SELECT TOP 20
    qs.query_hash,
    SUM(qs.total_worker_time) AS total_worker_time,
    SUM(qs.execution_count) AS total_executions,
    SUM(qs.total_worker_time) / SUM(qs.execution_count) AS avg_worker_time,
    MAX(qs.query_plan_hash) AS plan_hash
FROM sys.dm_exec_query_stats qs
GROUP BY qs.query_hash
ORDER BY total_worker_time DESC;
```

High total worker time relative to elapsed time on a query is itself a signal worth
following up on: parallel queries consume more total CPU (worker time) than a serial
execution of the same work would, in exchange for lower wall-clock time. If a query is going
parallel constantly and its worker-to-elapsed ratio is high without a corresponding drop in
duration, that's parallelism overhead without much payoff — a candidate for a higher cost
threshold or a targeted `MAXDOP` hint.

## Key terms

| Term | Meaning |
|---|---|
| `CXPACKET` | Wait type for a parallel thread waiting on other threads in the same operation |
| `CXCONSUMER` | Subtype of the same coordination wait, isolated since SQL Server 2016 as normal producer/consumer waiting |
| Skew | Uneven distribution of work across parallel threads, often from poor cardinality estimates or data skew |
| Worker time | Total CPU time consumed across all threads — higher for parallel execution than serial, by design |

## Check yourself

A query shows high `CXPACKET` waits, and the execution plan's parallel operator reveals one
thread processed 90% of the rows while three others processed almost none. Would raising
`cost threshold for parallelism` fix this, and if not, what would you look at instead?
