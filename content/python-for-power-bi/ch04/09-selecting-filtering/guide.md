# Lesson 9 — Selecting & Filtering Data

**Chapter 4 · Cleaning & Preparing Data · Lesson 9 of 20**

## What you'll learn

- Selecting more than one column at once
- Filtering rows with a condition — the pattern you'll use constantly
- Combining multiple conditions with `&` and `|`
- Why this is the Pandas equivalent of Power Query's Filter Rows step

## Selecting more than one column

Lesson 7 pulled a single column out with `df["Revenue"]`. To select
*several* columns at once, pass a list of names instead of one:

```python
import pandas as pd

df = pd.DataFrame({
    "Product": ["Widget A", "Widget B", "Widget C", "Widget D"],
    "Region": ["West", "East", "West", "South"],
    "Units Sold": [120, 85, 200, 40],
    "Revenue": [2400.00, 1700.00, 5000.00, 800.00]
})

print(df[["Product", "Revenue"]])
```

```output
    Product  Revenue
0  Widget A   2400.0
1  Widget B   1700.0
2  Widget C   5000.0
3  Widget D    800.0
```

Notice the double square brackets — the outer pair means "select
columns," the inner pair is the actual list of names.

## Filtering rows with a condition

Filtering uses the same square-bracket syntax, but with a condition
instead of column names. Pandas evaluates the condition for every row and
keeps only the ones where it's `True`:

```python
print(df[df["Revenue"] > 1500])
```

```output
    Product Region  Units Sold  Revenue
0  Widget A   West         120   2400.0
1  Widget B   East          85   1700.0
2  Widget C   West         200   5000.0
```

This is the exact Pandas equivalent of clicking a column's filter arrow in
Power Query and typing "greater than 1500" — same result, written as code
instead of clicked through a dialog.

## Combining conditions

Combine multiple conditions with `&` (and) or `|` (or) — each condition
needs its own parentheses, which trips people up the first few times:

```python
print(df[(df["Region"] == "West") & (df["Units Sold"] > 100)])
```

```output
    Product Region  Units Sold  Revenue
0  Widget A   West         120   2400.0
2  Widget C   West         200   5000.0
```

Regular Python's `and`/`or` keywords don't work here — Pandas specifically
needs `&` and `|`, with parentheses around each condition, because it's
evaluating the comparison row by row rather than as one single True/False
value.

## Key terms

| Term | Meaning |
|---|---|
| `df[["A", "B"]]` | Selects multiple columns, given as a list |
| `df[condition]` | Filters rows to only those where the condition is `True` |
| `&` / `\|` | "And" / "or" for combining filter conditions |

## Lab

1. Rebuild the `df` from this lesson's example (or reuse Lesson 8's CSV).
2. Select just `Product` and `Units Sold` into their own DataFrame.
3. Filter to rows where `Region` equals `"West"` **or** `Revenue` is
   greater than `4000`, using `|`.

## Check yourself

You're ready for Lesson 10 when you can filter a DataFrame by two
combined conditions from memory, and explain why `&`/`|` are required
instead of Python's regular `and`/`or`.
