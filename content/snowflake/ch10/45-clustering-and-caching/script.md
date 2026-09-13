# Script — Clustering & Caching

## Segment 1 (title)

Pruning works well when a column stays naturally well-clustered as data loads. But a huge, frequently updated table can end up with values scattered across nearly every micro-partition — pruning stops helping because there's nothing left to skip.

## Segment 2 (code: CLUSTER BY)

A clustering key tells Snowflake which column to actively keep co-located as the table changes. Snowflake reorganizes micro-partitions in the background — automatic clustering — to keep the min/max metadata tight, at the cost of background compute credits, so it's reserved for genuinely large tables.

## Segment 3 (screenshot: result cache)

This is the result cache working in the UI — the same query, run a second time, comes back dramatically faster because the result was cached, not re-executed. It's one of Snowflake's three cache layers.

## Segment 4 (steps: three cache layers)

Result cache holds every query's results for 24 hours account-wide at zero compute cost. Metadata cache answers pruning and simple aggregates from statistics alone. Warehouse cache holds raw data pages on local disk — but disappears the moment that warehouse suspends.

## Segment 5 (outro)

Next lesson: warehouse sizing and finding expensive queries — choosing the right compute size for a workload, and using Query History to spot the queries actually worth tuning.
