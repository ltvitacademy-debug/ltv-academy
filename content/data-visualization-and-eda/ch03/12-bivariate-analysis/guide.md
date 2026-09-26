# Bivariate Analysis

Bivariate analysis compares two variables at a time. It is where EDA starts producing the stories people care about: which customers spend more, which region churns most, whether longer relationships mean more orders. The right technique depends on what *types* of variables you are pairing, so start by naming them. This lesson continues with the seeded, illustrative customer table (`customers.csv`, 500 made-up rows).

## What you'll learn

- How to pick a chart and a summary for numeric-numeric, numeric-category, and category-category pairs
- How to use `groupby` and `crosstab` to compare groups
- Why the mean can lie when a group contains outliers
- Why small differences between groups need a second look

## Numeric vs numeric: the scatter plot

Two numeric columns call for a scatter plot. Each point is one customer.

```python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

customers = pd.read_csv("customers.csv")
fig, ax = plt.subplots(1, 2, figsize=(11, 4))
sns.scatterplot(data=customers, x="tenure_months",
                y="orders", alpha=0.5, ax=ax[0])
sns.barplot(data=customers, x="region", y="churned",
            errorbar=None, ax=ax[1])
ax[1].set_ylabel("churn rate")
plt.tight_layout()
plt.savefig("bivariate-charts.png", dpi=110)
```

The left panel shows tenure against orders. The cloud rises from lower left to upper right: customers with longer tenure tend to have placed more orders. The `alpha=0.5` transparency helps you see where points overlap. A quick number to go with it is the correlation:

```python
print(customers[["tenure_months", "orders"]].corr().round(2))
```

The off-diagonal value was `0.55`, a moderate positive relationship. The next-but-one lesson digs into correlation properly.

## Numeric vs category: compare groups

To compare a numeric column across categories, group and summarize:

```python
print(customers.groupby("channel")["total_spend"]
      .agg(["mean", "median"]).round(1))
```

The result:

```
          mean  median
channel
app      232.7   127.7
store    154.8   129.4
web      193.4   116.5
```

Look at the *means* first: app looks like the big spenders. Now look at the *medians*, which are nearly the same across channels (roughly 117 to 129). The means differ mostly because the two huge spend values (7,400 on app and 9,800 on web) inflate the groups they landed in. That is the danger of comparing means when outliers are present: the difference you "found" may be two rows. Compare medians, or draw a box plot per group, before you believe a gap.

## Category vs category: crosstab

To relate two categorical columns, cross-tabulate them. Normalizing by row turns counts into rates:

```python
print(pd.crosstab(customers["region"], customers["churned"],
                  normalize="index").round(3))
```

The churn rate (the `1` column) came out as East 0.153, North 0.193, West 0.215, and South 0.293. The right panel of the chart above draws exactly these rates as bars. South looks noticeably higher than East.

## Don't over-read a gap

Ask two follow-up questions before reporting "South churns more":

- **How many customers are in each group?** South has 99 customers, so its rate is based on fewer people than the others and can swing more.
- **Could the difference be random?** With samples this small, a few customers either way would move a bar. Later lessons on hypothesis testing give you tools to check; for now, treat it as a lead worth testing, not a conclusion.

Also remember the other classic trap: a relationship between two variables does not show that one causes the other. Recording it as "associated with" keeps your notes honest.

## Recap

- Match technique to variable types: scatter for two numerics, grouped summaries and box plots for numeric vs category, crosstab and bars for two categoricals.
- `groupby(...).agg(["mean", "median"])` side by side reveals when outliers are driving the mean.
- Normalize crosstabs (`normalize="index"`) to compare rates, not raw counts.
- Check group sizes before trusting a difference; treat findings as leads.

Next: multivariate exploration, where three or more variables come into play.
