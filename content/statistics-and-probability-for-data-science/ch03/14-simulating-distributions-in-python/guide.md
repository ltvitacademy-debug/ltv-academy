# Simulating Distributions in Python

You now know the main distributions. This lesson shows how to draw random data from them with numpy, and why that skill is so valuable. Simulation lets you build fake datasets to test code, answer probability questions you cannot solve by hand (the Monte Carlo method), and check that your intuition about a formula is right. It underpins everything in the sampling chapter that follows.

Figures are illustrative. All snippets were run with numpy 1.23 and pandas 1.4. Your numbers will match ours only if you use the same seeds and the same order of calls.

## What you'll learn

- How to create a reproducible random generator with `default_rng`
- How to draw from the distributions from lessons 11 to 13
- How to build a realistic fake DataFrame
- How to answer questions with Monte Carlo simulation
- How the number of draws affects accuracy

## Reproducible randomness

Modern numpy uses a generator object. Create it with a seed and every run gives the same numbers, which makes results reproducible for teammates and for your future self.

```python
import numpy as np
rng = np.random.default_rng(2024)
print(rng.integers(1, 7, size=5))   # [2 5 1 2 2]
rng = np.random.default_rng(2024)
print(rng.integers(1, 7, size=5))   # [2 5 1 2 2]
```

Same seed, same dice. Note that `integers(1, 7)` excludes the upper bound, so it simulates a six-sided die. The seed makes the numbers repeatable, not truly random, and different numpy versions can produce different streams from the same seed, so record your version if exact repeatability matters.

## Drawing from each distribution

The generator has a method for each family: `rng.binomial(n, p)`, `rng.poisson(lam)`, `rng.normal(mean, sd)`, `rng.exponential(scale)`, `rng.lognormal(mean, sigma)`, `rng.uniform(low, high)`. Let us build a fake customer table:

```python
import pandas as pd
rng = np.random.default_rng(42)
n = 10_000
df = pd.DataFrame({
    "visits": rng.poisson(3, n),
    "order_value": rng.lognormal(3.5, 0.6, n).round(2),
    "returned": rng.binomial(1, 0.3, n),
    "delivery_min": rng.normal(40, 5, n).round(1),
})
print(df.describe().round(2).loc[["mean", "std", "min", "max"]])
```

Output:

```
      visits  order_value  returned  delivery_min
mean    3.01        39.04      0.30         40.04
std     1.75        26.04      0.46          5.03
min     0.00         3.37      0.00         22.40
max    11.00       668.04      1.00         58.10
```

Compare against the settings we chose: the Poisson mean is close to 3, the return rate close to 0.30, and delivery time close to a mean of 40 and sd of 5. Note the huge maximum order value of 668, which is the log-normal's long tail at work. A fake table like this is great for practicing pandas or testing a pipeline before real data arrives.

## Monte Carlo: answer questions by simulating

Monte Carlo means estimating a probability by repeating a random experiment many times and counting. What is the chance two dice sum to 10 or more? The exact answer is 6/36 = 0.1667.

```python
rng = np.random.default_rng(1)
rolls = rng.integers(1, 7, size=(100_000, 2)).sum(axis=1)
print(round((rolls >= 10).mean(), 4))   # 0.1653
```

Monte Carlo pays off when no simple formula exists. Suppose a shop processes 50 orders a day, order values are log-normal, and 30% are returned (lost revenue). How risky is daily kept revenue?

```python
rng = np.random.default_rng(5)
days = 20_000
vals = rng.lognormal(3.5, 0.6, size=(days, 50))
returned = rng.random((days, 50)) < 0.3
kept = np.where(returned, 0, vals).sum(axis=1)
print(round(kept.mean(), 1), round(np.percentile(kept, 5), 1))
# 1389.0 1073.3
print(round((kept < 1000).mean(), 4))   # 0.0176
```

Average kept revenue is about 1,389, a bad day (5th percentile) is about 1,073, and roughly 1.8% of days fall below 1,000. Each row is one simulated day, and this vectorized style is far faster than a Python loop. The answer is only as good as your assumptions: if returns really cluster, this model understates the risk.

## More draws, more accuracy

Simulation error shrinks as you draw more, but slowly. Here we estimate P(X = 3) for a binomial with n = 10 and p = 0.3, whose exact value is 0.2668:

```python
rng = np.random.default_rng(3)
for m in (10, 100, 1000, 100_000):
    x = rng.binomial(10, 0.3, size=m)
    print(m, round((x == 3).mean(), 4))
# 10 0.3
# 100 0.28
# 1000 0.277
# 100000 0.2658
```

With 10 draws you are far off; with 100,000 you are within about 0.001. Because the error shrinks roughly with the square root of the number of draws, quadrupling the draws only halves the noise.

## Recap

Seed a `default_rng`, draw from the distribution that matches your story, and build fake data or run Monte Carlo experiments with vectorized numpy. Simulation gives approximate answers with a controllable error, and it is only as trustworthy as the assumptions inside it.
