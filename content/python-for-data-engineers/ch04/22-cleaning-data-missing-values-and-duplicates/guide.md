# Lesson 22 — Cleaning Data: Missing Values & Duplicates

**Chapter 4 · Python for Data Engineers · Lesson 22 of 48**

## What you'll learn

- `df.isna()` and `.sum()` to count missing values per column
- `.fillna()` vs. `.dropna()` — filling in a placeholder vs. removing
  the row entirely
- `df.duplicated()`, and why checking it on the wrong columns gives a
  dangerously wrong answer on this exact dataset
- Fixing both of `orders.csv`'s real problems — the missing name and
  the negative quantity — properly, with pandas

## Finding missing values with isna()

```python
import pandas as pd

df = pd.read_csv("orders.csv")
print(df.isna().sum())
```

```
order_id        0
customer_id     0
customer_name   1
region          0
product         0
category        0
quantity        0
unit_price      0
order_date      0
status          0
dtype: int64
```

`df.isna()` returns a same-shaped DataFrame of `True`/`False`; `.sum()`
on that counts the `True` values per column. Exactly one missing
value in this dataset, in `customer_name` — order `1005`, the same row
every chapter-3 lesson kept finding manually.

## Filling vs. dropping

```python
missing_row = df[df["customer_name"].isna()]
print(missing_row[["order_id", "customer_id", "customer_name"]])
```

```
   order_id  customer_id customer_name
4      1005          504          NaN
```

Customer `504` only appears on this one order, so there's no other
row to recover the real name from — a real limitation worth noticing,
not papering over. The honest fix is a clear placeholder, not a guess:

```python
df["customer_name"] = df["customer_name"].fillna("Unknown Customer")
print(df.loc[df["order_id"] == 1005, "customer_name"])
```

```
4    Unknown Customer
Name: customer_name, dtype: object
```

`.fillna(value)` replaces every `NaN` in that column with `value`.
The alternative, `.dropna(subset=["customer_name"])`, would remove
order `1005` entirely — the right call when a missing field makes a
row unusable, the wrong call when (like here) the rest of the row is
still perfectly good data you don't want to lose from a revenue
report just because a name is missing.

## Duplicates — and why the obvious check is wrong here

```python
print(df.duplicated().sum())
```

```
0
```

Zero exact duplicate rows — expected, since every row has a unique
`order_id`. But watch what happens if you check duplicates on the
*wrong* column:

```python
print(df.duplicated(subset=["customer_name"]).sum())
```

```
7
```

That's **not** 7 real duplicate orders — it's pandas (correctly)
noticing that several customer names repeat, because real customers
place more than one order: Dana Whitfield (3 orders), Marcus Ibeh (3),
and Priya Nandan, Elena Marsh, and Oren Castillo (2 each) account for
all 7 of those flagged rows. Checking `duplicated(subset=["customer_name"])`
would flag 2 of Dana Whitfield's 3 legitimately separate orders
(`1001`, `1003`, `1018`) as "duplicates" and tempt you to delete real,
valid sales. The subset that actually finds accidental duplicates here
is one that identifies a specific *order*, not a specific *customer*:

```python
print(df.duplicated(subset=["order_id"]).sum())
```

```
0
```

No duplicate `order_id`s — this dataset has no accidental repeats.
The lesson is the `subset` argument, not the method call: `duplicated()`
only tells you what you asked it to check.

## Fixing the negative quantity

A negative `quantity` isn't a missing value — `isna()` won't catch it
at all, since `-1` is a perfectly valid, non-null integer. It needs its
own explicit check, the same business-rule problem Lesson 16 caught
with a `raise`:

```python
bad_qty = df["quantity"] < 0
print(df.loc[bad_qty, ["order_id", "customer_name", "quantity"]])

df_clean = df[~bad_qty].copy()
print(len(df), "->", len(df_clean))
```

```
    order_id customer_name  quantity
13      1014   Marcus Ibeh        -1

20 -> 19
```

`~bad_qty` flips every `True`/`False` in the mask — "keep everything
that is *not* a bad quantity." `.copy()` after filtering avoids a
pandas warning about modifying a view of the original DataFrame later.

## Key terms

| Term | Meaning |
|---|---|
| `df.isna()` | Returns `True`/`False` per cell, marking missing values |
| `.fillna(value)` | Replaces missing values with `value`, keeping the row |
| `.dropna(subset=[...])` | Removes rows missing a value in the listed column(s) |
| `df.duplicated(subset=[...])` | Flags rows that repeat the values in `subset` |
| `~mask` | Inverts a boolean Series/mask (`True` becomes `False` and vice versa) |

## Lab

Build a single `df_clean` from `orders.csv` that: fills missing
`customer_name` values with `"Unknown Customer"`, and removes any row
with a negative `quantity`. Confirm `df_clean.isna().sum().sum() == 0`
and `len(df_clean) == 19`.

```python
df = pd.read_csv("orders.csv")
df["customer_name"] = df["customer_name"].fillna("Unknown Customer")
df_clean = df[df["quantity"] >= 0].copy()

print(df_clean.isna().sum().sum())
print(len(df_clean))
```

## Check yourself

Without looking back: why would checking `df.duplicated(subset=["customer_name"])`
on this dataset give a misleading answer, and what's the actual sign of
a genuine accidental duplicate here instead? Why doesn't `df.isna()`
catch order `1014`'s negative quantity?
