# Lesson 13 — Fixing Data Types

**Chapter 4 · Cleaning & Preparing Data · Lesson 13 of 20**

## What you'll learn

- Why a column of numbers can still load as text
- `.astype()` — converting a column to the type it should actually be
- The specific error that shows up when you try to do math on text
- Checking `.dtypes` as a habit, before doing anything else with new data

## Why numbers sometimes load as text

Lesson 7 introduced `.dtypes` as a quick inspection tool. This lesson is
about what to actually *do* once it tells you something's wrong. A CSV
column of numbers can load as `object` — Pandas' label for text — for
reasons that have nothing to do with the numbers themselves: a stray
currency symbol, inconsistent formatting, or a source system that quoted
every value as a string:

```python
import pandas as pd

df = pd.DataFrame({
    "Product": ["Widget A", "Widget B"],
    "Units Sold": ["120", "85"]
})
print(df.dtypes)
```

```output
Product       object
Units Sold    object
```

`Units Sold` looks like numbers, but it loaded as `object` — Pandas is
treating `"120"` as the three-character string `"120"`, not the number
`120`.

## The problem this actually causes

Text that merely *looks* like a number can't be summed the way you'd
expect — string "addition" concatenates characters instead of adding
values, which silently produces nonsense instead of an error you'd
notice immediately.

## `.astype()`: converting to the right type

`.astype()` converts a column to a specific type:

```python
df["Units Sold"] = df["Units Sold"].astype(int)
print(df.dtypes)
```

```output
Product       object
Units Sold     int64
```

```python
print(df["Units Sold"].sum())
# 205
```

Once converted, `.sum()` genuinely adds the numbers — `120 + 85 = 205` —
instead of producing whatever string concatenation would have given you.

## Checking `.dtypes` as a habit

Make `.dtypes` the first thing you check on any freshly loaded data,
before filtering, grouping, or calculating anything — exactly the
sanity-check habit Lesson 8 introduced for CSV imports specifically. A
column that should be numeric but shows `object` is the single most
common data-type surprise you'll run into with real files.

## Key terms

| Term | Meaning |
|---|---|
| `object` dtype | Pandas' label for text — including numbers stored as text |
| `.astype(type)` | Converts a column to a specific data type |
| `int` / `float` | The two numeric types you'll convert to most often |

## Lab

1. Build a DataFrame with a column of numbers stored as text (quoted
   strings), similar to this lesson's example.
2. Check `.dtypes` and confirm the column shows as `object`.
3. Convert it with `.astype()`, re-check `.dtypes`, and confirm
   `.sum()` now returns a real numeric total.

## Check yourself

You're ready for Lesson 14 when you can explain why a column of numbers
can load as `object`, and what specifically goes wrong if you try to sum
it before converting.
