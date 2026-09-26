# Regression Metrics in Practice

When a model predicts a number (a price, a delivery time, next month's sales), there is no confusion matrix. Every prediction is wrong by some amount, and the question is how to summarize those amounts in one honest figure. scikit-learn offers a dozen regression metrics, and they do not always agree. This lesson covers the four you will use most, shows what each one rewards and punishes, and ends with a rule for choosing.

## What you'll learn

- How MAE, RMSE, R-squared, and MAPE are calculated and what each one means
- Why RMSE reacts strongly to a few large misses while MAE does not
- Why R-squared depends on the data you score it on
- How to request these metrics in `cross_validate` using the `neg_` scoring names
- How to check whether error is steady in dollars or steady in percent

## Four metrics on five homes

Start small enough to check by hand. Five illustrative homes sell for 200, 250, 300, 350 and 400 thousand dollars. The model misses four of them by 10,000 and the last one by 100,000.

```python
import numpy as np
from sklearn.metrics import (mean_absolute_error,
    mean_squared_error, r2_score,
    mean_absolute_percentage_error)

y_true = np.array([200, 250, 300, 350, 400]) * 1000.0
y_pred = np.array([210, 240, 310, 340, 300]) * 1000.0

print(mean_absolute_error(y_true, y_pred))
print(mean_squared_error(y_true, y_pred, squared=False))
print(r2_score(y_true, y_pred))
print(mean_absolute_percentage_error(y_true, y_pred))
```

```
28000.0
45607.01700396552
0.584
0.08038095238095237
```

- **MAE** (mean absolute error) is the average size of the miss: (10,000 + 10,000 + 10,000 + 10,000 + 100,000) / 5 = 28,000. It is in dollars, so anyone can read it.
- **RMSE** (root mean squared error) squares each miss, averages, then takes the square root: 45,607. Squaring makes the single 100,000 miss dominate. With that one miss fixed to 10,000, MAE and RMSE both become exactly 10,000. So RMSE much larger than MAE is a signal that a few big errors are hiding in the average.
- **R-squared** is 1 minus (your squared error / the squared error of always predicting the mean): here 1 - 10.4 billion / 25 billion = 0.584. A model that only predicts the mean scores 0, and a worse model can go negative.
- **MAPE** (mean absolute percentage error) averages each miss as a share of the true value: 8.0% here. In current scikit-learn versions the result is a fraction (0.080), not a percentage.

Note that `squared=False` returns RMSE in the scikit-learn 1.1 used in this course. Newer releases also provide a dedicated root-mean-squared-error function, so check the docs for your version.

## The same metrics on a real-sized problem

We now use 3,000 illustrative homes (size, bedrooms, age, neighborhood) with a train/test split, and compare three models: a baseline that always predicts the mean price, a ridge regression, and a histogram gradient boosting regressor. Chapter 5 walks through a project like this end to end; here we only care about the metrics.

```python
# df: sqft, bedrooms, age_years, neighborhood, price
# pre: scale numbers, one-hot encode neighborhood
X_tr, X_te, y_tr, y_te = train_test_split(
    X, y, test_size=0.2, random_state=42)
models = {"mean baseline": DummyRegressor(),
          "ridge": Ridge(alpha=1.0),
          "gradient boosting": HistGradientBoostingRegressor(
              random_state=0)}
fitted = {k: Pipeline([("pre", pre), ("m", m)]).fit(X_tr, y_tr)
          for k, m in models.items()}
hgb_pipe = fitted["gradient boosting"]

for name, m in fitted.items():
    pred = m.predict(X_te)
    print(name, round(mean_absolute_error(y_te, pred)),
          round(mean_squared_error(y_te, pred, squared=False)),
          round(r2_score(y_te, pred), 3),
          round(mean_absolute_percentage_error(y_te, pred), 3))
```

| model | MAE | RMSE | R-squared | MAPE |
|---|---|---|---|---|
| mean baseline | $95,555 | $117,752 | 0.000 | 0.450 |
| ridge | $30,860 | $41,856 | 0.874 | 0.118 |
| gradient boosting | $29,133 | $40,563 | 0.881 | 0.103 |

Read the baseline first: it defines "no skill" (R-squared 0, error of about 45%). Both real models are far better. Gradient boosting wins on every metric, though only narrowly over ridge, which is a reminder to check the spread across folds before declaring a winner.

For boosting, the median absolute error is $20,168 but the mean is $29,133 and the worst miss is $214,889. About 18.5% of test homes are off by more than $50,000. That gap between typical and worst is why RMSE ($40,563) sits well above MAE.

## Scoring in cross-validation

Every scikit-learn scorer follows the rule "greater is better", so error metrics are negated and named with a `neg_` prefix. You flip the sign back when you report.

```python
from sklearn.model_selection import cross_validate

res = cross_validate(hgb_pipe, X_tr, y_tr, cv=5,
    scoring={"mae": "neg_mean_absolute_error",
             "rmse": "neg_root_mean_squared_error",
             "r2": "r2",
             "mape": "neg_mean_absolute_percentage_error"})
print(-res["test_mae"].mean())
```

The five-fold means: MAE $29,346 (standard deviation $729), RMSE $40,495 (standard deviation $1,051), R-squared 0.886, MAPE 10.5%. A cross-validated MAE of 29,346 next to a test MAE of 29,133 tells you the two agree.

## Dollars or percent?

A model can be steady in dollars but not in percent, or the reverse. Split the test homes into three equal price bands and compare:

```python
band = pd.qcut(y_te, 3, labels=["low", "mid", "high"])
pred = hgb_pipe.predict(X_te)
err = y_te - pred
by = pd.DataFrame({"band": band, "abs_err": err.abs(),
                   "pct_err": (err / y_te).abs()})
by.groupby("band").mean().round(3)
```

The MAE is $15,886 for cheap homes, $27,237 for mid-range and $44,276 for expensive ones, so dollar error nearly triples. Yet the percentage error is 10.1%, 10.1% and 10.6%: proportionally, the model is equally good everywhere. If stakeholders care about absolute dollars, report MAE. If a 10% miss is equally bad on any house, report MAPE. The figure below plots these two views of the same error.

## R-squared is relative to the data

R-squared compares your error with the spread of the target, so the same model can score very differently on different data. Scoring boosting only on the mid-price band (homes from $216,700 to $327,500) gives MAE $27,237 and MAPE 10.1%, nearly what we had before, but R-squared falls to -0.064, because that band has little spread to explain. Never compare R-squared across datasets or subsets. Prefer MAE or RMSE when you need to compare like with like.

## Choosing

- Use **MAE** for a plain, explainable typical miss, and when outliers should count proportionally.
- Use **RMSE** when large misses are disproportionately costly. Always report it beside MAE.
- Use **MAPE** when relative accuracy matters, but avoid it if true values can be zero or near zero.
- Use **R-squared** only as a quick sense of skill against the mean baseline.
- Always include the mean baseline and a plot of residuals or error by group.

## Recap

The four metrics answer different questions, so report at least MAE and RMSE plus one relative measure. Use the `neg_` scorer names in cross-validation and flip the sign back to report. A single score is only a start: slice the error by group. Next, lesson 10 covers cross-validation in depth.
