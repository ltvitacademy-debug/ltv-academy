# Missing Data: Diagnosis & Handling

Every real dataset has holes. A customer skips a form field, a system fails to record a value, or a join finds no matching row. In T-SQL these holes are `NULL`; in pandas they show up as `NaN` (or `None` in text columns). This lesson shows how to measure them, understand them, and decide what to do about them, in that order.

## What you'll learn

- How to count and locate missing values with `isna()`
- Why the *reason* a value is missing matters more than the technique you pick
- When to drop rows with `dropna()` and how `subset` limits the damage
- How to fill values with `fillna()`, including group-aware fills
- Why you should flag what you filled

## The practice data

All examples use this small, illustrative customer table (eight made-up rows):

```python
import pandas as pd
import numpy as np

customers = pd.DataFrame({
    "customer_id": [101, 102, 103, 104, 105, 106, 107, 108],
    "city": ["Atlanta", "Austin", None, "Atlanta",
             "Denver", "Austin", None, "Denver"],
    "age": [34, np.nan, 29, 41, np.nan, 52, 38, 45],
    "monthly_spend": [220.0, 180.5, np.nan, 310.0,
                      95.0, np.nan, 150.0, 275.0],
})
```

## Step 1: Measure the gaps

`isna()` returns True wherever a value is missing. Because True counts as 1, `sum()` counts gaps and `mean()` gives the share:

```python
customers.isna().sum()
# customer_id      0
# city             2
# age              2
# monthly_spend    2

customers.isna().mean().round(2)
# city / age / monthly_spend all 0.25
```

To see the actual rows, use the result as a filter, the same idea as `WHERE age IS NULL`:

```python
customers[customers["age"].isna()]
#    customer_id    city  age  monthly_spend
# 1          102  Austin  NaN          180.5
# 4          105  Denver  NaN           95.0
```

## Step 2: Ask why

Data people describe three broad situations:

- **Missing by chance.** Gaps are random and unrelated to anything else. Dropping them rarely biases your results.
- **Missing by pattern.** The gap depends on another column. Compare groups to test this:

```python
customers.groupby(customers["age"].isna())["monthly_spend"].mean()
# age
# False    238.75
# True     137.75
```

In this tiny illustrative table, customers with no recorded age spend much less on average. That is a pattern, and filling blindly could hide it.

- **Missing means something.** A blank `cancel_date` may simply mean the customer is still active. Here the gap is information, not an error.

## Step 3: Drop, carefully

```python
customers.dropna(subset=["monthly_spend"]).shape   # (6, 4)
customers.dropna().shape                           # (3, 4)
```

Dropping on one column keeps six rows. Dropping any row with any gap keeps only three, more than half the data gone. Always use `subset` to name the columns that matter, and check how many rows you lost.

## Step 4: Fill, and leave a trail

```python
c = customers.copy()
c["age_missing"] = c["age"].isna()             # flag first
c["age"] = c["age"].fillna(c["age"].median())  # 39.5
c["city"] = c["city"].fillna("Unknown")
```

The median is a good default for numbers with a few extreme values; a label like `"Unknown"` keeps text gaps explicit. For a smarter fill, use each row's group:

```python
c2 = customers.copy()
c2["monthly_spend"] = c2["monthly_spend"].fillna(
    c2.groupby("city")["monthly_spend"].transform("median")
)
```

One gotcha we saw when running this: row 103 has no city, so it belongs to no group and its `monthly_spend` stays `NaN`. Fills only work when the grouping column is present, so fill the group key first if you need every row covered.

## Recap

- `isna().sum()` and `isna().mean()` measure missing data; filtering on `isna()` shows the rows.
- Diagnose the reason before choosing a fix.
- `dropna(subset=[...])` removes rows; `fillna(...)` replaces gaps with a value.
- Flag filled values, and record what you did so the analysis stays honest.
