# Capstone: Build It

In the kickoff you wrote a plan and generated the data. Now you run the analysis. Follow the plan in order: check the design, test the primary metric, estimate the effect, look at the secondary metric, model, and then apply the multiple-comparison rule and a power check. Every number below comes from running this code on the seeded dataset, so yours should match exactly. The data is illustrative.

## What you'll learn

- How to check randomization and covariate balance, and how to interpret a "failed" balance check
- How to test and estimate a conversion-style outcome with a z-test and confidence interval
- How to analyze a skewed outcome with a Welch t-test and a bootstrap
- How to apply the Bonferroni rule from the plan
- How to check whether the experiment was big enough

## Step 1: check the design

```python
import numpy as np, pandas as pd
from scipy import stats

df = pd.read_csv("onboarding_experiment.csv")
ctl = df[df.group == "control"]
trt = df[df.group == "treatment"]

print(stats.chisquare(df.group.value_counts()).pvalue)
# 1.0
print(round(stats.ttest_ind(trt.age.dropna(), ctl.age.dropna(),
                            equal_var=False).pvalue, 3))
# 0.31
print(round(stats.ttest_ind(trt.prior_sessions, ctl.prior_sessions,
                            equal_var=False).pvalue, 3))
# 0.636
tab = pd.crosstab(df.group, df.region)
print(round(stats.chi2_contingency(tab)[1], 3))
# 0.028
```

The split is exactly 2,500 and 2,500, so there is no sample ratio mismatch. Age and prior sessions look balanced. But region has a p-value of 0.028. What now? Randomization was done by shuffling labels, so any imbalance is chance. And when you run several balance checks at 0.05, an occasional small p-value is expected. The right response is a sensitivity check: does the treatment effect look the same inside each region?

```python
t = df.pivot_table(index="region", columns="group",
                   values="churned", aggfunc="mean")
print((t.treatment - t.control).round(3))
# East    -0.014
# North   -0.025
# South   -0.031
# West    -0.046
```

Treatment churns less in all four regions, so region is not driving the result. Note the check, and move on.

## Step 2: test the primary metric

```python
g = df.groupby("group")["churned"]
x, m = g.sum().values, g.count().values
p1, p2 = x / m
print(g.mean().round(4))
# control      0.2236
# treatment    0.1956

pp = x.sum() / m.sum()
se = np.sqrt(pp*(1-pp)*(1/m[0] + 1/m[1]))
z = (p2 - p1) / se
print(round(z, 3), round(2*(1 - stats.norm.cdf(abs(z))), 4))
# -2.432 0.015
```

Churn is 22.36 percent in control and 19.56 percent in treatment. The z-test gives z of -2.432 and a two-sided p-value of 0.015.

## Step 3: effect size and interval

```python
se_u = np.sqrt(p1*(1-p1)/m[0] + p2*(1-p2)/m[1])
d = p2 - p1
lo, hi = d - 1.96*se_u, d + 1.96*se_u
print(round(d, 4), round(lo, 4), round(hi, 4))
# -0.028 -0.0506 -0.0054
print(round(d / p1, 3))
# -0.125
```

Treatment lowers churn by 2.8 percentage points, a 12.5 percent relative reduction, with a 95 percent interval from -5.06 to -0.54 points. The interval excludes zero but is wide: the true reduction could be small.

## Step 4: the secondary metric

```python
print(ctl.spend.mean().round(2), trt.spend.mean().round(2))
# 46.9 46.74
print(ctl.spend.median(), trt.spend.median())
# 36.195 36.265
t = stats.ttest_ind(trt.spend, ctl.spend, equal_var=False)
print(round(t.pvalue, 3))
# 0.88

rng = np.random.default_rng(99)
diffs = np.empty(5000)
for i in range(5000):
    a = rng.choice(trt.spend.values, len(trt))
    b = rng.choice(ctl.spend.values, len(ctl))
    diffs[i] = a.mean() - b.mean()
print(np.percentile(diffs, [2.5, 97.5]).round(2))
# [-2.16  1.99]
```

Mean and median spend (about 36.20 versus 36.27) are essentially identical across groups. The Welch t-test p-value is 0.88, and the bootstrap interval for the difference in means is about -2.16 to 1.99 dollars. There is no evidence of a spend effect, and we can rule out large ones, though small effects of a couple of dollars remain possible.

## Step 5: a regression on prior activity

```python
r = stats.linregress(df.prior_sessions, df.spend)
print(round(r.slope, 2), round(r.intercept, 2), round(r.rvalue**2, 3))
# 3.6 25.13 0.053
```

Each additional prior session is associated with about 3.60 dollars more spend, but R-squared is only 0.053, so prior sessions explain about 5 percent of the variation. This is an association in observational variation, not proof that pushing customers to visit more would raise their spend.

## Step 6: apply the plan's rule and check power

Two outcomes means the Bonferroni threshold is 0.05 / 2 = 0.025. Churn (p = 0.015) passes. Spend (p = 0.88) does not.

Was the experiment large enough? Solve for the smallest churn rate that 2,500 users per group can detect with 80 percent power against a 24 percent baseline, using the sample-size formula from lesson 29:

```python
from scipy.optimize import brentq

def n_needed(p1, p2, alpha=0.05, power=0.80):
    za = stats.norm.ppf(1 - alpha/2)
    zb = stats.norm.ppf(power)
    pb = (p1 + p2) / 2
    return ((za*np.sqrt(2*pb*(1-pb))
             + zb*np.sqrt(p1*(1-p1) + p2*(1-p2)))**2
            / (p2 - p1)**2)

print(round(brentq(lambda p: n_needed(.24, p) - 2500, 0.15, 0.2399), 3))
# 0.207
```

The test could reliably detect a drop from 24 percent to about 20.7 percent, a reduction of roughly 3.3 points. Our observed 2.8 points is smaller than that, so the estimate is noisy and the true effect could be smaller or larger than the point estimate. Say so in your write-up.

## Recap

The design checks out, churn fell by about 2.8 points (95 percent interval -5.06 to -0.54), it survives the Bonferroni rule, and spend shows no detectable change. Next, we turn this into a story a stakeholder can act on.
