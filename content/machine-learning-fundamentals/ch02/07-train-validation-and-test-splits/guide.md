# Train, Validation & Test Splits

Chapter 1 kept returning to one rule: a model must be judged on data it has not seen. In practice that means deciding, before you fit anything, which rows are for learning and which are for judging. This lesson shows how to split data properly, and the small choices (stratifying, shuffling, respecting time) that separate an honest evaluation from a misleading one.

## What you'll learn

- The distinct jobs of the training, validation and test sets
- How to use `train_test_split`, including a three-way split
- What `stratify` does and why it matters for imbalanced targets
- When a random split is the wrong choice, for example with time-ordered data
- Why `random_state` belongs in every split

## Three sets, three jobs

- **Training set**: the rows the model learns from. `fit` sees only these.
- **Validation set**: rows used to compare models and choose settings (tree depth, learning rate, which features to keep). You may look at these scores as many times as you like.
- **Test set**: a final, one-time check of the chosen model. Because you never tuned anything against it, its score is an honest estimate of real-world performance.

A common starting point is 60% train, 20% validation, 20% test, or 70/15/15 for smaller datasets. With very little data you would use cross-validation instead of a fixed validation set, a technique the next course covers in depth. The principle stays the same: the data used to judge must be separate from the data used to learn, and the final judge must be untouched.

## A demo dataset

The table below is **illustrative**: 500 made-up customers with a churn flag (1 = left). Churn is uncommon, which makes this an imbalanced target, exactly where splitting needs care.

```python
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split

rng = np.random.default_rng(7)
n = 500
df = pd.DataFrame({
    "tenure_months": rng.integers(1, 60, n),
    "monthly_spend": rng.normal(80, 20, n).round(2),
    "signup_date": pd.date_range("2022-01-01", periods=n, freq="D"),
})
df["churned"] = (rng.random(n) < 0.08).astype(int)
X, y = df.drop(columns="churned"), df["churned"]
print("overall churn rate:", round(y.mean(), 3), " rows:", len(df))
```

```
overall churn rate: 0.09  rows: 500
```

(The rate is 0.09 rather than 0.08 because of random sampling in the generator.)

## Stratify to protect the class mix

A plain random split can, by bad luck, put too many or too few churners in the test set. With only about 45 churners in total, that swing is large. Passing `stratify=y` forces every split to keep the same class proportions.

```python
_, _, _, y_te = train_test_split(X, y, test_size=0.2, random_state=0)
_, _, _, y_te_s = train_test_split(X, y, test_size=0.2, random_state=0, stratify=y)
print("test churn rate, plain     :", round(y_te.mean(), 3), " count:", int(y_te.sum()))
print("test churn rate, stratified:", round(y_te_s.mean(), 3), " count:", int(y_te_s.sum()))
```

```
test churn rate, plain     : 0.13  count: 13
test churn rate, stratified: 0.09  count: 9
```

The plain split produced a test set with a 13% churn rate against a true 9%, so any metric computed on it would describe a different world. The stratified test set matches exactly.

To see how much luck is involved, repeat the plain and stratified splits with 300 different seeds and measure the churn rate of each test set:

```python
plain, strat = [], []
for seed in range(300):
    plain.append(train_test_split(y, test_size=0.2, random_state=seed)[1].mean())
    strat.append(train_test_split(y, test_size=0.2, random_state=seed, stratify=y)[1].mean())
print("std of test churn rate across 300 seeds  plain:", round(np.std(plain), 4),
      " stratified:", round(np.std(strat), 4))
```

```
std of test churn rate across 300 seeds  plain: 0.0253  stratified: 0.0
```

The plain split wanders by about two and a half points; the stratified one is pinned to the true rate. The histogram is the output of this code (styling omitted):

```python
import matplotlib.pyplot as plt
plt.hist(plain, bins=20, alpha=.7, label="plain split")
plt.hist(strat, bins=20, alpha=.7, label="stratified split")
plt.axvline(y.mean(), ls="--")
plt.xlabel("churn rate in the test set"); plt.legend(); plt.show()
```

## A three-way split

`train_test_split` only makes two pieces, so call it twice: first carve off the test set, then split the remainder into train and validation. Because 0.25 of the remaining 80% is 20% of the total, this gives 60/20/20.

```python
X_temp, X_test, y_temp, y_test = train_test_split(
    X, y, test_size=0.20, stratify=y, random_state=42)
X_train, X_val, y_train, y_val = train_test_split(
    X_temp, y_temp, test_size=0.25, stratify=y_temp, random_state=42)
print("train / val / test sizes:", len(X_train), len(X_val), len(X_test))
```

```
train / val / test sizes: 300 100 100
```

## When random is wrong

A random split assumes rows are interchangeable. That fails in two common situations:

- **Time-ordered data.** If you will predict the future, the test set must come from *after* the training set. Randomly mixing dates lets the model peek at the future. Sort by date and cut:

```python
df_sorted = df.sort_values("signup_date")
cut = int(len(df_sorted) * 0.8)
past, future = df_sorted.iloc[:cut], df_sorted.iloc[cut:]
print("train ends:", past["signup_date"].max().date(),
      " test starts:", future["signup_date"].min().date())
```

```
train ends: 2023-02-04  test starts: 2023-02-05
```

- **Grouped data.** If one customer appears in many rows, all of that customer's rows should land in the same set, or the model is tested on people it has already seen. scikit-learn has `GroupShuffleSplit` for this, and `TimeSeriesSplit` for repeated time-aware splits.

## Reproducibility

Always set `random_state`. Without it, every run shuffles differently, and you cannot tell whether a change in score came from your improvement or from a different split.

## Recap

Train to learn, validate to choose, test once to confirm. Stratify when the target is imbalanced, split by time when predicting the future, and keep groups together. Set a `random_state`. Next up, lesson 8: data leakage, the quiet mistake that breaks the wall between these sets.
