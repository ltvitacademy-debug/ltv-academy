# Brownian Motion

Lesson 29 showed a random walk's variance scales like n and its standard deviation like √n. **Brownian motion** (also called the **Wiener process**) is what you get when you shrink the random walk's time step to zero while keeping that √t scaling exact — the continuous-time limit that underlies every diffusion model in finance, including the geometric Brownian motion driving the Black-Scholes framework you're building toward.

## What you'll learn

- The formal definition of standard Brownian motion and its four defining properties
- Why Brownian paths are continuous everywhere but differentiable nowhere
- Quadratic variation, the property that makes stochastic calculus different from ordinary calculus
- How to simulate Brownian paths in Python and verify the Var(W_t) = t scaling numerically

## Defining standard Brownian motion

A stochastic process {W_t : t ≥ 0} is a **standard Brownian motion** if:

1. **W_0 = 0** (starts at the origin).
2. **Independent increments**: for any 0 ≤ t_0 < t_1 < ... < t_n, the increments W_{t_1}−W_{t_0}, W_{t_2}−W_{t_1}, ..., W_{t_n}−W_{t_{n-1}} are mutually independent.
3. **Gaussian increments**: W_t − W_s ~ N(0, t−s) for any 0 ≤ s < t. In particular, Var(W_t) = t — the exact continuous-time analog of Lesson 29's Var(S_n) = nσ² with σ=1.
4. **Continuous paths**: t ↦ W_t is continuous (almost surely), with no jumps.

These four properties are exactly what you get by taking the random walk's time step Δt → 0 while rescaling steps by √Δt (the Donsker invariance / functional central limit theorem) — the "shrink h" idea from Lesson 24's derivative definition applied to an entire stochastic process rather than a single function.

## Two surprising structural facts

- **Nowhere differentiable.** Although W_t is continuous everywhere, it is differentiable nowhere (with probability 1). Intuitively: over a tiny interval of length Δt, W_{t+Δt}−W_t has standard deviation √Δt, so the "slope" (W_{t+Δt}−W_t)/Δt has standard deviation √Δt/Δt = 1/√Δt → ∞ as Δt → 0. There is no well-defined dW_t/dt in the ordinary sense — this is exactly why Itô's lemma (Lesson 33) needs its own calculus rather than borrowing the chain rule directly.
- **Quadratic variation equals t.** Summing (W_{t_{i+1}}−W_{t_i})² over a fine partition of [0,t] converges (in probability, as the partition shrinks) to t itself, not to 0 as it would for a smooth function. Informally, this is written (dW_t)² = dt — the single most important symbolic rule in stochastic calculus, and the direct reason Itô's lemma picks up an extra term that ordinary calculus doesn't have.

## Simulating Brownian motion

Brownian motion is simulated by discretizing time into steps of size Δt and drawing independent Gaussian increments with the correct variance, then cumulatively summing — precisely the random-walk construction from Lesson 29, with the step distribution now fixed to N(0, Δt):

```python
import numpy as np

rng = np.random.default_rng(0)
T, n_steps, n_paths = 1.0, 1000, 20_000
dt = T / n_steps

# Each increment ~ N(0, dt), so increments scale with sqrt(dt)
increments = rng.normal(0.0, np.sqrt(dt), size=(n_paths, n_steps))
W = np.zeros((n_paths, n_steps + 1))
W[:, 1:] = np.cumsum(increments, axis=1)

t_grid = np.linspace(0, T, n_steps + 1)

# Check Var(W_t) = t at several time points
for t_idx in [250, 500, 750, 1000]:
    print(f"t={t_grid[t_idx]:.2f}  empirical Var={W[:, t_idx].var():.4f}  theory={t_grid[t_idx]:.4f}")

# Check quadratic variation sums to T, not 0
quad_var = (np.diff(W[0]) ** 2).sum()
print("quadratic variation of one path:", quad_var, " vs T:", T)
```

Running this confirms Var(W_t) tracks t closely at every checkpoint, and the quadratic variation of a single simulated path lands close to T = 1, not 0 — the discrete footprint of the (dW_t)² = dt rule.

## Key terms

| Term | Meaning |
|---|---|
| Standard Brownian motion (Wiener process) | W_0=0, independent Gaussian increments, Var(W_t)=t, continuous paths |
| Independent increments | Non-overlapping time-interval changes are statistically independent |
| Quadratic variation | Σ(ΔW)² converges to t over [0,t], informally written (dW)² = dt |
| Nowhere differentiable | Brownian paths have no well-defined instantaneous slope anywhere |

## Recap

Brownian motion is the continuous-time limit of the random walk: continuous paths, independent Gaussian increments with Var(W_t)=t, and the (dW)²=dt rule that makes it non-differentiable yet gives it a well-defined calculus of its own. Next, Lesson 32 asks a related but different question — when is a process a martingale — starting with Brownian motion itself as the first example.
