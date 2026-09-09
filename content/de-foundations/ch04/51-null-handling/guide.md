# Lesson 51 — Null Handling

**Chapter 4 · PySpark · Lesson 51 of 62**

## What you'll learn

- `.isNull()` / `.isNotNull()` — finding nulls, the right way
- Why `col("x") == None` doesn't actually work
- `.na.drop()` — removing rows with nulls
- `.na.fill()` — replacing nulls with a default value

## This lesson has been building all chapter

Lesson 47's unmatched `when()`, Lesson 48's failed `.cast()` — both
produce nulls silently, no error. This lesson is where you actually
go looking for them and decide what to do.

## Finding nulls — the right way

```python
from pyspark.sql.functions import col

trips.filter(col("passenger_count").isNull()).show(5)
trips.filter(col("passenger_count").isNotNull()).show(5)
```

```python
# WRONG — this does not find nulls:
trips.filter(col("passenger_count") == None)
```

SQL-style null logic doesn't work with a plain `==` comparison —
`None` compared to anything, including another `None`, isn't
"equal" in the way you'd expect, in SQL's three-valued logic (true /
false / unknown) that Spark follows. `.isNull()` and `.isNotNull()`
are the actual, correct methods for this.

## na.drop() — removing rows with nulls

```python
clean_trips = trips.na.drop()                              # drops a row if ANY column is null
clean_trips = trips.na.drop(subset=["passenger_count"])     # drops only if THIS column is null
```

Dropping every row with any null at all is often too aggressive on
a wide real-world table — `subset=` narrows it to just the columns
that actually matter for what you're about to do.

## na.fill() — replacing nulls with a default

```python
filled_trips = trips.na.fill(0, subset=["passenger_count"])
filled_trips = trips.na.fill("Unknown", subset=["store_and_fwd_flag"])
```

`na.fill()` takes a default value per-type — a number for numeric
columns, a string for string columns — and only replaces nulls in
the column(s) named in `subset`.

## Choosing drop vs. fill

There's no universal right answer — it depends on what the null
actually represents. A missing `passenger_count` on an otherwise
valid trip might reasonably default to `1`; a trip with no
`fare_amount` at all is probably bad data worth dropping entirely,
since filling it with `0` would quietly corrupt any later
aggregation (Lesson 54).

## Key terms

| Term | Meaning |
|---|---|
| `.isNull()` / `.isNotNull()` | The correct way to check for null — not `== None` |
| `.na.drop()` | Removes rows with nulls, optionally scoped to `subset=` |
| `.na.fill()` | Replaces nulls with a default value, optionally scoped to `subset=` |

## Lab

```python
print("Nulls in fare_amount:", trips.filter(col("fare_amount").isNull()).count())
trips = trips.na.fill(1, subset=["passenger_count"])
trips = trips.na.drop(subset=["fare_amount"])
```

Confirm the null count for `passenger_count` drops to zero, while
rows genuinely missing `fare_amount` are removed rather than
defaulted.

## Check yourself

You're ready for Lesson 52 when you can explain, without looking: why
doesn't `col("x") == None` correctly find null rows?
