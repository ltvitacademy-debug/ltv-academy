# Lesson 10 — Auto Loader + Structured Streaming

**Chapter 2 · Auto Loader & Ingestion at Scale · Lesson 10 of 34**

## What you'll learn

- A fast recap: Lessons 32/33 already wired `cloudFiles` into a `writeStream` once
- Running continuously with `processingTime`, not just `availableNow`
- `foreachBatch` — custom logic per micro-batch, including multiple sinks
- Watching a running stream: `query.status` and `query.lastProgress`

## The recap

Lesson 32 already showed `spark.readStream.format("cloudFiles")`
piped into `writeStream` with `trigger(availableNow=True)`, and
Lesson 33 covered `readStream`/`writeStream` and triggers generally.
That combination runs once against whatever's currently new, then
stops — correct for a scheduled job. This lesson is what changes
when the pipeline needs to run continuously, or do more than one
thing per batch.

## Running continuously

```python
(spark.readStream.format("cloudFiles")
 .option("cloudFiles.format", "json")
 .option("cloudFiles.schemaLocation", "/Volumes/nyc_taxi/bronze/checkpoints/orders_schema")
 .load("/Volumes/nyc_taxi/bronze/raw_files/")
 .writeStream
 .option("checkpointLocation", "/Volumes/nyc_taxi/bronze/checkpoints/orders_stream")
 .trigger(processingTime="30 seconds")
 .toTable("nyc_taxi.bronze.orders"))
```

Swapping `trigger(availableNow=True)` for
`trigger(processingTime="30 seconds")` is the real difference between
a scheduled catch-up job and an always-on pipeline: the stream never
stops, checking for new files on a fixed interval indefinitely,
which is what a genuinely continuous ingestion pipeline (as opposed
to Lesson 32's one-shot job) actually runs as.

## `foreachBatch` — more than one sink per micro-batch

```python
def write_both(batch_df, batch_id):
    batch_df.write.mode("append").saveAsTable("nyc_taxi.bronze.orders")
    batch_df.filter("amount > 10000").write.mode("append") \
        .saveAsTable("nyc_taxi.bronze.orders_flagged")

(stream_df.writeStream
 .option("checkpointLocation", "/Volumes/nyc_taxi/bronze/checkpoints/orders_stream")
 .trigger(processingTime="30 seconds")
 .foreachBatch(write_both)
 .start())
```

Neither Lesson 32 nor Lesson 33 needed more than a single `toTable`
sink. `foreachBatch` hands each micro-batch to ordinary batch-DataFrame
code — anything Spark can express, including writing to more than one
table, from a single Auto Loader stream.

## Watching a running stream

```python
query = stream_df.writeStream.trigger(processingTime="30 seconds") \
    .toTable("nyc_taxi.bronze.orders")

query.status                # {'message': 'Processing new data', 'isDataAvailable': True, ...}
query.lastProgress["numInputRows"]   # rows processed in the most recent micro-batch
```

An `availableNow` job finishes and you check the table. A continuous
stream doesn't finish — `query.status` and `query.lastProgress` are
the real way to confirm it's actually healthy and keeping up, not
stalled, without stopping it to look.

## The same API, a different source

This course's Kafka course (Lesson 26, "Kafka + Snowflake &
Databricks") uses this exact `readStream`/`writeStream` combination
against `format("kafka")` instead of `format("cloudFiles")` — same
triggers, same `foreachBatch`, same `query.status`. Auto Loader and
Kafka are both just sources plugged into the identical Structured
Streaming engine; everything this lesson covers about running
continuously, fanning out with `foreachBatch`, and monitoring a
running query applies whether the source is a folder of files or a
live Kafka topic.

## Key terms

| Term | Meaning |
|---|---|
| `trigger(processingTime=...)` | Runs indefinitely, checking on a fixed interval — a genuinely continuous pipeline |
| `foreachBatch` | Custom per-micro-batch logic, including writing to more than one sink |
| `query.status` / `query.lastProgress` | Inspecting a running stream's health without stopping it |

## Check yourself

You're ready for Lesson 11 when you can explain, without looking: what
does `foreachBatch` let a single Auto Loader stream do that a plain
`toTable` sink can't?
