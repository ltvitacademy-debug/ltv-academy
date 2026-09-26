# Script — Estimators, Transformers & Predictors

## Segment 1 (title)

Fit isn't only for models. Scalers, imputers, and encoders also learn from data, and they follow the same interface. scikit-learn sorts everything into three roles, and once you see them, the whole library makes sense.

## Segment 2 (steps)

An estimator is anything that learns from data with fit. A transformer is an estimator that also has transform: it takes a table and returns a changed table, like a scaler or an imputer. A predictor has predict and turns features into answers. Transformers don't need the target. Predictors do.

## Segment 3 (code)

Here's a median imputer on our customer table. Fit learns one median per column and stores them in statistics underscore, note the trailing underscore. Transform then fills the gaps. In this version, the result comes back as a plain NumPy array, so column names are gone.

## Segment 4 (code)

Now scale, then train. Fit transform is a shortcut that fits and transforms in one call. Look at the asymmetry. On the training data we fit. On the test data we only transform, reusing what training taught us. The scaled training columns average exactly zero. The test columns don't, and they shouldn't.

## Segment 5 (code)

Every estimator can describe its own settings. Get params returns them as a dictionary. Set params changes them. And clone builds a brand-new unfitted copy with the same settings. The clone has no learned coefficients, while the original keeps its own.

## Segment 6 (steps)

Here's the rule to carry forward. Fit the transformer on training data only. Transform the training data. Transform the test data with the same fitted object. Then never refit on new data. Fitting on the test set is data leakage, and it makes your score look better than reality.

## Segment 7 (outro)

Doing this by hand across many column types gets tedious and risky. Next up, ColumnTransformer.
