# Lesson 34 — Transformation Logic & Data Validation

**Chapter 6 · Python for Data Engineers · Lesson 34 of 48**

## What you'll learn

- Validating data before transforming it, not after
- Handling `orders.csv`'s two real data-quality problems: a missing name and a negative quantity
- Raising clear errors versus silently dropping bad rows — and when to choose each
- Logging what the Transform stage actually did

## Two real problems in orders.csv

Open the dataset from Lesson 32 and look closely at two rows:

```
1005,504,,West,Camp Stove Duo,Camping,3,45.25,2026-01-06,Shipped
1014,502,Marcus Ibeh,East,Insulated Bottle 1L,Accessories,-1,22.00,2026-01-14,Shipped
```

Order `1005` has no `customer_name` — the field between the two commas
is empty. Order `1014` has a `quantity` of `-1`, which isn't physically
meaningful for a shipped order. Neither of these would raise a Python
error on their own — `pd.read_csv()` happily loads both rows — which is
exactly why validation has to be a deliberate step, not something you
get for free.

## Validate first, separately from cleaning

```python
import pandas as pd

def validate_orders(df):
    issues = []
    if df["customer_name"].isna().any():
        bad_ids = df.loc[df["customer_name"].isna(), "order_id"].tolist()
        issues.append(f"Missing customer_name for order_id(s): {bad_ids}")
    if (df["quantity"] <= 0).any():
        bad_ids = df.loc[df["quantity"] <= 0, "order_id"].tolist()
        issues.append(f"Non-positive quantity for order_id(s): {bad_ids}")
    return issues
```

`validate_orders()` only reports problems — it doesn't fix anything.
Running it against `orders.csv` returns two issues, naming `order_id`
1005 and 1014 specifically, which is far more useful for debugging than
a transform step that silently drops rows with no record of why.

## Deciding what to do about each issue

```python
def clean_orders(df):
    df = df.copy()

    missing_name_mask = df["customer_name"].isna()
    df.loc[missing_name_mask, "customer_name"] = "Unknown Customer"

    bad_quantity_mask = df["quantity"] <= 0
    dropped = df.loc[bad_quantity_mask, "order_id"].tolist()
    df = df[~bad_quantity_mask]

    print(f"Flagged {missing_name_mask.sum()} row(s) with unknown customer name.")
    print(f"Dropped {len(dropped)} row(s) with non-positive quantity: {dropped}")
    return df
```

These two problems get different treatment on purpose. A missing name
is recoverable — flag it as `"Unknown Customer"` and keep the row,
since the order itself is still real. A negative quantity isn't
something you can safely guess a correct value for, so that row gets
dropped and logged, rather than silently kept with bad data in it.

## Raising instead of dropping, when the stakes are higher

```python
def clean_orders_strict(df):
    if (df["quantity"] <= 0).any():
        bad_ids = df.loc[df["quantity"] <= 0, "order_id"].tolist()
        raise ValueError(f"Invalid quantity for order_id(s): {bad_ids}")
    return df
```

Dropping bad rows is the right call for a report that should still run
with partial data. For a pipeline feeding a billing system, silently
dropping a row with a negative quantity might be the wrong call
entirely — `raise ValueError` stops the pipeline and forces a human to
look, instead of quietly loading incomplete data somewhere downstream.

## Combining validate and clean in the Transform stage

```python
def transform(df):
    issues = validate_orders(df)
    for issue in issues:
        print(f"Validation issue: {issue}")
    return clean_orders(df)
```

## Key terms

| Term | Meaning |
|---|---|
| Validation | Detecting and reporting data problems, without necessarily fixing them |
| Cleaning | Deciding what to do about each validated problem — fix, flag, drop, or raise |
| `raise ValueError` | Stops the pipeline immediately when a problem is too risky to silently handle |

## Lab

Run `validate_orders()` against `orders.csv` and confirm it reports
both order `1005` and order `1014` by their real `order_id`.

## Check yourself

You're ready for Lesson 35 when you can explain, without looking: why
`orders.csv`'s two problems get different treatment, and when raising
an error is the right call instead of dropping a row.
