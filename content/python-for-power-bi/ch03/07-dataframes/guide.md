# Lesson 7 — Understanding DataFrames

**Chapter 3 · Pandas Basics · Lesson 7 of 20**

## What you'll learn

- The four parts of a DataFrame, named properly
- What a Series actually is — and why pulling one column gives you one
- The index — the part of a DataFrame that surprises people most
- Three quick ways to inspect any DataFrame without printing the whole thing

## The four parts of a DataFrame

Every DataFrame you build or import in this course has exactly four
parts:

| Part | What it is |
|---|---|
| **Rows** | One record each — one product, one customer, one transaction |
| **Columns** | One named field each, shared across every row |
| **Index** | The row labels down the left — numbers by default, starting at `0` |
| **Values** | The actual data sitting at each row/column intersection |

```python
import pandas as pd

data = {
    "Product": ["Widget A", "Widget B", "Widget C"],
    "Units Sold": [120, 85, 200],
    "Revenue": [2400.00, 1700.00, 5000.00]
}
df = pd.DataFrame(data)
print(df)
```

```output
    Product  Units Sold  Revenue
0  Widget A         120   2400.0
1  Widget B          85   1700.0
2  Widget C         200   5000.0
```

## Series: one column, pulled out

Pull a single column out of a DataFrame with square brackets, and it stops
being a DataFrame — it becomes a **Series**, Pandas' name for one column
of labeled data on its own:

```python
col = df["Revenue"]
print(col)
```

```output
0    2400.0
1    1700.0
2    5000.0
Name: Revenue, dtype: float64
```

A DataFrame is really just several Series lined up side by side, sharing
the same index — which is exactly what Lesson 5's "dictionary of lists"
description was pointing at all along.

## The index — what trips people up

The **index** — those `0`, `1`, `2` labels down the left — is not a column.
It doesn't count toward your column total, and by default it's just
row position, not meaningful data. But it *can* be replaced with something
meaningful (a date, a customer ID), which later lessons on filtering and
grouping will make real use of. For now, just recognize it on sight and
don't mistake it for a real column of data.

## Three quick inspection tools

Before doing anything to a real dataset, these three checks tell you what
you're working with, without printing every row:

```python
print(df.shape)
# (3, 3)  -> 3 rows, 3 columns

print(df.columns)
# Index(['Product', 'Units Sold', 'Revenue'], dtype='object')

print(df.dtypes)
# Product        object
# Units Sold      int64
# Revenue       float64
```

`.dtypes` matters especially — Lesson 13 is built entirely around what
happens when a column's type isn't what you expected.

## Key terms

| Term | Meaning |
|---|---|
| DataFrame | A full table — rows, columns, index, and values together |
| Series | One column of a DataFrame, pulled out on its own |
| Index | The row labels — not a column, and not counted as data |
| `.shape` | Returns (row count, column count) |
| `.dtypes` | Returns each column's data type |

## Lab

1. Rebuild the `df` from Lesson 6's lab (or this lesson's example).
2. Pull one column out into its own variable with `df["ColumnName"]`, and
   confirm with `type()` that it's a Series, not a DataFrame.
3. Run `.shape`, `.columns`, and `.dtypes` on your DataFrame, and write
   down, in your own words, what each one told you.

## Check yourself

You're ready for Lesson 8 when you can name all four parts of a
DataFrame from memory, and explain why the index isn't counted as one of
its columns.
