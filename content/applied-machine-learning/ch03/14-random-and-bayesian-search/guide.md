# Random & Bayesian Search

Grid search is thorough, but it has a cost problem. Every hyperparameter you add multiplies the number of combinations, and you spend equal effort on regions that clearly perform badly. This lesson covers two smarter approaches: random search, which is built into scikit-learn and easy to adopt today, and Bayesian search, which uses what it has already learned to choose what to try next. The data is the seeded, illustrative churn-style dataset used throughout this chapter, with `rf = RandomForestClassifier(random_state=42)` and `cv` a 5-fold `StratifiedKFold`.

## What you'll learn

- Why random search often beats grid search on a fixed budget
- How to describe hyperparameter ranges with `scipy.stats` distributions
- How to run and read `RandomizedSearchCV`
- When to sample on a log scale
- The idea behind Bayesian optimization and where to find it

## Why random search works

With a grid, each hyperparameter takes only the few values you listed, and the same values repeat in every combination. If one hyperparameter barely matters, most of your grid's effort is wasted repeating it. Random search draws combinations at random from ranges you describe, so 20 samples give 20 distinct values of every hyperparameter. You also set the budget directly, with `n_iter`, rather than getting whatever the grid multiplies out to.

## Describe ranges, not lists

Instead of lists, use distributions from `scipy.stats`. A plain Python list is sampled evenly.

```python
from scipy.stats import randint

dist = {
    "n_estimators": randint(50, 400),
    "max_depth": randint(3, 30),
    "min_samples_leaf": randint(1, 10),
    "max_features": [0.3, 0.5, 0.8, 1.0]}
```

`randint(a, b)` draws whole numbers from `a` up to but not including `b`. That is 350 values for trees, 27 for depth, 9 for leaf size and 4 for `max_features`. A grid covering every one of them would have 350 x 27 x 9 x 4 = 340,200 combinations.

## RandomizedSearchCV

It has the same interface as `GridSearchCV`, with `n_iter` added:

```python
from sklearn.model_selection import RandomizedSearchCV

rs = RandomizedSearchCV(rf, dist, n_iter=20, cv=cv,
                        scoring="f1", random_state=42)
rs.fit(X_tr, y_tr)
print(rs.best_params_)
print(round(rs.best_score_, 3))
```

Twenty sampled combinations times five folds is 100 fits. The best combination is `{'max_depth': 17, 'max_features': 0.8, 'min_samples_leaf': 1, 'n_estimators': 99}` with a cross-validated F1 of `0.92`. Set `random_state` so the sampling is reproducible. As with grid search, `refit=True` retrains the winner on all the training data. On the test set it scores F1 `0.927`.

Read `cv_results_` just as you did before. The top five results have mean F1 of 0.920, 0.919, 0.914, 0.912 and 0.911, each with quite different settings: 99 trees at depth 17, 251 trees at depth 20, 108 trees at depth 14. Many settings work about equally well. Random search found that good region with 100 fits, not 340,200 combinations times 5 folds. The worst of the 20 sampled scored 0.858, so the choice did matter somewhat.

## Sample on a log scale

Some hyperparameters, such as `C` in logistic regression or a learning rate, matter on a multiplicative scale: the difference between 0.001 and 0.01 is as important as the difference between 10 and 100. A uniform draw from 0.001 to 100 would put almost every sample above 1. Use `loguniform`:

```python
from scipy.stats import loguniform

C_dist = loguniform(1e-3, 1e2)
print(C_dist.rvs(5, random_state=0).round(4))
# [0.5547 3.7666 1.0323 0.5302 0.1313]
```

Pass it in the distributions dictionary like any other, for example `{"clf__C": loguniform(1e-3, 1e2)}` in a pipeline.

## Bayesian search: learn from earlier trials

Random search treats every trial independently. Bayesian optimization does not. It scores a few settings, fits a cheap statistical model of how score depends on the settings, and then chooses the next trial where a good score looks likely. After each result it updates the model and repeats. This pays off when each fit is expensive, such as a large gradient-boosted model or a neural network, because it needs fewer trials to find a good region.

Libraries that implement it include Optuna and scikit-optimize (whose `BayesSearchCV` mimics the scikit-learn interface). They are not part of scikit-learn, and this lesson does not run them, so check each project's current documentation and which scikit-learn versions it supports before adopting one. A useful rule: start with random search, and reach for Bayesian methods when single fits take minutes or longer.

## Recap

Random search draws a fixed number of combinations from distributions you describe, using `n_iter` to cap the cost. Use `randint` for integers and `loguniform` for scale-sensitive values. Bayesian search uses earlier trials to guide later ones. Whichever you use, the scores are still validation scores. Next, lesson 15 explains why the best cross-validated score is too optimistic, and how to keep an honest estimate.
