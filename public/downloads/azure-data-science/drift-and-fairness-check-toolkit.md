# Drift & Fairness Check Toolkit

Ready-to-run Python for the two checks this course teaches you to compute by hand
before trusting a cloud dashboard to compute them for you: **data drift** (has the
input distribution shifted since training?) and a **segment/fairness check** (does
the model work evenly across groups, not just well on average?). Both run locally
with numpy, pandas and scipy — no Azure subscription required — and both mirror the
exact functions used in the Monitoring and Responsible AI lessons.

## 1. Population Stability Index (PSI)

The workhorse drift metric. Reads as: near 0 means no shift; a common industry rule
of thumb treats under 0.1 as stable and over 0.25 as a significant shift — that is a
convention you choose, not an Azure setting.

```python
import numpy as np

def psi(a, b, bins=10):
    """PSI of distribution b (production) against a (reference/training)."""
    edges = np.quantile(a, np.linspace(0, 1, bins + 1))
    edges[0], edges[-1] = -np.inf, np.inf
    pa = np.histogram(a, edges)[0] / len(a)
    pb = np.histogram(b, edges)[0] / len(b)
    pa, pb = np.clip(pa, 1e-4, None), np.clip(pb, 1e-4, None)
    return float(np.sum((pb - pa) * np.log(pb / pa)))
```

## 2. Jensen-Shannon distance, KS test and chi-squared

PSI alone can miss shape differences a distance metric catches, and a p-value alone
can mislead on large samples. Pair them:

```python
from scipy.stats import ks_2samp, chi2_contingency
from scipy.spatial.distance import jensenshannon

def js_distance(a, b, bins=20):
    edges = np.histogram_bin_edges(np.concatenate([a, b]), bins=bins)
    pa = np.histogram(a, edges)[0] / len(a)
    pb = np.histogram(b, edges)[0] / len(b)
    return float(jensenshannon(pa, pb))

def ks_check(a, b):
    stat, p = ks_2samp(a, b)
    return float(stat), float(p)

def chi2_check(a_counts, b_counts):
    # a_counts / b_counts: category -> count, same categories in both
    table = np.array([list(a_counts.values()), list(b_counts.values())])
    stat, p, dof, _ = chi2_contingency(table)
    return float(stat), float(p)
```

### Reading the four together

```python
ref = reference_df["monthly_spend"]
prod = production_week_df["monthly_spend"]

print("PSI", round(psi(ref, prod), 3))
print("JS distance", round(js_distance(ref, prod), 3))
stat, p = ks_check(ref, prod)
print("KS p-value", round(p, 4))
```

A no-drift week looks like `PSI≈0.01, JS≈0.06, KS p≈0.47`. A genuinely shifted week
looks like `PSI≈0.57, JS≈0.34, KS p≈0.0000`. Run the same pattern on every feature
you consider important enough to monitor — not every column, to cut noise, per
Microsoft's own guidance to watch the top N most important features.

## 3. Segment / fairness check (Fairlearn-style, no library required)

Aggregate accuracy or AUC can hide a model that works well for one group and badly
for another. This reproduces the shape of a Fairlearn `MetricFrame` group breakdown
with plain pandas, so you can run it on any categorical segment — a protected
attribute, a contract type, a region, whatever your stakeholder asks about:

```python
import pandas as pd
from sklearn.metrics import roc_auc_score, recall_score, precision_score

def segment_report(df, y_true_col, y_pred_col, proba_col, segment_col, threshold=0.5):
    rows = []
    for seg, g in df.groupby(segment_col):
        pred = (g[proba_col] >= threshold).astype(int)
        rows.append({
            "segment": seg,
            "n": len(g),
            "auc": roc_auc_score(g[y_true_col], g[proba_col]),
            "recall": recall_score(g[y_true_col], pred),
            "precision": precision_score(g[y_true_col], pred, zero_division=0),
            "selection_rate": pred.mean(),
        })
    return pd.DataFrame(rows).round(3)

print(segment_report(test_df, "churned", "pred", "churn_risk", "contract"))
```

If you have the `fairlearn` package installed, the equivalent one-call version adds
a summary difference statistic:

```python
from fairlearn.metrics import MetricFrame, selection_rate, demographic_parity_difference

mf = MetricFrame(
    metrics={"recall": recall_score, "selection_rate": selection_rate},
    y_true=y_true, y_pred=y_pred, sensitive_features=segment_series)
print(mf.by_group.round(3))
print("demographic parity diff", round(
    demographic_parity_difference(y_true, y_pred, sensitive_features=segment_series), 3))
```

## What to do with the result

- **Equal AUC across segments does not mean the model is fair at your decision
  threshold.** AUC measures ranking ability; a single global threshold can still
  under-flag a lower-base-rate segment, which is exactly what happened with the
  churn model's two-year customers (AUC 0.796, recall 0.147 at 0.5).
- **A per-segment threshold is a legitimate mitigation, not a free fix.** Raising
  recall for a weak segment lowers its precision — more calls spent on customers who
  were not actually going to churn. That trade-off belongs to the business
  stakeholder who owns the calling budget, not to whoever ran the script.
- **Document the finding even if you don't ship a fix.** A model card's "Known
  limitations" section (see the Model Card Template in this vault) is where a
  segment weakness you found in testing stops being a surprise in production.
