# Boosting Tuning Checklist

A compiled, reusable tuning procedure built from Lessons 1-5 (Gradient Boosting Explained, XGBoost,
LightGBM & CatBoost, Tuning Boosted Models, Boosting vs. Random Forests). Keep this next to any
notebook where you're tuning a gradient-boosted model.

## The tuning order (don't shuffle it)

1. **Learning rate and number of trees first.** They trade off against each other — a smaller
   `learning_rate` needs more trees to reach the same fit. Fix a moderate learning rate (0.05 to
   0.1 for exploring) and let early stopping or cross-validation choose the tree count for you.
2. **Tree shape second.** `max_depth` and `min_child_weight` (XGBoost's name for the minimum
   amount of data a leaf must hold) control how complex each individual tree is allowed to be.
   Boosting generally prefers shallow trees — depth 3 to 6 in practice — unlike a random forest's
   deep, independent trees.
3. **Randomness third.** `subsample` and `colsample_bytree` add variety between trees, borrowed
   from the random-forest bagging trick.
4. **Regularization fourth.** `reg_lambda` (L2), `reg_alpha` (L1), and `gamma` (the minimum loss
   reduction required to make a split) penalize tree complexity directly.
5. **Last, only if it still matters:** lower the learning rate further and retrain with
   proportionally more trees for a small final gain.

## Picking the number of trees without peeking at the test set

```python
dtrain = xgb.DMatrix(X_tr, label=y_tr)
params = {"objective": "binary:logistic", "eval_metric": "auc", "eta": 0.1,
          "max_depth": 3, "subsample": 0.8, "colsample_bytree": 0.8}
cv = xgb.cv(params, dtrain, num_boost_round=500,
            nfold=5, early_stopping_rounds=30, seed=0)
n_trees = len(cv)
```

Or, with a held-out validation set and `XGBClassifier` directly:

```python
model = xgb.XGBClassifier(
    n_estimators=500, learning_rate=0.05, max_depth=3,
    subsample=0.8, colsample_bytree=0.8, reg_lambda=1.0,
    eval_metric="auc", early_stopping_rounds=30, random_state=0)
model.fit(X_fit, y_fit, eval_set=[(X_val, y_val)], verbose=False)
```

Either way, the number of trees is chosen by the data, not guessed.

## Random search for everything else

```python
from scipy.stats import randint, uniform
from sklearn.model_selection import RandomizedSearchCV

space = {"max_depth": randint(2, 8),
         "min_child_weight": randint(1, 20),
         "subsample": uniform(0.6, 0.4),
         "colsample_bytree": uniform(0.5, 0.5),
         "reg_lambda": uniform(0.5, 9.5)}
search = RandomizedSearchCV(
    xgb.XGBClassifier(n_estimators=n_trees, learning_rate=0.1),
    space, n_iter=25, cv=3, scoring="roc_auc", random_state=0)
search.fit(X_tr, y_tr)
```

## Before you trust an improvement, check it against the noise

```python
r = pd.DataFrame(search.cv_results_).sort_values("mean_test_score")
# compare the gap between two settings against r["std_test_score"] (fold-to-fold noise)
```

If the gap between two candidate settings is smaller than the standard deviation across
cross-validation folds, treat them as tied — a random search finding a "better" combination by
0.001 AUC is not a result, it's noise. Prefer the simpler settings (shallower trees, fewer trees,
stronger regularization) whenever two candidates tie.

## Good habits, every time

- Tune on the training data only (cross-validation or a validation split). Touch the test set
  once, at the end.
- Set a search budget. More iterations rarely rescue a model with poor features.
- Record the default-settings score as your own baseline before tuning anything — it tells you
  how much of the eventual improvement actually came from tuning versus from a sensible learning
  rate and tree count.

## When boosting is (and isn't) the right tool

Boosting mainly reduces **bias** by fitting sequential shallow trees to residuals; a random forest
mainly reduces **variance** by averaging independent deep trees. Reach for boosting on tabular
data with real signal to extract and the patience to tune it; reach for a random forest when you
want a strong result with almost no tuning at all, or when training time or interpretability of
individual trees matters more than squeezing out the last bit of accuracy.
