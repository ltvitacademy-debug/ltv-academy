# Capstone: Build It

In lesson 27 you framed the churn problem, explored the data, sealed away a test set, and set a baseline of 0.5 ROC AUC. Now you build. This lesson creates a leakage-safe preprocessing pipeline, compares three models with cross-validation, tunes the most promising one, and reads what the winner learned. The result may surprise you: the fanciest model does not win, and that is a valuable lesson in itself.

## What you'll learn

- How to build a preprocessing `ColumnTransformer` that imputes, scales, and encodes
- How to compare models fairly with stratified cross-validation on the training set
- How to tune a model with `GridSearchCV`
- How to read coefficients and feature importances
- Why the simplest model can be the right answer

## Set up (from lesson 27)

This uses `capstone_data.py`, the file you saved in lesson 27, and the same split.

```python
import numpy as np, pandas as pd
from capstone_data import make_churn_data
from sklearn.model_selection import (
    train_test_split, cross_val_score,
    GridSearchCV, StratifiedKFold)

df = make_churn_data()
X = df.drop(columns="churned")
y = df.churned
X_tr, X_te, y_tr, y_te = train_test_split(
    X, y, test_size=0.2, stratify=y,
    random_state=42)
```

## One preprocessing pipeline for every model

Our features need different treatment: numeric columns need imputing (some monthly charges are missing) and scaling, while categorical columns need one-hot encoding. A `ColumnTransformer` applies the right steps to the right columns. Putting it inside a `Pipeline` with the model means every cross-validation fold learns its imputer, scaler, and encoder from that fold's training portion only. That is exactly how you avoid the leakage you studied earlier.

```python
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import (
    StandardScaler, OneHotEncoder)

num = ["tenure_months", "monthly_charges",
       "support_calls"]
cat = ["contract", "autopay"]

prep = ColumnTransformer([
    ("num", Pipeline([
        ("imp", SimpleImputer(strategy="median")),
        ("sc", StandardScaler())]), num),
    ("cat", OneHotEncoder(drop="first"), cat)])
```

## Compare three models

We compare logistic regression, a shallow decision tree, and a random forest, each scored by 5-fold stratified cross-validation on the training set, using ROC AUC.

```python
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier

models = {
  "logistic": LogisticRegression(max_iter=1000),
  "tree": DecisionTreeClassifier(
      max_depth=4, random_state=42),
  "forest": RandomForestClassifier(
      n_estimators=300, random_state=42)}
cv = StratifiedKFold(5, shuffle=True,
                     random_state=42)
results = {}
for name, m in models.items():
    pipe = Pipeline([("prep", prep), ("model", m)])
    s = cross_val_score(pipe, X_tr, y_tr, cv=cv,
                        scoring="roc_auc")
    results[name] = (s.mean(), s.std())
    print(name, s.mean().round(3), s.std().round(3))
```

The output:

```
logistic 0.776 0.022
tree 0.703 0.014
forest 0.702 0.029
```

Logistic regression leads with a mean AUC of 0.776, and both the tree and the untuned forest sit near 0.70. An untuned forest with fully grown trees overfits the training folds, which is the bias-variance trade-off from Chapter 1 showing up in real numbers.

## Tune the forest

A fair contest gives the forest a chance to improve. We search a small grid over tree depth and minimum leaf size.

```python
grid = GridSearchCV(
    Pipeline([("prep", prep),
              ("model", RandomForestClassifier(
                  n_estimators=300,
                  random_state=42))]),
    {"model__max_depth": [3, 5, 8, None],
     "model__min_samples_leaf": [1, 10, 30]},
    cv=cv, scoring="roc_auc")
grid.fit(X_tr, y_tr)
print(grid.best_params_, round(grid.best_score_, 3))
i = grid.best_index_
results["forest (tuned)"] = (
    grid.best_score_,
    grid.cv_results_["std_test_score"][i])
```

The best settings are `max_depth` 3 and `min_samples_leaf` 1, with a cross-validated AUC of 0.749. Tuning helped the forest by about 0.05, but it still trails logistic regression at 0.776. A quick sweep of the logistic model's regularization strength `C` shows the same story:

```python
g = GridSearchCV(
    Pipeline([("prep", prep),
              ("model", LogisticRegression(
                  max_iter=1000))]),
    {"model__C": [0.01, 0.1, 1, 10, 100]},
    cv=cv, scoring="roc_auc").fit(X_tr, y_tr)
print(g.cv_results_["mean_test_score"].round(3))
```

The scores are `[0.754 0.774 0.776 0.776 0.776]`, so the default `C=1` is already on the plateau.

Why does the simple model win? Our synthetic data was generated with an additive, roughly linear signal, exactly the shape logistic regression assumes. On real data the answer is not always this tidy, which is why you compare models rather than assuming. Choose logistic regression as the final model: it scores best, trains instantly, and is easy to explain.

## Read what the model learned

```python
final = Pipeline([("prep", prep),
    ("model", LogisticRegression(max_iter=1000))])
final.fit(X_tr, y_tr)
names = final.named_steps["prep"
    ].get_feature_names_out()
coefs = pd.Series(
    final.named_steps["model"].coef_[0],
    index=names).round(2)
print(coefs)
```

```
num__tenure_months       -0.82
num__monthly_charges      0.39
num__support_calls        0.38
cat__contract_one-year   -1.07
cat__contract_two-year   -1.81
cat__autopay_yes         -0.40
```

Positive coefficients raise churn odds, negative ones lower them. Longer tenure, longer contracts, and autopay all reduce churn risk; higher monthly charges and more support calls raise it. The numeric features are standardized, so their coefficients are per one standard deviation. Contract terms are compared with the dropped baseline, month-to-month. This matches the patterns you found in lesson 27, a good sanity check.

For comparison, ask the tuned forest what it relied on:

```python
best = grid.best_estimator_
imp = pd.Series(
    best.named_steps["model"].feature_importances_,
    index=best.named_steps["prep"
        ].get_feature_names_out())
print(imp.sort_values(ascending=False).round(3))
```

Tenure ranks first at 0.437, followed by the two-year contract flag at 0.245 and monthly charges at 0.145: the same story told a different way.

## Chart the comparison

```python
import matplotlib.pyplot as plt

names_m = list(results)
means = [results[k][0] for k in names_m]
errs = [results[k][1] for k in names_m]
fig, (a, b) = plt.subplots(1, 2, figsize=(10, 4))
a.bar(names_m, means, yerr=errs, capsize=4,
      color="#2F6B8A")
a.axhline(0.5, color="#6B6259", linestyle="--")
a.set_title("5-fold CV ROC AUC (dashed = baseline)")
a.set_ylim(0.4, 0.9)
a.tick_params(axis="x", labelrotation=20)
b.barh(coefs.index, coefs.values, color="#8E1C1C")
b.axvline(0, color="black", linewidth=0.8)
b.set_title("Logistic regression coefficients")
fig.tight_layout()
fig.savefig("capstone-models.png", dpi=150)
```

## Recap

You built one leakage-safe preprocessing pipeline, compared a logistic model, a tree, and a forest with cross-validation, tuned the forest, and discovered that the simple model was best. You also read the model's coefficients and confirmed they match the business patterns. The test set is still sealed. In lesson 29 you evaluate the final model on it, choose a decision threshold, add a customer-segmentation lens, and package the project for your portfolio.
