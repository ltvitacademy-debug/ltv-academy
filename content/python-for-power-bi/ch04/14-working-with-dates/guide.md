# Lesson 14 — Working with Dates

**Chapter 4 · Cleaning & Preparing Data · Lesson 14 of 20**

## What you'll learn

- Why dates are Lesson 13's problem, specifically and predictably
- `pd.to_datetime()` — converting text into a real date type
- Pulling year, month, and day back out with `.dt`
- Why this matters directly for Power BI's `DimDate` pattern

## Dates: a predictable version of Lesson 13's problem

A date column loaded from a CSV almost always arrives as text —
`"2026-01-15"` looks like a date to a human, but Pandas sees it as an
eleven-character string, exactly the same `object` dtype problem Lesson
13 covered:

```python
import pandas as pd

df = pd.DataFrame({
    "Order Date": ["2026-01-15", "2026-03-22", "2026-07-04"]
})
print(df.dtypes)
```

```output
Order Date    object
```

## `pd.to_datetime()`: converting to a real date

`pd.to_datetime()` converts a text column into Pandas' actual date type:

```python
df["Order Date"] = pd.to_datetime(df["Order Date"])
print(df.dtypes)
```

```output
Order Date    datetime64[ns]
```

Once converted, the column supports real date operations — comparing
dates, sorting chronologically, and calculating differences — none of
which work correctly on a plain text string, no matter how date-shaped
it looks.

## Pulling out year, month, and day

Every part of a `datetime64` column is available through `.dt`, the date
equivalent of the `.str` prefix from Lesson 10:

```python
df["Year"] = df["Order Date"].dt.year
df["Month"] = df["Order Date"].dt.month
print(df)
```

```output
  Order Date  Year  Month
0 2026-01-15  2026     1
1 2026-03-22  2026     3
2 2026-07-04  2026     7
```

`.dt.day`, `.dt.day_name()`, and `.dt.quarter` follow the exact same
pattern for whichever piece of the date you actually need.

## Why this matters for Power BI specifically

Chapter 6, Lesson 47 of the main Power BI course built a `DimDate` table
by hand, in DAX, with one row per day. When Python is the one producing
your data instead, `pd.to_datetime()` plus `.dt` accessors are how you
build that same kind of clean date structure *before* the data ever
reaches Power BI — genuinely current, correctly typed dates, not text
that merely resembles them.

## Key terms

| Term | Meaning |
|---|---|
| `pd.to_datetime()` | Converts a text column into Pandas' real date type |
| `datetime64[ns]` | The dtype Pandas uses to represent actual dates |
| `.dt` | The prefix for accessing parts of a date column (year, month, day) |

## Lab

1. Build a DataFrame with a date column stored as text strings, similar
   to this lesson's example.
2. Convert it with `pd.to_datetime()` and confirm `.dtypes` now shows
   `datetime64[ns]`.
3. Create two new columns pulling out the year and month with `.dt`.

## Check yourself

You're ready for Lesson 15 when you can explain why a date column needs
converting at all — what specifically doesn't work correctly on a date
stored as plain text.
