# Probability Spaces & Random Variables

Chapter 2 gave you tools for structure — vectors, matrices, eigenvectors. Quantitative finance also needs tools for uncertainty: a stock's next return, the number of defaults in a bond portfolio, the time until the next trade. Every one of these is modeled as a **random variable**, and every random variable is built on top of a **probability space**. This lesson lays that foundation rigorously, so the rest of the chapter — expectation, the CLT, common distributions — rests on solid ground rather than intuition alone.

## What you'll learn

- The three-part structure of a probability space: sample space, sigma-algebra of events, and probability measure
- Kolmogorov's axioms, and why they are the minimal rules any sane notion of probability must satisfy
- What a random variable actually is: a measurable function, not just "a number that varies"
- How discrete and continuous random variables both fit under a single object, the CDF
- How to simulate and inspect simple random variables in NumPy and SciPy

## The sample space and events

The **sample space**, written Ω (omega), is the set of every possible outcome of a random experiment. For a single coin flip, Ω = {H, T}. For a fair die, Ω = {1, 2, 3, 4, 5, 6}. For a stock over the next trading day, Ω could be the set of every possible closing price.

We rarely ask about single outcomes; we ask about **events** — subsets of Ω, such as "the die shows an even number." The collection of events we are allowed to assign a probability to is called a **sigma-algebra**, F. Formally, F must contain Ω itself, be closed under complement (if A is an event, so is "not A"), and closed under countable unions (if A₁, A₂, … are events, so is their union). For a finite or countable Ω, F is usually just every subset of Ω — the power set. The technical machinery matters most for continuous spaces, where "every subset" turns out to be too large to assign probabilities consistently.

## Kolmogorov's axioms

A **probability measure** P assigns a number to every event in F, subject to three axioms laid down by Andrey Kolmogorov in 1933:

1. **Non-negativity**: P(A) ≥ 0 for every event A.
2. **Total probability**: P(Ω) = 1.
3. **Countable additivity**: for any sequence of pairwise disjoint events A₁, A₂, …, P(∪ Aᵢ) = Σ P(Aᵢ).

Everything else you already know about probability follows from these three rules: P(∅) = 0, P(Aᶜ) = 1 − P(A), monotonicity (A ⊆ B implies P(A) ≤ P(B)), and inclusion-exclusion, P(A ∪ B) = P(A) + P(B) − P(A ∩ B). A probability space is the triple (Ω, F, P) — nothing more, nothing less.

## Random variables are measurable functions

Informally, a random variable is "a number that depends on chance." Formally, a random variable X is a **function from Ω to the real numbers**, X: Ω → ℝ, with one technical requirement: it must be **measurable**, meaning that for every real number x, the set {ω ∈ Ω : X(ω) ≤ x} is itself an event in F. This requirement exists purely so that "the probability that X is at most x" is always well-defined — you cannot ask P(X ≤ x) if {X ≤ x} isn't an event you're allowed to measure.

In practice this technicality rarely gets in the way. A daily log return is a number attached to whatever the market actually does; a default count is a number attached to which of a portfolio's bonds default. The measurability condition is the formal guarantee that lets you write P(X ≤ x), E[X], and Var(X) without worrying whether those quantities even exist.

## The CDF unifies discrete and continuous

Every random variable, discrete or continuous, has a **cumulative distribution function** (CDF):

F(x) = P(X ≤ x)

The CDF is always non-decreasing, right-continuous, and satisfies lim(x→−∞) F(x) = 0 and lim(x→∞) F(x) = 1. The two cases you'll meet constantly:

- **Discrete** random variables (a trade count, a default indicator) have a **probability mass function (PMF)** p(x) = P(X = x), and F(x) = Σ_{xᵢ ≤ x} p(xᵢ) is a step function.
- **Continuous** random variables (a return, a time-to-event) have a **probability density function (PDF)** f(x) = F′(x), and F(x) = ∫_{−∞}^{x} f(t) dt. For any single point x, P(X = x) = 0 — only intervals carry probability.

## A worked example in code

```python
import numpy as np
from scipy import stats

rng = np.random.default_rng(7)

# Discrete: a fair six-sided die as a random variable on Omega = {1,...,6}
die_outcomes = rng.integers(1, 7, size=100_000)
pmf_hat = np.bincount(die_outcomes)[1:] / len(die_outcomes)
print("Empirical pmf:", np.round(pmf_hat, 3))        # ~ [0.167, 0.167, ...]

# Continuous: daily log return modeled as X ~ N(mu, sigma^2)
mu, sigma = 0.0004, 0.012
returns = rng.normal(mu, sigma, size=100_000)
F_hat_at_0 = np.mean(returns <= 0.0)                  # empirical CDF at x=0
F_true_at_0 = stats.norm.cdf(0.0, mu, sigma)
print(f"P(X<=0) empirical={F_hat_at_0:.4f} theoretical={F_true_at_0:.4f}")
```

The empirical values land close to the theoretical ones because of the Law of Large Numbers, which you'll meet formally in Lesson 15 — with enough draws, sample frequencies converge to true probabilities.

## Key terms

| Term | Meaning |
|---|---|
| Sample space (Ω) | The set of every possible outcome |
| Event | A subset of Ω that we can assign a probability to |
| Sigma-algebra (F) | The collection of events a probability measure is defined on |
| Probability measure (P) | A function on F satisfying Kolmogorov's three axioms |
| Random variable (X) | A measurable function from Ω to the real numbers |
| CDF, F(x) | P(X ≤ x); describes any random variable, discrete or continuous |
| PMF / PDF | The mass function (discrete) or density function (continuous) underlying the CDF |

## Recap

A probability space is the triple (Ω, F, P), governed by Kolmogorov's three axioms, and a random variable is a measurable function on that space whose behavior is fully described by its CDF. With this foundation in place, the next lesson, Expectation, Variance & Moments, shows how to summarize an entire distribution with a handful of numbers.
