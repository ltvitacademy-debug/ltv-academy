# Lesson 46 — withColumn()

**Chapter 4 · PySpark · Lesson 46 of 62**

## What you'll learn

- `df.withColumn()` — adding a brand-new column
- Using the same name to overwrite an existing column
- Building an expression out of multiple columns
- Chaining several `withColumn()` calls together

## Adding a new column

```python
from pyspark.sql.functions import col

trips = spark.read.parquet("/data/nyc_taxi/yellow_tripdata_2024-01.parquet")

trips = trips.withColumn("fare_per_mile", col("fare_amount") / col("trip_distance"))
trips.select("fare_amount", "trip_distance", "fare_per_mile").show(5)
```

`withColumn()` takes two arguments: the new column's name, and a
`col()`-based expression describing what to put in it — this is
exactly why Lesson 44 introduced `col()` early, and it applies here
too. Remember Lesson 37: DataFrames are immutable, so this doesn't
modify `trips` in place — it returns a new DataFrame, which is why
the example reassigns `trips = trips.withColumn(...)`.

## Overwriting an existing column

```python
# Round fare_amount to 2 decimal places, keeping the same column name
trips = trips.withColumn("fare_amount", col("fare_amount").cast("decimal(10,2)"))
```

Pass the name of a column that already exists, and `withColumn()`
replaces it instead of adding a new one alongside it. Nothing marks
this as different syntactically — the name you pass is what decides
"add" vs. "replace."

## Building from multiple columns

```python
trips = trips.withColumn(
    "trip_duration_min",
    (col("tpep_dropoff_datetime").cast("long") - col("tpep_pickup_datetime").cast("long")) / 60,
)
```

Any expression built from `col()` references is valid — arithmetic,
comparisons, and (starting in Lesson 47) conditional logic all work
the same way here.

## Chaining calls together

```python
trips = (
    trips
    .withColumn("fare_per_mile", col("fare_amount") / col("trip_distance"))
    .withColumn("is_long_trip", col("trip_distance") > 10)
)
```

Since each `withColumn()` returns a new DataFrame, chaining several
in a row is completely normal — this is the same chaining pattern
Lesson 27's ETL script used with Pandas methods.

## Key terms

| Term | Meaning |
|---|---|
| `df.withColumn()` | Adds a new column, or replaces one with a matching name |
| Immutability | `withColumn()` returns a new DataFrame rather than modifying in place |
| Chaining | Multiple `withColumn()` calls can follow one another directly |

## Lab

```python
trips = trips.withColumn("is_rush_hour", col("tpep_pickup_datetime").cast("long") % 86400 > 57600)
trips.select("tpep_pickup_datetime", "is_rush_hour").show(5)
```

Confirm `is_rush_hour` shows up as a genuine new column of `True`/
`False` values, alongside the original data.

## Check yourself

You're ready for Lesson 47 when you can explain, without looking: what
decides whether `withColumn()` adds a new column versus replacing an
existing one?
