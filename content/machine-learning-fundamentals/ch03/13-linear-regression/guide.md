# Linear Regression

Linear regression is the oldest and most useful starting point in machine learning. It predicts a number, such as a price, a demand forecast, or a delivery time, by drawing the best straight line through your data. It is simple enough to explain to anyone, fast to train, and it teaches ideas you will reuse for the rest of the course: parameters, loss, and fit.

## What you'll learn

- What "the best line" means, and how it is found
- How to fit and read a `LinearRegression` model in scikit-learn
- How to plot the fit and judge it with R²
- The assumptions to keep in mind

## The model

With one input feature, the model is a line:

```
price = intercept + slope × square_feet
```

The **intercept** is the predicted value when the feature is zero; the **slope** is how much the prediction changes for each extra unit of the feature. Training means choosing the intercept and slope, the model's **parameters**.

## What "best line" means

For any candidate line, each data point has a **residual**: the gap between the actual value and the line's prediction. Some residuals are positive, some negative, so we square them before adding. **Ordinary least squares (OLS)** picks the intercept and slope that minimize the sum of squared residuals. This is the mean squared error loss from lesson 6, and for a line it can be solved directly with algebra, no iteration required.

## Fit it in scikit-learn

We generate 60 illustrative houses. The true relationship built into the data is about $50,000 plus $120 per square foot, with random noise added, so we can see whether the model recovers it.

```python
import numpy as np
from sklearn.linear_model import LinearRegression
rng = np.random.default_rng(42)
sqft = rng.uniform(600, 3000, 60)
price = 50000 + 120 * sqft + rng.normal(0, 25000, 60)
X = sqft.reshape(-1, 1)
model = LinearRegression().fit(X, price)
print(model.intercept_.round(0), model.coef_.round(1))
print(model.predict([[1500]]).round(0))
print(round(model.score(X, price), 3))
```

Output:

```
45825.0 [119.5]
[225011.]
0.949
```

Two details worth noticing. First, scikit-learn expects `X` as a two-dimensional array of shape (rows, features), which is why we call `reshape(-1, 1)`. Second, the fitted values are close to the truth we built in: about 45,825 for the intercept and 119.5 for the slope, versus 50,000 and 120. Noise stops an exact match, and that is normal. The model predicts about $225,011 for a 1,500 square foot house. Every trained sklearn model exposes learned values with a trailing underscore (`intercept_`, `coef_`).

## See the fit

```python
import matplotlib.pyplot as plt
plt.scatter(sqft, price, s=15, alpha=0.6)
xs = np.array([[600], [3000]])
plt.plot(xs, model.predict(xs), color="crimson")
plt.xlabel("Square feet")
plt.ylabel("Price ($)")
plt.title("Illustrative housing data")
plt.show()
```

The scatter shows the data and the crimson line is the model. Always plot when you can: a picture reveals curves, outliers, and clusters that a single score hides.

## How good is the fit?

`model.score` returns **R²**, the share of the variation in price that the line explains. 0.949 means the line explains about 95% of the variation in this data. Be careful: this was computed on the same data used for training. Real evaluation happens on a held-out test set, as in lesson 7, and lesson 16 covers regression metrics in depth.

## Assumptions to keep in mind

- **Linearity.** The relationship really is roughly a straight line. If it curves, add features like squared terms or use a different model.
- **Independent errors.** Residuals aren't patterned or connected to each other, for example by time.
- **Roughly constant spread.** Errors are about the same size across the range.
- **Sensitivity to outliers.** Squaring residuals means one extreme point can tilt the line.

## Recap

Linear regression finds the intercept and slope that minimize squared residuals. In scikit-learn that is `LinearRegression().fit(X, y)`, with `intercept_` and `coef_` telling you what was learned. R² summarizes fit, but only test data tells you how it generalizes. Next, we extend the line to many features at once with multiple regression.
