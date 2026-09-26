# Monitoring Plan

A model does not fail with an error message. It fails quietly: customers change, the business changes a promotion or a delivery partner, and the scores keep arriving looking perfectly normal. A monitoring plan says in advance what you will watch, what counts as a problem, who acts, and when you retrain. You met these ideas in your MLOps course; here you apply them to this model and, importantly, you compute them rather than describe them. The "new data" below is simulated, because a snapshot from the future does not exist. It is labeled as simulated wherever it appears.

## What you'll learn

- The four layers of monitoring for a batch scoring model
- How to compute PSI and the KS statistic on a reference sample and on new data
- How to set alert thresholds, and how noisy your performance check is at a real cycle size
- How to write retraining triggers that avoid both panic and complacency

## Four layers, in order of speed

1. **Data quality:** null rates, unseen categories, out-of-range values. Fast, cheap, and catches broken pipelines. The API contract in lesson 12 already rejects some of this at the door.
2. **Input drift:** has the distribution of each feature moved away from the training sample?
3. **Score drift:** has the distribution of predicted probabilities moved, and has the share of customers above the 0.208 break-even changed? One number that summarizes everything upstream.
4. **Performance:** precision in the top 10%, the metric from lesson 3. It is the ground truth, but labels arrive 60 days after each scoring run, so it is slow. Layers 1 to 3 are the early warning.

## Compute PSI and KS

The population stability index (PSI) compares two distributions bin by bin: the sum of (new share minus reference share) times the log of their ratio. Bins come from the reference quantiles, so they are fixed once. The KS statistic is the largest gap between two cumulative distributions.

```python
import joblib, json
from scipy import stats
from common import *   # X_tr, X_te, y_te, num, cat

model = joblib.load("churn_service/artifacts/churn_model.joblib")
card = json.load(open("churn_service/artifacts/model_card.json"))
ref = pd.read_csv("churn_service/artifacts/reference_features.csv",
                  index_col="customer_id")   # saved in lesson 12


def psi_numeric(ref, new, bins=10):
    ref, new = ref.dropna(), new.dropna()
    edges = np.unique(np.quantile(ref, np.linspace(0, 1, bins + 1)))
    edges[0], edges[-1] = -np.inf, np.inf
    r = np.histogram(ref, edges)[0] / len(ref)
    n = np.histogram(new, edges)[0] / len(new)
    r, n = np.clip(r, 1e-4, None), np.clip(n, 1e-4, None)
    return float(np.sum((n - r) * np.log(n / r)))


def psi_categorical(ref, new):
    cats = sorted(set(ref) | set(new))
    r = ref.value_counts(normalize=True).reindex(cats, fill_value=0)
    n = new.value_counts(normalize=True).reindex(cats, fill_value=0)
    r, n = r.clip(lower=1e-4), n.clip(lower=1e-4)
    return float(((n - r) * np.log(n / r)).sum())


def drift_report(ref, new):
    rows = []
    for c in num:
        rows.append((c, psi_numeric(ref[c], new[c]),
                     stats.ks_2samp(ref[c].dropna(), new[c].dropna()).statistic))
    for c in cat:
        rows.append((c, psi_categorical(ref[c], new[c]), np.nan))
    return pd.DataFrame(rows, columns=["feature", "psi", "ks"]).set_index("feature")


def status(v):
    return "ALERT" if v >= 0.25 else "watch" if v >= 0.10 else "ok"
```

The common rule of thumb is below 0.10 stable, 0.10 to 0.25 worth watching, above 0.25 a significant shift. These are conventions, not laws; tune them to your tolerance for false alarms.

## A control and a simulated shift

First a control: the untouched test set should look like the training sample, and it does. Then a simulated shift for "next quarter": order rate falls 15%, the late-or-refunded share rises 30%, and a quarter of customers move to the Premium plan. **This is simulated data**, made by editing the test rows.

```python
control = drift_report(ref, X_te)

rng = np.random.default_rng(0)
shifted = X_te.copy()
shifted["order_rate"] = shifted.order_rate * 0.85
shifted["bad_share"] = (shifted.bad_share * 1.3).clip(upper=1)
flip = rng.random(len(shifted)) < 0.25
shifted.loc[flip, "plan"] = "Premium"
sh = drift_report(ref, shifted)

rep = pd.DataFrame({"psi_control": control.psi, "psi_shifted": sh.psi,
                    "ks_shifted": sh.ks})
rep["status"] = rep.psi_shifted.map(status)
print(rep.sort_values("psi_shifted", ascending=False).head(6).round(3))
print("control: max PSI", control.psi.max().round(3), control.psi.idxmax())
```

```
                    psi_control  psi_shifted  ks_shifted status
feature
order_rate                0.016        0.607       0.271  ALERT
bad_share                 0.014        0.227       0.222  watch
plan                      0.008        0.136         NaN  watch
age                       0.025        0.025       0.050     ok
discount_share            0.019        0.019       0.036     ok
avg_resolution_hrs        0.019        0.019       0.030     ok
control: max PSI 0.025 age
```

The control never exceeds 0.025, so the thresholds are not tripping on ordinary sampling noise. The simulated shift lights up exactly the features we edited: an alert on order rate, a watch on late share and plan, and nothing on the rest. The chart shows all 15 features.

```python
import matplotlib.pyplot as plt
order = rep.sort_values("psi_shifted").index
fig, ax = plt.subplots(figsize=(8, 5), dpi=150)
yy = np.arange(len(order))
ax.barh(yy - 0.2, rep.loc[order, "psi_control"], height=0.4, label="control")
ax.barh(yy + 0.2, rep.loc[order, "psi_shifted"], height=0.4, label="shift")
ax.axvline(0.10, ls=":"); ax.axvline(0.25, ls="--")
ax.set_yticks(yy); ax.set_yticklabels(order); ax.legend()
plt.tight_layout(); plt.savefig("drift.png")
```

## Score drift and data quality

```python
s_ref = model.predict_proba(ref[X_te.columns])[:, 1]
s_ctl = model.predict_proba(X_te)[:, 1]
s_new = model.predict_proba(shifted)[:, 1]
print("score PSI  control %.3f  shifted %.3f" % (
    psi_numeric(pd.Series(s_ref), pd.Series(s_ctl)),
    psi_numeric(pd.Series(s_ref), pd.Series(s_new))))
be = card["min_probability"]
print("share above break-even: train %.3f  control %.3f  shifted %.3f" % (
    (s_ref >= be).mean(), (s_ctl >= be).mean(), (s_new >= be).mean()))
print("null rate avg_resolution_hrs: ref %.3f  new %.3f" % (
    ref.avg_resolution_hrs.isna().mean(), shifted.avg_resolution_hrs.isna().mean()))
```

```
score PSI  control 0.012  shifted 0.267
share above break-even: train 0.239  control 0.262  shifted 0.444
null rate avg_resolution_hrs: ref 0.376  new 0.364
```

The score distribution summarizes the drift in one number (0.267, an alert), and the share of customers above break-even jumps from about 24-26% to 44%. That share is the friendliest number to put on a dashboard: anyone can see that "the model suddenly wants to contact almost half the base" is odd. Note that score drift tells you the inputs changed, not whether the model is still right.

## Performance monitoring with delayed labels

Precision in the top 10% can only be computed 60 days after the run that produced the list. At a real cycle of 369 contacts the noise is about one standard error of 0.026 when precision is 0.40 (and 0.023 at 0.25):

```python
def p10(score, y):
    k = int(round(0.10 * len(score)))
    return np.asarray(y)[np.argsort(-score)[:k]].mean()

print("precision@10%% on test: %.3f" % p10(s_ctl, y_te))
vals = []
for seed in range(20):     # SIMULATED: order_rate stops carrying signal
    broken = X_te.copy()
    broken["order_rate"] = np.random.default_rng(seed).permutation(
        broken.order_rate.values)
    vals.append(p10(model.predict_proba(broken)[:, 1], y_te))
print("scrambled order_rate (20 runs): mean %.3f, range %.3f-%.3f" % (
    np.mean(vals), min(vals), max(vals)))
for p in (0.40, 0.25):
    print("n=369, precision %.2f: standard error %.3f" % (
        p, np.sqrt(p * (1 - p) / 369)))
```

```
precision@10% on test: 0.405
scrambled order_rate (20 runs): mean 0.272, range 0.189-0.338
n=369, precision 0.40: standard error 0.026
n=369, precision 0.25: standard error 0.023
```

Scrambling the strongest feature drops precision from 0.405 to 0.272 on average. (The range is wide here because the test set flags only 74 customers; a real cycle has 369.) Based on the noise, set the thresholds at 0.32 for a watch (the ambition target from lesson 8, about three standard errors below today's level) and 0.25 for an alert (within about two standard errors of the 0.208 break-even).

## The plan on one page

| Signal | Watch | Alert | Action |
|---|---|---|---|
| Null rate, unseen category, schema | any change | any failure | Fix the pipeline; do not retrain |
| Feature PSI (any of the top 3 drivers) | 0.10 | 0.25 | Investigate; alert twice in a row means retrain |
| Score PSI or share above break-even | 0.10 / +5 pts | 0.25 / +15 pts | Investigate inputs first |
| Precision in top 10% (60-day lag) | below 0.32 | below 0.25 | Retrain and review the policy |

**Retraining triggers:** a scheduled quarterly retrain once new 60-day labels exist; two consecutive PSI alerts on a top-3 feature; or a performance alert. A retrain is a new snapshot with fresh labels, the same pipeline, and a challenger compared with the current model by the rule from lesson 10. Promote it only if it wins.

## Honest limits

The shifted data is simulated, so these numbers show that the tools work, not how the company will drift. Drift is not degradation: an unimportant feature can drift harmlessly, and concept drift (the same inputs now meaning something different) is invisible to input monitoring. Thresholds are starting points. Next you turn the whole project into a presentation.

## Recap

Watch four layers: quality, inputs, scores, and delayed performance. PSI stayed below 0.03 on a control, flagged the simulated shifts, and the score distribution summarized them. Set thresholds from measured noise, and write retraining triggers down before you need them.
