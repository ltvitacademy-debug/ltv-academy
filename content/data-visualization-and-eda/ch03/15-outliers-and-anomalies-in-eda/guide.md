# Outliers & Anomalies in EDA

Every lesson in this chapter has bumped into the same two customers: total spend of 9,800 and 7,400, in a table where the typical customer spends about 124. Now it is time to deal with them properly. An **outlier** is a value far from the rest of the data. An **anomaly** is an outlier that also looks *wrong* or *unusual for a reason*, such as a data-entry error, a fraud case, or a genuinely special customer. EDA's job is to find them, explain them, and decide what to do. The data is the same seeded, illustrative customer table (`customers.csv`, 500 made-up rows).

## What you'll learn

- Two standard detection rules: the IQR rule and z-scores
- Why z-scores can fail when outliers are extreme
- How to investigate a suspicious row before touching it
- Your options for handling outliers, and why you should record your choice

## Detection rule 1: the IQR rule

The IQR rule flags any value more than 1.5 times the interquartile range (IQR = Q3 minus Q1) below Q1 or above Q3. It is the same rule a box plot uses to draw its whiskers and dots.

```python
import pandas as pd

customers = pd.read_csv("customers.csv")
q1, q3 = customers["total_spend"].quantile([0.25, 0.75])
upper = q3 + 1.5 * (q3 - q1)
customers["spend_flag"] = customers["total_spend"] > upper
print(round(upper, 1), customers["spend_flag"].sum())
```

Here the upper fence is about 425.8 and 19 customers are flagged. Nineteen out of 500 is too many to call all of them errors; some are simply big spenders in a right-skewed distribution.

## Detection rule 2: z-scores, and their weakness

A z-score measures how many standard deviations a value sits from the mean. A common cutoff is an absolute z of 3.

```python
spend = customers["total_spend"]
mu, sd = spend.mean(), spend.std()
z = (spend - mu) / sd
print((z.abs() > 3).sum())
```

This flags only 2 rows (with z of about 17.4 and 13.0). The z-score method is blunter here because the mean and standard deviation are themselves inflated by the two extreme values, so the 17 milder cases look ordinary. Quantile-based rules like the IQR are more robust for skewed data; z-scores work best for roughly bell-shaped variables.

## See it

```python
import matplotlib.pyplot as plt
import seaborn as sns

fig, ax = plt.subplots(1, 2, figsize=(11, 3.5))
sns.boxplot(x=spend, ax=ax[0])
ax[0].set_title("All 500 rows")
typical = spend[spend < 1000]
sns.boxplot(x=typical, ax=ax[1])
ax[1].set_title("Without the two rows above 1,000")
plt.tight_layout()
plt.savefig("spend-boxplots.png", dpi=110)
```

The left box plot is a squashed box with two dots far away. On the right, without the two giants, the plot reveals a normal-looking right-skewed distribution with a scatter of ordinary high spenders.

## Investigate before you decide

A flag is a question, not a verdict. Ask what makes the row odd, using a related column. Spend per order is a good sanity check:

```python
customers["spend_per_order"] = (customers["total_spend"]
                                / customers["orders"])
print(customers["spend_per_order"].describe().round(1))
```

The median spend per order is 37.1, and 75% of customers are under 47.8. The two suspicious rows have spend per order of 2,450 and 1,480 (4 orders for 9,800; 5 for 7,400). That is 40 to 66 times typical, which points to something like a mis-keyed amount or a bulk purchase logged as a single customer. Of the other 17 IQR-flagged rows, the highest is about 134 per order; they spend a lot because they order a lot, which is plausible. Investigating splits the 19 flags into "probably fine" and "needs a question to the data owner."

## Your options

1. **Keep it.** If it is real and relevant, it belongs. Just be aware of its influence on means and Pearson correlations.
2. **Fix it.** If you can identify the true value (say, a decimal slip) correct it and record why.
3. **Remove it.** If it is an error you cannot fix, or clearly out of scope, drop it and say so.
4. **Cap it (winsorize).** Clip to a boundary, for example `spend.clip(upper=spend.quantile(.99))`, when you want to limit influence without deleting rows.
5. **Flag it.** Add a column like `spend_flag` and keep going, so later steps can include or exclude the rows deliberately.

The consequences matter: the mean spend is 188.1 with the two rows and 154.3 without them, and the mean spend by channel (app 158.0, store 154.8, web 152.4 once they are excluded) shows the "app spends more" story from the bivariate lesson vanishing. Always write down what you did and why. An undocumented outlier removal is a common way for an analysis to lose trust.

## Recap

- The IQR rule is robust and matches box plots; z-scores are fragile when extremes inflate the standard deviation.
- Detection only raises a question; use related columns (such as spend per order) to judge.
- Options range from keep to fix to remove to cap to flag; choose deliberately and document the choice.
- Outliers can create or erase findings, so test how conclusions change with and without them.

Next: automated EDA tools that generate much of this exploration for you.
