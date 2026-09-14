# Lesson 8 — Data Modeling at Scale: Star Schema Revisited

**Chapter 1 · System Design for Data Engineers · Lesson 8 of 81**

## What you'll learn

- Why the star schema from T-SQL Lesson 114 still holds at any scale
- What actually changes at scale: fact table size, not the modeling idea
- Snowflake schema and SCDs, revisited as design *trade-offs*, not just definitions
- How to pick a grain before you pick a schema

## The idea doesn't change — the numbers do

T-SQL Lesson 113 introduced fact and dimension tables; Lessons 114–116
covered the star schema, the snowflake schema, and slowly changing
dimensions. None of that changes here. A star schema with one fact
table (`FactOrders`) surrounded by conformed dimensions (`DimCustomer`,
`DimProduct`, `DimDate`) is still the right default shape for
analytical queries — at 10,000 rows or 10 billion.

What changes at scale is what the fact table *costs* to scan, join,
and update, and that's a system design problem, not a modeling one.

```
Same shape, different scale:
FactOrders (10K rows)      -- fits in memory, any join plan works
FactOrders (10B rows)      -- must be partitioned (Lesson 9),
                               maybe sharded (Lesson 10),
                               and queried by a serving layer
                               designed for it (Lesson 15)
```

## Grain first, schema second

Before choosing star vs. snowflake, fix the fact table's **grain** —
the exact thing one row represents. "One row per order" and "one row
per order line item" are both valid grains for an orders fact table,
but they produce very different row counts and different downstream
joins. Getting the grain wrong is a redesign, not a tweak — every
dimension and every query built on top of it assumes that grain.

```
Vague:  "a fact table about orders"
Grain:  "one row per (order_id, line_item_id) — an order with
         3 items produces 3 fact rows, one per line item"
```

## Snowflake schema, as a trade-off

T-SQL Lesson 115 showed the snowflake schema normalizing a dimension
(say, `DimProduct` splitting into `DimProduct` + `DimCategory`) to
remove redundancy. At scale, that trade-off gets sharper: fewer
duplicated bytes in the dimension, but every query now pays an extra
join to reassemble it. Star schema's redundancy is usually the right
call for analytics specifically *because* read performance matters
more than storage savings — Databricks & Delta Lake Lesson 23's
`OPTIMIZE` and file-compaction guidance assumes a denormalized fact
table to be effective against in the first place.

## Slowly changing dimensions, at scale

T-SQL Lesson 116's SCD Type 2 (keep history, add a new row with
`effective_date`/`end_date`) is the same technique here, but at scale
it interacts directly with the ingestion-layer design in Lesson 13:
a Type 2 dimension update is a targeted `MERGE` into a Delta table
(Databricks Lesson 22's `UPDATE, DELETE, and MERGE` pattern), not a
full table rewrite. Designing for SCDs at scale means designing the
*merge*, not just the schema.

```sql
-- The same SCD2 idea, expressed as a merge Databricks Lesson 22
-- already covers — this is why the pattern matters at scale
MERGE INTO DimCustomer AS target
USING CustomerUpdates AS source
ON target.customer_id = source.customer_id AND target.is_current = 1
WHEN MATCHED AND target.email <> source.email THEN
  UPDATE SET target.end_date = current_date(), target.is_current = 0
```

## Key terms

| Term | Meaning |
|---|---|
| Grain | The exact thing one fact table row represents — fix this before the schema |
| Star schema (at scale) | Still the default; the cost of its redundancy is now a real system design factor |
| SCD at scale | The same Type 2 pattern, implemented as a targeted merge, not a table rewrite |

## Check yourself

You're ready for Lesson 9 when you can explain, without looking: why
does getting a fact table's grain wrong require a redesign rather
than a simple fix?
