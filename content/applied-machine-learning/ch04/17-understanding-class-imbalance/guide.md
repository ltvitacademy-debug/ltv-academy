# Understanding Class Imbalance

In many real projects the outcome you care about is rare. Only a few percent of transactions are fraud, a few percent of machines fail this month, a few percent of visitors buy. Data like this is called **imbalanced**, and it quietly breaks the habits that work on balanced data. This lesson shows how to spot the problem, why accuracy misleads, and which measurements to trust instead. The next two lessons cover fixes.

## What you'll learn

- What class imbalance is and how to measure it
- Why accuracy is the wrong scoreboard, and how a dummy baseline exposes it
- Why you should stratify your splits
- Which metrics stay honest when one class is rare

## 1. Measure the imbalance

We use the same seeded, illustrative dataset as the rest of this chapter: 5,000 rows, about 5% positive.

```python
import pandas as pd
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split

X, y = make_classification(n_samples=5000, n_features=8,
                           n_informative=4, weights=[0.95],
                           flip_y=0.01, n_clusters_per_class=1,
                           class_sep=1.2, random_state=42)
print(pd.Series(y).value_counts())
print(pd.Series(y).value_counts(normalize=True).round(3))
```

Output:

```
0    4737
1     263
dtype: int64
0    0.947
1    0.053
dtype: float64
```

There are 4,737 negatives and only 263 positives: a ratio of roughly 18 to 1. Always run `value_counts` on your target before you model anything.

## 2. The accuracy trap

Now build a **dummy baseline**: a "model" that ignores every feature and always predicts the most common class. Compare it to a real logistic regression.

```python
from sklearn.dummy import DummyClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (accuracy_score, recall_score,
                             precision_score)

X_tr, X_te, y_tr, y_te = train_test_split(
    X, y, test_size=0.25, stratify=y, random_state=42)

dummy = DummyClassifier(strategy="most_frequent").fit(X_tr, y_tr)
model = LogisticRegression(max_iter=1000).fit(X_tr, y_tr)

for name, m in [("dummy", dummy), ("logreg", model)]:
    pred = m.predict(X_te)
    print(name,
          "acc", round(accuracy_score(y_te, pred), 3),
          "recall", round(recall_score(y_te, pred), 3),
          "precision", round(precision_score(
              y_te, pred, zero_division=0), 3))
```

Output:

```
dummy acc 0.947 recall 0.0 precision 0.0
logreg acc 0.97 recall 0.439 precision 1.0
```

The dummy model scores **94.7% accuracy** while finding zero positives. The logistic regression's 97% looks only three points better, yet it is the only one that catches anything. Accuracy rewards the majority class, so when classes are lopsided a high accuracy proves almost nothing. Any imbalanced project should start by writing down the dummy baseline: it is the number your model has to beat.

## 3. Always stratify

A random split of a rare class can be unlucky. On a small 400-row slice of this data (18 positives), we repeated a 75/25 split 200 times and counted positives in the test set:

```
test positives, plain split: min 0 max 10
test positives, stratified : min 4 max 5
```

A plain split sometimes leaves the test set with **no positives at all**, making recall undefined. Passing `stratify=y` keeps the class ratio the same in both parts. Use it in `train_test_split`, and remember that `cross_val_score` uses stratified folds automatically for classifiers when you pass an integer `cv`.

## 4. Metrics that stay honest

- **Recall** and **precision** for the rare class, reported separately.
- **Precision-recall curve** and **average precision**. Unlike ROC AUC, they focus on the rare class, and a random model's precision equals the positive rate (here 0.053), a clear floor.
- **A cost or business metric** when you know what errors cost (lesson 19).

On our model, ROC AUC is 0.919 and average precision is 0.755. ROC AUC can look comfortable on imbalanced data because the huge pool of negatives makes the false-positive rate small; average precision tells you more about how useful the top of your ranked list really is.

```python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics import precision_recall_curve

proba = model.predict_proba(X_te)[:, 1]
prec, rec, _ = precision_recall_curve(y_te, proba)
fig, ax = plt.subplots(1, 2, figsize=(9, 3.6))
ax[0].bar(["negative", "positive"], np.bincount(y))
ax[0].set_title("Class counts (5,000 rows)")
ax[1].plot(rec, prec, label="model")
ax[1].axhline(y_te.mean(), ls="--", color="gray",
              label="random guessing")
ax[1].set_xlabel("recall")
ax[1].set_ylabel("precision")
ax[1].set_title("Precision-recall curve")
ax[1].legend()
plt.tight_layout()
plt.show()
```

The dashed line is the baseline. The further the curve sits above it, the more the model adds.

## Recap

- Check `value_counts` on the target first; note the ratio.
- A dummy "always the majority" model can score 94.7% accuracy here, so accuracy alone is misleading.
- Stratify every split so the rare class appears in each part.
- Report recall, precision, average precision, or a cost, not accuracy alone.
- Next: resampling, the first family of fixes.
