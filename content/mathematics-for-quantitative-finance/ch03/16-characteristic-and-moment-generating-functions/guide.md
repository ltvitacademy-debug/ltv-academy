# Characteristic & Moment-Generating Functions

So far you've described a distribution through its moments one at a time — mean, variance, skewness, kurtosis. The **moment-generating function (MGF)** and **characteristic function (CF)** package *all* of a distribution's moments into a single function, and turn two otherwise hard problems — finding the distribution of a sum of independent variables, and proving results like the CLT — into simple algebra. They're also the engine behind the Fourier-transform option-pricing methods used throughout quantitative finance.

## What you'll learn

- The definitions of the MGF, M(t) = E[eᵗˣ], and the CF, φ(t) = E[eⁱᵗˣ]
- Why the CF always exists while the MGF sometimes doesn't
- How to recover every moment of X by differentiating the MGF at 0
- Why the MGF/CF of a sum of independent variables is the product of their individual MGFs/CFs
- A worked numerical check on the normal distribution's MGF

## Definitions

The **moment-generating function** of a random variable X is

M(t) = E[e^{tX}]

defined for every t in some open interval around 0 where the expectation is finite. The **characteristic function** is the same idea with an imaginary exponent:

φ(t) = E[e^{itX}]

Because |e^{itX}| = 1 for every real t and every outcome of X, φ(t) always exists and satisfies |φ(t)| ≤ 1 — no finiteness condition required. This is the CF's key practical advantage: some distributions (certain heavy-tailed ones) have no MGF at all, but every distribution has a characteristic function.

## Generating moments by differentiating

The name "moment-generating function" is literal. Differentiating M(t) and evaluating at t = 0 recovers raw moments directly:

M'(0) = E[X], M''(0) = E[X²], …, M^{(n)}(0) = E[Xⁿ]

This follows from differentiating under the expectation: M'(t) = E[X e^{tX}], so M'(0) = E[X · e⁰] = E[X]. Repeating the argument gives every higher moment for free, once you have a closed form for M(t). (The characteristic function works the same way, with an extra factor of i per derivative: φ^{(n)}(0) = iⁿ E[Xⁿ].)

## Sums of independent variables: multiply, don't convolve

If X and Y are **independent**, the MGF of their sum factors into a product:

M_{X+Y}(t) = E[e^{t(X+Y)}] = E[e^{tX} e^{tY}] = E[e^{tX}]·E[e^{tY}] = M_X(t)·M_Y(t)

(the middle step uses independence to split the expectation of a product into a product of expectations). The same holds for characteristic functions: φ_{X+Y}(t) = φ_X(t)·φ_Y(t). Without this trick, finding the distribution of a sum of independent random variables requires computing a **convolution** of their densities — often intractable. With it, you just multiply two functions. This is exactly the mechanism behind the Central Limit Theorem's proof: standardize, take characteristic functions, multiply, and show the product converges to the characteristic function of a standard normal, e^{-t²/2}.

## The normal distribution's MGF

For X ~ N(μ, σ²), the MGF has the closed form

M(t) = exp(μt + ½σ²t²)

Differentiating: M'(t) = (μ + σ²t)·M(t), so M'(0) = μ = E[X], confirming the mean. A second derivative recovers M''(0) = μ² + σ² = E[X²], matching Var(X) = E[X²] − μ² = σ². This closed form is also why sums of independent normals are normal: multiplying two exponentials of quadratics in t gives another exponential of a quadratic in t, with means and variances adding.

## A worked example in code

```python
import numpy as np
from scipy import stats

mu, sigma = 0.1, 0.3

def mgf_normal(t, mu, sigma):
    return np.exp(mu * t + 0.5 * sigma**2 * t**2)

# Numerically differentiate M(t) at t=0 to recover moments
h = 1e-5
M0, Mp, Mm = mgf_normal(0, mu, sigma), mgf_normal(h, mu, sigma), mgf_normal(-h, mu, sigma)
E_X_numeric = (Mp - Mm) / (2 * h)                      # M'(0)
E_X2_numeric = (Mp - 2 * M0 + Mm) / h**2                # M''(0)

print(f"E[X] from MGF: {E_X_numeric:.5f}  (true mu = {mu})")
print(f"E[X^2] from MGF: {E_X2_numeric:.5f}  (true mu^2+sigma^2 = {mu**2 + sigma**2:.5f})")

# Characteristic function is always bounded by 1 in magnitude
t_vals = np.linspace(-5, 5, 11)
cf_vals = np.exp(1j * mu * t_vals - 0.5 * sigma**2 * t_vals**2)
print("max |phi(t)|:", np.max(np.abs(cf_vals)))          # <= 1, always
```

The numerically differentiated moments match the known formulas for the normal, and the characteristic function's magnitude never exceeds 1 — exactly as the theory predicts.

## Why this matters for pricing

Many models used in derivatives pricing (Heston's stochastic volatility model, variance-gamma, and other Lévy-type models) have a characteristic function in closed form even though their probability density does **not**. The Carr-Madan Fast Fourier Transform method prices an entire strip of option strikes at once by working directly with the characteristic function and inverting it numerically — a direct, practical payoff from the abstract machinery in this lesson.

## Key terms

| Term | Meaning |
|---|---|
| Moment-generating function, M(t) | E[e^{tX}]; exists only where the expectation is finite |
| Characteristic function, φ(t) | E[e^{itX}]; always exists, \|φ(t)\| ≤ 1 |
| M^{(n)}(0) | Equals E[Xⁿ], the nth raw moment |
| Independence + sums | M_{X+Y}(t) = M_X(t)·M_Y(t) for independent X, Y |
| Convolution | What you'd need to compute directly, without MGFs/CFs, for the density of a sum |

## Recap

The MGF and CF package every moment of a distribution into one function, turn sums of independent variables into simple products, and underlie both the CLT's proof and modern Fourier option-pricing methods. Next up, Lesson 17: Common Distributions in Finance, where we put names and formulas to the distributions these tools describe.
