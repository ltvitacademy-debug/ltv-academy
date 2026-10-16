# Lesson 45 — PySpark DataFrames: Reading & Transforming Data

**Chapter 8 · PySpark Foundations and Mini Capstone · Lesson 45 of 48**

## What you'll learn

- Reading the taxi zone lookup CSV alongside the trip Parquet file
- `select()`, `filter()`, and `withColumn()` on a Spark DataFrame
- Why column expressions use `col()` instead of plain Python comparisons
- Handling nulls in a Spark DataFrame

## Reading both real files this dataset ships with

```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("TaxiTransform").getOrCreate()

trips = spark.read.parquet("/data/nyc_taxi/yellow_tripdata_2024-01.parquet")
zones = spark.read.csv("/data/nyc_taxi/taxi_zone_lookup.csv", header=True, inferSchema=True)

zones.show(5)
```

```
+------------+-------------+--------------------+------------+
|LocationID  |Borough      |Zone                |service_zone|
+------------+-------------+--------------------+------------+
|1           |EWR          |Newark Airport      |EWR         |
|2           |Queens       |Jamaica Bay         |Boro Zone   |
+------------+-------------+--------------------+------------+
```

`header=True` tells Spark the first row is column names, not data;
`inferSchema=True` has Spark scan the file to guess real types
(`LocationID` as an integer) instead of treating every column as a
string, which is the default without it.

## select() and filter()

```python
from pyspark.sql.functions import col

fares = trips.select("VendorID", "passenger_count", "trip_distance", "fare_amount")

valid_fares = fares.filter(col("fare_amount") > 0)
long_trips = fares.filter((col("trip_distance") > 10) & (col("passenger_count") >= 1))
```

`select()` narrows down to the columns you actually need —
cheaper to work with than carrying every column of the real dataset
through every later step. `filter()` keeps only rows matching a
condition; combining two conditions needs `&` (and `|` for "or"),
not Python's `and`/`or`, because each side is a column expression
being evaluated per-row, not a single boolean value yet.

## Why col() instead of a plain Python comparison

```python
# This works, but is more fragile with compound conditions:
trips.filter(trips.fare_amount > 0)

# This is the more common, more flexible style:
trips.filter(col("fare_amount") > 0)
```

Both reference the same column, but `col("fare_amount")` doesn't tie
the expression to one specific DataFrame variable — useful once
you're combining columns from more than one DataFrame (exactly what
Lesson 46's joins need), where `trips.fare_amount` would only work for
columns that actually belong to `trips`.

## withColumn() — adding or replacing a column

```python
from pyspark.sql.functions import round as spark_round

trips = trips.withColumn("fare_per_mile", spark_round(col("fare_amount") / col("trip_distance"), 2))
trips.select("trip_distance", "fare_amount", "fare_per_mile").show(5)
```

`withColumn()` takes a name and an expression — if the name already
exists it replaces that column, otherwise it adds a new one. This is
the real-world shape of most "transform" logic in a pipeline: deriving
a new, more useful column from ones you already have.

## Handling nulls

```python
trips.filter(col("passenger_count").isNull()).count()

cleaned = trips.na.drop(subset=["passenger_count", "fare_amount"])
filled = trips.na.fill({"passenger_count": 1})
```

Real trip records sometimes have a missing `passenger_count` —
`.isNull()` finds those rows, `na.drop()` removes rows missing a
required field entirely, and `na.fill()` substitutes a reasonable
default instead. Which one is right depends on the field: dropping a
trip with no `fare_amount` makes sense; assuming 1 passenger when it's
missing is often a safer default than throwing the whole row away.

## Key terms

| Term | Meaning |
|---|---|
| `inferSchema=True` | Has Spark scan a CSV to guess real column types instead of treating everything as a string |
| `col("name")` | A flexible column reference, not tied to one specific DataFrame variable |
| `withColumn()` | Adds a new column or replaces an existing one by name |
| `na.drop()` / `na.fill()` | Removes rows with nulls in given columns, or substitutes a default value |

## Lab

```python
cleaned_trips = (
    trips
    .filter(col("fare_amount") > 0)
    .filter(col("trip_distance") > 0)
    .na.drop(subset=["passenger_count"])
    .withColumn("fare_per_mile", spark_round(col("fare_amount") / col("trip_distance"), 2))
)

cleaned_trips.select("VendorID", "trip_distance", "fare_amount", "fare_per_mile").show(10)
print("Rows before:", trips.count(), "Rows after:", cleaned_trips.count())
```

Confirm the row count drops after filtering out invalid fares and
distances, and that `fare_per_mile` looks like a reasonable dollar
amount for every row shown.

## Check yourself

You're ready for Lesson 46 when you can explain, without looking: why
does combining two filter conditions need `&` instead of Python's
`and`, and what's the difference between `na.drop()` and `na.fill()`?
