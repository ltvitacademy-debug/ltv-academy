# SHAP & Model Explanation

Permutation importance and MDA, from the last lesson, tell you which features matter across a whole dataset. They don't tell you why the model flagged *this specific* stock on *this specific* day as a buy. SHAP (SHapley Additive exPlanations) answers that second question, and it's become close to the industry-standard tool for explaining individual predictions — which matters in finance both for debugging models and for satisfying people who need a defensible answer to "why did the model do that."

## What you'll learn

- The game-theoretic idea behind Shapley values and why it guarantees a fair split of credit
- The real `shap` library API: `TreeExplainer`, `Explainer`, and `summary_plot`
- How to read a SHAP summary plot to sanity-check a model
- Why SHAP matters specifically for regulatory and explainability needs in finance

## The idea: Shapley values

Shapley values come from cooperative game theory, originally devised to answer a simple fairness question: if a group of players cooperate to produce some payoff, how should that payoff be split fairly among them, given that different players contribute differently depending on who else is already "in the game"?

Applied to a model prediction, each feature is a "player," and the "payoff" is the difference between the model's prediction for this specific instance and its average prediction over the whole dataset (the baseline). A feature's Shapley value is its average marginal contribution to that difference, computed over every possible ordering in which features could be added to the model one at a time. Averaging over all orderings is what makes Shapley values fair — it removes any bias from which feature happens to go "first."

The practical payoff: for any individual prediction, SHAP values for every feature add up exactly to (prediction − baseline), so you get a complete, additive accounting of how the model arrived at that specific number.

## The real API

The `shap` library computes these values efficiently for you — computing exact Shapley values by brute force is exponential in the number of features, so `shap` uses model-specific shortcuts.

```python
import shap

# For tree-based models (random forest, XGBoost, LightGBM) — fast, exact
explainer = shap.TreeExplainer(model)
shap_values = explainer(X_test)

# For any model (linear, neural net, pipeline) — slower, approximate
explainer = shap.Explainer(model, X_train)
shap_values = explainer(X_test)

# Explaining one prediction
print(shap_values[0])          # Shapley values for the first test row
print(shap_values[0].base_values)  # the baseline (average prediction)
```

`shap_values` is an `Explanation` object holding one row of Shapley values per prediction, one value per feature, plus the baseline. Older code sometimes calls `explainer.shap_values(X)` instead of `explainer(X)` — both exist in the current API; calling the explainer directly is the modern pattern and returns the richer `Explanation` object.

## Reading a summary plot

```python
shap.summary_plot(shap_values, X_test)
```

A summary plot stacks every feature's SHAP values across every row in `X_test`, ranked by overall importance (the mean absolute SHAP value — itself a principled, model-agnostic importance score, an alternative to the permutation importance from Lesson 19). Each dot is one prediction; its horizontal position shows whether that feature pushed the prediction up or down, and color typically encodes whether the feature's own value was high or low. A feature where high values consistently push predictions up (and low values consistently push them down) looks like a clean, directional signal. A feature with values scattered randomly on both sides regardless of its own level often means the model is picking up noise rather than a real relationship — a useful sanity check on top of the validation work from Chapter 4.

## Why this matters in finance specifically

Two practical reasons SHAP earns its place in a quant's toolkit beyond intellectual curiosity:

- **Explainability and regulatory scrutiny.** Risk committees, compliance teams, and in some contexts regulators want more than "the model said so" before capital gets allocated based on a signal. SHAP gives a documented, mathematically grounded, per-prediction breakdown that can be handed to a reviewer.
- **Sanity-checking real signal vs. noise.** If a model's SHAP summary plot shows its top-ranked feature behaving incoherently — contributing positively and negatively with no relationship to the feature's own value — that's a strong hint the backtest performance from Chapter 4 may be riding on overfitting rather than a genuine signal, even if the aggregate metric looked fine.

## Key terms

| Term | Meaning |
|---|---|
| Shapley value | A feature's fair, game-theoretic share of a prediction's deviation from the baseline |
| SHAP (SHapley Additive exPlanations) | The library/framework that computes Shapley values efficiently for ML models |
| `TreeExplainer` | Fast, exact SHAP explainer for tree-based models |
| `Explainer` | General-purpose SHAP explainer that works (more slowly) on any model |
| Summary plot | A chart ranking features by mean absolute SHAP value, showing direction and spread per feature |

## Recap

SHAP takes feature importance one level deeper than Lesson 19: instead of a single overall ranking, it attributes each individual prediction to the features that drove it, using a game-theoretically fair allocation. `TreeExplainer` and `Explainer` compute these values from real model objects, and summary plots turn them into a sanity check for whether a model's top features look like genuine signal or noise. Next up, Lesson 21: stability of signals over time, where we check whether a feature that looks important today still looks important a year from now.
