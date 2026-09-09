# Lesson 35 — Handling Late-Arriving Data

**Chapter 3 · Medallion Architecture · Lesson 35 of 57**

## What you'll learn

- "Late" data: a real event, arriving after the batch it actually belongs to already ran
- Why this specifically breaks a naive gold aggregate, and how
- Reprocessing a window — using `MERGE` (Lesson 22) to fix an already-published number
- Why bronze's permanence (Lesson 26) is what makes any of this fixable

## What "late" actually means

A trip that happened on January 15th, but whose record doesn't reach
bronze until January 17th — a network delay, a source system's own
backlog, a retried failed upload. The trip's real-world timestamp
(`tpep_pickup_datetime`) is January 15th; its arrival in bronze
(`_ingested_at`, Lesson 26) is January 17th. These being different
is the entire definition of "late."

## Why this breaks a naive gold aggregate

If `gold.daily_revenue` for January 15th was already computed and
published on January 16th (one day after the trip, but one day
*before* this late record actually arrived), that published number
is now **wrong** — it's missing a trip that genuinely belongs to
that date. A pipeline that only ever processes "today's new rows"
and never revisits a past date will never notice or fix this.

## Reprocessing a window

```python
# Recompute gold for a WINDOW of recent dates, not just "today"
affected_dates = spark.sql(
    "SELECT DISTINCT DATE(tpep_pickup_datetime) as trip_date FROM silver.trips WHERE _ingested_at >= current_date() - 3"
)

gold_recompute = (
    spark.table("silver.trips")
    .filter(to_date("tpep_pickup_datetime").isin([row.trip_date for row in affected_dates.collect()]))
    .groupBy("VendorID", to_date("tpep_pickup_datetime").alias("trip_date"))
    .agg(sum("fare_amount").alias("total_revenue"))
)

# MERGE the corrected rows back into gold, replacing just those dates
```

This is Lesson 22's `MERGE` again, doing genuinely different work:
not deduplicating new data, but **correcting** already-published
gold numbers for a recent window of dates, in case anything trickled
in late. A 2-3 day lookback window is common — a practical
compromise between "always correct" and "recompute everything,
forever."

## Why bronze's permanence makes this possible at all

Recall Lesson 26: bronze is append-only and never filters anything
out. Late data is still just another row landing in bronze, on its
own schedule — nothing about the pipeline's design has to change to
"support" late data, because bronze was never assuming perfectly
on-time arrival in the first place. This is the real payoff of that
earlier design decision.

## Key terms

| Term | Meaning |
|---|---|
| Late-arriving data | A row whose real-world timestamp is earlier than its ingestion timestamp, by more than expected |
| Lookback window | Reprocessing a recent range of dates in gold, to catch late corrections |
| Bronze's permanence | What makes reprocessing possible — nothing was ever lost or filtered |

## Check yourself

You're ready for Lesson 36 when you can explain, without looking: why
does a pipeline that only ever processes "today's new rows" fail to
correct for late-arriving data?
