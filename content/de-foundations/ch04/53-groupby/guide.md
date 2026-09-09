# Lesson 53 — groupBy()

**Chapter 4 · PySpark · Lesson 53 of 62**

## What you'll learn

- `df.groupBy()` — grouping rows that share a value
- Why `groupBy()` alone doesn't return a DataFrame you can `.show()`
- `.count()` — the simplest aggregation, applied per group
- Grouping by more than one column at once

## Grouping rows

```python
trips = spark.read.parquet("/data/nyc_taxi/yellow_tripdata_2024-01.parquet")

by_vendor = trips.groupBy("VendorID")
```

This is the PySpark equivalent of Pandas' `df.groupby()` from
Lesson 26 — same idea, almost the same name. But try running
`by_vendor.show()` and it fails: `groupBy()` alone returns a
`GroupedData` object, not a DataFrame. It's a statement of intent —
"group by this" — waiting for you to say what to actually calculate
per group.

## count() — completing the thought

```python
trips.groupBy("VendorID").count().show()
```

`.count()` is the simplest aggregation: how many rows landed in each
group. Chaining it directly onto `groupBy()` is what turns the
grouping intent into an actual, showable DataFrame — two columns:
`VendorID` and `count`.

## Grouping by more than one column

```python
trips.groupBy("VendorID", "passenger_count").count().show()
```

Pass multiple column names, and each unique *combination* becomes
its own group — every distinct `(VendorID, passenger_count)` pair
gets its own row and count in the result.

## Why this matters going forward

`groupBy()` by itself is intentionally incomplete — the real payoff
comes in the very next lesson, where `.agg()` lets you compute sums,
averages, and multiple statistics per group all at once, instead of
just counting rows.

## Key terms

| Term | Meaning |
|---|---|
| `df.groupBy()` | Groups rows by shared column value(s); returns `GroupedData`, not a DataFrame |
| `GroupedData` | An intermediate object — needs an aggregation like `.count()` before you can `.show()` it |
| `.count()` | The simplest aggregation: rows per group |

## Lab

```python
trips.groupBy("passenger_count").count().orderBy("passenger_count").show()
```

Confirm the result has one row per distinct `passenger_count` value,
each with its own row count — and that `.orderBy()` (previewed here,
covered properly in a later lesson) sorts the output sensibly.

## Check yourself

You're ready for Lesson 54 when you can explain, without looking: why
does `trips.groupBy("VendorID").show()` fail, while
`trips.groupBy("VendorID").count().show()` works?
