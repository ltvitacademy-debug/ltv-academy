# Data Drift & Concept Drift

A model is trained on a snapshot of the world, and the world keeps moving. Customers change how they use your app, a marketing campaign brings in a different crowd, a form gets redesigned. Nothing crashes and no error appears, but the model quietly gets worse. This lesson gives you two vocabulary words, two statistics, and code you can run to catch the problem. The data is the illustrative churn-style dataset from Applied Machine Learning (`make_cancel_data`), so every number below came from code that was actually run.

## What you'll learn

- The difference between data drift and concept drift
- How to compute the Population Stability Index (PSI) and a KS test with numpy and scipy
- How to read a drift report and the common PSI rules of thumb
- Why data drift does not always hurt accuracy, and why concept drift is the dangerous one

## Two kinds of drift

**Data drift** (also called covariate shift) means the *inputs* changed: the features you see in production no longer look like the training features. You can detect it without labels, because you only compare feature distributions.

**Concept drift** means the *relationship* between inputs and the outcome changed. The inputs can look identical, yet what they mean is different. Detecting it needs ground truth, which for churn arrives weeks later.

## PSI and KS in a few lines

PSI cuts the training values into quantile bins, then compares the share of training rows and live rows in each bin.

```python
# drift.py
import numpy as np
from scipy import stats

def psi(ref, cur, bins=10):
    ref, cur = np.asarray(ref, float), np.asarray(cur, float)
    ref, cur = ref[~np.isnan(ref)], cur[~np.isnan(cur)]
    edges = np.unique(np.quantile(ref, np.linspace(0, 1, bins + 1)))
    edges[0], edges[-1] = -np.inf, np.inf
    p = np.histogram(ref, edges)[0] / len(ref)
    q = np.histogram(cur, edges)[0] / len(cur)
    p, q = np.clip(p, 1e-4, None), np.clip(q, 1e-4, None)
    return float(np.sum((q - p) * np.log(q / p)))

def ks(ref, cur):
    ref, cur = np.asarray(ref, float), np.asarray(cur, float)
    r = stats.ks_2samp(ref[~np.isnan(ref)], cur[~np.isnan(cur)])
    return float(r.statistic), float(r.pvalue)
```

The clip keeps an empty bin from causing a divide-by-zero. The Kolmogorov-Smirnov statistic is the largest gap between the two cumulative distributions; `ks_2samp` also returns a p-value.

## Run it on a drifted batch

We simulate a production batch of 2,000 customers in which an app change made customers look less active: days idle rises, and sessions fall.

```python
import pandas as pd
from capstone_data import make_cancel_data
from drift import psi, ks

ref = make_cancel_data()
live = make_cancel_data(n=2000, seed=99)
live["days_idle"] = live["days_idle"] * 1.25 + 1
live["sessions_30d"] = (live["sessions_30d"] * 0.85).round()

rows = []
for col in ["tenure_months", "monthly_spend", "sessions_30d",
            "days_idle", "support_tickets", "failed_payments"]:
    stat, p = ks(ref[col], live[col])
    rows.append((col, psi(ref[col], live[col]), stat, p))
out = pd.DataFrame(rows, columns=["feature", "psi", "ks", "p"])
print(out.round(3).to_string(index=False))
```

```
        feature   psi    ks     p
  tenure_months 0.006 0.013 0.968
  monthly_spend 0.002 0.019 0.665
   sessions_30d 0.396 0.208 0.000
      days_idle 0.889 0.187 0.000
support_tickets 0.001 0.015 0.894
failed_payments 0.001 0.012 0.984
```

Four features are quiet and two are loud. A widely used rule of thumb reads PSI below 0.1 as stable, 0.1 to 0.25 as a moderate shift, and above 0.25 as significant. It is a convention, not a law, so calibrate thresholds to your own data. One caution: `days_idle` is whole numbers, so shifting it leaves some quantile bins nearly empty, which inflates PSI. Treat PSI as an alarm that tells you where to look, not a precise measurement.

KS gives a p-value, but with thousands of rows even tiny, harmless shifts become "significant". That is why many teams alert on the effect size (PSI or the KS statistic) rather than on the p-value alone.

## The chart

A picture lets a human judge the shift at a glance. This continues from the code above.

```python
import matplotlib.pyplot as plt
import numpy as np

cols = out.feature.tolist()
fig, (a, b) = plt.subplots(1, 2, figsize=(9, 3.6))
bins = np.linspace(0, 40, 21)
a.hist(ref.days_idle.dropna(), bins, density=True,
       alpha=.6, color="#8E9AA6", label="training")
a.hist(live.days_idle.dropna(), bins, density=True,
       alpha=.6, color="#8E1C1C", label="live batch")
a.legend()
b.barh(cols, out.psi, color="#8E1C1C")
b.axvline(0.1, ls="--")
b.axvline(0.25, ls="--")
b.invert_yaxis()
plt.tight_layout()
plt.savefig("drift-report.png", dpi=130)
```

The left panel shows the `days_idle` shift; the right panel is PSI per feature with the 0.1 and 0.25 lines.

## Data drift is not the same as concept drift

Now the important comparison. We train the usual logistic regression pipeline and score three batches.

- **Same distribution, same rules:** AUC 0.754 (holdout: 0.744).
- **Data-drift batch (above), original labels:** AUC 0.728. The inputs moved a lot, but the ranking mostly survived.
- **Concept-drift batch:** same inputs, but cancellations now follow a different, simulated rule (price-driven rather than activity-driven). Every feature has PSI of at most 0.005, so the drift report is silent, yet AUC collapses to 0.474, worse than a coin flip.

The concept-drift batch keeps the inputs of a fresh same-distribution batch and only rewrites the labels:

```python
same = make_cancel_data(n=4000, seed=100)
rng = np.random.default_rng(5)
new_logit = (-2.4 + 0.10 * (same.monthly_spend - 12)
             + 0.05 * (same.sessions_30d - 12)
             - 0.03 * same.tenure_months)
same["cancelled"] = (rng.random(len(same))
                     < 1 / (1 + np.exp(-new_logit))).astype(int)
```

The lesson: input monitoring is an early, cheap warning, and it is not proof of harm. Only labelled outcomes reveal concept drift. You need both kinds of monitoring, which is what the next lesson builds.

## Recap

- Data drift = inputs changed (detect with PSI or KS, no labels needed).
- Concept drift = the input-to-outcome relationship changed (needs labels).
- PSI above roughly 0.25 is a common "investigate" flag; KS p-values overreact on big samples.
- A quiet drift report does not guarantee a healthy model.
