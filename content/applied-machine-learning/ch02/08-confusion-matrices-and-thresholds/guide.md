# Confusion Matrices & Thresholds

Every classifier you have used so far quietly makes a decision for you: `predict` calls anything with a probability of 0.5 or more a positive. That 0.5 is a default, not a law. In practice the cutoff is one of the most powerful dials you have, because it moves a model along the precision/recall trade-off without retraining anything. This lesson shows how to choose the cutoff on purpose, from business costs and without peeking at the test set.

## What you'll learn

- How the cutoff changes the confusion matrix, precision, and recall
- How to choose a cutoff from the cost of each kind of error
- How to pick it with cross-validated predictions, so the test set stays untouched
- How to display confusion matrices from code

## Setup

We reuse the Lesson 6 setup: the illustrative customer data, the churn pipeline `model`, and its train/test split (750 training rows, 250 test rows). To pick a threshold without using the test set, we need honest probabilities for the training rows. `cross_val_predict` gives them: each training row's probability comes from a model that did not see that row.

```python
import numpy as np
from sklearn.metrics import (confusion_matrix,
    precision_score, recall_score)
from sklearn.model_selection import cross_val_predict

cv_proba = cross_val_predict(model, X_train, y_train, cv=5,
                             method="predict_proba")[:, 1]
```

## The cutoff is a dial

Lowering the cutoff flags more customers. Here is what happens to the flagged count, the precision, and the recall on those cross-validated training predictions:

```python
for t in [0.5, 0.3, 0.15]:
    flag = cv_proba >= t
    print(t, flag.sum(), round(precision_score(y_train, flag), 3),
          round(recall_score(y_train, flag), 3))
```

```
0.5 107 0.617 0.371
0.3 225 0.502 0.635
0.15 416 0.37 0.865
```

At 0.5 the model flags 107 of 750 customers and is right 62% of the time, but finds only 37% of the churners. At 0.15 it flags 416 customers (more than half the base), finds 87% of churners, and is right only 37% of the time. Nothing about the model changed; only the decision rule did. Neither end is "correct". The right point depends on costs.

## Choose the cutoff from costs

Suppose the business says: a retention offer costs about $20 per flagged customer who would have stayed anyway (a false positive), while every churner we miss costs about $100 in lost margin (a false negative). These numbers are assumed for illustration; in a real project you would get them from finance and marketing. Total cost then is `20 x FP + 100 x FN`:

```python
def cost(y_true, flag, fp_cost=20, fn_cost=100):
    tn, fp, fn, tp = confusion_matrix(y_true, flag).ravel()
    return fp_cost * fp + fn_cost * fn

thresholds = np.round(np.arange(0.05, 0.95, 0.05), 2)
costs = [cost(y_train, cv_proba >= t) for t in thresholds]
best = thresholds[int(np.argmin(costs))]
print(best, min(costs), cost(y_train, cv_proba >= 0.5))
```

```
0.15 7640 12020
```

Sweeping the cutoff over the training predictions, the cheapest is 0.15 with a total cost of 7,640, against 12,020 at the default 0.5. Because misses are five times as costly as false alarms, the best cutoff sits well below 0.5.

## Confirm once on the test set

Only now do we touch the test set, and only to confirm, not to choose:

```python
test_proba = model.predict_proba(X_test)[:, 1]
for t in [0.5, best]:
    flag = test_proba >= t
    print(t, confusion_matrix(y_test, flag).ravel(), cost(y_test, flag))
```

```
0.5 [176  15  43  16] 4600
0.15 [108  83  12  47] 2860
```

(The four numbers are TN, FP, FN, TP.) The chosen cutoff cuts the test-set cost from 4,600 to 2,860. Sanity checks matter here too: flagging **everyone** would cost 20 x 191 = 3,820, and flagging **nobody** would cost 100 x 59 = 5,900. The tuned cutoff beats both, which tells us the model is genuinely adding value under these assumed costs.

## See it

`ConfusionMatrixDisplay.from_predictions` draws the matrix. This code produced the figure below, comparing the two cutoffs side by side:

```python
import matplotlib.pyplot as plt
from sklearn.metrics import ConfusionMatrixDisplay

fig, axes = plt.subplots(1, 2, figsize=(9, 4.2))
for ax, t in zip(axes, [0.5, 0.15]):
    ConfusionMatrixDisplay.from_predictions(
        y_test, test_proba >= t, ax=ax,
        display_labels=["stayed", "churned"], cmap="Blues",
        colorbar=False)
    ax.set_title(f"Cutoff {t}")
fig.suptitle("Test-set confusion matrices (illustrative data)")
fig.tight_layout()
fig.savefig("confusion-matrices.png", dpi=150, bbox_inches="tight")
```

In the saved figure, moving from cutoff 0.5 to 0.15 shifts weight out of the bottom-left "missed churner" cell (43 down to 12) and into the top-right "false alarm" cell (15 up to 83).

## Things to keep in mind

- **Choose on training-side data, confirm on test.** If you tune the cutoff on the test set, the test score is no longer an honest estimate. Chapter 3 returns to this problem in depth.
- **Costs drive the answer.** Change the 5:1 ratio and the best cutoff moves. Show stakeholders the trade-off table, not just one number.
- **Probabilities need to be trustworthy.** A cutoff of 0.15 means "flag if at least a 15% chance" only when the probabilities are reasonably calibrated. Logistic regression tends to be; some other models (random forests, for one) are not without extra calibration. Check the current scikit-learn docs on probability calibration.
- **Other rules exist.** If a team can only contact 100 customers a week, flag the top 100 by probability instead of using a cutoff.

## Recap

The cutoff converts probabilities into decisions and slides a model along the precision/recall trade-off without retraining. Get honest probabilities for training rows with `cross_val_predict`, price each kind of error, pick the cheapest cutoff, and confirm it once on the test set. Confusion matrices, drawn with `ConfusionMatrixDisplay`, make the effect visible. Next, we leave classification for a lesson on regression metrics in practice.
