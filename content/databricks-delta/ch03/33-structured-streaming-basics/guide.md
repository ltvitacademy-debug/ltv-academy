# Lesson 33 — Structured Streaming Basics

**Chapter 3 · Medallion Architecture · Lesson 33 of 57**

## What you'll learn

- The core idea: an "unbounded table," growing forever, one micro-batch at a time
- `readStream`/`writeStream` — the same DataFrame API, just continuous
- Triggers — how often a stream actually checks for new data
- Why almost every DataFrame method from Foundations still applies

## The core idea: an unbounded table

Structured Streaming's central concept: treat a continuously
arriving data source as if it were a table that just keeps growing,
one **micro-batch** of new rows at a time. This isn't a different
API bolted onto DataFrames — it's the exact same DataFrame concept
from Foundations' Chapter 4, just fed continuously instead of once.

## readStream / writeStream — the same DataFrame API, continuous

```python
stream_df = spark.readStream.format("delta").table("bronze.trips")

# Nearly all of Foundations' Chapter 4 still applies:
filtered = stream_df.filter(col("fare_amount") > 0)

filtered.writeStream \
    .format("delta") \
    .option("checkpointLocation", "/checkpoints/silver_stream") \
    .trigger(processingTime="1 minute") \
    .toTable("silver.trips")
```

`spark.readStream` instead of `spark.read` — that's structurally
almost the whole difference. `.filter()` (Foundations Lesson 45)
works exactly the same on a streaming DataFrame as a batch one.

## Triggers — how often the stream checks

```python
.trigger(processingTime="1 minute")   # check for new data every minute, continuously
.trigger(availableNow=True)            # process everything currently available, once, then stop
.trigger(once=True)                    # older syntax, same idea as availableNow
```

`processingTime` runs forever, checking on a fixed interval — a
genuine "always on" pipeline. `availableNow` (Lesson 32's Autoloader
trigger) is what makes streaming syntax fit neatly into a scheduled
job (Lesson 11) instead: process what's there right now, then stop,
rather than running indefinitely.

## What still applies, and what's genuinely new

`select`, `filter`, `withColumn`, `groupBy` — all of Foundations'
Chapter 4 DataFrame methods work on a streaming DataFrame
essentially unchanged. What's genuinely new is the **checkpoint**
(tracking progress across restarts, the same underlying idea as
Autoloader's) and the **trigger** (how often to check) — the only
concepts streaming actually adds on top of everything already
known.

## Key terms

| Term | Meaning |
|---|---|
| Micro-batch | A small batch of new rows, processed at each trigger interval |
| `readStream` / `writeStream` | Structured Streaming's entry points — same DataFrame API otherwise |
| Trigger | Controls how often (or how many times) a stream checks for new data |

## Check yourself

You're ready for Lesson 34 when you can explain, without looking: what
does `trigger(availableNow=True)` let a streaming pipeline do that
`processingTime` doesn't?
