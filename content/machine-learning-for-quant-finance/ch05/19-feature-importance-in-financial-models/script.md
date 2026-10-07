# Script — Feature Importance in Financial Models

## Segment 1 (title)

You've spent the last chapter learning to validate a model honestly. Once it survives purged walk-forward validation, the next question is why it works. Feature importance is the first tool for that, but the most popular method comes with a sharp edge in finance.

## Segment 2 (steps)

Every tree-based model in scikit-learn or XGBoost gives you feature importances for free, computed from the training data by tracking how much each feature reduced impurity every time it was used as a split. It's convenient, but it's biased. A feature with many unique values gets more chances to produce a locally good split, so it looks more important regardless of real signal. And when two features are highly correlated, which is the normal case in finance, the tree splits on one or the other more or less at random, and credit gets divided unevenly between them.

## Segment 3 (code)

A better alternative is permutation importance. Instead of counting splits during training, it takes a model that's already fit, shuffles the values of one feature on held-out data, and measures how much worse the model's performance gets. That's model-agnostic, since it only touches inputs and outputs, and it's measured out of sample, so it isn't fooled by a model that simply memorized noise during training.

## Segment 4 (steps)

This matters specifically because of López de Prado's critique of financial feature sets. Financial data is full of redundant, substitute variables — a dozen different momentum or volatility measures that all describe something similar. The built-in importance score is computed in-sample by counting splits, and that's exactly the setup where substitute effects cause the most damage. Permutation importance, and its cross-validated cousin mean decrease accuracy, measure importance out of sample instead, which makes them the safer default for financial models.

## Segment 5 (outro)

Feature importance tells you which variables matter overall, but it doesn't explain any single prediction. Up next, lesson twenty: SHAP and model explanation, which attributes each individual prediction to the features that actually drove it.
