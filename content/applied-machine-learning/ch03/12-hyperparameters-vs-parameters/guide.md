# Hyperparameters vs. Parameters

Every model in scikit-learn contains numbers, and they fall into two very different groups. Some numbers the model works out for itself from your data. Others you must decide before training begins, and the model has no way to learn them on its own. Confusing the two is one of the most common beginner mistakes, and understanding the difference is the foundation for everything in this chapter. The data here is the seeded, illustrative churn-style dataset from earlier lessons in this chapter, split into `X_tr, y_tr` and `X_te, y_te`.

## What you'll learn

- The difference between parameters and hyperparameters
- How to read learned parameters after `fit`
- How to read and change hyperparameters with `get_params` and `set_params`
- How pipeline parameter names work
- Why hyperparameters are chosen on validation scores, not training scores

## Parameters: learned from data

Parameters are the values `fit` computes. For linear or logistic regression they are the coefficients and the intercept. For a decision tree they are the split questions and thresholds in every node. In scikit-learn, attributes learned during `fit` end with a trailing underscore.

```python
from sklearn.linear_model import LogisticRegression

lr = LogisticRegression(C=1.0)
lr.fit(X_tr, y_tr)
print(lr.coef_.round(2))
print(lr.intercept_.round(2))
```

The output is `[[-0.38  0.91  0.19 -0.03  0.6  -0.08 -0.72 -0.65]]` and `[0.19]`: eight coefficients, one per feature, plus an intercept. These attributes do not exist until you call `fit`. Ask an unfitted model for `coef_` and you get an error.

## Hyperparameters: chosen by you

Hyperparameters are the settings passed to the constructor. Examples are `C` for logistic regression, `max_depth` for a tree, and `n_neighbors` for k-NN. Read them with `get_params()` and change them with `set_params()`:

```python
lr.get_params()["C"]      # 1.0
lr.set_params(C=0.01)
```

Calling `get_params()` on a logistic regression also shows `penalty="l2"`, `solver="lbfgs"`, `max_iter=100` and more. All of those are hyperparameters, though only a few usually matter for accuracy.

Inside a pipeline, each parameter name gets a prefix: the step name, two underscores, then the parameter.

```python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

pipe = Pipeline([
    ("scale", StandardScaler()),
    ("clf", LogisticRegression())])
pipe.set_params(clf__C=0.1)
print(pipe.get_params()["clf__C"])   # 0.1
```

Grid search, coming in the next lesson, uses exactly this naming.

## A hyperparameter changes what is learned

Hyperparameters do not learn anything, but they control what the learning produces. In logistic regression, `C` is the inverse of regularization strength. Small `C` means strong regularization, which shrinks the coefficients.

```python
import numpy as np

for C in [0.001, 0.1, 10]:
    m = LogisticRegression(C=C)
    m.fit(X_tr, y_tr)
    print(C, np.abs(m.coef_).sum().round(2),
          m.score(X_te, y_te))
```

The total coefficient size is 0.62 at `C=0.001`, 3.23 at `C=0.1` and 3.61 at `C=10`. Test accuracy is 0.725, 0.810 and 0.805. Too much regularization underfits, and beyond a point more freedom does not help.

## Choose hyperparameters with validation

You cannot pick `max_depth` by looking at training accuracy, because a deeper tree always fits the training data at least as well. Use cross-validation instead:

```python
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import cross_val_score

for d in [2, 4, 8, None]:
    t = DecisionTreeClassifier(max_depth=d,
                               random_state=42)
    s = cross_val_score(t, X_tr, y_tr, cv=cv)
    print(d, s.mean().round(3), s.std().round(3))
```

Cross-validated mean and standard deviation: depth 2 gives 0.885 and 0.019, depth 4 gives 0.893 and 0.018, depth 8 gives 0.916 and 0.019, and no limit gives 0.919 and 0.024. Training accuracy for the same four settings is 0.894, 0.935, 0.998 and 1.000, which just keeps rising. The difference between depth 8 and no limit, 0.003, is much smaller than the fold-to-fold spread, so the data cannot tell them apart. When two settings tie, prefer the simpler one.

## The tuning habit

1. List candidate hyperparameter values.
2. Cross-validate each on the training data.
3. Keep the best, paying attention to the spread.
4. Check the winner once on the untouched test set.

## Recap

Parameters are learned by `fit` and end in an underscore. Hyperparameters are set by you and read with `get_params`. In a pipeline, use `step__parameter`. Always choose hyperparameters with validation scores. Next, lesson 13 automates the search with grid search.
