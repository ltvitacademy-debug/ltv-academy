# GroupBy & Aggregation

If you take one idea from this course into your daily work, make it this one. `groupby` is how you turn a table of individual events into a table of answers: revenue per customer, orders per month, average basket by segment. It is the pandas version of SQL's `GROUP BY`, and the mental model carries over almost exactly.

The illustrative `orders` table used here has `order_id`, `customer_id`, `order_date` (already parsed as dates), `amount` and `status`. Order 5 has a missing amount.

## What you'll learn

- The split-apply-combine idea behind `groupby`
- Aggregating with `sum`, `mean`, `count` and `size`
- Named aggregation with `agg` for tidy, multi-metric summaries
- Grouping by several columns
- `transform`, which keeps the original row count

## Split, apply, combine

Every `groupby` does three things. It **splits** the rows into groups by the values of a column, **applies** a function to each group, and **combines** the results into one table. Nothing is computed until you apply something:

```python
orders.groupby("status")["amount"].sum()
```

```
status
cancelled     60.00
pending        0.00
returned      45.00
shipped      795.73
Name: amount, dtype: float64
```

Read it left to right: group by `status`, take the `amount` column, sum it. You can swap `sum` for `mean`, `min`, `max`, `median` or `std`.

## Missing values: size versus count

Order 5 is the only pending order, and its amount is missing. Look at how the different functions treat it:

```python
orders.groupby("status")["amount"].sum()    # pending: 0.00
orders.groupby("status")["amount"].mean()   # pending: NaN
orders.groupby("status").size()             # pending: 1
orders.groupby("status")["amount"].count()  # pending: 0
```

`sum` skips missing values, so a group with only missing values sums to 0.00, which can look like real data. `mean` correctly has nothing to average and returns `NaN`. And there is a key difference between `size()`, which counts rows, and `count()`, which counts non-missing values in a column. Use `size()` when you mean "how many orders" and `count()` when you mean "how many amounts were recorded".

## Several metrics at once: named aggregation

`agg` with keyword arguments gives you readable, named output columns. Each argument has the form `new_name=(column, function)`:

```python
summary = orders.groupby("customer_id").agg(
    n_orders=("order_id", "count"),
    total=("amount", "sum"),
    avg=("amount", "mean"),
    last_order=("order_date", "max"),
)
```

```
             n_orders   total      avg last_order
customer_id
101                 2  165.50   82.750 2024-01-15
102                 2  149.99   74.995 2024-03-09
103                 2  509.99  254.995 2024-03-01
104                 1    0.00      NaN 2024-02-11
105                 1   75.25   75.250 2024-02-14
```

This one table is a customer summary: order count, total spend, average order and most recent order date. It is the seed of a customer feature table you will build again in the machine-learning courses.

## Grouping by several columns

Pass a list to group by combinations:

```python
orders.groupby(["customer_id", "status"])["amount"].sum()
```

The result has a two-level index. Call `reset_index()` to flatten it into ordinary columns. Alternatively, pass `as_index=False` to `groupby` and the group columns stay as regular columns from the start:

```python
orders.groupby("status", as_index=False)["amount"].sum()
```

You can also group by a computed value, such as the month of each order:

```python
orders.groupby(orders["order_date"].dt.month)["amount"].sum()
```

which gives 255.49 for month 1, 385.25 for month 2 and 259.99 for month 3.

## transform: results that keep the row count

`agg` shrinks the table to one row per group. Sometimes you want the group's number attached to every original row, for example to compute each order's share of its customer's total. That is `transform`:

```python
orders["cust_total"] = orders.groupby("customer_id")["amount"].transform("sum")
orders["share"] = orders["amount"] / orders["cust_total"]
```

Order 1 (120.50) is about 0.73 of customer 101's 165.50, and order 3 is about 0.27. This is the pandas equivalent of a SQL window function like `SUM(amount) OVER (PARTITION BY customer_id)`.

## Ranking groups

Chain a sort onto the result to find the top groups:

```python
orders.groupby("customer_id")["amount"].sum().sort_values(ascending=False).head(3)
```

Customer 103 leads with 509.99, then 101 with 165.50, then 102 with 149.99.

## Recap

`groupby` splits, applies and combines. Use `agg` with named arguments for readable multi-metric summaries, remember that `size` counts rows while `count` counts non-missing values, and use `transform` when you need group-level numbers on every row. Next: combining tables with merge, join and concat.
