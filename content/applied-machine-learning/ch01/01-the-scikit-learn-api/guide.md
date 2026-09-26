# The scikit-learn API

Welcome to Applied Machine Learning. In Machine Learning Fundamentals you learned what the main algorithms do and why models overfit. This course is about the next step: doing the work the way a professional team does it. That means repeatable workflows, honest evaluation, careful tuning, messy data, and models you can save, reload, and defend. The tool for all of it is **scikit-learn**, and the good news is that its whole design rests on one small, consistent interface. Learn it once and every model in the library feels familiar.

## What you'll learn

- The `fit` / `predict` / `score` pattern that every scikit-learn model shares
- How to go from a DataFrame to a trained model in a handful of lines
- Why swapping one algorithm for another is usually a one-line change
- The conventions for inputs (`X`, `y`) and for what a model learns (attributes ending in `_`)

## The illustrative dataset

Every lesson in this chapter uses the same small, made-up customer table so you can focus on the workflow. Save the helper below as `customers.py`; later lessons import it. All numbers are illustrative.

```python
import numpy as np
import pandas as pd

def make_customers(n=1000, seed=42):
    rng = np.random.default_rng(seed)
    df = pd.DataFrame({
        "age": rng.integers(18, 71, n).astype(float),
        "tenure_months": rng.integers(1, 72, n),
        "monthly_spend": rng.gamma(4.0, 20.0, n).round(2),
        "support_calls": rng.poisson(1.5, n),
        "plan": rng.choice(["basic", "standard", "premium"],
                           n, p=[0.5, 0.3, 0.2]),
        "region": rng.choice(["north", "south", "east", "west"], n),
    })
    logit = (-0.9 - 0.05 * df["tenure_months"]
             + 0.55 * df["support_calls"]
             + 0.012 * (df["monthly_spend"] - 80)
             + df["plan"].map({"basic": 0.8, "standard": 0.0,
                               "premium": -0.7}))
    p = 1 / (1 + np.exp(-logit))
    df["churned"] = (rng.random(n) < p).astype(int)
    df.loc[rng.random(n) < 0.06, "age"] = np.nan
    df.loc[rng.random(n) < 0.05, "monthly_spend"] = np.nan
    df.loc[rng.random(n) < 0.04, "plan"] = np.nan
    return df
```

It builds 1,000 customers with a `churned` label (about 24% churn) and a few deliberately missing values, because real data is never clean. In this lesson we ignore the missing values by using only two complete numeric columns.

## The four-step pattern

Every supervised model in scikit-learn is used the same way: create it, `fit` it on training data, `predict` on new data, and `score` it.

```python
from customers import make_customers
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

df = make_customers()
X = df[["tenure_months", "support_calls"]]
y = df["churned"]
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, stratify=y, random_state=0)

model = LogisticRegression()
model.fit(X_train, y_train)
print(model.predict(X_test.head(3)))
print(model.predict_proba(X_test.head(3)).round(3))
print(round(model.score(X_test, y_test), 3))
```

Output:

```
[1 0 0]
[[0.448 0.552]
 [0.859 0.141]
 [0.865 0.135]]
0.768
```

A few things to notice:

- **`X` is a table of features, `y` is the answer column.** `X` is two-dimensional (rows by columns); `y` is one-dimensional. DataFrames and NumPy arrays both work.
- **`fit(X_train, y_train)` learns.** It changes the model in place and returns the model itself.
- **`predict` returns a class per row.** `predict_proba` returns one probability column per class, in the order of `model.classes_` (here `[0 1]`, so the second column is the probability of churn).
- **`score` runs `predict` and grades it.** For classifiers the default is accuracy; for regressors it is R². The fundamentals course warned you never to grade on the training set, so we score on the held-out test set.

## Swap the algorithm, keep the code

Because every model speaks the same language, comparing algorithms is a loop:

```python
from sklearn.dummy import DummyClassifier
from sklearn.ensemble import RandomForestClassifier

for m in [DummyClassifier(strategy="most_frequent"),
          LogisticRegression(),
          RandomForestClassifier(random_state=0)]:
    m.fit(X_train, y_train)
    print(type(m).__name__, round(m.score(X_test, y_test), 3))
```

```
DummyClassifier 0.764
LogisticRegression 0.768
RandomForestClassifier 0.728
```

The `DummyClassifier` that always predicts "stayed" scores 0.764, and our logistic regression barely beats it. That is not a bug in the API; it is a reminder that a number means nothing without a baseline, and that two columns and accuracy alone are a weak starting point. The rest of the course fixes both problems: better preprocessing in this chapter, better yardsticks in the next.

## Conventions worth memorizing

- **Constructor arguments are settings, chosen before training** (for example `RandomForestClassifier(random_state=0)`). They are called hyperparameters, and Chapter 3 is about tuning them.
- **Anything learned during `fit` ends with an underscore**: `model.coef_`, `model.intercept_`, `model.classes_`. If an attribute with a trailing `_` is missing, the model has not been fitted yet.
- **Printing a model shows its settings**, which makes notebooks self-documenting.

```python
print(model.coef_.round(3), model.intercept_.round(3))
```

```
[[-0.043  0.465]] [-0.549]
```

## Recap

scikit-learn models share one interface: construct with settings, `fit` on training data, `predict` or `predict_proba` on new data, and `score` to grade. Inputs are a 2-D `X` and 1-D `y`; learned values live in attributes ending with `_`. Because the interface is uniform, swapping models is trivial, and a dummy baseline tells you whether any model is actually earning its keep. Next, we look at the three roles objects can play in this API: estimators, transformers, and predictors.
