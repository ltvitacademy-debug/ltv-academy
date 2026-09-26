# Type I & Type II Errors and Power

A hypothesis test is a decision, and every decision made under uncertainty can be wrong in two different ways. Understanding those two errors, and the concept of **power**, is what lets you plan an experiment properly instead of running it and hoping. It also explains a common frustration: "we tested it and found nothing", when the test never had a fair chance of finding anything.

## What you'll learn

- The two kinds of wrong decision, Type I and Type II
- How alpha, beta and power relate
- What drives power: sample size, effect size, noise and alpha
- How to estimate power by simulation in Python
- How to compute the sample size you need before running a test

## Two ways to be wrong

Reality either has an effect or it doesn't, and your test either rejects the null or doesn't. That gives four outcomes:

| | Null is actually true (no effect) | Effect is real |
|---|---|---|
| **Reject H0** | Type I error (false alarm) | Correct: a detection |
| **Don't reject H0** | Correct | Type II error (a miss) |

- A **Type I error** means claiming an effect that isn't there. Its probability is **alpha**, which you set (often 0.05).
- A **Type II error** means missing an effect that is there. Its probability is **beta**.
- **Power = 1 - beta**: the probability of detecting a real effect of a given size. A common target is 80%.

Neither error is "worse" in general. Approving a broken checkout page is a Type I error; failing to ship a page that would have raised revenue is a Type II error. Which one costs more depends on the business.

## Estimating power by simulation

You can measure power by brute force: simulate many experiments in which the effect is real, run the test on each, and count how often it rejects. Here a real 7.5-dollar lift on a 55-dollar average order (a standard deviation of 15) is tested using 4,000 simulated experiments per setting:

```python
import numpy as np
from scipy import stats
rng = np.random.default_rng(7)

def power(n, diff, sd=15, runs=4000):
    hits = 0
    for _ in range(runs):
        a = rng.normal(55, sd, n)
        b = rng.normal(55+diff, sd, n)
        p = stats.ttest_ind(b, a, equal_var=False).pvalue
        hits += p < 0.05
    return hits / runs

print(power(30, 0))
for n in (30, 64, 100):
    print(n, power(n, 7.5))
```

Output:

```
0.05525
30 0.48175
64 0.80625
100 0.93925
```

The first line sets the effect to zero, so it estimates the Type I error rate: about 5%, as promised. With 30 customers per group, the real 7.5-dollar lift is detected only about 48% of the time, which is worse than a coin flip. You need about 64 per group to reach 80%.

## What drives power

1. **Sample size:** more data narrows the standard error. This is the lever you control most.
2. **Effect size:** big effects are easier to detect than small ones.
3. **Noise:** less variability in the metric means more power.
4. **Alpha:** a looser alpha gives more power but more false alarms.

## Planning sample size

Rather than simulate every time, a standard normal-approximation formula gives the sample size per group for a two-group comparison. It uses the standardized effect size **d** (the difference divided by the standard deviation):

```python
def n_per_group(d, alpha=0.05, pw=0.8):
    za = stats.norm.ppf(1 - alpha / 2)
    zb = stats.norm.ppf(pw)
    return 2 * ((za + zb) / d) ** 2

for d in (0.2, 0.5, 0.8):
    print(d, round(n_per_group(d)))
```

Output: `0.2 392`, `0.5 63`, `0.8 25`. Small effects (d = 0.2) need roughly 16 times the sample of large ones (d = 0.8). This is an approximation; dedicated power calculators use the t distribution and give values a fraction higher.

## Why this matters

An underpowered study has two problems: it often misses real effects, and the "significant" results it does produce tend to overstate the true effect. Do the sample-size calculation **before** collecting data, using the smallest effect you would care about, and be wary of interpreting a non-significant result from a small sample as "no effect".

## Recap

Type I errors (false alarms, probability alpha) and Type II errors (misses, probability beta) are the two ways a test can be wrong. Power, 1 minus beta, is the chance of detecting a real effect and depends on sample size, effect size, noise and alpha. Simulate power or use the formula to size an experiment before you run it. Next: the workhorse tests, starting with the t-test.
