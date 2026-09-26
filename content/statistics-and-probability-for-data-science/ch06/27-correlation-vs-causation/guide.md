# Correlation vs. Causation

"Customers who open our emails spend more." "Weeks with higher ad spend have higher sales." "Users who use feature X churn less." Each is a statement about correlation, and each tempts us to act as if one thing causes the other. Sometimes it does. Often it doesn't. This lesson gives you the vocabulary and the Python tools to tell the difference, and to explain it clearly to a stakeholder.

## What you'll learn

- What the correlation coefficient measures, and what it misses
- Pearson versus Spearman correlation
- Why a strong correlation can exist without any causal link
- How a confounding variable creates a misleading correlation, and how to adjust for one you have measured
- Why randomization is the standard way to establish cause

## What correlation measures

The **Pearson correlation coefficient**, r, summarizes how closely two numeric variables follow a straight-line pattern. It ranges from -1 (perfect downward line) through 0 (no linear pattern) to +1 (perfect upward line). Its size describes strength; its sign describes direction. It says nothing about which variable drives the other, or whether either does.

Two cautions from earlier lessons apply. A correlation from a small sample can be strong by luck, so look at its uncertainty. And with huge samples, a trivially small r can be "significant". Spearman correlation, `stats.spearmanr`, works on ranks and is better when a relationship is consistently increasing or decreasing but curved, or when outliers are a concern.

## A correlation with no causal link

Imagine a year of daily data. The holiday season pushes up both advertising spend (the marketing team scales up in busy periods) and sales (shoppers are simply buying more). In this simulation, the ads have **no effect at all** on sales, and only the season matters (illustrative data):

```python
import numpy as np
from scipy import stats
rng = np.random.default_rng(3)

season = rng.uniform(0, 1, 365)
ads = 1000 + 3000 * season + rng.normal(0, 400, 365)
sales = 20000 + 30000 * season + rng.normal(0, 4000, 365)
r, p = stats.pearsonr(ads, sales)
print(round(r, 3))   # 0.819
```

The correlation is 0.819 with a vanishingly small p-value. A dashboard would proudly report "ad spend strongly predicts sales", and a manager might double the budget. But the strong relationship arises because season is a **confounder**, a variable that influences both.

## Adjusting for a measured confounder

If you have measured the confounder, you can remove its influence from both variables and correlate what's left. This is a simple version of a **partial correlation**: regress each variable on the confounder, then correlate the residuals (the parts season doesn't explain).

```python
def resid(y, x):
    b, a = np.polyfit(x, y, 1)
    return y - (b * x + a)

ra = resid(ads, season)
rs = resid(sales, season)
r = np.corrcoef(ra, rs)[0, 1]
print(round(r, 3))   # 0.009
```

Once season is accounted for, the correlation collapses to essentially zero, which matches how we built the data. The catch: this only works for confounders you thought of and measured. Unmeasured ones stay hidden, which is why adjustment alone rarely proves causation.

## Randomization breaks confounding

Suppose instead that ad spend is set by lottery, independent of the season (say, each day's budget is assigned at random):

```python
u = rng.uniform(0, 1, 365)
ads_r = 1000 + 3000 * u
r = np.corrcoef(ads_r, sales)[0, 1]
print(round(r, 3))   # 0.026
```

The correlation vanishes because randomly assigned spend can't be tied to the season, or to anything else. This is the logic of the **randomized controlled experiment**, and why A/B tests (Lessons 29 and 30) are the gold standard: random assignment cancels out every confounder, measured or not, on average.

## Correlation can also miss real relationships

r only captures straight-line association. A perfect but U-shaped relationship can give r near zero:

```python
x = rng.uniform(-3, 3, 200)
y = x ** 2 + rng.normal(0, 0.5, 200)
r = np.corrcoef(x, y)[0, 1]
print(round(r, 3))   # -0.165
```

Here y is almost entirely determined by x, yet r is only -0.165 (and Spearman's is about -0.181). Always **plot** the data before trusting a correlation number (Lessons 5 and 6).

## Four explanations for any correlation

When two variables move together, consider each possibility:

1. **X causes Y.** Ad spend really lifts sales.
2. **Y causes X.** Reverse causation: rising sales lead managers to spend more on ads.
3. **A third variable causes both.** Confounding, as with the season.
4. **Coincidence.** Especially when you searched many pairs (Lesson 26).

Often more than one applies at once.

## How we get to causation

Randomized experiments are strongest. When you can't randomize, you rely on careful design: measuring and adjusting for likely confounders, comparing groups before and after a change, exploiting natural experiments, and building a plausible mechanism. Even then, causal claims should be hedged. The words "associated with" are honest; "causes" needs evidence beyond correlation.

## Recap

Correlation measures linear association and says nothing about direction or cause. Confounders can create strong correlations between variables with no causal link; adjustment helps only for what you measured, while randomization handles the rest. Plot your data, consider all four explanations, and choose your words carefully. Next: simple linear regression, a tool to describe and predict relationships between variables.
