# Statistical Arbitrage & Pairs Trading

Pairs trading is the classic entry point into statistical arbitrage: instead of betting on one instrument's price reverting to its own history, you bet on the *relationship* between two instruments reverting to its history. Done carefully, it's one of the cleaner illustrations of market-neutral design. Done carelessly, it's a textbook example of mistaking correlation for a tradable relationship.

## What you'll learn

- The difference between correlation and cointegration, and why only the latter justifies a pairs trade
- How to estimate the hedge ratio between two instruments
- How to build the spread and its z-score, and turn that into entry/exit rules
- Why market-neutral doesn't mean risk-free
- The real historical failure mode: crowded stat-arb unwinds

## Correlation is not enough

Two prices can be highly correlated over a sample and still wander apart forever (think of two unrelated stocks that both trended up during a bull market). What a pairs trade actually needs is **cointegration**: a stable, mean-reverting long-run relationship between the two series, even if each series individually is a random walk. The standard test is the Engle-Granger two-step procedure — regress one price on the other, then test whether the regression's residual (the spread) is itself stationary (using, e.g., an Augmented Dickey-Fuller test). A high correlation with no cointegration is exactly the setup that produces a pairs trade that "should" work and doesn't.

## Estimating the hedge ratio and building the spread

The hedge ratio, `beta`, says how many units of asset B offset one unit of asset A. It's typically estimated the same way as the beta in Lesson 2 — by OLS regression — but here it's between two asset prices (or log prices), not a strategy versus a benchmark.

```python
import numpy as np
import pandas as pd

# price_a, price_b: aligned price Series (often log prices)
log_a, log_b = np.log(price_a), np.log(price_b)

# Hedge ratio via OLS: log_a = beta * log_b + c
beta, intercept = np.polyfit(log_b, log_a, deg=1)

spread = log_a - beta * log_b
```

A full implementation re-estimates beta on a rolling window rather than once over the whole history, since the relationship drifts — but a single static estimate is the right starting point for understanding the mechanics.

## From spread to signal: the z-score

Once you have the spread, trade its deviation from its own rolling mean, exactly the z-score construction from Lesson 3:

```python
window = 60
spread_mean = spread.rolling(window).mean()
spread_std = spread.rolling(window).std()
zscore = (spread - spread_mean) / spread_std
zscore = zscore.shift(1)  # avoid lookahead

entry_z, exit_z = 2.0, 0.5
long_spread = zscore < -entry_z    # spread too low: long A, short beta*B
short_spread = zscore > entry_z    # spread too high: short A, long beta*B
flat = zscore.abs() < exit_z       # spread back near mean: close out
```

"Long the spread" means long `price_a` and short `beta` units of `price_b`; "short the spread" is the reverse. Because both legs move together under normal conditions, the position is designed to be close to market-neutral — its P&L depends on the spread converging, not on which way the overall market moves.

## Market-neutral is not risk-free

Market-neutral removes one risk (broad market direction) and leaves several others very much in place: the cointegrating relationship can break permanently (a merger, a regulatory change, one company's business model diverging from its "pair"), the hedge ratio estimate carries its own sampling error, and — most dangerous — many stat-arb desks tend to hold economically similar pairs. When several firms need to unwind similar positions at once (as happened industry-wide in August 2007), the resulting correlated selling can make "safe," low-volatility spreads move violently in a way no individual pair's own history would have predicted. This is a preview of the crowding and correlation risks covered more generally in Chapter 4.

## Key terms

| Term | Meaning |
|---|---|
| Cointegration | A stable, mean-reverting long-run relationship between two series, even if each is individually non-stationary |
| Hedge ratio (beta) | The OLS-estimated ratio of asset B to offset one unit of asset A when forming the spread |
| Spread | `log(A) - beta * log(B)` — the quantity a pairs trade actually trades |
| Engle-Granger test | A two-step test: regress the series, then test the residual (spread) for stationarity |
| Market-neutral | Designed to be insensitive to broad market direction — not the same as risk-free |

## Recap

A pairs trade only makes sense if the two instruments are cointegrated, not merely correlated, and even a well-chosen pair carries hedge-ratio and crowding risk that "market-neutral" doesn't remove. Next, Lesson 5 steps back from any specific technique to cover the discipline of turning a raw idea into a hypothesis you can actually test without fooling yourself.
