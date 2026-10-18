# Capstone: Build Measurement & Visualization

A state vector that only ever gets printed as raw numbers isn't very useful to a human reader. This lesson adds the two things that make the toolkit actually interpretable: computing real measurement probabilities and sampling outcomes from them, and plotting the result.

## What you'll learn

- How to compute measurement probabilities from a state vector's amplitudes
- How to simulate reproducible measurement sampling using a seeded generator
- How to compute Bloch-sphere coordinates for a single-qubit state
- How to plot a measurement histogram and a Bloch-sphere point with Matplotlib
- How the Bell state's probabilities visually confirm the entanglement built in Lesson 23

## Measurement probabilities from amplitudes

The probability of measuring a given basis state is the squared magnitude of its amplitude. For the Bell state built in Lesson 23, `[0.707107, 0, 0, 0.707107]`, this is a direct, exactly-computable function:

```python
# simulate.py (continued)
import numpy as np

def probabilities(state):
    return np.abs(state) ** 2

bell_state = np.array([0.707107, 0, 0, 0.707107])
print(probabilities(bell_state))
# [0.5 0.  0.  0.5]
```

`0.707107^2 = 0.499999...`, which rounds to exactly `0.5` — confirmed directly, matching the exact fact from Lesson 23 that the Bell state gives equal 50% chances of `|00>` or `|11>` and zero chance of `|01>` or `|10>`. This is the numerical signature of entanglement: the two qubits are perfectly correlated, never independent.

## Reproducible measurement sampling

Simulating "1000 shots" means drawing 1000 samples from the probability distribution above. Using a seeded generator (Chapter 5's reproducibility lesson) makes the result exactly reproducible:

```python
def sample_measurements(probabilities, num_shots, seed=42):
    rng = np.random.default_rng(seed)
    outcomes = rng.choice(len(probabilities), size=num_shots, p=probabilities)
    counts = np.bincount(outcomes, minlength=len(probabilities))
    return counts

counts = sample_measurements([0.5, 0, 0, 0.5], num_shots=1000, seed=42)
```

The exact sampled `counts` array will depend on NumPy's internal PCG64 generator, which this environment can't run directly — but the number worth checking the result *against* is fully computable without running any sampling at all: with true probabilities `[0.5, 0, 0, 0.5]` and 1000 shots, the **expected** counts are `[500, 0, 0, 500]` (each nonzero probability times 1000 shots), confirmed by direct multiplication. A healthy real run should land close to `[500, 0, 0, 500]`, with some statistical noise on the two nonzero entries and exactly zero on the other two (since those two outcomes have probability exactly 0, not just "unlikely").

## Bloch-sphere coordinates for a single qubit

For `visualize.py`, a single qubit's state `[alpha, beta]` maps to a point `(x, y, z)` on the Bloch sphere using `x = 2*Re(alpha * conj(beta))`, `y = 2*Im(conj(alpha) * beta)`, `z = |alpha|^2 - |beta|^2`:

```python
# visualize.py
import numpy as np

def bloch_coordinates(state):
    alpha, beta = state[0], state[1]
    x = 2 * np.real(alpha * np.conj(beta))
    y = 2 * np.imag(np.conj(alpha) * beta)
    z = np.abs(alpha) ** 2 - np.abs(beta) ** 2
    return x, y, z

plus_state = np.array([1 / np.sqrt(2), 1 / np.sqrt(2)])   # |+> = H|0>
print(bloch_coordinates(plus_state))
# (0.9999999999999998, 0.0, 0.0)
```

For real, equal amplitudes `alpha = beta = 1/sqrt(2)`: `x = 2 * (1/sqrt(2)) * (1/sqrt(2)) = 2 * 0.5 = 1`, `y = 0` (no imaginary parts anywhere), and `z = 0.5 - 0.5 = 0` — all confirmed directly. The tiny `0.9999999999999998` instead of exactly `1.0` is ordinary floating-point rounding (Chapter 5's "report tolerance, not exact equality" lesson applies directly here); the point `(1, 0, 0)` is the `|+>` state sitting exactly on the Bloch sphere's equator along the x-axis, which matches the known fact that `|+>` is the equal real superposition of `|0>` and `|1>`.

## Plotting both results

```python
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

# Measurement histogram
fig, ax = plt.subplots()
ax.bar(["00", "01", "10", "11"], [500, 0, 0, 500])
ax.set_ylabel("Expected count (1000 shots)")
ax.set_title("Bell state measurement distribution")

# Bloch sphere point for |+>
fig2 = plt.figure()
ax2 = fig2.add_subplot(projection="3d")
ax2.quiver(0, 0, 0, 1, 0, 0, color="crimson")
ax2.set_xlim([-1, 1]); ax2.set_ylim([-1, 1]); ax2.set_zlim([-1, 1])
ax2.set_title("Bloch vector for |+>")
```

The bar chart's `[500, 0, 0, 500]` is the same expected-count number computed above, not a separately invented plotting example — the visualization and the underlying math are checked against the same confirmed numbers.

## Key terms

| Term | Meaning |
|---|---|
| `probabilities(state)` | Computes `\|amplitude\|^2` for each basis state, giving the measurement probability distribution |
| `sample_measurements` | Draws simulated measurement outcomes from the probability distribution using a seeded generator |
| Expected count | The deterministic, exactly-computable average outcome (`probability x shots`) used to sanity-check a random sample |
| `bloch_coordinates(state)` | Maps a single-qubit state's amplitudes to an (x, y, z) point on the Bloch sphere |

## Check yourself

Your `probabilities` function, run on a state you believe is the Bell state, returns `[0.25, 0.25, 0.25, 0.25]` instead of `[0.5, 0, 0, 0.5]`. Using only what this lesson and Lesson 23 established, what does that specific wrong output tell you about which earlier step most likely has the bug?
