# Stability of Signals Over Time

A feature can pass every test from the last two lessons — rank highly in permutation importance, show a clean directional pattern in a SHAP summary plot — and still be a bad signal to trade on, for one reason: it might only have worked during the specific stretch of history you happened to test it on. This lesson closes Chapter 5 by asking the question those earlier tools can't: is this signal's importance *stable* over time, or did we just get lucky with the window we chose?

## What you'll learn

- Why non-stationarity (from Chapter 1) means importance itself can decay or reverse
- Rolling/windowed feature-importance analysis as a stability diagnostic
- The Information Coefficient (IC) and IC decay as the standard quant tool for this
- Why an unstable signal is a red flag even when average backtest performance looks fine

## Why importance isn't a fixed property of a feature

Chapter 1 introduced non-stationarity: financial relationships change regime, and a feature that predicted returns well in one market environment can go flat or invert in another. Feature importance, whether from permutation importance, MDA, or SHAP, is normally computed once, over one block of data. That single number quietly assumes the relationship it's measuring held steady across the whole window. In finance, that assumption is often wrong — a value factor that worked for a decade can struggle for years afterward; a momentum signal strong in trending markets can lose or reverse its edge in choppy ones.

If you only ever check importance once, over the full history, you can't see this. A signal that was powerfully predictive for three of your five years of data and useless (or actively harmful) for the other two can still show up with a healthy-looking average importance score.

## Rolling feature-importance analysis

The fix is to stop measuring importance once and start measuring it repeatedly, in windows, across time.

```python
import pandas as pd
from sklearn.inspection import permutation_importance

window_size = 252  # ~1 trading year
step = 63          # ~1 quarter

rolling_importance = []
for start in range(0, len(X) - window_size, step):
    end = start + window_size
    X_win, y_win = X.iloc[start:end], y.iloc[start:end]

    result = permutation_importance(
        model, X_win, y_win, n_repeats=10, random_state=42
    )
    rolling_importance.append({
        "window_start": X_win.index[0],
        **dict(zip(X.columns, result.importances_mean)),
    })

rolling_df = pd.DataFrame(rolling_importance).set_index("window_start")
rolling_df.plot(title="Feature importance by rolling window")
```

Plotting each feature's importance across these rolling windows turns a single summary number into a time series. A stable signal looks like a reasonably consistent line, perhaps trending gently. An unstable one swings from top-ranked to near-zero (or negative) and back, window over window — exactly the kind of feature that a single full-sample importance check would hide.

## The Information Coefficient and IC decay

The standard quant-finance tool for this diagnosis is the **Information Coefficient (IC)**: the rank correlation (typically Spearman) between a signal's predicted values and the actual forward returns, computed period by period.

```python
from scipy.stats import spearmanr

ic_series = []
for start in range(0, len(X) - window_size, step):
    end = start + window_size
    preds = model.predict(X.iloc[start:end])
    actual = y.iloc[start:end]
    ic, _ = spearmanr(preds, actual)
    ic_series.append(ic)

ic_df = pd.Series(ic_series)
print("Mean IC:", ic_df.mean())
print("IC std:", ic_df.std())
print("IC information ratio:", ic_df.mean() / ic_df.std())
```

**IC decay** refers to watching this IC series over time (or over increasing forecast horizons) and checking whether it holds up, fades gradually, or collapses. A signal with a mean IC that looks attractive in aggregate but an IC series that decays toward zero — or flips sign — over the back half of the sample is telling you the same thing rolling importance tells you: whatever edge existed isn't holding.

## Why this matters even when the backtest looks good

A backtest's headline Sharpe ratio is an average. Averages hide exactly the kind of regime-dependent behavior this lesson is about. A strategy that earned most of its total return in one profitable year and treaded water or lost money the rest of the time can show the same average Sharpe as a strategy that performed consistently — but the first one is a much riskier bet going forward, because you don't know whether the profitable regime will recur. Checking importance and IC stability across rolling windows is how you tell these two cases apart before deploying capital, rather than discovering the difference live.

## Key terms

| Term | Meaning |
|---|---|
| Non-stationarity | A financial relationship changing or reversing across different market regimes |
| Rolling/windowed importance | Recomputing feature importance repeatedly over sliding time windows, instead of once |
| Information Coefficient (IC) | Rank correlation between predicted and actual forward returns, usually per period |
| IC decay | The pattern of a signal's IC fading, reversing, or holding steady across time |

## Recap

A feature can look important on average and still be unstable — powerfully predictive in one regime and useless or harmful in another, hidden by a single full-sample importance number. Rolling feature-importance analysis and the Information Coefficient, tracked across windows, are the standard diagnostics for catching this, and an unstable signal is a red flag worth heeding even when the aggregate backtest Sharpe looks attractive. That closes Chapter 5. Chapter 6 turns to Modern Topics, starting with Lesson 22: sequence models for market data.
