# Lesson 25 — Merging & Joining DataFrames

**Chapter 4 · Python for Data Engineers · Lesson 25 of 48**

## What you'll learn

- `df.merge()` — combining two DataFrames on a shared key, the pandas
  equivalent of a SQL join
- `how="left"` vs. `how="inner"`, and the concrete difference it makes
  on real rows
- Why a merge key that doesn't fully match produces `NaN`s on a left
  join, and silently drops rows on an inner join
- Enriching `orders.csv` with a small reference table you build
  yourself

## A clean merge: regions to warehouses

```python
import pandas as pd

df = pd.read_csv("orders.csv")

warehouses = pd.DataFrame({
    "region": ["West", "East", "South", "North"],
    "warehouse_city": ["Reno, NV", "Newark, NJ", "Atlanta, GA", "Minneapolis, MN"],
})

orders_with_warehouse = df.merge(warehouses, on="region", how="left")
print(orders_with_warehouse[["order_id", "region", "warehouse_city"]].head())
```

```
   order_id region warehouse_city
0      1001   West       Reno, NV
1      1002   East     Newark, NJ
2      1003   West       Reno, NV
3      1004  South    Atlanta, GA
4      1005   West       Reno, NV
```

`merge(warehouses, on="region", how="left")` is the pandas equivalent
of a SQL `LEFT JOIN ... ON orders.region = warehouses.region` — every
row of `orders.csv` (the "left" DataFrame) keeps its place, and gets
`warehouse_city` attached from whichever `warehouses` row shares its
`region`. All four of `orders.csv`'s regions (`West`, `East`, `South`,
`North`) exist in `warehouses`, so this particular merge adds exactly
one new column and loses nothing — `orders_with_warehouse` still has
20 rows, same as `df`.

## When the merge key doesn't fully match

A real reference table isn't always this complete. Suppose a shipping
system only has priority rules for three of the four product
categories:

```python
priority = pd.DataFrame({
    "category": ["Footwear", "Camping", "Packs"],  # Accessories missing on purpose
    "ship_priority": ["Standard", "Standard", "Standard"],
})

left = df.merge(priority, on="category", how="left")
print(left["ship_priority"].isna().sum())
print(len(left))
```

```
4
20
```

Four rows end up with `ship_priority` as `NaN` — the four
`Accessories` orders (`1006`, `1010`, `1014`, `1018`), since
`Accessories` never appears in `priority`. `how="left"` still kept
all 20 rows (it always keeps every row from the left DataFrame), it
just couldn't find a match for those four, so it filled the new
column with `NaN` instead of dropping anything.

```python
inner = df.merge(priority, on="category", how="inner")
print(len(inner))
```

```
16
```

`how="inner"` keeps only rows where the key matched **on both
sides** — so all 4 `Accessories` orders disappear entirely, dropping
you from 20 rows to 16. This is the real danger of `how="inner"`: it's
easy to lose rows silently, with no `NaN` warning sign the way a left
join gives you. If you only ever check `len(result)` without comparing
it back to the source, an `inner` merge that's quietly dropping real
orders is easy to miss.

## Choosing how= deliberately

| `how=` | Keeps | Use when |
|---|---|---|
| `"left"` | Every row from the left DataFrame | You want to keep all of your main data, flagging gaps as `NaN` |
| `"inner"` | Only rows matching on both sides | You specifically want to exclude anything without a match |
| `"right"` | Every row from the right DataFrame | Rare — same as swapping which DataFrame you call `.merge()` on |
| `"outer"` | Every row from both, matched or not | You want to see every mismatch from both sides, `NaN`s and all |

For enriching `orders.csv` with a lookup table like `warehouses`,
`"left"` is almost always the right default — you're adding
information to orders you already have, not filtering which orders
exist.

## Key terms

| Term | Meaning |
|---|---|
| `df.merge(other, on=, how=)` | Combines two DataFrames on a shared column, pandas' version of a SQL join |
| `on="col"` | The shared column both DataFrames are matched on |
| `how="left"` | Keeps every row from the calling DataFrame; unmatched rows get `NaN` |
| `how="inner"` | Keeps only rows with a match in both DataFrames — can silently drop rows |
| `NaN` after a merge | A sign the merge key had no match on the other side for that row |

## Lab

Merge `orders.csv` with the `warehouses` DataFrame from this lesson
using both `how="left"` and `how="inner"`, and confirm both produce
exactly 20 rows with no `NaN` in `warehouse_city` — proving that,
unlike the `priority` example, every region here has a matching
warehouse.

```python
left_result = df.merge(warehouses, on="region", how="left")
inner_result = df.merge(warehouses, on="region", how="inner")

print(len(left_result), len(inner_result))
print(left_result["warehouse_city"].isna().sum())
```

## Check yourself

Without looking back: why did the `priority` merge's `how="left"`
version keep all 20 rows while `how="inner"` dropped to 16 — what
happened to the 4 missing rows in each case? And why is a `NaN`
appearing after a left merge actually useful information, rather than
just a problem to hide?
