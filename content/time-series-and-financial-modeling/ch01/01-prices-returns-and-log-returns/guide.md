# Prices, Returns & Log Returns

Welcome to Time Series & Financial Modeling, step five of the Quantitative Developer / Researcher path. Every model in this course — from a volatility forecast to a pairs-trading signal — is built on top of one basic transformation: turning a sequence of prices into a sequence of returns. Get this step wrong and everything downstream inherits the mistake. This lesson covers simple returns and log returns, why quants almost always prefer the latter, and how to compute both correctly in pandas.

## What you'll learn

- Why raw prices are the wrong thing to model directly
- Simple (arithmetic) returns and their one genuinely useful property: portfolio additivity
- Log returns and their one genuinely useful property: time additivity
- How to compute both in pandas, and when each one is the right tool
- Common sign and compounding mistakes beginners make with returns

## Why not just model prices?

A price series like daily closing prices for a stock is **non-stationary** — its mean and variance drift over time, and it's dominated by a trend (you'll formalize "stationary" in Lesson 6). Statistical models — ARMA, GARCH, cointegration tests, almost everything in this course — assume or require some form of stationarity to produce meaningful results. Returns, which measure the *change* from one period to the next, are far closer to stationary and are the quantity we actually care about anyway: nobody invests to own a price, they invest to earn a return.

## Simple returns

The simple (arithmetic) return over one period is:

```
R_t = (P_t - P_{t-1}) / P_{t-1} = P_t / P_{t-1} - 1
```

where `P_t` is the price at time `t`. If a stock goes from $100 to $103, `R_t = 103/100 - 1 = 0.03`, a 3% return.

Simple returns have one essential property: they are **cross-sectionally additive**. A portfolio's return is the weighted average of its holdings' simple returns:

```
R_portfolio = w_1*R_1 + w_2*R_2 + ... + w_n*R_n
```

This makes simple returns the right choice whenever you're aggregating *across assets* at a single point in time — computing portfolio returns, attribution, or index returns.

## Log returns

The log (continuously compounded) return is:

```
r_t = ln(P_t / P_{t-1}) = ln(P_t) - ln(P_{t-1})
```

For the same $100 → $103 move, `r_t = ln(1.03) ≈ 0.02956`, close to but not exactly 3% — the gap widens as moves get larger. Log returns have the property quants exploit constantly: they are **time-additive**. The log return over several periods is just the sum of the one-period log returns:

```
r_(t-k, t) = ln(P_t / P_{t-k}) = r_t + r_{t-1} + ... + r_{t-k+1}
```

That single fact is why almost every time series model in this course — ARMA, GARCH, random walk theory — is written in terms of log returns rather than simple returns. Multi-period compounding becomes simple addition instead of multiplication, log returns are (to a first approximation, for small moves) symmetric around zero, and they're a closer match to the diffusion processes used in continuous-time finance.

## Computing both in pandas

```python
import numpy as np
import pandas as pd

prices = pd.read_csv("prices.csv", index_col="date", parse_dates=True)["close"]

simple_returns = prices.pct_change()
log_returns = np.log(prices).diff()
# equivalently: log_returns = np.log(prices / prices.shift(1))
```

`pct_change()` computes simple returns directly; log returns come from differencing the log-transformed price series. Both produce their first value as `NaN` (there's no prior price to compare the first observation to), so drop or mask it before feeding the series into a model.

## A common mistake: compounding the wrong way

To go from a return series back to cumulative growth, simple returns compound **multiplicatively**: cumulative growth is `(1+R_1)*(1+R_2)*...*(1+R_n)`, not `1 + R_1 + R_2 + ... + R_n` — summing simple returns overstates true compounding for anything beyond a couple of periods. Log returns compound **additively**: cumulative log return is just `sum(r_1...r_n)`, and you exponentiate the sum to recover simple cumulative growth: `cumulative_growth = exp(sum(r_1...r_n))`.

```python
cum_growth_from_simple = (1 + simple_returns).cumprod()
cum_growth_from_log = np.exp(log_returns.cumsum())
# the two should match (up to floating-point noise) over the same window
```

## Key terms

| Term | Meaning |
|---|---|
| Simple return `R_t` | `P_t/P_{t-1} - 1`; cross-sectionally (portfolio) additive |
| Log return `r_t` | `ln(P_t/P_{t-1})`; time additive across periods |
| Stationarity | A property returns approximate much better than raw prices (formalized in Lesson 6) |
| `pct_change()` | pandas method computing simple period-over-period returns |
| Cumulative return | Multiplicative compounding of simple returns, or `exp()` of summed log returns |

## Recap

Prices are non-stationary and hard to model directly, so quant work starts by converting them to returns. Simple returns add across assets in a portfolio at one point in time; log returns add across time for a single asset, which is why they dominate the time series models ahead. Next, Lesson 2 looks at a complication hiding in every raw price series: splits and dividends, and why the "close" price straight from an exchange is usually the wrong number to compute returns from at all.
