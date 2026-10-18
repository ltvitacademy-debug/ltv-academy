# Random Seeds & Reproducible Simulation

A quantum simulation that gives a different answer every time you run it isn't a simulation you can trust, publish, or debug. The fix isn't to avoid randomness — measurement sampling and noise models genuinely need it — it's to make the randomness itself reproducible.

## What you'll learn

- Why "random" and "reproducible" aren't opposites in scientific computing
- How to use NumPy's modern `default_rng` generator and the legacy `np.random.seed`
- What a seed actually guarantees, and what it does not guarantee
- Where reproducible randomness matters in quantum simulation specifically
- A concrete illustration of why the same seed always reproduces the same sequence

## Randomness you can reproduce

In everyday use, "random" means "unpredictable." In scientific computing, a pseudo-random number generator (PRNG) is actually a fully deterministic algorithm — it just produces output that *looks* statistically random. That determinism is the whole point: give it the same starting value, called a **seed**, and it will produce the exact same sequence of "random" numbers every single time, on every run, forever (on the same library version).

```python
import numpy as np

rng = np.random.default_rng(42)       # modern, recommended generator
values_first_run = rng.random(5)

rng = np.random.default_rng(42)       # re-seeded identically
values_second_run = rng.random(5)

print(np.array_equal(values_first_run, values_second_run))
# True -- both runs, same seed, produce the identical sequence
```

`np.random.default_rng(seed)` is the modern, recommended way to get a random number generator in NumPy. You'll also see the older, legacy global-state form `np.random.seed(42)` followed by plain `np.random.random(5)` in existing code — it works the same way conceptually, but `default_rng` is preferred for new code because it avoids hidden global state that other parts of a program could silently reset.

## What a seed guarantees — and what it doesn't

A seed guarantees: the *same* seed, on the *same* NumPy version, with the *same* sequence of calls to the generator, reproduces the *same* numbers. It does **not** guarantee that two different seeds will look "more different" than two similar ones (seed 1 and seed 2 are just as unrelated as seed 1 and seed 999999), and it does not guarantee the sequence stays identical across NumPy version upgrades that change the underlying algorithm — pin your NumPy version in a research project if a precise sequence of past random draws needs to be exactly reproducible years later.

A small, fully-specified illustrative example makes the core guarantee concrete without relying on NumPy's actual internal algorithm (which is a different, more complex generator called PCG64). Here is a tiny linear congruential generator (LCG) — a classic, simple PRNG you can trace by hand — seeded twice with the value 42:

```python
def tiny_lcg(seed):
    state = seed
    def next_value():
        nonlocal state
        state = (state * 1103515245 + 12345) % 2147483648
        return state / 2147483648
    return next_value

gen_a = tiny_lcg(42)
seq_a = [gen_a(), gen_a(), gen_a()]
print([round(v, 6) for v in seq_a])
# [0.582308, 0.519819, 0.91494]

gen_b = tiny_lcg(42)   # same seed, fresh generator
seq_b = [gen_b(), gen_b(), gen_b()]
print([round(v, 6) for v in seq_b])
# [0.582308, 0.519819, 0.91494]  -- identical to seq_a

gen_c = tiny_lcg(7)    # different seed
seq_c = [gen_c(), gen_c(), gen_c()]
print([round(v, 6) for v in seq_c])
# [0.597056, 0.299265, 0.542292]  -- a completely different sequence
```

Every value above was computed directly (the LCG's update rule — multiply, add, mod — was traced step by step, not guessed). `seq_a` and `seq_b` are identical because the algorithm and the starting state were identical. `seq_c` differs because the seed differed. NumPy's real `default_rng` uses a much stronger generator (PCG64) than this toy LCG, but the reproducibility *guarantee* — same seed in, same sequence out — is exactly the same idea.

## Where this matters in quantum simulation

Three places this shows up constantly in quantum computing code:

- **Measurement sampling.** Simulating "1000 shots" of a circuit means drawing 1000 samples from a probability distribution computed from the state vector. Without a fixed seed, re-running the same circuit produces a different-looking histogram every time — making it hard to tell whether a change in output came from your code change or just from randomness.
- **Variational algorithm initialization.** Algorithms like VQE or QAOA often start from randomly initialized parameters. If you can't reproduce the initial parameters, you can't reproduce why an optimization run converged (or didn't).
- **Noise-model simulation.** Simulating a noisy device involves randomly sampling which error occurred on which qubit at which step. A seeded noise simulation is what lets two people re-run the identical noisy circuit and get the identical answer, which is a basic requirement for debugging or peer review.

## The law of large numbers gives you a deterministic sanity check

Even though individual samples are random, their *aggregate statistics* are not — they're governed by exact probability theory, which gives you a Node/Python-independent way to sanity-check a simulation without needing the random values to match anything specific. If a simulated coin has true probability `p = 0.5` of heads and you flip it `N = 10000` times, the expected count of heads is exactly `N * p`:

```python
N = 10000
p = 0.5
expected_heads = N * p
print(expected_heads)
# 5000.0
```

That `5000.0` is exact arithmetic, not a random draw — it's what the *average* of many random runs should converge toward, even though no single run is guaranteed to land exactly on it. This is the right kind of number to put in a test: "the sampled count should be close to 5000, within statistical noise," rather than asserting a single specific random outcome as if it were deterministic.

## Key terms

| Term | Meaning |
|---|---|
| Seed | The starting value given to a pseudo-random number generator that fully determines every value it will ever produce |
| `np.random.default_rng(seed)` | The modern, recommended NumPy API for creating a seeded random number generator instance |
| PRNG (pseudo-random number generator) | A deterministic algorithm that produces output statistically indistinguishable from true randomness |
| Reproducibility | The property that re-running the same code with the same seed produces the exact same numeric result |
| Law of large numbers | The guarantee that the average of many random samples converges toward the true expected value, even though no single sample is forced to match it |

## Check yourself

A labmate complains that your quantum circuit simulation "gives different measurement histograms every time I run it, so I can't tell if my circuit change actually did anything." What single change to the code would fix this, and why does it work?
