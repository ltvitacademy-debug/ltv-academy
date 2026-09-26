# Creating New Features

A model can only learn from the columns you hand it. Raw columns are often not the most useful form of the information: a timestamp is a huge number to an algorithm, a total is meaningless without the item count, and a heavily skewed income column drowns out everyone except the top earners. **Feature engineering** is the craft of turning raw columns into inputs that make the pattern easier to learn. It is often the highest-return work in a whole project, and you already have the tools: it is mostly pandas.

## What you'll learn

- Why new features can help even when no new data is collected
- Four reliable recipes: date parts, ratios, transforms, and bins
- How to keep engineered features honest, so they don't leak the answer

## Start with a small illustrative table

Imagine four retail orders with an order date, an order total, an item count, and the customer's annual income. All numbers here are illustrative.

```python
import pandas as pd, numpy as np
df = pd.DataFrame({
    "order_date": pd.to_datetime(
        ["2024-01-05", "2024-03-16",
         "2024-07-04", "2024-12-24"]),
    "total": [120.0, 45.5, 300.0, 80.0],
    "items": [4, 1, 6, 2],
    "income": [32000, 54000, 250000, 71000]})
```

## Recipe 1: pull apart dates

A date is one column but hides many signals: the month (seasonality), the day of the week, whether it falls on a weekend. Pandas exposes these through the `.dt` accessor.

```python
df["month"] = df["order_date"].dt.month
df["is_weekend"] = df["order_date"].dt.dayofweek >= 5
```

## Recipe 2: ratios and differences

Two columns often say more together than apart. Order total divided by item count gives the average item price, a customer-behavior signal neither column shows alone.

```python
df["avg_item_price"] = df["total"] / df["items"]
```

Other common ones: time since last purchase, debt-to-income, clicks per visit.

## Recipe 3: transform skewed values

Income is right-skewed: a few very large values stretch the scale. A log transform compresses the tail. `np.log1p` computes log(1 + x), which is safe when a value can be zero.

```python
df["log_income"] = np.log1p(df["income"]).round(2)
```

## Recipe 4: bin continuous values

Sometimes the *band* matters more than the exact number. `pd.cut` turns a continuous column into categories.

```python
df["income_band"] = pd.cut(df["income"],
    [0, 50000, 100000, np.inf],
    labels=["low", "mid", "high"])
```

Binning throws information away, so use it when you have a real reason to believe thresholds matter. Remember that a new categorical column then needs encoding, which you saw earlier in this chapter.

Running the five new columns on our four orders gives:

```
   month  is_weekend  avg_item_price  log_income income_band
0      1       False            30.0       10.37         low
1      3        True            45.5       10.90         mid
2      7       False            50.0       12.43        high
3     12       False            40.0       11.17         mid
```

Row 1 is a Saturday, which is why `is_weekend` is True there.

## Keep engineered features honest

Three guardrails apply every time:

1. **Only use information available at prediction time.** A feature like "total refunds this year" computed after the fact would leak the future, the problem from the data leakage lesson.
2. **Compute learned quantities on the training set only.** Simple row-wise formulas like a ratio are safe. Anything that uses a statistic across rows, like a mean or a bin edge learned from data, must be fit on the training split.
3. **Test whether it helped.** A new feature is a hypothesis. Compare validation performance with and without it, and keep it only if it earns its place.

## Recap

Feature engineering reshapes information you already have: split dates, combine columns into ratios, tame skew with logs, and bin when bands matter. Guard against leakage, and let validation scores decide what to keep. Next, since you can now create many features, you need a way to choose among them: feature selection.
