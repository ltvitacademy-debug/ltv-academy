# Capstone: Build It

Lesson 26 laid out the brief and, crucially, the validation plan — decided before any model gets trained. This lesson walks through a worked example of the actual pipeline: features, a gradient-boosted model, a purged walk-forward validation loop, and the out-of-sample metrics that tell you whether any of it actually worked. Treat this as illustrative scaffolding for your own capstone, not a copy-paste final answer.

## What you'll learn

- Feature engineering on a simulated return panel
- Fitting a gradient-boosted model (Chapter 2's toolkit)
- Running it through a purged walk-forward validation loop (Chapter 4)
- Computing out-of-sample IC and Sharpe (Chapter 5)
- Checking signal stability across folds (Chapter 5) before drawing any conclusion

## Step 1 — Feature engineering

Starting from the simulated return panel sketched in Lesson 26, build a small set of standard features per asset: momentum, volatility, and simple mean-reversion z-scores — the kind of toolkit established in Chapters 2–3.

```python
import numpy as np
import pandas as pd

def build_features(price_panel: pd.DataFrame) -> pd.DataFrame:
    feats = []
    for asset in price_panel.columns:
        s = price_panel[asset]
        df = pd.DataFrame(index=s.index)
        df["mom_20"] = s.rolling(20).sum()                       # 20-day momentum
        df["vol_20"] = s.rolling(20).std()                       # realized volatility
        df["zscore_10"] = (s - s.rolling(10).mean()) / s.rolling(10).std()
        df["asset"] = asset
        df["fwd_return_5"] = s.shift(-5).rolling(5).sum()         # forward label window
        feats.append(df)
    return pd.concat(feats).dropna()

feature_df = build_features(price_panel)
X = feature_df[["mom_20", "vol_20", "zscore_10"]]
y = (feature_df["fwd_return_5"] > 0).astype(int)  # simple directional label
```

## Step 2 — Fit a gradient-boosted model

```python
from xgboost import XGBClassifier

model = XGBClassifier(
    n_estimators=200,
    max_depth=3,
    learning_rate=0.05,
    subsample=0.8,
    random_state=42,
)
```

Note the model isn't fit yet — fitting happens inside each fold of the validation loop below, never once on the full dataset before validating. Fitting once on everything and then "validating" afterward is exactly the bolted-on-after-the-fact mistake Lesson 26 warned against.

## Step 3 — Purged walk-forward validation loop

```python
def purged_walk_forward_splits(n_samples, n_splits=5, embargo=5, purge=5):
    fold_size = n_samples // (n_splits + 1)
    for i in range(1, n_splits + 1):
        train_end = i * fold_size
        test_start = train_end + purge
        test_end = test_start + fold_size - embargo
        if test_end > n_samples:
            break
        yield (np.arange(0, train_end), np.arange(test_start, test_end))

results = []
dates = feature_df.index
for train_idx, test_idx in purged_walk_forward_splits(len(feature_df)):
    X_train, y_train = X.iloc[train_idx], y.iloc[train_idx]
    X_test, y_test = X.iloc[test_idx], y.iloc[test_idx]

    fold_model = XGBClassifier(
        n_estimators=200, max_depth=3, learning_rate=0.05,
        subsample=0.8, random_state=42,
    )
    fold_model.fit(X_train, y_train)
    preds = fold_model.predict_proba(X_test)[:, 1]
    results.append({"test_idx": test_idx, "preds": preds, "y_test": y_test})
```

The purge gap between training and test data, and the embargo after each test fold, exist specifically to prevent the overlapping-outcome leakage from Chapters 1 and 4 — because the `fwd_return_5` label looks five days into the future, any test observation whose label window overlaps the training set would otherwise leak information backward.

## Step 4 — Compute out-of-sample IC and Sharpe

```python
from scipy.stats import spearmanr

ic_per_fold = []
for r in results:
    ic, _ = spearmanr(r["preds"], r["y_test"])
    ic_per_fold.append(ic)

ic_per_fold = pd.Series(ic_per_fold)
print("Mean IC:", ic_per_fold.mean())
print("IC std:", ic_per_fold.std())
print("IC information ratio:", ic_per_fold.mean() / ic_per_fold.std())

# A simple strategy Sharpe from the predicted probabilities, for illustration
strategy_returns = pd.concat([
    (r["preds"] - 0.5) * feature_df["fwd_return_5"].iloc[r["test_idx"]].values
    for r in results
])
sharpe = strategy_returns.mean() / strategy_returns.std() * np.sqrt(252 / 5)
print("Annualized Sharpe (illustrative):", sharpe)
```

## Step 5 — Check signal stability, don't just report the average

```python
print(ic_per_fold)  # inspect fold-by-fold, not just the mean
```

A mean IC that looks attractive can still hide a signal that worked in two folds and collapsed in three — exactly the instability Lesson 21 warned about. Plot `ic_per_fold` across folds before drawing any conclusion, the same way you'd plot rolling feature importance.

## Interpreting the result honestly

If the mean IC is small and the fold-to-fold IC is unstable (a mix of positive and negative values with a wide standard deviation), the honest conclusion is that this particular feature set and label show weak or no robust signal — and that's a legitimate, useful capstone finding, not a failure. If the IC is small but consistently positive across folds, that's a genuinely interesting result worth reporting carefully, without overstating it into a production-ready trading strategy.

## Key terms

| Term | Meaning |
|---|---|
| Purge/embargo gap | Removed periods around each test fold preventing label-overlap leakage |
| Out-of-sample IC | Rank correlation between predictions and outcomes, computed on held-out folds |
| Fold-to-fold stability | Whether a metric like IC holds steady or swings wildly across validation folds |

## Recap

This worked example tied the whole course together: engineered features, a gradient-boosted model fit fresh inside each purged walk-forward fold, out-of-sample IC and Sharpe computed from those folds, and a stability check across folds before drawing any conclusion. Next up, the final lesson of the course, Lesson 28: wrapping up the capstone and presenting it for a portfolio.
