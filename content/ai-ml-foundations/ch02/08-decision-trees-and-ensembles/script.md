# Script — Decision Trees & Ensembles

## Segment 1 (title)

A decision tree predicts by asking a series of simple questions about the features and following true-or-false branches until it lands on an answer. Today we look at a real one, why its boundary looks the way it does, and why you almost never use just one in practice.

## Segment 2 (screenshot)

This is a genuine tree trained on the iris flower dataset. The root asks one question about petal width. Each box shows the question, how many samples reach it, how they split across classes, and gini impurity — how mixed the classes are. Zero means every sample at that leaf belongs to one class, which is exactly what every leaf here reaches.

## Segment 3 (screenshot)

Because every question tests exactly one feature against one threshold, every split is a straight line perpendicular to one axis. Stack enough of those and the regions a tree carves out are always rectangles — boxy, never diagonal or curved, unlike the RBF SVM boundary from last lesson.

## Segment 4 (steps)

A tree with no depth limit keeps splitting until every leaf is perfectly pure, which can mean carving out a tiny region just to correctly classify one or two unusual examples — memorizing noise. So in practice you rarely use just one tree. Random Forest trains many trees on random subsets of data and features and votes. Gradient boosting builds trees one at a time, each correcting the last one's errors.

## Segment 5 (code)

In this comparison, one tree scores 0.91 and is prone to overfitting. Two hundred trees averaged together score 0.96 — more robust, at the cost of losing the single tree's easy readability.

## Segment 6 (outro)

Next, we look at a model built from a very different starting idea: neural networks.
