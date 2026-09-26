# Sorting, Ranking & Value Counts

Three of the quickest questions you can ask of a table are: what are the biggest items, how do they rank, and how often does each category appear? In SQL those are `ORDER BY`, `RANK()` and `GROUP BY ... COUNT(*)`. pandas has direct answers to all three, and the last one, `value_counts`, is probably the most-typed method in exploratory analysis.

We use the illustrative `orders` table from the previous lessons.

## What you'll learn

- Sorting by one or several columns, ascending or descending
- Where missing values land when you sort
- `nlargest` and `nsmallest` as a top-N shortcut
- Ranking, and how the tie-handling methods differ
- `value_counts` for frequency tables and proportions

## Sorting with sort_values

```python
orders.sort_values("amount")
```

Ascending is the default. The smallest amount, 45.00, comes first, and order 5, whose amount is missing, comes last. pandas puts missing values at the end by default, whichever direction you sort. Change that with `na_position="first"`.

For a descending sort, pass `ascending=False`:

```python
orders.sort_values("amount", ascending=False).head(3)
```

```
   order_id  customer_id  order_date  amount   status
3         4          103  2024-02-02  310.00  shipped
6         7          103  2024-03-01  199.99  shipped
0         1          101  2024-01-05  120.50  shipped
```

Sort by several columns by passing lists. Each column can have its own direction, just like `ORDER BY status ASC, amount DESC`:

```python
orders.sort_values(["status", "amount"],
                   ascending=[True, False])
```

This groups the rows alphabetically by status and, within each status, puts the largest amounts first.

Notice that the row labels on the left keep their original values (3, 6, 0 above). Sorting reorders rows but does not renumber the index. If you want a fresh 0, 1, 2 index, add `.reset_index(drop=True)`.

## Top-N shortcuts

When all you need is the biggest or smallest few, `nlargest` and `nsmallest` say so directly:

```python
orders.nlargest(3, "amount")
orders.nsmallest(2, "amount")
```

The first returns orders 4, 7 and 1; the second returns orders 3 and 8. Both skip missing values.

## Ranking

`rank` assigns each row its position in the ordering, which is the pandas version of `RANK()` in SQL. Rank 1 is the smallest unless you say otherwise, so for "biggest amount is rank 1" pass `ascending=False`:

```python
orders["rank"] = orders["amount"].rank(ascending=False)
```

```
   order_id  amount  rank
0         1  120.50   3.0
1         2   89.99   4.0
3         4  310.00   1.0
4         5     NaN   NaN
```

Order 4 is rank 1. Missing values get no rank. The ranks are floats such as 3.0, because averaging ties can produce halves.

### Handling ties

Ties are where the options matter. Take a small Series with two 10s: `[10, 10, 20, 30]`.

- `method="average"` (the default): 1.5, 1.5, 3, 4
- `method="min"`: 1, 1, 3, 4, like SQL's `RANK()`
- `method="dense"`: 1, 1, 2, 3, like SQL's `DENSE_RANK()`
- `method="first"`: 1, 2, 3, 4, ties broken by row order, like `ROW_NUMBER()`

Choose the method that matches how your business defines "rank".

## Counting categories with value_counts

```python
orders["status"].value_counts()
```

```
shipped      5
returned     1
pending      1
cancelled    1
Name: status, dtype: int64
```

Counts come back sorted from most to least common. Pass `normalize=True` for proportions instead:

```python
orders["status"].value_counts(normalize=True)
```

```
shipped      0.625
returned     0.125
pending      0.125
cancelled    0.125
```

So 62.5 percent of these illustrative orders shipped. By default `value_counts` leaves out missing values; pass `dropna=False` to count them too. Sort the result alphabetically by category with `.sort_index()`.

To turn the result into a regular two-column table, call `reset_index()`. Be aware that the column names it produces differ between pandas versions (in pandas 1.4, used here, the categories land in a column called `index`), so rename explicitly with `rename(columns=...)` if your code depends on the names.

## Recap

`sort_values` orders rows (missing values go last by default), `nlargest` and `nsmallest` give quick top-N lists, `rank` assigns positions with a tie-handling `method`, and `value_counts` builds a frequency table in one line. Next: working with dates and times.
