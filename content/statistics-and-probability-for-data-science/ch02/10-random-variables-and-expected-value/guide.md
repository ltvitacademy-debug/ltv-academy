# Random Variables & Expected Value

So far we have talked about events: "the dice sum to 7," "the customer churns." Data science works with numbers, such as revenue per customer, orders per week, and days until a delivery arrives. A **random variable** connects the two: it assigns a number to each outcome of a chance process. This lesson introduces random variables, their expected value and variance, and finishes Chapter 2 by showing how probability turns into an average you can reason about and simulate.

## What you'll learn

- What a random variable is, and the difference between discrete and continuous ones
- The probability mass function (pmf) and how to compute expected value and variance from it
- Useful rules: linearity of expectation and variance of sums
- How to use expected value to make a decision, and its limits

## Random variables

A **random variable** X is a numerical quantity whose value depends on the outcome of a random process. "The number of orders a customer places next week" is one. So is "the sum of two dice" or "tomorrow's delivery time in minutes." Capital letters like X name the variable; lowercase x names a specific value it might take.

- A **discrete** random variable takes countable values (0, 1, 2, ...). Its distribution is a **probability mass function (pmf)** listing P(X = x) for each value. The probabilities are all at least 0 and sum to 1.
- A **continuous** random variable can take any value in a range (delivery time, weight). Any single exact value has probability 0; instead a **probability density function (pdf)** describes the distribution, and probabilities are *areas under the curve* over intervals. We meet the important continuous distributions in Chapter 3.

## A pmf in Python

Suppose X is the number of orders a customer places in a week, with this illustrative distribution:

| x | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| P(X = x) | 0.30 | 0.35 | 0.20 | 0.10 | 0.05 |

The probabilities sum to 1. In numpy:

```python
import numpy as np
x = np.array([0, 1, 2, 3, 4])
p = np.array([.30, .35, .20, .10, .05])
```

## Expected value

The **expected value** (or mean) of X, written E[X] or the Greek letter mu, is each value weighted by its probability:

**E[X] = sum of x times P(X = x)**

```python
ev = (x * p).sum()
print(ev)        # 1.25
```

E[X] = 1.25 orders per week. Notice that 1.25 is not a value X can actually take. Expected value is a long-run average, not a prediction for any single customer, and not necessarily the "typical" or most likely outcome (here the single most likely value is 1).

## Variance and standard deviation

The **variance** is the expected squared distance from the mean, computed with the same weighting:

**Var(X) = sum of (x - mu) squared times P(X = x)**

```python
var = ((x - ev) ** 2 * p).sum()
print(var, var ** 0.5)     # 1.2875  1.1347
```

The standard deviation is about 1.13 orders. These match the descriptive statistics from Chapter 1; the difference is that here they describe the *probability model* rather than a sample of data. `scipy.stats.rv_discrete(values=(x, p))` wraps a pmf and gives `.mean()`, `.var()`, `.std()`, `.pmf(2)` (0.2), and `.cdf(2)` (0.85, the chance of 2 orders or fewer).

## Expected value is the long-run average

Simulate customers by drawing from this pmf:

```python
rng = np.random.default_rng(5)
s = rng.choice(x, size=100000, p=p)
print(s.mean(), s.var())     # 1.25298  1.29474
```

The simulated mean and variance land close to 1.25 and 1.2875. Drawing more shows convergence: in our run, batches of 10, 1,000, and 100,000 draws had means of 1.1, 1.22, and 1.24715. This is the law of large numbers from Lesson 7 at work.

## Rules you will use constantly

- **Linearity**: E[aX + b] = a E[X] + b. If each order brings 40 dollars of revenue and there is a 5 dollar weekly fee, revenue R = 40X - 5 has expected value 40(1.25) - 5 = 45. We can confirm it:

```python
rev = 40 * x - 5
print((rev * p).sum(), 40 * ev - 5)     # 45.0  45.0
```

- **Sum of expectations**: E[X + Y] = E[X] + E[Y], *always*, even if X and Y are dependent. For one die, E = 3.5, so two dice sum to an expected 7.
- **Sum of variances**: Var(X + Y) = Var(X) + Var(Y) only if X and Y are independent. Simulating two independent customers gave a variance of the sum of about 2.575, matching 2 x 1.2875 = 2.575.

## Decisions with expected value

A raffle ticket costs 5 dollars and has a 1-in-30 chance of winning a 100-dollar prize. Expected net gain: 100 x (1/30) - 5 = -1.67 dollars per ticket. Simulating a million tickets gave an average of -1.6752. On average you lose money, which is why a business running the raffle profits.

Expected value is a useful guide for repeated decisions, such as ad campaigns, pricing, and fraud review. It has limits. It ignores *risk*: two options with the same expected value can have very different spread. It also assumes you can play many times; a one-shot bet with a small chance of ruin is not judged by its average alone. And E[X] is only as good as the probabilities you plug in, which in real work are estimated from data.

## Recap

A random variable turns outcomes into numbers. A pmf (discrete) or pdf (continuous) describes it; the expected value is the probability-weighted average, and the variance measures its spread. Linearity makes expected values easy to combine, and simulation confirms them. Chapter 3 is next, starting with the standard discrete distributions that show up again and again.
