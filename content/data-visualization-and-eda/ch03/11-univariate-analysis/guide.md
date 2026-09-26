# Univariate Analysis

"Univariate" just means one variable at a time. Before you compare columns to each other, you need to know what each column looks like on its own: where its values are centered, how spread out they are, what shape they take, and whether anything looks off. This lesson uses the seeded, illustrative customer table from the previous lesson (`customers.csv`, 500 made-up rows).

## What you'll learn

- The four things to look for in any numeric variable: center, spread, shape, unusual values
- How to read a histogram and spot skew
- How to summarize categorical variables
- Why the mean alone can mislead you

## Numeric variables: center, spread, shape, oddities

For each numeric column, ask four questions.

1. **Center.** What is a typical value? (mean, median)
2. **Spread.** How much do values vary? (standard deviation, quartiles)
3. **Shape.** Symmetric, skewed, several humps?
4. **Oddities.** Any gaps, spikes, or extreme values?

Numbers answer some of these, but a histogram answers all four at once. Draw one for each numeric column:

```python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

customers = pd.read_csv("customers.csv")
fig, ax = plt.subplots(1, 3, figsize=(12, 4))
cols = ["age", "tenure_months", "total_spend"]
for a, col in zip(ax, cols):
    sns.histplot(customers[col], bins=30, ax=a)
plt.tight_layout()
plt.savefig("univariate-histograms.png", dpi=110)
```

Reading the output:

- **age** is roughly bell-shaped and balanced around the late 30s. It looks jagged because ages are whole numbers and 30 bins is fine-grained; try 15 or 20 bins and it smooths out.
- **tenure_months** has a long right tail: most customers are fairly new, and a few have been around for years. That is a *right-skewed* shape.
- **total_spend** looks like a single bar near zero plus a couple of dots far to the right. The histogram is telling you something is extreme; the bins are stretched to fit two huge values.

## Put a number on the shape

`skew()` measures asymmetry: near 0 is symmetric, clearly positive means a long right tail.

```python
cols = ["age", "tenure_months", "orders", "total_spend"]
print(customers[cols].skew().round(2))
```

The printed values were `age 0.18`, `tenure_months 1.36`, `orders 1.13`, and `total_spend 15.03`. Age is near symmetric; the others lean right, and total_spend is dramatically skewed by those two huge values.

Compare center measures too. For total_spend the median is 124.4 but the mean is 188.1. When a distribution is right-skewed, the mean is dragged toward the tail, so the median is usually the better "typical" value. Quantiles show how thin the tail is:

```python
print(customers["total_spend"].quantile([.5, .9, .99]).round(1))
```

That gave `124.4`, `307.9`, and `669.6`. So 99% of customers spend under about 670, yet two rows are 7,400 and 9,800. Those two are not "the tail of the distribution"; they are suspects. The outliers lesson later in this chapter deals with them.

## Categorical variables

For categories, count them. Use proportions as well as counts, since "150 of 500" is easier to reason about as 30%.

```python
print(customers["region"].value_counts())
print(customers["channel"].value_counts(normalize=True).round(2))
```

Regions came out as North 150, East 144, West 107, South 99. Channels were roughly web 47%, store 34%, app 19%. Things to check in a categorical column:

- **Rare categories** that might need grouping later.
- **Dominant categories** that dwarf the others.
- **Spelling variants** (`"East"` vs `"east "`), which `value_counts()` reveals immediately.

For a chart, `sns.countplot(x="region", data=customers)` draws these counts as bars. A bar chart is right for categories; a histogram is for numbers.

## Missing values are part of the picture

`customers["age"].isna().sum()` is 20. Note the fact now; decide what to do later. Many pandas summaries silently skip missing values, so `customers["age"].mean()` is computed from the 480 known ages, which is worth remembering.

## Recap

- Look at center, spread, shape, and oddities for every numeric column.
- Histograms reveal skew and extreme values that summary statistics can hide.
- With right skew, the median is often a better typical value than the mean.
- For categories, use `value_counts()` (counts and proportions) and watch for rare or inconsistent labels.

Next: bivariate analysis, comparing two variables at a time.
