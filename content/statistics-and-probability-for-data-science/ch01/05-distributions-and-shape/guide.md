# Distributions & Shape

A **distribution** describes which values a variable takes and how often it takes them. Center and spread are two numbers that summarize a distribution; **shape** is the rest of the story. Two variables can share the same mean and standard deviation and still look completely different. This lesson gives you the vocabulary for shape (symmetry, skew, tails, and peaks) and shows how to measure it in Python.

## What you'll learn

- What a distribution is and how to describe its shape in words
- Symmetric, right-skewed, and left-skewed distributions
- How skew shows up in the gap between mean and median
- Unimodal versus bimodal distributions, and why the mean can be misleading for the latter
- Skewness and kurtosis as numbers, and what to do about strong skew

## Describing shape in words

When you look at a histogram (we will draw them in Lesson 6), ask four questions:

1. **Symmetry**: is the left side a mirror of the right side?
2. **Skew**: does one side have a long tail? A **right-skewed** (positively skewed) distribution has a long tail toward high values, like incomes or order values: most values are small and a few are huge. A **left-skewed** distribution has a long tail toward low values, like exam scores on an easy test where most people score near the top.
3. **Peaks (modality)**: one peak (unimodal), two (bimodal), or more?
4. **Tails**: are extreme values rare or surprisingly common?

## Skew and the mean-median gap

Recall from Lesson 3 that the mean is pulled by extreme values while the median is not. That gives a handy rule of thumb: in a right-skewed distribution the mean tends to be *larger* than the median; in a left-skewed distribution, *smaller*. Let's generate three illustrative datasets with numpy and measure them:

```python
import numpy as np, pandas as pd

rng = np.random.default_rng(7)
sym   = pd.Series(rng.normal(50, 10, 5000))
right = pd.Series(rng.exponential(30, 5000))
left  = pd.Series(100 - rng.exponential(10, 5000))

for name, x in [("symmetric", sym),
                ("right-skewed", right),
                ("left-skewed", left)]:
    print(name, round(x.mean(), 1),
          round(x.median(), 1), round(x.skew(), 2))
```

Output from running this:

```
symmetric 49.8 49.7 0.03
right-skewed 30.3 21.3 1.97
left-skewed 90.0 93.0 -1.9
```

The symmetric data has mean and median almost identical and skewness near 0. The right-skewed data has a mean well above its median and a large positive skewness. The left-skewed data flips both. **Skewness** is a single number for the direction and strength of asymmetry: roughly, positive means a long right tail, negative means a long left tail, and values beyond about 1 in either direction are usually considered strongly skewed (this cutoff is a convention, not a law). Both `Series.skew()` and `scipy.stats.skew` compute it; pandas applies a small-sample correction, so the two can differ slightly on small data.

## Kurtosis: tail weight

**Kurtosis** describes how heavy the tails are compared with a normal (bell-curve) distribution. `Series.kurt()` in pandas returns *excess* kurtosis, where 0 corresponds to a normal distribution. In our run, the symmetric normal data gave about -0.03 (essentially 0), while the skewed data gave 5.87 and 4.98: heavier tails than a normal curve. Kurtosis is noisy on small samples, so treat it as a rough hint and let a chart decide.

## When the mean lies: bimodal data

Some distributions have two peaks because two different groups are mixed together, for example the delivery times of a local courier and a long-distance courier:

```python
mixed = np.concatenate([rng.normal(20, 4, 2500),
                        rng.normal(60, 4, 2500)])
s = pd.Series(mixed)
print(s.mean(), s.median())     # about 40.0  40.1
```

The mean and median both say "40," a perfectly symmetric summary. Yet a histogram shows almost nobody near 40: in our run, only 7 of 5,000 values fell between 32 and 48. Summary statistics can hide the truth here, and a bimodal shape is usually a sign that you should ask whether you are really looking at two subgroups.

## What to do about strong skew

- **Report the median** (and IQR) instead of, or alongside, the mean.
- **Transform the data.** A logarithm compresses a long right tail. In our run, `np.log1p(right).skew()` came out at about -0.47, much closer to symmetric than 1.97 (`log1p` is log of 1 plus x, safe when values can be zero). Transformations change the units, so interpret results carefully.
- **Choose methods that fit.** Many classical tests assume roughly symmetric data; later lessons cover when that matters.

## Recap

Shape completes the picture beyond center and spread: check symmetry, skew, peaks, and tails. Compare mean and median for a quick skew check, use `.skew()` and `.kurt()` for numbers, and be suspicious when a mean sits where there are no data. Next, we will draw these shapes with histograms, box plots, and more.
