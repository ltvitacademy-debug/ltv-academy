# Lesson 26 — Cleaning Data With Python

**Chapter 2 · Python for Data Engineers · Lesson 26 of 62**

## What you'll learn

- Handling missing values: `.isna()`, `.fillna()`, `.dropna()`
- Removing duplicates: `.drop_duplicates()`
- Filtering out invalid rows with boolean indexing
- Converting a column's type after the fact with `.astype()`

## Finding and handling missing values

```python
import pandas as pd

df = pd.read_csv("yellow_tripdata_2024-01.csv")

print(df["fare_amount"].isna().sum())      # how many are missing?
df["fare_amount"] = df["fare_amount"].fillna(0)   # fill with a default
df = df.dropna(subset=["passenger_count"])         # drop rows missing this
```

`.isna()` returns `True`/`False` per value — Lesson 14's `bool` — so
`.sum()` on it counts how many `True`s there are. `.fillna()` replaces
missing values with something specific; `.dropna(subset=[...])` removes
entire rows missing a given column. Which one is right depends entirely
on the business rule — a missing `passenger_count` might mean "drop the
row," while a missing `tip_amount` might genuinely mean "zero."

## Removing duplicates

```python
print(df.duplicated().sum())    # how many exact duplicate rows?
df = df.drop_duplicates()
```

`.drop_duplicates()` removes rows that are exact duplicates of an
earlier row — a real, common issue when combining data from more than
one source, or re-processing a file that got ingested twice.

## Filtering invalid rows with boolean indexing

```python
df = df[df["fare_amount"] > 0]
df = df[(df["passenger_count"] > 0) & (df["trip_distance"] > 0)]
```

`df["fare_amount"] > 0` produces a column of `True`/`False` values;
`df[...]` with that inside keeps only the rows where it's `True` — this
is Lesson 16's conditions, applied to an entire column at once instead
of one value at a time. Use `&` for "and" and `|` for "or" between
conditions on DataFrames — Python's own `and`/`or` don't work correctly
here.

## Converting a column's type after loading

```python
df["VendorID"] = df["VendorID"].astype(str)
df["passenger_count"] = df["passenger_count"].astype(int)
```

Sometimes a type needs fixing *after* the file already loaded, not just
at `read_csv()` time (Lesson 22) — `.astype()` converts an existing
column directly.

## Key terms

| Term | Meaning |
|---|---|
| `.isna()` | Returns True/False per value, marking which are missing |
| `.fillna()` | Replaces missing values with a specified value |
| `.dropna()` | Removes rows missing a value in specified columns |
| `.drop_duplicates()` | Removes exact duplicate rows |
| `.astype()` | Converts a column to a different type after the fact |

## Lab

```python
import pandas as pd

df = pd.DataFrame({
    "fare_amount": [14.50, -5.00, None, 9.75, 9.75],
    "passenger_count": [1, 1, 2, 0, 3],
})

print("Before:", len(df))
df = df.dropna(subset=["fare_amount"])
df = df[df["fare_amount"] > 0]
df = df[df["passenger_count"] > 0]
df = df.drop_duplicates()
print("After:", len(df))
```

Trace through each step by hand first, then run it and confirm your
prediction.

## Check yourself

You're ready for Lesson 27 when you can explain, without looking: why
does `df["col"] > 0 & df["col2"] > 0` need `&` instead of Python's own
`and`, and when would you `fillna` instead of `dropna`?
