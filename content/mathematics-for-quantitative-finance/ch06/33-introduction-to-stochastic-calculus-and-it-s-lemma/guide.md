# Introduction to Stochastic Calculus & Itô's Lemma

Lesson 31 showed that Brownian motion's quadratic variation is t, not 0 — the single fact that breaks ordinary calculus's chain rule. This lesson derives the replacement, **Itô's lemma**, and uses it to derive **geometric Brownian motion (GBM)**, the standard model of a stock price and the direct setup for Black-Scholes.

## What you'll learn

- Why (dW_t)² = dt forces a correction term into the ordinary chain rule
- The full statement and Taylor-expansion derivation sketch of Itô's lemma
- How applying Itô's lemma to ln(S_t) derives the exact solution for geometric Brownian motion
- How to verify the Itô correction term numerically against a naive (wrong) calculation

## The multiplication rules of stochastic calculus

Stochastic calculus works with differentials that obey a specific set of informal multiplication rules, justified rigorously by quadratic variation arguments:

(dW_t)² = dt, dt · dW_t = 0, (dt)² = 0

The first rule is the direct, informal restatement of Lesson 31's quadratic variation fact. The other two say that any term involving dt² or dt·dW vanishes faster than the leading order terms as the time step shrinks, so they can be dropped from a first-order expansion — but (dW)² must NOT be dropped, because it is the same order as dt itself, not smaller.

## Deriving Itô's lemma

Let X_t follow dX_t = μ dt + σ dW_t, and let f(t, x) be twice differentiable in x and once in t. A second-order Taylor expansion of f(t+dt, X_t+dX_t) around (t, X_t) gives:

df = ∂f/∂t dt + ∂f/∂x dX_t + ½ ∂²f/∂x² (dX_t)² + (higher order terms)

Now substitute dX_t = μdt + σdW_t and expand (dX_t)² = μ²dt² + 2μσ·dt·dW_t + σ²(dW_t)². Applying the multiplication rules above: dt² → 0, dt·dW_t → 0, and (dW_t)² → dt. So (dX_t)² = σ² dt exactly (to first order), and:

**df = [∂f/∂t + μ ∂f/∂x + ½ σ² ∂²f/∂x²] dt + σ ∂f/∂x dW_t**

This is **Itô's lemma**. Compare it to the ordinary chain rule, df = f'(x)dx — Itô's lemma has the same first term (μ∂f/∂x) plus one extra term, **½σ²∂²f/∂x²**, entirely due to the nonzero quadratic variation of Brownian motion. Drop that term and you get ordinary calculus; keep it and you get stochastic calculus.

## Applying Itô's lemma to geometric Brownian motion

**Geometric Brownian motion** models a stock price as dS_t = μS_t dt + σS_t dW_t (proportional drift and proportional volatility — the natural assumption that percentage returns, not dollar changes, have constant statistical properties). To solve this SDE, apply Itô's lemma to f(S) = ln(S):

∂f/∂t = 0, ∂f/∂S = 1/S, ∂²f/∂S² = −1/S²

Substituting μ(S) = μS and σ(S) = σS from the GBM dynamics:

d(ln S_t) = [0 + μS·(1/S) + ½σ²S²·(−1/S²)] dt + σS·(1/S) dW_t = **(μ − ½σ²) dt + σ dW_t**

This has constant coefficients, so it integrates directly: ln(S_t) − ln(S_0) = (μ − ½σ²)t + σW_t (using W_0=0), giving the closed-form **exact solution**:

**S_t = S_0 exp[(μ − ½σ²)t + σW_t]**

The **−½σ² drift adjustment** is purely an Itô effect: naive (wrong) reasoning that treats d(ln S) = dS/S = μdt + σdW would predict E[ln(S_t)] − ln(S_0) = μt, missing the −½σ²t correction entirely.

```python
import numpy as np

rng = np.random.default_rng(0)
S0, mu, sigma, T = 100.0, 0.08, 0.30, 1.0
n_paths = 200_000

W_T = rng.normal(0.0, np.sqrt(T), size=n_paths)      # W_T ~ N(0, T)
S_T = S0 * np.exp((mu - 0.5 * sigma**2) * T + sigma * W_T)

log_return = np.log(S_T / S0)
print("empirical E[ln(S_T/S0)]:", log_return.mean())
print("Ito theory  (mu - 0.5*sigma^2)*T:", (mu - 0.5 * sigma**2) * T)
print("naive (wrong) guess        mu*T:", mu * T)
```

The empirical mean log-return matches the Itô-corrected formula (μ − ½σ²)T, not the naive μT a plain substitution would suggest — direct numerical evidence that the extra ½σ² term is real, not a notational artifact.

## Key terms

| Term | Meaning |
|---|---|
| Itô's lemma | df = [∂f/∂t + μ∂f/∂x + ½σ²∂²f/∂x²]dt + σ∂f/∂x dW |
| Quadratic variation term | The ½σ²∂²f/∂x² correction, absent from the ordinary chain rule |
| Geometric Brownian motion (GBM) | dS = μS dt + σS dW, solved as S_t = S_0 exp[(μ−½σ²)t + σW_t] |
| Drift adjustment | The −½σ² term separating log-price drift from the raw drift μ |

## Recap

Itô's lemma extends the chain rule with a ½σ²∂²f/∂x² correction forced by (dW)²=dt, and applying it to ln(S_t) under GBM derives the exact solution S_t = S_0 exp[(μ−½σ²)t + σW_t] — the model underlying Black-Scholes. Next, Lesson 34 uses this exact solution directly to price a European option by Monte Carlo simulation.
