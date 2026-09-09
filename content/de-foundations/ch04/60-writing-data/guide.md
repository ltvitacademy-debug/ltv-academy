# Lesson 60 — Writing Data

**Chapter 4 · PySpark · Lesson 60 of 62**

## What you'll learn

- `df.write.parquet()` — saving a DataFrame back out
- Why the "file" you get is actually a folder of many part-files
- `mode="overwrite"` vs. the default, which errors on an existing path
- Writing CSV and JSON too, with the same `.write` pattern

## Writing Parquet

```python
cleaned_trips = trips.filter(col("fare_amount") > 0).na.drop(subset=["passenger_count"])

cleaned_trips.write.parquet("/data/nyc_taxi/cleaned/yellow_tripdata_2024-01")
```

This is the natural endpoint of everything this chapter has built:
read, clean, transform, and now save the result somewhere reusable —
Lesson 42 explained why Parquet is the real default choice for this.

## Why you get a folder, not one file

```
/data/nyc_taxi/cleaned/yellow_tripdata_2024-01/
    part-00000-....parquet
    part-00001-....parquet
    part-00002-....parquet
    _SUCCESS
```

Remember Lesson 32: Spark distributes work across multiple
partitions, and every partition writes its own file independently,
in parallel — that's the whole point of distributed computing.
"One file" was never really the model; `_SUCCESS` is just a marker
confirming the whole write completed without errors.

## Overwrite mode

```python
cleaned_trips.write.mode("overwrite").parquet("/data/nyc_taxi/cleaned/yellow_tripdata_2024-01")
```

Without `mode("overwrite")`, writing to a path that already exists
raises an error by default — Spark refuses to silently clobber
existing output. `"overwrite"` replaces it deliberately;
`"append"` (covered briefly, used less often here) adds new files
alongside the existing ones instead.

## The same pattern for CSV and JSON

```python
cleaned_trips.write.mode("overwrite").csv("/data/nyc_taxi/cleaned/trips.csv", header=True)
cleaned_trips.write.mode("overwrite").json("/data/nyc_taxi/cleaned/trips.json")
```

Same `.write` object, same `mode()`, just a different terminal
method — this mirrors `spark.read.csv()`/`.json()`/`.parquet()`
from Lessons 40-42 exactly, just in reverse.

## Key terms

| Term | Meaning |
|---|---|
| `df.write.parquet()` | Saves a DataFrame as Parquet, one file per partition |
| `_SUCCESS` | A marker file confirming the entire write completed |
| `mode("overwrite")` | Replaces existing output instead of erroring |

## Lab

```python
result = trips.groupBy("VendorID").agg(avg("fare_amount").alias("avg_fare"))
result.write.mode("overwrite").parquet("/data/nyc_taxi/output/vendor_avg_fares")
```

Confirm the write succeeds, and that the output path contains
multiple part-files plus a `_SUCCESS` marker, not one single file.

## Check yourself

You're ready for Lesson 61 when you can explain, without looking: why
does writing a DataFrame produce a folder of multiple files instead
of one single file?
