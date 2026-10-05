# Lesson 21 — Drift and Performance Monitoring

**Chapter 4 · Security, Access and Monitoring · Lesson 21 of 30**

## What you'll learn

- The difference between data drift, concept drift, and label delay — three distinct ways a model stops matching reality
- Why performance monitoring alone can't catch drift in time
- A real, commonly used technique for detecting data drift (PSI), including the thresholds practitioners actually use
- What a governance program is supposed to do once drift is confirmed

## Three ways a model stops matching reality

The previous lesson's "output distribution" signal has a name for its underlying cause: drift. But "drift" covers more than one failure mode, and they call for different responses:

- **Data drift** — the statistical shape of the model's input data has shifted since training. A fraud model trained on pre-pandemic transaction patterns is a classic example: the inputs it sees now simply look different from what it learned on, even if the underlying relationship between inputs and fraud hasn't changed.
- **Concept drift** — the relationship between inputs and the correct output has itself changed. The same customer behavior that used to indicate loyalty might now indicate something else entirely, because the world changed, not just the data distribution.
- **Label delay** — the true outcome a model is trying to predict isn't known immediately. A loan-default model's "ground truth" might not be knowable for months after a decision is made, which means real performance monitoring is running on a lag, by design, not by neglect.

## Why performance monitoring alone isn't enough

If you only monitor performance against ground-truth labels, label delay means you find out a model has degraded only after it's already been wrong for months. Data drift gives you an earlier warning sign: you can detect that the inputs have shifted today, long before the outcomes needed to measure "accuracy" are even available. That's why drift detection and performance monitoring are two separate, complementary practices, not one.

## A real technique: Population Stability Index (PSI)

PSI is a commonly used, real statistical measure for data drift: it compares the distribution of a feature (or a model's output scores) between a baseline period and a current period, and produces a single number summarizing how much that distribution has shifted.

```python
# Illustrative PSI calculation — the standard shape of the formula
def psi(expected, actual, buckets=10):
    e_pct = bucket_percentages(expected, buckets)
    a_pct = bucket_percentages(actual, buckets)
    return sum(
        (a - e) * log(a / e)
        for e, a in zip(e_pct, a_pct)
    )

# A commonly used rule of thumb for interpreting the result:
#   PSI < 0.1   -> no significant shift
#   0.1 - 0.2   -> moderate shift, worth investigating
#   PSI > 0.2   -> significant shift, retrain or review
```

*The standard PSI formula and the rule-of-thumb thresholds practitioners commonly cite — illustrative code, not output from a specific tool, and the thresholds are a convention, not a universal legal requirement.*

PSI isn't the only drift technique — other statistical tests (Kolmogorov-Smirnov, Jensen-Shannon divergence) serve similar purposes — but PSI is widely used because it's simple to compute and easy to explain to a non-technical reviewer.

## What happens once drift is confirmed

Detecting drift isn't the finish line — it's a trigger for a decision that governance has to have already planned for:

- **Investigate first** — confirm the drift is real and understand its likely cause before reacting
- **Retrain if the underlying relationship still holds** — feed the model current data and go back through approval (Lesson 16) like any other new version
- **Roll back or pause if the relationship has fundamentally changed** — a retrain won't fix concept drift if the thing being predicted no longer means what it used to
- **Document the response** — drift, investigation, and action all belong in the model's version history (Lesson 15), not just a resolved alert

## Key terms

| Term | Meaning |
|---|---|
| Data drift | A shift in the statistical shape of a model's input data since it was trained |
| Concept drift | A change in the actual relationship between inputs and the correct output |
| Label delay | A gap between a prediction and when its true outcome becomes knowable, which delays real performance measurement |
| Population Stability Index (PSI) | A statistical measure comparing a baseline and current distribution to quantify how much it has shifted |

## Lab

For a model you're familiar with (or the loan-default example above), identify: how long is the label delay likely to be before ground truth is known? Given that delay, would data drift detection or waiting for performance metrics catch a problem sooner? Explain your reasoning in two or three sentences.

## Check yourself

Can you explain the difference between data drift and concept drift with your own example for each, and describe why label delay makes performance-only monitoring insufficient on its own?
