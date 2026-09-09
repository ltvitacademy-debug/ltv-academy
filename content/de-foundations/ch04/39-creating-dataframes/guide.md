# Lesson 39 — Creating DataFrames

**Chapter 4 · PySpark · Lesson 39 of 62**

## What you'll learn

- Welcome to Chapter 4 — real, hands-on PySpark syntax starts now
- `spark.createDataFrame()` — from a list of tuples, with a schema
- Creating one from a list of dictionaries — Lesson 15's shape, again
- `spark.range()` — a quick numeric DataFrame for testing

## Welcome to Chapter 4

Chapters 1–3 built the concepts. Starting now, every lesson is real
PySpark code, against this course's actual NYC Taxi data, building
toward genuine hands-on fluency.

## From a list of tuples, with an explicit schema

```python
from pyspark.sql import SparkSession
from pyspark.sql.types import StructType, StructField, StringType, DoubleType, IntegerType

spark = SparkSession.builder.appName("Lesson39").getOrCreate()

trips = [
    ("2", 1, 14.50),
    ("1", 3, 9.75),
]

schema = StructType([
    StructField("VendorID", StringType(), True),
    StructField("passenger_count", IntegerType(), True),
    StructField("fare_amount", DoubleType(), True),
])

df = spark.createDataFrame(trips, schema=schema)
df.show()
```

Unlike Lesson 22's `read_csv()`, where Pandas *guesses* types, here
you're stating the schema explicitly — `StringType`, `IntegerType`,
`DoubleType` — which matters more in Spark, where getting a schema
wrong across a genuinely distributed dataset is far more expensive to
discover and fix later.

## From a list of dictionaries — Lesson 15's shape, again

```python
trips_as_dicts = [
    {"VendorID": "2", "passenger_count": 1, "fare_amount": 14.50},
    {"VendorID": "1", "passenger_count": 3, "fare_amount": 9.75},
]

df = spark.createDataFrame(trips_as_dicts)
df.printSchema()   # Spark infers the schema this time
```

Just like Lesson 21's Pandas version, Spark can infer a schema from a
list of dictionaries directly — no `StructType` required, though the
explicit version above stays available whenever inference guesses
wrong.

## spark.range() — for quick tests

```python
df = spark.range(10)          # a DataFrame with one column, "id", 0-9
df.show()
```

Genuinely useful for testing an idea quickly, without needing real data
on hand at all — several labs in this chapter use it for exactly that.

## Key terms

| Term | Meaning |
|---|---|
| `spark.createDataFrame()` | Builds a DataFrame from Python data, with or without an explicit schema |
| `StructType` / `StructField` | How you describe an explicit schema |
| `spark.range()` | A quick, built-in DataFrame of sequential integers |

## Lab

```python
data = [("Yellow", 2024, 1500000), ("Green", 2024, 300000)]
df = spark.createDataFrame(data, ["taxi_type", "year", "trip_count"])
df.show()
df.printSchema()
```

Confirm the schema shows `taxi_type` as a string, `year` and
`trip_count` as integers — all inferred automatically this time, from a
list of column names alone.

## Check yourself

You're ready for Lesson 40 when you can explain, without looking: why
would you want an explicit schema instead of letting Spark infer one?
