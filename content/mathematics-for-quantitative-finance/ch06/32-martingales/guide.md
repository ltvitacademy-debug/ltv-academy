# Martingales

Brownian motion in Lesson 31 is "fair" in a specific sense: its expected future value, given everything known so far, is just its current value. That fairness has a name — the **martingale** property — and it is the mathematical heart of arbitrage-free pricing. A price process that is NOT a martingale under the right probability measure signals a trading strategy that makes money for free, which is exactly why risk-neutral pricing exists.

## What you'll learn

- The formal martingale definition using conditional expectation and filtrations
- Why standard Brownian motion is a martingale
- Why a stock's real-world price process is generally NOT a martingale, but its discounted price IS one under the risk-neutral measure
- How to verify the martingale property of a discounted GBM price by Monte Carlo

## The martingale definition

Let {F_t} be a **filtration** — the growing collection of information available by time t (formally, a sequence of sigma-algebras with F_s ⊆ F_t for s < t). A process {X_t} adapted to {F_t} is a **martingale** if, for all s < t:

E[X_t | F_s] = X_s

In words: given everything known up to time s, the best forecast of the value at any future time t is simply the current value X_s — no drift, no predictable trend, up or down. This is a strictly stronger statement than merely "zero correlation with the past"; it fixes the *entire conditional expectation*, not just the first moment in a linear sense.

## Brownian motion is a martingale

For standard Brownian motion, condition on F_s (everything known through time s) and write W_t = W_s + (W_t − W_s). The increment W_t − W_s is independent of F_s (property 2 from Lesson 31) and has mean zero (property 3), so:

E[W_t | F_s] = W_s + E[W_t − W_s | F_s] = W_s + E[W_t − W_s] = W_s + 0 = W_s

So W_t is a martingale: its current value is always the best forecast of its future value, with zero expected drift.

## Why a raw stock price is not a martingale, but its discounted price is

If a stock follows geometric Brownian motion dS_t = μS_t dt + σS_t dW_t under the real-world measure P (derived fully in Lesson 33), then E[S_t | F_s] = S_s · e^{μ(t−s)} — which only equals S_s if μ=0. With a positive expected return (μ>0, the normal case), the raw price process is not a martingale under P; it drifts upward in expectation, as it should, since investors demand compensation for risk.

The **fundamental theorem of asset pricing** says that a market is arbitrage-free if and only if there exists an equivalent probability measure Q (the **risk-neutral measure**) under which the *discounted* asset price e^{-rt}S_t is a martingale, where r is the risk-free rate. Under Q, the stock's drift is replaced by r itself: dS_t = rS_t dt + σS_t dW_t^Q. Then:

E^Q[e^{-rt}S_t | F_s] = e^{-rt} · E^Q[S_t | F_s] = e^{-rt} · S_s e^{r(t-s)} = e^{-rs}S_s

confirming the discounted price is indeed a Q-martingale. This single fact — discounted prices are martingales under Q — is the entire mathematical foundation of risk-neutral option pricing: a derivative's fair price today is its discounted expected payoff under Q, precisely because that pricing rule is consistent with the no-arbitrage martingale condition.

```python
import numpy as np

rng = np.random.default_rng(0)
S0, r, sigma, T = 100.0, 0.03, 0.25, 1.0
n_steps, n_paths = 252, 50_000
dt = T / n_steps

# Simulate GBM under the risk-neutral measure (drift = r, not real-world mu)
Z = rng.normal(size=(n_paths, n_steps))
log_increments = (r - 0.5 * sigma**2) * dt + sigma * np.sqrt(dt) * Z
log_S = np.log(S0) + np.cumsum(log_increments, axis=1)
S = np.exp(log_S)

t_grid = np.linspace(dt, T, n_steps)
discounted = np.exp(-r * t_grid) * S.mean(axis=0)   # E^Q[e^{-rt} S_t] at each t

print(discounted[::50])   # should stay flat at approximately S0 = 100
print("S0:", S0)
```

Because the simulation uses the risk-neutral drift r, the discounted expected price e^{-rt}·E^Q[S_t] stays essentially flat at S0 across the whole path — the martingale property, confirmed directly by Monte Carlo, in contrast to the raw (undiscounted) price mean, which would grow at rate r.

## Key terms

| Term | Meaning |
|---|---|
| Filtration (F_t) | The information available up to time t |
| Martingale | A process with E[X_t \| F_s] = X_s for all s<t |
| Risk-neutral measure (Q) | The probability measure under which discounted prices are martingales |
| Fundamental theorem of asset pricing | No arbitrage ⟺ existence of an equivalent martingale measure |

## Recap

A martingale has zero expected drift conditional on the present; Brownian motion is the simplest example. A stock's raw real-world price is generally not a martingale, but its discounted price is a martingale under the risk-neutral measure, which is exactly the mathematical statement of "no arbitrage." Next, Lesson 33 derives the stochastic calculus — Itô's lemma — needed to manipulate processes like GBM rigorously rather than asserting their properties by analogy.
