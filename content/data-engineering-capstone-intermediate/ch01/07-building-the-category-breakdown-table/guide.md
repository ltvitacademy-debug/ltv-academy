# Lesson 7 — Building the Category Breakdown Gold Table

**Chapter 1 · Data Engineering Capstone — Intermediate Project · Lesson 7 of 16**

## What you'll learn

- The Regional Manager's actual requirement: sales broken down by category, not just by store
- Real PySpark and SQL for building `gold.category_breakdown` from `silver.sales_clean`
- Why this Gold table can be fully recomputed every run, with no incremental logic of its own
- Why that's safe now, specifically because Silver is kept small and correct by the Lesson 5 MERGE

## What the Regional Manager actually asked for

The Beginner project built one Gold table — `gold.daily_sales_summary` — for the Store Operations
stakeholder: total sales and transaction count, one row per store per day. That answers "how did
each store do," but it can't answer a different, real question a Regional Manager is going to ask:
**which categories are driving those numbers?** A store's daily total might be flat while electronics
are up and apparel is down underneath it — information the existing table simply can't show, because
it never grouped by category at all.

That's a new table, not a change to the old one. This lesson builds it: `gold.category_breakdown`,
with columns `store_id, category, sale_date, total_sales, total_quantity` — one row per store, per
category, per day.

## The aggregation, in PySpark

```python
from pyspark.sql import functions as F

category_breakdown = (
    spark.table("silver.sales_clean")
    .groupBy("store_id", "category", "sale_date")
    .agg(
        F.sum("total_amount").alias("total_sales"),
        F.sum("quantity").alias("total_quantity"),
    )
)

(category_breakdown.write
    .format("delta")
    .mode("overwrite")
    .saveAsTable("gold.category_breakdown"))
```

The same aggregation in SQL:

```sql
CREATE OR REPLACE TABLE gold.category_breakdown AS
SELECT
    store_id,
    category,
    sale_date,
    SUM(total_amount) AS total_sales,
    SUM(quantity)      AS total_quantity
FROM silver.sales_clean
GROUP BY store_id, category, sale_date
```

Both versions do the same thing: group every row in `silver.sales_clean` by `store_id`, `category`,
and `sale_date`, sum `total_amount` into `total_sales`, sum `quantity` into `total_quantity`, and
write the result as a Delta table.

## Why `mode("overwrite")` is the right call here

Notice this Gold table doesn't get its own `MERGE INTO`. It's written with a plain overwrite, every
run, recomputed from scratch. That's a deliberate choice, not an oversight — and it's only safe
*because* of the redesign in the lessons before this one:

- Silver (`silver.sales_clean`) is now kept correct and complete through the incremental `MERGE
  INTO` from Lesson 5 — every run, it already reflects the true, up-to-date state of every sale,
  late arrivals included.
- Silver is comparatively small. It's not the full history of raw, duplicate-laden Bronze data — it's
  one clean row per transaction.
- Because of both of those things, recomputing a group-by aggregation over all of Silver, every run,
  is cheap and simple. There's no benefit to building incremental merge logic for this Gold table;
  it would only add complexity for no real performance win.

This is the real tradeoff this project is teaching: push the hard incremental logic down to the
layer where it actually matters (Bronze and Silver, where the data volume is large), and keep the
Gold layer as simple, fully-recomputed aggregations on top of a trustworthy Silver.

## Key terms

| Term | Meaning |
|---|---|
| Gold layer | The business-ready, aggregated layer consumers like dashboards query directly |
| Full overwrite | Rewriting a table's entire contents from current source data, rather than upserting changes |
| `GROUP BY` | The SQL/PySpark operation that collapses rows sharing the same key values into one aggregated row |

## Lab

Write the PySpark aggregation for `gold.category_breakdown` from memory. Then write one sentence
explaining why this table is safe to fully overwrite every run, while `silver.sales_clean` is not.

## Check yourself

Without looking back: what three columns does `gold.category_breakdown` group by, and which two
columns does it sum? And why doesn't this Gold table need its own `MERGE INTO`?
