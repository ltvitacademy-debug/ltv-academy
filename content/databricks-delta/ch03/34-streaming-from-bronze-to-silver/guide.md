# Lesson 34 — Streaming from Bronze to Silver

**Chapter 3 · Medallion Architecture · Lesson 34 of 57**

## What you'll learn

- Combining Lesson 27's cleaning logic with Lesson 33's streaming API
- Why `writeStream` can't call `MERGE` directly — and what `foreachBatch` does about it
- The full streaming bronze-to-silver pipeline, end to end
- Why this replaces Lesson 29's scheduled batch job in a genuinely real-time pipeline

## The cleaning logic doesn't change

```python
def clean_batch(micro_batch_df, batch_id):
    cleaned = (
        micro_batch_df
        .withColumn("fare_amount", col("fare_amount").cast("double"))
        .dropDuplicates(["VendorID", "tpep_pickup_datetime"])
        .na.drop(subset=["fare_amount"])
    )

    silver_table = DeltaTable.forName(spark, "silver.trips")
    silver_table.alias("target").merge(
        cleaned.alias("source"),
        "target.VendorID = source.VendorID AND target.tpep_pickup_datetime = source.tpep_pickup_datetime",
    ).whenMatchedUpdateAll().whenNotMatchedInsertAll().execute()
```

This is exactly Lesson 27's cleaning and Lesson 29's `MERGE`
call — nothing new in the logic itself.

## Why writeStream needs foreachBatch for MERGE

```python
bronze_stream = spark.readStream.format("delta").table("bronze.trips")

bronze_stream.writeStream \
    .foreachBatch(clean_batch) \
    .option("checkpointLocation", "/checkpoints/silver_stream") \
    .trigger(availableNow=True) \
    .start()
```

`writeStream` has built-in sinks for simple appends, but `MERGE`
is a table-level SQL/DeltaTable operation, not a streaming sink —
there's no `.mergeStream()` method. `foreachBatch` is the bridge:
it hands each arriving micro-batch to an ordinary Python function
as a regular, static DataFrame, where any normal batch operation
(including `MERGE`) works exactly as it always has.

## The full pipeline, end to end

```
bronze.trips (streaming source, via Autoloader from Lesson 32)
    -> readStream
    -> foreachBatch(clean_batch)   -- Lesson 27's logic + Lesson 22's MERGE
    -> silver.trips (updated continuously)
```

Every piece here is something covered already: Autoloader feeds
bronze, `readStream` treats it as a growing table, `foreachBatch`
bridges back to ordinary batch operations for the actual `MERGE`.

## Why this replaces Lesson 29's scheduled job

Lesson 29's pipeline runs once a day, on a schedule, processing
whatever's accumulated since the last run. This lesson's version
can run continuously (`processingTime`, Lesson 33) or on-demand
(`availableNow`), processing new bronze rows within minutes instead
of waiting for the next day's scheduled run — genuinely real-time,
not just "runs more often."

## Key terms

| Term | Meaning |
|---|---|
| `foreachBatch` | Bridges a streaming write back to ordinary batch operations, per micro-batch |
| Why MERGE needs it | `writeStream` has no built-in merge sink — `foreachBatch` is the workaround |
| Real-time vs. scheduled | Streaming processes new data within minutes, not on the next scheduled run |

## Check yourself

You're ready for Lesson 35 when you can explain, without looking: why
can't `MERGE` be called directly as a `writeStream` sink, and what
does `foreachBatch` do instead?
