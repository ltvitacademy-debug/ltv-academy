# Technical Indicators & Their Pitfalls

Chapter 6 closed with copulas and dependence structure — tools for modeling how assets move together. Chapter 7 shifts focus from models to **inputs**: the features that get fed into any of the models built across this course. This lesson starts with the most familiar category, technical indicators, and makes the case for treating them with more suspicion than most beginners do.

## What you'll learn

- What SMA, EMA, RSI, MACD, and Bollinger Bands actually measure mathematically
- Why almost every technical indicator is a transformation or smooth of price, not independent information
- Why that makes indicator sets highly collinear with each other and with simple lagged returns
- The curve-fitting trap: tuning an indicator's parameters to history until it looks good
- Why in-sample "predictiveness" of a price-derived indicator is partly mechanical, not informative
- How to check a feature set for collinearity in pandas before trusting it

## The indicators, mathematically

Every indicator below is built from nothing but the price series itself — no new information enters any of these formulas beyond what's already in `close`.

**Simple Moving Average (SMA)** and **Exponential Moving Average (EMA)** are both smooths of price. SMA(20) is the unweighted mean of the last 20 closes; EMA(20) is a weighted mean that puts more weight on recent closes, with the weight decaying exponentially the further back you go. Both are low-pass filters — they remove high-frequency noise and leave a slower-moving version of the same price series.

**RSI (Relative Strength Index)**, typically RSI(14), measures the ratio of average gains to average losses over the lookback window, rescaled to 0-100:

```
RS = average_gain / average_loss
RSI = 100 - 100 / (1 + RS)
```

RSI is really just a bounded transform of recent price momentum — it rises when recent closes have been going up more than down, and falls when the opposite is true.

**MACD** is the difference between a fast EMA and a slow EMA (conventionally EMA(12) - EMA(26)), plus a "signal line" that is itself an EMA of that difference. It's a smooth of a difference of two smooths — still nothing but price, several transformations deep.

**Bollinger Bands** wrap a rolling mean (usually SMA(20)) with bands at plus/minus two rolling standard deviations. The "%B" value — where price sits between the bands, rescaled to 0-1 — is a rolling z-score of price against its own recent mean and volatility.

## The real pitfalls

None of these indicators bring in a new, independent source of information. They are all *deterministic functions of the same price history* — which creates three concrete problems.

**1. Curve-fitting indicator parameters.** RSI(14), MACD(12,26,9), Bollinger(20,2) — these specific numbers are conventions, not laws of nature. It's easy to try RSI(9), RSI(21), RSI(30)... until one of them happens to look predictive over a particular historical window, then convince yourself that window-length was the "right" one. That's curve-fitting: tuning a parameter to history rather than discovering a real relationship, and it will not hold up on data the parameter wasn't tuned on.

**2. Indicators look predictive in-sample because they're mechanically derived from price, not because they add information.** An indicator built from the last 20 closes necessarily correlates with what those same closes did — that correlation is baked into the arithmetic, not evidence of forecasting skill. A model trained and evaluated on the same historical window can look great while adding nothing a simple lagged return wouldn't have already captured.

**3. Multicollinearity across a feature set built entirely from price.** If every feature is some smooth or transform of the same underlying series, the features end up highly correlated with each other. Feeding a regression model five near-duplicate measurements of "recent price momentum" doesn't give it five independent signals — it gives it one signal, repeated with noise, which inflates coefficient variance and makes the fitted weights unstable and hard to interpret.

## Worked example: computing indicators and checking collinearity

```python
import numpy as np
import pandas as pd

np.random.seed(42)
n = 500
mu, sigma = 0.0003, 0.012
log_rets = np.random.normal(mu, sigma, n)
price = 100 * np.exp(np.cumsum(log_rets))
dates = pd.bdate_range("2023-01-02", periods=n)
prices = pd.Series(price, index=dates, name="close")

# SMA / EMA
sma20 = prices.rolling(20).mean()
ema20 = prices.ewm(span=20, adjust=False).mean()

# RSI(14)
delta = prices.diff()
gain = delta.clip(lower=0)
loss = -delta.clip(upper=0)
avg_gain = gain.rolling(14).mean()
avg_loss = loss.rolling(14).mean()
rs = avg_gain / avg_loss
rsi14 = 100 - (100 / (1 + rs))

# MACD(12,26,9)
ema12 = prices.ewm(span=12, adjust=False).mean()
ema26 = prices.ewm(span=26, adjust=False).mean()
macd_line = ema12 - ema26
signal_line = macd_line.ewm(span=9, adjust=False).mean()
macd_hist = macd_line - signal_line

# Bollinger Bands(20, 2)
mid = prices.rolling(20).mean()
std20 = prices.rolling(20).std()
upper, lower = mid + 2 * std20, mid - 2 * std20
bb_pctb = (prices - lower) / (upper - lower)

# lagged returns, for comparison
ret1 = prices.pct_change()
lag_ret1 = ret1.shift(1)
lag_ret5 = ret1.rolling(5).sum().shift(1)

feat = pd.DataFrame({
    "sma20": sma20, "ema20": ema20, "rsi14": rsi14, "macd_hist": macd_hist,
    "bb_pctb": bb_pctb, "lag_ret1": lag_ret1, "lag_ret5": lag_ret5,
}).dropna()

print(feat.corr().round(3))
```

On a synthetic 500-day price series, this produces:

```
           sma20  ema20  rsi14  macd_hist  bb_pctb  lag_ret1  lag_ret5
sma20      1.000  0.998  0.003     -0.155   -0.037    -0.023    -0.022
ema20      0.998  1.000  0.045     -0.106   -0.001    -0.014     0.005
rsi14      0.003  0.045  1.000      0.769    0.858     0.270     0.553
macd_hist -0.155 -0.106  0.769      1.000    0.792     0.287     0.745
bb_pctb   -0.037 -0.001  0.858      0.792    1.000     0.384     0.647
lag_ret1  -0.023 -0.014  0.270      0.287    0.384     1.000     0.414
lag_ret5  -0.022  0.005  0.553      0.745    0.647     0.414     1.000
```

The headline numbers: SMA(20) and EMA(20) correlate at **0.998** — they're both smooths of the same window and are, for practical purposes, the same feature. RSI(14), MACD's histogram, and Bollinger %B — three indicators that sound unrelated — correlate with each other at **0.77 to 0.86**, because all three are, underneath the branding, different rescalings of recent price momentum. And every one of them correlates meaningfully with plain `lag_ret5` (a 5-day lagged cumulative return, correlations 0.55-0.75), which took one line of pandas to compute and uses no "indicator" machinery at all. This is the practical lesson: before trusting a feature set built from technical indicators, check its correlation matrix — a feature set that's secretly five versions of the same momentum signal needs fewer, not more, features.

## Key terms

| Term | Meaning |
|---|---|
| SMA / EMA | Simple / exponential moving average; both are low-pass smooths of price |
| RSI | Relative Strength Index; a bounded transform of recent gain/loss momentum |
| MACD | Difference of two EMAs plus a signal line; a smooth of a difference of smooths |
| Bollinger %B | Price's rolling z-score relative to its own recent mean and standard deviation |
| Curve-fitting | Tuning an indicator's parameters to a historical window until it looks predictive there |
| Multicollinearity | High correlation among features, which here comes from all of them being derived from the same price series |

## Recap

Technical indicators are all transformations of the same price series, which makes them collinear with each other and with simple lagged returns, and makes their in-sample "predictiveness" partly mechanical rather than informative — a correlation-matrix check is the first line of defense. Next, Lesson 30 moves to a genuinely different category of feature: fundamental and alternative data, which updates on its own schedule and raises a new problem — getting the timing of that update right.
