# The EDA Mindset & Workflow

Exploratory data analysis (EDA) is the work you do *before* you model, report, or build a dashboard: getting to know the data well enough to ask good questions and to avoid embarrassing mistakes. You already have the tools — pandas for handling data, statistics for summarizing it, matplotlib and seaborn for drawing it. This chapter is about how to use them together in a repeatable order instead of poking at a dataset at random.

## What you'll learn

- What EDA is for, and why it is a loop rather than a checklist
- A five-stage workflow you can reuse on any tabular dataset
- The "first look" checks to run on every new dataset
- The practice dataset used throughout this chapter

## The mindset: questions first, then evidence

EDA is not "make every chart and see what looks interesting." That approach produces a pile of plots and no conclusions. The mindset is closer to detective work: hold a question, look at the data for evidence, and let what you find sharpen the next question. You are also allowed, and expected, to find out that your first question was the wrong one.

Three habits make this work:

- **Write your questions down before you plot.** "Which customers churn?" is a start; "Do customers with few orders churn more?" is testable.
- **Be suspicious of your data.** Assume there are missing values, duplicates, and entry errors until you have checked.
- **Keep notes as you go.** Every surprise (a spike, a gap, a suspicious value) goes in a running list. Those notes become the write-up later.

## The workflow

A workable order for most datasets:

1. **Frame the question.** What decision or model is this data meant to support?
2. **First look.** Shape, types, missing values, duplicates.
3. **One variable at a time (univariate).** Distributions, spread, unusual values.
4. **Two or more variables (bivariate and multivariate).** Relationships, differences between groups, correlations.
5. **Decide and record.** What to clean, what to keep, what to investigate further, what you now believe.

You will loop back. A strange relationship in stage 4 sends you back to stage 3 to check a distribution. That is normal.

## The practice dataset

To keep things concrete, the chapter uses one small, seeded, *illustrative* customer table (500 rows, made up for teaching — not real customers). Run this once to create `customers.csv`:

```python
import numpy as np
import pandas as pd

rng = np.random.default_rng(42)
n = 500
age = rng.normal(38, 11, n).clip(18, 80).round()
tenure = rng.gamma(2.0, 12.0, n).round().clip(1, 120).astype(int)
region = rng.choice(["North", "South", "East", "West"], n, p=[.3, .2, .3, .2])
channel = rng.choice(["web", "store", "app"], n, p=[.45, .35, .2])
orders = rng.poisson(2 + tenure / 12)
spend = (orders * rng.lognormal(3.6, 0.4, n)).round(2)
logit = -0.8 - 0.03 * tenure + 0.5 * (orders < 2)
churned = (rng.random(n) < 1 / (1 + np.exp(-logit))).astype(int)
df = pd.DataFrame({"age": age, "region": region, "channel": channel,
    "tenure_months": tenure, "orders": orders,
    "total_spend": spend, "churned": churned})
df.loc[rng.choice(n, 20, replace=False), "age"] = np.nan
df.loc[[7, 210], "total_spend"] = [9800.0, 7400.0]
df.to_csv("customers.csv", index=False)
```

I deliberately planted a few problems: 20 missing ages and two enormous spend values. Real data always has some; EDA is how you find them.

## Step two in practice: the first look

```python
customers = pd.read_csv("customers.csv")
print(customers.shape)          # (500, 7)
customers.info()
print(customers.isna().sum())
print(customers.duplicated().sum())
```

`info()` shows 500 rows, and that `age` has only 480 non-null values, so 20 are missing; every other column is complete. The duplicate count is `0`. Now check the target you care about:

```python
print(customers["churned"].value_counts(normalize=True).round(3))
```

The output was `0    0.794` and `1    0.206`: about 21% of customers churned. That imbalance matters later when you model, and you would never know it without looking.

Then run `customers.describe().round(1)`. Notice that `total_spend` has a mean of 188.1 but a median of 124.4, and a maximum of 9800.0. A mean well above the median plus a huge maximum is a signal to investigate, which is exactly what the next lessons do.

## Recap

- EDA is a loop: question, look, notice, decide, repeat.
- Write questions down first and keep a running list of surprises.
- Always start with shape, types, missing values, duplicates, and the balance of your target.
- Numbers like mean far from median flag skew or outliers to chase down.

Next you'll study one variable at a time.
