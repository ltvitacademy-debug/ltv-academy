# Script — Multiple Regression

## Segment 1 (title)

One feature is rarely enough. A house's price depends on its size, but also its age, its bedrooms, its neighborhood. Multiple regression extends the line to any number of features. The scikit-learn code is the same. What changes is how you read the results.

## Segment 2 (steps)

The model has one coefficient per feature, plus an intercept. Training still uses least squares, choosing all the coefficients together. And each coefficient means: the change in the prediction for one more unit of that feature, holding the others fixed. That last phrase is the key to reading the model.

## Segment 3 (code)

Here we fit on two hundred illustrative houses, with a held-out test set. Same LinearRegression, but now X has three columns: square feet, bedrooms, and age.

## Segment 4 (code)

The coefficients: about a hundred nine dollars per square foot, and about eight hundred eighty-eight dollars less for each year of age. On unseen test houses, R squared is point nine five two.

## Segment 5 (code)

Do the extra features help? A model on square footage alone scores point nine one four on the same test set. All three features score point nine five two. Age carried independent information, and the test data confirms it.

## Segment 6 (steps)

Two traps. First, correlated features. Square feet and bedrooms correlate at point eight three here, so the model struggles to split credit, and the bedrooms coefficient drifts from the value we built in. That's multicollinearity. Second, categories need encoding into numbers first, for example with one-hot columns.

## Segment 7 (outro)

With many features, models can overfit. Next up: regularization, with ridge and lasso.
