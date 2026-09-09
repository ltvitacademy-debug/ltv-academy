# Lesson 30 — Designing a Silver-to-Gold Pipeline

**Chapter 3 · Medallion Architecture · Lesson 30 of 57**

## What you'll learn

- Why silver-to-gold is usually simpler than bronze-to-silver, and why that's expected
- `overwrite`, not `MERGE` — the right default for many gold tables
- When gold actually does need incremental logic instead
- Chaining both pipelines: one job, two tasks, in order

## Simpler than you might expect

Bronze-to-silver deals with real messiness: casting, deduplication,
nulls (Lesson 29). Silver-to-gold, by the time it runs, is reading
data that's **already** clean — its job is aggregation
(`groupBy`/`.agg()`, Lesson 28), not cleaning. Fewer transformation
steps is expected here, not a sign something's missing.

## overwrite — the right default for many gold tables

```python
gold_daily_revenue = (
    spark.table("silver.trips")
    .groupBy("VendorID", to_date("tpep_pickup_datetime").alias("trip_date"))
    .agg(sum("fare_amount").alias("total_revenue"))
)

gold_daily_revenue.write.format("delta").mode("overwrite").saveAsTable("gold.daily_revenue")
```

Unlike silver's `MERGE`, many gold tables are small enough
(Lesson 28) to just fully recompute and `mode("overwrite")` every
run — simpler than `MERGE`, and just as correct, since the whole
table is rebuilt from all of silver each time rather than merged
incrementally.

## When gold does need incremental logic

For a genuinely large gold aggregate — built from a silver table
with billions of rows — recomputing everything on every run gets
expensive. In that case, gold uses the same `MERGE`-based pattern
Lesson 29 introduced for silver, updating only the aggregate rows
that could have actually changed (say, today's date's revenue
figure), not the entire table's history. This is a real engineering
tradeoff: `overwrite`'s simplicity against `MERGE`'s efficiency at
scale.

## Chaining both pipelines into one job

```
Job: daily_medallion_pipeline
  Task 1: bronze_to_silver  (Lesson 29's notebook)
  Task 2: silver_to_gold    (this lesson's notebook) -- depends on Task 1
```

This is Lesson 11's task-chaining, doing real work: `Task 2` only
starts once `Task 1` finishes successfully, guaranteeing gold never
reads silver mid-update. One job, two tasks, in the correct order,
scheduled once.

## Key terms

| Term | Meaning |
|---|---|
| `overwrite` for gold | Recompute the whole (small) table each run — simpler than `MERGE` |
| Incremental gold | `MERGE`-based updates for genuinely large gold aggregates |
| Chained tasks | `Task 2` depends on `Task 1`, guaranteeing correct read order |

## Check yourself

You're ready for Lesson 31 when you can explain, without looking: why
is `mode("overwrite")` usually simpler and just as correct as
`MERGE` for a typical gold table?
