# Lesson 46 — Warehouse Sizing & Finding Expensive/Slow Queries

**Chapter 10 · Performance Optimization · Lesson 46 of 60**

## What you'll learn

- How Snowflake warehouse sizes scale, and what doubling a size actually buys you
- When to scale up (bigger warehouse) versus scale out (multi-cluster)
- How to sort Query History by duration or bytes scanned to find what's actually expensive
- How this connects back to Query Profile from Lesson 43 to explain *why* a query is slow

## Warehouse sizes: doubling compute, doubling credits

Snowflake warehouses come in T-shirt sizes — X-Small, Small, Medium,
Large, X-Large, up through 4X-Large and beyond. Each size up roughly
**doubles the compute** available and **doubles the credit-consumption
rate**. There's no cost advantage to running a bigger warehouse than a
workload needs — a query that only ever touches a few micro-partitions
doesn't run meaningfully faster on a 4X-Large than a Small, but it
burns credits four sizes faster.

The two levers, and when each applies:

- **Scale up** (bigger single warehouse) when one query is
  genuinely compute- or memory-bound — a huge join, a wide
  aggregation, anything spilling to disk in Query Profile (Lesson 43).
  More compute per query directly helps here.
- **Scale out** (a multi-cluster warehouse, running several
  same-sized clusters in parallel) when the problem isn't any single
  query being slow, but *many users running moderate queries at the
  same time* and queuing behind each other. Multi-cluster adds
  parallel capacity, not more power per query.

Right-sizing starts small — an X-Small or Small warehouse for most
exploratory work — and moves up only when Query Profile shows a
specific, recurring bottleneck that more compute would actually fix.

## Finding what's actually expensive

Lesson 43 introduced Query History for finding slow queries. The same
idea scales to "which queries, across the whole account, are actually
worth tuning":

```sql
-- Top 20 most expensive queries in the last 7 days
SELECT query_id, user_name, warehouse_name,
       total_elapsed_time, bytes_scanned, execution_status
FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY
WHERE start_time >= DATEADD(day, -7, CURRENT_TIMESTAMP())
ORDER BY total_elapsed_time DESC
LIMIT 20;
```

Snowsight's own monitoring views do the same sorting visually — a
Query History table with sortable **Duration**, **Bytes Scanned**, and
**Warehouse** columns, exactly the columns you need to spot a pattern
(one warehouse consistently running long queries, one query hash
spiking in duration at a particular time of day):

![A real Snowsight monitoring view: summary stats (queries executed, total duration), latency and executions-per-minute charts, and a sortable Query History table listing Query ID, Status, User, Warehouse, Duration, Started, and Bytes Scanned for every execution of a query.](/courses/snowflake/ch10/46-warehouse-sizing-and-expensive-queries/query-history-duration.png)
*Sort this table by Duration or Bytes Scanned to find the queries actually worth opening in Query Profile.*
Source: [Snowflake Documentation — Exploring Query Profile](https://docs.snowflake.com/en/user-guide/ui-query-profile)

Once a query shows up here as an outlier, the workflow closes the loop
back to Lesson 43: open its Query Profile, find the expensive
operator node, and decide whether the fix is a better filter, a
clustering key (Lesson 45), or genuinely more compute.

## Key terms

| Term | Meaning |
|---|---|
| Warehouse size | X-Small through 6X-Large; each size up roughly doubles compute and credit rate |
| Scale up | Increasing a single warehouse's size to speed up compute/memory-bound queries |
| Scale out | Adding parallel clusters (multi-cluster warehouse) to handle more concurrent users |
| ACCOUNT_USAGE.QUERY_HISTORY | The account-wide, longer-retention view of query history, queryable in SQL |
| Auto-suspend | Automatically pausing a warehouse after a period of inactivity to stop billing |

## Lab

1. Run `SHOW WAREHOUSES;` and note the size and auto-suspend setting
   of each warehouse in your account.
2. Run the `ACCOUNT_USAGE.QUERY_HISTORY` query above (or its
   `INFORMATION_SCHEMA.QUERY_HISTORY()` equivalent on a trial account)
   and identify your single slowest query from the last few days.
3. Open that query's Query Profile and identify whether the fix looks
   like a pruning problem (Lesson 44), a clustering problem
   (Lesson 45), or a genuine need for more compute.
4. If you have permission, resize a test warehouse up one size with
   `ALTER WAREHOUSE <name> SET WAREHOUSE_SIZE = 'SMALL';` and re-run
   the same query to compare duration.

## Check yourself

You're ready for the Cost Management chapter when you can explain the
difference between scaling up and scaling out in one sentence each,
and you can write a query against `QUERY_HISTORY` that returns the
slowest queries ordered by duration.
