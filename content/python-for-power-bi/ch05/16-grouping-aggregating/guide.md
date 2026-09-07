# Lesson 16 — Grouping & Aggregating

**Chapter 5 · Transforming & Analyzing Data · Lesson 16 of 20**

## What you'll learn

- `.groupby()` — collapsing many rows into one row per group
- Choosing an aggregation: sum, mean, or count
- `.agg()` — getting several aggregations from one groupby at once
- Why this is the Pandas equivalent of a Power BI matrix visual

## `.groupby()`: one row per group

`.groupby()` splits a DataFrame into groups based on a column's values,
then applies an aggregation — a calculation that collapses many rows
into one — to each group separately:

```python
import pandas as pd

df = pd.DataFrame({
    "Region": ["West", "East", "West", "South", "East"],
    "Revenue": [2400.00, 1700.00, 5000.00, 800.00, 1200.00]
})

print(df.groupby("Region")["Revenue"].sum())
```

```output
Region
East     2900.0
South     800.0
West     7400.0
Name: Revenue, dtype: float64
```

Every `West` row's `Revenue` got added together into one number. This is
the exact same idea as dragging `Region` into a matrix visual's rows and
`Revenue` into its values — Power BI does this constantly, usually
without you thinking about "grouping" as a separate step.

## Choosing an aggregation

`.sum()` is one choice among several — swap it for `.mean()` (average) or
`.count()` (how many rows), depending on what question you're actually
answering:

```python
print(df.groupby("Region")["Revenue"].mean())
```

```output
Region
East     1450.0
South     800.0
West     3700.0
Name: Revenue, dtype: float64
```

## `.agg()`: several aggregations at once

Rather than running `.groupby()` three separate times for sum, mean, and
count, `.agg()` computes all of them together:

```python
print(df.groupby("Region")["Revenue"].agg(["sum", "mean", "count"]))
```

```output
           sum    mean  count
Region                       
East    2900.0  1450.0      2
South    800.0   800.0      1
West    7400.0  3700.0      2
```

One line, one pass over the data, three answers — genuinely faster than
three separate `.groupby()` calls, and easier to read side by side.

## Key terms

| Term | Meaning |
|---|---|
| `.groupby(col)` | Splits a DataFrame into groups based on a column's values |
| Aggregation | A calculation (sum, mean, count) that collapses a group into one value |
| `.agg([...])` | Computes several aggregations for the same groups at once |

## Lab

1. Rebuild the `df` from this lesson's example (or reuse an earlier
   lesson's data).
2. Group by `Region` and compute the sum of `Revenue`.
3. Use `.agg()` to get sum, mean, and count together in one line, and
   note which region actually has the most transactions, not just the
   highest total.

## Check yourself

You're ready for Lesson 17 when you can explain, in one sentence, why
`.groupby("Region")["Revenue"].sum()` is doing the same conceptual job
as a Power BI matrix visual with `Region` in rows and `Revenue` in
values.
