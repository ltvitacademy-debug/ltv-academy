# Common Discrete Distributions

In the last lesson you met random variables and expected value. Now we meet the small family of distributions that show up again and again whenever you count things: orders returned, tickets received, visitors who convert. A distribution is just a rule that says how likely each possible outcome is. For a discrete variable, that rule is called the probability mass function, or PMF, and it lists a probability for every whole-number outcome.

All numbers below are illustrative, and every snippet was run with numpy 1.23 and scipy 1.9.

## What you'll learn

- How to recognize a Bernoulli, binomial, Poisson, or geometric situation
- What the parameters of each distribution mean in plain language
- How to use scipy.stats for `pmf`, `cdf`, and `sf` (the upper tail)
- How to check a formula against a simulation
- The assumptions that must hold, and what breaks when they don't

## Bernoulli: one yes/no trial

A Bernoulli variable has two outcomes, 1 (success) and 0 (failure), with success probability p. One customer either returns an order or does not. Its mean is p and its variance is p(1 − p).

```python
from scipy import stats
b = stats.bernoulli(0.3)
print(b.mean(), round(b.var(), 2))   # 0.3 0.21
```

## Binomial: count the successes in n trials

Repeat a Bernoulli trial n times and count the successes. That count is binomial with parameters n and p. Suppose 10 orders ship today and each has a 30% chance of being returned.

```python
binom = stats.binom(10, 0.3)
print(round(binom.pmf(3), 4))   # 0.2668
print(round(binom.cdf(3), 4))   # 0.6496
print(round(binom.sf(4), 4))    # 0.1503
```

Read these carefully. `pmf(3)` is the chance of exactly 3 returns. `cdf(3)` is the chance of 3 or fewer. `sf(4)` is the survival function, the chance of more than 4, so it answers "5 or more returns" at about 15%. The mean is n × p = 3.

The binomial makes two assumptions: the trials are independent, and p is the same every time. If returns cluster (one bad batch ruins several orders), the real spread will be wider than the binomial predicts.

## Check it by simulation

Never trust a formula you cannot verify. Simulate 100,000 days and compare.

```python
import numpy as np
rng = np.random.default_rng(42)
sim = rng.binomial(10, 0.3, size=100_000)
print(round((sim == 3).mean(), 4))   # 0.2679
```

The simulated 0.2679 sits close to the exact 0.2668. It will never match exactly, because a simulation carries random noise. We use this habit heavily later in the course.

## Poisson: events per unit of time

When you count events in a fixed window and they arrive independently at a steady average rate, use the Poisson distribution with a single parameter, the rate lambda. Say a help desk averages 4 tickets per hour.

```python
pois = stats.poisson(4)
print(round(pois.pmf(0), 4))   # 0.0183
print(round(pois.pmf(4), 4))   # 0.1954
print(round(pois.sf(7), 4))    # 0.0511
```

A silent hour happens under 2% of the time, and 8 or more tickets in an hour happens about 5% of the time. A distinctive Poisson feature: mean and variance are both equal to lambda. If your real count data has a variance far above its mean (called overdispersion), Poisson is the wrong model.

Poisson is also the limit of a binomial with huge n and tiny p. Compare `stats.binom(1000, 0.004).pmf(4)` at 0.1958 with `stats.poisson(4).pmf(4)` at 0.1954.

## Geometric: trials until the first success

If each visitor converts with probability 0.2, how many visitors until the first conversion? That is geometric.

```python
geo = stats.geom(0.2)
print(round(geo.pmf(3), 4))   # 0.128
print(geo.mean())             # 5.0
```

The first conversion lands on visitor 3 about 12.8% of the time, and on average you wait 1/p = 5 visitors.

## Picking the right one

Ask three questions. Is it one trial or many? Are you counting successes out of a known n (binomial), counting events in a window with no fixed n (Poisson), or waiting for the first success (geometric)? Then check independence honestly.

## Recap

Bernoulli is one yes/no trial. Binomial counts successes in n trials. Poisson counts events in a window. Geometric counts trials to the first success. scipy gives you `pmf`, `cdf`, and `sf`, and a quick simulation confirms your reading.
