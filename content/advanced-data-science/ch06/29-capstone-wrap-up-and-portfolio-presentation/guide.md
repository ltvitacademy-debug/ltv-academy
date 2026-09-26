# Capstone: Wrap-Up & Portfolio Presentation

You have a chosen model, a backtest that beat the baseline, and an explanation of what drives demand. Three jobs remain: open the sealed test set exactly once, turn the forecast into a decision a manager can use, and package the project so an employer can see how you think. This is also the last lesson of the course, so we finish with what you can now do and where to go next.

## What you'll learn

- How to evaluate once on the sealed weeks, with a prediction interval, and report the result honestly
- How to translate a forecast into an order quantity and a what-if scenario
- How to state limitations without undermining the work
- How to package the project as a portfolio piece and a short presentation

## Set up (from lessons 27 and 28)

This condenses the earlier setup so the lesson stands on its own. It needs `adv_capstone_data.py` from lesson 27. Outputs were produced with statsmodels 0.14.6 and scikit-learn 1.6.1.

```python
import numpy as np
import pandas as pd
import statsmodels.api as sm
from sklearn.ensemble import GradientBoostingRegressor
from adv_capstone_data import make_demand

df = make_demand()
dev, final = df.iloc[:-13], df.iloc[-13:]

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

## One honest evaluation on the sealed weeks

The model choice was made on the development set: regression on log demand. Now we refit it on all 143 development weeks and forecast the 13 sealed weeks, with a 95% prediction interval. For context we also score the naive baseline and the detrended boosting model. We do not change anything afterward.

```python
X_dev, X_fin = design(dev, 0), design(final, len(dev))
y_dev = np.log(dev["units"])
ols = sm.OLS(y_dev, sm.add_constant(X_dev)).fit()
pred = ols.get_prediction(sm.add_constant(X_fin, has_constant="add"))
sf = pred.summary_frame(alpha=0.05)          # log scale
fc = np.exp(sf["mean"])
low, high = np.exp(sf["obs_ci_lower"]), np.exp(sf["obs_ci_upper"])
actual = final["units"]

naive = np.repeat(dev["units"].iloc[-1], 13)
trend = sm.OLS(y_dev, sm.add_constant(X_dev[["t"]])).fit()
cols = ["sin", "cos", "promo", "holiday"]
gbr = GradientBoostingRegressor(random_state=0).fit(
    X_dev[cols], y_dev - trend.predict(sm.add_constant(X_dev[["t"]])))
t_hat = trend.predict(sm.add_constant(X_fin[["t"]], has_constant="add"))
gbr_fc = np.exp(t_hat + gbr.predict(X_fin[cols]))

print("sealed test MAE")
print("  naive ", round(mae(actual.values, naive), 1))
print("  ols   ", round(mae(actual.values, fc.values), 1))
print("  gbr   ", round(mae(actual.values, gbr_fc.values), 1))
print("total units  actual:", int(actual.sum()), " forecast:", int(fc.sum()),
      " error:", f"{fc.sum() / actual.sum() - 1:+.1%}")
inside = ((actual >= low) & (actual <= high)).mean()
print("95% interval covers", f"{inside:.0%}", "of the 13 weeks")
```

```
sealed test MAE
  naive  181.5
  ols    25.1
  gbr    55.4
total units  actual: 9367  forecast: 9542  error: +1.9%
95% interval covers 92% of the 13 weeks
```

How to read this honestly:

- **The result is consistent with the backtest.** The regression scored 30.5 on average in the backtest (individual windows ranged from 21.9 to 46.8), and 25.1 on the sealed weeks. Boosting was 43.1 in the backtest and 55.4 here. The ranking held.
- **Do not oversell the baseline gap.** Naive scored 181.5 here, almost double its backtest average of 95.7, because the last development week was a promotion week (902 units) and naive repeated that high value for a whole quarter. The stable comparison is the backtest average, where our model was 68% better. On this one window, the gap looks larger than it really is.
- **The total is what the order depends on.** The forecast total is 9,542 units against 9,367 actual, a 1.9% overestimate, which for ordering means slightly too much stock.
- **The interval covers 12 of 13 weeks (92%).** That is in line with the 95% target, though 13 points is far too few to certify calibration.

Visualize the sealed weeks:

```python
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
fig, ax = plt.subplots(figsize=(8.5, 4.2))
ax.fill_between(final.index, low, high, color="#F1DFB4", label="95% interval")
ax.plot(final.index, fc, color="#8E1C1C", lw=2, label="OLS forecast")
ax.plot(final.index, actual, "o", color="#1E1A16", label="actual")
ax.set_ylabel("units per week")
ax.set_title("Sealed test weeks (illustrative data)")
ax.legend()
fig.autofmt_xdate()
fig.tight_layout()
fig.savefig("capstone-sealed-test.png", dpi=150)
```

## From forecast to decision

The manager cares about two questions. First, how much to order: about 9,500 units for the quarter, with the weekly interval (about 155 units wide on average) telling them how much buffer stock protects against a bad week. Second, what a promotion is worth. Because promotion is a model input, we can run a what-if by switching one on:

```python
alt = final.copy()
alt.iloc[7, alt.columns.get_loc("promo")] = 1
X_alt = design(alt, len(dev))
fc_alt = np.exp(ols.predict(sm.add_constant(X_alt, has_constant="add")))
print("week 8 forecast:", round(fc.iloc[7]), "->", round(fc_alt.iloc[7]))
```

```
week 8 forecast: 782 -> 1025
```

Adding a promotion in week 8 (none was planned) raises the forecast from 782 to 1,025 units. Present that as an estimate from the model, not a guarantee: it assumes the promotion effect stays about 30% and is not affected by which products or weeks you choose to promote. In real data, promotions are rarely assigned at random, so the historical lift may be biased. Test it with a controlled experiment.

## State the limitations

A strong portfolio project says what it cannot claim:

- **The data is synthetic.** The results show the method, not a business outcome. The regression works well here partly because the data was built with a multiplicative structure.
- **The forecast depends on the promotion plan.** A calendar-only model was no better than naive, so an unplanned promotion or a wrong plan breaks the forecast.
- **Associations, not proven causes.** The lift estimate is descriptive unless promotions were assigned experimentally.
- **One product, one series, three years.** No new products, price changes, stock-outs or competitor moves.
- **A short test.** 13 points give a noisy accuracy estimate.

## Package it as a portfolio project

```text
README.md
  1. Problem: decision, horizon, metric
  2. Data: source, size, caveats (synthetic)
  3. Approach: sealed test, backtest, baselines
  4. Models: regression on log demand, detrend + boosting
  5. Results: backtest table, one sealed-test score
  6. Drivers: coefficients with intervals, SHAP
  7. Recommendation: order quantity, promo what-if
  8. Limitations and next steps
adv_capstone_data.py
notebooks/  01_explore.ipynb  02_model.ipynb
requirements.txt (pin versions)
```

Present it in five to seven slides: the decision the audience must make, the data and the baseline, how you compared models fairly, the result and the interval, the drivers in plain language, the recommendation, and the limitations. Lead with the decision, not the algorithm.

## Course complete

You can now build gradient-boosted models and tune them, forecast time series with baselines, statistical and machine-learning methods and evaluate them with backtests, work with text and recommenders, explain and communicate model decisions with SHAP, examine fairness across groups, and deliver a forecast project end to end. The next course in the path is **Artificial Intelligence (AI) & Generative AI Fundamentals for Data Scientists**, which builds on this foundation with modern AI and generative models.
