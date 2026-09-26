# Learning Curves & Diagnostics

A cross-validation score tells you how good a model is. It does not tell you what to do about it. Should you collect more data, build a more flexible model, or make the model simpler? Learning curves and validation curves answer that question by comparing how the model does on data it trained on with how it does on data it has not seen. All data in this lesson is a seeded, illustrative churn-style dataset from `make_classification`.

## What you'll learn

- How to read the gap between training and validation scores
- How to draw a learning curve with `learning_curve`
- How to draw a validation curve with `validation_curve`
- How each diagnosis maps to a next action

## The two failure modes

Bias and variance were introduced in Machine Learning Fundamentals. Here is how they show up in practice:

- **High variance (overfitting):** training score is high, validation score is much lower. The model memorizes.
- **High bias (underfitting):** both scores are low and close together. The model is too simple to capture the pattern.
- **Good fit:** both scores are high and close.

The training score alone is never enough. A model that scores 1.00 on data it has already seen has told you nothing about new data.

## A learning curve

`learning_curve` retrains the model on growing slices of the training data and returns cross-validated scores for each size.

```python
import numpy as np
from sklearn.model_selection import (
    learning_curve, StratifiedKFold)
from sklearn.tree import DecisionTreeClassifier

cv = StratifiedKFold(5, shuffle=True, random_state=42)
sizes = np.linspace(0.1, 1.0, 5)
tree = DecisionTreeClassifier(random_state=42)

n, tr, va = learning_curve(tree, X, y, cv=cv,
                           train_sizes=sizes)
print(n)                 # [ 120  390  660  930 1200]
print(tr.mean(1).round(3))  # [1. 1. 1. 1. 1.]
print(va.mean(1).round(3))  # [0.751 0.805 0.823 0.813 0.831]
```

`tr` and `va` have one row per training size and one column per fold, so `.mean(1)` averages across folds. The unpruned tree scores a perfect 1.0 on every training size. Its validation score climbs from 0.751 to 0.831 and is still rising. That gap and that upward slope say: more data would help, and so would a simpler tree.

## Plotting two models

Here is the full plotting code, with a logistic regression next to the tree.

```python
import matplotlib.pyplot as plt
from sklearn.linear_model import LogisticRegression

models = [("Decision tree", tree),
          ("Logistic regression",
           LogisticRegression(max_iter=1000))]
fig, axes = plt.subplots(1, 2, figsize=(9, 3.8),
                         sharey=True)
for ax, (name, m) in zip(axes, models):
    n, tr, va = learning_curve(m, X, y, cv=cv,
                               train_sizes=sizes)
    ax.plot(n, tr.mean(1), "--", color="gray",
            label="train")
    ax.plot(n, va.mean(1), color="crimson",
            label="validation")
    ax.set_title(name)
    ax.set_xlabel("Training rows")
axes[0].set_ylabel("Accuracy")
axes[0].legend()
plt.show()
```

The chart (output of the code above, illustrative data) shows the tree with a wide gap and a rising validation line. Logistic regression behaves differently: its curves meet near 0.82 and go flat. More rows will not help it much. To improve, you would need a more flexible model or better features.

## A validation curve

A learning curve varies the amount of data. A validation curve varies one hyperparameter. Here it is the tree's `max_depth`:

```python
from sklearn.model_selection import validation_curve

depths = [1, 2, 3, 5, 8, 12, 20]
tr, va = validation_curve(tree, X, y,
    param_name="max_depth", param_range=depths, cv=cv)
```

Averaged across folds, training accuracy runs 0.756, 0.765, 0.814, 0.870, 0.948, 0.996, 1.000 and validation accuracy runs 0.746, 0.759, 0.803, 0.827, 0.841, 0.825, 0.831. Depth 1 to 3 underfit: both scores are low and close. Depth 8 gives the best validation score, 0.841. Beyond that, training keeps climbing to a perfect 1.000 while validation slips. That is the overfitting region.

## From diagnosis to action

- **Big gap, validation still rising** (high variance): more data, a simpler model, or regularization.
- **Both scores low and close together** (high bias): a richer model or better features.
- **Flat and close together** (converged): change the model or features; more rows will not help.

Remember that these curves come from cross-validation, so the usual caution applies: they have noise. Look at the overall shape, not tiny wiggles.

## Recap

Compare training and validation scores. A big gap means variance, low and close means bias. `learning_curve` varies the data size, `validation_curve` varies a hyperparameter, and both use cross-validation. Next, lesson 12 opens the Tuning Models chapter by separating hyperparameters, which you set, from parameters, which the model learns.
