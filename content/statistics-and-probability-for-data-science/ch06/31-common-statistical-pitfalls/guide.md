# Common Statistical Pitfalls

You now know how to test hypotheses, build intervals, run regressions, and design experiments. This lesson is about the ways those tools go wrong even in careful hands. None of these mistakes need a bad intention. They come from the way data and human attention behave, and each one can be demonstrated in a few lines of Python.

## What you'll learn

- Why peeking at an experiment and stopping early inflates false positives
- How Simpson's paradox reverses a conclusion when you aggregate
- What regression to the mean is and why it fakes "improvements"
- How hidden multiple comparisons, survivorship bias, and base rates mislead
- A short habit checklist for every analysis

## Pitfall 1: peeking at a running test

You launch an A/B test and check the p-value every day. The moment it dips below 0.05 you stop and declare victory. The trouble is that every look is another chance for random noise to cross the line. Simulate an A/A test, where there is no true difference, and check once versus ten times:

```python
import numpy as np
from scipy import stats
rng = np.random.default_rng(31)

def pval(x, y):
    k = len(x)
    pp = (x.sum() + y.sum()) / (2*k)
    se = np.sqrt(pp*(1-pp)*2/k)
    z = (y.mean() - x.mean()) / se
    return 2*(1 - stats.norm.cdf(abs(z)))

def run(peeks, N=2000, sims=2000):
    fp = 0
    for _ in range(sims):
        a = rng.binomial(1, 0.10, N)
        b = rng.binomial(1, 0.10, N)
        fp += any(pval(a[:k], b[:k]) < 0.05
                  for k in peeks)
    return fp / sims

print(run([2000]))
# 0.042
print(run(range(200, 2001, 200)))
# 0.2055
```

With one planned look, about 4 to 5 percent of null experiments are flagged, close to the alpha of 0.05. With ten looks, about 20 percent are. Fixed-sample tests are only valid when you look once, at the planned end. If you must monitor continuously, use a method designed for sequential testing rather than repeated ordinary tests.

## Pitfall 2: Simpson's paradox

A trend in aggregated data can reverse when you split it into groups. Here is a small illustrative table of conversions by device:

```python
import pandas as pd
d = pd.DataFrame({
    "device": ["desktop", "desktop", "mobile", "mobile"],
    "group": ["control", "treatment"] * 2,
    "users": [1600, 400, 400, 1600],
    "conv": [320, 88, 16, 80]})
cols = ["users", "conv"]
tot = d.groupby("group")[cols].sum()
print(tot.conv / tot.users)
# control      0.168
# treatment    0.084
```

Within desktop, treatment converts at 22 percent versus 20 percent. Within mobile, 5 percent versus 4 percent. Treatment wins in both segments, yet loses overall (8.4 percent versus 16.8 percent), because most treatment users were low-converting mobile visitors. The cause is an uneven mix of segments across groups. A properly randomized test should balance device across arms, so an imbalance like this is a signal to investigate, and it is a constant hazard in observational data.

## Pitfall 3: regression to the mean

If you select the extreme performers in one period, they tend to look less extreme next period, even if nothing changes. Their first-period score was partly skill and partly luck, and luck does not repeat.

```python
rng = np.random.default_rng(5)
skill = rng.normal(100, 10, 1000)
y1 = skill + rng.normal(0, 10, 1000)
y2 = skill + rng.normal(0, 10, 1000)
top = y1 >= np.percentile(y1, 90)
print(y1[top].mean().round(1))   # 124.4
print(y2[top].mean().round(1))   # 112.2
print(y2.mean().round(1))        # 100.2
```

The top decile scored 124.4 in year 1 and 112.2 in year 2, with no intervention at all. If you had applied a "training program" to that group, it would look like it added value. Compare against a control group chosen the same way.

## Pitfall 4: other traps

- **Hidden multiple comparisons.** Test 20 metrics or segments at alpha 0.05 and the chance of at least one false positive is `1 - 0.95**20`, about 64 percent. Choose one primary metric in advance and correct for the rest.
- **Survivorship bias.** Analyzing only the customers who stayed, or the startups that survived, hides everyone who left.
- **Base rate neglect.** A test that is 95 percent accurate can still be wrong most of the time when the thing it detects is rare, as Bayes' theorem showed.
- **Significant is not important.** With enough users, trivial effects reach p less than 0.05. Always report effect size and an interval.

## A habit checklist

1. State the question and the primary metric before looking at outcomes.
2. Fix sample size and stopping rule in advance.
3. Check group balance and sample sizes.
4. Report effect size with a confidence interval.
5. Count how many things you tested, and correct for it.
6. Ask what data is missing, and why.

## Recap

Most statistical errors are not arithmetic. They are protocol errors: peeking, ignoring segments, chasing extremes, and testing too many things. Building the checklist above into your routine is worth more than any single test.
