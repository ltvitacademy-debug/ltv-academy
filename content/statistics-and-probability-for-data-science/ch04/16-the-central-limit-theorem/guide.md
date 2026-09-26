# The Central Limit Theorem

The central limit theorem (CLT) is the reason so much of statistics works. It says, roughly, that if you take many random samples and compute each sample's average, those averages form a bell-shaped distribution, even when the underlying data is not bell-shaped at all. This is why a method built on the normal distribution can still be trusted on skewed data like order values, provided the sample is large enough. In this lesson you will see it happen with your own eyes.

Data is simulated and illustrative. Code was run with numpy 1.23, scipy 1.9, and matplotlib.

## What you'll learn

- What the central limit theorem states, in plain language
- The sampling distribution of the mean and its predicted spread
- How to demonstrate the theorem with a simulation
- How large "large enough" really is
- When the theorem fails

## The statement

Take a population with mean mu and standard deviation sigma. Draw a random sample of n independent observations and compute its mean. Repeat many times. The collection of those sample means, called the **sampling distribution of the mean**, has three properties:

1. Its center is mu (the sample mean is unbiased).
2. Its spread is sigma divided by the square root of n.
3. As n grows, its shape approaches a normal distribution, whatever the shape of the original data.

The second point is the key to the next lesson: bigger samples give tighter averages, but the improvement follows the square root, so four times the data only halves the spread.

## Watching it happen

Let us start with a very skewed population: a million simulated order values from an exponential distribution with mean 40. It is heavily right-skewed, with lots of small orders and a few large ones. For each sample size n we draw 5,000 samples, average each one, and see what those 5,000 means look like.

```python
import numpy as np
from scipy import stats
import matplotlib.pyplot as plt

rng = np.random.default_rng(16)
pop = rng.exponential(scale=40, size=1_000_000)
print(round(pop.mean(), 2), round(pop.std(), 2), round(stats.skew(pop), 2))
# 40.04 39.99 2.0

fig, axes = plt.subplots(1, 4, figsize=(12, 3))
for ax, n in zip(axes, (1, 5, 30, 100)):
    means = rng.choice(pop, size=(5000, n)).mean(axis=1)
    print(n, round(means.mean(), 2), round(means.std(), 2),
          round(pop.std() / np.sqrt(n), 2), round(stats.skew(means), 2))
    ax.hist(means, bins=40, color="#8E1C1C")
    ax.set_title(f"n = {n}")
    ax.set_xlabel("sample mean")
fig.tight_layout()
```

The printed columns are n, the mean of the sample means, their standard deviation, the CLT prediction sigma over root n, and their skewness:

```
1 39.79 39.26 39.99 1.81
5 39.93 17.65 17.88 0.89
30 39.89 7.27 7.3 0.4
100 40.06 4.07 4.0 0.24
```

Check each claim. The mean of the means stays close to 40 at every n (center unchanged). The simulated standard deviation matches the predicted sigma over root n: at n = 30 we see 7.27 against 7.30. And the skewness falls from about 1.8 at n = 1 toward 0.24 at n = 100, meaning the shape is becoming symmetric, which the histograms show.

## How big is "large enough"?

A common textbook rule says n of at least 30, but that is only a rule of thumb. For mildly skewed data, 30 is plenty. For very skewed data, such as our exponential, n = 30 still shows some leftover skew (0.4 above), and for extremely skewed data you may need hundreds. A practical check: if you can, simulate or bootstrap (lesson 19) and look at the result.

Does a normal approximation at n = 30 still give sensible coverage? We can test whether sample means land within 1.96 predicted standard deviations of the truth, which a normal would put at 95%:

```python
means = rng.choice(pop, size=(5000, 30)).mean(axis=1)
se = pop.std() / np.sqrt(30)
print(round((abs(means - pop.mean()) < 1.96 * se).mean(), 4))   # 0.9518
```

About 95.2% of the means land inside that band, so the approximation is decent even for this skewed data.

## When the CLT does not help

The theorem needs independent observations and a finite variance. Extremely heavy-tailed data, such as the Cauchy distribution, has no finite variance, and its sample means never settle down. Strong dependence between observations, such as time series with autocorrelation or clustered customers, also breaks the simple version. And the CLT is about averages; it says nothing about individual values, which remain skewed.

## Recap

Sample means form a distribution centered on the true mean, with spread sigma over the square root of n and a shape that tends toward normal. That is why averages are so well behaved, and why the next lesson can put a number on how far a sample mean is likely to stray.
