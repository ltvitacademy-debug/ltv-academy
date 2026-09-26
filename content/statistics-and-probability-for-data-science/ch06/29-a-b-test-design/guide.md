# A/B Test Design

Regression can describe a relationship, but an observational dataset can never fully rule out confounders. A randomized experiment can. An A/B test randomly splits users into a control group (A) and a treatment group (B), changes one thing for B, and compares an outcome. Because chance alone decides who sees what, the groups are comparable in everything except the change. That is what earns the word "cause".

Most of the hard work happens before any data arrives. This lesson covers the design: what to decide up front, how to randomize, and how to size the test.

## What you'll learn

- The design checklist to complete before launching an experiment
- How random assignment removes confounding
- How to compute the sample size per group for a conversion-rate test
- Why small effects need far more users
- How to check your design with simulation, including an A/A test

## The design checklist

1. **Hypothesis and one primary metric.** Example: a redesigned checkout page raises the purchase conversion rate. Pick the metric first, so you cannot go hunting through many metrics afterward.
2. **Unit of randomization.** Usually the user, not the page view, so one person is never in both groups.
3. **Significance level, power, and minimum detectable effect (MDE).** Typical choices are alpha 0.05 and power 0.80. The MDE is the smallest lift worth caring about, for example moving conversion from 10 percent to 12 percent.
4. **Sample size and duration, fixed in advance.** Decide when you will stop before you start.

## Random assignment

Randomization is what turns a comparison into an experiment. In production you often hash the user ID so a returning user always sees the same variant. Here is the idea in numpy with a fixed seed:

```python
import numpy as np
rng = np.random.default_rng(1)
group = rng.permutation(
    np.repeat(["control", "treatment"], 10))
print((group == "control").sum())
# 10
```

Shuffling a balanced list of labels guarantees equal group sizes, and no user characteristic influences the assignment.

## Sample size for a conversion-rate test

Suppose the baseline conversion is 10 percent and we care about detecting a lift to 12 percent. The standard formula for a two-sided test on two proportions is:

```python
import numpy as np
from scipy import stats

p1, p2 = 0.10, 0.12
za = stats.norm.ppf(0.975)   # 1.96
zb = stats.norm.ppf(0.80)    # 0.842
pb = (p1 + p2) / 2
a = za*np.sqrt(2*pb*(1-pb))
b = zb*np.sqrt(p1*(1-p1) + p2*(1-p2))
n = (a + b)**2 / (p2 - p1)**2
print(int(np.ceil(n)))
# 3841
```

We need about 3,841 users in each group, or roughly 7,700 in total. With an illustrative 1,500 eligible users per day, that is 6 days. In practice, run for at least one or two full weeks so weekday and weekend behavior are both represented.

## Small effects are expensive

The denominator contains the squared difference, so halving the effect roughly quadruples the sample. Keeping the 10 percent baseline, the required users per group are:

- 10 percent to 11 percent: 14,751
- 10 percent to 12 percent: 3,841
- 10 percent to 15 percent: 686

This is why the MDE is a business decision as well as a statistical one. If a 1-point lift is worth chasing, you must be able to afford the traffic.

## Checking the design with simulation

You can trust a design more when you simulate it. Define the two-proportion z-test as a function, then run many fake experiments:

```python
def pval(a, b, n):
    pp = (a + b) / (2*n)
    se = np.sqrt(pp*(1-pp)*2/n)
    z = (b/n - a/n) / se
    return 2*(1 - stats.norm.cdf(abs(z)))

N = 3841
rng = np.random.default_rng(7)
hits = [pval(rng.binomial(N, p1),
             rng.binomial(N, p2), N) < .05
        for _ in range(2000)]
print(np.mean(hits))
# 0.805
```

When the true rates really are 10 percent and 12 percent, the test detects the difference about 80 percent of the time. That is the power we designed for. Repeat the run with both groups at 10 percent, an **A/A test**, and about 5 percent of runs are still "significant". That is the false positive rate you accepted with alpha 0.05, and a real A/A check on live traffic is also a good way to catch broken randomization or tracking.

## Guardrails

- Do not stop early because the result "looks good". Peeking inflates false positives, which lesson 31 shows.
- Track guardrail metrics, such as page load time or refund rate, to make sure a win in the primary metric does not hide damage elsewhere.
- Avoid changing the design mid-test.

## Recap

A good A/B test is decided in advance: one primary metric, a randomization unit, alpha, power, an MDE, and a fixed sample size. Random assignment supplies the causal claim, and the sample size formula tells you what that claim costs. Simulate to confirm, then run the test and analyze it, which is the next lesson.
