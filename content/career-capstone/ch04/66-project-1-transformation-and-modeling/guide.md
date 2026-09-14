# Lesson 66 — Project 1: Transformation and Modeling

**Chapter 4 · Added Projects — Capstones · Lesson 66 of 81**

## What you'll learn

- Building the silver and gold transforms on top of Lesson 65's bronze data
- Designing the star schema Lesson 8 described, for this project specifically
- Applying SCD Type 2 to a real changing dimension: `DimStore`
- Why the silver layer, not gold, is where in-store and online data merge

## Silver: cleaning and conforming two sources into one shape

Databricks & Delta Lake Lesson 27 defines silver as cleaned, conformed
data — and "conformed" is the operative word here. `bronze/pos_sales` and
`bronze/online_orders` arrive with different column names and different
shapes (one row per POS line, one JSON event per online order). Silver's
job, per Lesson 29's bronze-to-silver pipeline pattern, is producing one
unified `silver.sales_events` table where an in-store sale and an online
sale are indistinguishable except for a `channel` column.

```
bronze.pos_sales        --\
                            --> silver.sales_events
bronze.online_orders    --/      (unified grain: one row
                                   per line item per sale)
```

This is also where Lesson 64's fixed grain — one row per line item per
sale — actually gets enforced. Both sources get reshaped to match it here,
not later.

## Gold: the star schema

Lesson 8's star schema applies directly: one fact table at the grain
already fixed, surrounded by conformed dimensions.

```sql
-- gold.FactSales: one row per line item per sale
CREATE TABLE gold.FactSales (
  sale_line_id   BIGINT,
  sale_id        BIGINT,
  store_id       INT,        -- FK to DimStore
  product_id     INT,        -- FK to DimProduct
  date_id        INT,        -- FK to DimDate
  channel        STRING,     -- 'in_store' or 'online'
  quantity       INT,
  amount         DECIMAL(10,2)
) USING DELTA;
```

`DimStore`, `DimProduct`, and `DimDate` are the conformed dimensions — the
same three-dimension shape Lesson 8 built for `FactOrders`, reused here
because the modeling idea doesn't change between projects, only the data
does. Databricks Lesson 30's silver-to-gold pipeline pattern is what
actually produces this table on a schedule.

## SCD Type 2 for DimStore

Stores change: a store gets remodeled, moves regions, or changes its
category mix. `DimStore` needs history — Lesson 8's SCD Type 2 revisited,
implemented as the same targeted merge Databricks Lesson 22 covers, not a
dimension rewrite.

```sql
-- SCD Type 2 update to DimStore, on a region change
MERGE INTO gold.DimStore AS target
USING StoreUpdates AS source
ON target.store_id = source.store_id AND target.is_current = 1
WHEN MATCHED AND target.region <> source.region THEN
  UPDATE SET target.end_date = current_date(), target.is_current = 0
WHEN NOT MATCHED THEN
  INSERT (store_id, region, category_mix, effective_date, is_current)
  VALUES (source.store_id, source.region, source.category_mix,
          current_date(), true)
```

A dashboard query for "sales by region, this quarter" against `FactSales`
joined to `DimStore` on `is_current = 1` (or the historically-correct
`DimStore` row for older dates) gets the region a sale actually happened
in — not the store's current region retroactively applied to old sales.

## Why silver merges channels, not gold

It's tempting to keep `pos_sales` and `online_orders` separate all the
way to gold and union them at query time. That pushes the same
reconciliation work into every query that touches sales. Doing it once, in
silver, is exactly the "transform once, query many times" reasoning behind
Lesson 14's transformation-layer design — the dashboard in Lesson 67 gets
a single clean `FactSales` table to query, with no channel-specific logic
required at read time.

## Key terms

| Term | Meaning |
|---|---|
| Conforming | Reshaping two differently-shaped sources into one unified grain, in silver |
| `FactSales` | The gold-layer fact table, one row per line item per sale, any channel |
| SCD Type 2 on `DimStore` | Tracks store history (region, category mix) as a targeted merge, not a rewrite |

## Check yourself

You're ready for Lesson 67 when you can explain, without looking: why does
merging in-store and online data happen in silver rather than being left
for gold or for the dashboard query itself?
