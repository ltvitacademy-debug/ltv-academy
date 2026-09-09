# Lesson 52 — Removing Duplicates

**Chapter 4 · PySpark · Lesson 52 of 62**

## What you'll learn

- `.distinct()` — unique rows, considering every column
- `.dropDuplicates()` — unique rows, considering only specific columns
- Why "duplicate" always needs a definition before you can remove one
- Which row survives when `dropDuplicates()` finds a match

## distinct() — every column must match

```python
zones = spark.read.csv("/data/nyc_taxi/taxi_zone_lookup.csv", header=True)

unique_zones = zones.distinct()
print(zones.count(), "->", unique_zones.count())
```

`.distinct()` only calls two rows duplicates if **every single
column** matches exactly. Two rows differing in even one column —
including a stray whitespace difference Lesson 49 would have caught —
count as different rows entirely.

## dropDuplicates() — pick which columns matter

```python
unique_by_zone_name = zones.dropDuplicates(["Zone"])
```

`.dropDuplicates(subset)` treats two rows as duplicates if they match
on **just the named columns**, ignoring every other column
completely. This is usually what you actually want: for real trip
data, `trips.dropDuplicates(["VendorID", "tpep_pickup_datetime", "tpep_dropoff_datetime"])`
would catch a genuinely re-ingested duplicate trip record even if,
say, its `fare_amount` had been recalculated slightly differently
between the two copies.

## Which row survives

```python
trips.dropDuplicates(["VendorID", "tpep_pickup_datetime"]).show(5)
```

When multiple rows match on the subset columns, `dropDuplicates()`
keeps an arbitrary one of them — there's no guaranteed "keep the
first" or "keep the most recent" rule. If which specific row survives
actually matters (say, keeping the most recently updated version),
sort first and use Window functions (Lesson 57) instead of relying
on `dropDuplicates()` alone.

## Why "duplicate" needs a definition first

Two rows can be duplicates by one definition and not another. A trip
re-ingested with a corrected `fare_amount` is a "duplicate" by trip
identity, but not by `.distinct()`'s all-columns rule. Always decide
what actually makes two rows "the same" for your specific pipeline
before reaching for either function.

## Key terms

| Term | Meaning |
|---|---|
| `.distinct()` | Unique rows — every column must match to be a duplicate |
| `.dropDuplicates(subset)` | Unique rows considering only the named columns |
| Duplicate definition | Which columns define "the same row" — always a judgment call |

## Lab

```python
print("All columns:", trips.count(), "->", trips.distinct().count())
print(
    "By trip identity:",
    trips.count(), "->",
    trips.dropDuplicates(["VendorID", "tpep_pickup_datetime", "tpep_dropoff_datetime"]).count(),
)
```

Compare the two counts — they'll likely differ, since the two
functions define "duplicate" differently.

## Check yourself

You're ready for Lesson 53 when you can explain, without looking: why
might `.distinct()` and `.dropDuplicates(["VendorID"])` return very
different row counts on the same data?
