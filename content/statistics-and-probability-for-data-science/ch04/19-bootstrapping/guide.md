# Bootstrapping

The confidence intervals in the last lesson relied on a formula and on assumptions about shape. That is fine for a mean, but what about a median? A ratio? The difference between two medians? Formulas for those are messy or nonexistent. The **bootstrap** offers a wonderfully simple alternative: treat your sample as a stand-in for the population, resample from it with replacement over and over, recompute your statistic each time, and use the spread of those results to measure uncertainty. With a few lines of Python you can put an interval on almost any statistic.

Data is simulated and illustrative. Code was run with numpy 1.23 and scipy 1.9; run blocks in order in one session to reproduce the printed numbers.

## What you'll learn

- The bootstrap idea and why resampling with replacement works
- How to bootstrap a mean and compare it with the formula-based answer
- How to bootstrap a median and a difference between groups
- How to use `scipy.stats.bootstrap`
- Where the bootstrap fails

## The idea

You have one sample of n observations. You cannot go back and collect more, but you can imitate that by drawing n observations *from your own sample, with replacement* (so some values repeat and others are left out). That is one **bootstrap resample**. Compute your statistic on it. Repeat thousands of times. The distribution of that statistic across resamples approximates its sampling distribution, whose standard deviation is the standard error.

## Bootstrapping a mean

Say we have 40 order values from a skewed distribution.

```python
import numpy as np
from scipy import stats

rng = np.random.default_rng(19)
orders = rng.lognormal(3.5, 0.8, size=40).round(2)
print(round(orders.mean(), 2), round(np.median(orders), 2))   # 35.32 25.4

resample = rng.choice(orders, size=len(orders), replace=True)
print(round(resample.mean(), 2))                               # 32.3
```

The mean is 35.32 but the median only 25.4, a sign of skew. One resample's mean is 32.3. Now do it 10,000 times:

```python
B = 10_000
boot_means = np.array([rng.choice(orders, size=len(orders), replace=True).mean()
                       for _ in range(B)])
print(round(boot_means.std(ddof=1), 2), round(stats.sem(orders), 2))   # 4.42 4.5
lo, hi = np.percentile(boot_means, [2.5, 97.5])
print(round(lo, 2), round(hi, 2))                                      # 27.5 44.76
```

The bootstrap standard error of 4.42 closely matches the formula's 4.50. The **percentile interval** simply takes the 2.5th and 97.5th percentiles of the bootstrap means: 27.5 to 44.76. The t interval on the same data was 26.22 to 44.42. Notice the bootstrap interval sits slightly to the right, reflecting the right skew in the data, whereas the t interval is forced to be symmetric.

## Bootstrapping a median

Here is where the bootstrap earns its keep. There is no simple standard-error formula for a median, yet we can bootstrap it. This vectorized version draws all the row indices at once, which is much faster than a Python loop:

```python
idx = rng.integers(0, len(orders), size=(B, len(orders)))
boot_medians = np.median(orders[idx], axis=1)
lo, hi = np.percentile(boot_medians, [2.5, 97.5])
print(round(lo, 2), round(hi, 2))            # 19.98 42.59
print(round(boot_medians.std(ddof=1), 2))    # 6.13
```

The median of 25.4 has a 95% bootstrap interval of roughly 20 to 42.6. That is wide, honestly reflecting how little 40 observations say about the middle of a skewed distribution.

## Using scipy

Recent scipy versions include a ready-made function, `scipy.stats.bootstrap`. You pass the data as a sequence of arrays and a statistic function.

```python
res = stats.bootstrap((orders,), np.median, n_resamples=9999,
                      confidence_level=0.95, method="percentile",
                      random_state=1)
print(res.confidence_interval)   # low 19.98, high 42.59

res2 = stats.bootstrap((orders,), np.mean, n_resamples=9999, random_state=1)
print(res2.confidence_interval.low, res2.confidence_interval.high)  # 28.76 47.59
```

Note that the default method is `"BCa"` (bias-corrected and accelerated), a refinement that adjusts for bias and skew, which is why its interval for the mean (28.76 to 47.59) shifts further right than the plain percentile one. Argument names such as `random_state` have changed in newer scipy releases, so check the current docs for your version.

## A difference between two groups

Bootstrapping shines for comparing groups. Resample each group separately, and record the difference in means:

```python
a = rng.lognormal(3.5, 0.8, size=60)
b = rng.lognormal(3.65, 0.8, size=60)
ia = rng.integers(0, 60, size=(B, 60)); ib = rng.integers(0, 60, size=(B, 60))
diffs = b[ib].mean(axis=1) - a[ia].mean(axis=1)
print(round(b.mean() - a.mean(), 2), np.percentile(diffs, [2.5, 97.5]).round(2))
# 1.93 [-12.12  15.78]
```

The observed difference is 1.93, but the interval runs from about -12 to +16, comfortably including zero: the data cannot distinguish the groups. That is a preview of hypothesis testing.

## Limits of the bootstrap

The bootstrap is not magic. It cannot fix a biased or unrepresentative sample; it only resamples what you already have. With very small samples it underestimates uncertainty. It fails for extreme statistics such as the maximum: in our resamples the sample max appears in 63.5% of them, matching the theoretical 1 - (1 - 1/n)^n = 63.7%, so the bootstrap distribution of the max is a poor imitation of reality. And if observations are dependent (time series, clusters), you must resample blocks or clusters, not individual rows.

## Recap

Resample with replacement, recompute, and read the interval off the percentiles. The bootstrap gives standard errors and intervals for medians, ratios, and differences with little math, at the cost of computation and the assumption that your sample represents the population.
