# Lesson 42 — Reading Parquet

**Chapter 4 · PySpark · Lesson 42 of 62**

## What you'll learn

- `spark.read.parquet()` — no `header` or `inferSchema` needed
- Why Parquet already carries its own schema, built in
- Columnar storage — why Parquet reads are often dramatically faster
- Why real NYC Taxi data actually ships as Parquet, not CSV

## Reading Parquet

```python
df = spark.read.parquet("/data/nyc_taxi/yellow_tripdata_2024-01.parquet")
df.show(5)
df.printSchema()
```

No `header=True`, no `inferSchema=True` — because Parquet already
knows exactly what its own columns and types are. That's the biggest
practical difference from Lesson 40's CSV read.

## Schema is built in, not guessed

CSV is just text — Spark has to either guess types (`inferSchema`)
or take everything as a string. Parquet stores its schema directly
inside the file itself, alongside the data. Reading it back means
reading a schema that was already known at write time, not
re-deriving one on every read.

## Columnar storage — why it's often faster

CSV stores data **row by row**: every field of row 1, then every
field of row 2, and so on. Parquet stores data **column by column**:
every value of `fare_amount` together, then every value of
`trip_distance` together.

```python
# This only needs to actually read the fare_amount column off disk —
# Parquet's columnar layout means trip_distance, VendorID, etc.
# never even get touched
df.select("fare_amount").show(5)
```

If you only need a handful of columns out of fifty, Parquet reads
just those columns' bytes off disk. CSV would have to read every row
in full regardless, since a row's fields are stored together.

## Why real taxi data ships as Parquet

This is actually why the NYC TLC switched from CSV to Parquet as its
official trip-data format in 2022 — smaller files, faster reads,
built-in schema. Real-world pipelines default to Parquet for exactly
these reasons, and this course's later Parquet-writing lesson
(Lesson 60) is what actually produces files like this one.

## Key terms

| Term | Meaning |
|---|---|
| `spark.read.parquet()` | Reads a Parquet file — no header/inferSchema flags needed |
| Columnar storage | Data stored column-by-column, so reading fewer columns reads less disk |
| Schema-on-write | Parquet's schema is saved into the file itself at write time |

## Lab

```python
trips = spark.read.parquet("/data/nyc_taxi/yellow_tripdata_2024-01.parquet")
trips.printSchema()
trips.select("VendorID", "fare_amount").show(5)
```

Compare this schema against Lesson 40's inferred CSV schema for the
same data — they should describe the same columns, but this one came
for free, with no guessing pass required.

## Check yourself

You're ready for Lesson 43 when you can explain, without looking: why
is reading just two columns out of fifty faster from a Parquet file
than from a CSV file?
