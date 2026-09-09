# Lesson 36 — SparkSession

**Chapter 3 · Apache Spark Fundamentals · Lesson 36 of 62**

## What you'll learn

- What `SparkSession` actually is — the real entry point for every
  PySpark line you'll write in Chapter 4
- How to create one
- What it gives you access to
- A brief, honest history: why you may see `SparkContext` in older code

## Creating a SparkSession

```python
from pyspark.sql import SparkSession

spark = (
    SparkSession.builder
    .appName("NYCTaxiCleaning")
    .getOrCreate()
)
```

`spark` is now your handle to everything: reading data, running SQL,
configuring the session. `.getOrCreate()` either creates a brand new
session or reuses one that already exists — safe to call more than once
without accidentally creating duplicate sessions.

## What it actually gives you access to

```python
df = spark.read.parquet("cleansed/yellow_tripdata_2024-01.parquet")

df.createOrReplaceTempView("trips")
result = spark.sql("SELECT VendorID, COUNT(*) FROM trips GROUP BY VendorID")
```

`spark.read` (Lessons 40–42) is how you load files as DataFrames;
`spark.sql()` (Lesson 38) lets you write actual SQL against a DataFrame
once it's registered as a temporary view. Both come from the same
`spark` object — the `SparkSession` is genuinely the one thing
everything else in Chapter 4 hangs off of.

## Where SparkContext fits — a brief history

Lesson 30's real Apache Spark diagram showed `SparkContext` living
inside the Driver Program — and that's accurate, but slightly
old-fashioned. Early Spark had **three separate entry points**:
`SparkContext` for core operations, `SQLContext` for SQL, and
`HiveContext` for Hive integration. Modern Spark (2.0 onward — which is
everything you'll use) unified all three into a single `SparkSession`.
You can still access the underlying `SparkContext` via `spark.sparkContext`
if something genuinely low-level needs it, but for everything in this
course, `SparkSession` is the only entry point you actually need.

## Key terms

| Term | Meaning |
|---|---|
| `SparkSession` | The unified entry point for reading data, running SQL, and configuring Spark |
| `.getOrCreate()` | Creates a new session, or reuses an existing one safely |
| `SparkContext` | The older, lower-level entry point, unified into SparkSession since Spark 2.0 |

## Lab

```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("Lesson36Lab").getOrCreate()
print(spark.version)
print(type(spark))
```

Confirm this runs without error and prints a real Spark version number.

## Check yourself

You're ready for Lesson 37 when you can explain, without looking: what
does `SparkSession` unify, and what two things does the `spark` object
give you direct access to?
