# Script — Feature Importance & Permutation Importance

## Segment 1 (title)

After asking whether a model works, the next question is what it is using. Two tools answer that for almost any model: the importance scores built into tree ensembles, and permutation importance. They can disagree, and when they do, one of them is misleading you.

## Segment 2 (two kinds)

Impurity-based importance comes free with forests and boosting. It adds up how much each feature reduced the splitting criterion during training. It is instant, but it is measured on training data and tends to favor features with lots of split points. Permutation importance shuffles one column on held-out data and measures how much the score drops. If the model gets worse, it relied on that column.

## Segment 3 (setup)

We reuse the churn data and add a column of random noise with no relationship to churn. Any method that ranks it highly is being fooled. We train a random forest, and read the built-in importances.

## Segment 4 (permutation code)

Then we call permutation importance from scikit-learn's inspection module, on the test set, scoring with AUC, shuffling each column twenty times to see the spread.

## Segment 5 (output)

Look at the disagreement. Impurity ranks the noise column at point one eight seven, above support tickets, and puts monthly charge second. Permutation gives noise a score of about zero, and says monthly charge has only a small effect, which matches how we built the data.

## Segment 6 (chart)

Here is the chart. On the left, impurity importance from training. On the right, permutation importance on the test set, with error bars. The noise column vanishes.

## Segment 7 (cautions)

Three cautions. Correlated features share credit, so both can look unimportant. Always compute permutation importance on held-out data. And importance is not causation, because it describes the model, not the world.

## Segment 8 (outro)

Next lesson, SHAP, which explains individual predictions.
