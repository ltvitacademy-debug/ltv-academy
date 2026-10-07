# Bootstrap & Resampling Methods

Every confidence interval you've built so far has leaned on a known (or asymptotic) sampling distribution — the t-distribution for a mean, the normal approximation from the CLT. Many statistics quants actually care about — a Sharpe ratio, a maximum drawdown, the correlation between two strategies — don't have a clean, closed-form sampling distribution. The **bootstrap** sidesteps the problem entirely: it builds an empirical sampling distribution directly from your data, by resampling.

## What you'll learn

- The nonparametric bootstrap: resampling with replacement to approximate a statistic's sampling distribution
- How to compute a bootstrap standard error and a percentile confidence interval
- Why the bootstrap is especially useful for statistics like the Sharpe ratio, which have no simple closed-form sampling distribution
- The assumptions the bootstrap relies on, and where it can fail (time-series dependence)
- A worked bootstrap confidence interval for a strategy's Sharpe ratio

## The nonparametric bootstrap

Given an observed sample x₁, …, xₙ, the **nonparametric bootstrap** treats that sample as a stand-in for the entire population. To approximate the sampling distribution of any statistic T (a mean, a ratio, a correlation — anything computable from the data):

1. Draw a **bootstrap resample** of size n, **with replacement**, from the original n observations (so some original observations may appear multiple times, others not at all).
2. Compute the statistic T on that resample, call it T*.
3. Repeat steps 1–2 a large number of times, B (typically 1,000–10,000), producing T*₁, …, T*_B.

This collection of T* values is the **bootstrap distribution** — an empirical approximation of how T would vary if you could somehow draw many fresh samples from the true population, built using nothing but the one sample you actually have.

## Bootstrap standard errors and confidence intervals

Once you have the bootstrap distribution, two things fall out immediately:

- **Bootstrap standard error**: the standard deviation of T*₁, …, T*_B — an estimate of how much T itself would vary from sample to sample.
- **Percentile confidence interval**: for a 95% interval, take the 2.5th and 97.5th percentiles of the bootstrap distribution directly. No normality assumption, no closed-form formula — just empirical quantiles of resampled statistics.

This works for statistics with no tractable analytical sampling distribution at all. The **Sharpe ratio**, SR = x̄ / s (mean return divided by standard deviation of return), is a classic example: it's a *ratio* of two correlated random quantities, and deriving its exact sampling distribution analytically is genuinely hard, especially with non-normal returns. The bootstrap just... does it, without needing the derivation.

## Assumptions and where the bootstrap can fail

The ordinary (i.i.d.) bootstrap assumes the observations are, in fact, independent and identically distributed draws from some underlying distribution — resampling with replacement only mimics "drawing a fresh sample" correctly under that assumption. Daily financial returns often show **autocorrelation** (volatility clustering, momentum, mean reversion), which the plain bootstrap destroys by shuffling observations independently. The standard fix is the **block bootstrap**: resample contiguous blocks of consecutive observations (rather than individual points) with replacement, preserving short-range time dependence within each block while still building up a full resampled series.

## A worked example in code

```python
import numpy as np

rng = np.random.default_rng(97)
n, B = 252, 10_000

# A strategy's daily returns over one year
returns = rng.normal(0.0006, 0.013, n)

def sharpe(r):
    return r.mean() / r.std(ddof=1) * np.sqrt(252)   # annualized Sharpe ratio

observed_sharpe = sharpe(returns)

boot_sharpes = np.empty(B)
for b in range(B):
    resample = rng.choice(returns, size=n, replace=True)   # sample WITH replacement
    boot_sharpes[b] = sharpe(resample)

boot_se = boot_sharpes.std()
ci_lower, ci_upper = np.percentile(boot_sharpes, [2.5, 97.5])

print(f"Observed annualized Sharpe: {observed_sharpe:.3f}")
print(f"Bootstrap standard error:   {boot_se:.3f}")
print(f"95% bootstrap CI:           ({ci_lower:.3f}, {ci_upper:.3f})")
```

The resulting confidence interval is often wide relative to the point estimate — a direct, honest demonstration that a single year's Sharpe ratio carries substantial sampling uncertainty, something a bare point estimate like "Sharpe = 0.7" completely hides.

## Key terms

| Term | Meaning |
|---|---|
| Nonparametric bootstrap | Resampling with replacement from the observed data to approximate a statistic's sampling distribution |
| Bootstrap resample | One resample of size n, drawn with replacement from the original sample |
| Bootstrap standard error | Standard deviation of the statistic across bootstrap resamples |
| Percentile confidence interval | Empirical quantiles (e.g., 2.5th/97.5th) of the bootstrap distribution |
| Block bootstrap | Resamples contiguous blocks instead of single points, to preserve time-series dependence |

## Recap

The bootstrap builds a confidence interval for virtually any statistic directly from the data, by resampling with replacement, sidestepping the need for a closed-form sampling distribution — with the block bootstrap as the fix when your data has real time dependence. This closes Chapter 4, Advanced Statistics. Next up, Chapter 5 opens with Lesson 24: Unconstrained Optimization & Gradient Methods, where we turn from describing uncertainty to actually solving for the best decision given it.
