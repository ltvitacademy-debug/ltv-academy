# Lesson 8 — Extending the Daily Summary Gold Table

**Chapter 1 · Data Engineering Capstone — Intermediate Project · Lesson 8 of 16**

## What you'll learn

- Why `gold.daily_sales_summary`'s own aggregation logic needed zero changes in this redesign
- Confirming, with real code, that it was always just reading from Silver
- Why Gold logic is decoupled from how Silver gets populated, as long as Silver's end state is correct
- What this chapter actually accomplished across all four of its lessons

## Revisiting the original Gold table

The Beginner project built `gold.daily_sales_summary` for the Store Operations stakeholder: total
sales and transaction count, one row per store per day. This chapter has spent three lessons
completely redesigning how `silver.sales_clean` gets populated — switching it from a full nightly
rewrite to an incremental `MERGE INTO`. A reasonable question at this point: does `daily_sales_summary`
need to change too?

## The aggregation, unchanged

```python
from pyspark.sql import functions as F

daily_summary = (
    spark.table("silver.sales_clean")
    .groupBy("store_id", "sale_date")
    .agg(
        F.sum("total_amount").alias("total_sales"),
        F.count("transaction_id").alias("total_transactions"),
    )
)

(daily_summary.write
    .format("delta")
    .mode("overwrite")
    .saveAsTable("gold.daily_sales_summary"))
```

Compare this to the Beginner project's original version. It's the same logic: group
`silver.sales_clean` by `store_id` and `sale_date`, sum `total_amount` into `total_sales`, count
`transaction_id` into `total_transactions`, overwrite the Gold table. Not one line of this
aggregation changed.

## Why nothing had to change

This table was never written to care *how* Silver gets populated. It only ever read Silver's
current state and aggregated it. That's the whole point of the medallion pattern's layering: each
layer depends on the *contents* of the layer beneath it, not on the *process* that produced those
contents.

So what actually changed, from this table's point of view?

- Before this chapter: `silver.sales_clean` was rebuilt from a full nightly reprocess of Bronze.
- After this chapter: `silver.sales_clean` is upserted incrementally through `MERGE INTO`, handling
  late-arriving data correctly (Lesson 6) by matching on `transaction_id` (Lesson 5).
- Either way, by the time `gold.daily_sales_summary` runs, Silver holds one correct row per
  transaction, with the right `sale_date` on each one. The aggregation reads that and produces the
  right totals — it has no way to tell, and no reason to care, which maintenance strategy put those
  rows there.

In fact, this table's totals are now *more* trustworthy than before, specifically because Silver
itself got more trustworthy — the late-arriving sale from Lesson 6 now shows up correctly in the
right day's total, something a naive full-reload design handled by luck rather than by design.

## The real lesson: decoupling

This is the core engineering principle this whole chapter has been building toward: **Gold logic is
decoupled from how Silver got populated, as long as Silver's end state is correct.** That decoupling
is exactly what let this team redesign the entire Bronze-to-Silver pipeline — a genuinely invasive
change — without touching, retesting, or even thinking hard about the existing Gold table downstream
of it. A good layered design lets you change how a layer is maintained without rippling changes
through every layer built on top of it.

## What this chapter built

Across these four lessons: an incremental `MERGE INTO` upsert for Silver (Lesson 5), confidence that
it handles late-arriving data correctly (Lesson 6), a brand-new Gold table for the Regional Manager
(Lesson 7), and confirmation that the original Gold table needed no changes at all (this lesson).
Both Gold tables now sit on top of one shared, correctly-maintained Silver layer.

## Key terms

| Term | Meaning |
|---|---|
| Decoupling | Designing layers so a change to how one layer is maintained doesn't require changes to layers built on top of it |
| Medallion pattern | The Bronze/Silver/Gold layering where each layer depends on the contents, not the process, of the layer below |

## Lab

Open your own copy of the `gold.daily_sales_summary` aggregation from the Beginner project (or
reconstruct it from memory) and compare it line by line against the version in this lesson. Confirm
for yourself that nothing in the aggregation itself changed — only what feeds it changed.

## Check yourself

Without looking back: explain, in one or two sentences, why `gold.daily_sales_summary` required zero
code changes even though the entire way Silver gets populated was redesigned underneath it.
