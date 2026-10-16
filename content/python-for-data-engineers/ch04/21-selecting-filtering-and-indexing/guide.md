# Lesson 21 — Selecting, Filtering & Indexing

**Chapter 4 · Python for Data Engineers · Lesson 21 of 48**

## What you'll learn

- Selecting one or more columns from a DataFrame
- Boolean filtering — using a condition to pull out matching rows,
  including this dataset's two real problem rows
- Combining multiple conditions with `&` and `|`
- `.loc[]` for label-based lookup, including after `set_index()`

## Selecting columns

```python
import pandas as pd

df = pd.read_csv("orders.csv")

print(df["customer_name"].head(3))
print(df[["order_id", "product", "quantity"]].head(3))
```

```
0    Dana Whitfield
1       Marcus Ibeh
2    Dana Whitfield
Name: customer_name, dtype: object

   order_id             product  quantity
0      1001    Trail Runner GTX         2
1      1002      Alpine 2P Tent         1
2      1003  Summit Daypack 22L         1
```

A single column name (`df["customer_name"]`) returns a `Series`; a
*list* of column names (`df[["order_id", "product", "quantity"]]`)
returns a smaller `DataFrame` with just those columns. That one extra
set of brackets is the entire difference, and it's a common place to
get a confusing error if you forget it.

## Boolean filtering: finding this dataset's real issues

```python
negative_qty = df[df["quantity"] < 0]
print(negative_qty)
```

```
   order_id  customer_id customer_name region              product   category  quantity  unit_price  order_date   status
13     1014          502   Marcus Ibeh   East  Insulated Bottle 1L  Accessories        -1        22.0  2026-01-14  Shipped
```

`df["quantity"] < 0` produces a Series of `True`/`False` values, one
per row — passing that Series back into `df[...]` keeps only the rows
where it's `True`. This is the exact same negative-quantity row
(`1014`) you found with `csv.DictReader` in Lesson 14 — pandas just
finds it in one line instead of a manual loop.

```python
cancelled = df[df["status"] == "Cancelled"]
print(cancelled[["order_id", "customer_name", "product"]])
```

```
   order_id   customer_name          product
3      1004  Priya Nandan  Trail Runner GTX
```

## Combining conditions with & and |

```python
west_shipped = df[(df["region"] == "West") & (df["status"] == "Shipped")]
print(len(west_shipped))
```

```
7
```

Every one of the 7 West-region orders in this dataset happens to be
`Shipped` (none were cancelled or returned), so `west_shipped` matches
all 7 West rows. Each condition needs its own parentheses when
combined with `&` (and) or `|` (or) — leaving them off is a common
source of confusing errors, because Python's operator precedence
doesn't do what you'd expect with bare `==` next to `&`.

## .loc[]: label-based lookup

```python
df_indexed = df.set_index("order_id")
print(df_indexed.loc[1005])
```

```
customer_id                504
customer_name              NaN
region                     West
product          Camp Stove Duo
category                Camping
quantity                      3
unit_price                 45.25
order_date         2026-01-06
status                   Shipped
Name: 1005, dtype: object
```

`set_index("order_id")` replaces the default `0, 1, 2, ...` index with
`order_id` itself, so `.loc[1005]` means "the row *labeled* `1005`" —
not "row number 1005" (`.iloc[]` is the position-based equivalent, and
would raise an error here since there are only 20 rows). Notice
`customer_name` prints as `NaN` — pandas' way of representing a
missing value, which is exactly what that blank field in the raw CSV
became. Lesson 22 deals with that `NaN` properly.

## Key terms

| Term | Meaning |
|---|---|
| `df["col"]` | Selects one column as a Series |
| `df[["col1", "col2"]]` | Selects multiple columns as a smaller DataFrame |
| Boolean filtering | `df[condition]` keeps only rows where `condition` is `True` |
| `&` / `\|` | Combine multiple conditions (each needs its own parentheses) |
| `.loc[label]` | Label-based row lookup (by index value, not position) |
| `.iloc[pos]` | Position-based row lookup (by integer position, regardless of index) |
| `NaN` | Pandas' representation of a missing value |

## Lab

Filter `orders.csv` for rows where `category == "Camping"` **and**
`quantity >= 2`, and print the result. You should get exactly 2 rows:
order `1005` (quantity 3) and order `1016` (quantity 2).

```python
df = pd.read_csv("orders.csv")
big_camping_orders = df[(df["category"] == "Camping") & (df["quantity"] >= 2)]
print(big_camping_orders[["order_id", "product", "quantity"]])
```

## Check yourself

Without looking back: what's the difference between `df["col"]` and
`df[["col"]]`? And why does combining two conditions with `&` require
wrapping each one in its own parentheses?
