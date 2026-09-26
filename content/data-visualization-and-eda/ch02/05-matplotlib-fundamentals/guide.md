# matplotlib Fundamentals

Chapter 1 was about *what* to draw and *why*. Now we learn to draw it. **matplotlib** is the foundation of Python plotting: seaborn is built on it, and pandas' `.plot()` calls it. Learn its model once and every other library gets easier.

## What you'll learn

- The two core objects: Figure and Axes
- The difference between the pyplot style and the object-oriented style
- How to draw line, bar, histogram, scatter and box charts
- How to label a chart and save it to a file

## Figures and Axes

matplotlib's model has two main objects:

- A **Figure** is the whole canvas, like a sheet of paper. It can be saved as an image.
- An **Axes** is *one plot* on that canvas. It owns the x-axis and y-axis, the title, and the data you draw. A figure holds one Axes or many (Lesson 9 covers multi-panel layouts).

`plt.subplots()` creates a figure and an axes together and returns both:

```python
import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(8, 3.2))   # width, height in inches
```

## Two styles: pyplot and object-oriented

You will see both styles in tutorials.

```python
# pyplot style: quick, implicit ("current" figure and axes)
plt.plot(x, y)
plt.title("Monthly revenue")

# object-oriented style: explicit, works cleanly with many charts
fig, ax = plt.subplots()
ax.plot(x, y)
ax.set_title("Monthly revenue")
```

Both work. The pyplot style is fine for a fast look in a notebook, but it relies on matplotlib remembering which axes is "current," which gets confusing as soon as you have more than one chart. **We use the object-oriented style** for the rest of the course; note that the axes methods are named `set_title`, `set_xlabel` and `set_ylabel`.

## Your first chart: a line chart

Here is a series of illustrative monthly revenue (in thousands of dollars), generated with a seed:

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

rng2 = np.random.default_rng(7)
months = pd.date_range("2025-01-01", periods=12, freq="MS")
revenue = pd.Series(100 + np.arange(12) * 4 + rng2.normal(0, 5, 12),
                    index=months).round(1)

fig, ax = plt.subplots(figsize=(8, 3.2))
ax.plot(revenue.index, revenue.values,
        marker="o")
ax.set_title("Monthly revenue")
ax.set_xlabel("Month")
ax.set_ylabel("Revenue ($ thousands)")
fig.autofmt_xdate()                       # rotate crowded date labels
fig.savefig("revenue.png", dpi=130, bbox_inches="tight")
```

Revenue climbs from 100.0 in January to 145.8 in December, with a dip in September. `marker="o"` puts a dot on each data point. `fig.autofmt_xdate()` rotates the date labels so they do not overlap. In a Jupyter notebook the chart appears automatically below the cell; in a plain script, call `plt.show()` to open a window.

## The other chart types

Every chart type is a method on the axes, with the same pattern: create the axes, call a method, add labels.

```python
# customers = the seeded retail table from Lesson 2
means = customers.groupby("segment")["spend"].mean()
groups = [g["spend"].values for _, g in customers.groupby("segment")]

fig, axes = plt.subplots(1, 5, figsize=(14, 3))
axes[0].bar(means.index, means.values)                 # compare categories
axes[1].barh(means.index, means.values)                # horizontal bars
axes[2].hist(customers["spend"], bins=20)              # distribution
axes[3].scatter(customers["orders"], customers["spend"], s=12)  # relationship
axes[4].boxplot(groups)                                # spread by group
```

Here `customers` is the 300-row seeded table from Lesson 2. Use `barh` when category names are long, `hist` with a `bins` count you choose, `scatter` with `s` to set the marker area, and `boxplot` to compare the spread of several groups.

## Saving figures

`fig.savefig("name.png")` writes the figure to a file. Useful options:

- `dpi=130` (or higher) controls resolution; 300 is common for print.
- `bbox_inches="tight"` trims extra whitespace.
- The file extension picks the format: `.png` for slides and web, `.svg` or `.pdf` for vector graphics.

## Recap

- A Figure is the canvas; an Axes is one plot on it.
- Prefer the object-oriented style: `fig, ax = plt.subplots()`, then `ax.plot(...)`, `ax.set_title(...)`.
- `plot`, `bar`, `barh`, `hist`, `scatter` and `boxplot` cover most exploratory charts.
- `fig.savefig(...)` exports the result.
- Next lesson: customizing charts with colors, styles, annotations and legends.
