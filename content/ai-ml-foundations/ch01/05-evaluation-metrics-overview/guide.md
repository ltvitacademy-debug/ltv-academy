# Lesson 5 — Evaluation Metrics, Overview

**Chapter 1 · What Machine Learning Actually Is · Lesson 5 of 30**

## What you'll learn

- Why "accuracy" alone can be dangerously misleading
- The four outcomes a classifier can land on, and what a confusion matrix shows
- Precision, recall, and why you can't maximize both at once
- Which metric to reach for, for classification vs. regression

## Why accuracy lies to you

Accuracy — the percent of predictions the model got right — is the first metric everyone learns, and the first one that fools people. Imagine a fraud model where only 1% of transactions are actually fraud. A model that predicts "not fraud" for every single transaction, ignoring the input entirely, scores 99% accuracy — while catching zero fraud. On an imbalanced dataset like this, accuracy is nearly useless on its own.

## The confusion matrix: where better metrics come from

A **confusion matrix** breaks a classifier's predictions down by what it predicted versus what was actually true, for every class, side by side. This real example, from scikit-learn's documentation, shows a 3-class classifier's predictions on the iris flower dataset:

![A 3x3 confusion matrix for predicting setosa/versicolor/virginica: 13 setosa predicted correctly as setosa, 3 versicolor predicted correctly as versicolor but 13 versicolor misclassified as virginica, and 9 virginica predicted correctly as virginica, with darker cells indicating higher counts.](/courses/ai-ml-foundations/ch01/05-evaluation-metrics-overview/confusion-matrix.png)

Read it as rows of truth, columns of prediction. Setosa is perfect: all 13 true setosa examples were predicted as setosa. Versicolor is a mess: only 3 of 16 true versicolor examples were predicted correctly — the other 13 were predicted as virginica. A single accuracy number for this whole model would hide that versicolor-vs-virginica confusion completely.

For binary classification, the same idea reduces to four outcomes:

```
                  Predicted positive   Predicted negative
Actually positive   True Positive  (TP)   False Negative (FN)
Actually negative   False Positive (FP)   True Negative  (TN)
```

## Precision and recall: a real tradeoff

- **Precision** = TP / (TP + FP) — "Of everything I flagged as positive, how much actually was?" High precision means few false alarms.
- **Recall** = TP / (TP + FN) — "Of everything that actually was positive, how much did I catch?" High recall means few misses.

These two pull against each other. A spam filter that flags everything as spam has perfect recall (catches all real spam) but terrible precision (buries your real email too). A spam filter that only flags the most obvious spam has high precision but misses a lot (low recall). Which one matters more depends on the cost of each kind of mistake — missing a cancer diagnosis is usually far worse than a false alarm, so recall often matters more in medical screening; wrongly suspending a legitimate customer account is often worse than missing one fraud case, so precision can matter more there.

**F1 score** is the harmonic mean of precision and recall — a single number that penalizes a model for being lopsided in either direction, useful when you want one summary metric instead of two.

## Regression gets its own metrics

Classification metrics (accuracy, precision, recall, F1) only apply when the output is a category. For a continuous output like predicted price, you instead use **MAE** (mean absolute error — the average size of the mistake, in the original units) or **RMSE** (root mean squared error — like MAE but penalizes large errors more heavily), or **R²** (how much of the variance in the outcome the model explains, from 0 to 1).

## Recap

Accuracy alone can hide serious problems, especially on imbalanced data. A confusion matrix shows exactly where a classifier is right and wrong, for every class. Precision and recall measure two different kinds of mistakes and usually trade off against each other; F1 balances them into one number. Regression problems use entirely different metrics — MAE, RMSE, R² — because there's no "class" to be right or wrong about. Next, we move into Chapter 2 and start with the simplest model of all: linear regression.
