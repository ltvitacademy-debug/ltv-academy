# Customizing Charts

A default matplotlib chart is a fine first draft for yourself. To show it to someone else, you customize it: line styles, reference lines, annotations, number formats, gridlines and a consistent style. This lesson applies the layout habits from Lesson 3 in code.

## What you'll learn

- Keyword arguments that control color, width, line style and markers
- How to add reference lines, annotations and legends
- How to format axis numbers and tidy gridlines and spines
- How to use style sheets and `rcParams` to set defaults once

## Style the data

Every plotting method accepts keyword arguments for its appearance. For a line: `color`, `linewidth` (or `lw`), `linestyle` (or `ls`), `marker`, and `label`.

We use the illustrative monthly revenue series from Lesson 5:

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

rng2 = np.random.default_rng(7)
months = pd.date_range("2025-01-01", periods=12, freq="MS")
revenue = pd.Series(100 + np.arange(12) * 4 + rng2.normal(0, 5, 12),
                    index=months).round(1)

fig, ax = plt.subplots(figsize=(8, 3.2))
ax.plot(revenue.index, revenue.values, color="#0072B2",
        linewidth=2.5, marker="o", label="Revenue")
ax.axhline(120, color="grey", linestyle="--",
           label="Target (120)")
```

`#0072B2` is a blue from a colorblind-safe palette. `axhline` draws a horizontal reference line across the whole axes (use `axvline` for a vertical one). Anything with a `label` can appear in the legend.

## Add words and structure

```python
dip = revenue.index[8]
ax.annotate(
    "September dip",
    xy=(dip, revenue[dip]),
    xytext=(revenue.index[9], 108),
    arrowprops={"arrowstyle": "->"})
ax.set_title("Revenue passed target in July", loc="left")
ax.set_ylabel("Revenue")
ax.yaxis.set_major_formatter("${x:.0f}k")
ax.grid(axis="y", alpha=0.3)
ax.legend(frameon=False, loc="upper left")
for side in ["top", "right"]:
    ax.spines[side].set_visible(False)
fig.autofmt_xdate()
fig.tight_layout()
fig.savefig("custom.png", dpi=130)
```

What each piece does:

- `annotate` points an arrow (`arrowprops`) from the text position `xytext` at the data point `xy`. Use it to label the one thing you want the reader to notice.
- `set_title(..., loc="left")` left-aligns the title with the axis, and the text states the finding. (The line crosses the target of 120 in July: 115.0 in June, 124.3 in July.)
- `set_major_formatter("${x:.0f}k")` takes a format string and turns tick values such as `140` into `$140k`.
- `grid(axis="y", alpha=0.3)` draws faint horizontal gridlines only.
- `legend(frameon=False)` removes the legend box.
- `spines[...]` are the four borders of the plot; hiding the top and right ones removes clutter.
- `tight_layout()` adjusts padding so labels are not cut off.

The result: a bold line, a dashed grey target, a title that states the takeaway, and an arrow explaining the September dip. Every element earns its place.

## Style sheets and defaults

Setting the same options on every chart is tedious. Set them once.

```python
print(plt.style.available[:3])          # built-in style sheet names
plt.style.use("ggplot")                 # applies to charts made afterwards
plt.rcParams["font.size"] = 12          # change one default

with plt.style.context("ggplot"):       # style for one chart only
    fig, ax = plt.subplots()
```

`plt.style.available` lists the style sheets installed with your version of matplotlib (some names change between versions, so check the list rather than copying a name from an older tutorial). `plt.rcParams` is the dictionary of every default: fonts, line widths, colors, figure size. A common pattern is to put your preferred settings at the top of a notebook or in a shared module, so every chart on a project looks consistent.

## Customize to clarify, not decorate

A useful test for every element you add: does it help the reader answer the question? A target line, a labeled annotation and a formatted axis do. A gradient background, a thick border and a rainbow palette do not.

## Recap

- Use keyword arguments (`color`, `linewidth`, `linestyle`, `marker`, `label`) to style data.
- `axhline`, `annotate` and `legend` add reference and context.
- Format numbers with `set_major_formatter`; simplify with `grid` and spines.
- Style sheets and `rcParams` set defaults once.
- Next lesson: seaborn, a library built on matplotlib for statistical plots.
