# Analyzing A/B Test Results

The experiment has run for its planned duration. Now you have a table of users, their group, and what they did. Analysis is where the design pays off: because you fixed the metric and the sample size in advance, the tests you learned in chapter 5 apply cleanly. This lesson walks through a full analysis on illustrative data, from sanity checks to a decision.

## What you'll learn

- How to check that the experiment ran correctly before trusting any result
- How to test a conversion-rate difference with a two-proportion z-test and a chi-square test
- How to report the effect size and a confidence interval, not just a p-value
- How to check a secondary metric such as revenue per user
- How to separate statistical significance from practical significance

## The illustrative data

We simulate 4,000 users per group with a fixed seed. The true conversion rates are 10 percent for control and 12 percent for treatment, and revenue is nonzero only for converters.

```python
import numpy as np, pandas as pd
from scipy import stats

rng = np.random.default_rng(30)
n = 4000
df = pd.DataFrame(
    {"group": np.repeat(["control", "treatment"], n)})
p = np.where(df.group == "control", 0.10, 0.12)
df["converted"] = rng.binomial(1, p)
df["revenue"] = df.converted * rng.gamma(2.0, 30, len(df))
```

## Step 1: sanity check the split

Before looking at outcomes, confirm the groups are the size you intended. A **sample ratio mismatch** (SRM) means the observed split differs from the planned split by more than chance would allow, which usually points to a bug in assignment or logging. A chi-square goodness-of-fit test checks it:

```python
counts = df["group"].value_counts()
print(counts.to_dict())
# {'control': 4000, 'treatment': 4000}
print(stats.chisquare(counts).pvalue)
# 1.0
```

For contrast, a 4,000 versus 3,600 split under a planned 50/50 gives a p-value around 0.000004, a clear red flag. Teams commonly use a very strict threshold for this check, since it runs on every experiment. If SRM fires, fix the pipeline before analyzing the outcome.

## Step 2: test the primary metric

```python
g = df.groupby("group")["converted"]
print(g.agg(["sum", "count", "mean"]))
#            sum  count     mean
# control    431   4000  0.10775
# treatment  490   4000  0.12250
```

The observed rates are 10.8 percent and 12.3 percent. Is the gap bigger than chance? Use the pooled two-proportion z-test:

```python
x = g.sum().values
m = g.count().values
p1, p2 = x / m
pp = x.sum() / m.sum()
se = np.sqrt(pp*(1-pp)*(1/m[0] + 1/m[1]))
z = (p2 - p1) / se
print(round(z, 3), round(2*(1 - stats.norm.cdf(abs(z))), 4))
# 2.067 0.0388
```

The two-sided p-value is 0.0388, below 0.05. A chi-square test of independence on the 2x2 table gives the same answer, because z squared equals the chi-square statistic (4.27):

```python
tab = pd.crosstab(df["group"], df["converted"])
print(stats.chi2_contingency(tab, correction=False)[:2])
# (4.271323525915605, 0.038760728707094926)
```

## Step 3: report the effect and its uncertainty

```python
se_u = np.sqrt(p1*(1-p1)/m[0] + p2*(1-p2)/m[1])
d = p2 - p1
print(round(d, 4), round(d - 1.96*se_u, 4),
      round(d + 1.96*se_u, 4))
# 0.0148 0.0008 0.0287
```

The lift is about 1.5 percentage points, a relative lift of roughly 14 percent, with a 95 percent confidence interval from 0.08 to 2.87 points. That interval is the honest story: the true lift is very likely positive, but it could be tiny or nearly double the estimate.

## Step 4: check secondary metrics

Revenue per user matters too. Revenue is heavily skewed, but with thousands of users the Welch t-test is a reasonable check:

```python
ctl = df.revenue[df.group == "control"]
trt = df.revenue[df.group == "treatment"]
print(round(ctl.mean(), 2), round(trt.mean(), 2))
# 6.59 7.11
print(stats.ttest_ind(trt, ctl, equal_var=False))
# pvalue=0.3275...
```

Revenue per user is higher in treatment, but the p-value of 0.33 says we cannot distinguish that from noise. Keep in mind that this test was not designed for revenue, so its power is likely lower.

## Step 5: decide

Statistical significance answers "is there probably a real difference?" Practical significance answers "is it big enough to matter?" Combine the confidence interval with the business case: what is a 0.08 to 2.87 point lift worth, and what does the change cost to ship and maintain? Report the estimate, the interval, the guardrail results, and a recommendation. Do not report only "p less than 0.05".

## Recap

Check for sample ratio mismatch first, test the pre-registered primary metric, report the effect size with a confidence interval, glance at secondary and guardrail metrics, and then make a decision that weighs statistical and practical significance.
