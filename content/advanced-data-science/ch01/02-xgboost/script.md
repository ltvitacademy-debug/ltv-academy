# Script — XGBoost

## Segment 1 (title)

The boosting loop from last lesson works, but real projects need more: protection against overfitting, missing values, speed, and a way to stop training on time. XGBoost, short for extreme gradient boosting, adds all of that, and has been a workhorse of tabular machine learning for years.

## Segment 2 (steps)

Four things set XGBoost apart. Regularization: penalties on leaf weights and on splits keep trees from getting too wild. Native missing values: at every split it learns which way blank rows should go, so you don't have to impute. Speed: it builds trees from histograms of binned values and uses multiple cores. And subsampling: rows and columns can be sampled per tree, borrowing the forest's randomness.

## Segment 3 (code)

Here's the setup on an illustrative churn table, six thousand customers. We split three ways: train, validation, and test. The validation set is what early stopping watches, so the test set stays untouched. We ask for up to five hundred trees at a learning rate of point oh five, and stop after thirty rounds with no improvement in validation AUC.

## Segment 4 (code)

The results. A logistic regression baseline scores point eight oh five test AUC. XGBoost scores point eight two eight. Training all five hundred trees without stopping scores lower, point eight one nine. Early stopping ran for a hundred forty-seven rounds and kept round one sixteen.

## Segment 5 (screenshot)

This is the output of the code above. Validation AUC climbs fast in the first few dozen rounds, then flattens. The dashed line marks the best round, and training stopped thirty rounds after it.

## Segment 6 (steps)

A few habits to keep. Let early stopping choose the tree count, with a small learning rate. Tune depth and regularization on validation data, never on the test set. And read feature importance as a clue, not a cause: correlated features can share or steal credit.

## Segment 7 (outro)

Next, two alternatives with their own strengths: LightGBM and CatBoost.
