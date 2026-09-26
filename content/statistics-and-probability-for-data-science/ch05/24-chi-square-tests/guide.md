# Chi-Square Tests

The t-test compares averages of numbers. But much of business data is categorical: a customer bought or didn't, the ticket was about billing, shipping or login, the visitor used mobile, desktop or tablet. To test claims about counts in categories you use a **chi-square test** (written χ², pronounced "kigh-square"). It answers questions like "is the mix of categories different from what I'd expect by chance?"

## What you'll learn

- The core idea: comparing observed counts with expected counts
- The chi-square goodness-of-fit test for one categorical variable
- The chi-square test of independence for two categorical variables
- How to find which cells drive a result, and how to measure the effect size
- The assumptions and cautions

## The core idea

Take a table of counts. Under the null hypothesis, you can work out how many observations you'd **expect** in each cell. The chi-square statistic adds up how far the **observed** counts are from those expected counts:

```
chi-square = sum of (observed - expected)^2 / expected
```

If the observed counts are close to expected, the statistic is small. If they diverge, it's large. Under the null, the statistic follows a chi-square distribution whose shape depends on the **degrees of freedom**, and that gives the p-value.

## Goodness of fit: one variable

Suppose a support team gets 300 tickets in a week, spread over five weekdays as 70, 55, 50, 58 and 67 (illustrative). Is the workload evenly distributed, meaning 60 per day expected?

```python
import numpy as np
import pandas as pd
from scipy import stats

obs = np.array([70, 55, 50, 58, 67])
res = stats.chisquare(obs)
print(round(res.statistic, 3), round(res.pvalue, 4))
# 4.633 0.327
```

`stats.chisquare` assumes equal expected counts unless you pass `f_exp`. Here p = 0.327, so the day-to-day variation is entirely plausible under an even workload. Notice this isn't proof the load is even. With only 300 tickets, moderate imbalances could hide.

## Test of independence: two variables

Now the more common case. Did the purchase rate differ by device? Here are 2,000 sessions (illustrative):

```python
table = pd.DataFrame(
    {"bought": [120, 95, 60],
     "no_purchase": [880, 605, 240]},
    index=["mobile", "desktop", "tablet"])
chi2, p, dof, expected = stats.chi2_contingency(table)
print(round(chi2, 3), round(p, 4), dof)
# 12.483 0.0019 2
```

The null hypothesis is that purchase and device are **independent**: the purchase rate is the same for every device. `chi2_contingency` computes the expected count for each cell from the row and column totals (row total times column total divided by grand total) and returns the statistic, p-value, degrees of freedom (here (3-1) x (2-1) = 2) and the expected table. With p = 0.0019, independence looks implausible.

## Which cells drive the result?

A significant chi-square says "somewhere there is a difference", not where. Look at the rates and at the expected counts:

```python
print(expected.round(1))
r = table["bought"] / table.sum(axis=1)
print(r.round(3))
```

Purchase rates are 12.0% (mobile), 13.6% (desktop) and 20.0% (tablet). The expected tablet purchases were 41.2 but we observed 60. You can also compute standardized residuals, `(observed - expected) / sqrt(expected)`; the tablet "bought" cell is about 2.9, far larger than any other, so tablets drive this result, while the mobile and desktop rates are close to each other.

## Effect size: Cramér's V

As with p-values in general, significance isn't magnitude. **Cramér's V** scales chi-square to a 0 to 1 range:

```python
n = table.values.sum()
k = min(table.shape) - 1
v = np.sqrt(chi2 / (n * k))
print(round(v, 3))   # 0.079
```

A V of about 0.08 is a small association. There is a real difference, but device explains only a little of who buys.

## Assumptions and cautions

- Counts must be **counts of independent observations**, not percentages or repeated measurements of the same customers.
- Expected counts should not be too small. A common guideline is at least 5 in most cells. For small tables, use Fisher's exact test (`stats.fisher_exact`) for 2x2 tables.
- Chi-square finds association, not causation. Tablet users might differ from mobile users in many ways.
- Large samples make trivial associations significant, so check Cramér's V.

## Recap

Chi-square tests compare observed counts to the counts expected under the null. Goodness-of-fit checks one variable against expected proportions; the test of independence checks whether two categorical variables are related. Follow a significant result with cell-level inspection and an effect size. Next: comparing the means of three or more groups with ANOVA.
