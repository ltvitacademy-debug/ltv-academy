# Other Continuous Distributions

The normal distribution is a fine model for symmetric measurements, but plenty of real data is not symmetric. Waiting times pile up near zero with a long tail. Order values have a few huge purchases. And when we start testing hypotheses, we will use distributions that were built for that job. This lesson introduces five continuous distributions you will meet again and again: uniform, exponential, log-normal, Student's t, and chi-square.

All figures are illustrative. Every snippet was run with numpy 1.23 and scipy 1.9.

## What you'll learn

- When a uniform, exponential, or log-normal model fits
- How the exponential connects to the Poisson distribution
- Why a log transform can tame skewed data
- Why the t distribution has heavier tails than the normal
- A first look at chi-square and F, which return in the hypothesis-testing chapter

## Uniform: every value equally likely

A uniform distribution spreads probability evenly across an interval. Imagine a customer whose call is answered at a random moment within a 10-minute window.

```python
from scipy import stats
u = stats.uniform(loc=0, scale=10)   # from 0 to 0+10
print(u.cdf(3), u.mean(), round(u.std(), 3))
# 0.3 5.0 2.887
```

Careful: for `uniform`, `scale` is the interval width, not an end point. The chance of waiting 3 minutes or less is 30%, and the mean is the midpoint, 5. Uniform is also what random number generators produce first, and later lessons transform it into other shapes.

## Exponential: waiting time between events

If events arrive at a steady average rate (the Poisson situation from lesson 11), the gap between events is exponential. Tickets arrive at 4 per hour, so the mean gap is 0.25 hours, or 15 minutes.

```python
e = stats.expon(scale=0.25)     # scale = mean gap in hours
print(round(e.sf(0.5), 4))      # 0.1353  gap over 30 minutes
print(round(e.median(), 4))     # 0.1733
```

About 13.5% of gaps exceed 30 minutes. Note that the median (about 10.4 minutes) is well below the mean of 15: the distribution is right-skewed. Exponential is also memoryless. Given that you have already waited 15 minutes, the chance of waiting 30 more is the same as the chance of waiting 30 to begin with:

```python
print(round(e.sf(0.75) / e.sf(0.25), 4))   # 0.1353
```

That matches `e.sf(0.5)`, and it is an assumption worth questioning, since real machines wear out and customers do not arrive perfectly randomly.

## Log-normal: skew from multiplying

If the logarithm of a variable is normal, the variable itself is log-normal. It is always positive and right-skewed, which fits order values, incomes, and file sizes.

```python
import numpy as np
rng = np.random.default_rng(11)
x = rng.lognormal(3.5, 0.6, size=10_000)
print(round(x.mean(), 2), round(np.median(x), 2))    # 39.97 33.66
print(round(stats.skew(x), 2), round(stats.skew(np.log(x)), 2))
# 2.28 -0.02
```

The mean sits well above the median, and the raw skewness of 2.28 drops to about zero after `np.log`. That is why analysts often log-transform skewed variables before using methods that expect symmetry. One warning: numpy's `lognormal(mean, sigma)` takes the mean and sd of the underlying normal, not of the result itself, which is a common trap.

## Student's t: normal with heavier tails

The t distribution looks like a normal curve but with fatter tails, reflecting extra uncertainty when you estimate the spread from a small sample. It has a parameter called degrees of freedom (df). As df grows, it converges to the normal:

```python
for df in (5, 30, 1000):
    print(df, round(stats.t.ppf(0.975, df), 3))
# 5 2.571
# 30 2.042
# 1000 1.962
print(round(stats.norm.ppf(0.975), 3))   # 1.96
```

With a small sample you must reach 2.571 standard errors to cover 95%, not 1.96. You will use exactly this in the confidence intervals lesson.

## Chi-square and F: built for testing

Chi-square and F are sums and ratios of squared normal quantities. They are always non-negative and right-skewed. You do not model raw data with them; you compare a test statistic against them.

```python
print(round(stats.chi2.ppf(0.95, 3), 3))     # 7.815
print(round(stats.f.ppf(0.95, 2, 27), 3))    # 3.354
```

We will use these in the chi-square and ANOVA lessons, so nothing to memorize yet.

## Recap

Uniform is flat, exponential models gaps between events, log-normal models multiplicative skewed quantities, t handles small-sample uncertainty, and chi-square and F support hypothesis tests. Always check your parameterization in the docs, because scipy and numpy do not always define scale the same way you would guess.
