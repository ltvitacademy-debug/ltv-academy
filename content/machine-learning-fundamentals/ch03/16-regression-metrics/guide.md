# Regression Metrics

A regression model gives you a number for every row, so the natural question is: how wrong are those numbers? There is no single answer. Different metrics measure different kinds of "wrong", and the right one depends on what a mistake costs your business. This lesson covers the four you will use most: MAE, RMSE, R², and MAPE. It also shows why a good score can still hide a bad model.

## What you'll learn

- What MAE, RMSE, R², and MAPE measure, and in what units
- How each behaves when one prediction is badly wrong
- How to compute all four with scikit-learn
- How to use a residual plot to catch what a single score misses

## The four metrics

Let each prediction error be *actual minus predicted*.

- **MAE, mean absolute error.** The average of the absolute errors. It is in the target's own units, so "MAE 10,000" means predictions are off by about $10,000 on average. Every dollar of error counts equally.
- **RMSE, root mean squared error.** Square the errors, average them, and take the square root. It is also in the target's units, but squaring makes big misses count far more than small ones. RMSE is always at least as large as MAE, and the gap tells you how uneven your errors are.
- **R², coefficient of determination.** The share of the target's variation the model explains, relative to always predicting the mean. 1.0 is perfect, 0 is no better than the mean, and it can go negative on test data when a model is worse than the mean, as OLS did in the last lesson. It is unit-free, which makes it easy to compare across problems but says nothing about dollars.
- **MAPE, mean absolute percentage error.** The average of the absolute errors as a fraction of the actual value. It is easy to explain ("off by 3.5% on average"), but it blows up when actual values are near zero and treats over- and under-predictions differently.

## Compute them

Five illustrative house prices, and predictions that are each off by $10,000. We use floating-point arrays for the values.

```python
import numpy as np
from sklearn.metrics import (mean_absolute_error, mean_squared_error,
    r2_score, mean_absolute_percentage_error)
y_true = np.array([200, 250, 300, 350, 400]) * 1000.0
y_pred = np.array([210, 240, 310, 340, 390]) * 1000.0
def report(t, p):
    mse = mean_squared_error(t, p)
    print("MAE ", round(mean_absolute_error(t, p)))
    print("RMSE", round(mse ** 0.5))
    print("R2  ", round(r2_score(t, p), 3))
    print("MAPE", round(mean_absolute_percentage_error(t, p), 3))
report(y_true, y_pred)
```

Output:

```
MAE  10000
RMSE 10000
R2   0.98
MAPE 0.035
```

Since every error is exactly $10,000, MAE and RMSE agree. MAPE of 0.035 is 3.5%.

## What one big miss does

Now change just the last prediction so it is off by $150,000 instead of $10,000.

```python
bad = y_pred.copy()
bad[4] = 250000
report(y_true, bad)
```

```
MAE  38000
RMSE 67676
R2   0.084
MAPE 0.105
```

MAE rises from 10,000 to 38,000. RMSE jumps to 67,676, because the squared error of the one large miss dominates. R² collapses from 0.98 to 0.084. The same single error is seen very differently by each metric. If large misses are especially costly, such as underestimating a price by a fortune, favor RMSE. If all errors cost about the same per dollar, MAE is the more direct and robust choice.

## Which metric should you choose?

- Report **MAE or RMSE** for a dollar-scale story that stakeholders understand.
- Use **RMSE** when big errors are disproportionately bad.
- Use **R²** to compare how much of the pattern you captured, alongside an error metric.
- Use **MAPE** only when the target stays well above zero.
- Always compute metrics on **held-out data**, and compare against a simple baseline such as predicting the mean.

scikit-learn's `mean_squared_error` also accepts `squared=False` to return RMSE directly in the version used here. Newer releases are moving toward a dedicated function for this, so check the current documentation for your version.

## Look at the residuals

A single number can hide a systematic problem. Plot the residuals against the predictions. If the model is adequate, residuals scatter randomly around zero.

```python
import matplotlib.pyplot as plt
rng = np.random.default_rng(3)
x = rng.uniform(0, 10, 80)
y = 3 * x + 0.5 * x ** 2 + rng.normal(0, 2, 80)
X = x.reshape(-1, 1)
m = LinearRegression().fit(X, y)
pred = m.predict(X)
resid = y - pred
plt.scatter(pred, resid, s=15)
plt.axhline(0, color="crimson")
plt.xlabel("Predicted value")
plt.ylabel("Residual")
plt.show()
```

Here the true relationship is curved, but we fit a straight line. The training R² is a healthy 0.968, and yet the residuals form a clear U shape: the line under-predicts at both ends and over-predicts in the middle. That pattern is a signal to add a squared feature or use a more flexible model. The score looked good; the plot told the truth.

## Recap

MAE is the average miss, RMSE punishes large misses, R² is the share of variation explained, and MAPE is the average percentage miss. Choose based on the cost of errors, evaluate on held-out data, and always look at the residuals. Next, we turn from predicting numbers to predicting categories with logistic regression.
