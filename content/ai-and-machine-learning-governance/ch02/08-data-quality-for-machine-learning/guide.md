# Lesson 8 — Data Quality for Machine Learning

**Chapter 2 · Data for AI · Lesson 8 of 30**

## What you'll learn

- How the six quality dimensions from Data Quality Management apply, specifically, to training data
- Why ML amplifies a data quality problem instead of just repeating it
- A concrete failure mode for each dimension when the data in question trains a model
- Why "good enough for a report" and "good enough to train on" are different bars

## The same six dimensions, a sharper edge

If you've been through Data Quality Management in this catalog, you already know the six dimensions: accuracy, completeness, consistency, validity, uniqueness, and timeliness. None of that gets replaced here — training data still has to clear the same bar as any other governed data. What changes is the consequence of failing it. A quality problem in a report is read by people who bring their own judgment. A quality problem in training data gets learned as a pattern and then applied automatically, without judgment, to every future case that resembles it.

## How each dimension shows up in training data specifically

- **Accuracy.** A mislabeled training example doesn't just contain one wrong fact — it actively teaches the model the wrong association between an input and an output. Enough mislabeled examples and the model learns the error as if it were a real pattern.
- **Completeness.** Missing values force a model to make assumptions during training that nobody explicitly chose. Missing representation of an entire segment of the population (not just missing fields) is its own, more serious completeness failure — covered further in Lesson 9 on bias.
- **Consistency.** If the same concept is recorded two different ways across the training set (different units, different category labels, different formats), the model may learn to treat them as genuinely different things, muddying the pattern it's supposed to find.
- **Validity.** Out-of-range or malformed values distort the statistical signal the model is trying to learn from — an age of 200 or a negative price doesn't just look wrong, it pulls the model's internal pattern slightly toward nonsense.
- **Uniqueness.** Duplicate records don't just waste storage — they quietly overweight whatever pattern those duplicates represent, and can cause a more subtle problem called data leakage, where the same record appears in both the training data and the data later used to test the model, making test results look better than they really are.
- **Timeliness.** A model trained on stale data learns patterns that described the world as it was, not as it is now. Unlike a report that's clearly dated, a model gives no visual cue that its internal picture of "normal" might be out of date.

## Why ML amplifies instead of just repeating

A human reading a flawed report can apply skepticism. A model doesn't apply skepticism to the data it was trained on — it treats the patterns in that data as ground truth and extends them, confidently, to new cases the data never covered. That's the mechanism behind the phrase "garbage in, garbage out, at scale": the output isn't just as bad as the input, it's the input's flaw generalized and repeated indefinitely.

## Key terms

| Term | Meaning |
|---|---|
| Data leakage | When the same or related records appear in both training and test data, making a model's test performance look artificially good |
| Quality dimension | One of the six measurable aspects (accuracy, completeness, consistency, validity, uniqueness, timeliness) used to judge whether data is good enough |
| Amplification | ML applying a data flaw as a confident, repeated pattern rather than a one-off error a human would catch |

## Lab

Pick one of the six quality dimensions. Write one paragraph describing a specific, plausible way that dimension could fail in a training dataset for a model your organization might realistically build (a churn predictor, a resume screener, a fraud filter — your choice), and what the model would likely learn as a result.

## Check yourself

Can you name all six quality dimensions from Data Quality Management and, for each one, state in your own words how it shows up differently when the data in question is training data rather than a report?
