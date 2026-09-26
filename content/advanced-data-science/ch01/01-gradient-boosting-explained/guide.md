# Gradient Boosting Explained

Welcome to Advanced Data Science. In the earlier courses you learned to build, validate and deploy solid machine learning models. This course adds the specializations that separate a junior candidate from a senior one: boosted tree models, time-series forecasting, natural language processing, recommendation systems, and more. We start with the algorithm that wins most tabular-data problems today: **gradient boosting**.

## What you'll learn

- How boosting differs from the bagging you saw in random forests
- The core loop: fit a small tree to the current errors, add it, repeat
- What the learning rate and the number of trees control
- How to reproduce scikit-learn's `GradientBoostingRegressor` from scratch, and confirm the results match

## Bagging versus boosting

A random forest grows many deep trees **independently** and averages them. Each tree is a strong learner on its own, and averaging reduces variance.

Boosting works the opposite way. It grows many **shallow** trees **one after another**, and each new tree is trained to fix the mistakes the ensemble has made so far. Each tree is a weak learner (often only two or three levels deep), but the sequence together becomes very accurate. Boosting mainly reduces bias, which is why it can fit patterns a single small tree never could.

## The loop, in plain words

For regression with squared error, gradient boosting is surprisingly simple:

1. Start with a constant prediction, the average of the target.
2. Compute the **residuals**: actual value minus the current prediction.
3. Fit a small tree to predict those residuals.
4. Add a fraction of that tree's output to the prediction. The fraction is the **learning rate**.
5. Repeat from step 2.

Where does the word "gradient" come from? For squared error, the residual is exactly the negative gradient of the loss with respect to the current prediction. Fitting a tree to residuals is therefore gradient descent, but in the space of functions instead of the space of parameters. For other losses, such as log loss for classification, the trees are fit to the negative gradient of that loss, which is no longer a simple residual.

## Building it from scratch

We use a noisy sine wave: 300 points, `y = sin(x) + noise`, split 70/30. The data is illustrative, but the code below is complete and runs.

```python
import numpy as np
from sklearn.tree import DecisionTreeRegressor
from sklearn.model_selection import train_test_split

rng = np.random.RandomState(0)
X = rng.uniform(0, 6, 300).reshape(-1, 1)
y = np.sin(X).ravel() + rng.normal(0, 0.2, 300)
X_tr, X_te, y_tr, y_te = train_test_split(
    X, y, test_size=0.3, random_state=0)

lr = 0.1
pred_tr = np.full(len(y_tr), y_tr.mean())
pred_te = np.full(len(y_te), y_tr.mean())
for i in range(50):
    resid = y_tr - pred_tr
    t = DecisionTreeRegressor(max_depth=2)
    t.fit(X_tr, resid)
    pred_tr += lr * t.predict(X_tr)
    pred_te += lr * t.predict(X_te)
```

Measuring test mean squared error along the way gives these values:

```
mean only (no trees)   0.589
after 1 tree           0.493
after 5 trees          0.255
after 50 trees         0.050
```

Each tree removes a slice of the remaining error. The curve after one tree is nearly flat because the learning rate takes only a small step. After 50 trees it follows the sine wave closely, as the chart in the video shows.

## Matching scikit-learn

scikit-learn's implementation does exactly this, with a few extras:

```python
from sklearn.ensemble import GradientBoostingRegressor

gbr = GradientBoostingRegressor(
    n_estimators=50, learning_rate=0.1,
    max_depth=2, random_state=0)
gbr.fit(X_tr, y_tr)
print(np.allclose(gbr.predict(X_te), pred_te))
```

This prints `True`: on this data, our short loop produces the same predictions as the library, and the test MSE is 0.050 for both.

## The three dials that matter

- **`n_estimators`**: how many trees. More trees fit the training data more tightly, and eventually they overfit. Unlike a random forest, more is not always safe.
- **`learning_rate`**: how much of each tree to add. Small steps generalize better but need more trees. The two settings trade off against each other.
- **`max_depth`**: how complex each tree is. Boosting usually likes shallow trees, often depth 3 to 6 in practice.

## Recap

Boosting builds trees sequentially, each one fitted to the errors of the ensemble so far, and adds them in small steps controlled by a learning rate. The "gradient" is the direction of steepest error reduction, which for squared error is simply the residual. You have now seen the algorithm end to end. In the next lesson we meet XGBoost, the library that made it fast and popular.
