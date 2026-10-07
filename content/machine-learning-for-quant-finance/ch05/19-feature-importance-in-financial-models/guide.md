# Feature Importance in Financial Models

You've spent Chapter 4 learning to validate a model honestly. Once a model survives purged walk-forward validation, the next question a researcher — or a skeptical risk manager — will ask is "why does it work?" Feature importance is the first tool for answering that, but in finance it comes with a sharp edge: the most popular method, built straight into every tree library, is also the one most likely to mislead you when your features are correlated, which in finance they almost always are.

## What you'll learn

- Mean Decrease in Impurity (MDI) — the free, built-in importance every tree model gives you, and why it's biased
- Permutation importance — a model-agnostic, out-of-sample alternative
- Mean Decrease Accuracy (MDA) — permutation importance's close cousin, measured via cross-validation
- Why correlated and substitute features specifically break MDI in financial datasets
- Why this lesson sets up Lesson 20's deeper tool: SHAP

## Mean Decrease in Impurity (MDI)

Every scikit-learn or XGBoost tree model exposes `.feature_importances_` for free once it's fit. It's computed from training data alone, by summing how much each feature reduced impurity (Gini, entropy, or variance) every time it was used as a split, averaged across all trees.

```python
from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier(n_estimators=500, random_state=42)
model.fit(X_train, y_train)

mdi_importances = model.feature_importances_
ranked = sorted(zip(X_train.columns, mdi_importances), key=lambda t: -t[1])
for name, score in ranked[:10]:
    print(f"{name:30s} {score:.4f}")
```

MDI is fast — no extra computation beyond the fit you already did — but it has two problems that matter a lot in finance:

1. **It's computed in-sample.** A feature can look important to MDI purely because the model overfit to noise in the training data, even if that feature has zero genuine out-of-sample signal.
2. **It's biased toward high-cardinality and correlated features.** A continuous feature with many unique values gets more opportunities to produce a locally "good" split than a coarse categorical one, inflating its importance regardless of true signal. Worse, when two features are highly correlated — extremely common in finance, where a dozen momentum variants or a dozen volatility estimators often carry almost the same information — the tree can split on either one more or less at random. MDI then spreads credit unevenly between them, understating both relative to what a single, non-duplicated version of that signal would show.

Marcos López de Prado's critique (in *Advances in Financial Machine Learning*) is specifically about this second point: financial feature sets are full of substitute effects — redundant, overlapping, correlated variables describing the same underlying phenomenon — and MDI's in-sample, split-counting logic simply isn't built to handle that correctly.

## Permutation importance

Permutation importance asks a more direct, model-agnostic question: if I destroy this one feature's relationship with the target — by randomly shuffling its values — how much worse does the model's out-of-sample performance get?

```python
from sklearn.inspection import permutation_importance

result = permutation_importance(
    model, X_test, y_test,
    n_repeats=30,
    random_state=42,
    scoring="roc_auc",
)

perm_ranked = sorted(
    zip(X_test.columns, result.importances_mean, result.importances_std),
    key=lambda t: -t[1],
)
for name, mean, std in perm_ranked[:10]:
    print(f"{name:30s} mean={mean:.4f}  std={std:.4f}")
```

Because it's measured on held-out data (`X_test`, `y_test` — ideally from a purged walk-forward fold, not a naive split) and works by breaking the feature's signal rather than counting splits, it isn't fooled by in-sample overfitting the same way MDI is. It's also model-agnostic: it works identically for a random forest, a gradient-boosted model, or a neural network, because it only touches inputs and outputs, never the model's internals.

Permutation importance is not immune to correlated features either — shuffling one feature when a near-duplicate remains in the dataset can understate its importance, because the model just leans on the duplicate instead. But because the measurement happens out-of-sample against real predictive performance, it's a materially more trustworthy starting point than MDI for financial data.

## Mean Decrease Accuracy (MDA)

MDA is permutation importance's older, cross-validation-flavored cousin: for each fold of a cross-validation scheme, shuffle one feature, measure the drop in a chosen metric (accuracy, AUC, or in finance often a risk-adjusted metric), and average the drop across folds. The mechanics are essentially the same shuffle-and-measure idea as `permutation_importance` above, just embedded inside your validation loop instead of run once against a held-out set. In practice, running `permutation_importance` against *each* purged walk-forward fold from Chapter 4 and averaging the results gives you MDA.

## Putting it together

A sound workflow: fit the model, glance at MDI as a cheap sanity check, then treat permutation importance (or MDA across your purged folds) as the number you actually report and act on. If a feature ranks highly in MDI but contributes almost nothing in out-of-sample permutation importance, that's a signal the model may be overfitting to it — exactly the kind of red flag Chapter 4's validation discipline exists to catch.

## Key terms

| Term | Meaning |
|---|---|
| MDI (Mean Decrease in Impurity) | `.feature_importances_`; in-sample, split-counting; biased by cardinality and correlation |
| Permutation importance | Shuffle one feature, measure out-of-sample performance drop; model-agnostic |
| MDA (Mean Decrease Accuracy) | Permutation importance averaged across cross-validation folds |
| Substitute effect | Two or more correlated features describing the same underlying signal, confusing split-based importance |

## Recap

MDI is the free importance score every tree model hands you, but it's computed in-sample and gets confused by the correlated, substitute-heavy feature sets that are normal in finance. Permutation importance and its cross-validated cousin MDA measure importance out-of-sample by breaking a feature's signal directly, making them the more trustworthy default. Next up, Lesson 20: SHAP and model explanation, a tool that goes further by attributing each individual prediction to its contributing features.
