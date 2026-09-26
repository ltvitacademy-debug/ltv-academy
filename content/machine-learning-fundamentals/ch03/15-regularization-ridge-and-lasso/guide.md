# Regularization: Ridge & Lasso

Multiple regression gets more flexible with every feature you add. Give it enough features and enough freedom, and it will find patterns that are not really there: the overfitting you met in Chapter 1. **Regularization** fights that by adding a penalty to the loss for having large coefficients, so the model has to earn every bit of complexity it uses. Two penalties dominate linear models: **ridge** and **lasso**.

## What you'll learn

- The idea of a penalized loss and the role of the strength parameter `alpha`
- How ridge shrinks coefficients and how lasso can zero them out
- How to compare OLS, ridge, and lasso in scikit-learn on a many-feature problem
- Why you must scale features first, and how to choose `alpha`

## The penalized loss

Ordinary least squares minimizes the sum of squared errors. Regularized regression minimizes:

```
loss = squared errors + alpha × penalty(coefficients)
```

- **Ridge (L2):** the penalty is the sum of the *squared* coefficients. It shrinks all coefficients toward zero but rarely makes any exactly zero.
- **Lasso (L1):** the penalty is the sum of the *absolute values* of the coefficients. It can push some coefficients to exactly zero, which removes those features from the model. That makes lasso an embedded feature selector, the family mentioned in lesson 12.

`alpha` sets the strength. At `alpha = 0` you recover ordinary least squares; larger values mean more shrinkage and a simpler model. It is a hyperparameter you tune.

## A problem built to overfit

We generate 120 rows with 40 features where only 4 truly matter, with plenty of noise. This is synthetic data from scikit-learn's `make_regression`, illustrative by design. Then we train on just 60 rows, so the model has almost as many coefficients as it has examples.

```python
import numpy as np
from sklearn.datasets import make_regression
from sklearn.linear_model import LinearRegression, Ridge, Lasso
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
X, y = make_regression(n_samples=120, n_features=40,
    n_informative=4, noise=40, random_state=1)
X_tr, X_te, y_tr, y_te = train_test_split(
    X, y, train_size=60, random_state=0)
```

## Compare the three models

```python
models = {"ols": LinearRegression(),
          "ridge": Ridge(alpha=30),
          "lasso": Lasso(alpha=5)}
fits = {}
for name, est in models.items():
    p = make_pipeline(StandardScaler(), est)
    fits[name] = p.fit(X_tr, y_tr)
    coef = p[-1].coef_
    print(name, round(p.score(X_tr, y_tr), 3),
          round(p.score(X_te, y_te), 3),
          (coef != 0).sum())
```

Each line prints the model name, training R², test R², and the number of non-zero coefficients:

```
ols 0.919 -0.645 40
ridge 0.729 0.492 40
lasso 0.681 0.636 10
```

This is overfitting in a table. Plain OLS scores 0.919 on the rows it trained on, but a negative R² of -0.645 on test rows, which means it does worse than always predicting the average. Ridge gives up some training fit and recovers a test R² of 0.492. Lasso does best here at 0.636 and keeps only 10 of the 40 features. Lower training scores paired with higher test scores is exactly what regularization is for.

## See the shrinkage

```python
import matplotlib.pyplot as plt
fig, axes = plt.subplots(1, 3, figsize=(9, 2.6), sharey=True)
for ax, (name, p) in zip(axes, fits.items()):
    ax.bar(range(40), p[-1].coef_)
    ax.set_title(name + ": coefficients")
    ax.set_xlabel("feature index")
plt.show()
```

OLS shows large coefficients in both directions, most of them fitting noise. Ridge squeezes them all toward zero. Lasso leaves most of them at exactly zero and keeps a handful.

## Practical rules

1. **Scale features first.** The penalty punishes coefficient size, and coefficient size depends on units. `StandardScaler` in the pipeline puts every feature on equal footing, and fitting it on the training data only avoids leakage.
2. **Choose `alpha` with cross-validation**, not by peeking at the test set. `RidgeCV` and `LassoCV` do this for you. On this data, `LassoCV(cv=5, random_state=0)` inside the same scaler pipeline chose an alpha of about 4.58, scored 0.638 on the test rows, and kept 11 features.
3. **Pick by goal.** Ridge suits many small, correlated effects, and it handles correlated features more gracefully than plain OLS, the multicollinearity trap from the last lesson. Lasso suits a suspicion that only a few features matter, or a need for a sparse, explainable model. `ElasticNet` blends both penalties.
4. **Regularization does not create signal.** If the data have no pattern, no penalty will invent one.

## Recap

Regularization adds a penalty on coefficient size to the loss. Ridge shrinks; lasso shrinks and selects. Scale your features, tune `alpha` by cross-validation, and judge the result on held-out data. Next, we need proper ways to measure how good a regression model is, so lesson 16 covers regression metrics.
