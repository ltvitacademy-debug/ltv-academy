# Plotting Probability Distributions

A qubit's state is a pair of complex amplitudes, but a human reading a result wants one thing: how likely is each outcome? This lesson turns amplitudes into probabilities and those probabilities into clear bar charts — the single most common plot you'll produce for the rest of this course.

## What you'll learn

- Why discrete quantum outcomes are plotted as bar charts, not line plots
- How to convert a state's amplitudes into measurement probabilities with `abs(amplitude) ** 2`
- How to plot a single-qubit probability distribution with `plt.bar`
- How to plot a multi-qubit distribution across basis state labels like `|00>`, `|01>`
- How to annotate bars with their exact values and sanity-check that probabilities sum to 1

## Why bar charts, not line plots

A qubit measurement doesn't produce a continuous curve — it produces one of a fixed, discrete set of outcomes (`0` or `1` for a single qubit; `00`, `01`, `10`, `11` for two qubits). There's no meaningful value "between" outcome `0` and outcome `1`, so connecting them with a line would visually imply a relationship that doesn't exist. A bar chart, where each bar is a separate, unconnected category, is the correct representation for this kind of data.

## From amplitudes to probabilities

For a single qubit written as `|psi> = alpha|0> + beta|1>`, the probability of measuring each outcome is the squared magnitude of its amplitude: `P(0) = |alpha|**2` and `P(1) = |beta|**2`. For real-valued amplitudes this is just squaring the number; for complex amplitudes, NumPy's `abs()` handles the magnitude correctly either way.

```python
import numpy as np

alpha = np.sqrt(0.3)
beta = np.sqrt(0.7)

p0 = np.abs(alpha) ** 2
p1 = np.abs(beta) ** 2

print(p0, p1, p0 + p1)
# 0.3 0.7 1.0
```

That last line matters as much as the first two: for any valid quantum state, the probabilities of all possible outcomes must sum to 1. If your computed probabilities don't sum to (very close to) 1, the state vector wasn't normalized and something upstream is wrong — check that before you ever plot it.

## Plotting a single-qubit distribution

```python
import matplotlib.pyplot as plt

outcomes = ["0", "1"]
probabilities = [0.3, 0.7]

fig, ax = plt.subplots(figsize=(5, 4))
ax.bar(outcomes, probabilities, color=["navy", "crimson"])

ax.set_title("Single-qubit measurement probabilities")
ax.set_xlabel("Measured outcome")
ax.set_ylabel("Probability")
ax.set_ylim(0, 1)

plt.show()
```

`ax.bar(x_labels, heights)` takes a sequence of category labels and a sequence of heights the same length. Fixing `ax.set_ylim(0, 1)` is worth doing explicitly for probability plots — without it, Matplotlib auto-scales the y-axis to the data, which can make a genuinely large probability look small by stretching the axis, or make small differences between runs look misleadingly dramatic.

## Plotting a multi-qubit distribution

A 2-qubit system has four possible measurement outcomes: `|00>`, `|01>`, `|10>`, `|11>`. Given four amplitudes, the same squaring rule applies to each one independently.

```python
import numpy as np
import matplotlib.pyplot as plt

amplitudes = np.sqrt([0.1, 0.2, 0.3, 0.4])  # already normalized: sums to 1
probabilities = np.abs(amplitudes) ** 2
labels = ["|00>", "|01>", "|10>", "|11>"]

print(probabilities)
# [0.1 0.2 0.3 0.4]

fig, ax = plt.subplots(figsize=(6, 4))
bars = ax.bar(labels, probabilities, color="teal")

ax.set_title("2-qubit measurement probability distribution")
ax.set_ylabel("Probability")
ax.set_ylim(0, 1)

plt.show()
```

This scales to any number of qubits — an *n*-qubit register has `2**n` basis states, and `labels`/`probabilities` just grow to that length. Past 4-5 qubits (16-32 bars), label rotation (`ax.tick_params(axis="x", rotation=45)`) becomes necessary to keep the category labels readable.

## Annotating bars with exact values

A reader shouldn't have to estimate a bar's height by eye when the exact number matters. `ax.bar()` returns the bar container, which you can loop over to place text above each bar.

```python
fig, ax = plt.subplots(figsize=(6, 4))
bars = ax.bar(labels, probabilities, color="teal")

for bar, p in zip(bars, probabilities):
    ax.text(
        bar.get_x() + bar.get_width() / 2,  # centered horizontally on the bar
        bar.get_height() + 0.02,            # just above the bar's top
        f"{p:.2f}",
        ha="center",
    )

ax.set_ylim(0, 1)
plt.show()
```

`bar.get_x() + bar.get_width() / 2` finds the horizontal center of each bar so the label sits directly above it rather than at its left edge. The small `+ 0.02` offset on the y-coordinate keeps the text from overlapping the bar itself.

## Key terms

| Term | Meaning |
|---|---|
| Amplitude | A complex number associated with a basis state; its squared magnitude is a measurement probability |
| Normalization | The requirement that all of a state's measurement probabilities sum to exactly 1 |
| Basis state | One of the fixed, discrete possible measurement outcomes (e.g. `0`, `1`, or `|01>` for two qubits) |
| `ax.bar(labels, heights)` | Matplotlib's method for plotting discrete categories against numeric values |
| `ax.set_ylim(0, 1)` | Forces the y-axis range, important for probability plots so the scale doesn't exaggerate or hide differences |

## Check yourself

A 2-qubit state has amplitudes whose squared magnitudes you compute as `[0.15, 0.35, 0.1, 0.42]`. Before writing a single line of plotting code, what should you check about these four numbers, and what would it mean if the check failed?
