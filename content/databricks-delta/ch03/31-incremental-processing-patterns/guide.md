# Lesson 31 — Incremental Processing Patterns

**Chapter 3 · Medallion Architecture · Lesson 31 of 57**

## What you'll learn

- Full reprocessing vs. incremental processing — the real tradeoff
- The watermark pattern: tracking "what's already been processed"
- Reading Delta's own change history to find exactly what's new
- Why this chapter is about to shift from batch to streaming

## Two ways to process new data

**Full reprocessing** reads and transforms the entire bronze table
every run — simple, always correct, but genuinely wasteful once
bronze has millions of historical rows and only a few thousand new
ones each day. **Incremental processing** reads only what's actually
new since last time — faster, cheaper, but requires actually
knowing what "new" means.

## The watermark pattern

```python
last_processed = spark.sql(
    "SELECT MAX(_ingested_at) FROM silver.trips"
).collect()[0][0]

new_rows = spark.table("bronze.trips").filter(col("_ingested_at") > last_processed)
```

A **watermark** is a stored value — here, the latest timestamp
already processed — used to filter for only what's newer.
Lesson 26's `_ingested_at` metadata column exists specifically to
make this possible; without it, there'd be no reliable way to tell
old bronze rows from new ones at all.

## Reading Delta's own change history

```python
changes = spark.read.format("delta") \
    .option("readChangeFeed", "true") \
    .option("startingVersion", 5) \
    .table("bronze.trips")
```

**Change Data Feed** (CDF) is a Delta-specific alternative to a
manual watermark: rather than filtering by a timestamp column you
maintain yourself, Delta tracks exactly which rows were inserted,
updated, or deleted between two versions, directly from the
transaction log Lesson 17 introduced. This must be explicitly
enabled per table (`TBLPROPERTIES (delta.enableChangeDataFeed =
true)`), but once on, it's a more precise incremental signal than a
watermark column ever can be.

## Where this chapter is heading

Both patterns here still assume "run a batch job periodically."
Lessons 32–34 introduce **Autoloader** and **Structured Streaming**:
processing new files as they arrive, continuously, rather than in
scheduled batches at all — the natural next step once "process only
what's new" becomes the actual goal.

## Key terms

| Term | Meaning |
|---|---|
| Watermark | A stored value marking what's already processed, used to filter for new data |
| Change Data Feed | Delta's own row-level insert/update/delete tracking, via the transaction log |
| Full vs. incremental | Simple-but-wasteful vs. efficient-but-requires-tracking "new" |

## Check yourself

You're ready for Lesson 32 when you can explain, without looking: why
does Lesson 26's `_ingested_at` metadata column matter for the
watermark pattern specifically?
