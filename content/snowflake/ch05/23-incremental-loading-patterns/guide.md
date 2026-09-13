# Lesson 23 — Incremental Loading Patterns

**Chapter 5 · Data Transformation / ELT · Lesson 23 of 60**

## What you'll learn

- Why rebuilding an entire table on every run stops working as data volume grows
- The watermark (high-water-mark) pattern for tracking "what's already been processed"
- Using `MERGE` — which you already know from T-SQL — to apply only the new or changed rows
- Why Snowflake Streams (Chapter 8) eventually replace hand-rolled watermark tracking

## Why "rebuild everything" stops scaling

Lesson 22's `CREATE OR REPLACE TABLE ... AS SELECT` rebuilds the whole
table from the layer beneath it, every run. That's fine at small
volume. It stops being fine once the source table has years of
history and only a few thousand rows changed since yesterday —
re-scanning and re-transforming everything, every run, wastes compute
for no benefit. Incremental loading processes **only what's new or
changed**.

## The watermark pattern

A watermark (or "high-water mark") is simply the highest value of some
ever-increasing column — usually a timestamp or an identity/sequence
column — that's already been processed. Track it in a small table:

```sql
CREATE TABLE IF NOT EXISTS staging.load_watermarks (
    source_table   VARCHAR,
    last_loaded_ts TIMESTAMP_NTZ
);
```

Each run reads the current watermark, pulls only rows newer than it,
and then advances the watermark to the new maximum:

```sql
-- 1. Read the current watermark
SELECT last_loaded_ts FROM staging.load_watermarks
WHERE source_table = 'orders';

-- 2. Pull only what's new (watermark substituted in by your pipeline)
SELECT * FROM raw.orders
WHERE loaded_at > :last_loaded_ts;
```

## Applying the new rows with MERGE

You already know `MERGE` from T-SQL — the syntax is close enough that
it reads the same way here. `MERGE` is what actually applies an
incremental batch: update rows that changed, insert rows that are
brand new, all in one statement:

```sql
MERGE INTO staging.orders_cleaned AS tgt
USING (
    SELECT * FROM raw.orders
    WHERE loaded_at > (
        SELECT last_loaded_ts FROM staging.load_watermarks
        WHERE source_table = 'orders'
    )
) AS src
ON tgt.order_id = src.order_id
WHEN MATCHED THEN UPDATE SET
    tgt.order_total = src.order_total,
    tgt.order_ts    = src.order_ts
WHEN NOT MATCHED THEN INSERT (order_id, customer_id, order_total, order_ts)
    VALUES (src.order_id, src.customer_id, src.order_total, src.order_ts);
```

Then advance the watermark so the next run doesn't reprocess the same
rows:

```sql
UPDATE staging.load_watermarks
SET last_loaded_ts = (SELECT MAX(loaded_at) FROM raw.orders)
WHERE source_table = 'orders';
```

## Where this is headed: Streams

Hand-rolled watermark tracking works, and it's worth understanding
because it's what's actually happening under the hood — but it's easy
to get wrong (forgetting to advance the watermark, race conditions
between concurrent loads). Chapter 8 introduces **Streams**, a native
Snowflake object that tracks exactly which rows changed since the last
time you consumed it, removing the need to maintain a watermark table
by hand. Everything you're learning here about *why* incremental
processing matters still applies — Streams just automate the
bookkeeping.

## Key terms

| Term | Meaning |
|---|---|
| Watermark / high-water mark | The highest already-processed value of an ever-increasing column, tracked to know what's new |
| Incremental load | Processing only new or changed rows since the last run, instead of the whole table |
| `MERGE` | Applies inserts and updates from a batch in one statement — same idea as T-SQL's `MERGE` |
| Stream (preview) | A native Snowflake object that tracks row-level changes automatically — full coverage in Chapter 8 |

## Lab

1. Create a `load_watermarks` table and seed it with an old timestamp
   for one of your raw tables from an earlier lab.
2. Write a `MERGE` statement that pulls only rows newer than the
   watermark from the raw table into a staging table.
3. Advance the watermark, then rerun the whole sequence and confirm no
   rows are reprocessed the second time.

## Check yourself

You're ready for Lesson 24 when you can explain what a watermark
tracks, and why forgetting to advance it after a load is a bug that
silently reprocesses the same rows forever.
