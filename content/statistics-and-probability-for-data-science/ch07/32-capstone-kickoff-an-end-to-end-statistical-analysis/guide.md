# Capstone Kickoff: An End-to-End Statistical Analysis

For six chapters you have practiced statistics one technique at a time. Real work does not arrive that way. It arrives as a business question and a messy table, and nobody tells you which lesson to use. In this capstone you will run one complete statistical analysis from question to recommendation, using everything in the course. This lesson is the kickoff: the brief, the data, and the plan. The next lesson builds the analysis, and the last one turns it into a portfolio piece.

## What you'll learn

- How to turn a business question into a testable hypothesis and a pre-analysis plan
- How to generate and inspect the capstone dataset in Python
- How the course chapters map onto the stages of a real analysis
- What deliverables you will produce

## The project brief

An illustrative online retailer redesigned its welcome experience. Instead of one welcome message, new customers now receive a three-email onboarding series. The team ran a randomized experiment on 5,000 new customers, split evenly between control and treatment. Ninety days later they recorded two outcomes for each customer: whether the customer had churned, and how much the customer spent.

The business question: **does the onboarding series reduce 90-day churn, and does it change spend?** Everything is simulated for teaching, so the numbers are illustrative.

## Write the plan before you touch the outcomes

Chapter 6 taught that decisions made before looking at results protect you from fooling yourself. Write this pre-analysis plan first:

- **Primary metric:** 90-day churn rate (a proportion). This drives the decision.
- **Secondary metric:** 90-day spend per customer (skewed, so the mean and the median may differ).
- **Test level:** two-sided, alpha 0.05 per test. Because there are two outcomes, apply a Bonferroni correction and require p below 0.025 to claim a win.
- **Before testing outcomes:** check that randomization produced the planned split and balanced groups.
- **Report:** effect size with a 95 percent confidence interval, never just a p-value.

## Generate the dataset

The customers table has one row per customer. The code below creates it with a fixed seed so your numbers match the lessons. The true churn rates are 24 percent for control and 20 percent for treatment, spend is right-skewed and grows with prior site activity, and about 2 percent of ages are missing.

```python
import numpy as np
import pandas as pd

rng = np.random.default_rng(2024)
n = 5000
df = pd.DataFrame({
    "customer_id": np.arange(1, n + 1),
    "group": rng.permutation(
        np.repeat(["control", "treatment"], n // 2)),
    "region": rng.choice(
        ["North", "South", "East", "West"], n),
    "age": rng.normal(38, 11, n).clip(18, 75).round(),
    "prior_sessions": rng.poisson(6, n),
})
treat = (df.group == "treatment").astype(int)
p_churn = np.where(treat == 1, 0.20, 0.24)
df["churned"] = rng.binomial(1, p_churn)
base = rng.lognormal(3.6, 0.7, n) \
       * np.sqrt((df.prior_sessions + 1) / 7)
df["spend"] = (base * (1 + 0.03 * treat)).round(2)
df.loc[rng.choice(n, 100, replace=False), "age"] = np.nan
df.to_csv("onboarding_experiment.csv", index=False)
```

## First look

```python
print(df.shape)
# (5000, 7)
print(df.isna().sum().to_dict())
# {'customer_id': 0, 'group': 0, 'region': 0,
#  'age': 100, 'prior_sessions': 0, 'churned': 0, 'spend': 0}
print(df.group.value_counts().to_dict())
# {'treatment': 2500, 'control': 2500}
print(round(df.spend.skew(), 2))
# 2.61
print(df.spend.median().round(2), df.spend.mean().round(2))
# 36.22 46.82
```

Three observations, all skills from earlier chapters. The dataset has 5,000 rows and only `age` has missing values, 100 of them (2 percent). We will not impute age, since it is only used for a balance check, so we will drop the missing values for that check. Spend is strongly right-skewed with a mean of 46.82 above a median of 36.22, so a t-test on the mean should be paired with a bootstrap interval and a look at the median. Overall churn is about 21 percent.

## The roadmap

1. **Describe and clean** (Chapter 1): shapes, missing values, skew.
2. **Check the design** (Chapters 4 and 6): sample ratio, covariate balance.
3. **Test and estimate** (Chapters 4 and 5): z-test, confidence interval, Welch t-test, bootstrap.
4. **Model and caveat** (Chapters 3 and 6): a regression on prior sessions, multiple comparisons, power and limitations.
5. **Communicate** (this chapter): a one-page summary a stakeholder can act on.

## Deliverables

By the end you will have a reproducible script, a results table, and a short written summary with a recommendation and its limits. Those three items are exactly what to put in a portfolio.

## Recap

A good analysis starts with a question, a primary metric, and a plan committed to in advance. You have the data, you know where it is messy, and you know the path. In the next lesson we build it.
