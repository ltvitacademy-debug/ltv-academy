# Simple Linear Regression

In the last lesson you learned that correlation measures how tightly two variables move together, and that it never proves cause. Simple linear regression takes the next step. It fits a straight line through the data so you can describe the relationship in concrete units and make predictions. It is also the foundation of most of the machine learning you will meet later in this program.

## What you'll learn

- What the regression line is and what "least squares" means
- How to fit a line with `scipy.stats.linregress` and by hand
- How to read the slope, the intercept, R-squared, and the residuals
- How to build a confidence interval for the slope
- When a prediction from the line can and cannot be trusted

## The model

Simple linear regression assumes that an outcome `y` is roughly a straight-line function of a predictor `x`, plus noise:

```
y = b0 + b1 * x + error
```

`b0` is the intercept and `b1` is the slope. The **least squares** method picks the `b0` and `b1` that make the sum of squared residuals as small as possible. A residual is the vertical gap between an actual value and the value on the line: `actual - predicted`.

## Fitting it in Python

We will use 60 illustrative homes. Size is in square feet and price is in thousands of dollars. The data is simulated with a fixed seed so you can reproduce every number.

```python
import numpy as np
from scipy import stats

rng = np.random.default_rng(42)
sqft = rng.uniform(800, 3000, 60).round(-1)
price = 50 + 0.15*sqft + rng.normal(0, 30, 60)

res = stats.linregress(sqft, price)
print(round(res.slope, 4), round(res.intercept, 2))
# 0.1493 45.16
print(round(res.rvalue**2, 3))
# 0.944
```

`linregress` returns the slope, intercept, correlation `rvalue`, a two-sided `pvalue` for the slope, and the slope's `stderr`. `np.polyfit(sqft, price, 1)` gives the same two coefficients.

## The same thing by hand

The formulas are short enough to write yourself:

```python
xm, ym = sqft.mean(), price.mean()
b1 = ((sqft-xm)*(price-ym)).sum() / ((sqft-xm)**2).sum()
b0 = ym - b1*xm
print(round(b1, 4), round(b0, 2))
# 0.1493 45.16
```

The slope is how x and y vary together, divided by how much x varies alone. The intercept is chosen so the line passes through the point of means. Same answer as `linregress`, so there is no magic in the library.

## Reading the output

- **Slope, 0.1493:** each additional square foot goes with about 0.149 thousand dollars, roughly 149 dollars, of extra price.
- **Intercept, 45.16:** the predicted price at zero square feet. Here it is not meaningful, because no house has zero area. Intercepts often are just an anchor for the line.
- **R-squared, 0.944:** about 94 percent of the variation in price is accounted for by size. In simple regression it equals the correlation squared.
- **Residuals:** they always average zero. Their spread (about 22.8 thousand here, computed with `ddof=2`) is the typical size of a miss. Plot them: if you see a curve or a funnel, a straight line is the wrong model.

## Predicting and quantifying uncertainty

```python
pred = b0 + b1*2000
print(round(pred, 1))
# 343.7

n = len(sqft)
t = stats.t.ppf(0.975, n - 2)
lo = res.slope - t*res.stderr
hi = res.slope + t*res.stderr
print(round(lo, 4), round(hi, 4))
# 0.1398 0.1588
```

A 2,000 square foot home is predicted at about 343.7 thousand dollars. The 95 percent confidence interval for the slope is roughly 0.140 to 0.159, built with the standard error and a t critical value that has `n - 2` degrees of freedom. The p-value tests whether the true slope is zero.

## Cautions

- **Do not extrapolate.** The line is only supported by the range of x you observed. A 10,000 square foot mansion may follow a completely different pattern.
- **Association, not causation.** The slope describes how price differs across homes of different sizes. It does not prove that adding a room raises a specific home's value. Observational data cannot promise that, and the next lessons show how experiments can.
- **Look at residuals and outliers.** One extreme point can pull the whole line.

## Recap

Least squares fits the line that minimizes squared residuals. The slope is the change in y per unit of x, R-squared is the share of variation explained, and the residuals show whether the line fits. Use `linregress` for the quick answer, know the by-hand formulas, and stay inside the range of your data.
