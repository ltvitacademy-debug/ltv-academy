# White Noise & Random Walks

Lesson 6 introduced the random walk as the canonical example of a unit-root, non-stationary process. This lesson defines it properly alongside its stationary building block, white noise, and shows the precise relationship between them: a random walk is the cumulative sum of white noise, and the first difference of a random walk is white noise. That relationship is the conceptual backbone of differencing, used constantly from Chapter 3 onward.

## What you'll learn

- The precise definition of white noise: zero mean, constant variance, zero autocorrelation at every nonzero lag
- The random walk as the cumulative sum of white noise, and why it's non-stationary
- Why the first difference of a random walk recovers white noise
- The Efficient Market Hypothesis connection: why near-random-walk behavior in prices is economically expected, not a modeling failure
- Simulating and testing both in Python

## White noise, precisely

A series `ε_t` is (weak) **white noise** if:

1. `E[ε_t] = 0` for all `t` (zero mean)
2. `Var(ε_t) = σ²` for all `t` (constant variance)
3. `Cov(ε_t, ε_s) = 0` for all `t ≠ s` (zero autocorrelation at every nonzero lag)

Note what white noise does *not* require: it does not require Normality, and it does not require independence (only zero *linear* correlation) — "i.i.d. Normal(0, σ²)" is a common and stronger special case (strict white noise), but "white noise" on its own is the weaker, more general definition above. White noise is trivially stationary: its mean, variance, and autocovariance structure (all zero beyond lag 0) satisfy the stationarity conditions from Lesson 6 by construction.

## The random walk

A random walk is defined by:

```
X_t = X_(t-1) + ε_t,   where ε_t is white noise
```

Unrolling this recursively from some starting point `X_0`:

```
X_t = X_0 + ε_1 + ε_2 + ... + ε_t
```

A random walk is literally the **cumulative sum (running total)** of white noise innovations. This is why `Var(X_t) = t*σ²` grows linearly with `t` — it's non-stationary by construction, and it's exactly the unit-root process (`φ=1`) from Lesson 6.

## Differencing undoes it

Take the first difference of a random walk:

```
X_t - X_(t-1) = ε_t
```

The first difference of a random walk **is** white noise — stationary by construction. This is the entire logic behind "differencing" a non-stationary series until it becomes stationary, which is literally what the "I" (Integrated) in ARIMA stands for in Chapter 3: a series that becomes stationary after differencing `d` times is said to be integrated of order `d`, written `I(d)`. A random walk is `I(1)`.

## Why financial prices look like (approximate) random walks

Under the (idealized) **Efficient Market Hypothesis**, current prices already reflect all available information, so the *only* thing that should move a price is genuinely new information — which, by definition, is unpredictable. That's exactly a white-noise innovation added to the previous price: a random walk. This is why Lesson 6 noted that raw price levels almost always fail to reject the ADF unit-root null — it's not a data problem, it's the economically expected behavior of a reasonably efficient market, and why we model returns (the differenced, approximately-white-noise-like series) instead of prices directly.

## Simulating and checking in Python

```python
import numpy as np
from statsmodels.tsa.stattools import adfuller, acf

np.random.seed(0)
n = 2000
white_noise = np.random.normal(0, 1, n)
random_walk = np.cumsum(white_noise)

# Unit root in levels, none after differencing
print("Random walk ADF p-value:", adfuller(random_walk)[1])          # expect high (fail to reject)
print("Differenced ADF p-value:", adfuller(np.diff(random_walk))[1]) # expect low (reject -> stationary)

# ACF of the differenced series should look flat (true white noise)
print(acf(np.diff(random_walk), nlags=10))
```

## Key terms

| Term | Meaning |
|---|---|
| White noise | Zero mean, constant variance, zero autocorrelation at all nonzero lags |
| Random walk | `X_t = X_(t-1) + ε_t`; the cumulative sum of white noise innovations |
| Integrated of order d, `I(d)` | A series that becomes stationary after differencing d times |
| Efficient Market Hypothesis (EMH) | The idea that prices reflect all available information, so price changes should be unpredictable |

## Recap

White noise is the simplest stationary process (zero mean, constant variance, zero autocorrelation); a random walk is its cumulative sum and is non-stationary by construction, but differencing a random walk once recovers white noise exactly. That's the logic behind the "I" in ARIMA, and it's why near-random-walk behavior in financial prices is an economically expected signature of market efficiency rather than a modeling failure. Next, Lesson 9 turns to a genuinely powerful idea built on top of non-stationary series: cointegration, and how two random walks can combine into something stationary after all — the foundation of pairs trading.
