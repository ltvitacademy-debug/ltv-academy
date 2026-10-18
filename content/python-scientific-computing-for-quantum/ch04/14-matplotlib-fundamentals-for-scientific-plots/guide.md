# Matplotlib Fundamentals for Scientific Plots

Every quantum computing result you'll produce in this course — a measurement histogram, a Bloch sphere, a convergence curve from a variational algorithm — eventually has to become a picture someone can actually read. This lesson covers the Matplotlib building blocks you'll reuse in every visualization lesson that follows: figures, axes, labeling, styling, and multiple-panel layouts.

## What you'll learn

- The Figure/Axes model that almost all Matplotlib code is built on
- How to create a basic line plot with proper titles, axis labels, and a legend
- How to control color, line style, and markers so plots are distinguishable and readable
- How to lay out multiple related plots side by side with `plt.subplots`
- How to save a finished figure to a file for reuse outside a notebook

## The Figure/Axes model

Modern Matplotlib code almost always starts the same way: create a `Figure` (the whole canvas) and one or more `Axes` (an individual plot area) at the same time.

```python
import numpy as np
import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(6, 4))

x = np.linspace(0, 2 * np.pi, 200)
ax.plot(x, np.cos(x))

plt.show()
```

`fig` is the overall container — it's what you save to a file. `ax` is the specific plotting surface — it's what you call `.plot()`, `.bar()`, `.set_xlabel()`, and almost every other drawing method on. This "object-oriented" style (calling methods on `ax` directly) is the one to default to; it scales cleanly to multi-panel figures, whereas the older `plt.plot(...)` shortcut style starts to get confusing once a figure has more than one panel.

## Labels, titles, and legends

An unlabeled plot is not a scientific plot — it's a decoration. Always set a title, both axis labels, and a legend when there's more than one series.

```python
fig, ax = plt.subplots(figsize=(6, 4))

x = np.linspace(0, 2 * np.pi, 200)
ax.plot(x, np.cos(x), label="cos(x)")
ax.plot(x, np.sin(x), label="sin(x)")

ax.set_title("Two reference waveforms")
ax.set_xlabel("x (radians)")
ax.set_ylabel("amplitude")
ax.legend()

plt.show()
```

`label=` on each `.plot()` call feeds `ax.legend()` — without a `label`, a series shows up in the plot but not in the legend. `ax.legend()` with no arguments auto-places the legend in a spot that tries to avoid the data; pass `loc="upper right"` (or another corner) if you need to pin it.

## Colors, line styles, and markers

Quantum code frequently needs to compare several curves (different noise levels, different qubit counts, different algorithms) on one axis. Color alone isn't always enough — line style and markers make curves distinguishable even in grayscale printouts.

```python
fig, ax = plt.subplots(figsize=(6, 4))

x = np.linspace(0, 10, 15)
ax.plot(x, np.exp(-0.2 * x), color="crimson", linestyle="--", marker="o", label="decay A")
ax.plot(x, np.exp(-0.5 * x), color="navy", linestyle="-", marker="s", label="decay B")

ax.legend()
plt.show()
```

Common `linestyle` values: `"-"` (solid), `"--"` (dashed), `":"` (dotted), `"-."` (dash-dot). Common `marker` values: `"o"` (circle), `"s"` (square), `"^"` (triangle), `"x"`. You can also pass a shorthand string like `"ro--"` to combine color, marker, and style in one argument, but the explicit keyword form above is easier to read once a plot has more than one series.

## Multiple panels with `plt.subplots`

`plt.subplots(nrows, ncols)` returns a grid of axes in one call — this is the standard way to put related plots side by side, such as a probability distribution next to the circuit that produced it.

```python
fig, axes = plt.subplots(1, 2, figsize=(10, 4))

x = np.linspace(0, 2 * np.pi, 200)
axes[0].plot(x, np.sin(x))
axes[0].set_title("sin(x)")

axes[1].plot(x, np.cos(x))
axes[1].set_title("cos(x)")

fig.tight_layout()
plt.show()
```

With a 1-row grid, `axes` is a 1D array you index with `axes[0]`, `axes[1]`, etc. With a grid of more than one row (e.g. `plt.subplots(2, 2)`), `axes` becomes a 2D array indexed `axes[row, col]`. `fig.tight_layout()` automatically adjusts spacing so titles and labels on neighboring panels don't overlap — call it right before `plt.show()` or `savefig`.

## Saving a figure

Inside a script (as opposed to a notebook), you'll usually save a figure to a file instead of calling `plt.show()`.

```python
fig, ax = plt.subplots(figsize=(6, 4))
ax.plot(x, np.sin(x))
ax.set_title("Saved figure example")

fig.savefig("sine_wave.png", dpi=150, bbox_inches="tight")
```

`dpi=150` (or higher) keeps text and lines crisp when the image is viewed at full size or embedded in a report. `bbox_inches="tight"` trims excess whitespace around the plot so axis labels aren't cut off at the edges.

## Key terms

| Term | Meaning |
|---|---|
| Figure | The overall canvas/container for a plot, saved or shown as a whole |
| Axes | A single plotting area within a figure (not the same as "axis" — an Axes object owns an x-axis and a y-axis) |
| `plt.subplots(nrows, ncols)` | Creates a figure and a grid of Axes objects in one call |
| Legend | A key mapping each labeled series to its color/style, built from each `.plot()` call's `label=` argument |
| `fig.savefig()` | Writes the current figure to an image file (PNG, PDF, SVG, etc.) |

## Check yourself

You write `ax.plot(x, y, label="P(measure 0)")` but when you call `ax.legend()`, no legend appears on the plot. Looking only at those two lines, what is the most likely mistake, and how would you confirm it?
