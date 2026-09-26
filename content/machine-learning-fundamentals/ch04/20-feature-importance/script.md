# Script — Feature Importance

## Segment 1 (title)

A random forest can be accurate, but a hundred trees can't be read like a checklist. Stakeholders still ask: what is the model actually paying attention to? Feature importance ranks the inputs by how much the model relies on them. Done carefully, it's powerful. Done carelessly, it misleads.

## Segment 2 (steps)

There are two main methods. Impurity-based importance totals how much each feature reduced impurity across all the trees. It's free, computed during training. Permutation importance shuffles one column in held-out data and measures how much the score drops. It works with any model, and reflects generalization.

## Segment 3 (code)

On the breast cancer data, feature importances underscore gives worst radius, worst perimeter, and worst concave points at the top, each around point one three. Five of thirty features carry about sixty percent of the total. Wrap the values in a pandas Series to make them readable.

## Segment 4 (code)

Now permutation importance on the test set, with ten shuffles per feature. The ranking changes. Worst texture appears at third, which impurity missed. And the values are small: shuffling the best feature costs only about two points of accuracy.

## Segment 5 (screenshot)

This is the output of the code above. Why so small? Worst radius and worst perimeter correlate at point nine nine four, and worst area is strongly tied to them too. Shuffle one, and the model leans on its siblings. Correlated features share credit, so the order within a group is fairly arbitrary.

## Segment 6 (steps)

So remember the pitfalls. Correlated features share importance. Importance is not causation. It tells you how much, not which direction. Compute it on held-out data when you can. And if one feature dominates unexpectedly, check for data leakage.

## Segment 7 (outro)

Importance guides what the model uses, not how the world works. Next, two other classic algorithms. Up next: k-nearest neighbors and Naive Bayes.
