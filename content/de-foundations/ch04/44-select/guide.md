# Lesson 44 — select()

**Chapter 4 · PySpark · Lesson 44 of 62**

## What you'll learn

- `df.select()` — choosing exactly the columns you want
- Column names as strings vs. `df.col_name` / `col()` — three ways to write the same thing
- Renaming a selected column with `.alias()`
- Why `select()` is a transformation, not an action (callback to Lesson 34)

## Choosing columns

```python
trips = spark.read.parquet("/data/nyc_taxi/yellow_tripdata_2024-01.parquet")

fares = trips.select("VendorID", "fare_amount", "trip_distance")
fares.show(5)
```

This is the PySpark equivalent of Lesson 24's Pandas
`df[["fare_amount", "trip_distance"]]` — same idea, different
syntax. And per Lesson 42, since the source is Parquet, this
actually reads less off disk than pulling every column would.

## Three ways to reference the same column

```python
from pyspark.sql.functions import col

trips.select("fare_amount")            # plain string
trips.select(trips.fare_amount)        # dot notation
trips.select(col("fare_amount"))       # the col() function
```

All three produce the same result here. The string form is simplest
for a plain column reference — but `col()` becomes necessary the
moment you want to *do* something to the column (Lesson 46's
`withColumn()` and Lesson 47's `when()` both rely on it), so it's
worth getting comfortable with now.

## Renaming with alias()

```python
trips.select(
    col("fare_amount").alias("fare"),
    col("trip_distance").alias("distance_miles"),
).show(5)
```

`.alias()` only works on a `col()`-style reference, not on a plain
string — which is one more reason `col()` earns its place early.

## Still just a transformation

```python
fares = trips.select("fare_amount")   # nothing has run yet
fares.show(5)                          # THIS triggers the actual read
```

Straight back to Lesson 34: `select()` builds a plan, it doesn't
execute anything. Only an action like `.show()` or `.count()`
actually runs it.

## Key terms

| Term | Meaning |
|---|---|
| `df.select()` | Returns a new DataFrame with only the specified columns |
| `col()` | References a column in a way that supports further operations and renaming |
| `.alias()` | Renames a selected column |

## Lab

```python
result = trips.select(
    col("VendorID").alias("vendor"),
    col("passenger_count").alias("passengers"),
    col("fare_amount"),
)
result.show(5)
result.printSchema()
```

Confirm the printed schema shows `vendor` and `passengers`, not
`VendorID`/`passenger_count` — and that `fare_amount` kept its
original name since it wasn't aliased.

## Check yourself

You're ready for Lesson 45 when you can explain, without looking: why
does `.alias()` require `col()` instead of working on a plain string?
