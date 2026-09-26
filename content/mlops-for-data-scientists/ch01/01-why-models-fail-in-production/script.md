# Script — Why Models Fail in Production

## Segment 1 (title)

Welcome to MLOps for Data Scientists. You can already build a model that scores well on a test set. This course is about what happens next, when that model becomes a small piece of software that other people depend on, running on data you did not choose.

## Segment 2 (steps)

Models fail in three ways. Loudly, when the code crashes. Silently, when it keeps running but the predictions are wrong. And slowly, when the world drifts away from the data you trained on. The silent and slow failures are the costly ones, because nothing tells you they are happening.

## Segment 3 (code)

Here is a silent failure. We take our churn model and feed it the test set, but with monthly spend accidentally sent in cents instead of dollars. No error, no warning. The model just returns probabilities.

## Segment 4 (code)

As trained, the model predicts an average churn risk of point two three four, with accuracy of seventy-seven percent. With spend in cents, it predicts ninety-five percent of customers will churn, and accuracy collapses to twenty-six percent. That is training-serving skew.

## Segment 5 (screenshot)

The chart shows it clearly. The dashed line is the real churn rate. The unit bug sends predictions far above it. Even a mild change, two extra support calls per customer, pushes the average risk up to point four. That is drift.

## Segment 6 (steps)

Notebooks hide what production needs. Which data, and which version. Which cells ran, and in what order. Which library versions. And who owns the model after launch. Each chapter of this course answers one of those questions with a concrete tool.

## Segment 7 (outro)

Next, we map the whole machine learning lifecycle, and see exactly where MLOps fits in.
