# Lesson 15 — Creating Calculated Columns

**Chapter 5 · Transforming & Analyzing Data · Lesson 15 of 20**

## What you'll learn

- Creating a new column from existing ones, in a single line
- Building `Profit` and `Profit Margin %` from `Revenue` and `Cost`
- Rounding a calculated result to something actually readable
- How this compares to a Power Query custom column or a DAX calculated column

## Creating a column from existing ones

Assigning to a column name that doesn't exist yet creates it — no special
function required, just the same assignment syntax from Lesson 4, applied
to a whole column of values at once:

```python
import pandas as pd

df = pd.DataFrame({
    "Product": ["Widget A", "Widget B", "Widget C"],
    "Revenue": [2400.00, 1700.00, 5000.00],
    "Cost": [1400.00, 900.00, 3000.00]
})

df["Profit"] = df["Revenue"] - df["Cost"]
print(df)
```

```output
    Product  Revenue    Cost  Profit
0  Widget A   2400.0  1400.0  1000.0
1  Widget B   1700.0   900.0   800.0
2  Widget C   5000.0  3000.0  2000.0
```

Pandas applies the subtraction row by row, automatically — no loop, no
manually repeating the calculation for every row yourself.

## Building a second column from the first

Calculated columns can reference other calculated columns, including
ones you just created in the line before:

```python
df["Profit Margin %"] = ((df["Profit"] / df["Revenue"]) * 100).round(1)
print(df)
```

```output
    Product  Revenue    Cost  Profit  Profit Margin %
0  Widget A   2400.0  1400.0  1000.0             41.7
1  Widget B   1700.0   900.0   800.0             47.1
2  Widget C   5000.0  3000.0  2000.0             40.0
```

`.round(1)` keeps the result to one decimal place — a small habit worth
building now, since an unrounded float column full of `41.666666666...`
is genuinely harder to read at a glance than `41.7`.

## How this compares to Power Query and DAX

You've built this exact pattern twice already, in different tools:

| Tool | How |
|---|---|
| **Power Query** | Add Column → Custom Column, writing an M formula |
| **DAX** | A calculated column, referencing other columns with square brackets |
| **Pandas** | `df["NewCol"] = ` an expression using other `df["Col"]` references |

All three do the same underlying thing — compute a new value for every
row, from other columns in that same row — just with different syntax
and at a different point in the pipeline.

## Key terms

| Term | Meaning |
|---|---|
| Calculated column | A new column computed from existing columns, one value per row |
| `.round(n)` | Rounds a numeric column to `n` decimal places |

## Lab

1. Rebuild the `df` from this lesson's example.
2. Add a `Profit` column, then a `Profit Margin %` column built from it,
   rounded to one decimal place.
3. Add a third calculated column of your own — something that combines
   at least two existing columns in a new way.

## Check yourself

You're ready for Lesson 16 when you can build a calculated column from
two existing columns, then a second calculated column that references
the first one — from memory, without looking back at this page.
