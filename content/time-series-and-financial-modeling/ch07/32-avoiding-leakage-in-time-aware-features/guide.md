# Avoiding Leakage in Time-Aware Features

Lesson 31's global z-score example ended on a warning: normalizing with full-sample statistics lets information from the future quietly influence a feature's value at an earlier point in time. This closing lesson of Chapter 7 generalizes that warning into the single idea that undermines more quant feature-engineering pipelines than any other: **leakage** — using information that would not actually have been available at the time of prediction.

## What you'll learn

- A precise definition of leakage, specific to time series and financial features
- The off-by-one rolling-window bug: a feature that accidentally includes today's own value
- Point-in-time correctness for fundamentals, connecting directly back to Lesson 30
- Why normalizing with full-dataset statistics is a leakage bug, not just a modeling choice
- Why shuffling time series data before a train/test split is a leakage bug, not a neutral convenience
- How to catch an inflated, unrealistic in-sample result before it reaches production

## What leakage means here

Leakage is any situation where a feature's value, as computed, depends on information that would not actually have been known at the time a prediction using that feature was supposedly made. It's easy to introduce by accident, because the bug usually doesn't look wrong — the code runs, the numbers look plausible, and the model's backtest looks *better* than it should, which is exactly what makes leakage dangerous: it fails silently, in the direction that makes a result look like a success.

Four concrete forms show up constantly in financial feature work:

**(a) Off-by-one rolling windows.** A rolling-window function applied carelessly can include the current (or even a future) row inside its own "trailing" window — turning a feature meant to summarize *the past* into one that partly measures *the present*, which is circular when the present is also the prediction target.

**(b) Point-in-time correctness for fundamentals.** Lesson 30 covered this directly: restated financials and reporting lags mean a fundamental value is only truly knowable on its report date, not its period-end date. Joining on the wrong date is a leakage bug with the same signature as (a) — the feature silently knows something early.

**(c) Scaling or normalizing using full-dataset statistics.** Lesson 31's global z-score problem generalizes beyond z-scores: any normalization step — min-max scaling, a global mean subtraction, even choosing a threshold based on the full sample's distribution — that's fit using the entire dataset (including rows that are chronologically in the future relative to some training point) leaks the future's distribution into the past.

**(d) Shuffling before a train/test split.** Standard cross-validation randomly shuffles rows before splitting. For time series, this is a leakage bug: it lets rows from the future end up in the training set used to predict rows from the past, and — more subtly — because many time-series features are built from overlapping rolling windows, a "test" row sitting right next to a "training" row in time shares much of the same raw input data, so even a correctly-built feature can leak a little information across train and test unless the split respects chronological order.

## Worked example: the off-by-one rolling-window bug

```python
import numpy as np
import pandas as pd

np.random.seed(5)
n = 1000
log_rets = np.random.normal(0.0002, 0.012, n)
dates = pd.bdate_range("2021-01-04", periods=n)
ret = pd.Series(log_rets, index=dates, name="ret")

df = pd.DataFrame({"ret": ret})
df["ma5"] = ret.rolling(5).mean()   # a 5-day window ending ON day t -- includes ret[t] itself!

target = df["ret"]

# LEAKY: this "feature" is used to predict today's own return, but it already contains
# today's own return as one of the five values averaged into it
leaky = pd.concat([df["ma5"], target], axis=1).dropna()
leaky.columns = ["feature", "target"]
leaky_corr = leaky["feature"].corr(leaky["target"])

# CORRECT: shift the rolling feature back by one day, so today's feature value only
# uses information available through yesterday's close
correct_feature = df["ma5"].shift(1)
correct = pd.concat([correct_feature, target], axis=1).dropna()
correct.columns = ["feature", "target"]
correct_corr = correct["feature"].corr(correct["target"])

print(f"Leaky feature vs today's return:   corr = {leaky_corr:.4f}, R^2 = {leaky_corr**2:.4f}")
print(f"Correct feature vs today's return:  corr = {correct_corr:.4f}, R^2 = {correct_corr**2:.4f}")
```

Output:

```
Leaky feature vs today's return:   corr = 0.4509, R^2 = 0.2033
Correct feature vs today's return:  corr = 0.0119, R^2 = 0.0001
```

The leaky version shows an R² of **0.20** — a correlation that looks like a genuinely useful signal. The honest version, which only differs by one `.shift(1)`, shows an R² of **0.0001** — correctly revealing that this synthetic return series has no real autocorrelation to exploit at all. The entire 0.20 was an artifact of the feature quietly containing a fifth of the very thing it was being correlated against (today's own return is one of the five values inside its own 5-day average). This is the single most common leakage bug in practice, and it is caught by one question asked of every rolling feature: *does this window end strictly before the row it's attached to?*

## Worked example: chronological vs. shuffled train/test splits

```python
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score

df["mom10"] = ret.rolling(10).mean().shift(1)
df["vol10"] = ret.rolling(10).std().shift(1)
honest = pd.concat([df["ma5"].shift(1).rename("f_ma5"), df[["mom10", "vol10"]], target], axis=1).dropna()

X = honest[["f_ma5", "mom10", "vol10"]].values
y = honest["ret"].values
split = int(len(X) * 0.8)

# chronological split: test rows come strictly after training rows
Xtr, Xte, ytr, yte = X[:split], X[split:], y[:split], y[split:]
model = LinearRegression().fit(Xtr, ytr)
r2_chrono = r2_score(yte, model.predict(Xte))

# shuffled split: random rows go to train/test
rng = np.random.default_rng(0)
idx = rng.permutation(len(X))
Xtr_s, Xte_s, ytr_s, yte_s = X[idx[:split]], X[idx[split:]], y[idx[:split]], y[idx[split:]]
model_s = LinearRegression().fit(Xtr_s, ytr_s)
r2_shuffled = r2_score(yte_s, model_s.predict(Xte_s))

print(f"Chronological split out-of-sample R^2: {r2_chrono:.4f}")
print(f"Shuffled split out-of-sample R^2:       {r2_shuffled:.4f}")
```

Output:

```
Chronological split out-of-sample R^2: -0.0364
Shuffled split out-of-sample R^2:       -0.0062
```

Both numbers are near zero, which is itself the honest result — these three features, correctly `.shift(1)`'d, have essentially no real predictive power on this synthetic series, exactly as expected since it was generated as i.i.d. noise. But notice the direction of the gap: the shuffled split's out-of-sample R² is higher (less negative) than the chronological split's, even though both splits used the exact same honest, non-leaky features. That's the overlapping-window effect from point (d) — shuffling scatters some test rows next to training rows that share most of the same raw returns inside their rolling windows, nudging the shuffled result to look a little better than it has any right to. On a real dataset with actual structure to exploit, that nudge can be the difference between a strategy that looks viable in a notebook and one that loses money the moment it sees genuinely new data.

## Catching leakage before it reaches production

A short checklist, built directly from (a)-(d) above: every rolling-window feature should be checked for whether it ends strictly before the prediction target; every low-frequency data source should be joined on the date it was actually released, as in Lesson 30; every scaling or normalization step should fit its statistics only on the training portion of the data, never the full dataset; and every train/test split on time series data should be chronological, never shuffled. An unusually high in-sample correlation or R² is worth being suspicious of, not celebrating — the leaky example above produced a far "better" number than the honest one, and the honest number was the true state of the world.

## Key terms

| Term | Meaning |
|---|---|
| Leakage | Using information in a feature that would not actually have been available at prediction time |
| Off-by-one rolling window | A rolling window that includes the current (or a future) row instead of ending strictly in the past |
| Point-in-time correctness | A data value only becomes usable on the date it was actually knowable (Lesson 30) |
| Global scaling leakage | Fitting normalization statistics on the full dataset, including future-relative-to-training rows |
| Chronological split | Splitting train/test so every test row comes after every training row in time |

## Recap

Leakage takes four recurring forms in financial feature work — off-by-one rolling windows, non-point-in-time fundamentals, full-dataset normalization, and shuffled train/test splits — and all four share the same signature: an unrealistically good in-sample or in-sample-adjacent result that collapses the moment the feature is built honestly, as the 0.20-to-0.0001 R² gap in this lesson's first example showed directly. That closes Chapter 7 and the feature-engineering toolkit for this course. Chapter 8 is the capstone: Lesson 33 kicks it off by building a small returns-and-risk model for a universe of assets, using nothing but the tools from Chapters 1 through 7 — log returns, ARMA, GARCH, factor models, and the feature discipline from this chapter.
