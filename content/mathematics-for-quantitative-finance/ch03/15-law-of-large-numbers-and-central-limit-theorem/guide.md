# Law of Large Numbers & Central Limit Theorem

Every statistical estimate you compute from market data — a mean return, a volatility, a Sharpe ratio — is built from a finite sample standing in for an unknown true distribution. Two theorems justify why that's a reasonable thing to do at all: the **Law of Large Numbers (LLN)**, which says the sample mean eventually gets the right answer, and the **Central Limit Theorem (CLT)**, which says *how* it gets there and how fast. Together they are the most-used results in all of quantitative finance.

## What you'll learn

- The weak and strong Law of Large Numbers, and what "converges" means in each case
- The Central Limit Theorem's exact statement, and why it holds even when the underlying data isn't normal
- The standard error of the mean, σ/√n, and why more data has diminishing returns
- A worked simulation showing non-normal data becoming approximately normal once averaged
- Where the CLT breaks: infinite-variance, heavy-tailed data

## The Law of Large Numbers

Let X₁, X₂, …, Xₙ be i.i.d. (independent and identically distributed) random variables with finite mean μ, and let X̄ₙ = (X₁ + … + Xₙ)/n be the sample mean. The **Weak LLN** states that for any ε > 0,

P(|X̄ₙ − μ| > ε) → 0 as n → ∞

— the probability that the sample mean strays far from the true mean shrinks to zero. (This follows from Chebyshev's inequality once variance is finite: P(|X̄ₙ − μ| ≥ ε) ≤ Var(X̄ₙ)/ε² = σ²/(nε²) → 0.) The **Strong LLN** makes a stronger claim: X̄ₙ → μ *almost surely* — with probability 1, the sequence of sample means itself converges to μ, not merely the probability of being far away. In finance, the LLN is the entire justification for estimating an unknown expected return or volatility by averaging historical observations: with enough data, the sample average gets arbitrarily close to the truth.

## The Central Limit Theorem

The LLN says X̄ₙ converges to μ, but says nothing about the *shape* of the remaining randomness. The CLT fills that gap. For i.i.d. X₁, …, Xₙ with finite mean μ and finite variance σ², as n → ∞:

√n · (X̄ₙ − μ) / σ → N(0, 1) in distribution

Equivalently, for large n, X̄ₙ is approximately normal:

X̄ₙ ≈ N(μ, σ²/n)

The remarkable part: this holds **regardless of the distribution of the individual Xᵢ**, as long as the variance is finite. Daily returns can be skewed, fat-tailed, or bounded — the *average* of enough of them still looks approximately normal. This is why normal approximations show up so pervasively in finance even though individual asset returns clearly are not normal.

## The standard error of the mean

The quantity σ/√n is the **standard error of the mean** — the standard deviation of the sampling distribution of X̄ₙ itself. It shrinks with the square root of the sample size, not linearly: quadrupling your sample size only halves your standard error. This is why estimating a mean return precisely from historical daily data is so hard — even years of daily returns barely move the standard error, because volatility (the numerator) is large relative to the mean (what you're trying to pin down), and you need roughly 4× the data to halve the uncertainty.

## A worked example in code

```python
import numpy as np
from scipy import stats

rng = np.random.default_rng(31)

# Individual draws: a strongly skewed, non-normal distribution (exponential)
def sampling_dist_of_mean(n, trials=20_000):
    draws = rng.exponential(scale=1.0, size=(trials, n))
    return draws.mean(axis=1)

for n in (1, 5, 30, 200):
    means = sampling_dist_of_mean(n)
    print(f"n={n:4d}  mean={means.mean():.3f}  std={means.std():.3f}  "
          f"theory_std={1/np.sqrt(n):.3f}  skew={stats.skew(means):+.3f}")
```

With n=1 the sampling distribution is just the raw exponential — skewness around 2, far from normal. By n=30 or n=200, the skewness has collapsed toward 0 and the standard deviation matches 1/√n almost exactly: the CLT at work, turning a skewed building block into an approximately normal average.

## Where the CLT breaks

The classical CLT requires **finite variance**. Distributions with infinite variance (certain heavy-tailed or Pareto-like distributions with tail index below 2) don't converge to a normal when averaged — they converge to a different family, the stable distributions, often with heavier tails than the normal. This matters whenever a return series is suspected of having extremely heavy tails: averaging doesn't rescue you the way the classical CLT promises.

## Key terms

| Term | Meaning |
|---|---|
| i.i.d. | Independent and identically distributed |
| Weak LLN | X̄ₙ converges to μ in probability |
| Strong LLN | X̄ₙ converges to μ almost surely |
| Central Limit Theorem (CLT) | √n(X̄ₙ − μ)/σ converges in distribution to N(0,1) |
| Standard error of the mean | σ/√n; the spread of the sampling distribution of X̄ₙ |
| Stable distribution | The limiting family when the CLT's finite-variance assumption fails |

## Recap

The LLN guarantees averages find the truth eventually; the CLT tells you the average's own distribution is approximately normal, with a standard error that shrinks only as √n. Next up, Lesson 16: Characteristic & Moment-Generating Functions, the tools that make results like the CLT provable in the first place.
