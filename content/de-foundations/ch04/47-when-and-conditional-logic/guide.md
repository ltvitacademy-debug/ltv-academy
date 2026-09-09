# Lesson 47 — when() and Conditional Logic

**Chapter 4 · PySpark · Lesson 47 of 62**

## What you'll learn

- `when()` / `.otherwise()` — PySpark's if/else, as a column expression
- Chaining multiple `when()` conditions, like elif
- What happens with no matching condition and no `.otherwise()`
- Combining `when()` with `withColumn()` from Lesson 46

## The basic if/else shape

```python
from pyspark.sql.functions import col, when

trips = trips.withColumn(
    "trip_size",
    when(col("trip_distance") > 10, "long")
    .otherwise("short"),
)
trips.select("trip_distance", "trip_size").show(5)
```

`when(condition, value)` is the "if" — it returns `value` for every
row where `condition` is true. `.otherwise(value)` is the "else" —
it covers everything else. Together they build a single expression,
which is exactly what `withColumn()` from Lesson 46 needs.

## Chaining — like elif

```python
trips = trips.withColumn(
    "trip_size",
    when(col("trip_distance") > 10, "long")
    .when(col("trip_distance") > 3, "medium")
    .otherwise("short"),
)
```

Each `.when()` is checked in order, top to bottom — the first one
that matches wins, exactly like a Python `if`/`elif`/`else` chain.
Order matters: if "medium" were checked before "long", every long
trip would also satisfy `> 3` and get mislabeled.

## No match, no otherwise

```python
trips.withColumn(
    "trip_size",
    when(col("trip_distance") > 10, "long"),   # no .otherwise()!
)
```

If a row matches no `when()` condition and there's no
`.otherwise()`, the result is `null` for that row — not an error,
not a default guess. This is a genuine, easy-to-miss source of
unexpected nulls in real pipelines, which Lesson 51 (Null Handling)
picks up directly.

## Key terms

| Term | Meaning |
|---|---|
| `when(cond, value)` | Returns `value` where `cond` is true — the "if" |
| `.otherwise(value)` | Returns `value` for every row not matched above — the "else" |
| Chained `.when()` | Checked top to bottom; first match wins, like elif |

## Lab

```python
trips = trips.withColumn(
    "fare_tier",
    when(col("fare_amount") < 10, "low")
    .when(col("fare_amount") < 30, "medium")
    .otherwise("high"),
)
trips.select("fare_amount", "fare_tier").show(10)
```

Confirm the ordering is correct — check the smallest threshold
first, since chained `.when()` calls stop at the first match.

## Check yourself

You're ready for Lesson 48 when you can explain, without looking:
what value does a row get if it matches no `when()` condition and
there's no `.otherwise()`?
