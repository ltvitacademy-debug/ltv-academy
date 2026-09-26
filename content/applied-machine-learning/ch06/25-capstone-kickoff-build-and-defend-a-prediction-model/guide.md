# Capstone Kickoff: Build and Defend a Prediction Model

You have spent this course learning the scikit-learn workflow one piece at a time: estimators and pipelines, `ColumnTransformer`, the right metrics, cross-validation, tuning, class imbalance, and documentation. The capstone puts every piece into one project you can show an employer. The word in the title that matters is *defend*. Anyone can call `fit`. A data scientist can explain why the split was safe, why this metric, why this threshold, and what the model cannot do.

The capstone has three lessons. In this one you frame the problem, write down success criteria before touching a model, generate the data, explore it, seal away a test set, and set the baseline. In lesson 26 you build and tune the models. In lesson 27 you evaluate once on the test set, choose a threshold, write a model card, and present.

## What you'll learn

- How to frame a prediction problem around a decision and its costs
- How to write success criteria *before* modeling
- How to generate the capstone dataset and inspect it
- How to make a stratified split and protect the test set
- How to set baselines for the metric and for the business cost

## The project brief

A subscription service loses about one customer in nine each month. The retention team can send a discount offer to any customer, but each offer costs money, so they want a ranked list of who is most likely to cancel next month. That is binary classification: predict `cancelled` (1 = cancelled, 0 = stayed) for each customer.

The two kinds of error do not cost the same. To keep the numbers concrete we assume, for illustration only: sending an offer costs 10 currency units, and a cancellation we did not contact costs 100 in lost margin (we assume an offer always saves the customer, which is optimistic). Missing a canceller is ten times worse than a wasted offer. That ratio will drive the threshold decision in lesson 27.

## Write the success criteria first

Before any modeling, write these down. They stop you from moving the goalposts after you see results.

1. **Metric:** average precision (the area under the precision-recall curve) as the main score, because only 11% of customers cancel. Report ROC AUC as well.
2. **Validation:** stratified 5-fold cross-validation on the training set only. The test set is touched once.
3. **Decision cost:** at the chosen threshold, the model must cost less per 1,000 customers than both "contact nobody" and "contact everybody".
4. **Leakage rule:** every fitted step (imputer, scaler, encoder) lives inside a `Pipeline`.

## The dataset

The data is illustrative and synthetic: 6,000 customers generated with a fixed seed, with cancellation risk depending on tenure, days since last activity, sessions, support tickets, failed payments, plan, and acquisition channel. Some values are missing, as in real data. Save this as `capstone_data.py`; the next two lessons import it.

```python
# capstone_data.py
import numpy as np
import pandas as pd


def make_cancel_data(n=6000, seed=2026):
    rng = np.random.default_rng(seed)
    plan = rng.choice(["basic", "plus", "premium"],
                      size=n, p=[0.5, 0.35, 0.15])
    channel = rng.choice(["organic", "paid", "referral"],
                         size=n, p=[0.45, 0.35, 0.20])
    tenure = np.clip(rng.exponential(20, n), 1, 60).round()
    price = np.select(
        [plan == "basic", plan == "plus"], [9, 15], 25)
    spend = (price + rng.normal(0, 2, n)).round(2)
    sessions = rng.poisson(12, n)
    idle = np.clip(rng.exponential(9, n), 0, 60).round()
    tickets = rng.poisson(0.8, n)
    failed = rng.poisson(0.3, n)
    logit = (-2.7
             - 0.03 * tenure
             + 0.06 * np.maximum(idle - 14, 0)
             - 0.05 * (sessions - 12)
             + 0.30 * tickets
             + 0.55 * failed
             + np.select([plan == "basic", plan == "plus"],
                         [0.5, 0.0], -0.6)
             + 0.6 * ((plan == "basic") & (tenure < 6))
             + 0.4 * (channel == "paid")
             - 0.4 * (channel == "referral"))
    cancel = (rng.random(n)
              < 1 / (1 + np.exp(-logit))).astype(int)
    df = pd.DataFrame({
        "tenure_months": tenure, "monthly_spend": spend,
        "sessions_30d": sessions, "days_idle": idle,
        "support_tickets": tickets, "failed_payments": failed,
        "plan": plan, "channel": channel,
        "cancelled": cancel})
    df.loc[rng.random(n) < 0.04, "monthly_spend"] = np.nan
    df.loc[rng.random(n) < 0.06, "days_idle"] = np.nan
    return df
```

## First look

```python
from capstone_data import make_cancel_data

df = make_cancel_data()
print(df.shape)
print(df.isna().sum()[lambda s: s > 0].to_dict())
print(df.cancelled.value_counts().to_dict())
print(round(df.cancelled.mean(), 3))
```

The output is `(6000, 9)`, missing values of `{'monthly_spend': 242, 'days_idle': 372}`, counts of `{0: 5333, 1: 667}`, and a cancel rate of `0.111`. This is a real imbalance: about one customer in nine. It is also why accuracy alone would mislead.

## Split first, then seal the test set

```python
from sklearn.model_selection import train_test_split

X = df.drop(columns="cancelled")
y = df.cancelled
X_tr, X_te, y_tr, y_te = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42)
print(X_tr.shape, X_te.shape)
print(y_tr.mean().round(3), y_te.mean().round(3))
```

The shapes are `(4800, 8)` and `(1200, 8)`, and the cancel rate is 0.111 in both, because `stratify=y` preserved it. From here on, exploration, fitting, and tuning use the training set only.

## Baselines: the numbers to beat

```python
from sklearn.dummy import DummyClassifier
from sklearn.metrics import (
    accuracy_score, roc_auc_score, average_precision_score)

base = DummyClassifier(strategy="prior").fit(X_tr, y_tr)
p = base.predict_proba(X_te)[:, 1]
print(accuracy_score(y_te, base.predict(X_te)))
print(roc_auc_score(y_te, p))
print(average_precision_score(y_te, p))
```

The dummy model predicts "stayed" for everyone: accuracy is `0.889`, which looks great and is worthless. ROC AUC is `0.5` and average precision is `0.111`, which equals the cancel rate. Those two are the real floors.

Now the business baselines, per 1,000 customers, from the training cancel rate:

```python
FLAG, MISS = 10, 100
rate = y_tr.mean()
print("nobody", round(1000 * rate * MISS))
print("everybody", 1000 * FLAG)
```

Contacting nobody costs about 11,125 per 1,000 customers, and contacting everybody costs 10,000. Because cancellations are expensive relative to offers, even a blanket campaign beats doing nothing. A model has to beat 10,000 to be worth building.

## Explore before you model

```python
import pandas as pd
import matplotlib.pyplot as plt

train = X_tr.assign(cancelled=y_tr)
by_plan = (train.groupby("plan").cancelled.mean()
           .loc[["basic", "plus", "premium"]])
bands = pd.cut(train.days_idle, [-1, 7, 14, 21, 30, 60])
by_idle = train.groupby(bands).cancelled.mean()
fig, (a, b) = plt.subplots(1, 2, figsize=(10, 4))
a.bar(by_plan.index, by_plan.values, color="#8E1C1C")
a.set_title("Cancel rate by plan (train)")
b.bar(by_idle.index.astype(str), by_idle.values,
      color="#2F6B8A")
b.set_title("Cancel rate by days idle (train)")
for ax in (a, b):
    ax.axhline(y_tr.mean(), color="#6B6259", linestyle="--")
fig.tight_layout()
fig.savefig("capstone-eda.png", dpi=150)
```

Basic-plan customers cancel at 0.143, plus at 0.090, and premium at 0.059. Cancellation is flat at about 0.10 for customers idle up to two weeks, then climbs: 0.129, 0.188, and 0.238 for the three longer idle bands. That kink is worth remembering: a straight line may not capture it, which sets up a fair contest between simple and flexible models in lesson 26.

## Recap

You framed the project around a decision and its costs, wrote success criteria before modeling, generated the data, sealed a stratified test set, and set floors: 0.5 ROC AUC, 0.111 average precision, and a business cost of 10,000 per 1,000 customers. In lesson 26 you build a leakage-safe pipeline, compare models, handle the imbalance, and tune.
