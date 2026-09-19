# Querying With Athena

Redshift is built for Northfield's regular dashboards, but analysts also ask one-off questions
that don't deserve a permanent table or a scheduled load — "which products sold best in the
Southeast last quarter?" Athena answers those directly against `northfield_catalog`, no loading
step, paying only for the bytes scanned per query.

## What you'll learn

- Setting up a dedicated Athena workgroup for Northfield's analysts
- Real ad hoc SQL against the raw and curated tables via the Glue Catalog
- Why querying curated Parquet costs a fraction of querying raw CSV

## The workgroup

```
Workgroup:        northfield-analysts
Query result location: s3://northfield-curated-zone/athena-results/
Engine version:    Athena engine v3
Per-query limit:   5 GB scanned (cost guardrail)
```

A dedicated workgroup keeps Northfield's ad hoc queries isolated from any other Athena workload
in the account, with its own result location and its own scanned-bytes guardrail so a runaway
query can't blow past a reasonable cost.

## Ad hoc query: top products by region

Analysts pull this straight from the curated zone through the Glue Catalog — no separate Athena
table definition needed, since the Glue crawler already registered the schema:

```sql
SELECT
    region,
    product_sku,
    SUM(quantity)     AS units_sold,
    SUM(order_total)  AS revenue
FROM northfield_catalog.northfield_orders_curated
WHERE dt BETWEEN DATE '2026-07-01' AND DATE '2026-09-30'
GROUP BY region, product_sku
ORDER BY revenue DESC
LIMIT 20;
```

Because the table is partitioned by `dt`, the `WHERE dt BETWEEN ...` clause prunes to only the
relevant partitions — Athena never scans a single byte outside Q3.

## Ad hoc query: inventory below reorder threshold

A different kind of one-off question — no scheduled report exists for this, so Athena is exactly
the right tool:

```sql
SELECT
    i.product_sku,
    p.product_name,
    i.warehouse_id,
    i.qty_on_hand
FROM northfield_catalog.northfield_inventory_raw i
JOIN northfield_catalog.northfield_orders_curated p
    ON i.product_sku = p.product_sku
WHERE i.dt = DATE '2026-09-19'
    AND i.qty_on_hand < 25
GROUP BY i.product_sku, p.product_name, i.warehouse_id, i.qty_on_hand;
```

This one joins raw inventory against curated orders — a reminder that Athena can query across
zones in a single query, since both are just tables in the same Glue Catalog.

## Why curated Parquet is cheaper to query than raw CSV

Athena bills per byte scanned. Querying `northfield_orders_curated` (Parquet, columnar,
compressed) for just `region`, `product_sku`, and `order_total` reads only those column chunks.
Querying the equivalent raw CSV means reading every column of every row, because CSV has no
column-level structure to skip. On a table with a dozen columns, that's routinely a 70-90% drop
in bytes scanned — and therefore cost — just from the format change Lesson 5's ETL job already
made.

## Key terms

| Term | Meaning |
|---|---|
| Athena workgroup | Isolated query environment with its own result location and cost controls |
| Bytes scanned | Athena's billing unit — what determines per-query cost |
| Partition pruning | Skipping partitions that don't match a query's WHERE clause |
| Column pruning | Reading only the columns a query needs, possible because Parquet is columnar |

## Check yourself

Why does querying `northfield_orders_curated` (Parquet) typically scan far fewer bytes — and
cost less — than running the same query against the raw CSV data?
