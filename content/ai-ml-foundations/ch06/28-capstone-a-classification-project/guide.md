# Lesson 28 — Capstone: A Simple Classification Project

**Chapter 6 · Capstone · Lesson 28 of 30**

## What you'll learn

- How to split the capstone dataset the correct, leak-free way
- Why the scaler gets fit on the training data only
- Training a `LogisticRegression` baseline on real tumor measurements
- Running the trained model on data it has never seen
- A first honest look at how it did, before lesson 29's full evaluation

## Splitting the data

Lesson 27 loaded 569 samples and 30 features. The very first real step is
splitting that into a training set the model learns from and a test set it
never sees until prediction time — the same train/test discipline lesson
11 covered, applied for real:

```
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42)

print(X_train.shape[0], X_test.shape[0])
# 455 114
```

`stratify=y` keeps the same roughly 63/37 benign-to-malignant ratio in both
splits — without it, a random split could accidentally dump most of one
class into the test set. `random_state=42` just makes the split
reproducible; the exact number doesn't matter, only that it's fixed.

## Scaling — fit on train, apply to both

`LogisticRegression` works better when features are on a similar scale, and
this dataset's 30 measurements span very different ranges (areas in the
hundreds, smoothness values under 1). `StandardScaler` fixes that — and
lesson 27's first ground rule applies exactly here:

```
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler().fit(X_train)
X_train_s = scaler.transform(X_train)
X_test_s = scaler.transform(X_test)
```

`fit` only ever sees `X_train`. The test set is *transformed* using
statistics learned from training data, never used to compute its own mean
and standard deviation. Fitting the scaler on the full dataset before
splitting would let test-set information leak into training — exactly the
failure mode lesson 16 named.

## Training the baseline

With scaled data in hand, training is two lines:

```
from sklearn.linear_model import LogisticRegression

model = LogisticRegression(max_iter=5000)
model.fit(X_train_s, y_train)
```

`max_iter=5000` just gives the optimizer enough iterations to converge
comfortably on 30 features — scikit-learn's default (100) is tuned for
smaller problems and would otherwise print a convergence warning here.
Nothing about the model itself is unusual: this is the same
`fit(X, y)` pattern lesson 23 used to run a pretrained Hugging Face model,
applied to a model this lesson trains from scratch.

## Predicting on unseen data

```
y_pred = model.predict(X_test_s)

print(list(y_test[:10].values))
# [0, 1, 0, 1, 0, 1, 1, 0, 0, 0]
print(list(y_pred[:10]))
# [0, 1, 0, 1, 0, 1, 1, 0, 0, 0]
```

`model.predict` runs every one of the 114 test samples — rows the model's
`.fit()` call never touched — through the trained logistic regression and
returns a 0/1 prediction for each. The first ten predictions shown here
happen to match the first ten true labels exactly, which is a promising
early sign, not a final verdict — lesson 29 checks all 114, not just 10.

## Recap

The data is split 455 training rows to 114 test rows, stratified to
preserve the class balance. A `StandardScaler` fit only on the training
rows normalizes the 30 features. A `LogisticRegression` baseline trains on
the scaled training data in two lines, then predicts on the 114 held-out
rows it never saw during training. Lesson 29 takes those 114 predictions
and scores them properly — accuracy, the full confusion matrix, and
precision/recall for both classes.
