# Performance Monitoring & Alerting

Drift checks look at inputs. Performance monitoring looks at what actually matters: is the model still right? This lesson builds a small weekly monitor for the churn-style model, feeds it eight simulated weeks of production data, and adds alert rules that page a human only when something is truly wrong. Everything is illustrative: the batches are simulated, and every number below came from code that was run.

## What you'll learn

- Which metrics to track when labels arrive late
- How to compute a weekly report: AUC, top-20% precision, calibration, and drift
- How to turn thresholds into alerts, and how to avoid alert fatigue
- Why one bad week is not the same as a broken model

## The label-delay problem

Churn is only known weeks after the prediction, so live accuracy always lags. Real monitors therefore run in layers: input drift checks fire first (no labels needed), then outcome metrics follow as labels land. In the simulation below we ignore the lag and compute each week's metrics as if its labels had arrived, but in production each week's report is delayed by your label lag.

## Set up: the model and eight weeks of data

Save the shared helpers once as `model_utils.py`.

```python
# model_utils.py
import numpy as np
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

NUM = ["tenure_months", "monthly_spend", "sessions_30d",
       "days_idle", "support_tickets", "failed_payments"]
CAT = ["plan", "channel"]

def build_pipeline():
    prep = ColumnTransformer([
        ("num", Pipeline([("imp", SimpleImputer(strategy="median")),
                          ("sc", StandardScaler())]), NUM),
        ("cat", OneHotEncoder(sparse=False), CAT)])
    return Pipeline([("prep", prep),
                     ("model", LogisticRegression(max_iter=1000))])

def split(df, seed=42):
    X, y = df.drop(columns="cancelled"), df.cancelled
    return train_test_split(X, y, test_size=0.2, stratify=y,
                            random_state=seed)

def new_rule_labels(df, rng):
    """Simulated concept drift: cancellations become price-driven."""
    z = (-2.4 + 0.10 * (df.monthly_spend.fillna(15) - 12)
         + 0.05 * (df.sessions_30d - 12) - 0.03 * df.tenure_months)
    return (rng.random(len(df)) < 1 / (1 + np.exp(-z))).astype(int)
```

Now train, then simulate production. Input drift starts in week 3, and concept drift creeps in from week 5 by relabelling a growing share of customers with the new rule.

```python
import numpy as np, pandas as pd
from sklearn.metrics import roc_auc_score
from capstone_data import make_cancel_data
from drift import psi
from model_utils import build_pipeline, split, new_rule_labels, NUM

df = make_cancel_data()
X_tr, X_te, y_tr, y_te = split(df)
model = build_pipeline().fit(X_tr, y_tr)
base_auc = roc_auc_score(y_te, model.predict_proba(X_te)[:, 1])
print("baseline AUC", round(base_auc, 3))   # 0.744

def make_week(w):
    b = make_cancel_data(n=1500, seed=200 + w)
    if w >= 3:
        b["days_idle"] = b["days_idle"] * 1.25 + 1
    alpha = {5: 0.3, 6: 0.5, 7: 0.75, 8: 1.0}.get(w, 0.0)
    rng = np.random.default_rng(w)
    swap = rng.random(len(b)) < alpha
    b.loc[swap, "cancelled"] = new_rule_labels(b, rng)[swap]
    return b
```

## The weekly report

```python
def weekly_metrics(w):
    b = make_week(w)
    X, y = b.drop(columns="cancelled"), b.cancelled
    p = model.predict_proba(X)[:, 1]
    top = np.argsort(p)[::-1][:int(0.2 * len(y))]
    return {"week": w, "auc": roc_auc_score(y, p),
            "mean_pred": p.mean(), "actual": y.mean(),
            "top20_prec": y.to_numpy()[top].mean(),
            "max_psi": max(psi(X_tr[c], X[c]) for c in NUM)}

hist = pd.DataFrame([weekly_metrics(w) for w in range(1, 9)])
print(hist.round(3).to_string(index=False))
```

```
 week   auc  mean_pred  actual  top20_prec  max_psi
    1 0.761      0.116   0.134       0.310    0.011
    2 0.765      0.113   0.103       0.290    0.009
    3 0.700      0.124   0.110       0.230    0.905
    4 0.737      0.118   0.109       0.273    0.867
    5 0.688      0.122   0.107       0.227    0.867
    6 0.651      0.120   0.104       0.183    0.889
    7 0.590      0.119   0.084       0.127    0.898
    8 0.450      0.118   0.065       0.037    0.872
```

Read it like a clinician reads a chart. Drift (`max_psi`) jumps in week 3 but AUC only wobbles, matching the last lesson. From week 5 the AUC slides, and by week 8 the top-20% precision (0.037) is far below the 0.31 we saw in week 1. The calibration columns show predictions staying near 0.118 while real cancellations fall to 0.065.

## Rules and alerts

```python
RULES = {"auc_min": base_auc - 0.05, "calib_gap": 0.03, "psi_max": 0.25}

def check(row):
    alerts = []
    if row.auc < RULES["auc_min"]:
        alerts.append(("critical", f"AUC {row.auc:.3f} below floor"))
    if abs(row.mean_pred - row.actual) > RULES["calib_gap"]:
        alerts.append(("warning", "calibration gap"))
    if row.max_psi > RULES["psi_max"]:
        alerts.append(("warning", f"max PSI {row.max_psi:.2f}"))
    return alerts

for row in hist.itertuples():
    for sev, msg in check(row):
        print(f"week {row.week}: [{sev}] {msg}")
```

Running it warns about PSI from week 3, raises the first critical AUC alert in week 5, and adds calibration warnings in weeks 7 and 8. To send an alert you would post to a chat webhook or paging service (illustrative, not run here):

```python
# illustrative only
requests.post(SLACK_WEBHOOK_URL, json={"text": message})
```

## Avoid alert fatigue

One week's AUC is noisy. With 1,500 customers and about 165 cancellations a week, a bootstrap 95% interval on week 5 is roughly 0.64 to 0.72, so its 0.688 straddles the 0.694 floor. A rule that pages on one breach will cry wolf. Require two consecutive breaches:

```python
breach = hist.auc < RULES["auc_min"]
page = breach & breach.shift(1, fill_value=False)
print(hist.week[breach].tolist(), hist.week[page].tolist())
```

The breach weeks are `[5, 6, 7, 8]` and the paging weeks are `[6, 7, 8]`. One extra week of patience removed the shaky first alert. Route warnings to a dashboard or channel, and page people only for critical alerts.

## The dashboard

```python
import matplotlib.pyplot as plt
fig, (a, b) = plt.subplots(1, 2, figsize=(9, 3.4))
a.plot(hist.week, hist.auc, marker="o", color="#8E1C1C")
a.axhline(RULES["auc_min"], ls="--", label="alert threshold")
a.set_title("Weekly AUC")
a.legend()
b.plot(hist.week, hist.mean_pred, marker="o", label="mean predicted")
b.plot(hist.week, hist.actual, marker="o", label="actual cancel rate")
b.set_title("Calibration check")
b.legend()
plt.tight_layout()
plt.savefig("monitoring-dashboard.png", dpi=130)
```

## Recap

- Monitor inputs immediately and outcomes as labels arrive.
- Track a ranking metric, the metric the business acts on, and calibration.
- Set thresholds from the training baseline, and require persistence before paging.
- Send warnings to a channel and criticals to a person.
