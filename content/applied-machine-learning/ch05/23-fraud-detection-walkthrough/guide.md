# Fraud Detection Walkthrough

Fraud is the hard case of imbalanced classification: in our illustrative data, fewer than 1 transaction in 100 is fraudulent. Accuracy is useless, investigators can only review so many alerts, and a model's value depends on what it finds within that budget. This lesson pulls together class weights, the right metrics, and stratified validation.

## What you'll learn

- Why accuracy fails and PR-AUC (average precision) is a better headline
- Stratified cross-validation with per-fold sample weights
- Comparing a logistic regression and gradient boosting
- Reporting results as "alerts within a review budget"

## The data

We simulate 50,000 card transactions. Fraud is more likely for large amounts, far from home, new devices, night hours, and online purchases.

```python
import numpy as np
import pandas as pd

rng = np.random.default_rng(3)
n = 50000
df = pd.DataFrame({
    "amount": np.exp(rng.normal(3.5, 1.0, n)).round(2),
    "hour": rng.integers(0, 24, n),
    "km_from_home": np.exp(rng.normal(1.5, 1.2, n)).round(1),
    "new_device": rng.choice([0, 1], n, p=[0.9, 0.1]),
    "category": rng.choice(["grocery", "travel", "online", "fuel"],
                           n, p=[0.4, 0.1, 0.3, 0.2]),
})
logit = (-16.9 + 1.6 * np.log(df.amount)
         + 1.0 * np.log1p(df.km_from_home)
         + 3.0 * df.new_device + 2.8 * (df.hour < 5)
         + 1.5 * (df.category == "online"))
df["fraud"] = (rng.random(n) < 1 / (1 + np.exp(-logit))).astype(int)
print("fraud rate", df.fraud.mean().round(4), "count", df.fraud.sum())
```

Output:

```
fraud rate 0.0067 count 334
```

Only 334 of 50,000 transactions, 0.67%, are fraud. A model that says "legitimate" every time would be 99.3% accurate and catch nothing.

## Split with stratification

```python
from sklearn.model_selection import train_test_split
X, y = df.drop(columns="fraud"), df["fraud"]
X_tr, X_te, y_tr, y_te = train_test_split(
    X, y, test_size=0.25, stratify=y, random_state=42)
print(y_tr.sum(), y_te.sum())   # 251 83
```

`stratify=y` keeps the fraud rate the same in both parts. The test set holds just 83 fraud cases, so every estimate is noisy, which we should say out loud.

## Compare models with PR-AUC

**Average precision** (the area under the precision-recall curve) focuses on how well the model ranks the rare positives, and it is far more sensitive than ROC AUC when positives are scarce. For scoring inside cross-validation we write the loop by hand, so sample weights can be computed from each fold's own training labels.

```python
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import HistGradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import average_precision_score
from sklearn.model_selection import StratifiedKFold
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.utils.class_weight import compute_sample_weight

pre = ColumnTransformer([
    ("num", StandardScaler(),
     ["amount", "hour", "km_from_home", "new_device"]),
    ("cat", OneHotEncoder(handle_unknown="ignore"), ["category"]),
])
def pipe(m):
    return Pipeline([("pre", pre), ("model", m)])

cands = {
    "logistic": (pipe(LogisticRegression(max_iter=1000)), False),
    "logistic balanced": (pipe(LogisticRegression(
        max_iter=1000, class_weight="balanced")), False),
    "hist GB + weights": (pipe(
        HistGradientBoostingClassifier(random_state=0)), True),
}
skf = StratifiedKFold(5, shuffle=True, random_state=0)
for name, (p, weighted) in cands.items():
    aps = []
    for a, b in skf.split(X_tr, y_tr):
        Xa, ya = X_tr.iloc[a], y_tr.iloc[a]
        if weighted:
            w = compute_sample_weight("balanced", ya)
            p.fit(Xa, ya, model__sample_weight=w)
        else:
            p.fit(Xa, ya)
        pr = p.predict_proba(X_tr.iloc[b])[:, 1]
        aps.append(average_precision_score(y_tr.iloc[b], pr))
    print(f"{name:18s} PR-AUC {np.mean(aps):.3f} +/- {np.std(aps):.3f}")
```

Output:

```
logistic           PR-AUC 0.231 +/- 0.030
logistic balanced  PR-AUC 0.167 +/- 0.024
hist GB + weights  PR-AUC 0.237 +/- 0.016
```

A useless model would score about the base rate, 0.007, so all three are learning something real. Two lessons stand out. Gradient boosting is best, though only marginally ahead of plain logistic regression given the spread. And `class_weight="balanced"` did not help ranking quality for logistic regression here (0.167 versus 0.231): weights mostly move the operating point, and can distort the fit. Test rather than assume.

## Report it as a review budget

Suppose investigators can review 2% of test transactions, 250 alerts. We fit the chosen pipeline on all training data and take the 250 highest-scoring transactions.

```python
final, _ = cands["hist GB + weights"]
final.fit(X_tr, y_tr, model__sample_weight=
          compute_sample_weight("balanced", y_tr))
proba = final.predict_proba(X_te)[:, 1]
print(average_precision_score(y_te, proba))   # test PR-AUC 0.289

budget = int(0.02 * len(y_te))
top = np.argsort(proba)[::-1][:budget]
hits = y_te.to_numpy()[top].sum()
print(hits, hits / budget, hits / y_te.sum())
```

The test PR-AUC is 0.289 and ROC AUC is 0.928. Of the 250 alerts, 44 were real fraud: precision of 17.6%, about 27 times the 0.66% base rate, and recall of 53%. In business terms: reviewing 2% of transactions catches roughly half of the fraud. With only 83 fraud cases in the test set, that estimate could easily move by several points on another sample.

## Plot the curves

```python
import matplotlib.pyplot as plt
from sklearn.metrics import precision_recall_curve
fig, ax = plt.subplots(figsize=(5.5, 3.8))
for name, (p, weighted) in cands.items():
    if weighted:
        p.fit(X_tr, y_tr, model__sample_weight=
              compute_sample_weight("balanced", y_tr))
    else:
        p.fit(X_tr, y_tr)
    pr = p.predict_proba(X_te)[:, 1]
    pp, rr, _ = precision_recall_curve(y_te, pr)
    ap = average_precision_score(y_te, pr)
    ax.plot(rr, pp, label=f"{name} (AP {ap:.2f})")
ax.axhline(y_te.mean(), color="gray", ls="--", label="base rate")
ax.set_xlabel("Recall")
ax.set_ylabel("Precision")
ax.set_title("Precision-recall curves (illustrative)")
ax.legend(frameon=False, fontsize=8)
plt.tight_layout()
plt.show()
```

## Recap

- With rare positives, use PR-AUC and precision at a budget, not accuracy.
- Stratify every split; compute sample weights from each fold's training labels.
- Do not assume weighting improves ranking; measure it.
- Report what the business gets: alerts reviewed, fraud caught, and the uncertainty.
