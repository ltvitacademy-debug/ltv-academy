# Standard Error

Last lesson showed that sample means form their own distribution, with spread equal to sigma over the square root of n. That spread has a name: the **standard error** (SE). It answers the most practical question in estimation: if I repeated this study, how far would my estimate typically move? A small standard error means your sample mean is a reliable guide to the population mean. A large one means treat it with suspicion.

Data is simulated and illustrative. Code was run with numpy 1.23 and scipy 1.9; run the blocks in order in one session so the seeded random numbers line up with the printed output.

## What you'll learn

- The difference between standard deviation and standard error
- How to compute the standard error of a mean, in numpy and with scipy
- How the standard error shrinks as the sample grows
- The standard error of a proportion and of a difference in means
- What the standard error does not capture

## Standard deviation versus standard error

These two are constantly confused. The **standard deviation** describes how spread out individual observations are. The **standard error** describes how spread out a statistic, such as the sample mean, would be across repeated samples. Standard deviation is a property of your data; standard error is a property of your estimate. The standard error of the mean is:

SE = s / sqrt(n)

where s is the sample standard deviation and n is the sample size. In the population version of the formula we would use sigma, which we usually do not know, so we plug in s.

## Computing it

We create a simulated population of 200,000 orders and draw one sample of 50.

```python
import numpy as np
from scipy import stats

rng = np.random.default_rng(17)
pop = rng.lognormal(3.5, 0.6, size=200_000)
print(round(pop.mean(), 2), round(pop.std(), 2))       # 39.71 26.16

sample = rng.choice(pop, size=50, replace=False)
s = sample.std(ddof=1)
se = s / np.sqrt(len(sample))
print(round(sample.mean(), 2), round(s, 2), round(se, 2))
# 37.45 26.67 3.77
print(round(stats.sem(sample), 2))                     # 3.77
```

The sample mean is 37.45 with a standard error of 3.77. Read that as: samples of 50 from this population typically produce means within a few units of the truth, and ours is 2.3 below the true 39.71, comfortably within one standard error. `stats.sem` does the same calculation for you.

Notice `ddof=1`. It divides by n minus 1 instead of n, giving an unbiased estimate of the population's spread (26.67 versus 26.40 with `ddof=0`). Pandas' `.std()` already uses `ddof=1`, but numpy's `np.std` does not, a common trap.

## SE shrinks with sample size

```python
for n in (25, 100, 400, 1600):
    smp = rng.choice(pop, size=n, replace=False)
    print(n, round(smp.mean(), 2), round(stats.sem(smp), 2))
# 25 41.15 3.93
# 100 44.08 3.41
# 400 38.17 1.29
# 1600 38.57 0.6
```

Quadrupling the sample roughly halves the SE. The estimates themselves also bounce around, and the standard error is itself an estimate from each sample, which is why the SE at 100 (3.41) is bigger than the ideal value near 2.6. Precision costs a lot: to go from an SE of about 3.8 down to 1.0 with this data you would need roughly 711 observations (s squared over the target SE squared).

## Checking the formula by simulation

Does s over root n really match the spread of means across repeated samples? Draw 5,000 samples of 50 and find the standard deviation of their means:

```python
means = np.array([rng.choice(pop, size=50, replace=False).mean()
                  for _ in range(5000)])
print(round(means.std(), 2), round(pop.std() / np.sqrt(50), 2))
# 3.71 3.7
```

The observed spread of 3.71 agrees with the theoretical 3.70. The standard error is the standard deviation of the sampling distribution.

## Other standard errors

The idea generalizes to any statistic. For a proportion, such as 120 of 400 customers returning an order, SE = sqrt(p(1 − p) / n):

```python
p_hat = 120 / 400
se_p = np.sqrt(p_hat * (1 - p_hat) / 400)
print(p_hat, round(se_p, 4))    # 0.3 0.0229
```

That is about 2.3 percentage points. For a difference between two independent group means, the variances add:

```python
a = rng.normal(40, 5, 100); b = rng.normal(42, 5, 100)
se_diff = np.sqrt(stats.sem(a)**2 + stats.sem(b)**2)
print(round(b.mean() - a.mean(), 2), round(se_diff, 3))   # 2.0 0.698
```

A difference of 2.0 with an SE of 0.70 is nearly three standard errors from zero, an idea that leads straight into hypothesis testing.

## What the standard error does not cover

SE only measures random sampling error. It says nothing about bias: a badly collected sample can have a tiny SE and still be far from the truth. It also assumes independent observations; clustered or time-dependent data needs adjusted methods. And the formula relies on the CLT for its normal interpretation.

## Recap

Standard deviation describes individual data; standard error describes the precision of an estimate. For a mean it is s over the square root of n. It shrinks slowly with more data, applies to proportions and differences too, and ignores bias.
