# Lesson 59 — Spark SQL With DataFrames

**Chapter 4 · PySpark · Lesson 59 of 62**

## What you'll learn

- `spark.sql()` — running a real SQL string against a temp view
- The same query, written both ways — DataFrame API and SQL
- Why the choice between them is mostly a style preference
- Mixing both APIs freely in the same pipeline

## Running SQL against a temp view

```python
trips.createOrReplaceTempView("trips")

result = spark.sql("""
    SELECT VendorID, COUNT(*) AS trip_count, AVG(fare_amount) AS avg_fare
    FROM trips
    WHERE trip_distance > 5
    GROUP BY VendorID
""")
result.show()
```

`spark.sql()` takes a plain SQL string and returns an ordinary
DataFrame — the result supports every DataFrame method from this
entire chapter (`.select()`, `.filter()`, more `.show()`, etc.),
exactly as if you'd built it with `groupBy()`/`.agg()` directly.

## The same query, both ways

```python
# DataFrame API (Lessons 45, 53, 54)
result_df = (
    trips
    .filter(col("trip_distance") > 5)
    .groupBy("VendorID")
    .agg(count("*").alias("trip_count"), avg("fare_amount").alias("avg_fare"))
)

# Spark SQL — the exact same result
result_sql = spark.sql("""
    SELECT VendorID, COUNT(*) AS trip_count, AVG(fare_amount) AS avg_fare
    FROM trips WHERE trip_distance > 5 GROUP BY VendorID
""")
```

This is straight back to Lesson 38's core point: both compile down
to the exact same Catalyst execution plan. Neither one is faster —
the choice is genuinely just about which is more readable for a
given query, or for a given reader.

## When each tends to read better

A query with several joins and a `WHERE` clause often reads more
naturally as SQL, especially for anyone with a SQL background — this
course's whole first course, in fact. A query built up step by step,
with each transformation named along the way, often reads more
clearly as chained DataFrame methods. There's no fixed rule — many
real pipelines use both, choosing per query.

## Mixing both freely

```python
cleaned = trips.filter(col("fare_amount") > 0).na.drop(subset=["passenger_count"])
cleaned.createOrReplaceTempView("cleaned_trips")

spark.sql("SELECT VendorID, SUM(fare_amount) AS total FROM cleaned_trips GROUP BY VendorID").show()
```

Clean with the DataFrame API, register as a temp view, then query
with SQL — or the reverse. Nothing stops you from switching back and
forth within the same script.

## Key terms

| Term | Meaning |
|---|---|
| `spark.sql()` | Runs a SQL string against registered views, returning a DataFrame |
| Catalyst | The shared execution plan both APIs compile down to (Lesson 38) |
| API choice | A style preference, not a performance difference |

## Lab

```python
trips.createOrReplaceTempView("trips")
sql_result = spark.sql("SELECT passenger_count, AVG(trip_distance) AS avg_dist FROM trips GROUP BY passenger_count")
df_result = trips.groupBy("passenger_count").agg(avg("trip_distance").alias("avg_dist"))

sql_result.show()
df_result.show()
```

Confirm both approaches return the same values, just built two
different ways.

## Check yourself

You're ready for Lesson 60 when you can explain, without looking: why
doesn't choosing SQL over the DataFrame API (or vice versa) affect
Spark's actual performance?
