# Merging, Joining & Concatenating

Real analysis rarely lives in one table. Orders are in one place, customer details in another, and monthly files arrive separately. In SQL you combine tables with `JOIN` and `UNION ALL`. pandas has the same two ideas: `merge` for joining side by side on a key, and `concat` for stacking tables on top of each other.

Because you already know join types from T-SQL, we will not re-teach them. The focus here is the pandas syntax and the pitfalls specific to it.

## What you'll learn

- `merge` with `on`, `how`, `left_on` and `right_on`
- Finding unmatched rows with `indicator=True`
- Guarding against accidental row multiplication with `validate`
- Stacking tables with `concat`, and when to use `ignore_index`
- Merging an aggregated summary back onto a detail table

## The tables

We use the illustrative `orders` table (8 rows) and a `customers` table with one extra customer, Fay Park (ID 106), who has not ordered yet. Customers 101 to 105 are as in earlier lessons.

## merge: the pandas JOIN

```python
m = orders.merge(customers, on="customer_id")
m[["order_id", "customer_id", "name", "city", "amount"]]
```

```
   order_id  customer_id        name    city  amount
0         1          101    Ava Chen  Austin  120.50
1         3          101    Ava Chen  Austin   45.00
2         2          102   Ben Ortiz  Boston   89.99
3         8          102   Ben Ortiz  Boston   60.00
4         4          103  Cara Singh  Austin  310.00
5         7          103  Cara Singh  Austin  199.99
6         5          104      Dan Wu  Denver     NaN
7         6          105   Eli Novak  Boston   75.25
```

The default is an inner join, so only rows with a match on both sides survive. Customer 106 has no orders and vanishes. Notice, too, that the output is ordered by customer rather than by order, so do not assume merge preserves your original row order in an inner join.

The `how` argument selects the join type, using the names you already know from SQL: `"inner"`, `"left"`, `"right"` and `"outer"`.

```python
left = customers.merge(orders, on="customer_id", how="left")
left[["customer_id", "name", "order_id", "amount"]]
```

Now all six customers appear, nine rows in total: eight matched rows plus Fay Park with `NaN` in the order columns. Also notice that `order_id` became a decimal (`1.0`, `3.0`) because a whole-number column that receives a missing value is converted to floats in pandas 1.x.

## Finding what did not match

Add `indicator=True` and pandas creates a `_merge` column saying where each row came from: `both`, `left_only` or `right_only`.

```python
c2 = customers.merge(orders, on="customer_id",
                     how="left", indicator=True)
c2[c2["_merge"] == "left_only"][["customer_id", "name"]]
```

This returns customer 106, Fay Park. It is the pandas version of a `LEFT JOIN ... WHERE right.key IS NULL` anti-join, and a great way to audit a join.

## Different key names and overlapping columns

If the key columns have different names, use `left_on` and `right_on`. Both key columns are kept in the result:

```python
o2 = orders.rename(columns={"customer_id": "cust_id"})
o2.merge(customers, left_on="cust_id", right_on="customer_id")
```

If both tables have a non-key column with the same name, pandas appends `_x` and `_y` to tell them apart. Control that with `suffixes=("_order", "_cust")` for names that mean something.

## The silent killer: row multiplication

If the key is duplicated on the "lookup" side, each matching row is repeated. Suppose the customers table accidentally contained Ava Chen (101) twice. Merging orders onto it would return 10 rows instead of 8, because each of Ava's two orders now matches two customer rows. Totals computed afterward would be inflated, and nothing would raise an error.

The `validate` argument turns that into a loud error:

```python
orders.merge(dup, on="customer_id", validate="m:1")
```

```
MergeError: Merge keys are not unique in right dataset; not a many-to-one merge
```

Here `"m:1"` says many orders to one customer. Other options are `"1:1"`, `"1:m"` and `"m:m"`. Get in the habit of checking row counts before and after every merge, and of using `validate`.

## Joining on the index

`join` is a shortcut for merging on the index. Set the key as the index on both sides and call `.join`, which defaults to a left join:

```python
orders.set_index("customer_id").join(customers.set_index("customer_id"))
```

Most people use `merge` for everything because it is explicit, and that is a fine rule.

## concat: stacking tables

Use `concat` when tables share the same columns and you want more rows, like `UNION ALL`. Pass a list:

```python
jan = orders[orders["order_date"] < "2024-02-01"]
rest = orders[orders["order_date"] >= "2024-02-01"]
pd.concat([jan, rest])
```

The result has all 8 rows. Each piece keeps its original index labels, which is fine here but produces duplicate labels when the pieces each start from 0. For example, stacking a one-row table under `customers` gives labels 0, 1, 2, 3, 4, 0. Add `ignore_index=True` to renumber from 0:

```python
pd.concat([customers, new_row], ignore_index=True)
```

If the columns differ, `concat` keeps all of them and fills gaps with `NaN`. That is convenient but can hide a typo in a column name, so check `.columns` afterward. Pass `axis=1` to place tables side by side instead, aligned on the index.

## Merge a summary back

A very common pattern is aggregate first, then merge the aggregate onto another table:

```python
tot = (orders.groupby("customer_id", as_index=False)["amount"].sum()
       .rename(columns={"amount": "total"}))
customers.merge(tot, on="customer_id", how="left")
```

Fay Park gets `NaN` for `total`, since she has no orders. Whether that should be 0 or stay missing is your call: for a "total spent" report you would likely fill it with 0.

## Recap

`merge` joins side by side with `on` and `how`; `indicator=True` audits unmatched rows; `validate` prevents silent row multiplication; and `concat` stacks tables, ideally with `ignore_index=True`. Always compare row counts before and after. Next: reshaping with pivot and melt.
