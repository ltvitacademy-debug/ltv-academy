# Gradient Boosting on Financial Features

Random forests in Lesson 6 build many trees independently and average them. Gradient boosting builds trees sequentially, where each new tree is trained specifically to correct the errors of the trees before it. This usually gets more predictive power out of the same features — but it also hands you more ways to overfit, which is exactly the tradeoff you need to manage carefully on low-signal financial data.

## What you'll learn

- How gradient boosting differs from random forests: sequential error-correction vs. independent averaging
- XGBoost (`xgboost.XGBRegressor`) and LightGBM (`lightgbm.LGBMRegressor`) — the two dominant boosting libraries
- Early stopping, and the key tuning knobs: `learning_rate`, `max_depth`, `subsample`
- Regularization parameters specific to boosting: `reg_alpha` and `reg_lambda`

## Why boosting needs more careful tuning here

Each boosting round fits a new tree to the *residual errors* of the ensemble so far. That sequential refinement is powerful precisely because it keeps chasing whatever pattern is left in the errors — including noise, if you let it run too long or too aggressively. On data where real signal is 1–2% of variance, an under-regularized boosted model will cheerfully fit the remaining 98%+ of noise round after round, producing a training curve that keeps improving while validation performance gets worse.

```python
from xgboost import XGBRegressor
from sklearn.model_selection import train_test_split

X_tr, X_val, y_tr, y_val = train_test_split(X_train, y_train, test_size=0.2, shuffle=False)

xgb_model = XGBRegressor(
    n_estimators=1000,
    learning_rate=0.02,      # small steps -- the model needs many rounds to overfit
    max_depth=3,             # shallow trees; financial signal rarely needs deep interactions
    subsample=0.7,           # row sampling per tree, adds regularization
    colsample_bytree=0.7,    # feature sampling per tree
    reg_alpha=0.1,           # L1 penalty on leaf weights
    reg_lambda=1.0,          # L2 penalty on leaf weights
    early_stopping_rounds=50,
    eval_metric="rmse",
    random_state=0,
)
xgb_model.fit(X_tr, y_tr, eval_set=[(X_val, y_val)], verbose=False)
print(f"Best iteration: {xgb_model.best_iteration}")
```

**Early stopping** halts training once validation error stops improving for a set number of rounds (`early_stopping_rounds`), which is often more effective than hand-tuning `n_estimators` directly — you let the data decide how many rounds are actually useful, rather than guessing.

## LightGBM: a faster alternative

LightGBM uses a different (histogram-based, leaf-wise) tree-growing strategy that's typically faster on large tabular datasets, with a very similar parameter vocabulary:

```python
from lightgbm import LGBMRegressor, early_stopping

lgbm_model = LGBMRegressor(
    n_estimators=1000,
    learning_rate=0.02,
    max_depth=3,
    num_leaves=15,           # LightGBM's analog to controlling tree complexity
    subsample=0.7,
    colsample_bytree=0.7,
    reg_alpha=0.1,
    reg_lambda=1.0,
    random_state=0,
)
lgbm_model.fit(
    X_tr, y_tr,
    eval_set=[(X_val, y_val)],
    callbacks=[early_stopping(stopping_rounds=50)],
)
```

## Tuning priorities for low-signal data

In practice, the knobs that matter most for financial features, roughly in order: a small `learning_rate` (0.01–0.05) paired with early stopping, a shallow `max_depth` (2–4), and non-trivial `subsample`/`colsample_bytree` (0.6–0.8) to add randomness that fights overfitting. `reg_alpha`/`reg_lambda` are a secondary lever on top of those. As always, tune these with the walk-forward-style validation from Chapter 4, not a random K-fold split.

## Key terms

| Term | Meaning |
|---|---|
| Gradient boosting | Sequentially trains trees, each correcting the previous ensemble's errors |
| Early stopping | Halts training once validation error stops improving |
| learning_rate | Shrinks each tree's contribution; smaller values need more rounds but overfit less easily |
| subsample / colsample_bytree | Row/feature sampling per tree; adds regularizing randomness |
| reg_alpha / reg_lambda | L1/L2 penalties on the boosting model's leaf weights |

## Recap

Gradient boosting (XGBoost and LightGBM) usually outperforms random forests on tabular financial features, but it needs deliberate regularization — small learning rates, shallow trees, subsampling, and early stopping — to avoid chasing the noise that dominates financial data. Next up, Lesson 8: Neural Networks for Tabular Financial Data, where we ask whether deep learning earns its place in this picture at all.
