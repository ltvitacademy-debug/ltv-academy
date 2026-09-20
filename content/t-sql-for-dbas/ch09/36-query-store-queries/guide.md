# Query Store Queries

Chapter 9 turns from "is the server healthy" to "which queries are actually the problem, and
how do I prove it." Query Store is where that proof lives — it's SQL Server's built-in,
persisted history of every query, every plan it's ever used, and how each one performed.

## What you'll learn

- The three catalog views that make up Query Store's data model
- How to turn Query Store on and configure it, since it's off by default pre-2022
- A real query joining all three views to find a query's plan history

## Enabling and configuring Query Store

Query Store is per-database and, on versions before SQL Server 2022, off by default:

```sql
ALTER DATABASE AdventureWorks2019 SET QUERY_STORE = ON;

ALTER DATABASE AdventureWorks2019 SET QUERY_STORE (
    OPERATION_MODE = READ_WRITE,
    DATA_FLUSH_INTERVAL_SECONDS = 900,
    INTERVAL_LENGTH_MINUTES = 60,
    MAX_STORAGE_SIZE_MB = 1000
);
```

`OPERATION_MODE = READ_WRITE` is what actually captures new data; `READ_ONLY` means it stops
recording (usually because it hit `MAX_STORAGE_SIZE_MB`) but still lets you query history.

## The three catalog views

Query Store's data model is three views, joined on IDs:

| View | What it holds |
|---|---|
| `sys.query_store_query` | One row per distinct query, with its `object_id` (if it's in a stored procedure) and query text ID |
| `sys.query_store_plan` | One row per execution plan that query has ever used — a query can have multiple plans over time |
| `sys.query_store_runtime_stats` | Performance numbers (duration, CPU, logical reads) per plan, per time interval |

A query text itself lives in a fourth view, `sys.query_store_query_text`, referenced by
`query_text_id` on `sys.query_store_query`.

## Finding a query's history

Joining all four together is the real, everyday Query Store query:

```sql
SELECT
    qt.query_sql_text,
    q.query_id,
    p.plan_id,
    rs.avg_duration,
    rs.avg_cpu_time,
    rs.avg_logical_io_reads,
    rs.count_executions,
    rs.last_execution_time
FROM sys.query_store_query AS q
JOIN sys.query_store_query_text AS qt ON q.query_text_id = qt.query_text_id
JOIN sys.query_store_plan AS p ON q.query_id = p.query_id
JOIN sys.query_store_runtime_stats AS rs ON p.plan_id = rs.plan_id
WHERE qt.query_sql_text LIKE '%SalesOrderDetail%'
ORDER BY rs.last_execution_time DESC;
```

Unlike the plan cache (Lesson 37), this history survives a service restart — Query Store
writes to disk, which is exactly why it's the tool for answering "did this query's
performance actually change last week" instead of only "how is it running right now."

## Key terms

| Term | Meaning |
|---|---|
| Query Store | Per-database feature persisting query text, plans, and runtime stats to disk over time |
| `sys.query_store_query` | Catalog view: one row per distinct query |
| `sys.query_store_runtime_stats` | Catalog view: performance metrics per plan, per time interval |

## Check yourself

Why does Query Store's history survive a SQL Server restart when the plan cache does not?
