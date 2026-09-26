# The Normal Distribution

The normal distribution, the famous bell curve, is the most important continuous distribution in statistics. It is symmetric, peaked in the middle, and completely described by two numbers: the mean (its center) and the standard deviation (its spread). Much of the machinery in later lessons, including confidence intervals and t-tests, leans on it. But it is also over-applied, so this lesson covers both its power and its limits.

Unlike the discrete distributions of the last lesson, a continuous variable can take any value in a range, so the probability of hitting one exact value is zero. We talk about the probability of falling within an interval, which is the area under the curve. The curve's height is called the probability density function (PDF), and the running total of area is the cumulative distribution function (CDF).

Figures below are illustrative. Every snippet was run with numpy 1.23 and scipy 1.9.

## What you'll learn

- What the mean and standard deviation control
- The 68-95-99.7 rule and how to verify it
- How to compute areas with `cdf`, `sf`, and `ppf`
- How to standardize a value into a z-score
- How to check whether real data looks normal

## Setting up an example

Suppose delivery times for an online shop are roughly normal with a mean of 40 minutes and a standard deviation of 5 minutes.

```python
from scipy import stats
d = stats.norm(loc=40, scale=5)
print(round(d.cdf(45), 4))               # 0.8413
print(round(d.cdf(45) - d.cdf(35), 4))   # 0.6827
print(round(d.sf(50), 4))                # 0.0228
print(round(d.ppf(0.95), 2))             # 48.22
```

Note the naming: `loc` is the mean and `scale` is the standard deviation (not the variance). Read the results this way. About 84% of deliveries take 45 minutes or less. About 68% fall between 35 and 45, which is one standard deviation either side of the mean. Only about 2.3% take longer than 50 minutes. And `ppf`, the inverse of the CDF, tells you that 95% of deliveries finish within about 48.2 minutes. Percentile questions like this one use `ppf`.

## The 68-95-99.7 rule

For any normal distribution, roughly 68% of values fall within 1 standard deviation of the mean, 95% within 2, and 99.7% within 3. You can confirm it with the standard normal (mean 0, sd 1):

```python
for k in (1, 2, 3):
    print(k, round(stats.norm.cdf(k) - stats.norm.cdf(-k), 4))
# 1 0.6827
# 2 0.9545
# 3 0.9973
```

This is a handy mental shortcut: a value more than 3 standard deviations from the mean is genuinely rare, which is why analysts treat such points as candidate outliers.

## Z-scores: measuring in standard deviations

A z-score restates a value as "how many standard deviations from the mean," using z = (x − mean) / sd. A 52-minute delivery is (52 − 40) / 5 = 2.4 standard deviations above average.

```python
z = (52 - 40) / 5
print(z, round(stats.norm.sf(z), 4))   # 2.4 0.0082
```

Only about 0.8% of deliveries are that slow. Because z-scores strip away units, you can compare a delivery time and, say, an order value on the same scale. A well-known cutoff you will meet soon is `stats.norm.ppf(0.975)`, about 1.96, which is where 95% intervals come from.

## Does my data look normal?

Real data is never perfectly normal. Check it. Draw a sample and see whether the 68-95 rule holds:

```python
import numpy as np
rng = np.random.default_rng(7)
s = rng.normal(40, 5, size=10_000)
inside1 = (abs(s - s.mean()) < s.std(ddof=1)).mean()
print(round(inside1, 4))   # 0.6792
```

For real data, use a histogram or a Q-Q plot first, and treat skewness as a warning sign: a normal sample has skewness near 0 (here 0.007), while a right-skewed exponential sample gave 1.866. A formal test such as `stats.shapiro` returns a p-value, but be careful. With huge samples it flags trivial departures, and with tiny samples it misses real ones. Plots plus judgment beat a single test.

## Common mistakes

Do not assume normality just because a method is convenient. Incomes, order values, and website session lengths are usually right-skewed. The good news, coming in lesson 16, is that averages of many observations behave normally even when the raw data does not.

## Recap

The normal distribution is set by its mean and standard deviation. Use `cdf` for areas below a value, `sf` for above, and `ppf` for percentiles. The 68-95-99.7 rule gives quick intuition, z-scores put values on a common scale, and you should always check normality with plots rather than assuming it.
