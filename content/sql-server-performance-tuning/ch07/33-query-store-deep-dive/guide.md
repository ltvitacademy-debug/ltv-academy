# Query Store, Deep Dive

You've used Query Store for troubleshooting before — T-SQL for DBAs' performance chapter
pulled top-resource-consuming queries from it. This lesson goes under the hood: how Query
Store is actually architected, exactly what it captures, and how to configure it
deliberately instead of leaving it on defaults.

## What you'll learn

- Query Store's two-store architecture: plan store and runtime stats store
- The real `ALTER DATABASE ... SET QUERY_STORE` syntax and its meaningful options
- How capture mode and cleanup policy control what Query Store actually keeps

## Two stores, not one

Query Store persists two related but distinct kinds of data, both inside the user database
itself (not `msdb`, not `tempdb`):

- **Plan store** — the distinct execution plans compiled for each query, deduplicated. If
  the same query gets three different plans over time (parameter sniffing, a stats update,
  an index rebuild), all three are kept as separate plan rows tied to the same `query_id`.
- **Runtime stats store** — aggregated execution statistics (duration, CPU, logical reads,
  execution count) for each plan, bucketed into fixed time intervals you control.

This separation is exactly what makes Query Store more useful than the plan cache for
tuning: the plan cache holds only the *current* plan and forgets everything on a recompile
or restart. Query Store keeps history — you can see that a query's plan changed on Tuesday
and got slower, even after the "bad" plan has long since been evicted from the plan cache.

## Turning it on and configuring it deliberately

```sql
ALTER DATABASE CURRENT SET QUERY_STORE = ON
(
    OPERATION_MODE = READ_WRITE,
    CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30),
    DATA_FLUSH_INTERVAL_SECONDS = 900,
    MAX_STORAGE_SIZE_MB = 1000,
    INTERVAL_LENGTH_MINUTES = 60,
    QUERY_CAPTURE_MODE = AUTO,
    SIZE_BASED_CLEANUP_MODE = AUTO,
    MAX_PLANS_PER_QUERY = 200
);
```

Every option here is a deliberate tuning decision, not a default to accept blindly:

- `OPERATION_MODE` — `READ_WRITE` captures new data; `READ_ONLY` means it's full or paused
  and only serving historical data (more on this in Lesson 37).
- `QUERY_CAPTURE_MODE` — `ALL` captures every query; `AUTO` skips infrequent, cheap, ad hoc
  queries to reduce overhead; `NONE` stops capturing new queries entirely while still
  tracking already-captured ones. `AUTO` is the right default for most production systems.
- `CLEANUP_POLICY` (`STALE_QUERY_THRESHOLD_DAYS`) — how long data is retained before
  automatic cleanup removes it.
- `MAX_STORAGE_SIZE_MB` — a hard ceiling. Hit it, and Query Store can flip to read-only
  regardless of your cleanup policy — the subject of Lesson 37.
- `INTERVAL_LENGTH_MINUTES` — the size of each runtime-stats bucket. Smaller intervals give
  finer-grained history at the cost of more storage.

## Querying Query Store directly

Query Store exposes its data through catalog views you can query like any other system
view — this is what powers the SSMS reports, but you can also write your own:

```sql
SELECT TOP 20
    qt.query_sql_text,
    q.query_id,
    p.plan_id,
    rs.avg_duration,
    rs.avg_cpu_time,
    rs.count_executions
FROM sys.query_store_query q
JOIN sys.query_store_query_text qt ON q.query_text_id = qt.query_text_id
JOIN sys.query_store_plan p ON q.query_id = p.query_id
JOIN sys.query_store_runtime_stats rs ON p.plan_id = rs.plan_id
ORDER BY rs.avg_duration DESC;
```

`sys.query_store_query` and `sys.query_store_query_text` describe the query itself;
`sys.query_store_plan` holds each distinct plan; `sys.query_store_runtime_stats` (joined
through `sys.query_store_runtime_stats_interval`) holds the per-interval performance
numbers. Understanding these four views is the foundation for everything else this chapter
covers — forcing plans, automatic tuning, and the regressed-query workflow all read from
this same underlying data.

## Key terms

| Term | Meaning |
|---|---|
| Plan store | Query Store's table of distinct, deduplicated execution plans per query |
| Runtime stats store | Query Store's table of aggregated performance metrics per plan, per time interval |
| Query capture mode | Setting controlling which queries Query Store bothers to track (`ALL`, `AUTO`, `NONE`) |
| Cleanup policy | Retention rule (`STALE_QUERY_THRESHOLD_DAYS`) governing how long Query Store keeps data |

## Check yourself

A query has had the same `query_id` for months but three different `plan_id` values in
Query Store. What does that tell you, and which catalog view would you check to see how
each plan actually performed?
