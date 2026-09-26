# Grid Search

In the last lesson you tuned one hyperparameter at a time. Real models have several, and they interact: the best `max_depth` may depend on `min_samples_leaf`. Grid search handles this systematically. You list the values you want to try for each hyperparameter, and scikit-learn cross-validates every combination and tells you which won. The data is the seeded, illustrative churn-style dataset from earlier lessons, split into training and test sets, with `cv` a 5-fold `StratifiedKFold`.

## What you'll learn

- How `GridSearchCV` works from grid to refit
- How to read `best_params_`, `best_score_`, `best_estimator_`
- How to inspect every combination in `cv_results_`
- How to tune a full pipeline
- Habits that prevent common grid search mistakes

## Define the grid and fit

A grid is a dictionary. Keys are hyperparameter names, values are lists of candidates. `GridSearchCV` tries every combination.

```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import GridSearchCV

rf = RandomForestClassifier(random_state=42)
param_grid = {
    "n_estimators": [50, 200],
    "max_depth": [3, 6, None],
    "min_samples_leaf": [1, 5]}
gs = GridSearchCV(rf, param_grid, cv=cv, scoring="f1")
gs.fit(X_tr, y_tr)
```

That is 2 x 3 x 2 = 12 combinations. With 5 folds, scikit-learn trains 60 models during the search, then one more for the refit. The cost of a grid is always combinations times folds, which is why grids grow expensive so quickly.

## Read the results

```python
print(gs.best_params_)
print(round(gs.best_score_, 3))
```

The winner is `{'max_depth': None, 'min_samples_leaf': 1, 'n_estimators': 200}` with a cross-validated F1 of `0.917`. Because `refit=True` is the default, `gs.best_estimator_` is already retrained on all the training data, and `gs.predict(X_te)` uses it directly. On the untouched test set the F1 is `0.918`.

Notice that `best_score_` is a cross-validation score, computed on the training portion. Your honest estimate of future performance is the test-set score, and you should look at it only once, after tuning is finished. Lesson 15 explains why in depth.

## Inspect every combination

The winner is only part of the story. `cv_results_` holds everything, and it converts cleanly to a data frame:

```python
import pandas as pd

res = pd.DataFrame(gs.cv_results_)
cols = ["param_n_estimators", "param_max_depth",
        "param_min_samples_leaf", "mean_test_score",
        "std_test_score", "rank_test_score"]
print(res[cols].sort_values("rank_test_score"))
```

The top rows read as follows (trees, depth, leaf, mean, std, rank): 200, None, 1, 0.917, 0.023, 1; 50, None, 1, 0.909, 0.038, 2; 200, None, 5, 0.891, 0.037, 3. The worst is 200 trees with depth 3 and leaf 5: mean 0.782, rank 12. Two lessons stand out. Depth matters far more than the number of trees here, and the top two scores are separated by 0.008, which is smaller than their standard deviations. Treat them as a tie.

## Habits that pay off

- **Watch the edges.** The winner used `max_depth=None` and `min_samples_leaf=1`, both at the edge of the grid. When that happens, widen the grid and search again.
- **Start coarse.** Try a few widely spaced values first, then a finer grid around the promising region.
- **Use `n_jobs=-1`** to run fits in parallel across your CPU cores.
- **Pick a scoring metric that matches the goal**, for example `scoring="f1"` or `"roc_auc"`, rather than accepting accuracy by default.

## Tuning a pipeline

Pass the whole pipeline to `GridSearchCV` and name parameters as `step__parameter`, exactly as in the previous lesson:

```python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

pipe = Pipeline([("scale", StandardScaler()),
                 ("clf", LogisticRegression())])
grid = {"clf__C": [0.01, 0.1, 1, 10]}
gs = GridSearchCV(pipe, grid, cv=cv, scoring="f1",
                  n_jobs=-1)
gs.fit(X_tr, y_tr)
print(gs.best_params_, round(gs.best_score_, 3))
```

The result is `{'clf__C': 1}` with F1 `0.73`. The mean scores for the four values of C are 0.541, 0.715, 0.73 and 0.73. Because the scaler is inside the pipeline, it is refit on each training fold, so nothing leaks from the validation rows.

## Recap

`GridSearchCV` cross-validates every combination in your grid, ranks them, and refits the best. Read `cv_results_`, not just `best_params_`, watch for winners at the grid edge and for near-ties, and count combinations times folds before you press run. Next, lesson 14 covers random and Bayesian search, which help when grids get too big.
