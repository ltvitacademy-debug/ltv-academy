# Misleading Charts & How to Avoid Them

Charts do not lie by themselves, but they are easy to make misleading, sometimes on purpose and more often by accident. As a data scientist you have two jobs: spot these tricks when you read other people's charts, and never commit them in your own.

## What you'll learn

- Why a truncated axis exaggerates differences, and when a non-zero baseline is fine
- How dual axes and cherry-picked time windows distort the story
- How 3D effects and badly scaled shapes mislead the eye
- A short honesty checklist to run before you share any chart

## Trick 1: the truncated axis

In our illustrative customer table, average spend by region is South 283, North 294, East 296 and West 325 dollars. West is about 15% higher than South. Watch what happens when the y-axis starts at 280:

```python
import matplotlib.pyplot as plt

by_region = (customers.groupby("region")["spend"]
             .mean().sort_values())

x, y = by_region.index, by_region.values
fig, (bad, good) = plt.subplots(1, 2, figsize=(10, 4))
bad.bar(x, y)
bad.set_ylim(280, 330)
bad.set_title("Truncated axis: exaggerates")
good.bar(x, y)
good.set_ylim(0, 350)
good.set_title("Zero baseline: honest")
```

(`customers` is the seeded table from Lesson 2.) On the left, the South bar is only 3 units tall (283 minus 280) while West is 45 units tall (325 minus 280), so West *looks* 15 times taller. The real ratio is 1.15. On the right, with a zero baseline, the difference looks like what it is: real, but modest.

**Rule:** bars encode value by *length*, so a bar chart must start at zero. **Line charts** encode position and slope, so they may zoom to a non-zero range, provided the axis is clearly labeled.

## Trick 2: dual axes

Two series on two y-axes can be made to look tightly linked or totally unrelated just by choosing the axis ranges.

```python
import numpy as np
import pandas as pd

rng2 = np.random.default_rng(7)
months = pd.date_range("2025-01-01", periods=12, freq="MS")
revenue = pd.Series(100 + np.arange(12) * 4 + rng2.normal(0, 5, 12),
                    index=months).round(1)          # illustrative
support = pd.Series(np.linspace(50, 52, 12), index=months)

fig, ax1 = plt.subplots()
ax1.plot(revenue.index, revenue.values, color="tab:blue")
ax2 = ax1.twinx()                        # second y-axis
ax2.plot(support.index, support.values, color="tab:red")
ax2.set_ylim(49, 53)                     # squeeze or stretch at will
```

Here `revenue` and `support` are two illustrative monthly series. Changing `set_ylim` on `ax2` changes how the second line lines up with the first, without changing a single data point. If you must show two measures, prefer two stacked charts that share the x-axis, or index both to 100 at the start.

## Trick 3: cherry-picked windows

In our illustrative monthly revenue series, revenue rose from 100.0 in January to 145.8 in December, about 46% growth. But August to September went from 134.7 to 129.5, a 3.9% dip. Show only those two months and the headline becomes "revenue is falling." Always show enough history that the reader can judge the trend, and say which period you chose and why.

## Trick 4: distorted shapes

- **3D bars and pies** tilt the shapes, so front elements look bigger than back ones.
- **Exploded pie slices** pull attention and distort angle comparisons.
- **Bubble size:** if you scale a circle's *radius* by the value, its *area* grows with the square, so a value twice as big looks four times as big. Scale area, not radius (matplotlib's `s` parameter in `scatter` is already an area).

## Other quiet ways charts mislead

- Missing labels, units or source, so the reader cannot check the numbers.
- Sorting or grouping that hides an inconvenient category.
- A cut-off y-axis on a line chart with no marker that says so.
- Showing a correlation as if it proved a cause.

## The honesty checklist

Before you publish a chart, ask:

1. Do the bars start at zero?
2. Is there exactly one y-axis, or is the second one impossible to misread?
3. Does the time range or sample show the full picture?
4. Are shapes flat and scaled by area, not radius?
5. Are units, labels, source and date included?
6. Would the chart still make sense if the reader compared it with the raw numbers?

## Recap

- Length-based charts (bars) need a zero baseline.
- Dual axes and cherry-picked windows let you manufacture stories from the same data.
- Keep shapes flat, scale area not radius, and label everything.
- Next lesson: we move into Python and learn matplotlib fundamentals.
