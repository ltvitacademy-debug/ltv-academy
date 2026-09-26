# Measures of Spread

Two delivery services both average 50 minutes per delivery. One is almost always between 48 and 52 minutes. The other ranges from 20 to 80. Same center, completely different experience. A **measure of spread** (or dispersion) tells you how much values vary, and without it a measure of center can be dangerously misleading.

## What you'll learn

- Range, variance, standard deviation, and interquartile range (IQR)
- What each one measures and when to prefer it
- The difference between dividing by n and dividing by n minus 1 (the `ddof` argument)
- How to get all of it quickly in pandas

## Two datasets with the same mean

Here are two illustrative sets of six delivery times in minutes:

```python
import numpy as np, pandas as pd

a = pd.Series([48, 49, 50, 50, 51, 52])
b = pd.Series([20, 35, 50, 50, 65, 80])
print(a.mean(), b.mean())        # 50.0 50.0
```

Both average 50. Let's see how they differ.

## Range

The **range** is maximum minus minimum: 4 minutes for A and 60 minutes for B. It is simple and easy to explain, but it depends only on the two most extreme values, so a single outlier can distort it.

## Variance and standard deviation

The **variance** answers: on average, how far is each value from the mean, squared? The steps are: subtract the mean from each value (the *deviation*), square each deviation so negatives don't cancel positives, add them up, and divide by a count. The **standard deviation** is the square root of the variance, which puts the answer back in the original units (minutes, dollars), so it is far easier to interpret.

```python
print(a.std(), b.std())          # 1.41  21.21 (rounded)
```

A has a standard deviation of about 1.41 minutes; B has about 21.21 minutes. As a loose rule of thumb, many values fall within one standard deviation of the mean, though how many depends on the shape of the distribution (a topic for Lesson 5 and Chapter 3).

## Why divide by n minus 1?

Which count you divide by is the most common source of confusion. There are two versions:

- **Population** variance divides by n. Use it when you truly have every value in the group you care about.
- **Sample** variance divides by n minus 1. Use it when your data is a *sample* and you want to estimate the population's variance.

Libraries disagree on the default, and this bites people:

```python
x = [1, 2, 3, 4]
print(np.var(x))                  # 1.25    (numpy: ddof=0)
print(np.var(x, ddof=1))          # 1.667   (sample version)
print(pd.Series(x).var())         # 1.667   (pandas: ddof=1)
```

numpy divides by n unless you pass `ddof=1`; pandas divides by n minus 1 by default. Why n minus 1? A sample's values sit closer to their *own* mean than to the true population mean, so dividing by n systematically underestimates the spread. A quick simulation shows it: we draw 100,000 samples of 5 values from a distribution whose true variance is 100 and average the estimates.

```python
rng = np.random.default_rng(0)
data = rng.normal(loc=0, scale=10, size=(100000, 5))
print(data.var(axis=1, ddof=0).mean())   # about 80.2
print(data.var(axis=1, ddof=1).mean())   # about 100.3
```

Dividing by n lands near 80 (too low); dividing by n minus 1 lands near the true 100. (This is called Bessel's correction.)

## Quartiles and the IQR

The **interquartile range** is the 75th percentile minus the 25th percentile: the spread of the middle half of the data. Like the median, it is robust to outliers.

```python
print(a.quantile(.75) - a.quantile(.25))   # 1.5
print(b.quantile(.75) - b.quantile(.25))   # 22.5
```

`Series.describe()` prints count, mean, standard deviation, min, the quartiles, and max in one call, and is usually your first look at a numeric column.

## Coefficient of variation

To compare spread across different units or scales, divide the standard deviation by the mean. For A that gives about 0.028 and for B about 0.424. This **coefficient of variation** is meaningful mainly for ratio-scale data with a positive mean.

## Choosing a measure

- Symmetric data, mean as your center: use the **standard deviation**.
- Skewed data or outliers, median as your center: use the **IQR**.
- A quick sanity check or a plain-language description: the **range**.

## Recap

Spread tells you how much to trust a center. The standard deviation is in the original units; the IQR is robust; and in code, watch the `ddof` default. Next, we look at the overall *shape* of a distribution.
