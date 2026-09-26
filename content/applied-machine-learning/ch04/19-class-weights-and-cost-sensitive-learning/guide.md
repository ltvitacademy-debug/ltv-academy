# Class Weights & Cost-Sensitive Learning

Resampling changes the data to fix an imbalance. There is a gentler alternative: leave the data alone and change what a mistake costs. **Class weights** tell the learning algorithm that missing a rare, valuable case is worse than raising a false alarm. This is called **cost-sensitive learning**, and in scikit-learn it is often a single argument.

## What you'll learn

- Why a model trained on imbalanced data ignores the rare class
- How `class_weight="balanced"` and custom weights work
- How to judge the result with precision, recall, and a business cost
- What to do when a model has no `class_weight` option

## Why models ignore the rare class

Most training algorithms minimize a loss that treats every row equally. When 95% of rows are "not fraud", predicting "not fraud" almost every time already gives a low loss and a great-looking accuracy. The 5% barely register.

Class weights fix this at the source. A weight of 5 on the rare class makes each of those rows count as five rows in the loss, so ignoring them becomes expensive.

## A seeded, imbalanced dataset

We generate 5,000 illustrative rows where only about 5% are positive, then train three logistic regressions: no weights, `"balanced"`, and a hand-picked 1:5 weight.

```python
import pandas as pd
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (accuracy_score, precision_score,
                             recall_score, confusion_matrix)

X, y = make_classification(n_samples=5000, n_features=8,
                           n_informative=4, weights=[0.95],
                           flip_y=0.01, n_clusters_per_class=1,
                           class_sep=1.2, random_state=42)
X_tr, X_te, y_tr, y_te = train_test_split(
    X, y, test_size=0.25, stratify=y, random_state=42)

models = {
    "plain": LogisticRegression(max_iter=1000),
    "balanced": LogisticRegression(max_iter=1000,
                                   class_weight="balanced"),
    "1:5": LogisticRegression(max_iter=1000,
                              class_weight={0: 1, 1: 5}),
}
```

`"balanced"` sets each class weight to `n_samples / (n_classes * class_count)`, so the rare class gets a large weight and the common class a small one. Here those weights are about 0.53 and 9.52. A dictionary such as `{0: 1, 1: 5}` lets you choose the ratio yourself.

## Judge it with a cost, not just a score

Suppose a missed positive costs $100 and a false alarm costs $5. We can turn the confusion matrix into one number, the total cost.

```python
rows = []
for name, m in models.items():
    m.fit(X_tr, y_tr)
    pred = m.predict(X_te)
    tn, fp, fn, tp = confusion_matrix(y_te, pred).ravel()
    rows.append({"model": name,
                 "accuracy": accuracy_score(y_te, pred),
                 "precision": precision_score(y_te, pred),
                 "recall": recall_score(y_te, pred),
                 "cost": fn * 100 + fp * 5})
results = pd.DataFrame(rows).set_index("model")
print(results.round(3))
```

Output:

```
          accuracy  precision  recall  cost
model                                      
plain        0.970      1.000   0.439  3700
balanced     0.841      0.235   0.894  1660
1:5          0.962      0.656   0.606  2705
```

The plain model has the best accuracy and the worst cost: it catches only 44% of positives. `"balanced"` catches 89% but raises many false alarms, and its accuracy drops to 84%. Because a miss is 20 times pricier than a false alarm here, it wins on cost. The 1:5 setting sits in between. There is no universally right weight; the right one depends on your costs.

## Plot the comparison

```python
import matplotlib.pyplot as plt
fig, ax = plt.subplots(1, 2, figsize=(9, 3.6))
results[["precision", "recall"]].plot.bar(ax=ax[0], rot=0)
results["cost"].plot.bar(ax=ax[1], rot=0)
ax[0].set_title("Precision and recall")
ax[1].set_title("Total cost (miss = 100, false alarm = 5)")
plt.tight_layout()
plt.show()
```

## When a model has no class_weight

Not every estimator accepts `class_weight`. In scikit-learn 1.1, `HistGradientBoostingClassifier` does not. Nearly every estimator's `fit` accepts `sample_weight` instead, and `compute_sample_weight` builds it for you:

```python
from sklearn.utils.class_weight import compute_sample_weight
w = compute_sample_weight("balanced", y_tr)
hgb.fit(X_tr, y_tr, sample_weight=w)
```

Inside a pipeline, pass it to the final step with the `step__sample_weight` keyword, for example `pipe.fit(X, y, model__sample_weight=w)`.

## Weights versus threshold

Weights change what the model learns. A **decision threshold** changes only how you read its probabilities. On the plain model, lowering the threshold from 0.5 to 0.05 cut the cost from 3,700 to 1,785 on this test set. Both tools trade precision for recall, so try them, but choose the weight or threshold on validation data, never on the test set.

## Recap

- Class weights make rare-class mistakes count more in the loss.
- `class_weight="balanced"` is a good first try; a dictionary gives control.
- Judge with precision, recall, and a cost, not accuracy alone.
- Use `sample_weight` when an estimator has no `class_weight`.
