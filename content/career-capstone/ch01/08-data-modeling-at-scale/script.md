# Script — Data Modeling at Scale: Star Schema Revisited

## Segment 1 (title)

The star schema from T-SQL doesn't change at scale — a fact table surrounded by conformed dimensions is still the right default shape, from ten thousand rows to ten billion. What changes is what that fact table costs to scan, join, and update — and that's a system design problem.

## Segment 2 (code: grain first)

Before choosing star versus snowflake, fix the fact table's grain — the exact thing one row represents. One row per order, or one row per order line item, are both valid, but they produce very different row counts and different joins. Getting the grain wrong later is a redesign, not a tweak.

## Segment 3 (code: snowflake trade-off)

Snowflake schema normalizes a dimension to remove redundancy. At scale that trade-off sharpens: fewer duplicated bytes, but every query pays an extra join. Star schema's redundancy is usually worth it for analytics, specifically because Databricks's Z-ordering and file-size tuning assumes a denormalized fact table to work against.

## Segment 4 (code: SCD as a merge)

Slowly changing dimensions at scale interact directly with the ingestion layer — a Type 2 update becomes a targeted merge into a Delta table, the same MERGE INTO pattern from Databricks Lesson 22, not a full table rewrite. Designing for SCDs at scale means designing the merge.

## Segment 5 (outro)

Grain first, then schema, then the merge strategy that keeps it current. Next up: partitioning strategies — how that same fact table actually gets split up at scale.
