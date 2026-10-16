# Lesson 24 — groupBy() & Aggregation

**Chapter 4 · Python for Data Engineers · Lesson 24 of 48**

## What you'll learn

- `df.groupby()` — splitting a DataFrame into groups and summarizing
  each one
- Real, hand-checkable totals by `category` and by `region` from
  `orders.csv`
- `.agg()` with named aggregations, for several summary statistics at
  once
- Why a groupby run on unfiltered data silently includes rows you
  probably didn't mean to count

## Summing by category

```python
import pandas as pd

df = pd.read_csv("orders.csv")
df["line_total"] = df["quantity"] * df["unit_price"]

by_category = df.groupby("category")[["quantity", "line_total"]].sum()
print(by_category)
```

```
             quantity  line_total
category
Accessories         8      176.00
Camping             10     1269.50
Footwear             7      909.93
Packs                 5      395.00
```

`groupby("category")` splits the 20 rows into their 4 category groups,
then `[["quantity", "line_total"]].sum()` adds up those two columns
within each group. You can check `Footwear`'s $909.93 by hand: the 5
Footwear orders are `1001` ($259.98), `1004` ($129.99), `1008`
($129.99), `1013` ($259.98), and `1017` ($129.99) — add those five
line totals and you land on exactly $909.93.

## Summing by region, sorted

```python
by_region = df.groupby("region")["line_total"].sum().sort_values(ascending=False)
print(by_region)
```

```
region
West     1180.20
South     643.98
East      509.75
North     416.50
Name: line_total, dtype: float64
```

West leads with 7 orders totaling $1,180.20, and `.sort_values(ascending=False)`
orders the result biggest-first instead of alphabetically (`groupby()`'s
default). All four regional totals add up to $2,750.43 — the full
dataset's total `line_total`, including order `1004`'s cancelled sale
and order `1014`'s negative-quantity line. That's the catch covered
below.

## .agg() with named aggregations

```python
summary = df.groupby("category").agg(
    orders=("order_id", "count"),
    total_quantity=("quantity", "sum"),
    total_revenue=("line_total", "sum"),
    avg_order_value=("line_total", "mean"),
)
print(summary.round(2))
```

```
             orders  total_quantity  total_revenue  avg_order_value
category
Accessories       4                8         176.00            44.00
Camping            7               10        1269.50           181.36
Footwear           5                7         909.93           181.99
Packs              4                5         395.00            98.75
```

Named aggregation — `result_name=("source_column", "function")` — lets
you compute several different summary statistics in one call, each
with a clear output column name, instead of chaining several separate
`groupby()` calls. `avg_order_value` for `Accessories` ($44.00) is
exactly `176.00 / 4` — a plain Python check you can run yourself to
confirm `.agg()` isn't doing anything mysterious.

## The catch: groupby doesn't know which rows are "bad"

Lesson 22 found two real problems in this dataset: order `1004` is
`Cancelled`, order `1008` is `Returned`, and order `1014` has a
negative `quantity` (a data-entry error, not a real return). None of
the `groupby()` calls above excluded any of them — `Footwear`'s
$909.93 above *includes* the cancelled `1004` and the returned `1008`,
and `Accessories`' $176.00 *includes* `1014`'s `-$22.00` line
(pulling that category's total down, not up). If the real question is
"how much Footwear revenue actually shipped and stayed sold," the
correct approach is to filter first, then group:

```python
clean = df[(df["status"] == "Shipped") & (df["quantity"] >= 0)]
clean_by_category = clean.groupby("category")["line_total"].sum()
print(clean_by_category)
```

```
category
Accessories    198.00
Camping        1269.50
Footwear        649.95
Packs           395.00
Name: line_total, dtype: float64
```

`Footwear` drops from $909.93 to $649.95 once the cancelled order
`1004` ($129.99) and returned order `1008` ($129.99) are excluded —
a very different number, and the one that actually answers "revenue
from orders that shipped and stuck." `Accessories` moves the other
way, rising from $176.00 to $198.00, because excluding order `1014`'s
`-$22.00` line (the negative-quantity data error) removes a value that
was dragging that category's total down, not up.
`groupby()` will happily summarize whatever rows you hand it; deciding
*which* rows belong in the summary is still your job.

## Key terms

| Term | Meaning |
|---|---|
| `df.groupby(col)` | Splits a DataFrame into groups sharing the same value in `col` |
| `.sum()` / `.mean()` / `.count()` | Aggregation functions applied within each group |
| `.sort_values()` | Reorders a Series/DataFrame by its values instead of its index |
| `.agg(name=("col", "func"))` | Named aggregation — several summaries in one call, with clear output names |
| Filter-then-group | Removing rows that shouldn't count *before* aggregating, not after |

## Lab

Run `df.groupby("status")["order_id"].count()` on `orders.csv` and
confirm it reports `Cancelled: 1`, `Returned: 1`, `Shipped: 18`. Then
compute the clean, shipped-only, non-negative-quantity total revenue
across *all* categories (not grouped), and confirm it comes out to
`$2,512.45`.

```python
print(df.groupby("status")["order_id"].count())

clean = df[(df["status"] == "Shipped") & (df["quantity"] >= 0)]
print(clean["line_total"].sum())
```

## Check yourself

Without looking back: why did `Footwear`'s category total change from
$909.93 to $649.95 once you filtered before grouping — what two rows
caused that difference, and why? What does `.agg()`'s named syntax let
you do that chaining `.sum()`, `.mean()`, and `.count()` separately
doesn't make as clear?
