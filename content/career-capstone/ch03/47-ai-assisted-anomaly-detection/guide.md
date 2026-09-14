# Lesson 47 — AI-Assisted Data Quality: Anomaly Detection Basics

**Chapter 3 · AI for Data Engineers (Bonus) · Lesson 47 of 81**

## What you'll learn

- Where statistical anomaly detection fits into a pipeline's existing data-quality checks
- The z-score method, and the assumption it depends on
- Isolation forest, at a conceptual level, and when z-score isn't enough
- Why this is a data-quality technique, not a machine learning course
- How this connects to the real-time quality checks from Fabric & Real-Time Analytics

## Not a new pipeline stage — a sharper check

Fabric & Real-Time Analytics Lesson 39, "Real-Time Data Quality," already
covers checking incoming data for problems as it streams in. Anomaly
detection isn't a separate system bolted on top of that — it's a
statistical way to answer one specific question sharper than a fixed
threshold can: **is this value unusual given everything else I've seen,**
not just "is it outside a number I hardcoded."

## Z-score: the simple case

The z-score method assumes your metric is roughly normally distributed,
and flags anything too many standard deviations from the mean:

```
z = (x - mean) / standard_deviation

Rule of thumb: |z| > 3  ->  flag as an anomaly
```

Applied to a pipeline: track daily row counts for a table over the last 90
days, compute the mean and standard deviation, and flag any new day whose
count has a z-score beyond 3. This catches a load that's dramatically too
small or too large — a common, cheap first check.

**The catch:** z-score assumes a roughly bell-shaped distribution. Daily
row counts with a strong weekday/weekend pattern, or a metric with a hard
floor at zero, break that assumption and produce false alarms.

## Isolation forest: when one number isn't enough

Isolation forest is a different idea, at a conceptual level: instead of
assuming a distribution shape, it builds many random partitions of your
data points and measures how quickly each point gets isolated by chance
splits. Points that separate out fast (in few splits) are the unusual
ones — no bell curve assumption required, and it naturally handles
**multiple metrics at once** (row count *and* average order value *and*
distinct customer count together), which a single z-score can't.

```
Z-score:            one metric, assumes normal distribution
Isolation forest:   multiple metrics, no distribution assumption,
                     flags points that separate out in few splits
```

This lesson stops at the concept. Building and tuning an isolation forest
model is a data science skill, not a data engineering one — the point
here is knowing the tool exists and roughly what it's for, so you
recognize when a data science teammate reaches for it.

## Where AI fits in

An LLM doesn't replace either method — it helps you get to them faster:
drafting the z-score check as a PySpark cell (the same review habit from
Lesson 45 applies), or explaining an isolation forest's flagged output in
plain language for a report. The statistics are still the statistics; AI
speeds up writing and explaining the check, not deciding what "anomalous"
means for your data.

## Key terms

| Term | Meaning |
|---|---|
| Z-score | Standard deviations from the mean; simple, assumes a normal-ish distribution |
| Isolation forest | Flags points that separate out in few random splits; no distribution assumption, handles multiple metrics |
| False alarm | A flagged "anomaly" that's actually normal variation the method's assumptions didn't fit |

## Check yourself

You're ready for Lesson 48 when you can explain, without looking: why does
a z-score check on daily row counts risk false alarms for a table with a
strong weekday/weekend pattern, and what alternative handles that better?
