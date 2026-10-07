# Random Number Generation & Reproducibility

Monte Carlo simulation, bootstrap resampling, and randomized backtests all depend on random number generation — and in research, "random" has to mean reproducible, not just statistically well-behaved. This closing lesson of Chapter 2 covers the modern NumPy `Generator` API, how seeding and bit generators actually work, how to get reproducibility across runs and even across parallel processes, and the basics of Monte Carlo estimation.

## What you'll learn

- Why `np.random.default_rng` replaced the legacy `np.random.seed` / global-state API
- Bit generators: what PCG64 is and why it's the default
- Seeding for reproducibility, including `SeedSequence` for parallel processes
- Core `Generator` methods: `random`, `normal`, `integers`, `choice`
- A simple Monte Carlo estimate, with a sense of its error

## The modern Generator API

The legacy `np.random.seed(...)` followed by `np.random.normal(...)` mutates a single hidden global state — convenient for a quick script, but risky in larger codebases, since any other code (including a library you imported) that also touches the global random state silently changes your results. The modern replacement is `np.random.default_rng(seed)`, which returns an explicit `Generator` object you pass around and call methods on directly:

```python
import numpy as np

rng = np.random.default_rng(seed=42)
print(rng.normal(0, 1, 5))     # 5 standard normal draws
print(rng.integers(0, 100, 5)) # 5 integers in [0, 100)
print(rng.random(3))           # 3 uniform draws in [0, 1)
```

Two independent `Generator` instances, even created with the same seed, never silently interfere with each other the way two parts of code sharing the legacy global state could. This is the recommended API going forward; the legacy `RandomState` interface (`np.random.seed`, `np.random.rand`, etc.) still works but is considered legacy.

## Bit generators: PCG64

A `Generator` doesn't produce randomness itself — it delegates to a **bit generator**, which produces the actual stream of pseudo-random bits. `default_rng` uses **PCG64** by default, which has better statistical properties and performance than `MT19937`, the algorithm the legacy `RandomState` API used:

```python
rng = np.random.default_rng(42)
print(type(rng.bit_generator))   # <class 'numpy.random.PCG64'>
```

You rarely need to touch the bit generator directly, but knowing it's there clarifies the two-layer design: `Generator` is the user-facing API (`.normal`, `.integers`, `.choice`, ...), and the bit generator underneath is swappable machinery producing the raw random stream.

## Seeding for reproducibility

Passing an integer seed to `default_rng` makes every run with that seed produce identical output — essential for a reproducible backtest or a research result someone else needs to verify:

```python
rng1 = np.random.default_rng(seed=7)
rng2 = np.random.default_rng(seed=7)
print(np.array_equal(rng1.normal(size=10), rng2.normal(size=10)))   # True

rng_unseeded = np.random.default_rng()   # fresh OS entropy, not reproducible
```

Omitting the seed pulls fresh, unpredictable entropy from the operating system — correct for production randomness where you don't want predictability, wrong for a result you need to reproduce later.

## Reproducibility across parallel processes

Running independent simulations across multiple processes with the *same* seed produces identical, correlated streams — defeating the point of running them in parallel. `SeedSequence` solves this by deriving multiple, statistically independent child seeds from one parent seed:

```python
from numpy.random import SeedSequence, default_rng

parent = SeedSequence(12345)
child_seeds = parent.spawn(4)        # 4 independent child SeedSequences
rngs = [default_rng(s) for s in child_seeds]

results = [rng.normal(size=1000).mean() for rng in rngs]
print(results)   # 4 independent, reproducible means
```

This pattern — one parent seed, `spawn()` into independent children, one `Generator` per worker — is the correct way to parallelize a Monte Carlo simulation across processes or threads while keeping the whole run reproducible from the single parent seed.

## A simple Monte Carlo estimate

Monte Carlo estimation uses random sampling to approximate a quantity that's hard or impossible to compute exactly in closed form. A simple illustration — estimating a European call option price by simulating terminal stock prices under geometric Brownian motion:

```python
rng = np.random.default_rng(seed=1)

S0, K, r, sigma, T, n_sims = 100, 105, 0.03, 0.2, 1.0, 100_000
z = rng.normal(size=n_sims)
S_T = S0 * np.exp((r - 0.5 * sigma ** 2) * T + sigma * np.sqrt(T) * z)
payoffs = np.maximum(S_T - K, 0)
price = np.exp(-r * T) * payoffs.mean()
std_err = np.exp(-r * T) * payoffs.std() / np.sqrt(n_sims)
print(f"Price: {price:.4f} +/- {1.96 * std_err:.4f} (95% CI)")
```

The standard error shrinks with the square root of the number of simulations, which is the fundamental trade-off of Monte Carlo methods: cutting the error in half costs roughly four times as many simulations. This is also why the seed matters for research reproducibility — the exact price estimate (not just its expected value) depends on which random draws you happened to use.

## Key terms

| Term | Meaning |
|---|---|
| `Generator` | The modern, user-facing random number API (`np.random.default_rng(...)`) |
| Bit generator | The underlying engine producing raw pseudo-random bits; PCG64 is the default |
| `SeedSequence` | Derives multiple independent child seeds from one parent seed, for safe parallelism |
| Seed | An integer that makes a `Generator`'s output fully reproducible across runs |
| Monte Carlo | Estimating a quantity via repeated random sampling; error shrinks with √n simulations |

## Recap

Use `np.random.default_rng(seed)` rather than the legacy global-state API; it returns an explicit `Generator` backed by the PCG64 bit generator by default. Seed it for reproducibility, and use `SeedSequence.spawn()` to derive independent child seeds when parallelizing across processes, so the whole run stays reproducible from one parent seed. That closes Chapter 2 on numerical computing — Chapter 3 turns to profiling and actually speeding up the Python code built on everything covered so far.
