# Query Performance Decision Guide

From Chapter 10.

## Step 1: open Query Profile, find the expensive node

Look at `bytes_scanned` vs. `bytes_returned`. A huge gap between the
two is the first signal — the query is reading far more data than it
actually needs.

## Step 2: is it a pruning problem?

```sql
SELECT SYSTEM$CLUSTERING_INFORMATION('<table>', '(<column>)');
```

Check `average_depth` for the column(s) your query filters on. High
average_depth = that column's values are scattered across many
micro-partitions = filtering on it can't prune effectively, no matter
how well the WHERE clause is written.

**If average_depth is high on a filtered column:** this is a
clustering problem.

**If average_depth is already low but bytes scanned is still high:**
check whether the query filters on *multiple* columns and the table
is only clustered on one of them — a compound clustering key may be
needed, not a different single-column key.

## Step 3: fix the right thing

| Symptom | Fix |
|---|---|
| High average_depth on a frequently-filtered column | `ALTER TABLE ... CLUSTER BY (column)` |
| Query filters on 2+ columns together, frequently, across multiple real queries | Compound clustering key: `CLUSTER BY (col1, col2)` |
| Bytes scanned is reasonable, but the query is still slow (CPU/memory-bound, spilling to disk in Query Profile) | Scale up — bigger single warehouse |
| Many moderate queries queuing behind each other, no single query is the problem | Scale out — multi-cluster warehouse |
| `SELECT *` pulling unnecessary columns | Narrow the projection to only needed columns |

## What NOT to do by default

**Don't resize the warehouse first as a reflex.** It makes an
unpruned, oversized scan finish faster, but doesn't reduce bytes
scanned — meaning it burns more credits per hour to do the same
wasteful work, rather than fixing the actual cause.

**Don't add clustering keys on every column a slow query happens to
filter on.** Clustering maintenance has a real, ongoing credit cost.
Justify a compound key with evidence that multiple real queries
filter on the same column combination — check `QUERY_HISTORY` for the
pattern, not just this one slow run.

## Finding what's actually worth tuning

```sql
SELECT query_id, user_name, warehouse_name,
       total_elapsed_time, bytes_scanned, execution_status
FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY
WHERE start_time >= DATEADD(day, -7, CURRENT_TIMESTAMP())
ORDER BY total_elapsed_time DESC
LIMIT 20;
```
