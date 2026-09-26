# Selecting & Filtering

In SQL you choose columns with `SELECT` and rows with `WHERE`. pandas does both jobs too, with different syntax. This lesson maps each SQL idea to its pandas equivalent, and introduces the one distinction that trips up almost every beginner: selecting by label with `loc` versus selecting by position with `iloc`.

We will work with the orders table from the last lesson, loaded into a DataFrame called `orders` (illustrative data).

## What you'll learn

- How to select one or several columns
- The difference between `loc` (labels) and `iloc` (positions)
- How to filter rows with a boolean condition
- Combining conditions with `&`, `|` and `~`, and why parentheses matter
- Handy filters: `isin`, `between`, `isna`, and `query`

## Selecting columns

One column in single brackets gives you a Series. A list of columns in double brackets gives you a DataFrame, which is the equivalent of naming columns in a `SELECT`:

```python
orders["amount"]                 # a Series
orders[["order_id", "amount"]]   # a DataFrame with two columns
```

## loc and iloc: label versus position

Both select rows and columns as `[rows, columns]`. The difference is what you give them.

`loc` works with labels. Our index labels happen to be 0 to 7:

```python
orders.loc[2]                              # row labeled 2
orders.loc[0:2, ["order_id", "status"]]
```

```
   order_id    status
0         1   shipped
1         2   shipped
2         3  returned
```

`iloc` works with integer positions, counting from zero, the way Python slices behave:

```python
orders.iloc[0:2, 0:3]    # first 2 rows, first 3 columns
orders.iloc[-1]          # the last row
```

```
   order_id  customer_id  order_date
0         1          101  2024-01-05
1         2          102  2024-01-07
```

Look closely at the two slices. `loc[0:2]` returned three rows, while `iloc[0:2]` returned two. Label slices in `loc` include the end point; position slices in `iloc` exclude it. That difference is behind many off-by-one bugs, so memorize it.

When the index is just 0, 1, 2 the two look alike. They diverge when the index is meaningful. Set `customer_id` as the index and `loc[103]` finds the customer whose ID is 103, not the row at position 103.

## Filtering rows with a boolean mask

Filtering is a two-step idea. First build a Series of True and False values, one per row. Then use it to keep only the True rows.

```python
mask = orders["amount"] > 100
orders[mask]
```

```
   order_id  customer_id  order_date  amount   status
0         1          101  2024-01-05  120.50  shipped
3         4          103  2024-02-02  310.00  shipped
6         7          103  2024-03-01  199.99  shipped
```

In practice you write it in one line: `orders[orders["amount"] > 100]`. The comparison is vectorized across the whole column, just like NumPy.

## Combining conditions

Use `&` for and, `|` for or, and `~` for not. Python's plain words `and`, `or` and `not` do not work on Series. Each condition **must** be wrapped in parentheses, because `&` binds more tightly than `>` and `==`:

```python
orders[(orders["amount"] > 100) &
       (orders["status"] == "shipped")]
```

This returns the same three rows as above, since all three big orders were shipped. Forgetting the parentheses raises an error, which is a very common first mistake.

## Handy filters

```python
# SQL's IN
orders[orders["status"].isin(["returned", "cancelled"])]

# SQL's NOT IN
orders[~orders["status"].isin(["shipped"])]

# SQL's BETWEEN (both ends inclusive)
orders[orders["amount"].between(50, 150)]

# SQL's IS NULL
orders[orders["amount"].isna()]
```

The `isin` filter returns orders 3 and 8. The `~isin` version returns orders 3, 5 and 8, including the pending order with the missing amount. The `between` filter returns orders 1, 2, 6 and 8. The `isna` filter returns order 5 only.

## query() for readable filters

`query` takes the condition as a string and reads a bit like SQL:

```python
orders.query("amount > 100 and status == 'shipped'")
```

Inside the string you can use plain `and` and `or`, and you skip the repeated `orders[...]`. Use whichever style you find clearer.

## Selecting rows and columns together

Filter and choose columns in one step with `loc`, putting the mask first:

```python
orders.loc[orders["amount"] > 100, ["order_id", "amount"]]
```

## Recap

Use `[["a", "b"]]` for columns, `loc` for labels and `iloc` for positions, remembering that `loc` slices include the end. Filter with a boolean mask, combine masks with `&`, `|` and `~` in parentheses, and reach for `isin`, `between`, `isna` and `query` for common patterns. Next you will create and transform columns.
