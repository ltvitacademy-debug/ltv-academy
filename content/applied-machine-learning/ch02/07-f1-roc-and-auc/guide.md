# F1, ROC & AUC

Lesson 6 left us with two numbers that pull against each other: precision and recall. Comparing two models on two numbers is awkward, so this lesson introduces a single score that combines them (F1), and then a very different way of judging a model that does not depend on any one cutoff at all (the ROC curve and its AUC). Along the way we will see that "which model is better" can depend on which of these you ask.

## What you'll learn

- How F1 and F-beta combine precision and recall, and why the harmonic mean is used
- How to read an ROC curve, and what AUC actually measures
- Why F1 (which needs a cutoff) and AUC (which does not) can rank models differently
- How to compute all of them in scikit-learn and plot ROC curves from code

## Setup

We reuse the setup from Lesson 6: the churn pipeline `model` (preprocessing plus logistic regression), the illustrative customer data, and `pred = model.predict(X_test)`. We also fit a 200-tree random forest pipeline `rf` for comparison.

```python
from sklearn.ensemble import RandomForestClassifier

rf = Pipeline([("prep", pre), ("clf", RandomForestClassifier(
    n_estimators=200, random_state=0))]).fit(X_train, y_train)
```

## F1: one number for precision and recall

The **F1 score** is the harmonic mean of precision and recall:

```
F1 = 2 x precision x recall / (precision + recall)
```

A harmonic mean is dragged toward the smaller value, so you cannot hide poor recall behind excellent precision, or the reverse. Our model had precision 0.516 and recall 0.271. Their plain average would be 0.394, but F1 is lower:

```python
from sklearn.metrics import f1_score, fbeta_score
print(round(f1_score(y_test, pred), 3))
print(round(fbeta_score(y_test, pred, beta=2), 3))
print(round(fbeta_score(y_test, pred, beta=0.5), 3))
```

```
0.356
0.3
0.437
```

**F-beta** generalizes F1 with a weight `beta`. `beta=2` counts recall more heavily than precision (0.300 here, because recall is the weak spot), and `beta=0.5` favors precision (0.437). Choose the beta that reflects the business cost from Lesson 6, and stay with it.

## The ROC curve

Most classifiers output a score or probability, and `predict` turns it into a class using a cutoff (0.5 for `LogisticRegression`). The **ROC curve** sweeps the cutoff from strict to permissive and plots two rates at each setting:

- **True positive rate** (TPR), which is recall: the share of real churners caught.
- **False positive rate** (FPR): the share of real stayers wrongly flagged, FP / (FP + TN).

A very strict cutoff flags nobody: (0, 0) at the bottom left. A very loose cutoff flags everyone: (1, 1) at the top right. A model with no skill lies along the diagonal; a better model bows toward the top-left corner.

```python
from sklearn.metrics import roc_auc_score, roc_curve
proba = model.predict_proba(X_test)[:, 1]
print(round(roc_auc_score(y_test, proba), 3))
fpr, tpr, thresholds = roc_curve(y_test, proba)
print(len(thresholds))
```

```
0.745
85
```

`roc_curve` returns one point per distinct threshold (85 here). Note that we score with **probabilities** (`predict_proba`), not the hard 0/1 predictions, since hard predictions have only one cutoff.

## What AUC means

The **area under the ROC curve (AUC)** compresses the curve into one number between 0 and 1. It has a concrete meaning: **the probability that a randomly chosen churner is scored higher than a randomly chosen stayer**. We can check this directly by comparing every churner with every stayer in the test set:

```python
import numpy as np
pos = proba[y_test.values == 1]
neg = proba[y_test.values == 0]
print(round(np.mean([a > b for a in pos for b in neg]), 3))
```

```
0.745
```

Same value: 0.745. Read AUC like this: 0.5 is a coin flip, 1.0 is perfect ranking, and anything below 0.5 means the scores are backwards. AUC measures **ranking quality across all thresholds**, and is unaffected by the class balance in the way accuracy is. (A dummy classifier that outputs a constant scores exactly 0.5.) When classes are severely imbalanced, precision-recall curves and `average_precision_score` are often more informative; AUC can look flattering because FPR is diluted by the huge number of negatives.

## Plot it

The code below produced the figure that follows. `RocCurveDisplay.from_estimator` fits the scoring and plotting into one call.

```python
import matplotlib.pyplot as plt
from sklearn.metrics import RocCurveDisplay

fig, ax = plt.subplots(figsize=(6.4, 4.8))
RocCurveDisplay.from_estimator(model, X_test, y_test,
    name="Logistic regression", ax=ax, color="#1f5fa8")
RocCurveDisplay.from_estimator(rf, X_test, y_test,
    name="Random forest", ax=ax, color="#c25b12")
ax.plot([0, 1], [0, 1], "--", color="gray", label="Chance (AUC 0.50)")
ax.set_title("ROC curves on the test set (illustrative data)")
ax.legend(loc="lower right")
fig.savefig("roc-curves.png", dpi=150, bbox_inches="tight")
```

The saved chart (illustrative data) shows the logistic regression curve (AUC 0.75) above the random forest for much of the range (AUC 0.72), and both well above the dashed chance line.

## F1 and AUC can disagree

```python
for name, m in [("logistic", model), ("forest", rf)]:
    p = m.predict_proba(X_test)[:, 1]
    print(name, round(roc_auc_score(y_test, p), 3),
          round(f1_score(y_test, m.predict(X_test)), 3))
```

```
logistic 0.745 0.356
forest 0.724 0.429
```

The logistic regression ranks customers better overall (higher AUC), yet at the default 0.5 cutoff the forest flags more churners and earns the higher F1. Neither is wrong: AUC judges the whole ranking, F1 judges one operating point. Which matters depends on whether you can still choose the cutoff, which is exactly the subject of the next lesson.

## Recap

F1 is the harmonic mean of precision and recall, and F-beta lets you weight one over the other. The ROC curve plots true positive rate against false positive rate as the cutoff moves; AUC summarizes it as the probability that a random positive outranks a random negative. Use probabilities for ROC, remember that AUC ignores the operating threshold, and prefer precision-recall views when positives are rare. Next: confusion matrices and thresholds, where we choose the cutoff on purpose.
