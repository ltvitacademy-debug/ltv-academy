# Alpha, Beta & Edge

Every strategy's return can be broken into two pieces: the part that's just riding the market, and the part that isn't. Getting this split right — and getting honest about how small that second piece usually is — is the single most important habit in quantitative trading. This lesson gives you the precise definitions and the regression math behind them.

## What you'll learn

- The alpha/beta decomposition of a strategy's returns
- How beta is actually calculated from covariance and variance
- How alpha is calculated once beta is known
- What "edge" means, and why it has to survive costs and statistics, not just a backtest chart
- Why a positive alpha in a backtest is a claim that needs evidence, not a conclusion

## The decomposition

Assume a strategy's daily returns, `r_s`, and a relevant market benchmark's daily returns, `r_m`. The single-factor model says:

```
r_s(t) = alpha + beta * r_m(t) + epsilon(t)
```

- **Beta** is the strategy's sensitivity to the market — how much of its return is just exposure to a factor you could have gotten for free with an index fund.
- **Alpha** is what's left over on average once beta is accounted for — the part of the return the market itself doesn't explain.
- **Epsilon** is residual noise, assumed to average to zero.

## Computing beta and alpha correctly

Beta is a ratio of covariance to variance, not a vibe:

```
beta = Cov(r_s, r_m) / Var(r_m)
```

Once you have beta, alpha is simply the average strategy return left over after removing the market-driven piece:

```
alpha = mean(r_s) - beta * mean(r_m)
```

This is exactly what ordinary least squares regression of `r_s` on `r_m` gives you — the slope is beta, the intercept is alpha. Both formulas below produce the same numbers.

```python
import numpy as np

# r_s, r_m: aligned daily return Series for strategy and market
cov_matrix = np.cov(r_s, r_m)          # 2x2 covariance matrix
beta = cov_matrix[0, 1] / cov_matrix[1, 1]
alpha_daily = r_s.mean() - beta * r_m.mean()

# Equivalently, via OLS regression:
slope, intercept = np.polyfit(r_m, r_s, deg=1)
# slope == beta, intercept == alpha_daily (up to numerical noise)

alpha_annualized = alpha_daily * 252
```

Annualizing alpha by multiplying the daily figure by 252 (the typical number of US trading days in a year) is the standard convention — the same convention you'll use for Sharpe ratios in Chapter 5.

## What "edge" actually means

Edge is the structural or informational reason alpha should exist at all — not the alpha number itself. A backtest can show positive alpha purely from noise or from an overfit rule; edge is your answer to "why would this keep working." Legitimate sources of edge include: processing public information faster or more completely than others, being willing to hold risk others want to offload (a genuine compensated risk premium), or exploiting a structural friction (an index rebalancing rule, a market microstructure quirk) that persists because fixing it isn't worth it for most participants. "The backtest went up" is not a source of edge — it's a result that edge, or luck, could equally have produced.

## Why a backtest's alpha is a claim, not a conclusion

A positive measured alpha has three possible explanations: a real, persistent edge; a statistical fluke from a finite sample; or an artifact of fitting the rule to data you already knew the answer to. Chapter 4 of this course (Data Snooping & Overfitting) and Chapter 5 (Statistical Significance of Results) exist specifically to help you tell these apart — a single backtest number, by itself, cannot. For now, the discipline to build is: always ask what would have to be true about the world for this alpha to be real, and whether the sample size is even large enough to say anything with confidence.

## Key terms

| Term | Meaning |
|---|---|
| Beta | `Cov(r_s, r_m) / Var(r_m)` — sensitivity of strategy returns to the market factor |
| Alpha | `mean(r_s) - beta * mean(r_m)` — average return unexplained by market exposure |
| Edge | The structural or informational reason alpha should persist, not just a backtest result |
| Residual (epsilon) | The leftover, unexplained noise in the single-factor model |
| OLS regression | Fitting `r_s` as a linear function of `r_m`; slope = beta, intercept = alpha |

## Recap

Beta tells you how much of a strategy is just market exposure; alpha is what's left; edge is the reason you believe that leftover is real rather than noise. Next, Lesson 3 surveys the major strategy families — momentum, mean reversion, and carry — and where each one's edge is supposed to come from.
