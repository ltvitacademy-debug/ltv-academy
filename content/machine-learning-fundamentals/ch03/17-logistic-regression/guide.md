# Logistic Regression

Everything so far predicted a number. Many real questions ask for a category instead: will this customer churn, is this transaction fraud, will this patient be readmitted? **Logistic regression** is the classic tool for predicting a yes-or-no outcome. Despite the word "regression" in its name, it is a classification model, and it is the natural bridge from the linear models of this chapter to the classifiers of the next ones.

## What you'll learn

- Why a straight line is the wrong shape for a yes/no target
- How the sigmoid function turns a linear score into a probability
- How to fit `LogisticRegression`, get probabilities, and apply a threshold
- How to read a coefficient as an effect on the odds

## Why not just use a line?

Suppose churn is coded 1 for "left" and 0 for "stayed". A straight line predicting that target will happily output 1.4 or -0.3, which are not probabilities. Logistic regression fixes this by feeding the usual linear score through the **sigmoid** (logistic) function, which squashes any number into the range 0 to 1:

```
score = intercept + b1 × x1 + b2 × x2 + ...
probability = 1 / (1 + e^(-score))
```

A large positive score gives a probability near 1, a large negative score gives a probability near 0, and a score of 0 gives exactly 0.5. The result is an S-shaped curve.

## Fit it on illustrative churn data

We simulate 400 customers where longer tenure means lower churn risk. As always, we hold out a test set. All numbers are illustrative.

```python
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, confusion_matrix
rng = np.random.default_rng(11)
n = 400
tenure = rng.uniform(1, 60, n)
logit = 2.0 - 0.09 * tenure
churn = rng.random(n) < 1 / (1 + np.exp(-logit))
X = tenure.reshape(-1, 1)
X_tr, X_te, y_tr, y_te = train_test_split(
    X, churn, test_size=0.25, random_state=0)
clf = LogisticRegression().fit(X_tr, y_tr)
print(clf.intercept_.round(2), clf.coef_.round(3))
```

This prints an intercept of `[2.35]` and a coefficient of `[[-0.107]]`: each extra month of tenure lowers the score, and the built-in truth was 2.0 and -0.09.

One thing to know: scikit-learn's `LogisticRegression` applies L2 regularization by default (the parameter `C`, where smaller means stronger). That is the ridge idea from the last lesson, and it is one reason the fitted values differ a little from the truth.

## Probabilities first, decisions second

```python
print(clf.predict_proba([[6], [36]]).round(2))
print(clf.predict([[6], [36]]))
print(round(accuracy_score(y_te, clf.predict(X_te)), 3))
print(confusion_matrix(y_te, clf.predict(X_te)))
```

```
[[0.15 0.85]
 [0.82 0.18]]
[ True False]
0.79
[[52  9]
 [12 27]]
```

`predict_proba` returns two columns: the probability of not churning, then of churning. A 6-month customer has an 85% churn probability; a 36-month customer has 18%. `predict` applies a **threshold** of 0.5 by default, so the first customer is labeled `True` (will churn) and the second `False`. You can pick a different threshold: lower it to catch more churners at the cost of more false alarms.

Accuracy on the test set is 0.79. The **confusion matrix** breaks that down: rows are actual classes, columns are predicted. Of 61 customers who stayed, 52 were right and 9 were flagged as churners; of 39 who churned, 27 were caught and 12 were missed. Lesson 16 gave you metrics for regression; classification has its own set (precision, recall, and others) that build on this table.

## See the curve

```python
import matplotlib.pyplot as plt
xs = np.linspace(1, 60, 100).reshape(-1, 1)
plt.scatter(X_tr, y_tr, s=12, alpha=0.4)
plt.plot(xs, clf.predict_proba(xs)[:, 1], color="crimson")
plt.axhline(0.5, linestyle="--", color="gray")
plt.xlabel("Tenure (months)")
plt.ylabel("P(churn)")
plt.show()
```

The dots at 0 and 1 are actual outcomes; the crimson S-curve is the predicted probability, crossing the 0.5 threshold at about 22 months.

## Reading a coefficient: odds

A coefficient in logistic regression acts on the **log-odds**. Exponentiate it to get an **odds ratio**: `np.exp(-0.107)` is about 0.90. Each additional month of tenure multiplies a customer's odds of churning by about 0.90, roughly a 10% reduction in the odds, holding other features fixed. Note this is a change in odds, not in probability.

## Things to remember

- Like linear regression, the model draws a straight boundary in feature space, so it struggles with tangled, non-linear patterns unless you add engineered features.
- Scale features when using regularization, as in the previous lesson.
- With imbalanced classes, accuracy can mislead, so check the confusion matrix and consider the threshold.

## Recap

Logistic regression passes a linear score through the sigmoid to get a probability, then applies a threshold to make a decision. It is fast, interpretable through odds ratios, and a strong baseline for any yes/no problem. Next, we look at a very different family of models: decision trees.
