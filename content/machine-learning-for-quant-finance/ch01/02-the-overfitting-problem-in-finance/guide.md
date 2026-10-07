# The Overfitting Problem in Finance

Lesson 1 established that financial signal is faint and the market keeps shifting under your feet. This lesson looks at the direct consequence: it is remarkably easy to convince yourself a strategy works when it doesn't. Backtest overfitting is widely considered the single biggest reason quant strategies that look brilliant on paper fail once real money is on the line.

## What you'll learn

- Multiple testing / data dredging: why trying thousands of strategy variations guarantees some will look great by pure chance
- Look-ahead bias: using information in a backtest that wouldn't have actually been available at the time
- Survivorship bias: building and testing on only the assets that are still around today
- A first look at the deflated Sharpe ratio and backtest-overfitting detection, covered fully in Chapter 4

## The multiple-testing trap

Imagine testing 1,000 random trading rules against historical data. Even if every single one is pure noise with zero real skill, basic probability says some will show an impressively high historical Sharpe ratio just by chance — the same way flipping 1,000 coins will produce a few runs of ten heads in a row. Researchers call this **data dredging** or **multiple testing bias**, and it is especially dangerous in finance because backtesting is cheap and fast: it's trivial to try thousands of parameter combinations and keep only the one that happened to backtest the best.

```python
import numpy as np

n_strategies = 1000
n_days = 500
rng = np.random.default_rng(7)

# Simulate 1,000 strategies that are all pure noise (zero real skill)
returns = rng.normal(loc=0.0, scale=0.01, size=(n_days, n_strategies))
sharpe = returns.mean(axis=0) / returns.std(axis=0) * np.sqrt(252)

print(f"Best Sharpe among pure-noise strategies: {sharpe.max():.2f}")
# A handful routinely clear a Sharpe of 1.5-2.0 by chance alone
```

## Look-ahead and survivorship bias

**Look-ahead bias** happens when a backtest accidentally uses information that wasn't actually knowable at that point in time — for example, using a company's final (restated) earnings figure on a date before the restatement was published, or using an index's current constituent list to test a strategy ten years ago. **Survivorship bias** happens when the universe of assets you test on only includes companies, funds, or coins that still exist today, silently excluding everything that went bankrupt or was delisted — which flatters results, since the failures are the ones most likely to have had a real problem the strategy should have caught.

## Why this matters more than it would in other ML domains

Combine low signal (Lesson 1), cheap repeated testing, and subtle biases that are easy to miss, and you get a strategy that looks fantastic in a backtest and then performs at or below zero in live trading — a well-documented and extremely common failure mode in the industry. Chapter 4 of this course builds the full toolkit for defending against it: walk-forward validation, purged and embargoed cross-validation, and two tools previewed here by name — the **deflated Sharpe ratio**, which adjusts a strategy's Sharpe ratio downward for how many trials it took to find it, and formal methods for **detecting backtest overfitting**.

## Key terms

| Term | Meaning |
|---|---|
| Multiple testing / data dredging | Testing many strategy variants guarantees some will look good by chance alone |
| Look-ahead bias | Using information in a backtest that wasn't actually available at that point in time |
| Survivorship bias | Testing only on assets that still exist today, excluding failures/delistings |
| Deflated Sharpe ratio | A Sharpe ratio adjusted downward for the number of trials used to find the strategy |
| Backtest overfitting | A strategy fit to historical noise rather than a real, repeatable pattern |

## Recap

A backtest can look beautiful for reasons that have nothing to do with real predictive skill: chance alone across many trials, information that leaked backward in time, or a universe quietly missing its failures. Chapter 4 later in this course builds the defenses in full. Next up, Lesson 3: Labeling Financial Data, where we tackle an even more basic question — what should the model actually be predicting?
