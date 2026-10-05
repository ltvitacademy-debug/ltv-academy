# Lesson 8 — Lineage Through Data Lakes and Warehouses

**Chapter 2 · Tracing Data · Lesson 8 of 25**

## What you'll learn

- The medallion pattern (bronze/silver/gold) and what lineage looks like moving through it
- How warehouse lineage differs from lake lineage — table/view level vs. file/folder level
- Why a view's lineage behaves differently from a materialized table's, and why that matters later
- How this builds directly on Lesson 7's ETL/ELT landing point

## From landing zone to lake: the medallion pattern

Lesson 7 ended with raw data landing somewhere — a staging schema, a lake. Many lake architectures organize that landing zone into three layers, often called **medallion architecture**:

- **Bronze** — raw data, as extracted, untouched. This is the landing zone from Lesson 6 and 7's "raw.orders," kept exactly as it arrived.
- **Silver** — cleaned and conformed: deduplicated, standardized types, bad rows filtered or flagged. Still roughly one row per source record, just trustworthy.
- **Gold** — business-ready: aggregated, joined across sources, modeled for a specific use (a fact table, a reporting view).

Lineage through this pattern is a chain of hops, each one a transformation job: `bronze.events` → `silver.events_clean` → `gold.fact_sales`. Every column in `gold.fact_sales` should be traceable back through exactly which silver columns, and ultimately which bronze columns, produced it — this is column-level lineage (Chapter 1, Lesson 4) applied to a real multi-hop chain instead of a single hop.

## Warehouse lineage: tables, views, and the dimensional model

A data warehouse organizes gold-layer data into a **dimensional model** — fact tables (events: sales, orders) and dimension tables (context: customers, products, dates). Lineage here is usually table- or view-level: `stg_orders` feeds `fct_orders`, which joins to `dim_customer` and `dim_date`.

The wrinkle that doesn't come up in a lake: **views vs. materialized objects**. A regular view has no lineage "lag" — query it, and it recomputes from its underlying tables right then, so it instantly reflects any upstream schema or data change. A materialized (physical) table is lineage with a time lag baked in — it reflects whatever its *last refresh* pulled, which might be hours or a day stale. Both are valid, traceable lineage — but if you're doing root-cause analysis (Chapter 3) on a wrong number, knowing which kind of object you're looking at tells you whether the problem could still be "in flight" upstream or is already frozen into what you're querying.

## Multi-hop lineage, end to end

```
raw-file.csv -> bronze.events (landed, untouched)
             -> silver.events_clean (deduped, typed, bad rows flagged)
             -> gold.fact_sales (aggregated, joined to dim_customer, dim_date)
```

Each arrow in this chain is a separate lineage edge that has to be independently traceable — "trust the whole chain" isn't good enough when something breaks; you need to know *which hop* introduced the problem.

## Key terms

| Term | Meaning |
|---|---|
| Medallion architecture | Bronze (raw) / Silver (cleaned) / Gold (business-ready) layering of a data lake |
| Dimensional model | Fact tables (events) and dimension tables (context) that make up a warehouse's gold layer |
| View | A query definition that recomputes from source tables every time it's read — no lineage lag |
| Materialized table | A physical table refreshed on a schedule — lineage reflects its last refresh, not right now |

## Lab

Take the raw-file-to-fact-table chain shown above and add one more real hop from a system you know — a semantic model or report that reads from a gold-layer table. For that one added hop, note whether it reads a view (always current) or a materialized/imported copy (as-of-last-refresh). That distinction is exactly what the next lesson, on semantic models, builds on.

## Check yourself

Can you explain why a materialized table and a view sitting side by side, both built from the same upstream source, can show different numbers at the same moment — and why that's not a bug, just a lineage-lag fact you need to know about each object?
