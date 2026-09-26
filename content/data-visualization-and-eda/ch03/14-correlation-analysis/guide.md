# Correlation Analysis

You already know what a correlation coefficient is from the statistics course. This lesson is about using it as an EDA tool: scanning a whole table of numeric columns for relationships, picking the right kind of correlation, and knowing when the number is lying to you. The data is the same seeded, illustrative customer table (`customers.csv`, 500 made-up rows).

## What you'll learn

- How to build and read a correlation matrix and heatmap
- The difference between Pearson and Spearman correlation, and when each is safer
- How one or two outliers can wreck a Pearson coefficient
- What correlation cannot tell you

## The correlation matrix

`DataFrame.corr()` computes pairwise correlations between all numeric columns. Plot the matrix as a heatmap with a diverging color scale centered on zero, so positive and negative look different, and fix the scale to -1 to 1 so colors mean the same thing every time:

```python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

customers = pd.read_csv("customers.csv")
cols = ["age", "tenure_months", "orders", "total_spend", "churned"]
fig, ax = plt.subplots(1, 2, figsize=(13, 4.8))
methods = ["pearson", "spearman"]
for a, m in zip(ax, methods):
    c = customers[cols].corr(method=m)
    sns.heatmap(c, annot=True, fmt=".2f",
                vmin=-1, vmax=1, cmap="RdBu_r", ax=a)
    a.set_title(m)
plt.tight_layout()
plt.savefig("correlation-heatmaps.png", dpi=110)
```

The left panel is Pearson, the default. Reading it: `tenure_months` and `orders` have a correlation of 0.55, the strongest pair. `tenure_months` and `churned` are at -0.18, a weak negative link (longer tenure, somewhat less churn). `age` sits near zero against everything, so age carries little linear signal here.

Interpret the size loosely: near 0 is no linear relationship, around 0.3 weak-to-moderate, above 0.7 strong. These are rules of thumb, and context matters.

## Pearson vs Spearman

Pearson measures **linear** association and is sensitive to extreme values. Spearman correlates the *ranks* of the values, so it captures any consistently rising or falling relationship and shrugs off outliers.

Look at `orders` versus `total_spend`. Customers who place more orders obviously spend more, yet the Pearson heatmap says only 0.20. Compare:

```python
print(customers["orders"].corr(customers["total_spend"]))
print(customers["orders"].corr(customers["total_spend"], method="spearman"))
```

Pearson gave about 0.20; Spearman gave about 0.85. That is a huge gap for the same pair of columns. The cause is the two extreme spend values (7,400 and 9,800). Drop them and Pearson recovers:

```python
clean = customers[customers["total_spend"] < 1000]
print(clean["orders"].corr(clean["total_spend"]))
```

That printed about 0.81 on the remaining 498 rows. Two rows out of 500 dragged the Pearson coefficient from 0.81 down to 0.20. The lesson: **whenever Pearson and Spearman disagree sharply, look for outliers or a curved relationship**, and plot the pair before trusting either number.

## Correlation with a 0/1 column

`churned` is coded 0 or 1, so its correlation with a numeric column is a rough summary of how much the two move together. It works for a quick scan, but for a yes/no outcome the grouped comparisons from the bivariate lesson (churn rate by tenure band) are usually more readable.

## What correlation can't tell you

- **Causation.** Tenure correlates with orders, but which direction, and is something else behind both? Correlation doesn't say.
- **Non-linear patterns.** A U-shaped relationship can have a correlation near zero. Plot it.
- **Strength of effect in practice.** A correlation of 0.18 might still matter for a large population; 0.55 might not for a specific decision. Pair the number with a chart and a question.
- **Correlated features.** Two features that are strongly correlated with each other carry overlapping information, which matters later when you build models.

## Recap

- Use `corr()` and an annotated diverging heatmap to scan many pairs quickly.
- Pearson is linear and outlier-sensitive; Spearman uses ranks and is robust.
- A big Pearson/Spearman gap is a warning sign: plot the pair and check outliers.
- Correlation shows association, never cause, and misses non-linear shapes.

Next: outliers and anomalies, and what to do about them.
