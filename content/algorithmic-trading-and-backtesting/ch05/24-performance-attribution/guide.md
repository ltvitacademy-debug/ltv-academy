# Performance Attribution

Every measure so far in this chapter describes the portfolio's return as a single number. **Performance attribution** opens that number up: which positions, assets, or sub-strategies actually produced it? This matters for a very practical reason — a positive total return can hide a losing position being bailed out by a winning one, and you cannot decide whether to keep, resize, or cut a piece of a strategy without knowing what it actually contributed.

## What you'll learn

- How to decompose a portfolio's total return into each position's contribution
- Why "contribution to return" is not the same thing as "that position's own return"
- How to attribute return across sub-strategies ("sleeves"), not just individual assets
- Why one losing leg can be masked by a portfolio-level return that still looks fine
- How attribution connects back to position sizing and portfolio construction (Chapter 2)

## Contribution to return vs. an asset's own return

A position's **contribution to portfolio return** is its weight multiplied by its own return — not its own return in isolation. A position can have a fantastic 40% return and still contribute almost nothing to the portfolio if it only received 2% of capital; a mediocre 3% return can dominate the portfolio if it received 60% of capital. Attribution is about the product of sizing and performance, which is exactly why it connects directly to the position-sizing decisions from Chapter 2.

```python
import numpy as np
import pandas as pd

rng = np.random.default_rng(24)
n_days = 252
assets = ["AAA", "BBB", "CCC", "DDD"]
# Illustrative synthetic daily returns per asset — NOT real market data
asset_returns = pd.DataFrame({
    a: rng.normal(mu, 0.012, n_days)
    for a, mu in zip(assets, [0.0004, 0.0007, -0.0002, 0.0009])
})

# Static illustrative target weights, long-only, summing to 1
weights = pd.Series({"AAA": 0.20, "BBB": 0.30, "CCC": 0.20, "DDD": 0.30})

# Each day's per-asset contribution = weight * that asset's return that day
contrib = asset_returns.mul(weights, axis=1)
portfolio_returns = contrib.sum(axis=1)
```

## Decomposing the total

Summing each asset's daily contributions over the whole period gives its total contribution — and, because contribution is additive by construction, these contributions sum exactly to the portfolio's total return (using the simple additive approximation to return common for attribution; a precisely compounded version would need to re-weight daily, which is a refinement, not a different idea):

```python
total_contrib = contrib.sum(axis=0)
total_portfolio_return = portfolio_returns.sum()

for a in assets:
    pct_of_total = total_contrib[a] / total_portfolio_return * 100
    print(f"{a}: weight={weights[a]:.2f}  avg_return={asset_returns[a].mean():.5f}  "
          f"contribution={total_contrib[a]:.4f}  ({pct_of_total:.1f}% of total)")

print(f"\ntotal portfolio return: {total_portfolio_return:.4f}")
```

```
AAA: weight=0.20  avg_return=-0.00169  contribution=-0.0852  (-57.6% of total)
BBB: weight=0.30  avg_return=0.00191  contribution=0.1445  (97.7% of total)
CCC: weight=0.20  avg_return=0.00058  contribution=0.0295  (19.9% of total)
DDD: weight=0.30  avg_return=0.00078  contribution=0.0591  (40.0% of total)

total portfolio return: 0.1479
```

Read this carefully: the portfolio's total return of 14.8% looks perfectly healthy. But AAA alone *lost* the portfolio 8.5 percentage points of return (−57.6% of the total — note contributions can exceed 100% or go negative, since they're shares of a net number, not independent probabilities), fully masked by BBB's strong showing. A manager or researcher who only looked at the 14.8% headline number would never know that one of four positions was a consistent drag the entire period. This is exactly the kind of fact attribution exists to surface.

## Attributing across sub-strategies, not just assets

The same logic applies one level up: if a portfolio blends multiple signals or sub-strategies ("sleeves" — e.g., a momentum sleeve and a mean-reversion sleeve from Chapter 1), you can group individual positions by which sleeve they belong to and sum contributions within each group:

```python
sleeve_a_assets = ["AAA", "BBB"]  # e.g., a momentum sleeve
sleeve_b_assets = ["CCC", "DDD"]  # e.g., a mean-reversion sleeve

sleeve_a_contrib = contrib[sleeve_a_assets].sum(axis=1).sum()
sleeve_b_contrib = contrib[sleeve_b_assets].sum(axis=1).sum()

print(f"Sleeve A contribution: {sleeve_a_contrib:.4f}")
print(f"Sleeve B contribution: {sleeve_b_contrib:.4f}")
```

```
Sleeve A contribution: 0.0593
Sleeve B contribution: 0.0885
```

This is the question a research lead actually wants answered when a multi-signal strategy's performance review comes up: not just "did we make money," but "which sleeve is actually earning its capital allocation, and which one is riding along on the other's performance." A sleeve that persistently contributes little or negatively is a direct, data-backed case for cutting its risk budget — exactly the kind of decision Lesson 10's risk-budgeting framework is meant to support on an ongoing basis, not just at initial design time.

## What attribution does and doesn't tell you

Attribution tells you *where* return came from, in the sample you measured. It does not, by itself, tell you whether that pattern will continue — a sleeve that contributed well this quarter is not guaranteed to next quarter, and a single quarter's attribution is exactly the kind of in-sample measurement Lesson 19 warned about over-trusting. The practical use of attribution is operational and diagnostic (is each piece behaving the way it was designed to, is sizing roughly matching conviction, is anything a persistent and unexplained drag) rather than predictive.

## Key terms

| Term | Meaning |
|---|---|
| Contribution to return | A position's weight multiplied by its own return; not the same as its own return alone |
| Performance attribution | Decomposing total portfolio return into the contributions of its individual positions or sleeves |
| Sleeve | A sub-strategy or signal grouping within a larger blended portfolio |
| Additive attribution | The standard simplifying convention of summing weight × return contributions, as an approximation to exactly compounded attribution |

## Recap

Contribution to return (weight times return, not return alone) decomposes a portfolio's total performance down to the asset or sleeve level, and can reveal a losing position masked by an unrelated winner — information the headline return number alone will never show you. Next, Lesson 25 asks the harder question underneath all of this chapter's numbers: how statistically confident should you actually be that any of these results reflect a real edge rather than noise?
