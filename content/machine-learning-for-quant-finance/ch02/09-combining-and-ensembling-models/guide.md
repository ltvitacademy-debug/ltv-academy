# Combining & Ensembling Models

Every model in this chapter has a different failure mode: Ridge is stable but can't capture non-linear interactions; trees capture interactions but can be unstable; boosting is powerful but overfits easily if under-regularized; neural nets need a lot of data to earn their place. Ensembling combines several models so their individual mistakes don't line up — and in a low-signal environment, that diversification of *model error* is often worth more than any single model's extra sophistication.

## What you'll learn

- Why ensembling is especially valuable in finance: it diversifies model error, not just asset exposure
- Simple averaging / blending of predictions from different model types
- `VotingRegressor` for straightforward averaging, and `StackingRegressor` for a learned combination
- A worked example blending Ridge, a random forest, and gradient boosting

## Why diversification of model error matters here

In portfolio theory, combining uncorrelated assets reduces risk without sacrificing expected return — the same logic applies to models. If Ridge, a random forest, and a boosted tree each make *different* mistakes (because they have different biases and see the data differently), averaging their predictions cancels out some of each model's idiosyncratic error while keeping whatever real signal all of them are picking up on. Because financial signal is so faint to begin with (Lesson 1), this error cancellation is often a bigger practical win than finding one marginally better model.

## Simple blending

The simplest ensembling approach is a plain average of each model's predictions, optionally weighted by a validation-based performance measure:

```python
import numpy as np

ridge_preds = ridge_model.predict(X_test)
forest_preds = forest_model.predict(X_test)
xgb_preds = xgb_model.predict(X_test)

# Equal-weighted blend
blended_preds = (ridge_preds + forest_preds + xgb_preds) / 3
```

## VotingRegressor: the built-in equivalent

`VotingRegressor` does the same averaging for you, fitting all base models and combining their outputs, optionally with explicit weights:

```python
from sklearn.ensemble import VotingRegressor
from sklearn.linear_model import Ridge
from sklearn.ensemble import RandomForestRegressor
from xgboost import XGBRegressor

voting_model = VotingRegressor(
    estimators=[
        ("ridge", Ridge(alpha=1.0)),
        ("forest", RandomForestRegressor(n_estimators=300, max_depth=6, random_state=0)),
        ("xgb", XGBRegressor(n_estimators=300, learning_rate=0.03, max_depth=3, random_state=0)),
    ],
    weights=[1, 1, 1],  # equal weighting; tune via validation if desired
)
voting_model.fit(X_train, y_train)
```

## StackingRegressor: a learned combination

`StackingRegressor` goes a step further: instead of a fixed average, it trains a simple **meta-model** (often a plain linear model) on the base models' out-of-fold predictions, learning how to weight each base model's contribution.

```python
from sklearn.ensemble import StackingRegressor
from sklearn.linear_model import Ridge as MetaRidge

stacking_model = StackingRegressor(
    estimators=[
        ("ridge", Ridge(alpha=1.0)),
        ("forest", RandomForestRegressor(n_estimators=300, max_depth=6, random_state=0)),
        ("xgb", XGBRegressor(n_estimators=300, learning_rate=0.03, max_depth=3, random_state=0)),
    ],
    final_estimator=MetaRidge(alpha=1.0),
    cv=5,   # NOTE: on real financial data, pass a walk-forward/purged splitter here, not a plain K-fold
)
stacking_model.fit(X_train, y_train)
```

The `cv` parameter inside `StackingRegressor` is exactly the kind of place the overlapping-outcome leakage problem from Lesson 4 and the validation methods from Chapter 4 matter — a naive K-fold here can leak information between base-model training and the meta-model's training data.

## Key terms

| Term | Meaning |
|---|---|
| Model-error diversification | Combining models with different, uncorrelated mistakes to cancel out error |
| Blending | A simple (optionally weighted) average of multiple models' predictions |
| VotingRegressor | scikit-learn's estimator for fixed-weight averaging of base models |
| StackingRegressor | Trains a meta-model to learn how to combine base models' out-of-fold predictions |

## Recap

Because financial signal is faint, combining models with different failure modes — Ridge, trees, boosting, and (where appropriate) neural nets — to cancel out idiosyncratic error is often more valuable than chasing a single "best" model, whether through simple blending, `VotingRegressor`, or a learned `StackingRegressor`. That wraps up Chapter 2's supervised toolkit. The course continues from here into Chapter 3, Unsupervised Learning in Finance, starting with clustering assets and regimes.
