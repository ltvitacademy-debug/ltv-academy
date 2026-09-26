# Capstone Kickoff: Build Your First Models

You have spent this course learning the parts: the ML workflow, splits and leakage, encoding and scaling, regression, trees and forests, k-NN, clustering, and PCA. The capstone puts them together on one guided project, in three lessons. In this first lesson we frame the problem, create the dataset, explore it, set aside a test set, and build the baseline every later model has to beat. In lesson 28 you build and compare models. In lesson 29 you evaluate the winner honestly and package the work as a portfolio piece.

## What you'll learn

- How to turn a business question into an ML problem with a success metric
- How to generate and inspect the capstone dataset
- How to do quick, targeted exploration before modeling
- How to make a stratified train/test split and protect the test set
- Why a baseline comes first, and what it tells you

## The project brief

A subscription company is losing customers and wants to know which ones are likely to leave next month so the retention team can contact them. That is a binary classification problem: predict `churned` (1 = left, 0 = stayed) for each customer.

Two decisions up front. First, the metric. If about a third of customers churn, accuracy is misleading, because a model that predicts "nobody churns" already looks decent. We will track ROC AUC, which measures how well the model ranks likely churners above loyal customers, and then look at precision and recall at a chosen threshold. Second, the plan: split first, build a baseline, compare a few models with cross-validation on the training data only, and touch the test set exactly once at the end.

## The dataset

The data is illustrative and synthetic: 2,000 customers generated with a fixed seed, with a churn tendency that depends on tenure, contract type, support calls, monthly charges, and autopay. It also has a few missing monthly charges, because real data always does. Save this as `capstone_data.py` so the next two lessons can import it.

```python
# capstone_data.py
import numpy as np
import pandas as pd

def make_churn_data(n=2000, seed=42):
    rng = np.random.default_rng(seed)
    contract = rng.choice(
        ["month-to-month", "one-year", "two-year"],
        size=n, p=[0.55, 0.25, 0.20])
    tenure = np.clip(rng.exponential(24, n),
                     1, 72).round()
    monthly = rng.normal(65, 20, n).clip(
        20, 120).round(2)
    calls = rng.poisson(1.5, n)
    autopay = rng.choice(["yes", "no"], size=n,
                         p=[0.6, 0.4])
    logit = (-0.6 - 0.035 * tenure
             + 0.02 * (monthly - 65)
             + 0.35 * calls
             + np.select(
                 [contract == "month-to-month",
                  contract == "one-year"],
                 [1.0, 0.0], -1.0)
             - 0.5 * (autopay == "yes"))
    churn = (rng.random(n)
             < 1 / (1 + np.exp(-logit))).astype(int)
    df = pd.DataFrame({
        "tenure_months": tenure,
        "monthly_charges": monthly,
        "support_calls": calls,
        "contract": contract,
        "autopay": autopay,
        "churned": churn})
    df.loc[rng.random(n) < 0.03,
           "monthly_charges"] = np.nan
    return df
```

## First look

```python
from capstone_data import make_churn_data

df = make_churn_data()
print(df.shape)
print(df.isna().sum().to_dict())
print(round(df.churned.mean(), 3))
```

You get `(2000, 6)`, and 64 missing values in `monthly_charges` (about 3 percent), and an overall churn rate of `0.344`. About one in three customers churns, a meaningful imbalance, which is another reason not to trust accuracy alone.

## Targeted exploration

Before modeling, ask two questions the business would ask.

```python
print(df.groupby("contract").churned
        .agg(["mean", "size"]).round(3))
print(df.groupby("churned")[["tenure_months",
    "monthly_charges", "support_calls"]]
    .mean().round(1))
```

By contract, month-to-month customers churn at 0.462 (1,094 customers), one-year at 0.254 (493), and two-year at 0.143 (413). Churners average 14.7 months of tenure against 26.3 for stayers, more support calls (1.8 against 1.4), and slightly higher monthly charges (69.5 against 63.3). These are the patterns a model should pick up, and they give you a sanity check on its results later.

## Split first, then protect the test set

```python
from sklearn.model_selection import train_test_split

X = df.drop(columns="churned")
y = df.churned
X_tr, X_te, y_tr, y_te = train_test_split(
    X, y, test_size=0.2, stratify=y,
    random_state=42)
print(X_tr.shape, X_te.shape)
print(y_tr.mean().round(3), y_te.mean().round(3))
```

The shapes are `(1600, 5)` and `(400, 5)`, and the churn rate is 0.344 in training and 0.345 in test: `stratify=y` kept the class balance nearly identical. From now on, all fitting, imputing, scaling, and tuning use `X_tr` only. The test set stays sealed until lesson 29.

## The baseline

```python
from sklearn.dummy import DummyClassifier
from sklearn.metrics import accuracy_score, roc_auc_score

base = DummyClassifier(strategy="most_frequent")
base.fit(X_tr, y_tr)
print(accuracy_score(y_te, base.predict(X_te)))
print(roc_auc_score(y_te,
                    base.predict_proba(X_te)[:, 1]))
```

The baseline predicts "stayed" for everyone. It scores an accuracy of `0.655` and a ROC AUC of `0.5`, which is chance. Any real model must beat 0.5 AUC clearly, and any claim of accuracy near 0.655 is not impressive. (The test set is used here only to give you the baseline number for reference; we will not tune anything against it.)

## A look at the patterns

```python
import matplotlib.pyplot as plt

rate = df.groupby("contract").churned.mean()
rate = rate.loc[["month-to-month", "one-year",
                 "two-year"]]
fig, (a, b) = plt.subplots(1, 2, figsize=(10, 4))
a.bar(rate.index, rate.values, color="#8E1C1C")
a.set_title("Churn rate by contract")
a.set_ylabel("share who churned")
b.hist(df.tenure_months[df.churned == 0], bins=24,
       alpha=0.7, color="#2F6B8A", label="stayed")
b.hist(df.tenure_months[df.churned == 1], bins=24,
       alpha=0.7, color="#8E1C1C", label="churned")
b.set_title("Tenure by outcome")
b.set_xlabel("tenure_months")
b.legend()
fig.tight_layout()
fig.savefig("capstone-eda.png", dpi=150)
```

Month-to-month customers churn far more than customers on longer contracts, and churners are concentrated at short tenures. (The tall bar at 72 months is an artifact of our generator, which caps tenure at 72.)

## Recap

You framed churn as a classification problem, chose ROC AUC plus precision and recall over raw accuracy, explored the key patterns, split with stratification, and set a baseline of 0.5 AUC to beat. Next, in lesson 28, you will build the preprocessing pipeline and compare three models with cross-validation.
