# Data Validation Checks

Cleaning fixes the problems you found. Validation proves the data now meets your expectations and keeps proving it every time new data arrives. In T-SQL you relied on constraints: `PRIMARY KEY`, `NOT NULL`, `CHECK`, `FOREIGN KEY`. A pandas DataFrame enforces none of those, so you write the checks yourself. Done well, they turn silent data problems into loud, specific failures.

## What you'll learn

- The five families of checks: unique, complete, in range, allowed values, and related
- How to express each check in one line of pandas
- How to find the offending rows, not just a yes/no answer
- How to bundle checks into a reusable `validate()` function
- How to stop a notebook or pipeline with `assert` when validation fails

## The practice data

Five illustrative order rows and a customers table. The orders contain several deliberate problems:

```python
import pandas as pd

orders = pd.DataFrame({
    "order_id": [5001, 5002, 5003, 5003, 5005],
    "customer_id": [101, 102, 999, 999, 105],
    "amount": [120.0, -15.0, 60.0, 60.0, 80.0],
    "status": ["shipped", "shipped", "pending",
               "pending", "delivered"],
    "order_date": pd.to_datetime(
        ["2024-03-01", "2024-03-02", "2024-03-05",
         "2024-03-05", "2099-01-01"]),
})
customers = pd.DataFrame({"customer_id": [101, 102, 103, 104, 105]})
```

## One-line checks

```python
orders["order_id"].is_unique                      # False
orders["amount"].notna().all()                    # True
orders["amount"].between(0, 10000).all()          # False
orders["status"].isin(["pending", "shipped", "delivered"]).all()   # True
orders["customer_id"].isin(customers["customer_id"]).all()         # False
(orders["order_date"] <= pd.Timestamp("2024-12-31")).all()         # False
```

- **Unique**: `is_unique` on a key column, the equivalent of a primary key.
- **Complete**: `notna().all()` for required columns, the equivalent of `NOT NULL`.
- **In range**: `between(low, high)`, the equivalent of a `CHECK` constraint. A missing value is not "between" anything, so `NaN` fails this check too.
- **Allowed values**: `isin([...])` against a fixed list.
- **Related**: `isin(other_table["key"])`, the equivalent of a foreign key. Here customer 999 does not exist.

## See the offending rows

A bare `False` tells you something is wrong but not what. Negate the check and use it as a filter:

```python
orders[~orders["amount"].between(0, 10000)]
#    order_id  customer_id  amount   status order_date
# 1      5002          102   -15.0  shipped 2024-03-02

orders[orders["order_id"].duplicated(keep=False)]
# rows 2 and 3, both order 5003
```

This is the output you hand to whoever owns the source system.

## Bundle the rules

Put every rule in one function that returns a named True/False result:

```python
def validate(df, customers):
    checks = {
        "order_id is unique": df["order_id"].is_unique,
        "no missing amount": df["amount"].notna().all(),
        "amount between 0 and 10000":
            df["amount"].between(0, 10000).all(),
        "status in allowed set":
            df["status"].isin(["pending", "shipped", "delivered"]).all(),
        "customer_id exists":
            df["customer_id"].isin(customers["customer_id"]).all(),
        "no future dates":
            (df["order_date"] <= pd.Timestamp("2024-12-31")).all(),
    }
    return pd.Series(checks, name="passed")
```

Running it on the sample gives:

```
order_id is unique            False
no missing amount              True
amount between 0 and 10000    False
status in allowed set          True
customer_id exists            False
no future dates               False
```

## Fail loudly

```python
report = validate(orders, customers)
failed = report[~report].index.tolist()
assert not failed, f"Validation failed: {failed}"
# AssertionError: Validation failed: ['order_id is unique',
#   'amount between 0 and 10000', 'customer_id exists',
#   'no future dates']
```

The `assert` stops the notebook (or a script) right there, so bad data never flows into a model or a dashboard. The message says exactly which rules broke.

## Good habits

- **Fail fast**: validate immediately after loading and after each major transformation.
- **Show the rows**, not only a count of failures.
- **Keep rules in one place** so they evolve with the data.
- Libraries such as pandera and Great Expectations build on the same idea with richer reporting; consult their current documentation when you want them (they are not required for this course).

## Recap

- Validation replaces the constraints a database would give you.
- Five families: unique, complete, in range, allowed values, related.
- `is_unique`, `notna()`, `between()`, `isin()` cover most checks; negate them to get the bad rows.
- A `validate()` function plus `assert` makes failures loud and specific.
