# Creating & Transforming Columns

Raw data rarely has exactly the columns your analysis needs. You compute totals, flag categories, bucket numbers into bands and fix types. In SQL that is the `SELECT` list with expressions and `CASE WHEN`. In pandas you create new columns by assignment. This lesson covers the six moves you will use constantly.

We continue with the illustrative `orders` table from the last two lessons. To keep the original safe, we work on a copy:

```python
o = orders.copy()
```

## What you'll learn

- Creating a column from arithmetic on other columns
- Conditional columns with `np.where` and `np.select`
- Recoding values with `map`, and bucketing numbers with `pd.cut`
- Changing types with `astype`, plus `rename` and `drop`
- Using `assign` to build columns in a chain
- Why the missing-value trap in conditions matters

## New columns from arithmetic

Assign to a column name that does not exist yet and pandas creates it. The math is vectorized, so it applies to every row at once:

```python
o["amount_with_tax"] = (o["amount"] * 1.08).round(2)
o[["order_id", "amount", "amount_with_tax"]].head(3)
```

```
   order_id  amount  amount_with_tax
0         1  120.50           130.14
1         2   89.99            97.19
2         3   45.00            48.60
```

The 1.08 tax rate is an illustrative number. Notice that the missing amount on order 5 simply stays missing (`NaN`) after the math. Missing values propagate through arithmetic instead of raising an error.

## Conditional columns: np.where

The SQL `CASE WHEN` maps to `np.where(condition, value_if_true, value_if_false)`:

```python
import numpy as np

o["size"] = np.where(o["amount"] >= 100, "large", "small")
```

For three or more categories use `np.select`, which takes a list of conditions and a list of results, checked in order:

```python
conditions = [o["amount"] >= 200, o["amount"] >= 100]
np.select(conditions, ["big", "medium"], default="small")
```

The result for our eight orders is `medium, small, small, big, small, small, medium, small`. Because conditions are checked in order, put the strictest first.

Here is the trap. Order 5 has a missing amount, and `NaN >= 100` is False, so order 5 was labeled `"small"` in the output above. That is a silent wrong answer. When missing values matter, handle them explicitly, for example with another condition on `o["amount"].isna()` and a label such as `"unknown"`.

## Recoding values with map

`map` translates each value using a dictionary, which is handy for grouping codes into cleaner categories:

```python
o["status"].map({"shipped": "done",
                 "returned": "issue",
                 "cancelled": "issue",
                 "pending": "open"})
```

Any value not in the dictionary becomes `NaN`, so check your mapping covers everything.

## Bucketing numbers with pd.cut

`pd.cut` sorts numbers into bands. You give it the edges and a label for each band:

```python
pd.cut(o["amount"], bins=[0, 75, 150, 1000],
       labels=["low", "mid", "high"])
```

Amounts 0 to 75 are `low`, above 75 up to 150 are `mid`, and above 150 up to 1000 are `high`. Intervals are closed on the right by default, so an amount of exactly 75 is `low`. The missing amount stays `NaN`.

## Types, names and unwanted columns

```python
o["amount"] = o["amount"].fillna(0)        # replace missing with 0
o["order_id"] = o["order_id"].astype(str)  # number to text
o.rename(columns={"amount": "total"})
o.drop(columns=["customer_id"])
```

`astype` converts a column's data type. `rename` and `drop` return a new DataFrame; they do not change `o` unless you assign the result back. Filling missing amounts with 0 here is only to demonstrate the method. In real analysis, that is a decision to make on purpose, and we cover it in the data cleaning chapter.

## apply: the general-purpose tool

`apply` runs a function on each value:

```python
o["amount"].apply(lambda x: x * 2)
```

It works, but it is slower than vectorized math and harder to read. If you can write the same thing as arithmetic, `np.where` or `map`, do that instead and keep `apply` for logic that truly has no vectorized form.

## assign: building columns in a chain

`assign` returns a new DataFrame with the extra column, which lets you chain steps without changing the original:

```python
orders.assign(amount_k=orders["amount"] / 1000)
```

## A warning about copies

If you filter first and then add a column to the result, pandas may print a `SettingWithCopyWarning`:

```python
sub = orders[orders["amount"] > 100]
sub["flag"] = 1     # warning
```

Fix it by making an explicit copy when you filter: `sub = orders[orders["amount"] > 100].copy()`.

## Recap

Create columns by assigning arithmetic, use `np.where` or `np.select` for conditions, `map` and `pd.cut` for recoding and banding, and `astype`, `rename` and `drop` for housekeeping. Prefer vectorized operations over `apply`, and remember that missing values can slip through conditions silently. Next: sorting, ranking and counting values.
