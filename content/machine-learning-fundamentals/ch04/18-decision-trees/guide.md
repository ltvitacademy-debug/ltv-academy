# Decision Trees

A decision tree makes predictions the way a checklist does: ask a yes/no question about one feature, follow the branch, ask another, and repeat until you reach an answer. Unlike the linear models of the last chapter, a tree doesn't fit one global formula. It carves the data into regions, one question at a time, and each region gets its own prediction. Trees are easy to read, need little preparation, and are the building block of the most powerful tabular models in practice.

## What you'll learn

- How a tree chooses its questions using impurity
- How to fit, read, and plot a `DecisionTreeClassifier`
- Why an unrestricted tree overfits, and how `max_depth` controls it
- The main strengths and weaknesses of trees

## How a tree learns

Training is a greedy, recursive process:

1. Look at every feature and every possible split point, such as `tenure <= 11.5`.
2. Pick the split that makes the two resulting groups as **pure** as possible, meaning each group is dominated by a single class.
3. Repeat inside each new group until a stopping rule is hit.
4. Each final group, called a **leaf**, predicts the most common class among its training rows (or the average, for a regression tree).

Purity is measured by an impurity score. The default in scikit-learn is **Gini impurity**, which is 0 for a perfectly pure group and grows as classes mix. A root node with 396 stayers and 164 churners has a Gini of 1 - (396/560)² - (164/560)² ≈ 0.414. A good split lowers the weighted impurity of the children.

## Fit a tree on illustrative churn data

We simulate 800 customers with tenure, support calls, and monthly charge. New customers, heavy support users, and high-bill customers churn more. All data are illustrative.

```python
import numpy as np, pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
rng = np.random.default_rng(5)
n = 800
df = pd.DataFrame({
    "tenure": rng.uniform(1, 60, n).round(),
    "support_calls": rng.poisson(2, n),
    "monthly_charge": rng.uniform(20, 120, n).round()})
p = (0.10 + 0.45 * (df["tenure"] < 12)
     + 0.30 * (df["support_calls"] >= 4)
     + 0.25 * (df["monthly_charge"] > 90))
df["churn"] = rng.random(n) < p.clip(0, 0.95)
X = df.drop(columns="churn")
y = df["churn"]
X_tr, X_te, y_tr, y_te = train_test_split(
    X, y, test_size=0.3, random_state=0)
tree = DecisionTreeClassifier(max_depth=3, random_state=0)
tree.fit(X_tr, y_tr)
print(round(tree.score(X_tr, y_tr), 3), round(tree.score(X_te, y_te), 3))
```

The output is `0.788 0.783`: training accuracy 78.8%, test accuracy 78.3%. Always compare against a baseline: always predicting "stay" scores 0.629 on this test set, so the tree adds real signal.

## Read the tree

```python
import matplotlib.pyplot as plt
from sklearn.tree import plot_tree
plt.figure(figsize=(11, 5))
plot_tree(tree, feature_names=list(X.columns),
          class_names=["stay", "churn"], filled=True)
plt.show()
```

Each box shows the question, its Gini score, how many training rows reached it, the class counts, and the majority class. The root splits on `tenure <= 11.5`, so tenure is the most useful first question. Follow a new customer with 6 months of tenure, 1 support call, and a $95 monthly charge: tenure is at most 11.5, the charge is above 90.5, tenure is at most 8.5, so the leaf predicts churn (in this run `tree.predict` returns `True`). That traceable path is the tree's greatest strength: you can explain any single prediction as a plain sequence of questions.

## The overfitting problem

By default a tree keeps splitting until every leaf is pure, which memorizes the training set.

```python
deep = DecisionTreeClassifier(random_state=0).fit(X_tr, y_tr)
print(round(deep.score(X_tr, y_tr), 3), round(deep.score(X_te, y_te), 3))
print(deep.get_depth(), deep.get_n_leaves())
```

This prints `1.0 0.712` and `18 156`. The unrestricted tree is perfect on training data, uses 18 levels and 156 leaves, and scores 0.712 on test, worse than the small tree's 0.783. That is overfitting from Chapter 1, in a very direct form. The knobs that control it are `max_depth`, `min_samples_leaf`, and `min_samples_split`, and you choose them with cross-validation, as you learned for regularization.

## Strengths and weaknesses

**Strengths**

- Highly interpretable and easy to explain.
- Handle numeric and (encoded) categorical features, with no scaling needed.
- Capture non-linear effects and interactions automatically.

**Weaknesses**

- Prone to overfitting unless constrained.
- Unstable: a small change in the data can produce a very different tree.
- Predictions are step-like rather than smooth.

That instability is the motivation for the next lesson: combine many trees so their individual errors cancel.

## Recap

A decision tree recursively splits the data with the questions that make groups purest, and each leaf makes a prediction. Limit its depth to avoid memorizing. Trees give you readable decisions, but a single tree is unstable. Next: random forests.
