# Metric and Threshold Decision Guide

A compiled, one-page reference for the classification-metric and threshold decisions that
recur across Chapters 2 and 4 of this course. Keep it next to any new classification project.

## 1. Which metric should I actually trust?

| Situation | Trust | Don't trust alone |
|---|---|---|
| Classes roughly balanced (40/60 or better) | Accuracy, F1, ROC AUC | -- |
| Rare positive class (under ~15%) | Average precision (PR-AUC), recall/precision for the positive class | Accuracy, ROC AUC alone |
| You know the cost of each error type | A cost function built from a confusion matrix | Any single "greater is better" score |
| Comparing two models | Same metric, same folds, paired fold-by-fold difference | A single mean score |

**The accuracy trap, in one line:** on a 95/5 split, a model that predicts the majority class
every time scores 95% accuracy while catching zero positives. Always compute a `DummyClassifier`
baseline (`strategy="most_frequent"` or `"prior"`) before trusting any accuracy number.

**ROC AUC vs. average precision:** ROC AUC can look comfortable on imbalanced data because a
huge pool of true negatives keeps the false-positive *rate* low. Average precision is more
sensitive to how well the model ranks the rare positives specifically -- prefer it once the
positive class drops much below 15-20%.

## 2. The three-step threshold recipe

Every lesson in this course that picks a decision threshold (Lesson 8, the fraud and churn
walkthroughs, the capstone) follows the same three steps:

1. **Get honest probabilities for your training rows** with `cross_val_predict(model, X_train,
   y_train, cv=5, method="predict_proba")`. Every row's probability comes from a model that
   never saw that row during training.
2. **Sweep a grid of thresholds and compute total cost at each one**, using real costs (ask
   the business, don't guess): `cost = fp_cost * FP + fn_cost * FN`. Pick the threshold that
   minimizes cost on the training-side, out-of-fold predictions.
3. **Confirm, once, on the test set.** Compare the chosen threshold's cost against two sanity
   checks: flagging everyone, and flagging no one. If the model doesn't beat both, it isn't
   adding value under your cost assumptions yet.

```python
from sklearn.model_selection import cross_val_predict
import numpy as np

oof = cross_val_predict(model, X_train, y_train, cv=5, method="predict_proba")[:, 1]

def cost(y_true, flagged, fp_cost, fn_cost):
    y_true, flagged = np.asarray(y_true), np.asarray(flagged)
    fp = ((y_true == 0) & flagged).sum()
    fn = ((y_true == 1) & ~flagged).sum()
    return fp_cost * fp + fn_cost * fn

grid = np.round(np.arange(0.02, 0.5, 0.01), 2)
costs = [cost(y_train, oof >= t, fp_cost=..., fn_cost=...) for t in grid]
best_t = grid[int(np.argmin(costs))]
```

## 3. What class weights and resampling actually change

Class weights (`class_weight="balanced"`), SMOTE, and undersampling mostly move a model's
*operating point*, not its *ranking quality*. Check average precision before and after -- if it
barely moves while recall-at-0.5 jumps, you have changed the decision, not the model's skill.
The more reliable lever for the decision itself is the threshold recipe above, applied to
honest, un-reweighted probabilities.

## 4. Comparing two close models

Never declare a winner from two mean scores alone. Score both on one shared `StratifiedKFold`
object, subtract the per-fold scores, and only call it a real win if one model is ahead on
nearly every fold by more than the fold-to-fold standard deviation. Otherwise, it's a tie --
break it on cost, interpretability, or deployment simplicity instead.
