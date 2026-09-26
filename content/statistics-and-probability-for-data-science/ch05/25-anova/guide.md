# ANOVA

Your team has designed three versions of a landing page and randomly assigned visitors to each one. You measure order value for every visitor. Are the three average order values genuinely different? With two groups you would use a t-test. With three or more, you use **ANOVA**, short for analysis of variance. Despite the name, it is a test about means, and it gets there by comparing kinds of variability.

## What you'll learn

- Why we don't just run many t-tests
- The idea of between-group versus within-group variability, and the F statistic
- How to run a one-way ANOVA in scipy and how to compute it by hand
- How to find which groups differ with a post-hoc test (Tukey's HSD)
- Effect size (eta squared), assumptions, and a rank-based alternative

## Why not several t-tests?

With three groups you'd need three pairwise t-tests; with five groups, ten. Every additional test is another chance for a false alarm, and the overall Type I error rate climbs well above the 5% you intended (Lesson 26 quantifies this). ANOVA asks a single question first: **is there any difference among these means?**

## The core idea

- **Between-group variability:** how far the group means sit from the overall mean.
- **Within-group variability:** how much individuals vary inside each group (the noise).

The **F statistic** is the ratio of the two (each divided by its degrees of freedom). If all groups share the same true mean, the between-group spread is just noise, and F is near 1. If the group means truly differ, F is large. The null hypothesis is that all group means are equal; the alternative is that at least one differs.

## Running it in Python

Simulated order values for three page designs, 60 visitors each (illustrative):

```python
import numpy as np
from scipy import stats
rng = np.random.default_rng(21)

a = rng.normal(50, 12, 60).round(2)
b = rng.normal(54, 12, 60).round(2)
c = rng.normal(60, 12, 60).round(2)
print([round(g.mean(), 2) for g in (a, b, c)])
# [50.56, 53.61, 58.18]

f, p = stats.f_oneway(a, b, c)
print(round(f, 3), round(p, 4))
# 7.359 0.0009
```

F = 7.359 and p = 0.0009, so we reject the null that all three means are equal.

## Behind the scenes

The same result from first principles, using sums of squares:

```python
groups = (a, b, c)
grand = np.concatenate(groups).mean()
ssb = sum(len(g) * (g.mean()-grand)**2 for g in groups)
ssw = sum(((g - g.mean()) ** 2).sum() for g in groups)
print(round(ssb, 1), round(ssw, 1))   # 1764.4 21217.6
print(round(ssb / (ssb + ssw), 3))    # 0.077
```

With k = 3 groups and N = 180 observations, F = (ssb / (k - 1)) / (ssw / (N - k)) = (1764.4 / 2) / (21217.6 / 177), which is about 7.36, matching scipy. The last line is **eta squared**, the share of total variability explained by group membership: about 7.7%. A significant F with a modest eta squared means the group matters, but most of the variation is still individual differences.

## Which groups differ? Post-hoc tests

A significant ANOVA doesn't say where the difference lies. **Tukey's HSD** compares every pair while controlling the overall false-alarm rate:

```python
res = stats.tukey_hsd(a, b, c)
print(res.pvalue.round(4))
# A vs B  0.2807
# A vs C  0.0006
# B vs C  0.0606
```

(The printed matrix is symmetric; the comments summarize its off-diagonal entries. `tukey_hsd` exists in SciPy 1.8 and later, so check your version.) Only A versus C is clearly different. B sits in between and cannot be separated from either neighbor with this sample size, a reminder that "not significant" doesn't mean "the same".

## Assumptions

- Observations are **independent** (random assignment helps).
- Within each group the data are **roughly normal**, or samples are large enough that the central limit theorem covers you.
- The groups have **similar variances**. If the spreads differ a lot, consider Welch's version of ANOVA (available in other libraries) or a different approach.

If the assumptions look shaky, the rank-based **Kruskal-Wallis** test (`stats.kruskal`) is a common alternative. On this data it gives p = 0.0016, the same conclusion.

## Recap

ANOVA tests whether three or more means differ by comparing between-group to within-group variability through the F statistic. A significant result opens the door to post-hoc comparisons such as Tukey's HSD, and eta squared tells you how much the grouping actually explains. Next, the wider problem behind why we didn't just run many t-tests: multiple comparisons.
