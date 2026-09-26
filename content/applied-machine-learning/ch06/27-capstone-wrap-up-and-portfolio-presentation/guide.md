# Capstone: Wrap-Up & Portfolio Presentation

In lesson 25 you framed the problem and set the floors. In lesson 26 you built a pipeline, compared models, and saved a logistic regression trained on the training set. This final lesson is the part that makes the project defensible: choose a decision threshold from costs *without* touching the test set, evaluate on the test set exactly once, quantify the uncertainty, write a model card, and package everything as a portfolio presentation.

## What you'll learn

- How to choose a threshold from business costs using out-of-fold predictions
- How to evaluate on the test set once, and read the confusion matrix
- How to put uncertainty around your result with a bootstrap
- How to write a model card that captures data, method, results, and limits
- How to structure a portfolio README and presentation

## Set up

```python
import numpy as np, pandas as pd, joblib
from capstone_data import make_cancel_data
from sklearn.model_selection import (
    train_test_split, StratifiedKFold, cross_val_predict)

df = make_cancel_data()
X = df.drop(columns="cancelled")
y = df.cancelled
X_tr, X_te, y_tr, y_te = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42)
model = joblib.load("cancel_model.joblib")
```

## Choose the threshold from costs, on training data

The default 0.5 threshold is meaningless for an 11% event. Instead, we use the costs from lesson 25 (an offer costs 10, a missed cancellation costs 100) and ask which threshold minimizes total cost. To do that without peeking at the test set, we score the training set with out-of-fold predictions: every customer is scored by a model that never saw them.

```python
FLAG, MISS = 10, 100

def cost_per_1000(y_true, flagged):
    y_true = np.asarray(y_true)
    flagged = np.asarray(flagged)
    missed = ((y_true == 1) & ~flagged).sum()
    total = FLAG * flagged.sum() + MISS * missed
    return 1000 * total / len(y_true)

cv = StratifiedKFold(5, shuffle=True, random_state=42)
oof = cross_val_predict(model, X_tr, y_tr, cv=cv,
                        method="predict_proba")[:, 1]
grid = np.round(np.arange(0.05, 0.31, 0.01), 2)
costs = [cost_per_1000(y_tr, oof >= t) for t in grid]
best_t = grid[int(np.argmin(costs))]
print("best", best_t, round(min(costs)))
```

The best threshold is `0.11`, at a cost of about 7,604 per 1,000 customers, against 11,125 for contacting nobody and 10,000 for contacting everybody. It flags roughly 40% of customers. There is a theory check: if offers always work, contacting a customer pays off when the cancel probability exceeds offer cost divided by missed-cancel cost, 10/100 = 0.10. Our empirical 0.11 agrees, which is one more reason we kept the model with honest probabilities in lesson 26. The cost curve is fairly flat between 0.10 and 0.12, so the exact choice is not fragile.

## Evaluate on the test set, once

```python
from sklearn.metrics import (
    roc_auc_score, average_precision_score, confusion_matrix,
    precision_score, recall_score)

p_te = model.predict_proba(X_te)[:, 1]
print("AP", round(average_precision_score(y_te, p_te), 3))
print("AUC", round(roc_auc_score(y_te, p_te), 3))
flag = p_te >= best_t
print(confusion_matrix(y_te, flag))
print("cost", round(cost_per_1000(y_te, flag)))
```

The test average precision is `0.333` and the ROC AUC is `0.744`. The confusion matrix at threshold 0.11 is `[[695 372] [43 90]]`: of 133 real cancellers we flagged 90 (recall 0.677) and missed 43, and we sent 372 unnecessary offers, so precision is only 0.195. The cost is 7,433 per 1,000 customers, compared with 10,000 for contacting everybody and 11,083 for nobody on the test set: about 26% cheaper than the best blanket policy.

Notice that the test average precision (0.333) is higher than the cross-validated 0.258. With only 133 positives in the test set, that gap is plausibly luck. The honest headline is the cross-validated figure, plus the interval below.

## Quantify uncertainty with a bootstrap

```python
rng = np.random.default_rng(0)
yt = y_te.to_numpy()
aps, saved = [], []
for _ in range(1000):
    idx = rng.integers(0, len(yt), len(yt))
    aps.append(average_precision_score(yt[idx], p_te[idx]))
    saved.append(cost_per_1000(yt[idx], np.ones(len(idx), bool))
                 - cost_per_1000(yt[idx], flag[idx]))
print(np.percentile(aps, [2.5, 97.5]).round(3))
print(np.percentile(saved, [2.5, 97.5]).round(0))
```

Resampling the test rows 1,000 times gives a 95% interval of `[0.26, 0.418]` for average precision, and a saving over "contact everybody" of between roughly 1,491 and 3,609 per 1,000 customers. In every resample the model beat the blanket campaign. The interval only reflects test-set sampling noise, not uncertainty from training, and not whether the cost assumptions are right.

## Write the model card

Capture the facts in code so they cannot drift from the results.

```python
import hashlib, json, platform, sklearn

card = {
    "name": "cancel-risk-logreg-v1",
    "data": {"rows": len(df),
             "positive_rate": round(float(y.mean()), 3),
             "fingerprint": hashlib.sha256(
                 df.to_csv(index=False).encode()
             ).hexdigest()[:12]},
    "cv_average_precision": "0.258 +/- 0.048",
    "threshold": {"value": float(best_t),
                  "costs": {"offer": FLAG, "missed": MISS}},
    "test": {"average_precision": 0.333, "roc_auc": 0.744,
             "cost_per_1000": 7433},
    "limitations": ["Synthetic data", "Not causal",
                    "No time axis"],
    "environment": {"python": platform.python_version(),
                    "scikit-learn": sklearn.__version__}}
with open("model_card.json", "w") as f:
    json.dump(card, f, indent=2)
```

On our machine the data fingerprint is `ba5804f807e8`, and the environment is Python 3.9.13 with scikit-learn 1.1.2. A fuller card would also record the feature list, the split settings, and the test precision (0.195) and recall (0.677). If a colleague's fingerprint differs from yours, you are not looking at the same data.

## Chart the decision

```python
import matplotlib.pyplot as plt
from sklearn.metrics import precision_recall_curve

nobody = cost_per_1000(y_tr, np.zeros(len(y_tr), bool))
everybody = cost_per_1000(y_tr, np.ones(len(y_tr), bool))
prec, rec, _ = precision_recall_curve(y_te, p_te)
fig, (a, b) = plt.subplots(1, 2, figsize=(11, 4))
a.plot(grid, costs, color="#2F6B8A")
a.axhline(everybody, color="#6B6259", linestyle="--")
a.axhline(nobody, color="#6B6259", linestyle=":")
a.axvline(best_t, color="#8E1C1C")
a.set_xlabel("threshold")
a.set_ylabel("cost per 1,000 customers")
a.set_title("Cost by threshold (train, out-of-fold)")
b.plot(rec, prec, color="#2F6B8A")
b.axhline(y_te.mean(), color="#6B6259", linestyle="--")
b.scatter([recall_score(y_te, flag)],
          [precision_score(y_te, flag)], color="#8E1C1C",
          zorder=3, label=f"threshold {best_t}")
b.set_xlabel("recall")
b.set_ylabel("precision")
b.set_title("Precision-recall (test set)")
b.legend()
fig.tight_layout()
fig.savefig("capstone-final.png", dpi=150)
```

Left: the cost curve dips to its minimum near 0.11, well under the dashed "contact everybody" line. Right: the test precision-recall curve, with the operating point in crimson and the dashed baseline at the 0.111 cancel rate.

## Be honest about limitations

- **Synthetic data.** The results show the method, not a business outcome.
- **Associations, not causes.** A high-risk flag does not show why a customer will cancel, or that an offer will change it.
- **The offer-always-works assumption** is optimistic. Real save rates would raise the value of the model less, and could move the best threshold.
- **No time axis.** Real churn models must be trained on the past and tested on the future.
- **A small test set.** 133 positives means wide intervals.

## Package it as a portfolio project

```text
README.md
  1. Problem and decision (with costs)
  2. Data: source, size, caveats
  3. Approach: split, baseline, pipeline, models, tuning
  4. Results: CV table, test metrics, interval
  5. Threshold and recommendation
  6. Limitations and next steps
capstone_data.py
notebooks/  01_explore.ipynb  02_model.ipynb
model_card.json
requirements.txt
```

Present it as five to seven slides: the decision, what the data showed, how you compared models, what you recommend and what it saves, and what you would do next. Lead with the decision, not the algorithm. Be ready to defend three questions: why this metric, why this threshold, and how do you know the test result is not luck.

## Course complete

You can now build a complete scikit-learn workflow: pipelines with `ColumnTransformer`, classification and regression metrics, cross-validation, tuning, class imbalance, missing data, and honest documentation. The next course, Advanced Data Science, takes you to the specializations that separate junior from senior candidates: boosting, time-series forecasting, NLP, recommendation systems, and model explainability.
