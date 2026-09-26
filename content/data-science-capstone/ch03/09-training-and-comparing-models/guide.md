# Training & Comparing Models

You have a leakage-safe feature table, a sealed test set, baselines, and an ambition target: cross-validated precision in the top 10% of at least 0.32, against a break-even of 0.208. Logistic regression already scored 0.390 in lesson 8. Now comes the step everyone wants to rush: trying more powerful models. The skill is not running `fit` four times. It is comparing models fairly, so that the answer you report survives a skeptical manager. Every number below comes from code run on the Harvest Table features. The data is synthetic, so treat the results as illustrative.

## What you'll learn

- How to compare models fairly: same pipeline, same folds, several metrics
- Why repeated cross-validation matters when your positive class is small
- How to read a paired comparison instead of trusting a single mean
- How to choose finalists when the differences are inside the noise

## Set up

Start with `common.py` from lesson 8. It loads the saved feature table, makes the same stratified split, and defines the preprocessing pipeline and the top-10% scorer. The test set does not appear again until lesson 10.

```python
from common import *   # split, prep, precision_at_10, BREAK_EVEN
from sklearn.model_selection import RepeatedStratifiedKFold, cross_validate
from sklearn.dummy import DummyClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import (
    RandomForestClassifier, HistGradientBoostingClassifier)
```

## Four candidates, one fair test

The candidates are the churn-rate dummy, logistic regression, a random forest, and histogram gradient boosting. Trees do not need scaling, but sharing one preprocessing pipeline keeps the comparison honest: the only thing that changes is the model. The settings below are sensible starting values, not tuned; tuning is lesson 10.

```python
models = {
    "churn-rate": DummyClassifier(strategy="prior"),
    "logistic": LogisticRegression(max_iter=1000),
    "random forest": RandomForestClassifier(
        n_estimators=300, min_samples_leaf=20,
        n_jobs=-1, random_state=42),
    "hist boosting": HistGradientBoostingClassifier(
        max_depth=3, learning_rate=0.05,
        max_iter=150, random_state=42),
}
cv = RepeatedStratifiedKFold(n_splits=5, n_repeats=3, random_state=42)
scoring = {"ap": "average_precision", "auc": "roc_auc",
           "p10": precision_at_10}
res = {}
for name, m in models.items():
    res[name] = cross_validate(
        Pipeline([("prep", prep), ("model", m)]),
        X_tr, y_tr, cv=cv, scoring=scoring)
    s = res[name]
    print(f"{name:14s} AP {s['test_ap'].mean():.3f}"
          f" +/-{s['test_ap'].std():.3f}"
          f"  AUC {s['test_auc'].mean():.3f}"
          f"  P@10% {s['test_p10'].mean():.3f}"
          f" +/-{s['test_p10'].std():.3f}")
```

Why repeated? With only 454 churners in the training set, each 5-fold split puts about 90 of them in a validation fold, so a single run is jumpy. Three repeats of five folds give 15 scores per model, and the same 15 splits are used for every candidate, which makes the paired comparison below possible.

```
churn-rate     AP 0.154 +/-0.001  AUC 0.500  P@10% 0.156 +/-0.029
logistic       AP 0.325 +/-0.035  AUC 0.707  P@10% 0.392 +/-0.057
random forest  AP 0.328 +/-0.029  AUC 0.700  P@10% 0.402 +/-0.033
hist boosting  AP 0.314 +/-0.027  AUC 0.691  P@10% 0.368 +/-0.052
```

Run time differs a lot: on the machine used here, about 1 second for logistic regression, 11 for the forest, and 4 for boosting. All three real models clear the ambition target (0.32) and the break-even (0.208) in the top 10%; the churn-rate model does not clear either.

## Read the differences, not just the means

The forest leads on average precision by 0.003 and on top-10% precision by 0.010, but the fold-to-fold standard deviation is 0.03 to 0.06. A gap that small next to the noise is not a finding. A paired comparison is fairer, because each model saw exactly the same 15 validation sets:

```python
lr = res["logistic"]["test_ap"]
for name in ["random forest", "hist boosting"]:
    d = res[name]["test_ap"] - lr
    print(f"{name} - logistic AP: {d.mean():+.3f}"
          f" | wins {(d > 0).sum()} of {len(d)} folds")
```

```
random forest - logistic AP: +0.003 | wins 9 of 15 folds
hist boosting - logistic AP: -0.012 | wins 6 of 15 folds
```

The forest wins 9 of 15 folds by three thousandths on average, a coin flip. Gradient boosting, the "most powerful" model, is slightly behind. Fold scores are not fully independent, so treat these as descriptions, not p-values.

Here is the same comparison as a chart, from the code below. The dashed lines are the churn rate on the left and the break-even precision on the right.

```python
import matplotlib.pyplot as plt
fig, axes = plt.subplots(1, 2, figsize=(10, 4.2), dpi=150, sharey=True)
panels = [("test_ap", "Average precision", y_tr.mean()),
          ("test_p10", "Precision in the top 10%", BREAK_EVEN)]
for ax, (key, title, ref) in zip(axes, panels):
    ax.boxplot([res[n][key] for n in res], vert=False,
               labels=list(res), widths=0.5)
    ax.axvline(ref, color="gray", linestyle="--")
    ax.set_title(title)
plt.tight_layout()
plt.savefig("compare_models.png")
```

## Choosing finalists

The honest reading: every real model beats the churn rate by about double, all clear the break-even in the top 10%, and the three real models are indistinguishable given the noise. That is common when the signal in behavioral data is modest and the features are already well engineered; there is little left for extra flexibility to find. So the decision is not "highest number wins." Weigh accuracy, explainability, speed, and how easy the model is to deploy and monitor. Logistic regression is fast, explainable, and easy to package; the forest is the only serious challenger. Boosting drops out for now.

Carry two finalists, logistic regression and the random forest, into lesson 10. Tuning both gives each a fair chance before you touch the test set.

## Recap

Compare models with identical pipeline and folds, repeat the cross-validation, and look at paired differences relative to the noise. Here logistic regression (AP 0.325, top-10% precision 0.392) and the random forest (0.328, 0.402) tie within noise, and boosting (0.314, 0.368) trails slightly. Next you tune the finalists and evaluate once on the test set.
