# Lesson 8 — Decision Trees & Ensembles

**Chapter 2 · Core ML Concepts · Lesson 8 of 30**

## What you'll learn

- How a decision tree actually makes a prediction, one question at a time
- Why a tree's decision boundary looks "boxy" compared to other models
- Why a single deep tree overfits so easily
- How Random Forests and boosting fix that by combining many trees

## A tree is a sequence of yes/no questions

A decision tree predicts by asking a series of simple questions about the features — "is petal length <= 1.75?" — and following the "true" or "false" branch until it lands on a leaf, which holds the prediction. This is a genuine tree, trained on the iris flower dataset (predicting setosa/versicolor/virginica from four measurements), straight from scikit-learn's documentation:

![A tree diagram: the root node asks 'x[3] <= 0.8?' (petal width), splitting into a leaf that is purely setosa on the True side, and a further split on the False side asking 'x[3] <= 1.75?', which keeps branching down through more questions about x[2] and x[0] until every leaf has a gini impurity of 0.0 (a single pure class).](/courses/ai-ml-foundations/ch02/08-decision-trees-and-ensembles/decision-tree-structure.png)

Each box shows the question it asks, how many training samples reach that node, how those samples split across the three classes (`value`), and **gini impurity** — a measure of how mixed the classes are at that node (0.0 means every sample at that node belongs to the same class). Training a tree means repeatedly picking the question, at each node, that splits the current samples into the purest possible groups.

## Why the resulting boundary looks "boxy"

Because every question in the tree tests exactly one feature against one threshold, every split is a straight line perpendicular to one axis. Stack enough of those splits and the regions a tree carves out of feature space are always rectangles — never diagonal lines or smooth curves, unlike the RBF SVM or neural net boundaries from Lesson 7:

![A 2x3 grid of scatter plots, each showing the iris dataset projected onto a different pair of two features, with the background colored in rectangular red/orange/blue regions that a decision tree assigned to each class, visibly made of straight horizontal and vertical boundary lines rather than curves.](/courses/ai-ml-foundations/ch02/08-decision-trees-and-ensembles/decision-tree-surfaces.png)

This is also why trees are easy to reason about: "if petal length is under 2.5cm, it's always setosa" is a rule a human can read directly off the tree, which isn't true of a neural network's weights.

## Why a single tree overfits so easily

A tree with no depth limit will keep splitting until every leaf is perfectly pure — which, in the iris tree above, is already happening (every leaf shows `gini = 0.0`). Taken to an extreme on noisier, messier real-world data, this means a tree can carve out a tiny, oddly-shaped region just to correctly classify one or two unusual training examples — memorizing noise exactly like the degree-15 polynomial from Lesson 4. Left unconstrained, a single decision tree is one of the easiest models to overfit.

## Ensembles: combine many trees to cancel out the noise

- **Random Forest** trains many trees, each on a random subset of the training data and a random subset of features, then averages their predictions (regression) or takes a majority vote (classification). Any one tree's overfit quirks tend to get outvoted by the rest.
- **Gradient boosting** (e.g. XGBoost, LightGBM) builds trees one at a time, each new tree specifically trained to correct the previous trees' errors, then sums their contributions.

```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier

DecisionTreeClassifier().fit(X_train, y_train).score(X_test, y_test)
# 0.91  (one tree, prone to overfitting)

RandomForestClassifier(n_estimators=200).fit(X_train, y_train).score(X_test, y_test)
# 0.96  (200 trees, averaged — typically more robust)
```

Both ensemble approaches are usually a meaningful step up in accuracy and robustness over any single tree, at the cost of losing the single-tree's easy readability — you can no longer point to one simple rule and say "that's why it predicted this."

## Recap

A decision tree predicts by asking a sequence of single-feature yes/no questions, which produces boxy, rectangular decision regions and an easily overfit model if left unconstrained. Random Forests and gradient boosting combine many trees to average out individual trees' overfitting, usually at a real cost to interpretability. Next, we look at a model built very differently: neural networks.
