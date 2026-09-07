# Lesson 12 — Removing Duplicate Data

**Chapter 4 · Cleaning & Preparing Data · Lesson 12 of 20**

## What you'll learn

- `.duplicated()` — finding duplicate rows without removing anything yet
- `.drop_duplicates()` — actually removing them
- Checking specific columns for duplicates, not the whole row
- Why duplicates quietly break sums and counts in a report

## Why duplicates are dangerous, specifically

A duplicate row doesn't just look untidy — it silently inflates every
total built on top of it. Two identical rows for the same sale means
double-counted revenue, double-counted units sold, and a dashboard that's
confidently wrong. Catching duplicates before they reach a Power BI model
matters more than it might seem from the data alone.

## `.duplicated()`: finding them first

`.duplicated()` returns `True`/`False` for every row — `True` marks a
row that's an exact repeat of an earlier one:

```python
import pandas as pd

df = pd.DataFrame({
    "Product": ["Widget A", "Widget B", "Widget A", "Widget C"],
    "Revenue": [2400.00, 1700.00, 2400.00, 5000.00]
})

print(df.duplicated())
```

```output
0    False
1    False
2     True
3    False
```

Row `2` is flagged because it's an exact match of row `0` — same
`Product`, same `Revenue`. The *first* occurrence of a repeated row is
never flagged; only the repeats after it are.

## `.drop_duplicates()`: removing them

`.drop_duplicates()` removes every row `.duplicated()` would have flagged,
keeping the first occurrence:

```python
print(df.drop_duplicates())
```

```output
    Product  Revenue
0  Widget A   2400.0
1  Widget B   1700.0
3  Widget C   5000.0
```

## Checking specific columns, not the whole row

By default, both methods compare the **entire row**. Sometimes what
actually counts as "duplicate" is narrower — two rows sharing the same
`Product` even if `Revenue` genuinely differs. Pass a column list to
check only those columns:

```python
df.drop_duplicates(subset=["Product"])
```

This keeps only the first row for each unique `Product`, regardless of
what else differs between the rows — useful when you specifically want
one row per product, not one row per exact combination of every column.

## Key terms

| Term | Meaning |
|---|---|
| `.duplicated()` | Returns True for rows that exactly repeat an earlier row |
| `.drop_duplicates()` | Removes duplicate rows, keeping the first occurrence |
| `subset=[...]` | Narrows the duplicate check to specific columns only |

## Lab

1. Build a DataFrame with at least one exact duplicate row, similar to
   this lesson's example.
2. Run `.duplicated()` first, and confirm it flags the right row before
   removing anything.
3. Run `.drop_duplicates(subset=[...])` using just one column, and
   compare the result to running it with no `subset` at all.

## Check yourself

You're ready for Lesson 13 when you can explain, in one sentence, why
checking for duplicates before building a report matters more than it
might seem — and the difference between checking a whole row versus a
`subset` of columns.
