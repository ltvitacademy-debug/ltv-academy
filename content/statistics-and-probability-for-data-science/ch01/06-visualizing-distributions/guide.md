# Visualizing Distributions

Numbers like the mean and standard deviation compress a whole dataset into a few values. A chart shows you everything at once: skew, peaks, gaps, and outliers. In this lesson you will learn the three workhorse charts for a numeric variable (histogram, box plot, and density plot), how to read them, and the traps that make them misleading. It wraps up Chapter 1.

## What you'll learn

- How to read a histogram, a box plot, and a density (KDE) plot
- What the "1.5 times IQR" rule for outliers actually says
- How bin width changes what a histogram shows
- Which chart suits which question, including categorical data

## Setup

We reuse the illustrative right-skewed order values from Lesson 5:

```python
import matplotlib.pyplot as plt
import numpy as np, pandas as pd

rng = np.random.default_rng(7)
x = pd.Series(rng.exponential(30, 5000))
```

## Three views of the same data

```python
fig, ax = plt.subplots(
    1, 3, figsize=(12, 3.5))
ax[0].hist(x, bins=30)
ax[0].set_title("Histogram")
ax[1].boxplot(x, vert=False)
ax[1].set_title("Box plot")
x.plot.kde(ax=ax[2])
ax[2].set_title("Density (KDE)")
plt.savefig("shapes.png", dpi=120)
```

![Histogram, box plot and density plot of the same right-skewed data](/courses/statistics-and-probability-for-data-science/ch01/06-visualizing-distributions/shapes.png)

*Output of the code above (illustrative data).*

**Histogram.** The values are divided into equal-width bins and each bar's height is the count in that bin. It shows shape directly: here a tall spike near zero with a long right tail. It is the default first chart for a numeric variable.

**Box plot.** The box spans the middle half of the data (Q1 to Q3, so its width is the IQR), the orange line is the median, the "whiskers" reach toward the extremes, and individual circles beyond the whiskers are flagged as outliers. It shows center, spread, and skew compactly, and is excellent for comparing several groups side by side, but it hides the number of peaks.

**Density plot.** A smoothed version of the histogram called a *kernel density estimate* (KDE). It is nice for comparing shapes, but notice the honest flaw in the picture above: the curve leaks below zero even though no order can be negative. Smoothing does not know about limits in your data, so do not read the leaked tail as real.

## The outlier rule behind box plots

Matplotlib's default box plot draws whiskers out to the most extreme points within 1.5 times the IQR of the box, and plots anything beyond as an individual point. You can compute the same fence yourself:

```python
q1, q3 = x.quantile([.25, .75])
iqr = q3 - q1
fence = q3 + 1.5 * iqr
print(round(fence, 2), (x > fence).sum())   # 87.82 283
```

Here the upper fence is 87.82, and 283 of the 5,000 values (about 5.7 percent) lie above it. That is a lot of "outliers," and it tells you something important: for a right-skewed variable, the 1.5 times IQR rule flags many perfectly legitimate large values. The rule is a **flag for a look**, not a verdict. Never delete points just because a box plot drew a circle; investigate them first.

## Bin width matters

A histogram's story depends on how many bins you use. With 3 bins, almost everything falls into one bar (4,759 of 5,000 values in the tallest bar) and the shape is invisible. With 300 bins, the tallest bar holds only 171 values and the outline gets jagged and noisy. Thirty bins worked well here. There are automatic rules (`bins="auto"` in numpy and matplotlib), but always try more than one setting before you trust a shape, especially a small bump that might be noise.

## Choosing a chart

- **One numeric variable, want the shape**: histogram (or density).
- **Compare a numeric variable across groups**: side-by-side box plots.
- **Categorical variable**: a bar chart of counts, for example `df["region"].value_counts().plot.bar()`.
- **Avoid** pie charts for precise comparison, and always label axes and units.

## Recap

Histograms show shape, box plots summarize center, spread, and outliers, and density plots smooth the outline. Bin width and smoothing choices change what you see, and the outlier rule only flags candidates. With Chapter 1 done, you can describe any single variable honestly. In Chapter 2, we build the foundation for everything that follows: probability.
