# Random Walks

Chapter 5 was about finding the best fixed point given a function. Chapter 6 asks a different kind of question: how do you describe a quantity — a stock's log-price, an interest rate, a default count — whose value evolves randomly, step after step, through time? The simplest possible model of that is the **random walk**, and nearly everything in the rest of this chapter (Markov chains, Brownian motion, martingales, Itô's lemma) is a refinement or a continuous-time limit of this one idea.

## What you'll learn

- The formal definition of a simple random walk and its two basic statistical properties
- Why a random walk is the natural discrete-time model for a stock's log-price
- How the random walk connects to Brownian motion through the scaling limit (previewed here, built rigorously in Lesson 31)
- How to simulate random walks in NumPy and verify their mean and variance numerically

## Defining the random walk

A **simple random walk** is a sequence of partial sums of i.i.d. (independent and identically distributed) steps:

S_n = S_0 + Σ_{i=1}^{n} X_i, where X_1, X_2, ... are i.i.d. with E[X_i] = μ and Var(X_i) = σ²

The classic textbook case takes X_i ∈ {+1, −1} with equal probability (μ=0, σ²=1), but the model generalizes immediately to any i.i.d. step distribution — which is exactly what makes it useful for prices, where steps are typically modeled as normal (or more realistically, fat-tailed) random variables rather than coin flips.

## The two defining statistical properties

Because the increments are i.i.d. with mean μ and variance σ²:

- **Mean**: E[S_n] = S_0 + nμ. If μ = 0 (a "fair" random walk, no drift), the expected value never moves from S_0, no matter how far n grows.
- **Variance**: Var(S_n) = nσ². Variance grows **linearly in n**, so the standard deviation of S_n grows like √n — the single most important scaling fact in this entire chapter, since it's exactly the √t scaling you'll see again with Brownian motion in Lesson 31.

This also means the increments are **independent** across non-overlapping windows: S_n − S_m (for n > m) depends only on X_{m+1}, ..., X_n, and is independent of everything that happened up to time m. That "no memory of how you got here, only of the increment ahead" property reappears, formalized, as the Markov property in Lesson 30.

## Random walks as a discrete price model

If L_n = ln(S_n) denotes the log-price of an asset at time step n, a common first model is L_n = L_0 + Σ X_i with X_i i.i.d. — the log-price is a random walk. Equivalently, S_n = S_0 · exp(Σ X_i), so **log returns are additive and i.i.d.** while raw price changes compound multiplicatively. This additive structure on log-prices is precisely why quant models work with log returns rather than raw price differences — sums of i.i.d. variables are vastly easier to analyze than products — and it is the discrete seed that grows into geometric Brownian motion in Lesson 31.

```python
import numpy as np

rng = np.random.default_rng(0)
n_steps, n_paths = 500, 20_000

# Step distribution: i.i.d. normal log-returns, mu=0 for a "fair" walk
mu, sigma = 0.0, 0.01
steps = rng.normal(mu, sigma, size=(n_paths, n_steps))
log_price = np.cumsum(steps, axis=1)          # S_n, starting at S_0 = 0 (i.e. log-price 0)

final = log_price[:, -1]
print("empirical mean:", final.mean(), " theory:", n_steps * mu)
print("empirical var :", final.var(), " theory:", n_steps * sigma**2)
print("empirical std :", final.std(), " theory (sqrt(n)*sigma):", np.sqrt(n_steps) * sigma)
```

Running this confirms both scaling laws directly: the sample variance across 20,000 simulated paths tracks nσ² closely, and the standard deviation tracks σ√n — not σn, a distinction that matters enormously when converting a daily volatility into an annual one (√252, not 252).

## Key terms

| Term | Meaning |
|---|---|
| Random walk | S_n = S_0 + sum of i.i.d. increments X_1,...,X_n |
| Drift (μ) | The mean of each increment; nonzero μ biases the walk's long-run direction |
| Variance scaling | Var(S_n) = nσ², so standard deviation scales as σ√n |
| Independent increments | S_n − S_m depends only on steps after time m, not on the path before it |

## Recap

A random walk is a sum of i.i.d. increments whose mean grows linearly in n and whose standard deviation grows only as √n — the scaling law behind every volatility-annualization rule you've used. Modeling log-price as a random walk makes returns additive, setting up the jump to continuous time. Next, Lesson 30 formalizes the "no memory beyond the present state" property into Markov chains.
