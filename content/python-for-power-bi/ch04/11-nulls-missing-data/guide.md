# Lesson 11 — NULLs & Missing Data

**Chapter 4 · Cleaning & Preparing Data · Lesson 11 of 20**

## What you'll learn

- What a missing value actually looks like inside a DataFrame
- `.isna()` — finding exactly where the gaps are
- `.fillna()` — filling gaps with a specific value
- `.dropna()` — removing rows that have gaps, and when that's the right call

## What a missing value looks like

A missing value in Pandas shows up as `NaN` — "Not a Number" — regardless
of whether the column is text or numbers. It's not the same as an empty
string or a zero; it's Pandas' explicit marker for "no value was here at
all":

```python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    "Product": ["Widget A", "Widget B", "Widget C"],
    "Revenue": [2400.00, np.nan, 5000.00]
})
print(df)
```

```output
    Product  Revenue
0  Widget A   2400.0
1  Widget B      NaN
2  Widget C   5000.0
```

## `.isna()`: finding the gaps

`.isna()` returns `True`/`False` for every cell — `True` exactly where a
value is missing:

```python
print(df.isna())
```

```output
   Product  Revenue
0    False    False
1    False     True
2    False    False
```

Run `.isna().sum()` instead of just `.isna()` to get a per-column count
of missing values — a fast way to see how bad a real dataset's gaps
actually are before deciding what to do about them.

## `.fillna()`: filling the gaps

`.fillna()` replaces every `NaN` with a value you choose:

```python
print(df.fillna(0))
```

```output
    Product  Revenue
0  Widget A   2400.0
1  Widget B      0.0
2  Widget C   5000.0
```

Filling with `0` is common for revenue-style columns, but think about
whether it's actually correct first — a missing revenue value might mean
"zero sales," or it might mean "we don't actually know," and those are
very different things to report on.

## `.dropna()`: removing the gaps entirely

`.dropna()` removes any row that has at least one missing value:

```python
print(df.dropna())
```

```output
    Product  Revenue
0  Widget A   2400.0
2  Widget C   5000.0
```

Use `.dropna()` when a missing value makes a row genuinely unusable —
`.fillna()` when a sensible default actually exists. Neither is
universally "more correct"; the right choice depends on what the missing
value actually means for that specific column.

## Key terms

| Term | Meaning |
|---|---|
| `NaN` | Pandas' marker for a missing value, in any column type |
| `.isna()` | Returns True/False showing exactly where values are missing |
| `.fillna(value)` | Replaces missing values with a specific value |
| `.dropna()` | Removes any row containing at least one missing value |

## Lab

1. Build a small DataFrame with at least one missing value (use
   `np.nan`), similar to this lesson's example.
2. Run `.isna().sum()` to count missing values per column.
3. Try both `.fillna()` and `.dropna()` on the same DataFrame, and write
   one sentence on which one you'd actually use for this data, and why.

## Check yourself

You're ready for Lesson 12 when you can explain the real difference
between choosing `.fillna()` versus `.dropna()` for a specific missing
value — not just which function does which mechanically.
