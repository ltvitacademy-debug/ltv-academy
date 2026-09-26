# seaborn for Statistical Plots

matplotlib gives you complete control, but you write a lot of code for common statistical charts. **seaborn** is a library built on top of matplotlib that reads pandas DataFrames directly, computes summaries for you, and ships with attractive defaults. It is the fastest route from a DataFrame to an insight, which is why it is the workhorse of exploratory data analysis.

## What you'll learn

- How seaborn's `data`, `x`, `y` and `hue` arguments work
- How to draw histograms, box plots and scatter plots split by a category
- How to draw a correlation heatmap and a pair plot
- How seaborn and matplotlib work together

## seaborn sits on top of matplotlib

seaborn does not replace matplotlib. It draws *onto matplotlib axes*, so everything from Lessons 5 and 6 (figures, axes, titles, `savefig`) still applies. Most seaborn functions accept an `ax=` argument telling them which axes to draw on.

Install and import it by convention as `sns`:

```python
import seaborn as sns
sns.set_theme(style="whitegrid")   # cleaner defaults for every chart
```

(seaborn's API evolves between versions. The functions in this lesson are stable, but check the current documentation for options.)

## The core pattern: DataFrame in, columns by name

Each seaborn function takes the DataFrame with `data=` and then *names the columns* for `x`, `y`, and `hue`. `hue` splits the chart by a category, colors each group, and adds the legend for you.

We use the 300-row seeded retail table from Lesson 2 (`customers`, illustrative):

```python
import matplotlib.pyplot as plt
import seaborn as sns

sns.set_theme(style="whitegrid")
order = ["Basic", "Plus", "Premium"]

fig, axes = plt.subplots(1, 3, figsize=(12, 4.4))
sns.histplot(data=customers, x="spend", hue="segment",
             hue_order=order, ax=axes[0])
sns.boxplot(data=customers, x="segment", y="spend",
            order=order, ax=axes[1])
sns.scatterplot(data=customers, x="orders", y="spend",
                hue="segment", hue_order=order,
                ax=axes[2])
fig.tight_layout()
```

Each panel is one call. What the three charts show:

- **`histplot`** shows the distribution of spend, split by segment. Premium customers sit further to the right.
- **`boxplot`** compares the spread of spend by segment. The median spend is about 223 for Basic, 293 for Plus and 382 for Premium (illustrative). Dots beyond the whiskers are potential outliers.
- **`scatterplot`** shows orders against spend, with each point colored by segment. The upward trend holds within every segment.

Achieving the same with matplotlib alone would take many more lines: grouping, looping over segments, choosing colors, and building the legend.

## Functions come in families

| Family | Functions | Answers |
| --- | --- | --- |
| Distributions | `histplot`, `kdeplot`, `ecdfplot` | How is one variable spread? |
| Categorical | `boxplot`, `violinplot`, `barplot`, `countplot` | How do groups compare? |
| Relational | `scatterplot`, `lineplot`, `lmplot` | How are two variables related? |
| Matrices and overviews | `heatmap`, `pairplot` | What does the whole table look like? |

`barplot` calculates the mean of each group (with an uncertainty interval) for you, so you can pass raw rows instead of pre-grouped data. `lmplot`, used in Lesson 1, adds a fitted line.

## Heatmaps and pair plots

Two functions are especially useful when you first meet a dataset.

```python
corr = customers[["age", "orders", "spend"]].corr()
sns.heatmap(corr, annot=True, cmap="coolwarm", vmin=-1, vmax=1)

sns.pairplot(customers, hue="segment")
```

The correlation matrix is:

```text
         age  orders  spend
age     1.00    0.04   0.05
orders  0.04    1.00   0.67
spend   0.05    0.67   1.00
```

`heatmap` colors each cell by its value. `annot=True` writes the number in each cell, and the diverging `coolwarm` palette with `vmin=-1, vmax=1` centers the scale on zero, as recommended in Lesson 3. Orders and spend are strongly related (0.67); age relates to neither.

`pairplot` draws a scatter plot for every pair of numeric columns and a distribution on the diagonal. It is a fast overview for a table with a handful of numeric columns, but it gets slow and unreadable with dozens.

## Recap

- seaborn draws on matplotlib axes and reads DataFrames directly: `data=`, `x=`, `y=`, `hue=`.
- One call gives you a statistical chart that would take many lines in raw matplotlib.
- Use `histplot`, `boxplot` and `scatterplot` for the basics; `heatmap` and `pairplot` for overviews.
- Next lesson: Plotly, for interactive charts you can hover, zoom and share.
