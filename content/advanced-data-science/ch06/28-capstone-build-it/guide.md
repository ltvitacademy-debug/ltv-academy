# Capstone: Build It

In the kickoff we framed the problem, sealed the last 13 weeks, and found that the best baseline (naive) scores an average backtest MAE of 95.7 units per week. Now we build the forecasting models, compare them fairly with the rolling-origin backtest, and explain what drives demand. The sealed test set stays sealed until lesson 29.

## What you'll learn

- How to build a regression forecast with `statsmodels` that models the log of demand
- How to build a machine-learning forecast that models what is left after removing the trend
- How to compare both against the baseline in a rolling-origin backtest
- How to explain drivers with regression coefficients and SHAP, and why they agree

## Setup

You need `adv_capstone_data.py` from lesson 27. The outputs below were produced with statsmodels 0.14.6, scikit-learn 1.6.1 and shap 0.49.1; other versions may differ slightly.

```python
import numpy as np
import pandas as pd
import statsmodels.api as sm
from sklearn.ensemble import GradientBoostingRegressor
from adv_capstone_data import make_demand

df = make_demand()
dev, final = df.iloc[:-13], df.iloc[-13:]     # final stays sealed
H = 13

def mae(a, f):
    return float(np.mean(np.abs(a - f)))

def design(d, start):
    X = pd.DataFrame(index=d.index)
    X["t"] = np.arange(start, start + len(d))
    ang = 2 * np.pi * d["week"].values / 52
    X["sin"], X["cos"] = np.sin(ang), np.cos(ang)
    X["promo"], X["holiday"] = d["promo"].values, d["holiday"].values
    return X
```

The features are all known at forecast time: a time index `t` for the trend, a sine and cosine of the week of the year for the yearly wave, and the planned promotion and holiday flags. There are no lag features, because for weeks 2 to 13 of the horizon last week's sales are not known yet.

## Model A: regression on log demand

Promotions raise demand by a percentage, not a fixed number of units, so we model the logarithm of units. A coefficient on a flag then reads as a percent change (`exp(coef) - 1`). This is classic statistical modeling, with confidence intervals for free.

## Model B: detrend, then boost

From lesson 11 we know trees cannot extrapolate a trend. So we fit a straight-line trend to log demand, and let gradient boosting learn only what is left (season, promotions, holidays). The forecast adds the trend back.

```python
def fit_predict(tr, te, origin, kind):
    Xtr, Xte = design(tr, 0), design(te, origin)
    y = np.log(tr["units"])
    if kind == "ols":
        cols = list(Xtr.columns)
    elif kind == "calendar":
        cols = ["t", "sin", "cos"]
    if kind in ("ols", "calendar"):
        m = sm.OLS(y, sm.add_constant(Xtr[cols], has_constant="add")).fit()
        p = m.predict(sm.add_constant(Xte[cols], has_constant="add"))
        return np.exp(p).values
    # "gbr": remove the trend, let boosting learn what is left
    trend = sm.OLS(y, sm.add_constant(Xtr[["t"]])).fit()
    resid = y - trend.predict(sm.add_constant(Xtr[["t"]]))
    cols = ["sin", "cos", "promo", "holiday"]
    gbr = GradientBoostingRegressor(random_state=0).fit(Xtr[cols], resid)
    t_hat = trend.predict(sm.add_constant(Xte[["t"]], has_constant="add"))
    return np.exp(t_hat + gbr.predict(Xte[cols])).values
```

`has_constant="add"` matters: a 13-week window with no holiday has an all-zero holiday column, and without it statsmodels may decide a constant column already exists and skip the intercept. We also include a `calendar` variant with only trend and season, to test how much the promotion and holiday flags contribute.

## The backtest

```python
rows, keep = [], {}
last = len(dev) - H + 1
for origin in range(91, last, H):
    tr, te = dev.iloc[:origin], dev.iloc[origin:origin + H]
    actual = te["units"].values
    fc = {"naive": np.repeat(tr["units"].iloc[-1], H),
          "calendar": fit_predict(tr, te, origin, "calendar"),
          "ols": fit_predict(tr, te, origin, "ols"),
          "gbr": fit_predict(tr, te, origin, "gbr")}
    rows.append({"origin": te.index[0].date(),
                 **{k: mae(actual, v) for k, v in fc.items()}})
    keep = {"te": te, **fc}
bt = pd.DataFrame(rows)
print(bt.round(1))
print(bt.drop(columns="origin").mean().round(1))
```

```
       origin  naive  calendar   ols   gbr
0  2023-10-02   89.2      86.0  23.4  21.4
1  2024-01-01   81.3     101.8  29.9  41.9
2  2024-04-01  112.2      74.7  46.8  50.7
3  2024-07-01   99.9     112.2  21.9  58.6
naive       95.7
calendar    93.7
ols         30.5
gbr         43.1
```

Against the naive baseline (95.7), regression on log demand is 68% better (MAE 30.5) and detrend plus boosting is 55% better (43.1). Both clear our 20% goal. Boosting wins the first window but loses the others: with only 91 to 130 training weeks, and a smooth, mostly log-linear signal, the simpler model generalizes better. It is a fair result, not a defect, but it comes from synthetic data built with a multiplicative structure that suits regression. Real demand is rarely this kind.

The most important row is `calendar`. With only trend and season it scores 93.7, essentially the same as naive. The whole improvement comes from knowing the promotion and holiday plan. That is a useful business insight, and also a caveat: the forecast is only as good as the promo plan you feed it.

Here is the last backtest window, for a picture of the fit:

```python
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
te = keep["te"]
fig, ax = plt.subplots(figsize=(8.5, 4.2))
ax.plot(te.index, te["units"], "o-", color="#1E1A16", label="actual")
ax.plot(te.index, keep["ols"], color="#8E1C1C", lw=2, label="OLS on log units")
ax.plot(te.index, keep["gbr"], color="#C4952E", lw=2, label="detrend + GBR")
ax.plot(te.index, keep["naive"], "--", color="#6B6259", label="naive")
ax.set_ylabel("units per week")
ax.set_title("Last backtest window (illustrative data)")
ax.legend()
fig.autofmt_xdate()
fig.tight_layout()
fig.savefig("capstone-backtest.png", dpi=150)
```

## Explain the drivers

Refit on all 143 development weeks and read the regression. Because the data is synthetic we know the truth: the promotion effect was built in at +30% and the holiday window at +25%.

```python
X = design(dev, 0)
ols = sm.OLS(np.log(dev["units"]), sm.add_constant(X)).fit()
ci = ols.conf_int()
for k in ["promo", "holiday"]:
    print(k, "lift:", f"{np.exp(ols.params[k]) - 1:.1%}",
          f"({np.exp(ci.loc[k, 0]) - 1:.1%} to {np.exp(ci.loc[k, 1]) - 1:.1%})")
```

```
promo lift: 31.1% (28.4% to 33.9%)
holiday lift: 22.6% (18.2% to 27.2%)
```

The estimated promotion lift is 31.1% with a 95% interval of 28.4% to 33.9%, which contains the true 30%. The holiday estimate is 22.6% (18.2% to 27.2%), near the true 25%; holiday weeks overlap the seasonal wave, so it is harder to separate. On real data you would not have a ground truth, so the interval, not the point estimate, is what you report.

Now the same question from the machine-learning model, with SHAP (lesson 24):

```python
import shap
Xg = X[["sin", "cos", "promo", "holiday"]]
trend = sm.OLS(np.log(dev["units"]), sm.add_constant(X[["t"]])).fit()
resid = np.log(dev["units"]) - trend.predict(sm.add_constant(X[["t"]]))
gbr = GradientBoostingRegressor(random_state=0).fit(Xg, resid)
sv = shap.TreeExplainer(gbr).shap_values(Xg)
print(pd.Series(np.abs(sv).mean(axis=0), index=Xg.columns).round(3))
p = Xg["promo"].values == 1
gap = sv[p, 2].mean() - sv[~p, 2].mean()
print("implied promo lift:", f"{np.exp(gap) - 1:.1%}")
```

```
sin        0.038
cos        0.067
promo      0.086
holiday    0.015
implied promo lift: 30.5%
```

Promotion has the largest average contribution, followed by the seasonal wave (the sine and cosine together). The average SHAP contribution of a promo week versus a normal week, converted from log units, implies a lift of about 30.5%, agreeing with the regression. Two different methods telling the same story is what makes the explanation credible. SHAP values here are in log units of demand, which is why we exponentiate.

## Recap

We built a regression on log demand and a detrended boosting model, and compared them with a rolling-origin backtest: regression 30.5, boosting 43.1, naive 95.7 units per week of MAE. Removing the promo and holiday inputs erased the gain, so the promotion plan is the main driver of forecast accuracy. Coefficients and SHAP agree that a promotion lifts demand by about 30%. Next: the wrap-up, where we open the sealed test set once, present the results, and package the project.
