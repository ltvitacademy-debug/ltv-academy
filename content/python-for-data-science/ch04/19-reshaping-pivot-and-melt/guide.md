# Reshaping: Pivot & Melt

The same information can be laid out in two shapes. In **long** format each row is one observation: one city, one month, one amount. In **wide** format each row is an entity and the categories spread across columns: one row per city with a column for each month. Databases and most plotting and modeling tools prefer long. Human-readable reports prefer wide. Reshaping is how you move between the two, and you will do it constantly.

## What you'll learn

- Long versus wide data
- `pivot_table` to summarize into a wide table (Excel PivotTable, in code)
- `pivot` for a pure reshape, and the duplicate-entries error
- `melt` to go from wide back to long
- `crosstab` for quick counts

## Setup

We merge the illustrative orders and customers tables and add a month column:

```python
m = orders.merge(customers, on="customer_id")
m["month"] = m["order_date"].dt.month
```

## pivot_table: summarize into a grid

`pivot_table` groups rows by an index, spreads another column across the columns, and aggregates the values. Total amount by city and order status:

```python
m.pivot_table(index="city", columns="status",
              values="amount", aggfunc="sum")
```

```
status  cancelled  pending  returned  shipped
city
Austin        NaN      NaN      45.0   630.49
Boston       60.0      NaN       NaN   165.24
Denver        NaN      0.0       NaN      NaN
```

Read it like an Excel PivotTable: cities down the side, statuses across the top, sums in the cells. A `NaN` means no orders existed for that combination. Denver's pending cell shows 0.0 rather than `NaN`, because a pending order exists there but its amount is missing, and `sum` treats missing values as 0. The same reading-with-care habit from the `groupby` lesson applies.

Useful options:

- `aggfunc` can be `"mean"`, `"count"`, or a list such as `["sum", "count"]`.
- `fill_value=0` replaces the `NaN` cells.
- `margins=True` adds an `All` row and column of totals.

```python
m.pivot_table(index="city", columns="month",
              values="amount", aggfunc="sum", margins=True)
```

```
month        1       2       3     All
city
Austin  165.50  310.00  199.99  675.49
Boston   89.99   75.25   60.00  225.24
Denver     NaN    0.00     NaN     NaN
All     255.49  385.25  259.99  900.73
```

The monthly totals in the bottom row (255.49, 385.25 and 259.99) match the resample results from the dates lesson, a good sanity check. Notice that Denver's `All` value shows `NaN` even though its month 2 cell shows 0.00. Both come from that one missing amount, and the two cells disagree, so treat totals for groups with missing data with suspicion and clean the missing values first.

## crosstab: quick counts

When you just want counts of combinations, `crosstab` is shorter:

```python
pd.crosstab(m["city"], m["status"])
```

That shows Austin with 1 returned and 3 shipped, Boston with 1 cancelled and 2 shipped, and Denver with 1 pending.

## pivot: reshape without aggregating

`pivot` rearranges values without summarizing, so each index and column combination must appear only once. First make a tidy monthly table, then pivot it wide:

```python
monthly = m.groupby(["city", "month"], as_index=False)["amount"].sum()
wide = monthly.pivot(index="city", columns="month", values="amount")
```

If a combination repeats, pandas refuses:

```python
m.pivot(index="city", columns="status", values="amount")
# ValueError: Index contains duplicate entries, cannot reshape
```

Austin has three shipped orders, so which amount should fill that one cell? That is the difference: `pivot` cannot decide, while `pivot_table` resolves duplicates with `aggfunc`. When in doubt, use `pivot_table`.

After pivoting, the city is the index and the months are columns. Call `reset_index()` to turn the index back into a normal column, and set `wide.columns.name = None` to remove the leftover `month` label on the columns.

## melt: from wide back to long

`melt` is the reverse. `id_vars` names the columns to keep as identifiers, and every other column is stacked into two new ones. Here is a wide table of sales per customer per quarter (illustrative):

```python
wide = pd.DataFrame({"customer_id": [101, 102],
                     "q1": [165.5, 149.99],
                     "q2": [0, 60]})
wide.melt(id_vars="customer_id",
          var_name="quarter", value_name="sales")
```

```
   customer_id quarter   sales
0          101      q1  165.50
1          102      q1  149.99
2          101      q2    0.00
3          102      q2   60.00
```

Long format like this is what `groupby`, plotting libraries and scikit-learn generally want, so `melt` is the tool for cleaning up spreadsheet-style exports where each month or year is its own column.

## Recap

Long tables have one observation per row; wide tables spread categories across columns. Use `pivot_table` to summarize into a grid (and to handle duplicates), `pivot` when each combination is unique, `crosstab` for counts, and `melt` to return to long format. Next: rolling and window calculations.
