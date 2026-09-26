# Tuning & Evaluation

Two finalists, logistic regression and a random forest, are tied within noise. This lesson does four things: tunes both without fooling yourself, decides who to contact using the economics from lesson 3, opens the sealed test set exactly once, and checks calibration, because a retention team acts on the probabilities, not just the ranking. All results come from code run on the Harvest Table features (synthetic, illustrative). The money figures are the illustrative assumptions from lesson 3, not company data.

## What you'll learn

- How to tune with a decision rule written down before you see the results
- Why an imbalanced, capacity-limited problem needs average precision, precision at k, and lift, not accuracy
- How to turn the lesson 3 costs into a contact policy, choosing it on training data only
- How to evaluate once on the test set, with bootstrap intervals, against your acceptance criteria
- How to read a calibration table

## Tune, with a rule written first

Set the rule before running the searches, so you cannot bend it afterwards: ship the simpler model (logistic regression) unless the forest's tuned cross-validated average precision (AP) beats it by more than 0.02. Both searches use the same preprocessing pipeline and 15 repeated folds.

```python
from common import *   # the split and prep from lessons 8-9
from sklearn.model_selection import (
    GridSearchCV, RandomizedSearchCV, RepeatedStratifiedKFold)
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier

cv = RepeatedStratifiedKFold(n_splits=5, n_repeats=3, random_state=7)

lr_pipe = Pipeline([("prep", prep),
                    ("model", LogisticRegression(max_iter=1000))])
lr_grid = GridSearchCV(
    lr_pipe, {"model__C": [0.003, 0.01, 0.03, 0.1, 0.3, 1, 3]},
    scoring="average_precision", cv=cv).fit(X_tr, y_tr)

rf_pipe = Pipeline([("prep", prep), ("model", RandomForestClassifier(
    n_estimators=300, n_jobs=-1, random_state=42))])
rf_search = RandomizedSearchCV(
    rf_pipe,
    {"model__min_samples_leaf": [5, 10, 20, 40, 80],
     "model__max_depth": [3, 5, 8, None],
     "model__max_features": ["sqrt", 0.3, 0.6]},
    n_iter=12, scoring="average_precision",
    cv=cv, random_state=42).fit(X_tr, y_tr)
print(lr_grid.best_params_, lr_grid.best_score_.round(3))
print(rf_search.best_params_, rf_search.best_score_.round(3))
```

The forest search takes a couple of minutes. Output, with the logistic grid scores read from `lr_grid.cv_results_`:

```
logistic  C: 0.003 0.311 | 0.01 0.320 | 0.03 0.323 | 0.1 0.323
             0.3 0.323 | 1 0.324 | 3 0.325 (best)
forest    leaf 40, depth None, max_features sqrt   CV AP 0.335
```

Tuning bought almost nothing. Logistic regression sits on a plateau from `C=0.03` upward; the best value, `C=3`, is only 0.002 above `C=0.1`, so we keep the more regularized `C=0.1`. The forest moved from 0.328 with default settings to 0.335. Its lead over logistic regression is 0.010, below the 0.02 bar and well inside the fold-to-fold noise. Remember too that the best score from a search is slightly optimistic, because you picked the maximum of many noisy numbers. By the rule, logistic regression is the model.

## Turn the costs into a contact policy

The illustrative economics from lesson 3: contacting a customer costs 15, an offer saves 30% of would-be churners, and a saved customer is worth 240. A contacted churner is worth 0.30 x 240 = 72, so the break-even probability is 15 / 72 = 0.208. With calibrated probabilities, contact a customer when their churn probability is above 0.208, subject to capacity of about 10% of the list.

To choose without touching the test set, use out-of-fold probabilities from the training data:

```python
from sklearn.model_selection import StratifiedKFold, cross_val_predict
final = Pipeline([("prep", prep),
                  ("model", LogisticRegression(C=0.1, max_iter=1000))])
oof = cross_val_predict(final, X_tr, y_tr, method="predict_proba",
                        cv=StratifiedKFold(5, shuffle=True,
                                           random_state=42))[:, 1]

def net(y_true, flag):      # contact cost 15, gain 72 per churner reached
    return y_true[flag].sum() * 72 - flag.sum() * 15

order = np.argsort(-oof)
for frac in [0.05, 0.10, 0.15, 0.20, 0.30]:
    k = int(round(frac * len(oof)))
    flag = np.zeros(len(oof), bool); flag[order[:k]] = True
    print(f"OOF top {frac:.0%}: precision {y_tr.values[flag].mean():.3f}"
          f"  net per 1,000 customers "
          f"{net(y_tr.values, flag) * 1000 / len(oof):7.0f}")
```

```
OOF top 5%:  precision 0.426  net per 1,000 customers     785
OOF top 10%: precision 0.400  net per 1,000 customers    1379
OOF top 15%: precision 0.354  net per 1,000 customers    1578
OOF top 20%: precision 0.317  net per 1,000 customers    1563
OOF top 30%: precision 0.286  net per 1,000 customers    1669
```

Two things stand out. Precision stays above break-even (0.208) as far down the list as we looked, so more contacts would still pay: 23.9% of customers have a predicted probability above 0.208. But the team can only contact about 10%, so capacity, not the model, is the constraint. The policy is therefore: contact the top 10% by score (369 customers in the full population), and tell finance that more capacity would add value.

## Evaluate once on the test set

Fit on the training set, score the 738 test customers a single time, and use a bootstrap (resampling the test rows) for uncertainty:

```python
final.fit(X_tr, y_tr)
p = final.predict_proba(X_te)[:, 1]
K = int(round(0.10 * len(p)))          # 74 customers = top 10%
top = np.argsort(-p)[:K]
print(y_te.values[top].mean())         # precision in the top 10%
# average_precision_score, roc_auc_score, brier_score_loss: sklearn.metrics
```

Results (the bootstrap resamples the test set 2,000 times):

```
TEST  AP 0.334  AUC 0.755  Brier 0.119  (churn-rate Brier 0.131)
top 10% = 74 customers: precision 0.405, lift 2.62x, recall 0.263
test rule days since last order   precision@10%: 0.203
test rule fewest orders per week  precision@10%: 0.270
95% CI  AP 0.266-0.420 | AUC 0.709-0.799 | precision@10% 0.297-0.527
```

Check the acceptance criteria from lesson 3. Minimum viable: precision at the top 10% is 0.405 and the lower end of its interval, 0.297, is above the 0.208 break-even. Passed. Beat the baselines: the model reaches 0.405 against 0.203 for "days since last order" and 0.270 for the best rule. Passed. Ambition target: cross-validated precision at 10% was 0.392 against a target of 0.32. Passed. The interval is wide, though: 74 flagged customers and 114 test churners cannot pin precision down closer than about plus or minus 0.11. The top 10% churn at 2.62 times the base rate and the list catches 26.3% of all churners.

Net value on the test set, per 1,000 customers and under the illustrative economics:

```
contact nobody      contacted    0   net per 1,000:        0
contact everyone    contacted  738   net per 1,000:    -3878
top 10% by score    contacted   74   net per 1,000:     1423
p >= 0.208          contacted  193   net per 1,000:     2419
```

Contacting everyone loses money because only 15.4% of customers churn, below break-even. The capacity-limited policy earns about 1,423 per 1,000 customers (roughly 5,250 for the 3,690 active customers, with wide uncertainty). If the team could reach every customer above the break-even probability, 193 of 738 or 26% of the list, the estimate rises to 2,419 per 1,000. That comparison, not AUC, is what a manager cares about.

## Calibration

Are the probabilities honest? Group test customers into five equal-sized bins by predicted probability and compare the average prediction with the observed churn rate:

```
predicted 0.046 -> observed 0.034
predicted 0.090 -> observed 0.061
predicted 0.136 -> observed 0.115
predicted 0.196 -> observed 0.197
predicted 0.337 -> observed 0.365
```

Logistic regression is reasonably calibrated: the model slightly overpredicts among the lowest-risk customers and slightly underpredicts among the highest, differences that five small bins cannot resolve. The 0.208 break-even is therefore a meaningful cut-off. The chart is drawn from the code that follows.

```python
from sklearn.metrics import precision_recall_curve
from sklearn.calibration import calibration_curve
import matplotlib.pyplot as plt
prec, rec, _ = precision_recall_curve(y_te, p)
frac, mean_p = calibration_curve(y_te, p, n_bins=5,
                                 strategy="quantile")
fig, (a1, a2) = plt.subplots(1, 2, figsize=(9, 4), dpi=150)
a1.plot(rec, prec); a1.axhline(y_te.mean(), ls="--")
a1.axhline(0.208, ls=":")                  # break-even
a2.plot(mean_p, frac, "o-"); a2.plot([0, .5], [0, .5], ls="--")
plt.savefig("evaluation.png")
```

## Recap

Write the selection rule first, tune both finalists, and accept when tuning does not help. Choose the contact policy from the costs using training data only, open the test set once, and report intervals and business value alongside AUC. The model: logistic regression, test AP 0.334, AUC 0.755, precision 0.405 in the top 10% (interval 0.297 to 0.527), reasonably calibrated, worth about 1,423 per 1,000 customers under illustrative assumptions. Next lesson explains what drives its predictions.
