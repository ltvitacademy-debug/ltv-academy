# Lesson 48 — Data Type Conversion

**Chapter 4 · PySpark · Lesson 48 of 62**

## What you'll learn

- `.cast()` — converting a column's data type
- Casting with a string type name vs. a type class
- What happens when a value can't be cast — silent nulls, not errors
- A real reason this matters: a "numeric" CSV column that's actually text

## Casting with .cast()

```python
from pyspark.sql.functions import col
from pyspark.sql.types import IntegerType

trips = trips.withColumn("passenger_count", col("passenger_count").cast(IntegerType()))
# or, equivalently, with a string name:
trips = trips.withColumn("passenger_count", col("passenger_count").cast("int"))
```

Both forms do the same thing. The string form (`"int"`, `"double"`,
`"string"`, `"date"`, `"timestamp"`) is shorter and common in real
code; the type-class form (`IntegerType()`, imported from
`pyspark.sql.types`, the same module Lesson 43 used for schemas) is
more explicit and matches what you'd see in a `StructType`.

## Casting fails silently — this matters

```python
# Suppose fare_amount was read in as a string column, and one row
# actually contains "N/A" instead of a number
trips.withColumn("fare_amount", col("fare_amount").cast("double")).show()
# The "N/A" row's fare_amount becomes null -- NOT an error
```

This is the same shape of surprise Lesson 47 covered for unmatched
`when()` conditions: PySpark generally favors turning "this doesn't
fit" into `null`, rather than crashing the whole job over one bad
row. That's convenient for keeping a large job running, but it means
a silent cast failure is a real, common way for bad data to hide in
a pipeline undetected. Lesson 51 (Null Handling) is exactly where you
catch this.

## Why this matters with real CSV data

CSV has no real types at all — everything is text until something
casts it. Lesson 40's `inferSchema=True` does casting automatically
behind the scenes, guessing from the file's contents; Lesson 43's
explicit schema does it too, just stated up front instead of guessed.
`.cast()` is the same underlying operation, just applied by hand,
after the fact, to one column at a time.

## Key terms

| Term | Meaning |
|---|---|
| `.cast()` | Converts a column to a different data type |
| String type name | `"int"`, `"double"`, `"date"`, etc. — shorthand for a cast |
| Type class | `IntegerType()` etc. — the explicit, `StructType`-style form |

## Lab

```python
trips = trips.withColumn("trip_distance", col("trip_distance").cast("double"))
trips = trips.withColumn("tpep_pickup_datetime", col("tpep_pickup_datetime").cast("timestamp"))
trips.printSchema()
```

Confirm both columns now show their intended types in the printed
schema.

## Check yourself

You're ready for Lesson 49 when you can explain, without looking:
what happens to a value that can't actually be converted to the
target type during a `.cast()`?
