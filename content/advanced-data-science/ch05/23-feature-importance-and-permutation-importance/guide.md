# Feature Importance & Permutation Importance

The first question after "does it work?" is "what is it using?" Two tools answer it for almost any model: the importance scores built into tree ensembles, and permutation importance, which works for any model at all. They can disagree, and when they do, one of them is misleading you. This lesson shows which, using the same churn dataset from the last lesson with one deliberately useless column added.

## What you'll learn

- How impurity-based (built-in) feature importance is computed and why it can mislead
- How permutation importance works and how to run it with scikit-learn
- How to spot a useless feature that the built-in scores rank highly
- Three cautions when reading any importance score

## Two kinds of importance

**Impurity-based importance** comes free with random forests and gradient boosting as `feature_importances_`. It totals how much each feature reduced the splitting criterion across all trees during training. It is instant, but it is measured on the *training* data and tends to favor continuous or high-cardinality features, because they offer more places to split, even when the splits fit noise.

**Permutation importance** asks a more direct question: if I scramble one column on held-out data, how much worse does the model get? Shuffling breaks that feature's link to the target while leaving its distribution intact. A big drop means the model relies on the feature; no drop means it does not. It works for any model and is measured on data the model has not memorized.

## Set up: churn data plus a noise column

We reuse `make_churn` from lesson 22 and add `random_noise`, standard normal values with no relationship to churn at all. Any method that ranks it highly is being fooled.

```python
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.inspection import permutation_importance

df = make_churn()
rng = np.random.default_rng(3)
df["random_noise"] = rng.normal(size=len(df))
features = ["tenure_months", "monthly_charge", "support_tickets",
            "monthly_contract", "late_payments", "random_noise"]
X_train, X_test, y_train, y_test = train_test_split(
    df[features], df["churned"], test_size=0.25,
    random_state=0, stratify=df["churned"])

rf = RandomForestClassifier(n_estimators=300, min_samples_leaf=5,
                            random_state=0).fit(X_train, y_train)
impurity = pd.Series(rf.feature_importances_, index=features)
```

## Run permutation importance

```python
perm = permutation_importance(rf, X_test, y_test, scoring="roc_auc",
                              n_repeats=20, random_state=0)
permutation = pd.Series(perm.importances_mean, index=features)

out = pd.DataFrame({"impurity": impurity, "permutation": permutation,
                    "perm_std": perm.importances_std})
print(out.sort_values("permutation", ascending=False).round(3))
```

We use the test set and AUC as the score, and `n_repeats=20` shuffles each column twenty times so we can see the spread. The results:

```
                  impurity  permutation  perm_std
tenure_months        0.278        0.067     0.014
support_tickets      0.146        0.059     0.011
monthly_contract     0.077        0.058     0.013
late_payments        0.075        0.025     0.009
monthly_charge       0.237        0.017     0.011
random_noise         0.187       -0.001     0.006
```

## Read the disagreement

The impurity column says `random_noise` matters (0.187, more than `support_tickets` at 0.146) and that `monthly_charge` is the second most important feature. The permutation column disagrees sharply: noise has an importance of about zero, and `monthly_charge` contributes a small 0.017 drop in AUC. Permutation importance matches how we built the data, where charge has a mild effect and support tickets and contract type have strong ones. The forest had used the continuous columns, including pure noise, to carve up the training data. That is exactly the bias to watch for.

Here is the chart from this code:

```python
import matplotlib.pyplot as plt

order = out.sort_values("permutation").index
fig, axes = plt.subplots(1, 2, figsize=(9, 3.5), sharey=True)
out.loc[order, "impurity"].plot.barh(ax=axes[0], color="#8E1C1C")
axes[0].set_title("Impurity importance (train)")
out.loc[order, "permutation"].plot.barh(
    ax=axes[1], xerr=out.loc[order, "perm_std"], color="#C4952E")
axes[1].set_title("Permutation importance (test, AUC drop)")
plt.tight_layout()
plt.savefig("importance.png", dpi=150)
```

## Three cautions

1. **Correlated features share credit.** If two columns carry the same signal, shuffling one leaves the other to cover, so both can look unimportant. Group correlated features or drop one before interpreting.
2. **Use held-out data.** Permutation importance on training data rewards overfitting. Compute it on validation or test data.
3. **Importance is not causation.** A feature the model relies on is not necessarily something you can change to change the outcome. It describes the model, not the world.

## Recap

Built-in importance is quick but biased toward features with many split points and measured on training data. Permutation importance, from `sklearn.inspection`, measures the score drop when a column is shuffled on held-out data, and it correctly gave a noise column zero credit. Use permutation importance as the default, treat the rest as hints, and remember it explains the model globally. To explain *individual* predictions, the next lesson introduces SHAP.
