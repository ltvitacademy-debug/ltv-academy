# Lesson 56 — union()

**Chapter 4 · PySpark · Lesson 56 of 62**

## What you'll learn

- `df.union()` — stacking two DataFrames on top of each other
- Why columns must match by **position**, not by name
- `unionByName()` — the safer alternative
- A real use case: combining multiple months of NYC Taxi files

## Stacking DataFrames

```python
january = spark.read.parquet("/data/nyc_taxi/yellow_tripdata_2024-01.parquet")
february = spark.read.parquet("/data/nyc_taxi/yellow_tripdata_2024-02.parquet")

all_trips = january.union(february)
print(january.count(), "+", february.count(), "=", all_trips.count())
```

`union()` stacks rows from one DataFrame directly beneath another —
this is the join from Lesson 55's opposite: joins combine columns
side by side, `union()` combines rows top to bottom. The real,
common use case in this course: NYC TLC data ships as one file per
month, and `union()` is how you combine several months into one
DataFrame for analysis.

## Columns must match by position

```python
# DANGEROUS if column order differs between the two files!
df_a = spark.createDataFrame([(1, "x")], ["id", "name"])
df_b = spark.createDataFrame([("y", 2)], ["name", "id"])

df_a.union(df_b).show()
# id and name get silently swapped for df_b's rows -- no error at all
```

`union()` matches columns purely by their **position** in the
schema, not by name. If two files happen to have their columns in a
different order — which genuinely happens across a year of monthly
taxi files if a schema changes slightly — `union()` will silently
mix up the data instead of raising any error.

## unionByName() — matches by name instead

```python
all_trips = january.unionByName(february)
```

`unionByName()` looks up each column by its actual name instead of
its position, sidestepping the entire silent-swap risk above. Unless
you have a specific reason not to, `unionByName()` is the safer
default for combining real-world files.

## Key terms

| Term | Meaning |
|---|---|
| `df.union()` | Stacks rows from two DataFrames; matches columns by position |
| `df.unionByName()` | Stacks rows, matching columns by name — safer in practice |
| Position-based matching | The real risk: silently wrong data if column order differs |

## Lab

```python
combined = january.unionByName(february)
print("January:", january.count())
print("February:", february.count())
print("Combined:", combined.count())
```

Confirm the combined count equals the sum of the two individual
counts — and that using `unionByName()` here was the safer choice
regardless of whether the two files' column order actually matched.

## Check yourself

You're ready for Lesson 57 when you can explain, without looking: why
is `unionByName()` generally the safer choice over plain `union()`
for real-world files?
