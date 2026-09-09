# Lesson 49 — String Functions

**Chapter 4 · PySpark · Lesson 49 of 62**

## What you'll learn

- `upper()`, `lower()`, `trim()` — normalizing messy text
- `concat()` — joining columns into one string
- `substring()` — pulling out part of a string by position
- Why all of these live in `pyspark.sql.functions`, alongside `col()` and `when()`

## Normalizing text

```python
from pyspark.sql.functions import col, upper, lower, trim

zones = spark.read.csv("/data/nyc_taxi/taxi_zone_lookup.csv", header=True)

zones = zones.withColumn("borough_clean", trim(upper(col("Borough"))))
zones.select("Borough", "borough_clean").show(5)
```

Real data is rarely clean — extra whitespace, inconsistent
capitalization ("queens", "Queens ", "QUEENS") are exactly the kind
of thing that breaks a join or a groupBy later (Lessons 53 and 55)
if left as-is. `trim()` strips leading/trailing whitespace;
`upper()`/`lower()` force consistent casing. Wrapping one inside the
other, as above, applies both in one expression.

## concat() — joining strings

```python
from pyspark.sql.functions import concat, lit

zones = zones.withColumn(
    "zone_label",
    concat(col("Zone"), lit(", "), col("Borough")),
)
zones.select("zone_label").show(5)
```

`concat()` joins any number of columns and literal strings together.
Notice `lit(", ")` — a plain Python string can't be mixed directly
into a column expression, so `lit()` wraps it as a literal value
Spark can place alongside real columns.

## substring() — pulling out part of a string

```python
from pyspark.sql.functions import substring

trips = trips.withColumn(
    "pickup_date_str",
    substring(col("tpep_pickup_datetime").cast("string"), 1, 10),
)
```

`substring(column, start, length)` — note that `start` is
**1-indexed**, not 0-indexed like Python's own string slicing. This
trips up anyone coming straight from Python string handling, so
watch for it deliberately.

## Where these functions live

Every function used here — `upper`, `lower`, `trim`, `concat`,
`lit`, `substring` — comes from `pyspark.sql.functions`, the exact
same module `col()` (Lesson 44) and `when()` (Lesson 47) came from.
It's the single toolbox for building column expressions in PySpark.

## Key terms

| Term | Meaning |
|---|---|
| `trim()` / `upper()` / `lower()` | Normalize whitespace and casing |
| `concat()` | Joins columns/literals into one string |
| `lit()` | Wraps a plain Python value as a literal column expression |
| `substring(col, start, len)` | 1-indexed substring extraction |

## Lab

```python
zones = zones.withColumn("borough_clean", trim(upper(col("Borough"))))
zones = zones.withColumn("zone_label", concat(col("Zone"), lit(" — "), col("borough_clean")))
zones.select("zone_label").show(10)
```

Confirm every label is consistently formatted, with no stray
whitespace or mixed casing.

## Check yourself

You're ready for Lesson 50 when you can explain, without looking: why
does mixing a plain Python string into a column expression require
`lit()`?
