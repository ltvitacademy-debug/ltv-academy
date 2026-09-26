# p-Values & Statistical Significance

The p-value is the most reported and most misunderstood number in statistics. Studies have found that many working researchers, and plenty of textbooks, describe it incorrectly. As a data scientist you will be handed p-values constantly and asked to say what they mean, so this lesson is about being precise.

## What you'll learn

- The exact definition of a p-value
- What a p-value is NOT (the three most common misreadings)
- How a significance level (alpha) turns a p-value into a decision
- Why p-values from true nulls are spread evenly between 0 and 1
- Why "statistically significant" is not the same as "important"

## The definition

> The p-value is the probability of seeing a result at least as extreme as the one you observed, **assuming the null hypothesis is true** (and the test's other assumptions hold).

Every word matters. It is a statement about the data given the null, not about the null given the data. In Lesson 20 the permutation test gave 0.0343. A classical t-test on the same simulated data gives nearly the same answer:

```python
import numpy as np
from scipy import stats
rng = np.random.default_rng(42)
old = rng.normal(52, 15, 40).round(2)
new = rng.normal(58, 15, 40).round(2)
t, p = stats.ttest_ind(new, old,
                       equal_var=False)
print(round(t, 3), round(p, 4))
# 2.151 0.0346
```

## What a p-value is NOT

A p-value of 0.035 does **not** mean:

- **"There is a 3.5% chance the null is true."** The p-value assumes the null is true; it can't also be the probability of it. Getting the probability of a hypothesis needs Bayes' theorem (Lesson 9) and a prior.
- **"There is a 96.5% chance the effect is real."** Same error, flipped.
- **"The effect is large or important."** The p-value mixes effect size and sample size, so it says nothing about magnitude on its own.

It also isn't the probability that you'd get the same result if you repeated the experiment.

## Alpha: turning p into a decision

Before running the test, choose a **significance level, alpha**, most often 0.05. If p is below alpha, you call the result "statistically significant" and reject the null. The 0.05 threshold is a convention, not a law of nature; some fields use 0.01 or stricter, and the right choice depends on how costly a false alarm is. Report the actual p-value, not just "p < 0.05".

## What p-values look like when nothing is going on

Run an "A/A test": both groups come from the same population, so the null is true. Repeat it 5,000 times and collect the p-values:

```python
ps = np.empty(5000)
for i in range(5000):
    a = rng.normal(55, 15, 40)
    b = rng.normal(55, 15, 40)
    ps[i] = stats.ttest_ind(
        a, b, equal_var=False).pvalue
print((ps < 0.05).mean())   # 0.0488
print((ps < 0.50).mean())   # 0.5
print((ps > 0.95).mean())   # 0.0536
```

When the null is true, p-values are spread roughly evenly between 0 and 1. About 5% fall below 0.05 and about 5% above 0.95. That is exactly what alpha = 0.05 promises: a 5% false-alarm rate when nothing is going on. It also shows that one significant result out of many attempts is not surprising, a problem Lesson 26 tackles.

## Significant is not the same as important

Now the opposite scenario: a real but tiny difference (0.3 dollars on a 55 dollar order) and 200,000 customers per group:

```python
a = rng.normal(55.0, 15, 200000)
b = rng.normal(55.3, 15, 200000)
r = stats.ttest_ind(b, a,
                    equal_var=False)
print(round(b.mean() - a.mean(), 3))  # 0.377
print(r.pvalue)                # 1.8e-15
print(round((b.mean() - a.mean()) / 15, 3))
# 0.025
```

The p-value is astronomically small, yet the difference is about 0.025 standard deviations, well under a dollar. With enough data, any tiny difference becomes "significant". Always pair a p-value with an **effect size** and a confidence interval (Lesson 18), and ask whether the size of the effect matters to the business.

## Recap

A p-value is the probability of data at least this extreme if the null were true. It is not the probability the null is true, and not a measure of effect size. Alpha (often 0.05) is a decision threshold chosen in advance. When the null is true, p-values are uniform, so 5% land under 0.05 by luck. Large samples can make trivial effects significant, so report effect sizes alongside p. Next: the two ways a decision can go wrong, and how sample size buys you power.
