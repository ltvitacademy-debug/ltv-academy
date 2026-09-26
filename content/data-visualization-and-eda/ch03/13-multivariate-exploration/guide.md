# Multivariate Exploration

Real questions rarely involve just two columns. "Who churns?" depends on tenure, region, channel, order count, and more, all at once. Multivariate exploration means looking at three or more variables together, usually by adding a third dimension to a chart you already know: color, facets, or a second grouping key. The practice data is the same seeded, illustrative customer table (`customers.csv`, 500 made-up rows).

## What you'll learn

- Three ways to add a variable to a chart: hue, facets, and grouped tables
- How to read a pivot-table heatmap
- How pair plots survey many variables quickly
- How to spot a possible confounder

## Add a third variable with color

Take the tenure-versus-orders scatter from the last lesson and color each point by whether that customer churned, and place a second view beside it: a pivot table of churn rate by region and channel drawn as a heatmap.

```python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

customers = pd.read_csv("customers.csv")
rates = customers.pivot_table(index="region", columns="channel",
                              values="churned", aggfunc="mean")
fig, ax = plt.subplots(1, 2, figsize=(11, 4))
sns.heatmap(rates, annot=True, fmt=".2f", cmap="Blues", ax=ax[0])
ax[0].set_title("Churn rate by region and channel")
sns.scatterplot(data=customers, x="tenure_months", y="orders",
                hue="churned", alpha=0.6, ax=ax[1])
plt.tight_layout()
plt.savefig("multivariate-charts.png", dpi=110)
```

In the right panel, the orange (churned) points cluster toward the left, at low tenure. That is a three-variable story: churn is more common among newer customers, and you could not see it in the tenure-orders scatter alone.

## The pivot-table heatmap

`pivot_table` reshapes data into a grid, with one categorical variable on rows, one on columns, and an aggregate in the cells. Here `aggfunc="mean"` on the 0/1 `churned` column gives churn rate. The printed table was:

```
channel   app  store   web
region
East     0.16   0.09  0.20
North    0.12   0.23  0.20
South    0.35   0.29  0.27
West     0.26   0.22  0.20
```

The heatmap turns those numbers into darker and lighter cells. South is darkest across all three channels, consistent with the previous lesson. The highest cell is South/app at 0.35.

**Check the cell sizes.** Swapping `aggfunc="count"` shows South/app has only 20 customers, and West/app has 19. A rate from 20 people can swing a lot, so a dark cell with a small count is a lead, not a finding.

## Faceting and pair plots

Instead of color, you can split a chart into small multiples, one panel per category, with seaborn's `relplot`:

```python
sns.relplot(data=customers, x="tenure_months", y="orders",
            col="channel", hue="churned")
```

That returns a grid of three scatter plots, one per channel, so you can check whether the pattern holds in each channel.

For a broad survey of many numeric columns at once, use a pair plot:

```python
sns.pairplot(customers[customers["total_spend"] < 1000],
             vars=["age", "tenure_months", "orders", "total_spend"],
             hue="churned")
```

This draws every numeric pair as a scatter plot and every single column as a distribution along the diagonal. Notice the filter: the two extreme spend values would squash every panel involving `total_spend`, so this exploratory view leaves them out for now. Pair plots get crowded beyond about six or seven variables, so choose your columns.

## Group by more than one key

Tables can do multivariate work too. Cut tenure into bands and compare churn:

```python
customers["tenure_band"] = pd.cut(customers["tenure_months"],
    [0, 12, 24, 120], labels=["0-12", "13-24", "25+"])
print(customers.groupby("tenure_band")["churned"]
      .agg(["mean", "count"]).round(3))
```

Churn rates came out at 0.295 (0-12 months, 139 customers), 0.235 (13-24 months, 166), and 0.118 (25+ months, 195). Churn drops steadily as tenure grows.

## Watch for confounders

A confounder is a third variable that drives both things you are comparing. If South's customers were simply newer on average, South's high churn might be a tenure effect, not a region effect. Multivariate views are how you check: compare regions *within* a tenure band. When two explanations compete, break the data down by the third variable and see whether the pattern survives.

## Recap

- Add variables with hue, facets (`relplot`), grouped tables, and pivot-table heatmaps.
- Always check cell counts behind a colorful rate.
- Pair plots survey many columns fast but need a sensible column subset and outliers handled.
- Use a third variable to test for confounding before believing a two-variable story.

Next: correlation analysis, putting numbers on the relationships between numeric variables.
