# Confidence Intervals

A single number, like "average delivery time is 39.6 minutes," hides how uncertain it is. A **confidence interval** (CI) turns the standard error into a range of plausible values for the population parameter, such as "between 37.9 and 41.4 minutes." Reporting an estimate together with its interval is one of the most honest and useful habits in data work. This lesson builds the interval from the pieces you already have, verifies by simulation what "95%" really means, and flags the common misreadings.

Data is simulated and illustrative. Code was run with numpy 1.23 and scipy 1.9; run blocks in order in one session to reproduce the printed numbers.

## What you'll learn

- How to build a confidence interval for a mean, by hand and with scipy
- What the confidence level means, and what it does not
- How width depends on sample size and confidence level
- A confidence interval for a proportion
- When intervals for skewed data can mislead

## Building the interval

The recipe is: estimate plus or minus a critical value times the standard error. For a mean with an estimated spread we use the t distribution from lesson 13 with n minus 1 degrees of freedom. Suppose 40 deliveries are sampled from a population whose true mean is about 40 (in real life you would not know this).

```python
import numpy as np
from scipy import stats

rng = np.random.default_rng(18)
pop = rng.normal(40, 5, size=100_000)
sample = rng.choice(pop, size=40, replace=False)
xbar, se = sample.mean(), stats.sem(sample)
print(round(xbar, 2), round(se, 3))            # 39.62 0.863

tcrit = stats.t.ppf(0.975, df=len(sample) - 1)
print(round(tcrit, 3))                          # 2.023
print(round(xbar - tcrit * se, 2), round(xbar + tcrit * se, 2))
# 37.87 41.37
print(stats.t.interval(0.95, 39, loc=xbar, scale=se))
```

The last call returns the same interval directly. The 0.975 comes from splitting the remaining 5% into two tails of 2.5%. The 95% CI is 37.87 to 41.37 minutes, and the true mean, 40.01, sits inside it.

## What "95% confident" really means

This is the most misunderstood idea in the lesson. It does **not** mean there is a 95% probability that the true mean lies in this particular interval. The true mean is a fixed number; it is either in the interval or not. The 95% describes the *procedure*: if you repeated the whole sampling process many times and built an interval each time, about 95% of those intervals would capture the truth. Let us check.

```python
hits = 0
trials = 2000
for _ in range(trials):
    smp = rng.choice(pop, size=40, replace=False)
    l, h = stats.t.interval(0.95, 39, loc=smp.mean(), scale=stats.sem(smp))
    hits += (l <= pop.mean() <= h)
print(hits / trials)    # 0.9475
```

Out of 2,000 intervals, 94.75% contained the true mean. Any single interval is a hit or a miss; you cannot tell which.

## Width: confidence level and sample size

A more confident interval must be wider. A larger sample makes it narrower.

```python
for conf in (0.90, 0.95, 0.99):
    l, h = stats.t.interval(conf, 39, loc=xbar, scale=se)
    print(conf, round(l, 2), round(h, 2), "width", round(h - l, 2))
# 0.9  38.16 41.07 width 2.91
# 0.95 37.87 41.37 width 3.49
# 0.99 37.28 41.96 width 4.68
```

Demanding 99% confidence costs about a third more width than 95%. Nothing is free: you trade certainty for precision. Widths by sample size (each from a fresh sample):

```
n = 10   width 6.85
n = 40   width 3.21
n = 160  width 1.51
n = 640  width 0.77
```

Each fourfold increase in n roughly halves the width, echoing the square-root rule.

## A proportion

For a proportion, such as 120 of 400 customers returning an order, use the normal approximation:

```python
p = 120 / 400
se_p = np.sqrt(p * (1 - p) / 400)
z = stats.norm.ppf(0.975)
print(round(p - z * se_p, 4), round(p + z * se_p, 4))   # 0.2551 0.3449
```

We estimate a 30% return rate, with a 95% interval of about 25.5% to 34.5%. This approximation works poorly when n is small or p is near 0 or 1; check current library options such as the Wilson interval in statsmodels for those cases.

## When the recipe wobbles

The t interval assumes roughly normal sampling behavior. With strongly skewed data and a small sample, coverage falls short. We simulated a very skewed log-normal population and built 95% intervals from samples of only 15:

```python
pop2 = rng.lognormal(3.5, 1.0, size=200_000)
mu2 = pop2.mean()
hits = 0
for _ in range(2000):
    smp = rng.choice(pop2, size=15, replace=False)
    l, h = stats.t.interval(0.95, 14, loc=smp.mean(), scale=stats.sem(smp))
    hits += (l <= mu2 <= h)
print(hits / 2000)   # 0.8575
```

Only about 86% of the "95%" intervals caught the mean. Larger samples, or the bootstrap in the next lesson, are the fix. Also remember that a CI only covers random error; a biased sample gives a confidently wrong interval.

## Recap

A confidence interval is estimate plus or minus critical value times standard error. The level describes the long-run success rate of the method, not the probability for your one interval. Higher confidence and smaller samples widen it, and skew plus small n can break it.
