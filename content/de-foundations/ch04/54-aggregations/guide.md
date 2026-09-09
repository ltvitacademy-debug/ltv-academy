# Lesson 54 — Aggregations

**Chapter 4 · PySpark · Lesson 54 of 62**

## What you'll learn

- `.agg()` — multiple statistics per group, in one call
- `sum()`, `avg()`, `max()`, `min()`, `count()` — the core aggregate functions
- Naming aggregate results with `.alias()`
- Aggregating with no `groupBy()` at all — one result for the whole DataFrame

## Multiple statistics, one call

```python
from pyspark.sql.functions import sum, avg, max, min, count, col

trips.groupBy("VendorID").agg(
    count("*").alias("trip_count"),
    sum("fare_amount").alias("total_fare"),
    avg("fare_amount").alias("avg_fare"),
    max("trip_distance").alias("longest_trip"),
).show()
```

Lesson 53's `.count()` only ever counts rows. `.agg()` is the real
payoff — pass it as many aggregate functions as you want, each
wrapped in `.alias()` so the result has sensible column names
instead of Spark's default (`sum(fare_amount)`, etc.).

## The core aggregate functions

`sum()`, `avg()`, `max()`, `min()`, and `count()` all come from
`pyspark.sql.functions` — the same toolbox `col()` and `when()` live
in. Each takes a column name (or `col()` reference) and reduces the
whole group down to a single value.

## Aggregating without groupBy() at all

```python
trips.agg(
    avg("fare_amount").alias("overall_avg_fare"),
    max("trip_distance").alias("overall_max_distance"),
).show()
```

Skip `groupBy()` entirely and `.agg()` still works — it just treats
the whole DataFrame as one single group, returning exactly one row.
This is the PySpark equivalent of Pandas' `df["fare_amount"].mean()`
from Lesson 23, just phrased as an aggregate expression instead of a
direct Series method.

## count("*") vs. count("some_column")

```python
trips.groupBy("VendorID").agg(count("*").alias("all_rows"))
trips.groupBy("VendorID").agg(count("fare_amount").alias("non_null_fares"))
```

`count("*")` counts every row in the group, nulls included.
`count("some_column")` counts only the rows where that specific
column is **not null** — a genuinely different number whenever
Lesson 51's null handling left any gaps. Worth checking which one you
actually mean.

## Key terms

| Term | Meaning |
|---|---|
| `.agg()` | Computes multiple aggregate statistics per group in one call |
| `sum()` / `avg()` / `max()` / `min()` | Core aggregate functions from `pyspark.sql.functions` |
| `count("*")` vs `count(col)` | All rows vs. only non-null rows for that column |

## Lab

```python
trips.groupBy("passenger_count").agg(
    count("*").alias("trip_count"),
    avg("fare_amount").alias("avg_fare"),
    max("trip_distance").alias("max_distance"),
).orderBy("passenger_count").show()
```

Confirm each `passenger_count` group shows a sensible trip count,
average fare, and max distance side by side.

## Check yourself

You're ready for Lesson 55 when you can explain, without looking: why
might `count("*")` and `count("fare_amount")` return different
numbers for the same group?
