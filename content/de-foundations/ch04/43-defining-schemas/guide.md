# Lesson 43 — Defining Schemas

**Chapter 4 · PySpark · Lesson 43 of 62**

## What you'll learn

- Writing a full `StructType` schema by hand
- Passing it to `spark.read.csv(..., schema=...)` — no inferSchema needed
- The PySpark type classes: `StringType`, `IntegerType`, `DoubleType`, `TimestampType`, `BooleanType`
- `nullable=True/False` — what it actually enforces

## Why write a schema by hand at all

Lesson 40 showed `inferSchema=True` costs a full extra read pass over
the file. On a real production file — potentially millions of rows —
that's real time and real cost, every single run. An explicit schema
skips the guessing entirely: Spark already knows the types before it
reads a single row.

## Building the schema

```python
from pyspark.sql.types import (
    StructType, StructField,
    StringType, IntegerType, DoubleType, TimestampType, BooleanType,
)

taxi_schema = StructType([
    StructField("VendorID", StringType(), True),
    StructField("tpep_pickup_datetime", TimestampType(), True),
    StructField("tpep_dropoff_datetime", TimestampType(), True),
    StructField("passenger_count", IntegerType(), True),
    StructField("trip_distance", DoubleType(), True),
    StructField("fare_amount", DoubleType(), True),
    StructField("store_and_fwd_flag", BooleanType(), True),
])
```

Each `StructField` takes three things: the column name, the type
class (called, not just named — note the `()`), and whether nulls are
allowed.

## Using it — no inferSchema needed

```python
df = spark.read.csv(
    "/data/nyc_taxi/yellow_tripdata_2024-01.csv",
    header=True,
    schema=taxi_schema,
)

df.printSchema()   # exactly matches taxi_schema, instantly, no guessing pass
```

`schema=` and `inferSchema=True` are mutually exclusive in practice —
once you supply a schema, Spark trusts it completely rather than
inspecting the data.

## What nullable actually enforces

```python
StructField("passenger_count", IntegerType(), False)  # NOT nullable
```

Setting `nullable=False` does **not** make Spark validate every row
and reject nulls on read — Spark mostly treats it as a hint for
downstream optimizations. If the actual data does contain a null in
that column, Spark will generally still load it; the mismatch shows
up later, as a bug, not an upfront error. Real validation belongs in
Lesson 51 (Null Handling) — this flag is a signal, not a guardrail.

## Key terms

| Term | Meaning |
|---|---|
| `StructType` | The full schema — a list of `StructField`s |
| `StructField` | One column: name, type, nullable flag |
| `nullable` | A hint for Spark's optimizer, not an enforced constraint on read |

## Lab

```python
zone_schema = StructType([
    StructField("LocationID", IntegerType(), False),
    StructField("Borough", StringType(), True),
    StructField("Zone", StringType(), True),
])

zones = spark.read.csv("/data/nyc_taxi/taxi_zone_lookup.csv", header=True, schema=zone_schema)
zones.printSchema()
```

Confirm the printed schema shows exactly the three fields you wrote,
in that order, with no guessing pass in between.

## Check yourself

You're ready for Lesson 44 when you can explain, without looking:
does setting `nullable=False` guarantee Spark will reject a null value
in that column?
