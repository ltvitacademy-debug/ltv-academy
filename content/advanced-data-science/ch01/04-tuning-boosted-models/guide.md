# Tuning Boosted Models

Boosting libraries have dozens of settings, and it is tempting to throw a giant grid search at all of them. That wastes compute and, as we will see, often buys very little. A better approach is to tune in a sensible order, spend most of your effort on the few settings that matter, and measure improvements against the noise in your validation scores. This lesson tunes XGBoost on the illustrative churn table from Lesson 2, and the same ideas carry over to LightGBM and CatBoost.

## What you'll learn

- Which boosting settings matter most, and the order to tune them
- How `xgb.cv` picks the number of trees for a given learning rate
- How to run a random search with scikit-learn's `RandomizedSearchCV`
- How to tell a real improvement from noise

## The tuning order

1. **Learning rate and number of trees.** They trade off: a smaller `learning_rate` needs more trees. Fix a moderate learning rate (0.05 to 0.1 for exploring), then let early stopping choose the tree count.
2. **Tree shape.** `max_depth` and `min_child_weight` (the minimum weight of data a leaf must hold) control how complex each tree can be.
3. **Randomness.** `subsample` and `colsample_bytree` add variety between trees.
4. **Regularization.** `reg_lambda`, `reg_alpha` and `gamma` penalize complexity.
5. **Last, if it matters,** lower the learning rate and retrain with proportionally more trees for a small final gain.

## Step 1: choose the number of trees

We hold out 25% of the churn table as a test set and tune only on the other 75%. As a reference point, XGBoost with no settings at all (in the version I ran, 2.1.4: learning rate 0.3, depth 6, 100 trees) scored a test AUC of 0.788.

```python
dtrain = xgb.DMatrix(X_tr, label=y_tr)
params = {"objective": "binary:logistic",
          "eval_metric": "auc", "eta": 0.1,
          "max_depth": 3, "subsample": 0.8,
          "colsample_bytree": 0.8}
cv = xgb.cv(params, dtrain, num_boost_round=500,
            nfold=5, early_stopping_rounds=30, seed=0)
n_trees = len(cv)
```

Five-fold cross-validation with early stopping settled on `n_trees = 58`. Simply moving to a lower learning rate, shallower trees and the right tree count lifted test AUC from 0.788 to 0.827.

## Step 2: random search

Instead of trying every combination, random search samples settings from ranges you specify. It covers a large space with a fixed budget, and for many problems finds settings about as good as an exhaustive grid.

```python
space = {"max_depth": randint(2, 8),
         "min_child_weight": randint(1, 20),
         "subsample": uniform(0.6, 0.4),
         "colsample_bytree": uniform(0.5, 0.5),
         "reg_lambda": uniform(0.5, 9.5)}
search = RandomizedSearchCV(
    xgb.XGBClassifier(n_estimators=n_trees,
                      learning_rate=0.1),
    space, n_iter=25, cv=3,
    scoring="roc_auc", random_state=0)
search.fit(X_tr, y_tr)
```

`randint(2, 8)` draws depths 2 through 7, and `uniform(0.6, 0.4)` draws values between 0.6 and 1.0. The best trial had depth 4, `min_child_weight` 11 and `reg_lambda` about 9.8, with a cross-validated AUC of 0.8344.

## The honest result

```
default settings          test AUC 0.788
after step 1 (58 trees)   test AUC 0.827
after random search       test AUC 0.826
```

The random search did not beat the step 1 model on the test set. The reason is in the chart from the video, drawn from `search.cv_results_` (the `import matplotlib.pyplot as plt` line is assumed):

```python
r = pd.DataFrame(search.cv_results_)
r = r.sort_values("mean_test_score")
plt.errorbar(range(len(r)), r.mean_test_score,
             yerr=r.std_test_score, fmt="o")
```

The chart shows that all 25 trials scored between 0.826 and 0.834 mean CV AUC, while the fold-to-fold standard deviation was about 0.009. The ten best trials differ from one another by a standard deviation of only about 0.0004, far below that noise, so the search could not really tell them apart. (The snippets assume `from scipy.stats import randint, uniform` and `from sklearn.model_selection import RandomizedSearchCV`.)

That is a common pattern. The big gains came from the first step: using a sensible learning rate with early stopping, and not overfitting with deep trees. Fine-tuning after that tends to give small, uncertain gains.

## Good habits

- **Tune on the training data only.** Use cross-validation or a validation split, and touch the test set once at the end.
- **Compare against the noise.** If the gap between two settings is smaller than the standard deviation across folds, treat them as tied.
- **Prefer simpler settings** when scores tie: shallower trees, fewer trees, stronger regularization.
- **Set a budget.** More search iterations rarely rescue a model with poor features.

Smarter searchers exist, such as Bayesian optimization tools like Optuna. I did not run them here, but they use the same principle: try settings, score with cross-validation, and keep the best.

## Recap

Tune in order: learning rate and tree count first, then tree shape, sampling and regularization. Use `xgb.cv` or early stopping for the tree count and `RandomizedSearchCV` for the rest, always judged against fold-to-fold noise. Next, we ask an important question: when does boosting actually beat a random forest?
