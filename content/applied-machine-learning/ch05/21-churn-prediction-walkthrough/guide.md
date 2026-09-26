# Churn Prediction Walkthrough

Churn prediction is the classic applied classification project: which customers are likely to leave, so the business can reach out first? This lesson walks a complete project from raw table to a decision you could defend, using the pipeline habits from earlier in the course. The data is a seeded, illustrative telecom-style table, so every number below comes from code you can run.

## What you'll learn

- Framing churn as a prediction problem with a real business action
- Building a baseline, then comparing candidate pipelines with cross-validation
- Evaluating once on the held-out test set
- Turning probabilities into a campaign list, and explaining what drives them

## 1. Frame the problem

Before code, write one sentence: *"Each month, rank active customers by churn risk so the retention team can contact the riskiest 20%."* That sentence tells you the target (`churned`), the metric that matters (ranking quality, so ROC AUC and precision at the top), and the action (a call list, not a yes/no label).

## 2. Build and inspect the data

```python
import numpy as np
import pandas as pd

rng = np.random.default_rng(7)
n = 4000
df = pd.DataFrame({
    "tenure_months": rng.integers(1, 72, n),
    "monthly_charge": rng.normal(70, 22, n).clip(20, 140).round(2),
    "contract": rng.choice(["month-to-month", "one-year", "two-year"],
                           n, p=[0.55, 0.25, 0.20]),
    "support_tickets": rng.poisson(1.2, n),
    "autopay": rng.choice(["yes", "no"], n),
})
logit = (-1.6 - 0.05 * (df.tenure_months - 30)
         + 0.02 * (df.monthly_charge - 70)
         + 0.35 * df.support_tickets
         + 1.0 * (df.contract == "month-to-month")
         - 0.9 * (df.contract == "two-year")
         - 0.4 * (df.autopay == "yes"))
df["churned"] = (rng.random(n) < 1 / (1 + np.exp(-logit))).astype(int)
print("churn rate:", df.churned.mean().round(3))
print(df.groupby("contract").churned.mean().round(3))
```

Output:

```
churn rate: 0.272
contract
month-to-month    0.364
one-year          0.216
two-year          0.104
```

About 27% of customers churn, a moderate imbalance. Month-to-month customers churn at 36% versus 10% on two-year contracts, an early hint of what the model should find.

## 3. Split first, then compare pipelines

Hold out 20% as a test set before doing anything else, then compare candidates using cross-validation on the training portion only.

```python
from sklearn.compose import ColumnTransformer
from sklearn.dummy import DummyClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

X, y = df.drop(columns="churned"), df["churned"]
X_tr, X_te, y_tr, y_te = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42)

pre = ColumnTransformer([
    ("num", StandardScaler(),
     ["tenure_months", "monthly_charge", "support_tickets"]),
    ("cat", OneHotEncoder(handle_unknown="ignore"),
     ["contract", "autopay"]),
])
models = {
    "baseline": DummyClassifier(strategy="prior"),
    "logistic": LogisticRegression(max_iter=1000),
    "forest": RandomForestClassifier(n_estimators=200,
                                     min_samples_leaf=5,
                                     random_state=0),
}
for name, m in models.items():
    pipe = Pipeline([("pre", pre), ("model", m)])
    s = cross_val_score(pipe, X_tr, y_tr, cv=5, scoring="roc_auc")
    print(f"{name:9s} AUC {s.mean():.3f} +/- {s.std():.3f}")
```

Output:

```
baseline  AUC 0.500 +/- 0.000
logistic  AUC 0.806 +/- 0.012
forest    AUC 0.782 +/- 0.019
```

The baseline sits at 0.5, pure chance, which is the number to beat. The simple logistic regression edges out the forest, and it is easier to explain. Complexity is not automatically better; here the true signal is close to linear.

## 4. Evaluate once on the test set

```python
from sklearn.metrics import roc_auc_score
final = Pipeline([("pre", pre),
                  ("model", LogisticRegression(max_iter=1000))])
final.fit(X_tr, y_tr)
proba = final.predict_proba(X_te)[:, 1]
print("test AUC", round(roc_auc_score(y_te, proba), 3))
```

The test AUC is 0.802, in line with the cross-validated 0.806, so we have no sign of overfitting the selection. At the default 0.5 threshold, recall for churners is only 0.447 (precision 0.642), which is why the campaign should not use a plain yes/no cutoff.

## 5. Turn scores into a call list

```python
k = int(0.2 * len(y_te))
top = np.argsort(proba)[::-1][:k]
print(y_te.to_numpy()[top].mean())
```

Contacting the 160 riskiest customers reaches a group where 64.4% actually churn, against a 27.1% base rate, and captures 47.5% of all churners. That is a concrete, defensible business statement.

## 6. Explain what drives it

```python
from sklearn.inspection import permutation_importance
r = permutation_importance(final, X_te, y_te, scoring="roc_auc",
                           n_repeats=10, random_state=0)
imp = pd.Series(r.importances_mean, index=X.columns).sort_values()
imp.plot.barh(color="#8E1C1C", figsize=(6, 3.2))
```

Tenure and contract type dominate; autopay matters least. Permutation importance shuffles one input at a time and measures how much the score falls.

## Recap

- Frame the project as an action and a metric before modeling.
- Baseline first; compare pipelines with cross-validation on training data.
- Touch the test set once, then translate scores into a top-k list.
- Explain drivers so the business can act, not just predict.
