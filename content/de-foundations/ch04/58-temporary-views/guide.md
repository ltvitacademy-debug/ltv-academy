# Lesson 58 — Temporary Views

**Chapter 4 · PySpark · Lesson 58 of 62**

## What you'll learn

- `createOrReplaceTempView()` — giving a DataFrame a name SQL can reference
- Why a temp view isn't a copy of the data — it's just a name
- The lifetime of a temp view: tied to the SparkSession
- Setting up for Lesson 59's real Spark SQL queries

## Naming a DataFrame for SQL

```python
trips = spark.read.parquet("/data/nyc_taxi/yellow_tripdata_2024-01.parquet")

trips.createOrReplaceTempView("trips")
```

This doesn't copy or move any data — it registers the name `"trips"`
as something Spark SQL can reference, pointing at the exact same
underlying DataFrame. Nothing about `trips` itself changes; you've
just given Spark a name to call it by in SQL.

## Why "createOrReplace"

Calling it again with the same name — say, after building a cleaned
version of `trips` through several of this chapter's earlier
lessons — replaces the old registration, no error, no duplicate. This
is genuinely convenient during iterative development: rerun a cell
with a slightly different DataFrame, re-register under the same
name, and every SQL query written against it picks up the change
automatically.

## The lifetime of a temp view

A temp view lives only as long as the `SparkSession` that created
it — it's not saved to disk, not visible to another Spark
application, and disappears the moment the session ends. This is
completely unlike a real database table (Lesson 8's Delta/managed
tables, covered properly in the next course); a temp view is a
convenience for querying data you already have loaded, not a way to
persist anything.

## Why this matters — setting up for real SQL

```python
result = spark.sql("SELECT VendorID, COUNT(*) AS trip_count FROM trips GROUP BY VendorID")
result.show()
```

This is a preview of exactly what Lesson 59 formalizes:
`createOrReplaceTempView()` is the one-time setup step that makes a
DataFrame queryable this way at all. Without registering it first,
`spark.sql()` has no `trips` to find.

## Key terms

| Term | Meaning |
|---|---|
| `createOrReplaceTempView()` | Registers a DataFrame under a name Spark SQL can query |
| Temp view lifetime | Tied to the current `SparkSession` — not saved, not shared |
| `spark.sql()` | Runs a SQL string against registered views (Lesson 59) |

## Lab

```python
trips.createOrReplaceTempView("trips")
zones_df = spark.read.csv("/data/nyc_taxi/taxi_zone_lookup.csv", header=True)
zones_df.createOrReplaceTempView("zones")

spark.sql("SELECT * FROM trips LIMIT 5").show()
```

Confirm both views are queryable, and that this is the exact same
underlying data as the `trips`/`zones_df` DataFrames — just newly
nameable in SQL.

## Check yourself

You're ready for Lesson 59 when you can explain, without looking: does
`createOrReplaceTempView()` copy the DataFrame's data anywhere?
