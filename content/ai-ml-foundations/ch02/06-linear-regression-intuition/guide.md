# Lesson 6 — Linear Regression, Intuition

**Chapter 2 · Core ML Concepts · Lesson 6 of 30**

## What you'll learn

- What linear regression actually predicts, and how it draws its line
- How "best fit" is defined mathematically, without heavy math
- Why a straight line is both linear regression's strength and its limit
- What the slope and intercept actually mean once the model is trained

## The simplest model worth understanding first

Linear regression predicts a continuous number (a price, a temperature, a score) by fitting a straight line — or, with more than one feature, a flat plane or hyperplane — through the training data. It's the oldest model in this course, and almost every other model you'll meet either builds on it or was invented specifically to overcome its limits. Understanding it well pays off for the rest of the course.

## The real picture: a line fit to noisy data

This is a genuine scikit-learn example: a linear regression trained on one feature, shown on both the training set it learned from and a separate test set it never saw during training.

![Two scatter plots side by side, 'Train set' and 'Test set', each showing blue data points and a single orange straight line of best fit running through them — the fitted line follows the same upward trend in both panels even though the right panel's points were never used to fit it.](/courses/ai-ml-foundations/ch02/06-linear-regression-intuition/linear-regression-fit.png)

The orange line is the model: one straight line, defined by just two numbers. Notice the points don't sit exactly on the line — real data never does — but the line captures the overall upward trend. Critically, the same line (learned only from the train set, left) still tracks the trend in the test set (right), which is the entire point: the pattern generalizes to data the model never saw.

## What the line actually is

A simple linear regression with one feature is the equation you learned in school: `y = mx + b` — renamed in ML as `y = w*x + b`, where `w` (weight) is the slope and `b` (bias/intercept) is where the line crosses the y-axis. With more than one feature, it becomes `y = w1*x1 + w2*x2 + ... + b` — still linear, just in more dimensions.

```
y_pred = weight * x + bias

# e.g. predicting house price from square footage:
y_pred = 142.5 * sqft + 18200
# a 1500 sqft house -> 142.5*1500 + 18200 = $232,550
```

**Training** a linear regression means finding the values of `w` and `b` that make the line fit the data as closely as possible — everything else is fixed by the data; those are the only two numbers (per feature) the model learns.

## What "best fit" means

"Best fit" has a precise definition: the line that minimizes the total squared distance between each actual data point and the line's prediction at that point (this is exactly the loss function covered in Lesson 10). Squaring the distance does two things: it makes every error positive (so overshooting and undershooting don't cancel out), and it punishes large errors more than small ones. There's a closed-form formula for the exact best-fit line with ordinary least squares, which is why linear regression trains almost instantly compared to models that need iterative gradient descent.

## The honest limitation

A straight line can only represent a straight-line relationship. If the real relationship curves (like the polynomial example from Lesson 4), linear regression will underfit no matter how much data you give it — this is a modeling choice, not a bug. That tradeoff — simple and fast vs. flexible and slow — is a theme you'll see again throughout this chapter.

## Recap

Linear regression predicts a continuous value by fitting the straight line (or hyperplane) that minimizes total squared error against the training data. It learns exactly two numbers per feature — a weight and a bias — and trains quickly because there's a direct formula for the best fit. It's simple, fast, and interpretable, but limited to relationships that are actually linear. Next, we look at the classification counterpart: predicting a category instead of a number.
