# Portfolio Construction Methods

A signal tells you which instruments look attractive. Portfolio construction is the separate step of turning that ranking into actual position weights — and the method you choose changes your risk profile even if the underlying signal never changes.

## What you'll learn

- Equal weighting and signal weighting, the two simplest construction methods
- Inverse-volatility weighting and the basic idea of risk parity
- The mean-variance (Markowitz) framework and why it's sensitive to estimation error
- Long-short construction and dollar/beta neutrality
- Why simpler construction methods often outperform "optimal" ones in practice

## Equal weight and signal weight

The simplest method ignores signal strength entirely and just splits capital evenly across whichever names are selected (e.g., the top and bottom decile by signal):

```python
selected = signal.rank(axis=1, pct=True)
long_mask = selected > 0.9
short_mask = selected < 0.1
weights_equal = (long_mask.astype(float) - short_mask.astype(float))
weights_equal = weights_equal.div(weights_equal.abs().sum(axis=1), axis=0)
```

**Signal weighting** instead scales each position by the strength of its own signal value, so the most convicted names get the most capital, not just a spot in the top decile:

```python
centered = signal.sub(signal.mean(axis=1), axis=0)  # demean cross-sectionally
weights_signal = centered.div(centered.abs().sum(axis=1), axis=0)
```

## Inverse-volatility weighting and risk parity

Rather than weighting by signal strength alone, **inverse-volatility weighting** sizes each position so it contributes roughly equal *risk*, not equal capital — a low-volatility asset gets a bigger dollar position than a high-volatility one to carry the same risk weight:

```python
vol = returns.rolling(60).std()
inv_vol = 1 / vol
weights_rp = inv_vol.div(inv_vol.sum(axis=1), axis=0)
```

This is the basic building block of **risk parity**: constructing a portfolio so no single position (or asset class) dominates the portfolio's overall risk just because it happens to be more volatile than the rest.

## Mean-variance optimization and its fragility

The Markowitz mean-variance framework chooses weights that maximize expected return for a given level of risk (or minimize risk for a given return), using the full covariance matrix of returns, not just each asset's own volatility:

```python
import numpy as np

# mu: expected return vector, cov: covariance matrix
inv_cov = np.linalg.inv(cov)
raw_weights = inv_cov @ mu
weights_mv = raw_weights / raw_weights.sum()
```

In theory this is optimal. In practice, it's notoriously sensitive to small errors in the estimated mean return vector `mu` — tiny changes in estimated expected returns can produce wildly different, often extreme and concentrated weights. Because expected returns are genuinely hard to estimate precisely from noisy historical data, naive mean-variance optimization frequently performs worse out-of-sample than the much simpler equal-weight or inverse-volatility methods above, despite being "optimal" on paper. Shrinkage estimators and position constraints (caps on any single weight) are common practical fixes, but the core lesson stands: an optimizer is only as good as its inputs, and return estimates are the least reliable input in the whole system.

## Long-short construction and neutrality

Many systematic strategies construct a **long-short** portfolio: long the attractive names, short the unattractive ones, in a way designed to be close to market-neutral (near-zero net dollar exposure) or beta-neutral (near-zero net market beta, using the beta concept from Lesson 2) so the strategy's P&L depends on the signal being right about relative performance, not on the market's overall direction.

## Key terms

| Term | Meaning |
|---|---|
| Equal weighting | Splitting capital evenly across selected names, ignoring signal strength |
| Signal weighting | Scaling position size by the strength of each name's signal value |
| Inverse-volatility weighting | Sizing positions so each contributes roughly equal risk, not equal capital |
| Mean-variance optimization | Choosing weights to maximize return for a given risk using the full covariance matrix; sensitive to input estimation error |
| Long-short / neutral construction | Long attractive names, short unattractive ones, designed to reduce dependence on overall market direction |

## Recap

How you turn a signal into weights — equal, signal-weighted, risk-parity, or mean-variance — changes the strategy's risk profile independent of the signal itself, and the fanciest method isn't always the most robust one. Next, Lesson 9 goes deeper on sizing a single position correctly, including the Kelly criterion.
