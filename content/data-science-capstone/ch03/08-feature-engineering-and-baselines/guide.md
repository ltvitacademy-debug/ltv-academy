# Feature Engineering & Baselines

Phase 1 ended with a checkpoint memo and a short list of decisions for the modeling phase: start from the planned features, consider adding order rate since signup, split before fitting anything, and compare every model against the baselines from lesson 3. This lesson does exactly that. You will build the modeling table, split the data, and set the baselines and the ambition target that every later model has to beat. Everything here runs on the Harvest Table database. Numbers are what the code printed for this seeded, synthetic dataset; they are illustrative, not real-company results.

## What you'll learn

- How to extend your lesson 5 and 6 code into a full modeling table with no future information in it
- How to split the data and package the set-up so every later lesson can reuse it
- How to set baselines that include the "days since last order" rule promised in lesson 3
- How to set the ambition target only after you have seen the baselines

## Extend what you already have

`clean.py` (lesson 5) and `frame.py` (lesson 6) already give you the population of 3,690 active customers, the label, and several behavior columns, all filtered to `order_date <= SNAP`. The planned feature list also has orders in the last 30 days, the 30-versus-prior-60-day trend, discount share, and average ticket resolution time. `features.py` adds those, plus a decision on missing recency:

```python
# features.py: the modeling table, one row per active customer
import pandas as pd
from clean import load_clean, SNAP
from frame import build_frame


def build_features():
    df = build_frame()                    # lesson 6 columns, as of SNAP
    cust, orders, tickets, canc = load_clean()

    o = orders[orders.order_date <= SNAP].copy()      # the snapshot rule
    o["days_ago"] = (SNAP - o.order_date).dt.days
    last30 = o[o.days_ago < 30].groupby("customer_id").size()
    df["orders_30d"] = last30.reindex(df.index).fillna(0)
    # change in monthly order rate: last 30 days vs the prior 60
    df["trend_30v60"] = df.orders_30d - (df.orders_90d - df.orders_30d) / 2
    df["discount_share"] = ((o.discount_pct > 0).groupby(o.customer_id)
                            .mean().reindex(df.index))

    t = tickets[tickets.created_at <= SNAP]
    df["avg_resolution_hrs"] = (t.groupby("customer_id").resolution_hours
                                .mean().reindex(df.index))

    # never ordered: days since they joined
    df["recency"] = df.recency.fillna(df.tenure_days)
    return df.drop(columns="n_orders")
```

"Last 30 days" means `days_ago < 30`, with the snapshot day as day 0, matching the 90-day window from lesson 6. The trend feature is the last 30 days minus half of the prior 60, so a negative number means a customer is ordering less than they used to. `order_rate` (orders per week since signup) stays in, because it was the strongest single signal in exploration.

Run it and save the table:

```python
df = build_features()
print(df.shape, "churn rate", round(df.churn.mean(), 3))
df.to_csv("features.csv")
```

The output is `(3690, 16) churn rate 0.154`: 3,690 customers, 15 features and the label `churn`. Three of the features have 27 missing values (customers who never ordered) and average resolution time is missing for everyone who never filed a ticket. Those gaps stay in the table; the modeling pipeline will fill and flag them.

## The leakage checklist

1. Every feature row is dated on or before the snapshot. The 371 orders after it are excluded.
2. The label uses only the 60 days after it.
3. Nothing from the cancellations table appears in a feature.
4. Anything learned from data (medians, scaling, encodings) is fit on training rows only, so it lives in the pipeline.
5. The split happens before any fitting.

Item 4 has one wrinkle you inherited. The median age of 38 that fills the missing ages in `clean.py` was computed on all 4,000 customers, as lesson 5 warned. Only 170 values are affected, and age showed no relationship with churn in lesson 7, so we accept it here and say so. Everything else that needs fitting (medians for the behavior columns, scaling, encoding) goes inside the pipeline below.

## Split, then package the set-up

```python
from sklearn.model_selection import train_test_split

X, y = df.drop(columns="churn"), df.churn
X_tr, X_te, y_tr, y_te = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42)
print(len(X_tr), len(X_te), round(y_tr.mean(), 3), round(y_te.mean(), 3))
```

This prints `2952 738 0.154 0.154`. The training set has 454 churners and the test set 114. Each customer is one row, so a stratified split by row is a split by customer. A time-aware split would be stronger in production, but we have one snapshot and one label window; there is no earlier period with known outcomes to train on. Say that in your write-up. The test set stays sealed until lesson 10.

Later lessons reuse this set-up, so save it as `common.py`, together with the top-10% scorer from lesson 3's metric list:

```python
# common.py
import warnings; warnings.filterwarnings("ignore")
import numpy as np, pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder

df = pd.read_csv("features.csv", index_col="customer_id")
X, y = df.drop(columns="churn"), df.churn
X_tr, X_te, y_tr, y_te = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42)

num = [c for c in X.columns if X[c].dtype != object]
cat = ["plan", "acquisition_channel", "region"]
prep = ColumnTransformer([
    ("num", Pipeline([
        ("imp", SimpleImputer(strategy="median", add_indicator=True)),
        ("sc", StandardScaler())]), num),
    ("cat", OneHotEncoder(handle_unknown="ignore"), cat)])

BREAK_EVEN = 15 / (0.30 * 240)        # 0.208, from lesson 3


def precision_at_10(est, X, y):
    """Precision among the top 10% of scores."""
    p = est.predict_proba(X)[:, 1]
    k = int(round(0.10 * len(p)))
    return np.asarray(y)[np.argsort(-p)[:k]].mean()
```

The imputer adds a missing-value flag column, so "never filed a ticket" stays visible to the model.

## Baselines

Score the models with 5-fold stratified cross-validation on the training set. The two rule baselines just rank customers by one column and take the top 10%, the capacity from lesson 2. They fit nothing, so they can be scored on the training set directly.

```python
from sklearn.model_selection import StratifiedKFold, cross_validate
from sklearn.linear_model import LogisticRegression
from sklearn.dummy import DummyClassifier

cv = StratifiedKFold(5, shuffle=True, random_state=42)
scoring = {"ap": "average_precision", "auc": "roc_auc",
           "p10": precision_at_10}
models = {"churn-rate": DummyClassifier(strategy="prior"),
          "logistic": LogisticRegression(max_iter=1000)}
for name, m in models.items():
    s = cross_validate(Pipeline([("prep", prep), ("model", m)]),
                       X_tr, y_tr, cv=cv, scoring=scoring)
    print(f"{name:11s} AP {s['test_ap'].mean():.3f}"
          f"  AUC {s['test_auc'].mean():.3f}"
          f"  P@10% {s['test_p10'].mean():.3f}")

k = round(0.10 * len(y_tr))
for name, score in [("days since last order", X_tr.recency),
                    ("fewest orders per week", -X_tr.order_rate)]:
    score = score.fillna(score.median())
    top = np.argsort(-score.values)[:k]
    print(f"rule: {name:22s} P@10% {y_tr.values[top].mean():.3f}")
```

Output (in the full script the rule rows also print AP and AUC, which were 0.176 and 0.534 for the recency rule and 0.219 and 0.628 for the order-rate rule):

```
churn-rate  AP 0.154  AUC 0.500  P@10% 0.153
logistic    AP 0.328  AUC 0.708  P@10% 0.390
rule: days since last order  P@10% 0.183
rule: fewest orders per week P@10% 0.268
```

Compare each row with the break-even precision of 0.208 from lesson 3. The churn-rate model sits at the base rate, as expected. The rule everyone guesses first, contact whoever ordered longest ago, reaches only 0.183 in its top 10%, below break-even, so acting on it would lose money. Ranking by fewest orders per week does better (0.268) and clears break-even. Logistic regression reaches 0.390 in its top 10%, about 2.5 times the base rate, with an average precision of 0.328, twice the floor. That is a real improvement, but a modest one in absolute terms, which is normal for predicting human behavior.

## Set the ambition target, now

Lesson 3 left the ambition target open on purpose, because a target invented before you have seen baselines is a guess. Now you can set one with evidence: the best rule reaches 0.268, so require cross-validated precision at the top 10% of at least 0.32 (about double the base rate and five points above the best rule). The minimum-viable bar is unchanged: precision at the top 10% on the test set, with the lower end of its bootstrap interval above 0.208.

## Recap

Features come only from on or before the snapshot, the label from after it, and every learned step lives in a pipeline. The baselines, measured as precision at the top 10%, are a 0.153 floor, 0.183 for the "days since last order" rule, 0.268 for the best rule, and 0.390 for logistic regression. The ambition target is 0.32. Next, you compare more flexible models.
