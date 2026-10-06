# Lesson 4 — Overfitting & Underfitting

**Chapter 1 · What Machine Learning Actually Is · Lesson 4 of 30**

## What you'll learn

- What underfitting and overfitting actually look like, side by side
- Why a model that aces its training data can still be a bad model
- How to spot each problem by comparing training and test performance
- The general-purpose fixes for each one

## The real picture

This is one of the most useful plots in all of applied ML — it comes straight from scikit-learn's own documentation, fitting three polynomial models of increasing complexity (degree 1, 4, and 15) to the same noisy curve of sampled points:

![Three polynomial fits of increasing degree against the same true curve — degree 1 underfits with a straight line and the highest error, degree 4 tracks the curve closely, and degree 15 overfits wildly, swinging far off the true function between sample points despite the lowest-looking training error.](/courses/ai-ml-foundations/ch01/04-overfitting-and-underfitting/underfitting-overfitting.png)

Look at the mean squared error (MSE) printed above each panel. Degree 1's error is the highest of the three — it's too simple to capture the curve at all. Degree 4's error is lowest and its curve closely tracks the true function. Degree 15's error, in this specific run, is actually the largest and most unstable of all — it bends itself into a wild, wiggly shape chasing every sample point exactly, including the random noise in exactly where those points happened to land.

## Three states a model can be in

- **Underfitting** — the model is too simple (or undertrained) to capture the real pattern, so it performs poorly even on the data it trained on. Degree 1's straight line through a curved relationship is a textbook underfit.
- **A good fit** — the model captures the real, generalizable pattern without chasing noise. Degree 4 here.
- **Overfitting** — the model is complex enough to memorize the training data's noise and quirks, not just its pattern. It looks great on training data and falls apart on anything new. Degree 15 here.

## How to actually detect it

You can't tell underfitting from overfitting by looking at training performance alone — you need to compare training score against performance on data the model didn't train on:

```
                 Train score     Test score     Verdict
Underfit model      0.52            0.50        both bad -> underfit
Good-fit model       0.91            0.89        close and good -> fine
Overfit model        0.99            0.61        huge gap -> overfit
```

A large gap between training and test performance is the signature of overfitting. Both scores being mediocre, with no gap, is the signature of underfitting.

## The fixes

- **If underfitting:** use a more expressive model (a higher-degree polynomial, a more flexible algorithm), add more/better features, or train longer.
- **If overfitting:** use a simpler model, gather more training data, use regularization (a technique that penalizes overly complex models — covered alongside loss functions later in this chapter), or stop training earlier.

## Recap

Underfitting means the model is too simple to capture the real pattern and does poorly everywhere. Overfitting means the model is too complex and has memorized training-set noise instead of the underlying pattern, so it does great on training data and poorly on new data. You detect the difference by comparing training score to test score, not by looking at training score alone. Next, we'll look at the actual numbers you use to make that comparison: evaluation metrics.
