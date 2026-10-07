# Estimation: Maximum Likelihood & Method of Moments

Chapter 3 named distributions and described their properties assuming you already knew the parameters — μ, σ, λ, ν. In reality you never know them; you estimate them from data. This lesson opens Chapter 4, Advanced Statistics, with the two workhorse estimation techniques every quant uses: **Maximum Likelihood Estimation (MLE)** and the **Method of Moments (MoM)**.

## What you'll learn

- The likelihood function and log-likelihood, and why maximizing them is a sensible way to estimate parameters
- How to derive the MLE for the normal distribution's mean and variance, and for the exponential distribution's rate
- The Method of Moments: matching sample moments to theoretical ones
- Why MLE is the default choice in practice (consistency, asymptotic efficiency) despite being harder to compute by hand
- A worked comparison of MLE and MoM on simulated data

## The likelihood function

Suppose X₁, …, Xₙ are i.i.d. draws from a distribution with density f(x; θ), where θ is an unknown parameter (or vector of parameters). The **likelihood function** is the joint density viewed as a function of θ, with the data held fixed:

L(θ) = ∏ᵢ f(xᵢ; θ)

Because products of many small probabilities underflow numerically and are awkward to differentiate, we almost always work with the **log-likelihood**:

ℓ(θ) = log L(θ) = Σᵢ log f(xᵢ; θ)

The **maximum likelihood estimator** is the value of θ that makes the observed data most probable:

θ̂_MLE = argmax_θ ℓ(θ)

Found, when ℓ is differentiable, by solving ℓ'(θ) = 0 (and checking it's a maximum, not a minimum or saddle point).

## Worked derivation: the normal distribution

For X₁, …, Xₙ ~ N(μ, σ²) i.i.d., the log-likelihood is

ℓ(μ, σ²) = −(n/2)log(2πσ²) − (1/(2σ²)) Σᵢ(xᵢ − μ)²

Setting ∂ℓ/∂μ = 0 gives Σᵢ(xᵢ − μ) = 0, so **μ̂_MLE = (1/n)Σxᵢ = x̄**, the sample mean. Substituting back and setting ∂ℓ/∂σ² = 0 gives **σ̂²_MLE = (1/n)Σᵢ(xᵢ − x̄)²** — note the division by n, not n−1. This MLE is slightly **biased downward** in finite samples (E[σ̂²_MLE] = ((n−1)/n)σ²), which is exactly why the "sample variance" formula you likely learned divides by n−1 instead — that's the bias-corrected version, not the MLE.

## Worked derivation: the exponential distribution

For X₁, …, Xₙ ~ Exponential(λ) i.i.d. with density f(x; λ) = λe^{−λx}:

ℓ(λ) = n log λ − λ Σᵢ xᵢ

Setting ℓ'(λ) = n/λ − Σxᵢ = 0 gives **λ̂_MLE = n / Σxᵢ = 1/x̄** — the reciprocal of the sample mean, matching the fact that E[X] = 1/λ for the exponential.

## The Method of Moments

MoM takes a more direct route: set the first k sample moments equal to the first k theoretical moments (each a known function of θ), and solve for θ. For a one-parameter distribution, matching E[X] alone usually suffices; for a two-parameter distribution, match both E[X] and E[X²] (or the mean and variance).

**Example — Gamma distribution** with shape k and scale θ has E[X] = kθ and Var(X) = kθ². Given a sample mean x̄ and sample variance s², the MoM estimators solve kθ = x̄ and kθ² = s² simultaneously:

θ̂_MoM = s² / x̄, k̂_MoM = x̄² / s²

MoM is usually **easier to compute** than MLE (no optimization required, often closed-form), but it's typically **less statistically efficient** — it throws away information in the data beyond the matched moments, so its estimates have higher variance across repeated samples than the MLE's, especially in smaller samples.

## Why MLE is the default in practice

Under standard regularity conditions, MLE has three properties that make it the workhorse of statistical estimation: it is **consistent** (θ̂_MLE → θ as n → ∞), **asymptotically normal** (its sampling distribution becomes approximately normal for large n, letting you build confidence intervals), and **asymptotically efficient** (it achieves the lowest possible variance among consistent estimators in the large-sample limit, the Cramér-Rao bound). None of this guarantees MLE is best in any *specific* finite sample — but as a general-purpose default, it dominates MoM in most financial applications, including fitting a Student's t to return data to better capture tail risk than a normal assumption would.

## A worked example in code

```python
import numpy as np
from scipy import stats

rng = np.random.default_rng(53)
returns = rng.exponential(scale=1 / 250, size=2000)   # e.g. time between jump events, in years

# Closed-form MLE for the exponential rate
lam_mle = 1 / returns.mean()

# scipy's general-purpose MLE fit agrees with the closed form
lam_scipy = 1 / stats.expon.fit(returns, floc=0)[1]

print(f"lambda MLE (closed form): {lam_mle:.2f}")
print(f"lambda MLE (scipy fit):   {lam_scipy:.2f}")

# Method of Moments for a Gamma fit to (shifted-positive) daily volume shocks
shocks = rng.gamma(shape=3.0, scale=2.0, size=5000)
xbar, s2 = shocks.mean(), shocks.var()
theta_mom, k_mom = s2 / xbar, xbar**2 / s2
print(f"Gamma MoM estimates: k={k_mom:.2f} (true 3.0), theta={theta_mom:.2f} (true 2.0)")
```

Both the closed-form and scipy's numerical MLE land on the same rate, and the Method of Moments estimates for the Gamma shape and scale land close to their true values — a direct demonstration that both techniques work, with MLE being the one you'd lean on whenever precision matters most.

## Key terms

| Term | Meaning |
|---|---|
| Likelihood, L(θ) | The joint density of the observed data, viewed as a function of θ |
| Log-likelihood, ℓ(θ) | log L(θ); maximized at the same θ as L(θ) |
| MLE, θ̂_MLE | argmax_θ ℓ(θ) |
| Method of Moments | Setting sample moments equal to theoretical moments and solving for θ |
| Consistency | θ̂ → θ as sample size → ∞ |
| Asymptotic efficiency | Achieves the minimum possible variance among estimators, in the large-sample limit |

## Recap

MLE maximizes the probability of having observed your actual data, while MoM matches sample moments to theoretical ones — both give you a parameter estimate, but MLE is generally more efficient and is the field's default tool. Next up, Lesson 19: Bayesian Inference, where instead of a single point estimate you build a full distribution over your uncertainty about θ.
