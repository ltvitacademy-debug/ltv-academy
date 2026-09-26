# Data Leakage

Data leakage is the most expensive mistake in applied machine learning, because it does not crash anything. Your code runs, your validation score is superb, and the model then collapses in production. Leakage means information that would not be available at prediction time has sneaked into training or evaluation, so the score describes a model that cheats. Learn to spot it and you will avoid the most common reason "amazing" models fail.

## What you'll learn

- The two main kinds of leakage: target leakage and train-test contamination
- How each one inflates scores, demonstrated with numbers
- The question that catches target leakage before you train
- Why every learned preprocessing step must be fitted on training data only
- Warning signs that a score is too good to be true

## Kind 1: target leakage

A feature leaks the target when it is a *consequence* of the outcome, recorded after (or because of) the thing you are trying to predict. Suppose we predict customer churn, and the table has a `refund_issued` column. Refunds are typically issued when a customer cancels. So the column carries the answer, but at the moment you need a prediction, the customer has not cancelled yet and there is no refund to look at.

The data below is **illustrative** and seeded. Churn depends on tenure and support tickets, and we add the leaky refund column.

```python
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

rng = np.random.default_rng(3)
n = 2000
df = pd.DataFrame({
    "tenure_months": rng.integers(1, 60, n),
    "support_tickets": rng.poisson(2, n),
    "monthly_spend": rng.normal(80, 20, n),
})
logit = -0.5 + 0.9 * (df["support_tickets"] - 2) - 0.06 * (df["tenure_months"] - 30)
df["churned"] = (rng.random(n) < 1 / (1 + np.exp(-logit))).astype(int)
# A refund is only issued AFTER a customer cancels -> it leaks the answer
df["refund_issued"] = ((df["churned"] == 1) & (rng.random(n) < 0.9)).astype(int)

y = df["churned"]
honest_cols = ["tenure_months", "support_tickets", "monthly_spend"]
leaky_cols = honest_cols + ["refund_issued"]
for name, cols in [("honest features", honest_cols), ("with refund_issued", leaky_cols)]:
    X_tr, X_te, y_tr, y_te = train_test_split(
        df[cols], y, test_size=0.3, random_state=0, stratify=y)
    m = RandomForestClassifier(n_estimators=200, random_state=0).fit(X_tr, y_tr)
    print(f"{name:20s} test accuracy {m.score(X_te, y_te):.3f}")
print("churn rate:", round(y.mean(), 3), " majority-class baseline:", round(1 - y.mean(), 3))
```

```
honest features      test accuracy 0.722
with refund_issued   test accuracy 0.963
churn rate: 0.418  majority-class baseline: 0.582
```

The honest model beats the 58% baseline with 72%. Add the refund column and accuracy leaps to 96%, on a proper held-out test set. Nothing in the split protected us, because the leak is *inside the features*. A model deployed on live customers, who have no refund yet, would fall back toward the honest 72% or worse.

**The test for target leakage:** for every feature, ask, *"Will I actually know this value at the moment I need to make the prediction?"* Fields recorded after the event (refunds, cancellation reasons, "account closed" flags, final outcomes), or computed from the target, must go.

## Kind 2: train-test contamination

The second kind happens when information from the test rows influences training through preprocessing. Anything that *learns from data* (choosing features, computing means for scaling, filling missing values with a median, encoding categories) must be **fitted on the training set only**, then applied to the test set.

Here is a striking demonstration. The labels are **pure random noise**, so no model can genuinely do better than chance. We pick the 20 "best" of 1,000 noise features, once before the split (wrong) and once after (right):

```python
from sklearn.feature_selection import SelectKBest, f_classif
from sklearn.linear_model import LogisticRegression

def one_run(seed):
    r = np.random.default_rng(seed)
    X = r.normal(size=(100, 1000))                # pure noise features
    yy = r.integers(0, 2, 100)                    # random labels: nothing to learn
    # WRONG: choose the 20 'best' features using ALL rows, then split
    Xs = SelectKBest(f_classif, k=20).fit_transform(X, yy)
    a, b, c, d = train_test_split(Xs, yy, test_size=0.3, random_state=0)
    wrong = LogisticRegression().fit(a, c).score(b, d)
    # RIGHT: split first, choose features from the training rows only
    a, b, c, d = train_test_split(X, yy, test_size=0.3, random_state=0)
    sel = SelectKBest(f_classif, k=20).fit(a, c)
    right = LogisticRegression().fit(sel.transform(a), c).score(sel.transform(b), d)
    return wrong, right

res = np.array([one_run(s) for s in range(30)])
print("random labels, mean test accuracy over 30 runs")
print("  select before split (leaky):", round(res[:, 0].mean(), 3))
print("  select after split (honest):", round(res[:, 1].mean(), 3))
```

```
random labels, mean test accuracy over 30 runs
  select before split (leaky): 0.787
  select after split (honest): 0.51
```

Selecting features on all rows let the test labels influence which columns were kept, so the "model" scored 79% on labels that are literally coin flips. Done properly, it scores 51%, which is chance. The same trap applies to scaling: computing the mean and standard deviation on the whole dataset before splitting lets test-set statistics leak into training. The fix is always the same order of operations: **split first, then fit every transformation on the training rows, then apply it to validation and test rows**. (The next course introduces scikit-learn pipelines, which enforce this order automatically.)

The chart below shows both experiments; it is the output of the code above (styling omitted):

```python
import matplotlib.pyplot as plt
fig, axes = plt.subplots(1, 2, sharey=True)
axes[0].bar(["honest", "with refund"], [0.722, 0.963])
axes[1].bar(["after split", "before split"], [res[:, 1].mean(), res[:, 0].mean()])
plt.show()
```

## Other forms to watch for

- **Temporal leakage:** random splits on time series let the model train on the future. Split by date.
- **Duplicates:** the same row (or the same customer) in both train and test lets the model memorize it. Deduplicate and group split.
- **Leaky identifiers:** an ID or timestamp that happens to correlate with the outcome.

## Warning signs

A score that is far better than similar published work or common sense; a single feature that dominates everything; performance that drops sharply after deployment. When a model looks too good, assume leakage until you have proved otherwise.

## Recap

Leakage is information from the future or from the test set reaching the model. Prevent target leakage by asking whether each feature is known at prediction time, and prevent contamination by splitting first and fitting every transformation on training data only. Next up, lesson 9: encoding categorical variables, our first learned transformation.
