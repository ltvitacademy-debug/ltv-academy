# Window & Rolling Operations

Some questions cannot be answered one row at a time. What is the three-day moving average of sales? How much did revenue change since yesterday? What is each customer's running total? These all need a row to look at its neighbors. In SQL you use window functions like `AVG() OVER (ORDER BY ...)`, `LAG()` and a running `SUM()`. pandas has direct equivalents, and this lesson covers them.

## What you'll learn

- Moving averages and sums with `rolling`
- Running totals with `cumsum` and `expanding`
- Looking backward with `shift`, `diff` and `pct_change`
- Applying these per group, such as per customer

## A small time series

Here is one week of illustrative daily sales:

```python
daily = pd.DataFrame({
    "date": pd.date_range("2024-03-01", periods=7),
    "sales": [120, 135, 110, 160, 150, 90, 175],
})
```

**Important:** every operation in this lesson depends on row order. Sort by date first, and by date within each group when you use groups.

## rolling: moving windows

`rolling(3)` builds a window of the current row and the two before it. Follow it with an aggregation:

```python
daily["ma3"] = daily["sales"].rolling(3).mean()
```

```
        date  sales         ma3
0 2024-03-01    120         NaN
1 2024-03-02    135         NaN
2 2024-03-03    110  121.666667
3 2024-03-04    160  135.000000
4 2024-03-05    150  140.000000
5 2024-03-06     90  133.333333
6 2024-03-07    175  138.333333
```

The first two rows are `NaN` because a full window of three does not exist yet. Check the third row by hand: (120 + 135 + 110) / 3 = 121.67. If you would rather get a partial result at the start, pass `min_periods=1`, which gives 120.0 on day 1 and 127.5 on day 2, at the cost of averages built from fewer days.

You can use any aggregation: `.sum()`, `.max()`, `.std()` and so on. Moving averages smooth out daily noise so a trend is easier to see. Add `center=True` to place the window around each row instead of behind it, which is fine for smoothing a chart but leaks future information if you use it as a model feature.

For a date index, you can even give the window a time span, such as `rolling("3D")`, which is useful when days are missing.

## Running totals: cumsum and expanding

`cumsum` gives the running total from the first row to the current row:

```python
daily["running"] = daily["sales"].cumsum()
# 120, 255, 365, 525, 675, 765, 940
```

`cummax`, `cummin` and `cumprod` work the same way. `expanding().mean()` gives a running average, where the window grows by one row each step and always starts from the beginning.

## Looking backward: shift, diff, pct_change

`shift(1)` moves values down one row, so each row can see the previous row's value. It is the pandas `LAG()`. Negative numbers look forward, like `LEAD()`. `diff` subtracts the previous row, and `pct_change` gives the relative change:

```python
daily["prev"] = daily["sales"].shift(1)
daily["change"] = daily["sales"].diff()
daily["pct"] = daily["sales"].pct_change()
```

```
   sales   prev  change       pct
0    120    NaN     NaN       NaN
1    135  120.0    15.0  0.125000
2    110  135.0   -25.0 -0.185185
3    160  110.0    50.0  0.454545
4    150  160.0   -10.0 -0.062500
5     90  150.0   -60.0 -0.400000
6    175   90.0    85.0  0.944444
```

Day 2 was 12.5 percent above day 1; day 6 fell 40 percent. The first row has no previous value, so it is `NaN`. The same idea works on dates: `diff()` on a datetime column gives the gap between consecutive rows.

## Per customer: groupby plus window operations

These methods become much more powerful after `groupby`, because the calculation restarts for each group. Take the illustrative orders, sorted by customer and date:

```python
o = orders.sort_values(["customer_id", "order_date"]).copy()
g = o.groupby("customer_id")
o["cust_running"] = g["amount"].cumsum()
o["prev_amount"] = g["amount"].shift(1)
o["order_no"] = g.cumcount() + 1
o["days_since_prev"] = g["order_date"].diff().dt.days
```

```
   order_id  customer_id  amount  cust_running  prev_amount  days_since_prev
0         1          101  120.50        120.50          NaN              NaN
2         3          101   45.00        165.50       120.50             10.0
1         2          102   89.99         89.99          NaN              NaN
7         8          102   60.00        149.99        89.99             62.0
```

Customer 101 placed a second order 10 days after the first, and customer 102 waited 62 days. `cumcount()` numbers each customer's orders from 0, so adding 1 gives 1, 2, 3, the pandas `ROW_NUMBER() OVER (PARTITION BY ...)`. Time between orders, previous order value and order number are all classic features for customer models.

## Recap

`rolling(n)` computes moving statistics, `cumsum` and `expanding` accumulate, and `shift`, `diff` and `pct_change` compare a row to its neighbors. Always sort first, and combine with `groupby` so the window resets for each customer or product. Next: working with text data.
