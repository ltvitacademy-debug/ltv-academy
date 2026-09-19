# Script — Querying With Athena

## Segment 1 (title)

Redshift is built for Northfield's regular dashboards, but analysts also ask one-off questions that don't deserve a permanent table or a scheduled load. Athena answers those directly against the Glue Catalog, paying only for bytes scanned.

## Segment 2 (code: the workgroup)

northfield-analysts is a dedicated Athena workgroup with its own query result location and a five gigabyte per-query scan limit as a cost guardrail, isolated from any other Athena workload in the account.

## Segment 3 (code: top products by region)

This query sums units sold and revenue by region and product straight from northfield_orders_curated, filtered to a date range. Because the table is partitioned by dt, that filter prunes to only the relevant partitions — Athena never scans outside the requested quarter.

## Segment 4 (steps: why it's cheap)

Two things keep Athena costs down here: partition pruning, where the WHERE clause skips whole partitions, and column pruning, where Parquet's columnar format means only the needed columns get read. Together that's routinely a 70 to 90 percent drop in bytes scanned versus the same query against raw CSV.

## Segment 5 (outro)

Next up: orchestrating with Step Functions, where every step we've built so far — crawler, ETL job, Redshift load — gets chained into one scheduled run.
