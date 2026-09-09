# Lesson 45 — filter() and where()

**Chapter 4 · PySpark · Lesson 45 of 62**

## What you'll learn

- `df.filter()` — keeping only the rows that match a condition
- `df.where()` — the exact same thing, a SQL-flavored alias
- Comparison operators, and why you need `col()` here (not a plain string)
- Combining conditions with `&`, `|`, and why Python's `and`/`or` don't work

## filter() — keeping matching rows

```python
trips = spark.read.parquet("/data/nyc_taxi/yellow_tripdata_2024-01.parquet")

long_trips = trips.filter(col("trip_distance") > 10)
long_trips.show(5)
```

This is the PySpark equivalent of Lesson 24's Pandas boolean
indexing (`df[df["trip_distance"] > 10]`). The concept is identical —
keep rows where a condition is true — the syntax is just a method
call instead of bracket indexing.

## where() — the same thing, a SQL-flavored name

```python
long_trips = trips.where(col("trip_distance") > 10)
```

`.filter()` and `.where()` are genuinely interchangeable — `.where()`
exists purely so SQL-background readers feel at home, since `WHERE`
is the clause that does this same job in Lesson 59's Spark SQL.
Pick whichever reads more naturally to you; this course uses both.

## Why col(), not a plain string, for conditions

```python
trips.filter(col("trip_distance") > 10)   # correct
trips.filter("trip_distance" > 10)        # WRONG — compares a Python string, not the column
```

The second line is a real Python trap: `"trip_distance" > 10` just
compares a string to an integer using Python's own rules, with no
connection to the DataFrame at all. `col()` is what actually builds a
Spark condition Spark can evaluate against every row.

## Combining conditions

```python
trips.filter((col("trip_distance") > 10) & (col("fare_amount") > 50)).show(5)
trips.filter((col("passenger_count") == 1) | (col("passenger_count") == 2)).show(5)
```

Use `&` and `|`, not Python's `and`/`or` — Spark's `Column` objects
overload the bitwise operators for this purpose, and each condition
needs its own parentheses because of how Python evaluates operator
precedence here.

## Key terms

| Term | Meaning |
|---|---|
| `df.filter()` | Keeps only rows where a condition is true |
| `df.where()` | An identical alias for `filter()`, SQL-flavored naming |
| `&` / `\|` | Combine multiple conditions — not Python's `and`/`or` |

## Lab

```python
result = trips.filter(
    (col("trip_distance") > 5) & (col("passenger_count") >= 2)
)
result.select("VendorID", "trip_distance", "passenger_count").show(10)
```

Confirm every row shown genuinely satisfies both conditions at once.

## Check yourself

You're ready for Lesson 46 when you can explain, without looking: why
does `trips.filter("trip_distance" > 10)` silently do the wrong thing
instead of raising an error?
