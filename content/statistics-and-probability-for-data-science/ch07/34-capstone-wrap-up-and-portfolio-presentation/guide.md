# Capstone: Wrap-Up & Portfolio Presentation

You have a correct analysis. That is only half the job. A result nobody can understand, trust, or act on has no value, and in a hiring process the write-up is often the only thing a reviewer reads. This final lesson turns the capstone into a results table, one clear chart, a short stakeholder summary, and a portfolio-ready project. It also closes out the course.

## What you'll learn

- How to assemble a clean results table from your analysis
- How to make one honest chart with uncertainty shown
- How to write a stakeholder summary: answer first, evidence, caveats, recommendation
- How to package the project for a portfolio
- What you have covered in the course, and where it leads

## Step 1: a results table

Keep every number that supports your conclusion in one place. This code continues from the analysis script in the last lesson, reusing `d`, `lo`, `hi`, `z`, `t`, `diffs`, `ctl`, and `trt`:

```python
boot_lo, boot_hi = np.percentile(diffs, [2.5, 97.5])
res = pd.DataFrame({
    "outcome": ["90-day churn (pts)", "90-day spend ($)"],
    "estimate": [d*100, trt.spend.mean() - ctl.spend.mean()],
    "ci_low": [lo*100, boot_lo],
    "ci_high": [hi*100, boot_hi],
    "p_value": [2*(1 - stats.norm.cdf(abs(z))), t.pvalue]})
res["passes_bonferroni"] = res.p_value < 0.05 / 2
out = res.round(3)
print(out.to_string(index=False))
```

The table shows churn at an estimate of -2.8 points with an interval of about -5.06 to -0.54 (the table shows -5.055 and -0.545), p of 0.015, passing the 0.025 bar. Spend shows -0.161 dollars with an interval of -2.161 to 1.994, p of 0.88, not passing. Exact formatting will come from your run; the point is that both outcomes are reported, including the one that did not work out.

## Step 2: one honest chart

A stakeholder will remember one picture. Show the primary metric for both groups with 95 percent intervals, and start the bars at zero.

```python
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

r = g.mean() * 100
se = np.sqrt(r*(100 - r)/g.count())
fig, ax = plt.subplots(figsize=(5, 4))
cols = ["#6B6259", "#8E1C1C"]
ax.bar(r.index, r, yerr=1.96*se, capsize=8, color=cols)
ax.set_ylabel("90-day churn (%)")
ax.set_title("Churn (illustrative)")
fig.savefig("churn.png", dpi=150)
```

One caution when reading it: the two error bars overlap slightly, yet the test on the difference was significant. Overlapping individual intervals do not mean a difference is unreal. The interval for the difference itself, computed in the last lesson, is the one that answers the question, so print it on the slide.

## Step 3: write the stakeholder summary

Lead with the answer, then the evidence, then the caveats, then what to do. A template:

1. **Headline:** The onboarding series reduced 90-day churn by about 2.8 percentage points (from 22.4 percent to 19.6 percent).
2. **Evidence:** Randomized experiment, 5,000 customers, 2,500 per group. The 95 percent interval for the reduction is 0.5 to 5.1 points. It stays significant after correcting for testing two outcomes.
3. **What we did not find:** No detectable effect on 90-day spend; we can rule out large effects, though differences of a couple of dollars are possible.
4. **Caveats:** The interval is wide, and the experiment could reliably detect only reductions of about 3.3 points or more, so the true effect may be smaller than the estimate. Ninety days says nothing about longer-term retention. All data here is illustrative.
5. **Recommendation:** Roll out the series, keep tracking churn, and measure longer-term retention and cost per retained customer before scaling the spend on it.

Notice what is missing: jargon. Say "fairly confident churn fell by somewhere between half a point and five points" rather than reciting a p-value first.

## Step 4: package it as a portfolio project

A reviewer should be able to run your work. A simple structure:

```
onboarding-experiment/
  README.md            question, method, headline result
  generate_data.py     the seeded data script
  analysis.py          every test in this chapter
  results.csv          the results table
  churn.png            the chart
```

In the README, state the question, your pre-analysis plan, the result with its interval, the limitations, and how to reproduce it with one command. Mention that the data is simulated, so no one mistakes it for real customers.

## What you covered

- **Descriptive statistics:** center, spread, shape, and visualization
- **Probability and distributions:** conditional probability, Bayes' theorem, expected value, the normal and other distributions, simulation
- **Sampling and estimation:** sampling bias, the central limit theorem, standard error, confidence intervals, and the bootstrap
- **Hypothesis testing:** p-values, errors and power, t-tests, chi-square, ANOVA, multiple comparisons
- **Causation and experiments:** regression, A/B test design and analysis, and the pitfalls that fool analysts
- **A complete analysis** from question to recommendation

You can now do the statistical reasoning behind most data science work, and defend it. The next course in the Data Scientist path, Data Visualization & Exploratory Data Analysis, applies this foundation to exploring and communicating data with matplotlib, seaborn, Plotly, and Power BI.
