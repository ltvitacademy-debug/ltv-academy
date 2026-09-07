# Lesson 17 — Joining Data with Pandas

**Chapter 5 · Transforming & Analyzing Data · Lesson 17 of 20**

## What you'll learn

- `pd.merge()` — combining two DataFrames into one, using a shared column
- Relating this directly to a SQL `JOIN`, which you may already know
- `how="left"` vs `how="inner"` — the two join types worth knowing first
- Why this matters before data ever reaches Power BI's relationship view

## `pd.merge()`: combining two tables

Real data rarely lives in one table. `pd.merge()` combines two
DataFrames using a shared column — exactly the relationship concept
Chapter 4 of the main Power BI course spent a whole chapter on, just
expressed in Python instead of a drag-and-drop relationship line:

```python
import pandas as pd

products = pd.DataFrame({
    "Product": ["Widget A", "Widget B", "Widget C"],
    "Category": ["Hardware", "Hardware", "Software"]
})

sales = pd.DataFrame({
    "Product": ["Widget A", "Widget B", "Widget A"],
    "Revenue": [2400.00, 1700.00, 800.00]
})

merged = pd.merge(sales, products, on="Product", how="left")
print(merged)
```

```output
    Product  Revenue  Category
0  Widget A   2400.0  Hardware
1  Widget B   1700.0  Hardware
2  Widget A    800.0  Hardware
```

`on="Product"` tells Pandas which column both tables share — the same
role a relationship's key column plays in Power BI's model view.

## If you know SQL, this is `JOIN`

`pd.merge()` is Pandas' name for what SQL calls a `JOIN`. If you've
written T-SQL against `AdventureWorks` or `Northwind`, this line:

```python
pd.merge(sales, products, on="Product", how="left")
```

does the same job as:

```sql
SELECT sales.*, products.Category
FROM sales
LEFT JOIN products ON sales.Product = products.Product
```

Same relationship, same result, different syntax entirely.

## `how="left"` vs. `how="inner"`

The `how` argument controls what happens to rows that *don't* find a
match:

| `how` | Keeps |
|---|---|
| `"left"` | Every row from the first (left) table, matched category or not |
| `"inner"` | Only rows that find a match in *both* tables |

`"left"` is the safer default when you want to keep every sales row even
if a product's category is somehow missing. `"inner"` is right when a
missing match genuinely means the row shouldn't be included at all —
match the choice to what a missing row actually means, the same judgment
call Lesson 11 asked for with missing values generally.

## Key terms

| Term | Meaning |
|---|---|
| `pd.merge()` | Combines two DataFrames using a shared column |
| `on="Column"` | The shared column both DataFrames are joined on |
| `how="left"` | Keeps every row from the first table, matched or not |
| `how="inner"` | Keeps only rows with a match in both tables |

## Lab

1. Build two small DataFrames that share one column, similar to
   `products` and `sales` above.
2. Merge them with `how="left"`, and confirm every row from the first
   table survived.
3. Merge the same two DataFrames again with `how="inner"`, and compare
   the row count to the `"left"` result.

## Check yourself

Chapter 5 is complete when you can merge two DataFrames on a shared
column, explain the difference between `"left"` and `"inner"`, and
relate `pd.merge()` back to a SQL `JOIN` in one sentence.
