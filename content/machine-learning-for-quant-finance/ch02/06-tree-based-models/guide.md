# Tree-Based Models

Linear models in Lesson 5 assume the relationship between features and returns is additive and linear. Real financial relationships are often not: momentum might only predict well when volatility is low, or a value factor might only work in certain rate regimes. Decision trees and random forests can capture exactly these kinds of conditional, non-linear interactions without you having to hand-specify them.

## What you'll learn

- How a decision tree splits data, and why a single deep tree overfits noisy financial data badly
- Random forests: how averaging many de-correlated trees reduces variance
- `DecisionTreeRegressor` and `RandomForestRegressor` from `sklearn.ensemble`, with real parameters
- A first look at feature importance — the full treatment comes in Chapter 5

## Decision trees and why depth is dangerous here

A `DecisionTreeRegressor` repeatedly splits the data on feature thresholds (e.g., "5-day momentum > 0.02") to minimize prediction error at each step. Left unconstrained, a tree can grow until each leaf contains just one or two training examples — fitting the training data almost perfectly, including its noise. In a domain where real signal explains 1–2% of variance (Lesson 1), an unconstrained tree will happily memorize the other 98%+ that's pure noise, producing a model that looks great in-sample and useless out-of-sample.

```python
from sklearn.tree import DecisionTreeRegressor

# max_depth and min_samples_leaf are the primary overfitting controls
tree_model = DecisionTreeRegressor(
    max_depth=4,
    min_samples_leaf=50,
    random_state=0
)
tree_model.fit(X_train, y_train)
```

## Random forests: averaging away the noise

A **random forest** fits many trees, each on a bootstrap-resampled subset of the training rows and a random subset of features at each split, then averages their predictions. Because each tree overfits to *different* noise, averaging many of them cancels out a lot of that noise while the real, shared signal (if any) survives the averaging — a textbook variance-reduction technique.

```python
from sklearn.ensemble import RandomForestRegressor

forest_model = RandomForestRegressor(
    n_estimators=300,
    max_depth=6,
    min_samples_leaf=30,
    max_features="sqrt",
    random_state=0,
    n_jobs=-1
)
forest_model.fit(X_train, y_train, sample_weight=weights)  # weights from Lesson 4
```

Even with random forests' built-in variance reduction, constraining `max_depth` and `min_samples_leaf` still matters in low-signal financial data — the averaging helps, but it doesn't make unlimited tree depth safe.

## A first look at feature importance

Random forests expose `.feature_importances_`, a quick measure of how much each feature contributed to reducing error across all trees. It's a useful first pass for understanding what the model is actually using.

```python
import pandas as pd

importances = pd.Series(
    forest_model.feature_importances_, index=X_train.columns
).sort_values(ascending=False)
print(importances.head(10))
```

This default importance measure has real limitations — it can be biased toward high-cardinality features, for instance — and Chapter 5 covers more robust alternatives like permutation importance and SHAP values in depth. For now, treat it as a rough first look, not a final answer.

## Key terms

| Term | Meaning |
|---|---|
| Decision tree | A model that splits data on feature thresholds to predict a target |
| Overfitting via depth | An unconstrained tree memorizes noise along with signal |
| Random forest | Many trees trained on bootstrapped data/features, averaged together |
| Bootstrap sampling | Resampling training rows with replacement for each tree |
| Feature importance | A rough measure of how much each feature contributed to the model |

## Recap

Trees and random forests capture non-linear, conditional relationships that linear models miss, but a single unconstrained tree overfits noisy financial data badly — random forests tame that by averaging many de-correlated trees, and `.feature_importances_` gives a first (imperfect) look at what's driving predictions. Next up, Lesson 7: Gradient Boosting on Financial Features, where trees get combined sequentially instead of averaged.
