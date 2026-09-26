# Choosing the Right Chart

A chart is an answer to a question. If you pick a chart before you know the question, you usually pick the wrong one. This lesson gives you a simple way to go from *question* to *chart*, and shows the three most common chart types on a small customer dataset.

## What you'll learn

- How to match a chart type to the question you are asking
- When to use bar, line, histogram, box, and scatter charts
- Why pie charts have a narrow use case
- How to draw a bar chart, a histogram and a scatter plot with matplotlib

## Start with the question

Almost every business question fits one of four families.

| Question family | Example | Good chart |
| --- | --- | --- |
| **Compare** categories | Which segment spends the most? | Bar chart (horizontal if labels are long) |
| **Trend** over time | Is revenue growing? | Line chart |
| **Distribution** of one variable | How is spend spread across customers? | Histogram or box plot |
| **Relationship** between two numeric variables | Do more orders mean more spend? | Scatter plot |

A fifth family, **part of a whole**, is usually best served by a stacked bar or a simple bar chart of percentages. Pie charts work only for two or three slices; humans are good at comparing lengths along a common baseline and poor at comparing angles and areas.

## The dataset

Throughout this course we use a small, made-up retail customer table with 300 rows (so treat every number as illustrative). It is generated with a seed so you get the same rows every time.

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

rng = np.random.default_rng(42)
n = 300
customers = pd.DataFrame({
    "region": rng.choice(["North", "South", "East", "West"], n),
    "segment": rng.choice(["Basic", "Plus", "Premium"], n, p=[0.5, 0.3, 0.2]),
    "age": rng.integers(18, 70, n),
    "orders": rng.poisson(5, n) + 1,
})
bonus = customers["segment"].map({"Basic": 0, "Plus": 60, "Premium": 180})
customers["spend"] = (customers["orders"] * rng.normal(40, 8, n) + bonus).round(2)
```

## Three questions, three charts

We will answer three questions from the same data.

```python
means = (customers.groupby("segment")["spend"].mean()
         .reindex(["Basic", "Plus", "Premium"]))

fig, axes = plt.subplots(
    1, 3, figsize=(11, 4.4))
axes[0].bar(means.index, means.values)
axes[0].set_title("Compare: average spend by segment")
axes[1].hist(customers["spend"], bins=20)
axes[1].set_title("Distribution: spend")
axes[2].scatter(customers["orders"],
                customers["spend"], s=12)
axes[2].set_title("Relationship: orders vs spend")
fig.tight_layout()
```

`print(means.round(1))` shows the bar heights:

```text
segment
Basic      241.6
Plus       301.4
Premium    414.3
```

Read the results the way a stakeholder would:

- **Bar chart:** Premium customers spend the most on average, and each step up the ladder is a visible jump.
- **Histogram:** spend is right-skewed, with most customers in the low hundreds and a long tail of bigger spenders.
- **Scatter plot:** more orders go with more spend, and the cloud of points slopes clearly upward.

The same data answered three different questions, and each chart was the natural fit for its question.

## A line chart for time

For a trend, put time on the x-axis in order and join the points:

```python
rng2 = np.random.default_rng(7)
months = pd.date_range("2025-01-01", periods=12, freq="MS")
revenue = pd.Series(100 + np.arange(12) * 4 + rng2.normal(0, 5, 12),
                    index=months).round(1)

fig, ax = plt.subplots()
ax.plot(revenue.index, revenue.values, marker="o")
ax.set_title("Trend: monthly revenue ($ thousands)")
```

A line implies that the order matters and that the values in between exist, which is exactly right for time and exactly wrong for unrelated categories.

## Common traps

- **Pie with many slices.** Use a sorted bar chart instead.
- **A line through categories** such as regions. Use bars; a line suggests a progression that does not exist.
- **Two numeric variables shown as two bar groups.** Use a scatter plot to show how they move together.
- **Choosing a chart because it looks impressive.** Fancy 3D or radial charts almost always make the answer harder to read.

## Recap

- Name the question first: compare, trend, distribution or relationship.
- Bar for comparison, line for trend, histogram or box for distribution, scatter for relationship.
- Use pies rarely, and only with a few slices.
- Next lesson: how color, layout and labels turn a correct chart into a clear one.
