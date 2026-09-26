# t-Tests

The t-test is the everyday tool for comparing averages. Is our delivery time really different from the promise we make? Do desktop shoppers spend more than mobile shoppers? Did a loyalty program change what the same customers spend? Those three questions map onto the three flavors of t-test. Everything you learned about null hypotheses, p-values and power applies directly; this lesson is about choosing the right version and reading the output correctly.

## What you'll learn

- What a t statistic measures
- The one-sample, two-sample (Welch) and paired t-tests, and when to use each
- How to run them with `scipy.stats` and read the results
- Why paired data must not be analyzed as two independent groups
- The assumptions behind the t-test, and what to check

## The idea behind the t statistic

A t statistic is a signal-to-noise ratio: the observed difference divided by its standard error (Lesson 17). If the null is true, the t statistic follows the **t distribution**, a bell shape with slightly heavier tails than the normal, which accounts for the extra uncertainty of estimating the standard deviation from a small sample. A large |t| means the difference is big relative to its noise, and the p-value is the probability of a |t| at least that large under the null.

## 1. One-sample t-test

Compare one group's mean to a fixed value. Suppose we promise 3.0-day delivery and observe 25 deliveries (simulated for illustration):

```python
import numpy as np
from scipy import stats
rng = np.random.default_rng(11)

days = rng.normal(3.4, 1.0, 25).round(1)
t, p = stats.ttest_1samp(days, 3.0)
print(round(days.mean(), 2), round(t, 3), round(p, 4))
# 3.38 2.055 0.0509
```

The sample averages 3.38 days, but p = 0.0509 sits just above 0.05. That does not mean "delivery matches the promise". It means this sample doesn't quite clear the bar. The line between 0.049 and 0.051 is arbitrary, which is why you should report the estimate and its uncertainty, not just a verdict.

## 2. Two-sample t-test (independent groups)

Compare the means of two unrelated groups: desktop versus mobile order values.

```python
mobile = rng.normal(48, 14, 60).round(2)
desktop = rng.normal(55, 20, 45).round(2)
t, p = stats.ttest_ind(desktop, mobile, equal_var=False)
print(round(desktop.mean() - mobile.mean(), 2))   # 7.91
print(round(t, 3), round(p, 4))                   # 2.3 0.0246
```

`equal_var=False` runs **Welch's t-test**, which does not assume the two groups have equal variances. It is a safe default, and here the groups clearly differ in spread. The classic Student version (`equal_var=True`, scipy's default) gives 2.461 and p = 0.0155 on this data, a different answer, which is why the choice matters when group sizes and variances differ.

To describe how big the gap is, use an effect size such as Cohen's d, the mean difference in pooled standard deviations. For these data it comes to about 0.49, a medium-sized effect by common rules of thumb (0.2 small, 0.5 medium, 0.8 large; treat these as rough labels, not rules).

## 3. Paired t-test

When each row in one group is matched to a row in the other, such as the same customers before and after a program, use a paired test. It analyzes the per-customer differences:

```python
before = rng.normal(80, 25, 20).round(2)
after = before + rng.normal(6, 12, 20)
t, p = stats.ttest_rel(after, before)
print(round(p, 4))    # 0.0011
r = stats.ttest_ind(after, before, equal_var=False)
print(round(r.pvalue, 4))   # 0.2509
```

The paired test finds a clear effect (p = 0.0011). Treating the very same data as two independent groups gives p = 0.2509 and misses it, because customer-to-customer spending differences drown the change. Pairing removes that variation. Using the right test for how the data were collected is more than a technicality.

## One-sided or two-sided?

By default scipy runs **two-sided** tests (the mean could be higher or lower). Pass `alternative="greater"` or `"less"` for a one-sided test, but only if you decided on that direction before seeing the data and would truly ignore an effect in the other direction. When in doubt, stay two-sided.

## Assumptions to check

- **Independence:** observations aren't influenced by each other (except in the deliberate paired design).
- **Roughly normal data, or a decent sample size:** because of the central limit theorem (Lesson 16), the t-test is fairly robust with moderate samples, but with very small samples and heavy skew or outliers, look at the data and consider a permutation test or a rank-based test.
- **Random assignment or sampling:** the test cannot fix a biased sample.

## Recap

The t-test compares means as a signal-to-noise ratio. Use one-sample against a fixed value, Welch's two-sample for independent groups, and paired for matched measurements. Report the difference, an effect size and the p-value, not a bare "significant". Next, when the outcome is a category rather than a number: the chi-square test.
