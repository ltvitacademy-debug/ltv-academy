# Multiple Comparisons

One hypothesis test at alpha = 0.05 has a 5% chance of a false alarm when nothing is going on. That is a fair deal. But real analyses rarely stop at one test. An A/B test reports twenty metrics. A marketing analysis slices results by ten customer segments. A model search checks hundreds of features. Every extra test is another lottery ticket for a false alarm, and if you ignore this, "something significant" is almost guaranteed. This is the **multiple comparisons problem**.

## What you'll learn

- Why running many tests inflates false alarms, and by how much
- The difference between family-wise error rate (FWER) and false discovery rate (FDR)
- How to implement Bonferroni, Holm and Benjamini-Hochberg corrections
- What corrections cost you in power
- How to avoid the problem by planning, not just correcting

## How fast false alarms pile up

If you run 20 independent tests where every null hypothesis is true, the chance that at least one gives p < 0.05 is:

```
1 - 0.95^20 = 0.642
```

So about a 64% chance of at least one false alarm. We can confirm with a simulation: 1,000 experiments, each testing 20 metrics that truly don't differ (two groups of 50, illustrative):

```python
import numpy as np
from scipy import stats

rng = np.random.default_rng(1)

def null_p():
    x = rng.normal(0, 1, 50)
    y = rng.normal(0, 1, 50)
    return stats.ttest_ind(x, y).pvalue

hits = 0
for _ in range(1000):
    ps = [null_p() for _ in range(20)]
    hits += min(ps) < 0.05
print(hits / 1000)   # 0.623
```

About 62% of these "nothing is happening" experiments produced at least one significant metric, in line with the 64% formula (the small gap is simulation noise). This is exactly how a team ends up celebrating a "significant lift in a metric" that was really luck.

## Two ways to define the goal

- **Family-wise error rate (FWER):** the probability of making *at least one* false discovery in the whole family of tests. Strict; appropriate when a single false claim is costly.
- **False discovery rate (FDR):** the expected *proportion* of your discoveries that are false. More lenient, and better suited to exploratory work with many tests, such as screening hundreds of features.

## A realistic experiment

Now 20 metrics, of which 6 truly move by 0.7 standard deviations and 14 do nothing (simulated):

```python
rng = np.random.default_rng(5)
effects = [0.7] * 6 + [0.0] * 14
ps = np.array([stats.ttest_ind(rng.normal(e, 1, 50),
                               rng.normal(0, 1, 50)).pvalue
               for e in effects])
print((ps < 0.05).sum(), (ps[6:] < 0.05).sum())
# 8 2
```

Uncorrected testing flags 8 metrics, and 2 of them are false alarms. In real life you wouldn't know which ones.

## Three corrections

**Bonferroni:** test each hypothesis at alpha divided by the number of tests (here 0.05 / 20 = 0.0025). Simple and controls FWER, but conservative.

**Holm:** sort the p-values from smallest. Compare the smallest with alpha/m, the next with alpha/(m-1), and so on, stopping at the first failure. It controls FWER just like Bonferroni and is never less powerful.

**Benjamini-Hochberg (BH):** sort the p-values, find the largest rank i whose p-value is at most alpha times i/m, and declare that one and every smaller p-value significant. It controls FDR, not FWER.

```python
def bonferroni(ps, alpha=0.05):
    return ps < alpha / len(ps)

def holm(ps, alpha=0.05):
    m = len(ps)
    keep = np.zeros(m, bool)
    for rank, i in enumerate(np.argsort(ps)):
        if ps[i] >= alpha / (m - rank):
            break
        keep[i] = True
    return keep

def bh(ps, alpha=0.05):
    m = len(ps)
    order = np.argsort(ps)
    line = alpha * np.arange(1, m + 1) / m
    ok = np.where(ps[order] <= line)[0]
    keep = np.zeros(m, bool)
    if len(ok):
        keep[order[:ok[-1] + 1]] = True
    return keep

for f in (bonferroni, holm, bh):
    keep = f(ps)
    print(f.__name__, keep.sum(), keep[6:].sum())
```

Output:

```
bonferroni 5 0
holm 5 0
bh 6 0
```

The columns are the number of metrics flagged and how many of those were false alarms. All corrections removed both false alarms. Bonferroni and Holm found 5 of the 6 real effects; BH found all 6. That is the trade-off: stricter control means more missed effects (lower power). This is one illustrative run, not a general ranking. Libraries such as statsmodels provide ready-made versions; check their current documentation for exact function names.

## Prevention beats correction

- **Decide your primary metric before the experiment.** One pre-declared primary metric needs no correction; the rest are labeled exploratory.
- **Pre-register the comparisons** you plan to make, and count every test you run, including ones you didn't report.
- **Treat exploratory findings as hypotheses** to confirm in fresh data.
- Segment-slicing after the fact is especially dangerous, because the number of possible slices is enormous. Lesson 31 returns to this under "p-hacking".

## Recap

Each test carries its own false-alarm risk, and the risks accumulate: 20 true nulls give about a 64% chance of at least one significant result. Bonferroni and Holm control the chance of any false discovery; Benjamini-Hochberg controls the proportion of false discoveries and keeps more power. Corrections cost power, so the best defense is planning your comparisons in advance. Next chapter: from testing differences to asking whether one variable is related to another, and whether that relationship means cause.
