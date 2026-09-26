# Subplots & Dashboards in Python

One chart answers one question. A real analysis needs several charts side by side, so a reader can compare them and see the whole picture. In Python a "dashboard" is, at its core, a well-planned grid of charts. This lesson covers both matplotlib and Plotly.

## What you'll learn

- How to create a grid of charts with `plt.subplots`
- Why shared axes keep comparisons honest
- How to build unequal layouts with `GridSpec`
- How to make a multi-panel Plotly figure
- Simple principles for dashboards that people can read at a glance

## A grid of axes with `plt.subplots`

`plt.subplots(nrows, ncols)` returns a figure and an array of axes. We reuse the illustrative `customers` table from Lesson 2, and the `means` (average spend by segment) and `by_region` results:

```python
import matplotlib.pyplot as plt

means = (customers.groupby("segment")["spend"].mean()
         .reindex(["Basic", "Plus", "Premium"]))
by_region = customers.groupby("region")["spend"].mean().sort_values()

fig, axes = plt.subplots(
    1, 2, sharey=True,
    figsize=(9, 3.6))
axes[0].bar(means.index, means.values)
axes[1].bar(by_region.index, by_region.values)
axes[0].set_title("Average spend by segment")
axes[1].set_title("Average spend by region")
axes[0].set_ylabel("Spend ($)")
```

Points to remember:

- With one row (or one column), `axes` is a one-dimensional array, so you index with a single number: `axes[0]`, `axes[1]`.
- With several rows *and* columns, `axes` is two-dimensional: `axes[row, col]`. For example `plt.subplots(2, 2)` gives an array of shape `(2, 2)`. Call `axes.flatten()` to loop over all panels with one `for` loop.
- `sharey=True` (and `sharex=True`) makes panels use the same scale, and hides the repeated tick labels. Shared axes are what keep side-by-side comparisons honest, echoing the truncated-axis warning from Lesson 4.

## Unequal panels with GridSpec

Dashboards rarely use equal-sized panels. A trend often deserves a full-width row, with smaller charts beneath it. `fig.add_gridspec` lets one axes span several cells:

```python
import numpy as np
import pandas as pd

rng2 = np.random.default_rng(7)
months = pd.date_range("2025-01-01", periods=12, freq="MS")
revenue = pd.Series(100 + np.arange(12) * 4 + rng2.normal(0, 5, 12),
                    index=months).round(1)

fig = plt.figure(figsize=(12, 5),
                 layout="constrained")
gs = fig.add_gridspec(2, 3)
ax_trend = fig.add_subplot(gs[0, :])      # top row, all 3 columns
ax_seg = fig.add_subplot(gs[1, 0])
ax_hist = fig.add_subplot(gs[1, 1])
ax_sc = fig.add_subplot(gs[1, 2])

ax_trend.plot(revenue.index, revenue.values, marker="o", color="#0072B2")
ax_trend.set_title("Monthly revenue ($ thousands)", loc="left")
ax_seg.bar(means.index, means.values, color="#0072B2")
ax_seg.set_title("Average spend by segment", loc="left")
ax_hist.hist(customers["spend"], bins=20, color="#0072B2")
ax_hist.set_title("Spend distribution", loc="left")
ax_sc.scatter(customers["orders"], customers["spend"], s=10, color="#0072B2")
ax_sc.set_title("Orders vs spend", loc="left")
fig.suptitle("Retail overview (illustrative data)")
fig.savefig("dashboard.png", dpi=130)
```

- `gs[0, :]` means "row 0, every column," so the revenue trend spans the whole top row.
- `layout="constrained"` asks matplotlib to arrange titles and labels so they do not overlap. (This argument needs matplotlib 3.5 or newer; older versions used `constrained_layout=True`.)
- `fig.suptitle(...)` adds a title over the whole figure.

The result reads as one view: a trend on top, then segment spend, the spend distribution, and orders versus spend below. Consistent color, left-aligned titles and shared styling are what make separate charts feel like one dashboard.

## Multi-panel Plotly figures

Plotly does the same with `make_subplots`, and the panels stay interactive:

```python
import plotly.graph_objects as go
from plotly import subplots

names, vals = means.index, means.values
x, y = customers["orders"], customers["spend"]
fig = subplots.make_subplots(
    rows=1, cols=2,
    subplot_titles=("Spend by segment", "Orders vs spend"))
fig.add_trace(go.Bar(x=names, y=vals),
              row=1, col=1)
fig.add_trace(go.Scatter(x=x, y=y,
              mode="markers"),
              row=1, col=2)
fig.update_layout(showlegend=False, title_text="Dashboard")
fig.write_html("dashboard.html")
```

You choose the grid with `rows` and `cols`, then add each trace with a `row` and `col` position. (Here we use Plotly's lower-level `graph_objects`, `go.Bar` and `go.Scatter`, because `make_subplots` assembles traces from several charts.)

## Dashboard principles

1. **One question per panel.** If you cannot say what a panel answers, remove it.
2. **Most important chart top-left,** where readers look first.
3. **Consistent scales, colors and fonts** across panels. If West is orange in one chart, it is orange everywhere.
4. **Share axes** when panels are meant to be compared.
5. **Stop at roughly six panels.** More than that and nothing stands out.

For fully live dashboards that update from a database and let users filter, look at frameworks such as Dash (Plotly's), Streamlit, or Power BI, which we use later in this course. (As of this writing these are the common choices; check current docs.)

## Recap

- `plt.subplots(rows, cols)` gives you a grid of axes; index with `axes[i]` or `axes[row, col]`.
- Share axes for honest comparisons; use `GridSpec` for unequal panels; use constrained layout to avoid overlap.
- Plotly's `make_subplots` builds interactive multi-panel figures.
- A good dashboard: one question per panel, consistent styling, about six panels at most.
- That completes Chapter 2. Next lesson starts Chapter 3: the EDA mindset and workflow, where we use all these tools to explore a dataset systematically.
