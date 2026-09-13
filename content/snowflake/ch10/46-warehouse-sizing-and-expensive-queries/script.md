# Script — Warehouse Sizing & Finding Expensive/Slow Queries

## Segment 1 (title)

Snowflake warehouses come in T-shirt sizes, X-Small through 6X-Large. Each size up roughly doubles compute and doubles the credit-consumption rate — a query that only touches a few micro-partitions doesn't run meaningfully faster on a bigger warehouse, it just burns credits faster.

## Segment 2 (steps: scale up vs. scale out)

Scale up when one query is genuinely compute- or memory-bound — a huge join, anything spilling to disk in Query Profile. Scale out, with a multi-cluster warehouse, when many users are running moderate queries at the same time and queuing behind each other.

## Segment 3 (screenshot: query history dashboard)

This is a real Snowsight monitoring view — a sortable Query History table with Duration, Bytes Scanned, and Warehouse columns. Sort by Duration and the queries actually worth tuning rise straight to the top.

## Segment 4 (code: ACCOUNT_USAGE.QUERY_HISTORY)

The same idea in SQL: querying ACCOUNT_USAGE.QUERY_HISTORY, filtered to the last week, ordered by total_elapsed_time descending, returns the account's most expensive queries directly.

## Segment 5 (outro)

Once a query shows up as an outlier, the loop closes back to Query Profile: find the expensive operator node, then decide whether the fix is a better filter, a clustering key, or genuinely more compute. Next up: Cost Management — credits, warehouse spend, and resource monitors.
