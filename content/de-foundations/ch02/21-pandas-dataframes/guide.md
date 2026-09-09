# Lesson 21 — Pandas DataFrames

**Chapter 2 · Python for Data Engineers · Lesson 21 of 62**

## What you'll learn

- What Pandas is, and the one line that starts every script using it
- The **DataFrame** — the table-shaped structure everything else in
  this chapter builds toward
- How Lesson 15's list of dictionaries becomes a real DataFrame
- Why Pandas exists at all, instead of Lesson 20's manual file loops

## The line that starts everything

```python
import pandas as pd
```

`pd` is the near-universal nickname for Pandas — you'll see this exact
line at the top of almost every data engineering script in existence,
including your own from here forward.

## From a list of dictionaries to a real table

Remember Lesson 15's list of trip dictionaries? Pandas turns that
directly into a genuine table:

```python
trips = [
    {"VendorID": "2", "passenger_count": 1, "fare_amount": 14.50},
    {"VendorID": "1", "passenger_count": 3, "fare_amount": 9.75},
]

df = pd.DataFrame(trips)
print(df)

#   VendorID  passenger_count  fare_amount
# 0        2                1        14.50
# 1        1                3         9.75
```

That's a **DataFrame** — rows, columns, an automatic numbered index on
the left, and real per-column types (Lesson 14's `int`, `float`, `str`),
all inferred automatically from the data you handed it.

## Why Pandas exists at all

Lesson 20 read a CSV manually: open a file, loop line by line, split on
commas, convert types by hand, track columns by index number. Pandas
replaces all of that with functions that just work — Lesson 22 shows
`pd.read_csv()` doing in one line what Lesson 20 needed ten lines of
manual loop-and-split logic to approximate, correctly, every time.

## Looking at a DataFrame

```python
print(df.head())        # first 5 rows
print(df.columns)       # column names
print(df.dtypes)        # each column's inferred type
print(len(df))          # row count
```

These four are the first thing you run on almost any DataFrame — a
quick, honest look at what you're actually working with before doing
anything else to it.

## Key terms

| Term | Meaning |
|---|---|
| Pandas | The Python library for table-shaped data |
| DataFrame | Pandas' table structure — rows, columns, an index |
| `pd.DataFrame()` | Builds a DataFrame from a list of dictionaries (or other shapes) |

## Lab

```python
import pandas as pd

trips = [
    {"VendorID": "2", "passenger_count": 1, "fare_amount": 14.50},
    {"VendorID": "1", "passenger_count": 3, "fare_amount": 9.75},
    {"VendorID": "2", "passenger_count": 2, "fare_amount": 22.00},
]

df = pd.DataFrame(trips)
print(df)
print(df.dtypes)
print("Row count:", len(df))
```

Confirm the row count prints `3` and `dtypes` shows `fare_amount` as a
float.

## Check yourself

You're ready for Lesson 22 when you can explain, without looking: what
is a DataFrame, and how does it relate to the list of dictionaries from
Lesson 15?
