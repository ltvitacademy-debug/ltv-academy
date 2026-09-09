# Lesson 26 — The Bronze Layer — Raw Ingestion

**Chapter 3 · Medallion Architecture · Lesson 26 of 57**

## What you'll learn

- What "raw" actually means in practice: minimal transformation, on purpose
- Adding metadata columns — tracking where and when a row arrived
- Why bronze keeps "bad" rows instead of filtering them out
- Bronze as a real Delta table, append-only

## Minimal transformation, on purpose

```python
raw_trips = spark.read.csv(
    "/data/nyc_taxi/incoming/yellow_tripdata_2024-01.csv",
    header=True,
)  # deliberately NO inferSchema, NO casting, NO filtering yet

raw_trips.write.format("delta").mode("append").saveAsTable("bronze.trips")
```

This looks almost like Foundations Lesson 40's CSV read, except
deliberately without `inferSchema` — bronze wants the data exactly
as it arrived, strings and all. Any cleaning or casting belongs to
silver (Lesson 27), not here. The one new thing versus Foundations:
`saveAsTable()` (Lesson 16), writing straight into a real,
persistent, named Delta table.

## Metadata columns — tracking provenance

```python
from pyspark.sql.functions import current_timestamp, lit

raw_trips = raw_trips \
    .withColumn("_ingested_at", current_timestamp()) \
    .withColumn("_source_file", lit("yellow_tripdata_2024-01.csv"))
```

Two columns, added with `withColumn()` (Foundations Lesson 46),
record **when** and **from where** each row arrived. Neither exists
in the original source data — they're bronze's own bookkeeping,
letting anyone later ask "which ingestion run produced this row?"
without guessing.

## Why bronze keeps "bad" rows

If a row has a malformed value, an unexpected null, or looks
obviously wrong, bronze still keeps it — filtering happens at silver
(Lesson 27), not here. This is deliberate: if silver's cleaning
logic turns out to have a bug discovered next week, bronze still has
the original row, unmodified, to reprocess from. Filter too early,
and that row is gone for good, with no way back.

## Bronze is append-only, in practice

```python
raw_trips.write.format("delta").mode("append").saveAsTable("bronze.trips")
```

`mode("append")` (Foundations Lesson 60, Lesson 16 of this course)
is bronze's normal write mode — every new batch of source data adds
more rows, never overwrites what's already there. This is what
makes bronze a genuine, permanent record rather than a snapshot that
gets replaced.

## Key terms

| Term | Meaning |
|---|---|
| Bronze | Raw data, minimally transformed, append-only |
| Metadata columns | Added columns tracking ingestion time/source, not part of the original data |
| `mode("append")` | Bronze's normal write mode — accumulate, never overwrite |

## Check yourself

You're ready for Lesson 27 when you can explain, without looking: why
does bronze deliberately keep rows that look obviously wrong, rather
than filtering them out immediately?
