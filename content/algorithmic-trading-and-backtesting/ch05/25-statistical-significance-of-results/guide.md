# Statistical Significance of Results

This closes Chapter 5 by asking the question every other lesson in it has been dancing around: given everything you just measured — Sharpe, Sortino, Calmar, attribution — how *confident* should you actually be that any of it reflects a real, repeatable edge rather than noise in one particular historical sample? The honest, uncomfortable answer for most individually-tested backtests: less confident than the headline numbers suggest.

## What you'll learn

- How to test whether a mean return is statistically distinguishable from zero
- Why a Sharpe ratio has its own standard error, and how to estimate it
- How to build a confidence interval around an annualized Sharpe ratio
- Bootstrap resampling as a model-free way to estimate that same uncertainty
- Why a "good" backtested Sharpe ratio over a short sample can still be statistically indistinguishable from luck

## Is the mean return even different from zero?

The most basic test: treat the daily returns as a sample and ask whether their mean is statistically distinguishable from zero, using a standard one-sample t-test.

```python
import numpy as np
import pandas as pd
from scipy import stats

rng = np.random.default_rng(9)
n_days = 504  # same illustrative synthetic series as Lessons 21-23
daily_returns = pd.Series(rng.normal(0.0006, 0.010, n_days))

mean_daily = daily_returns.mean()
std_daily = daily_returns.std(ddof=1)
n = len(daily_returns)

se_mean = std_daily / np.sqrt(n)
t_stat = mean_daily / se_mean
p_value = 2 * (1 - stats.t.cdf(abs(t_stat), df=n - 1))

print(f"mean daily return : {mean_daily:.6f}")
print(f"t-stat (mean = 0) : {t_stat:.3f}")
print(f"p-value           : {p_value:.4f}")
```

```
mean daily return : 0.000651
t-stat (mean = 0) : 1.431
p-value           : 0.1532
```

A p-value of 0.15 means this result would arise purely by chance, with a genuinely zero-mean return process, about 15% of the time — well above the conventional 5% bar for "statistically significant." Despite this strategy showing a respectable Sharpe ratio (1.01, from Lesson 21) over two full years of daily data, its mean daily return is *not* statistically distinguishable from zero at standard significance levels. That is a genuinely important, sobering result, and it is extremely common — two years of daily data is a relatively short sample for detecting a modest edge against realistic market noise.

## The Sharpe ratio has its own standard error

The Sharpe ratio itself is an estimate, not a fact, and it has sampling uncertainty just like the mean return does. Under the simplifying assumption that returns are independent and identically distributed, Lo's (2002) widely-used approximation for the standard error of a (non-annualized) Sharpe ratio is:

```
SE(Sharpe) ≈ sqrt((1 + 0.5 * Sharpe²) / n)
```

```python
sharpe_daily = mean_daily / std_daily
sharpe_ann = sharpe_daily * np.sqrt(252)

se_sharpe_daily = np.sqrt((1 + 0.5 * sharpe_daily**2) / n)
se_sharpe_ann = se_sharpe_daily * np.sqrt(252)

ci_low = sharpe_ann - 1.96 * se_sharpe_ann
ci_high = sharpe_ann + 1.96 * se_sharpe_ann

print(f"annualized Sharpe      : {sharpe_ann:.3f}")
print(f"SE(Sharpe), annualized : {se_sharpe_ann:.3f}")
print(f"95% CI for Sharpe      : [{ci_low:.3f}, {ci_high:.3f}]")
```

```
annualized Sharpe      : 1.012
SE(Sharpe), annualized  : 0.708
95% CI for Sharpe       : [-0.376, 2.399]
```

The point estimate is a Sharpe of 1.01 — but the 95% confidence interval runs from clearly negative to quite strongly positive. In plain terms: this two-year backtest cannot rule out that the true, underlying Sharpe ratio is actually negative, even though the sample happened to produce a positive and seemingly respectable number. This is the quantitative version of the same warning Lesson 19 made qualitatively — one backtest run is a single noisy draw, and a point estimate without its uncertainty is close to meaningless on its own.

## Bootstrap resampling: the same idea, fewer assumptions

Lo's formula assumes returns are independent and identically distributed, which is only ever an approximation. A **bootstrap** gets at the same uncertainty with fewer assumptions: resample the actual historical daily returns, with replacement, thousands of times, recompute the Sharpe ratio each time, and look at the resulting distribution directly.

```python
n_boot = 5000
rng_boot = np.random.default_rng(100)
values = daily_returns.values
boot_sharpes = np.empty(n_boot)

for i in range(n_boot):
    sample = rng_boot.choice(values, size=n, replace=True)
    boot_sharpes[i] = sample.mean() / sample.std(ddof=1) * np.sqrt(252)

prob_sharpe_positive = (boot_sharpes > 0).mean()
boot_ci_low, boot_ci_high = np.percentile(boot_sharpes, [2.5, 97.5])

print(f"bootstrap mean Sharpe       : {boot_sharpes.mean():.3f}")
print(f"bootstrap 95% CI            : [{boot_ci_low:.3f}, {boot_ci_high:.3f}]")
print(f"P(Sharpe > 0) via bootstrap : {prob_sharpe_positive:.4f}")
```

```
bootstrap mean Sharpe       : 1.021
bootstrap 95% CI            : [-0.346, 2.451]
P(Sharpe > 0) via bootstrap : 0.9310
```

The bootstrap confirms Lo's formula closely in this case (a 95% CI of roughly [-0.35, 2.45] versus [-0.38, 2.40]) and adds a directly interpretable number: based on resampling this exact history, there's about a 93% chance the true Sharpe ratio is positive — which sounds reassuring, but also means roughly a 1-in-14 chance it isn't, from a strategy whose point-estimate Sharpe looked like a clear "1.0 is solid" result under Lesson 21's rule of thumb.

## What this means for every number in this chapter

None of this means Sharpe, Sortino, Calmar, or attribution are useless — they're the right vocabulary for describing what happened. It means a single point estimate from one backtest, especially a backtest of only a year or two, should be reported with its uncertainty, not as a bare number, and an idea that only "worked" because it was the best of many parameter combinations (Lesson 19) is in an even weaker position than this honest single test. The practical takeaways that carry into Chapter 6: prefer longer samples when they exist, run the uncertainty estimate (Lo's formula or a bootstrap) alongside every headline ratio you report, and treat "it had a Sharpe of 1" very differently depending on whether that came from 2 years or 15.

## Key terms

| Term | Meaning |
|---|---|
| p-value | The probability of seeing a result this extreme (or more) if the true effect were zero |
| Standard error of the Sharpe ratio | The sampling uncertainty of an estimated Sharpe ratio, e.g. via Lo's approximation |
| Confidence interval | A range of plausible values for the true underlying metric, given sampling uncertainty |
| Bootstrap | Resampling observed data with replacement many times to estimate a statistic's sampling distribution with fewer modeling assumptions |

## Recap

A Sharpe ratio, like a mean return, has its own sampling uncertainty — Lo's formula and bootstrap resampling both show that a seemingly solid Sharpe of ~1.0 from two years of daily data can have a confidence interval stretching into negative territory. Every number from this chapter should be reported with that uncertainty attached, not as a bare point estimate. That closes Chapter 5. Chapter 6 turns to the next honest question: assuming a strategy survives all of this scrutiny, what does it actually take to move it from a backtest into live, production trading?
