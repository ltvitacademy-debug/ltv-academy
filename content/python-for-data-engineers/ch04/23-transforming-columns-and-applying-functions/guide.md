# Lesson 23 — Transforming Columns & Applying Functions

**Chapter 4 · Python for Data Engineers · Lesson 23 of 48**

## What you'll learn

- Creating a new column from existing ones with a vectorized operation
- `.apply()` with a `lambda`, for logic a simple arithmetic expression
  can't express
- `.clip()` for bounding a column's values
- The `.str` accessor for string operations across an entire column
- Why a vectorized operation is almost always better than `.apply()`
  when one is available

## A new column from a vectorized operation

```python
import pandas as pd

df = pd.read_csv("orders.csv")
df["line_total"] = df["quantity"] * df["unit_price"]
print(df[["order_id", "quantity", "unit_price", "line_total"]].head())
```

```
   order_id  quantity  unit_price  line_total
0      1001         2      129.99      259.98
1      1002         1      249.50      249.50
2      1003         1       79.00       79.00
3      1004         1      129.99      129.99
4      1005         3       45.25      135.75
```

`df["quantity"] * df["unit_price"]` multiplies every row's two values
together in one operation — no loop, no `.apply()` needed. This is
called a **vectorized** operation: pandas (via NumPy underneath)
applies the multiplication to the whole column at once, which is both
far faster and far more concise than looping row by row, and is
always preferred when the logic is simple arithmetic like this.

## .apply() with a lambda, for logic arithmetic can't express

```python
df["order_size"] = df["line_total"].apply(
    lambda total: "Large" if total >= 200 else "Standard"
)
print(df["order_size"].value_counts())
```

```
Standard    14
Large        6
```

`.apply()` runs a function (here, an inline `lambda`) once per value
in the Series. Unlike `line_total`'s multiplication, "Large if the
total is at least $200, otherwise Standard" isn't a single arithmetic
expression — it's a conditional — so `.apply()` is the right tool.
Six orders clear the $200 threshold in this dataset: `1001` ($259.98),
`1002` ($249.50), `1009` ($249.50), `1013` ($259.98), `1015` ($249.50),
and `1020` ($249.50) — all of them either a pair of Trail Runner GTX
boots or a single Alpine 2P Tent, the two priciest line items here.

## .clip(): bounding a column's values

Order `1014`'s `quantity` of `-1` is this dataset's other known
problem. One real fix, instead of dropping the row (Lesson 22's
approach), is clamping negative values up to a floor:

```python
df["quantity_clipped"] = df["quantity"].clip(lower=0)
print(df.loc[df["order_id"] == 1014, ["quantity", "quantity_clipped"]])
```

```
    quantity  quantity_clipped
13        -1                 0
```

`.clip(lower=0)` replaces any value below `0` with `0`, leaving every
other value untouched — useful when a negative in a quantity-like
column is known to be invalid, but you still want a numeric value
(here, `0`) rather than a missing row. Notice this doesn't retroactively
fix `line_total`, which was computed earlier from the original
`quantity` — order matters, and a real pipeline would clip (or
otherwise clean) a column *before* deriving new columns from it.

## The .str accessor: string operations across a column

```python
print(df["region"].str.upper().unique())
```

```
['WEST' 'EAST' 'SOUTH' 'NORTH']
```

`.str` exposes ordinary string methods (`.upper()`, `.strip()`,
`.contains()`, and more) applied across an entire column at once,
rather than one value at a time — `df["region"].str.upper()` is the
vectorized equivalent of calling `.upper()` on every value in a loop.

## Key terms

| Term | Meaning |
|---|---|
| Vectorized operation | An operation applied to a whole column at once (e.g. `df["a"] * df["b"]`) |
| `.apply(func)` | Runs a function once per value in a Series — for logic that isn't simple arithmetic |
| `lambda` | A small, unnamed inline function, often used inside `.apply()` |
| `.clip(lower=, upper=)` | Bounds a column's values to a minimum and/or maximum |
| `.str` accessor | Exposes string methods (`.upper()`, `.contains()`, etc.) across an entire column |

## Lab

Add a `price_tier` column to `orders.csv`, using `.apply()` with a
`lambda` that returns `"Budget"` if `unit_price < 50`, `"Mid"` if
`unit_price < 150`, and `"Premium"` otherwise. Then print
`df["price_tier"].value_counts()`.

```python
df["price_tier"] = df["unit_price"].apply(
    lambda price: "Budget" if price < 50 else ("Mid" if price < 150 else "Premium")
)
print(df["price_tier"].value_counts())
```

Check your counts against the data: `Camp Stove Duo` ($45.25, 3 orders)
and `Insulated Bottle 1L` ($22.00, 4 orders) are Budget (7 rows total);
`Trail Runner GTX` ($129.99, 5 orders) and `Summit Daypack 22L` ($79.00,
4 orders) are Mid (9 rows total); `Alpine 2P Tent` ($249.50, 4 orders)
is Premium (4 rows) — 7 + 9 + 4 = 20, matching the full dataset.

## Check yourself

Without looking back: why is `df["quantity"] * df["unit_price"]`
preferred over `.apply()` for computing `line_total`, when both would
technically produce the same result? And why didn't clipping `quantity`
after computing `line_total` change `line_total` for order `1014`?
