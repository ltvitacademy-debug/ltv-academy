# Lesson 45 — Clustering & Caching

**Chapter 10 · Performance Optimization · Lesson 45 of 60**

## What you'll learn

- Why very large tables sometimes need an explicit clustering key
- The CLUSTER BY syntax and what it actually reorganizes
- Snowflake's three cache layers, and what each one skips
- How to recognize a cached query in Query Details

## Clustering keys: keeping pruning effective as a table grows

Lesson 44 showed pruning working well when a column's values are
naturally grouped together across micro-partitions — a date column on
an append-only table, for instance, tends to stay well-clustered on
its own as new rows land in date order. But a huge table with lots of
updates, or a filter column that isn't naturally ordered, can end up
with values for any given range scattered across nearly every
micro-partition — pruning stops helping because there's nothing left
to skip.

A **clustering key** tells Snowflake which column(s) to actively keep
co-located as the table changes:

```sql
ALTER TABLE sales.public.transactions
  CLUSTER BY (transaction_date);
```

Snowflake then reorganizes micro-partitions in the background to keep
rows with similar `transaction_date` values together, so the min/max
metadata from Lesson 44 stays tight and pruning keeps working even as
the table grows into the billions of rows. This isn't free — Snowflake
calls this "automatic clustering," and it consumes background compute
credits to maintain — so it's reserved for genuinely large tables
where query performance is actually suffering from poor natural
clustering, not applied by default to every table.

## Snowflake's three cache layers

Beyond pruning, Snowflake keeps three separate layers of cache, each
skipping a different kind of work:

1. **Result cache** — holds the results of every query run in the last
   24 hours, account-wide. If the exact same query text runs again and
   the underlying data hasn't changed, Snowflake returns the cached
   result instantly, using **zero compute credits** — not even a
   warehouse needs to be running.
2. **Metadata cache** — the min/max and row-count statistics from
   Lesson 44, held in the cloud services layer. Pruning decisions and
   simple aggregates (like `COUNT(*)` on an unfiltered table) can
   sometimes be answered from metadata alone, again without spinning
   up warehouse compute.
3. **Warehouse (local disk) cache** — each running virtual warehouse
   caches the raw data pages it reads on its local SSD. A second query
   against the same data, from the same warehouse, reads warm data off
   local disk instead of pulling it from cloud storage again — but this
   cache disappears the moment the warehouse suspends.

You can see the result cache working directly in the UI:

![The Snowsight Query Details panel after re-running an identical query, with the query duration highlighted — dramatically shorter than the original run because the result came straight from the result cache instead of re-executing.](/courses/snowflake/ch10/45-clustering-and-caching/result-cache-query-duration.png)
*Same query, same data, run a second time — the result cache returns it almost instantly, at zero compute cost.*
Source: [Snowflake Quickstarts — Getting Started with Snowflake](https://quickstarts.snowflake.com/guide/getting_started_with_snowflake/index.html)

## Key terms

| Term | Meaning |
|---|---|
| Clustering key | A column (or columns) Snowflake actively keeps co-located across micro-partitions as a table changes |
| Automatic clustering | The background maintenance process that reorganizes micro-partitions to match a clustering key |
| Result cache | Account-wide cache of query results for 24 hours; zero compute cost on a hit |
| Metadata cache | Cloud-services-layer statistics (min/max, row counts) usable without warehouse compute |
| Warehouse cache | Per-warehouse local-disk cache of raw data pages; lost when the warehouse suspends |

## Lab

1. Run any query against a sample table, note its duration in Query
   Details.
2. Run the exact same query again with no changes and compare the
   duration — confirm it dropped dramatically and check whether the
   Query Profile marks it as served from the result cache.
3. Run `ALTER TABLE <table> CLUSTER BY (<column>);` on a large sample
   table, then run `SELECT SYSTEM$CLUSTERING_INFORMATION('<table>');`
   before and after to compare clustering quality.
4. Suspend and resume the warehouse you're using, then re-run a query
   you ran earlier — notice the local disk cache benefit is gone even
   though the result cache may still apply.

## Check yourself

You're ready for Lesson 46 when you can name Snowflake's three cache
layers and say, for each one, what has to stay true (identical query
text, unchanged data, a still-running warehouse) for it to help.
