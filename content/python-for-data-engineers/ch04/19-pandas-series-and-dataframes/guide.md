# Lesson 19 — Pandas Series & DataFrames

**Chapter 4 · Python for Data Engineers · Lesson 19 of 48**

## What you'll learn

- `pandas.Series` — a labeled, 1-D array — and how it differs from a
  plain Python list
- `pandas.DataFrame` — a 2-D table of columns, each one a Series —
  and how it differs from the list-of-dicts you built with
  `csv.DictReader` in Chapter 3
- `df.shape`, `df.dtypes`, and `df.head()` as your first checks on any
  new DataFrame
- A first real look at this chapter's running example: `orders.csv`

This chapter uses the same `orders.csv` file Chapter 3 did — the
20-row order export with a missing customer name on order `1005` and
a negative quantity on order `1014`. Pandas is how you'll actually
clean and analyze it at scale, instead of writing the row-by-row loops
Chapter 3 used.

## pandas.Series: a labeled 1-D array

```python
import pandas as pd

prices = pd.Series([129.99, 249.50, 79.00, 45.25], name="unit_price")
print(prices)
```

```
0    129.99
1    249.50
2     79.00
3     45.25
Name: unit_price, dtype: float64
```

A `Series` looks like a list, but every value has a label — the
left-hand column, called the **index** — not just a position. Here
pandas assigned the default `0, 1, 2, 3`, but an index can be anything
(order IDs, dates, customer names), which matters once you start
filtering and joining data in later lessons. `dtype: float64` tells
you every value in this Series is stored as a 64-bit float, something
a plain Python list has no equivalent concept of — a list can mix
types freely, a Series (and every column of a DataFrame) cannot.

## pandas.DataFrame: a table of Series

```python
sample = pd.DataFrame({
    "order_id": [1001, 1002, 1003],
    "product": ["Trail Runner GTX", "Alpine 2P Tent", "Summit Daypack 22L"],
    "quantity": [2, 1, 1],
    "unit_price": [129.99, 249.50, 79.00],
})
print(sample)
```

```
   order_id              product  quantity  unit_price
0      1001     Trail Runner GTX         2      129.99
1      1002       Alpine 2P Tent         1      249.50
2      1003  Summit Daypack 22L         1       79.00
```

A `DataFrame` is a 2-D table — rows and columns — where each column is
its own `Series` with its own `dtype`, all sharing one row index. This
is the structure Chapter 3's `csv.DictReader` output was always
heading toward: a list of 20 dicts is awkward to filter, sort, or
aggregate; a DataFrame built from the same data gives you all of that
for free, as you'll see starting in Lesson 21.

## A first look at the real file

```python
df = pd.read_csv("orders.csv")

print(df.shape)
print(df.dtypes)
```

```
(20, 10)

order_id         int64
customer_id      int64
customer_name   object
region          object
product         object
category        object
quantity         int64
unit_price     float64
order_date      object
status          object
dtype: object
```

`pd.read_sql()` and `pd.read_csv()` share the same spirit you saw back
in Chapter 2's SQL lesson — hand pandas a source, get a ready-to-use
DataFrame back, with types already inferred. `df.shape` is
`(rows, columns)` — 20 orders, 10 columns, matching the file exactly.
Notice pandas inferred `quantity` as a real `int64` column (not
strings, the way `csv.DictReader` left it) — and also notice it did
**not** complain about the negative `-1` on order `1014`, because `-1`
is a perfectly valid integer. Pandas infers *type*, not *correctness*
— finding business-rule problems like that is still your job, covered
properly in Lesson 22.

```python
print(df.head(3))
```

```
   order_id  customer_id   customer_name region             product   category  quantity  unit_price  order_date   status
0      1001          501   Dana Whitfield   West    Trail Runner GTX   Footwear         2      129.99  2026-01-03  Shipped
1      1002          502     Marcus Ibeh   East      Alpine 2P Tent    Camping         1      249.50  2026-01-04  Shipped
2      1003          501   Dana Whitfield   West  Summit Daypack 22L      Packs         1       79.00  2026-01-05  Shipped
```

`df.head(3)` is the pandas equivalent of Lesson 13's `readline()` loop
— a quick, safe peek at the start of a dataset before you commit to
processing all of it. The rest of this chapter builds on this exact
`df`, loading it more carefully (Lesson 20), filtering it (Lesson 21),
cleaning its two real problems (Lesson 22), and aggregating it
(Lesson 24).

## Key terms

| Term | Meaning |
|---|---|
| `Series` | A labeled, 1-D array; one column of a DataFrame, or a standalone sequence |
| `DataFrame` | A 2-D table of columns, each a Series, sharing one row index |
| Index | The labels on a Series/DataFrame's rows — not just position |
| `dtype` | The data type pandas stores a column as (`int64`, `float64`, `object`, etc.) |
| `df.shape` | A `(rows, columns)` tuple describing a DataFrame's size |

## Lab

Build your own 3-item `pd.Series` of order quantities taken from the
first three rows of `orders.csv` (`2, 1, 1`), named `"quantity"`, and
print its `dtype` and `.sum()`. Then run `pd.read_csv("orders.csv")`
and confirm `df.shape` matches `(20, 10)` and `df.dtypes["quantity"]`
reports `int64`.

```python
qty = pd.Series([2, 1, 1], name="quantity")
print(qty.dtype)
print(qty.sum())
```

## Check yourself

Without looking back: what's the actual structural difference between
a `Series` and a `DataFrame`? And why didn't `pd.read_csv()` flag
order `1014`'s `quantity` of `-1` as a problem when it inferred
column types?
