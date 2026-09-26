# Success Metrics & Project Plan

A model that "works" is meaningless until you say what working means. In a course, the metric is handed to you. In a job, you have to propose it, get agreement, and write it down before you see a single score. This lesson does three things: it puts a price on being right, it picks metrics that match the decision, and it lays out the plan for the rest of the project.

## What you'll learn

- How to build a simple cost model and find the break-even precision
- Which metrics to use for a ranked, capacity-limited retention list
- How to build a "random scorer" sanity harness you will reuse
- How to write acceptance criteria before modeling
- The project plan for the remaining capstone lessons

## Put a price on the decision

The retention team contacts a customer with an offer. Every contact costs something, and only some contacts save a customer who would have left. To reason about this, we need assumptions. **All of the following numbers are illustrative assumptions for the capstone, not company data.** In a real project you would get them from finance and the retention team.

- Contacting one customer costs 15 (staff time plus offer).
- An offer saves 30% of customers who would have cancelled.
- A saved customer is worth 240 in margin.

A contacted customer who would have churned is therefore worth 0.30 × 240 = 72 in expectation, at a cost of 15. A contacted customer who would have stayed is a pure cost of 15. Precision is the share of contacted customers who really would have churned, so the expected net value per contact is `precision × 72 − 15`. It is zero when precision equals 15 / 72, about 20.8%. That is the break-even precision.

```python
CONTACT_COST, SAVE_RATE, SAVE_VALUE = 15, 0.30, 240
n, churners = 3690, 568
base_rate = churners / n
gain = SAVE_RATE * SAVE_VALUE
break_even = CONTACT_COST / gain
print(round(base_rate, 3), gain, round(break_even, 3))

def net(contacted, precision):
    return contacted * (precision * gain - CONTACT_COST)

k = round(0.10 * n)
print("k", k, "| everyone", round(net(n, base_rate)))
for p in (0.154, 0.20, 0.30, 0.40):
    print(f"precision {p:.3f}: net {net(k, p):,.0f}")
```

The output is:

```
0.154 72.0 0.208
k 369 | everyone -14454
precision 0.154: net -1,444
precision 0.200: net -221
precision 0.300: net 2,435
precision 0.400: net 5,092
```

Read this table carefully, because it shapes the whole project. Only 15.4% of active customers churn, which is below the 20.8% break-even, so contacting everyone loses about 14,454. Contacting a random 10% (369 customers) also loses money. A model creates value only by finding a group whose churn rate is well above 20.8%. That gives us a sharp, honest question for the modeling phase.

## Choose metrics that match the decision

- **Average precision (PR-AUC)** is the main threshold-free score. With a 15.4% positive rate, precision-recall behaves better than accuracy, and a useless model's average precision sits near the base rate.
- **Precision and recall at the top k** with k = 369 (10% of the list). This mirrors how the team will actually use the model, and precision at k compares directly with the 20.8% break-even.
- **Lift at k**, precision at k divided by the base rate. Lift of 1.0 means no better than random.
- **ROC AUC** as a secondary, familiar ranking summary.
- **Calibration** (does a predicted 30% mean roughly 30%?), because the expected-value arithmetic above treats scores as probabilities.

Accuracy is deliberately absent. Predicting "nobody cancels" is 84.6% accurate and worthless.

## A random-scorer harness

Build the evaluation code now and prove it works on a scorer you know is useless. Reuse the label query from lesson 2.

```python
import sqlite3
import numpy as np
from sklearn.metrics import average_precision_score, roc_auc_score

con = sqlite3.connect("harvest_table.db")
SNAP = "2025-06-30"
label_sql = """
WITH c AS (SELECT DISTINCT customer_id FROM customers)
SELECT c.customer_id,
       CASE WHEN x.cancel_date > :snap
             AND x.cancel_date <= date(:snap, '+60 days')
            THEN 1 ELSE 0 END AS churn_60d
FROM c
LEFT JOIN cancellations x ON x.customer_id = c.customer_id
WHERE x.cancel_date IS NULL OR x.cancel_date >= :snap
"""
y = np.array([r[1] for r in con.execute(label_sql, {"snap": SNAP})])

def precision_at_k(y, score, k):
    top = np.argsort(-score)[:k]
    return y[top].mean()

rng = np.random.default_rng(0)
score = rng.random(len(y))
k = round(0.10 * len(y))
p = precision_at_k(y, score, k)
print(len(y), y.sum(), k)
print("AP %.3f  AUC %.3f" % (average_precision_score(y, score),
                             roc_auc_score(y, score)))
print("precision@k %.3f  lift %.2f" % (p, p / y.mean()))
```

The result is `3690 568 369`, then `AP 0.159  AUC 0.514`, then `precision@k 0.154  lift 1.00`. Random scores land at the floor: AP near the 0.154 base rate, AUC near 0.5, lift near 1. Any real model must clear these floors, and this harness will score it.

## Acceptance criteria, written first

- **Minimum viable:** precision at k = 369 above the 20.8% break-even, and the lower end of a bootstrap confidence interval also above it. A single lucky number on one test set is not enough.
- **Beat the baselines:** better average precision and lift than the random floor and than a simple rule such as "days since last order", which you will build in lesson 8.
- **Ambition target:** deliberately not set yet. We set it after the baselines, because a target invented before you have seen the data is a guess.
- **Honest validation:** stratified train and test split with a fixed seed, cross-validation on the training portion only, and the test set scored once.

One limitation to state now: we have a single snapshot, so we cannot check how the model behaves on a later period. A production project would add a time-based backtest with several snapshots.

## The plan

- **Lessons 4 to 7:** extract with SQL, clean in Python, explore, and review findings.
- **Lessons 8 to 11:** features and baselines, model comparison, tuning and evaluation, and explanation.
- **Lessons 12 to 15:** package and deploy, plan monitoring, build the stakeholder presentation, and defend your work.

## Recap

The break-even precision of 20.8% and the 15.4% base rate define what a useful model must do. You have metrics that match the decision (average precision, precision and lift at k, calibration), a tested harness with known random floors, and acceptance criteria written before modeling. Next, Phase 1 begins: extracting the data with SQL.
