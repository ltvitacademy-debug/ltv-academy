# Sample Weights & Overlapping Outcomes

The triple-barrier method from Lesson 3 solved the labeling problem, but it introduced a new one. If you label every single bar using a window that looks forward up to, say, 10 bars, then consecutive labels share overlapping time periods — label at time *t* and label at time *t+1* both depend on price action from *t+1* through roughly *t+10*. That overlap quietly breaks one of the most basic assumptions behind standard machine learning: that training examples are independent.

## What you'll learn

- Why overlapping outcome windows mean labeled observations are not independent and identically distributed (IID)
- Concurrency: how many labels "cover" a given point in time, and why it matters
- Uniqueness-based sample weighting, so overlapping observations don't dominate training
- How to actually use `sample_weight` in scikit-learn and XGBoost, and why this previews the cross-validation leakage problem in Chapter 4

## Why overlap breaks the IID assumption

Nearly every standard ML algorithm — linear regression, random forests, gradient boosting — implicitly assumes each training row is an independent draw. With triple-barrier (or any forward-looking) labels, that's false by construction: if a volatility spike happens on day 50, it influences the outcome of every label whose window covers day 50, which could be dozens of labels in a row. Those labels are correlated with each other, not independent. Training as if they were independent causes the model to effectively over-count that one event, as though it happened dozens of times.

```python
import numpy as np
import pandas as pd

# label_starts, label_ends: arrays of each label's window boundaries (bar index)
def compute_concurrency(label_starts, label_ends, n_bars):
    concurrency = np.zeros(n_bars)
    for start, end in zip(label_starts, label_ends):
        concurrency[start:end + 1] += 1
    return concurrency
# concurrency[t] = how many labels' windows cover bar t
```

## Uniqueness and sample weights

López de Prado's fix is to weight each label by its **average uniqueness** — roughly, 1 divided by the average concurrency over its own window. A label whose window barely overlaps with any other gets a weight near 1 (fully unique). A label whose window heavily overlaps ten others gets a much smaller weight, so it doesn't dominate training the way ten independent, uncorrelated observations would.

```python
def average_uniqueness(label_starts, label_ends, concurrency):
    weights = []
    for start, end in zip(label_starts, label_ends):
        window_concurrency = concurrency[start:end + 1]
        uniqueness = (1.0 / window_concurrency).mean()
        weights.append(uniqueness)
    return np.array(weights)

# Pass these weights straight into training
from sklearn.ensemble import RandomForestRegressor
weights = average_uniqueness(label_starts, label_ends, concurrency)
model = RandomForestRegressor(n_estimators=200, random_state=0)
model.fit(X_train, y_train, sample_weight=weights)
```

The same `sample_weight` argument works in XGBoost's `.fit()` and LightGBM's `.fit()`, so this technique carries forward cleanly into the models you'll use starting in Lesson 5.

## Why this also previews Chapter 4

Overlap doesn't just distort training weights — it also breaks naive cross-validation. If a standard K-fold split puts label *t* in the training fold and label *t+1* in the test fold, and their windows overlap, information has effectively leaked from train into test, inflating your validation score. That's exactly the problem **purged and embargoed cross-validation** (Chapter 4, Lesson 15) is built to solve. For now, just remember: overlapping windows mean you can't treat your rows as independent, whether you're fitting a model or scoring one.

## Key terms

| Term | Meaning |
|---|---|
| IID | "Independent and identically distributed" — the standard ML assumption that overlap violates |
| Concurrency | How many labels' outcome windows cover a given point in time |
| Average uniqueness | A label's weight, roughly inverse to how much its window overlaps with others |
| sample_weight | The scikit-learn/XGBoost/LightGBM `.fit()` parameter used to apply these weights |

## Recap

Triple-barrier labels overlap in time, which breaks the independence assumption nearly every ML algorithm relies on — and the fix is to weight each label by its average uniqueness and pass that into `sample_weight` during training. This same overlap problem resurfaces as a cross-validation leakage issue in Chapter 4. That wraps up Chapter 1. Next up, Lesson 5: Regularized Linear Models, the first of the actual predictive models this course builds.
