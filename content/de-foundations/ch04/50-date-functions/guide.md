# Lesson 50 — Date Functions

**Chapter 4 · PySpark · Lesson 50 of 62**

## What you'll learn

- `year()`, `month()`, `dayofweek()` — pulling parts out of a timestamp
- `datediff()` — the real duration between two timestamps
- `date_format()` — formatting a date for display
- Why real pickup/dropoff timestamps need this before Lesson 61's partitioning

## Pulling parts out of a timestamp

```python
from pyspark.sql.functions import col, year, month, dayofweek

trips = trips.withColumn("pickup_year", year(col("tpep_pickup_datetime")))
trips = trips.withColumn("pickup_month", month(col("tpep_pickup_datetime")))
trips = trips.withColumn("pickup_dow", dayofweek(col("tpep_pickup_datetime")))

trips.select("tpep_pickup_datetime", "pickup_year", "pickup_month", "pickup_dow").show(5)
```

These only work correctly if the column is already a real
`timestamp` type — which is exactly why Lesson 48's `.cast()` matters
here. `dayofweek()` returns 1 (Sunday) through 7 (Saturday), not
0-indexed like Python's `datetime.weekday()`.

## datediff() — real duration between two timestamps

```python
from pyspark.sql.functions import datediff, to_date

trips = trips.withColumn(
    "days_between",
    datediff(to_date(col("tpep_dropoff_datetime")), to_date(col("tpep_pickup_datetime"))),
)
```

`datediff()` returns whole days between two dates — for the minutes-
long trips in this dataset that's usually `0`, but the same function
matters a great deal for longer-running data (a shipment's transit
time, a subscription's active days). `to_date()` strips the time
portion off a timestamp, which is what `datediff()` expects.

## date_format() — formatting for display

```python
from pyspark.sql.functions import date_format

trips = trips.withColumn(
    "pickup_display",
    date_format(col("tpep_pickup_datetime"), "MMM d, yyyy"),
)
trips.select("tpep_pickup_datetime", "pickup_display").show(5)
```

`date_format()` takes a pattern string — `"MMM d, yyyy"` renders as
something like "Jan 15, 2024". This is purely for display; keep the
underlying column as a real timestamp for any actual date math.

## Why this matters for later lessons

Lesson 61 (Partitioning Output) will split files by date — usually
by year and month, exactly the columns built here. Getting real
`year()`/`month()` values now is what makes that partitioning
possible later.

## Key terms

| Term | Meaning |
|---|---|
| `year()` / `month()` / `dayofweek()` | Extract a specific part of a timestamp |
| `datediff()` | Whole days between two dates |
| `date_format()` | Formats a timestamp as a display string using a pattern |

## Lab

```python
trips = trips.withColumn("pickup_year", year(col("tpep_pickup_datetime")))
trips = trips.withColumn("pickup_month", month(col("tpep_pickup_datetime")))
trips.groupBy("pickup_year", "pickup_month").count().orderBy("pickup_year", "pickup_month").show()
```

(This previews Lesson 53's `groupBy()` — don't worry about the
syntax yet, just confirm `pickup_year`/`pickup_month` show sensible
values.)

## Check yourself

You're ready for Lesson 51 when you can explain, without looking: why
do `year()` and `month()` need a real timestamp column to work
correctly, rather than a plain string?
