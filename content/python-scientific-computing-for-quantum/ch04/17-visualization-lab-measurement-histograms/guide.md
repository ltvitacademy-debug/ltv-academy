# Visualization Lab: Measurement Histograms

This lab puts the chapter together end to end: starting from a qubit state, you'll compute measurement probabilities, turn those probabilities into expected shot counts for a real experiment, and plot the result as a histogram-style bar chart — the exact plot you'll see in the output of almost every real quantum circuit run.

## What you'll learn

- How to go from a state's probabilities to the *expected* counts for N measurement shots
- Why "expected counts" and "one actual simulated run's counts" are different things, and why this lab only computes the former
- How to build a grouped bar chart comparing expected counts across outcomes
- How to add a reference line or annotation showing the theoretical 50/50 (or other) split
- How to structure a small, reusable plotting function for this pattern

## Step 1: Start from a state's probabilities

Suppose a qubit has been prepared so that `P(0) = 0.25` and `P(1) = 0.75` — for example, a state with amplitudes `alpha = 0.5` and `beta = sqrt(0.75)` (`0.25 + 0.75 = 1`, so it's normalized). In a real lab you'd get these probabilities either from theory (as here) or by computing `abs(amplitude)**2` from a simulated state vector, exactly as in the "Plotting Probability Distributions" lesson.

```python
p0 = 0.25
p1 = 0.75
assert abs((p0 + p1) - 1.0) < 1e-9  # sanity check before anything else
```

## Step 2: Expected counts for N shots

A real quantum device (or simulator) doesn't report probabilities directly — it reports a count of how many times each outcome occurred across `N` repeated measurements ("shots"). On average, across many experiments, the *expected* count for an outcome is simply `N * probability`. This is exact arithmetic, not a simulation:

```python
N = 1000
expected_0 = N * p0
expected_1 = N * p1

print(expected_0, expected_1)
# 250.0 750.0
```

For 1000 shots at `P(0) = 0.25`, the expected counts are exactly 250 and 750. It's worth being precise about what this number means: it is the *expectation* — the long-run average outcome — not a guarantee about any single run. A real device measuring this exact state 1000 times might report 243 and 757, or 256 and 744, purely from statistical noise (this is the same kind of fluctuation as a fair coin not landing exactly 500/500 heads in 1000 flips). This lab computes and plots the expected counts, since that's the number theory predicts exactly; treat any specific "actual run" number as illustrative of the general idea of noise, never as a precomputed fact.

## Step 3: Plot the expected counts as a bar chart

```python
import matplotlib.pyplot as plt

outcomes = ["0", "1"]
expected_counts = [250, 750]

fig, ax = plt.subplots(figsize=(5, 4))
bars = ax.bar(outcomes, expected_counts, color=["navy", "crimson"])

ax.set_title(f"Expected measurement counts (N = {N} shots)")
ax.set_xlabel("Measured outcome")
ax.set_ylabel("Count")

for bar, count in zip(bars, expected_counts):
    ax.text(
        bar.get_x() + bar.get_width() / 2,
        bar.get_height() + 10,
        str(count),
        ha="center",
    )

plt.show()
```

This is structurally the same bar-chart code from the probability-distribution lesson, with one meaningful difference: the y-axis is now a count (an integer number of shots) rather than a probability between 0 and 1. Always label the axis accordingly — a reader skimming a plot needs to know at a glance whether they're looking at a fraction or a raw count.

## Step 4: Add a theoretical reference line

It's often useful to mark where a "perfectly even" result would sit, or to overlay the theoretical expectation as a horizontal reference, especially when this plot will later be compared against real hardware output.

```python
fig, ax = plt.subplots(figsize=(5, 4))
bars = ax.bar(outcomes, expected_counts, color=["navy", "crimson"])

ax.axhline(N / 2, color="gray", linestyle="--", linewidth=1, label="even split (N/2)")
ax.set_title(f"Expected measurement counts (N = {N} shots)")
ax.set_xlabel("Measured outcome")
ax.set_ylabel("Count")
ax.legend()

plt.show()
```

`ax.axhline(y, ...)` draws a full-width horizontal line at a given y-value — here, `N / 2 = 500`, useful as a visual reference even though this particular state is *not* an even split (its bars at 250 and 750 sit clearly on either side of that line, which is exactly what makes the plot informative).

## Step 5: A reusable plotting function

Since you'll build this exact plot repeatedly for different states and shot counts throughout the rest of this course, it's worth wrapping it in a function once.

```python
import matplotlib.pyplot as plt

def plot_expected_counts(probabilities, labels, n_shots, title="Expected measurement counts"):
    """Plot expected shot counts for a discrete set of measurement outcomes.

    probabilities: list of floats that should sum to ~1
    labels: list of outcome labels, same length as probabilities
    n_shots: total number of simulated shots
    """
    assert abs(sum(probabilities) - 1.0) < 1e-6, "probabilities must sum to 1"

    expected = [n_shots * p for p in probabilities]

    fig, ax = plt.subplots(figsize=(5, 4))
    bars = ax.bar(labels, expected)

    for bar, count in zip(bars, expected):
        ax.text(
            bar.get_x() + bar.get_width() / 2,
            bar.get_height() + n_shots * 0.01,
            f"{count:.0f}",
            ha="center",
        )

    ax.set_title(f"{title} (N = {n_shots})")
    ax.set_xlabel("Measured outcome")
    ax.set_ylabel("Expected count")
    return fig, ax

# Example usage with a different state and shot count:
fig, ax = plot_expected_counts([0.1, 0.9], ["0", "1"], n_shots=500)
plt.show()
```

For `probabilities=[0.1, 0.9]` and `n_shots=500`, this produces expected counts of 50 and 450 (`500 * 0.1 = 50`, `500 * 0.9 = 450`) — plug in any normalized probability list and shot count and the function handles both single-qubit and multi-qubit outcome sets identically, since nothing about it assumes exactly two outcomes.

## Key terms

| Term | Meaning |
|---|---|
| Shot | One repeated run of a quantum circuit followed by a measurement; experiments use many shots to estimate probabilities |
| Expected count | `N * probability` — the exact long-run average count for an outcome across many repeated experiments |
| Statistical noise | The real, unavoidable fluctuation of any single finite run away from its exact expected count |
| `ax.axhline` | Draws a horizontal reference line across the full width of a plot at a given y-value |

## Check yourself

For a 2-qubit state with probabilities `P(00) = 0.4`, `P(01) = 0.1`, `P(10) = 0.1`, `P(11) = 0.4`, run with `N = 2000` shots, what are the four expected counts, and how would you need to change the `plot_expected_counts` function call (not its internals) to produce this plot?
