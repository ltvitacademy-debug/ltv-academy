# Lesson 57 — Window Functions

**Chapter 4 · PySpark · Lesson 57 of 62**

## What you'll learn

- The problem `groupBy()` can't solve: keeping every row, while still comparing it to its group
- `Window.partitionBy().orderBy()` — defining the "neighborhood" for each row
- `row_number()` — ranking rows within a window
- Solving Lesson 52's "which row survives" problem, properly

## The problem groupBy() can't solve

Lesson 53's `groupBy()` collapses many rows into one row per group —
that's the whole point of it. But sometimes you want the opposite:
keep every individual row, while still comparing it against others
in its group. "Rank this trip's fare against every other trip by
the same vendor, but don't lose any trips" is exactly this shape of
problem, and it's what window functions solve.

## Defining a window

```python
from pyspark.sql.window import Window
from pyspark.sql.functions import row_number, col

trips = spark.read.parquet("/data/nyc_taxi/yellow_tripdata_2024-01.parquet")

vendor_window = Window.partitionBy("VendorID").orderBy(col("fare_amount").desc())
```

`partitionBy()` here plays the same role `groupBy()`'s columns
did — it defines the groups. `orderBy()` decides the order *within*
each group. Together they describe a "neighborhood" for every row,
without actually collapsing anything yet.

## row_number() — ranking within the window

```python
trips = trips.withColumn("fare_rank", row_number().over(vendor_window))
trips.select("VendorID", "fare_amount", "fare_rank").show(10)
```

`row_number()` numbers each row 1, 2, 3... within its own partition,
in the order `orderBy()` specified — the highest fare per `VendorID`
gets rank 1. Note the `.over(vendor_window)` — this is what tells
Spark to apply the ranking per-window instead of across the whole
DataFrame.

## Solving Lesson 52's problem properly

```python
dedup_window = Window.partitionBy("VendorID", "tpep_pickup_datetime").orderBy(col("fare_amount").desc())
ranked = trips.withColumn("rn", row_number().over(dedup_window))
deduped = ranked.filter(col("rn") == 1).drop("rn")
```

Lesson 52 flagged that `dropDuplicates()` keeps an arbitrary row when
there's a tie. This is the actual fix: rank the duplicates by
whichever column decides which one should survive (here,
`fare_amount`, most-recent-first, or anything else), then keep only
`rn == 1`.

## Key terms

| Term | Meaning |
|---|---|
| `Window.partitionBy().orderBy()` | Defines a per-row "neighborhood": which group, and what order within it |
| `row_number().over(window)` | Numbers rows within their partition, per the window's order |
| Window vs. groupBy | groupBy collapses rows; a window keeps every row while still ranking/comparing |

## Lab

```python
w = Window.partitionBy("passenger_count").orderBy(col("trip_distance").desc())
trips.withColumn("distance_rank", row_number().over(w)).filter(
    col("distance_rank") <= 3
).select("passenger_count", "trip_distance", "distance_rank").show(15)
```

Confirm you get the top 3 longest trips *per* `passenger_count`
group, with every other row still intact elsewhere in the
DataFrame.

## Check yourself

You're ready for Lesson 58 when you can explain, without looking: how
does a window function differ from `groupBy()` in terms of which rows
survive in the result?
