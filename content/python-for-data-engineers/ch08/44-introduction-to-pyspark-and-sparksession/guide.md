# Lesson 44 — Introduction to PySpark & SparkSession

**Chapter 8 · PySpark Foundations and Mini Capstone · Lesson 44 of 48**

## What you'll learn

- Why pandas isn't the right tool once data gets big enough
- `SparkSession` — the entry point to everything PySpark does
- Reading the real NYC Taxi dataset into a Spark DataFrame
- Why Spark delays work until you actually ask to see a result

## Why not just use pandas for everything

Chapter 4 built real comfort with pandas, and for data that fits
comfortably in memory on one machine, pandas is still the right
choice. But a single month of NYC Taxi trip records is already
millions of rows, and a real production dataset is often many months
or years of that — at some point it stops fitting in one machine's
memory, and the work needs to be split across multiple machines (or
multiple CPU cores, at minimum). That's exactly the problem Spark
solves, and PySpark is Python's interface to it.

## SparkSession — where every PySpark script starts

```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("NYCTaxiExploration").getOrCreate()
```

Every single thing PySpark does — reading a file, building a
DataFrame, running a query — happens through this `spark` object.
`appName()` just labels the job for Spark's own logs and monitoring
UI; `getOrCreate()` reuses an existing session if one's already
running instead of starting a second one needlessly.

## Reading the real NYC Taxi dataset

```python
trips = spark.read.parquet("/data/nyc_taxi/yellow_tripdata_2024-01.parquet")
trips.printSchema()
trips.show(5)
```

```
root
 |-- VendorID: integer (nullable = true)
 |-- tpep_pickup_datetime: timestamp (nullable = true)
 |-- tpep_dropoff_datetime: timestamp (nullable = true)
 |-- passenger_count: double (nullable = true)
 |-- trip_distance: double (nullable = true)
 |-- PULocationID: integer (nullable = true)
 |-- DOLocationID: integer (nullable = true)
 |-- fare_amount: double (nullable = true)
```

This is the same real, public NYC Taxi & Limousine Commission trip
record dataset used throughout the Data Engineering Foundations
course's PySpark chapter — one real month of yellow cab trips, with
`VendorID`, pickup/dropoff location IDs, `trip_distance`, and
`fare_amount` among its real columns. `printSchema()` is the PySpark
equivalent of pandas' `df.dtypes` — a quick look at every column's
name and type before doing anything else with it.

## Spark delays work — transformations vs. actions

```python
filtered = trips.filter(trips.fare_amount > 0)   # nothing actually runs yet
grouped = filtered.groupBy("VendorID")             # still nothing runs

grouped.count().show()                             # THIS is what triggers the work
```

`filter()` and `groupBy()` are **transformations** — Spark just
records what you asked for, without doing it yet. `.show()`,
`.count()`, and `.collect()` are **actions** — these are what
actually trigger Spark to read the data and run the recorded steps.
This "lazy evaluation" lets Spark look at the *whole* chain of steps
first and plan an efficient way to execute them together, rather than
running each line immediately the way pandas does.

## Key terms

| Term | Meaning |
|---|---|
| `SparkSession` | The entry point for every PySpark operation in a script |
| `spark.read.parquet()` | Reads a Parquet file (or folder of them) into a Spark DataFrame |
| Transformation | A recorded step (`filter`, `groupBy`, ...) that doesn't run immediately |
| Action | A call (`.show()`, `.count()`, `.collect()`) that triggers Spark to actually execute |

## Lab

```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("TaxiLab").getOrCreate()

trips = spark.read.parquet("/data/nyc_taxi/yellow_tripdata_2024-01.parquet")
print("Total rows:", trips.count())
trips.select("VendorID", "passenger_count", "trip_distance", "fare_amount").show(5)
```

Confirm `trips.count()` (an action) is what actually triggers Spark
to read the file, and that the schema's real column names match what
`printSchema()` showed.

## Check yourself

You're ready for Lesson 45 when you can explain, without looking: what
is the difference between a transformation and an action in PySpark,
and why does that distinction matter for when work actually runs?
