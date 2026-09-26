# Why Visualization Matters

Welcome to **Data Visualization & Exploratory Data Analysis**, the fourth course on the Data Scientist path. You already know how to wrangle data with pandas and summarize it with basic statistics. This course teaches you the next skill: *looking* at data, and showing it to other people so they understand it and act on it.

We start with the single best argument for why charts are not decoration.

## What you'll learn

- Why summary statistics alone can mislead you
- What Anscombe's quartet is and why every data scientist should know it
- The difference between exploratory and explanatory visualization
- How this course is organized, from principles to a capstone project

## Same numbers, four different datasets

In 1973 the statistician Francis Anscombe published four tiny datasets, each with eleven (x, y) points. They are built so that the usual summary numbers are almost identical. Let's build them in pandas and check.

```python
import pandas as pd

x = [10, 8, 13, 9, 11, 14, 6, 4, 12, 7, 5]
x4 = [8] * 7 + [19] + [8] * 3
ys = {
    "I": (x, [8.04, 6.95, 7.58, 8.81, 8.33, 9.96, 7.24, 4.26, 10.84, 4.82, 5.68]),
    "II": (x, [9.14, 8.14, 8.74, 8.77, 9.26, 8.10, 6.13, 3.10, 9.13, 7.26, 4.74]),
    "III": (x, [7.46, 6.77, 12.74, 7.11, 7.81, 8.84, 6.08, 5.39, 8.15, 6.42, 5.73]),
    "IV": (x4, [6.58, 5.76, 7.71, 8.84, 8.47, 7.04, 5.25, 12.50, 5.56, 7.91, 6.89]),
}
rows = [(k, a, b) for k, (xs, yv) in ys.items() for a, b in zip(xs, yv)]
df = pd.DataFrame(rows, columns=["set", "x", "y"])

summary = df.groupby("set").agg(
    mean_x=("x", "mean"), mean_y=("y", "mean"), std_y=("y", "std"))
summary["corr"] = df.groupby("set").apply(lambda g: g["x"].corr(g["y"]))
print(summary.round(2))
```

Output:

```text
     mean_x  mean_y  std_y  corr
set
I       9.0     7.5   2.03  0.82
II      9.0     7.5   2.03  0.82
III     9.0     7.5   2.03  0.82
IV      9.0     7.5   2.03  0.82
```

Every set has the same mean of x, the same mean of y, the same spread, and the same correlation. If you only looked at this table, you would conclude you have four copies of the same dataset.

## Now draw them

One line of seaborn (we cover the library properly in Lesson 7) draws each set with a fitted line:

```python
import seaborn as sns

sns.lmplot(data=df, x="x", y="y", col="set", col_wrap=2, ci=None,
           height=2.4, aspect=1.7)
```

The picture tells four different stories:

- **Set I** is a noisy but genuine linear relationship.
- **Set II** is a smooth *curve*; a straight line is the wrong model.
- **Set III** is a perfect line with **one outlier** pulling the fit.
- **Set IV** has almost no relationship at all; **one extreme point** creates the whole correlation.

Summary statistics compress a dataset into a few numbers, and compression throws away shape. A chart puts the shape back.

## Two jobs for visualization

Charts do two different jobs, and mixing them up is a common beginner mistake.

1. **Exploratory visualization** is for *you*. You make many quick, rough charts to find surprises, check assumptions, spot outliers, and decide what to do next. Nobody else ever sees most of them, so polish does not matter.
2. **Explanatory visualization** is for *your audience*. You pick one message, choose the chart that shows it most clearly, and remove everything that distracts. Polish matters a lot.

Most of this course moves you from the first job to the second.

## The road ahead

| Chapter | What you will do |
| --- | --- |
| 1. Principles of visual communication | Choose the right chart, use color and layout well, avoid misleading visuals |
| 2. Visualization in Python | matplotlib, seaborn, Plotly, subplots and dashboards |
| 3. The EDA workflow | Systematic univariate, bivariate and multivariate exploration, correlation, outliers, automated tools |
| 4. Power BI for data scientists | Connect Python and SQL data, build exploratory reports, share findings |
| 5. Communicating findings | Tell the story of a dataset, write it up, present to non-technical audiences |
| 6. Capstone | Explore and present a real dataset from start to finish |

## Recap

- Identical summary statistics can hide completely different data (Anscombe's quartet).
- Always plot your data before you trust a summary of it.
- Exploratory charts are for finding things out; explanatory charts are for communicating them.

Next lesson: how to choose the right chart for the question you are asking.
