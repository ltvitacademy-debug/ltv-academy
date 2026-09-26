# Feature Importance

A random forest can be accurate, but a hundred trees can't be read like a single checklist. Stakeholders still ask the natural question: what is the model actually paying attention to? **Feature importance** answers it by ranking the inputs by how much the model relies on them. Done carefully it guides feature selection, sanity-checks a model, and helps you explain results. Done carelessly it misleads, so this lesson also covers the traps.

## What you'll learn

- How impurity-based importance comes for free from a fitted forest
- How permutation importance measures the effect of breaking a feature on held-out data
- Why the two methods can rank features differently
- The main pitfalls: correlated features, causation, and where to compute it

## Method 1: impurity-based importance

Every split in every tree reduces impurity a little. A feature's **impurity-based importance** is the total reduction it produced across all trees, normalized so all importances add to 1. In scikit-learn it is the fitted attribute `feature_importances_`. It is essentially free, because it is computed during training.

We use the same bundled breast cancer dataset as the last lesson, with 30 named measurements per sample.

```python
import pandas as pd
from sklearn.datasets import load_breast_cancer
from sklearn.ensemble import RandomForestClassifier
from sklearn.inspection import permutation_importance
from sklearn.model_selection import train_test_split
X, y = load_breast_cancer(return_X_y=True, as_frame=True)
X_tr, X_te, y_tr, y_te = train_test_split(
    X, y, test_size=0.3, random_state=0, stratify=y)
rf = RandomForestClassifier(n_estimators=200, random_state=0)
rf.fit(X_tr, y_tr)
imp = pd.Series(rf.feature_importances_, index=X.columns)
print(imp.sort_values(ascending=False).head(5).round(3))
```

Output:

```
worst radius            0.133
worst perimeter         0.132
worst concave points    0.128
worst area              0.108
mean concave points     0.098
```

Five of the thirty features carry about 60% of the total importance. Wrapping the values in a pandas Series indexed by column name is the standard way to make them readable.

## Method 2: permutation importance

Impurity importance is computed from the training data and reflects how the trees were built, not necessarily how useful a feature is on new data. **Permutation importance** asks a more direct question: if I shuffle this one column in the test set, breaking its link to the target, how much does the model's score drop? A big drop means the model truly relies on it.

```python
perm = permutation_importance(
    rf, X_te, y_te, n_repeats=10, random_state=0)
pimp = pd.Series(perm.importances_mean, index=X.columns)
print(pimp.sort_values(ascending=False).head(5).round(3))
```

```
worst radius            0.021
worst area              0.019
worst texture           0.016
worst perimeter         0.012
worst concave points    0.012
```

Each value is the average drop in accuracy across 10 shuffles. It works with any model, not just forests, and it is computed on held-out data, which makes it a more honest measure of what matters for generalization.

## Why the rankings differ

The two methods do not agree. Notably, `worst texture` is third by permutation but doesn't appear in the impurity top five, and `worst concave points` is third by impurity but only tied for fourth by permutation. Also, the permutation values are small: shuffling the single best feature costs only about 2 points of accuracy. Why?

Because many of these features are near-duplicates. `worst radius` and `worst perimeter` are correlated at 0.994, and `worst area` is also strongly correlated with them, since all three describe the size of the same nucleus. When you shuffle one, the model leans on its siblings, so the score barely drops. With correlated features, importance is split or hidden among the group, and the ranking within the group is fairly arbitrary.

## See both side by side

```python
import matplotlib.pyplot as plt
top = imp.sort_values().tail(8)
ptop = pimp.sort_values().tail(8)
fig, axes = plt.subplots(1, 2, figsize=(10, 3.5))
top.plot.barh(ax=axes[0], title="Impurity-based")
ptop.plot.barh(ax=axes[1], title="Permutation (test set)")
plt.tight_layout()
plt.show()
```

## Pitfalls to remember

1. **Correlated features share credit.** Treat a cluster of related features as a group, and don't over-interpret their internal order.
2. **Importance is not causation.** A feature the model relies on is not necessarily a lever you can pull to change the outcome.
3. **Importance doesn't give direction.** It says *how much*, not whether the effect is positive or negative. Use partial dependence plots or, for linear models, the coefficients.
4. **Compute it on held-out data when you can.** Impurity importance reflects the training data, and it can favor features with many distinct values.
5. **A high score on a suspicious feature is a red flag.** If one feature dominates unexpectedly, check for data leakage from Chapter 2.

## Using importance in practice

- Drop features whose importance is near zero, then re-check validation performance. This connects back to feature selection.
- Sanity-check against domain knowledge: the top features should make sense to someone who knows the business.
- Communicate carefully: "the model relies most on radius-related measurements" is fair; "radius causes malignancy" is not.

## Recap

Impurity-based importance is free and fast, and permutation importance is model-agnostic and measured on held-out data. They can disagree, especially when features are correlated. Treat importance as a guide to what the model uses, not an explanation of the world. That completes our first tour of trees and ensembles. Next, we look at two other classic algorithms: k-nearest neighbors and Naive Bayes.
