# Capstone: Build It

In lesson 25 you framed the cancellation problem, wrote success criteria, sealed a test set, and set floors: 0.5 ROC AUC, 0.111 average precision, and a business cost of 10,000 per 1,000 customers to beat. Now you build. You will create one leakage-safe preprocessing pipeline, compare five models with cross-validation, see exactly what class weights do and do not do, tune a candidate, choose the winner, and save it. Results here are honest: the signal in this data is modest, and the simplest model wins.

## What you'll learn

- How to build a `ColumnTransformer` that imputes, scales, and encodes inside a `Pipeline`
- How to compare models fairly with stratified cross-validation and two metrics
- What `class_weight` changes (the decision at 0.5) and what it does not (the ranking)
- How to tune with `RandomizedSearchCV` and `GridSearchCV`
- How to pick the winner, read its coefficients, and save it with `joblib`

## Set up (from lesson 25)

```python
import numpy as np, pandas as pd
from capstone_data import make_cancel_data
from sklearn.model_selection import (
    train_test_split, StratifiedKFold, cross_validate,
    cross_val_predict, RandomizedSearchCV, GridSearchCV)

df = make_cancel_data()
X = df.drop(columns="cancelled")
y = df.cancelled
X_tr, X_te, y_tr, y_te = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42)
```

## One preprocessing pipeline for every model

Numeric columns need imputing (some `monthly_spend` and `days_idle` values are missing) and scaling. Categorical columns need one-hot encoding. Because the transformer sits inside the pipeline, each cross-validation fold learns its medians, means, and categories from that fold's training rows only.

```python
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder

num = ["tenure_months", "monthly_spend", "sessions_30d",
       "days_idle", "support_tickets", "failed_payments"]
cat = ["plan", "channel"]
prep = ColumnTransformer([
    ("num", Pipeline([
        ("imp", SimpleImputer(strategy="median")),
        ("sc", StandardScaler())]), num),
    ("cat", OneHotEncoder(sparse=False), cat)])
```

## Compare five models

We compare a dummy baseline, logistic regression with and without class weights, a balanced random forest, and histogram gradient boosting, using 5-fold stratified cross-validation on the training set and two metrics.

```python
from sklearn.dummy import DummyClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import (
    RandomForestClassifier, HistGradientBoostingClassifier)

models = {
    "dummy": DummyClassifier(strategy="prior"),
    "logistic": LogisticRegression(max_iter=1000),
    "logistic, balanced": LogisticRegression(
        max_iter=1000, class_weight="balanced"),
    "forest, balanced": RandomForestClassifier(
        n_estimators=300, min_samples_leaf=5,
        class_weight="balanced_subsample",
        random_state=42, n_jobs=-1),
    "hist boosting": HistGradientBoostingClassifier(
        random_state=42)}
cv = StratifiedKFold(5, shuffle=True, random_state=42)
results = {}
for name, m in models.items():
    pipe = Pipeline([("prep", prep), ("model", m)])
    s = cross_validate(pipe, X_tr, y_tr, cv=cv,
        scoring=["average_precision", "roc_auc"])
    ap = s["test_average_precision"]
    results[name] = (ap.mean(), ap.std())
    print(f"{name:19s} AP {ap.mean():.3f} +/- {ap.std():.3f}"
          f"  AUC {s['test_roc_auc'].mean():.3f}")
```

```
dummy               AP 0.111 +/- 0.000  AUC 0.500
logistic            AP 0.258 +/- 0.048  AUC 0.704
logistic, balanced  AP 0.254 +/- 0.044  AUC 0.704
forest, balanced    AP 0.222 +/- 0.019  AUC 0.664
hist boosting       AP 0.207 +/- 0.007  AUC 0.635
```

Every real model beats the dummy, but the signal is modest: about 0.70 ROC AUC at best. Logistic regression leads, and the fold-to-fold spread (about 0.05) is as large as some of the gaps, so treat small differences with caution. The flexible models do not win here; with only 534 positive training rows they have little to learn beyond what a linear model captures.

## What class weights actually change

Class weights barely moved the scores above. That is expected: average precision and ROC AUC depend only on how customers are *ranked*, and reweighting classes changes probabilities more than ranking. What changes is the decision at the default 0.5 threshold.

```python
from sklearn.metrics import precision_score, recall_score

for name in ["logistic", "logistic, balanced"]:
    pipe = Pipeline([("prep", prep), ("model", models[name])])
    p = cross_val_predict(pipe, X_tr, y_tr, cv=cv,
                          method="predict_proba")[:, 1]
    print(f"{name:19s} mean p {p.mean():.3f}"
          f"  flagged {(p >= 0.5).mean():.3f}"
          f"  precision {precision_score(y_tr, p >= 0.5):.3f}"
          f"  recall {recall_score(y_tr, p >= 0.5):.3f}")
```

```
logistic            mean p 0.111  flagged 0.004  precision 0.471  recall 0.015
logistic, balanced  mean p 0.448  flagged 0.392  precision 0.188  recall 0.661
```

The plain model's average predicted probability is 0.111, matching the real cancel rate, so its probabilities are calibrated, but at 0.5 it flags only 0.4% of customers and catches 1.5% of cancellers. The balanced model flags 39% of customers and catches 66% of cancellers, but its average probability of 0.448 no longer means "chance of cancelling". Since lesson 27 chooses a threshold from costs, we want honest probabilities, so we keep the model without class weights and move the threshold instead.

## Tune a candidate

The forest is the most tunable contender, so we give it a fair search, scored on average precision.

```python
search = RandomizedSearchCV(
    Pipeline([("prep", prep), ("model", RandomForestClassifier(
        n_estimators=300, class_weight="balanced_subsample",
        random_state=42, n_jobs=-1))]),
    {"model__max_depth": [3, 5, 8, None],
     "model__min_samples_leaf": [5, 10, 30, 60]},
    n_iter=8, cv=cv, scoring="average_precision",
    random_state=42)
search.fit(X_tr, y_tr)
i = search.best_index_
print(search.best_params_, round(search.best_score_, 3))
results["forest, tuned"] = (
    search.best_score_,
    search.cv_results_["std_test_score"][i])
```

The best settings are `max_depth` 5 and `min_samples_leaf` 10, with an average precision of 0.247, up from 0.222 but still below the logistic model's 0.258. A quick check of logistic regularization with `GridSearchCV` over `C` in `[0.01, 0.1, 1, 10]` gives `[0.254 0.258 0.258 0.259]`: a plateau, so the default is fine.

## Read and save the winner

```python
import joblib
final = Pipeline([("prep", prep),
                  ("model", LogisticRegression(max_iter=1000))])
final.fit(X_tr, y_tr)
joblib.dump(final, "cancel_model.joblib")
names = final.named_steps["prep"].get_feature_names_out()
print(pd.Series(final.named_steps["model"].coef_[0],
                index=names).round(2))
```

Positive coefficients raise cancellation odds; negative lower them. Numeric features are standardized, so each coefficient is per one standard deviation. Longer tenure (-0.50) and more sessions (-0.18) reduce risk; more idle days (0.30), failed payments (0.28), and support tickets (0.20) raise it; the basic plan (0.50) and paid acquisition (0.28) raise it, while premium (-0.44) lowers it. These match the patterns in lesson 25's exploration, a useful sanity check. The one-hot columns overlap (they sum to one), so read them relative to each other rather than in isolation.

## Chart the comparison

```python
import matplotlib.pyplot as plt

coefs = pd.Series(final.named_steps["model"].coef_[0],
                  index=names).round(2)
labels = list(results)
means = [results[k][0] for k in labels]
errs = [results[k][1] for k in labels]
fig, (a, b) = plt.subplots(1, 2, figsize=(11, 4))
a.barh(labels, means, xerr=errs, capsize=4, color="#2F6B8A")
a.axvline(y_tr.mean(), color="#6B6259", linestyle="--")
a.set_title("5-fold CV average precision")
a.invert_yaxis()
b.barh(coefs.index, coefs.values, color="#8E1C1C")
b.axvline(0, color="black", linewidth=0.8)
b.set_title("Logistic regression coefficients")
b.invert_yaxis()
fig.tight_layout()
fig.savefig("capstone-models.png", dpi=150)
```

The dashed line is the 0.111 baseline. Note that the error bars overlap: honest evidence that logistic regression is at least as good as the alternatives, not proof it is far better.

## Recap

You built one leakage-safe pipeline, compared models on average precision and ROC AUC, learned that class weights change decisions rather than rankings, tuned a forest without beating the simple model, and saved a logistic pipeline trained on the training set only. The test set is still sealed. In lesson 27 you evaluate on it once, choose a cost-based threshold, write a model card, and present the project.
