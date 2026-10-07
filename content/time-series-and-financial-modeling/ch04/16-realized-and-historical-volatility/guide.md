# Realized & Historical Volatility

Chapter 3 modeled the *level* of a series — where it's headed next. Chapter 4 turns to modeling something arguably more important in finance: how much a series *moves*, its volatility. Before building the ARCH/GARCH family in the next two lessons, this lesson covers how volatility is actually measured from data in the first place.

## What you'll learn

- Why volatility, not just returns, is central to risk management and pricing
- Historical (rolling) volatility: the simple standard-deviation estimator
- Realized volatility: a higher-frequency, theoretically richer estimator
- How annualization works, and common pitfalls in volatility estimation

## Why volatility matters

Asset returns themselves are famously hard to predict. Their *volatility*, however, shows strong, predictable patterns — volatility clustering, where large moves tend to be followed by more large moves (a stylized fact from Lesson 3). This asymmetry — volatility is forecastable even when returns aren't — is why volatility modeling is its own discipline, underlying option pricing, position sizing, and risk metrics like Value at Risk (VaR).

## Historical (rolling) volatility

The simplest, most common estimator is the rolling standard deviation of returns over a trailing window:

sigma_hat_t = sqrt( (1/(n-1)) * sum_(i=0 to n-1) (r_(t-i) - r_bar)^2 )

```python
import numpy as np
import pandas as pd

returns = prices.pct_change().dropna()
hist_vol_20d = returns.rolling(window=20).std()

# annualize assuming ~252 trading days/year
annualized_vol = hist_vol_20d * np.sqrt(252)
```

This is easy to compute and widely used, but it has real weaknesses: it weights every observation in the window equally (an outlier from 19 days ago counts the same as yesterday), and it drops out of the window abruptly once the lookback period passes, which can cause artificial jumps.

## Realized volatility

**Realized volatility** improves on this by using higher-frequency (e.g., intraday 5-minute or hourly) returns within each day, rather than one day's close-to-close return. It's computed as the square root of the sum of squared high-frequency returns over the period:

RV_t = sqrt( sum_(j=1 to m) r_(t,j)^2 )

where `r_(t,j)` is the j-th intraday return within day t, and there are m such intervals. Using many intraday observations rather than a single daily return gives a more statistically efficient, less noisy estimate of that day's "true" volatility — this is the foundation of the realized volatility literature in financial econometrics (Andersen, Bollerslev, and others), and underlies modern risk systems that have access to high-frequency data.

```python
# intraday_returns: a Series of 5-minute log returns, indexed by timestamp
daily_rv = intraday_returns.pow(2).groupby(intraday_returns.index.date).sum().pow(0.5)
```

When intraday data isn't available, historical (rolling, daily-return-based) volatility remains the practical default — which is exactly the input the GARCH models in the next two lessons are built on.

## Annualization and common pitfalls

Volatility is usually quoted on an annualized basis for comparability. The standard convention scales by the square root of the number of periods per year (sqrt(252) for daily data, sqrt(12) for monthly), which follows from variance scaling linearly with time under an i.i.d.-returns assumption. Two common pitfalls:

- Using too short a rolling window makes the estimate noisy; too long a window makes it slow to react to real regime changes.
- The sqrt(time) annualization rule assumes returns are independent and identically distributed — a simplification that volatility clustering (which this whole chapter is about) actually violates.

## Key terms

| Term | Meaning |
|---|---|
| Volatility clustering | Large return moves tend to be followed by more large moves, and calm periods by more calm |
| Historical (rolling) volatility | Standard deviation of returns over a trailing window of daily observations |
| Realized volatility (RV) | Square root of the sum of squared high-frequency intraday returns over a period |
| Annualization | Scaling a per-period volatility estimate by sqrt(periods per year) for comparability |

## Recap

Historical volatility is the simple, equally-weighted rolling standard deviation; realized volatility sharpens the estimate using intraday data when available. Both measure volatility after the fact — next, Lesson 17 introduces ARCH and GARCH, which model volatility as something that evolves and can be forecast forward in time.
