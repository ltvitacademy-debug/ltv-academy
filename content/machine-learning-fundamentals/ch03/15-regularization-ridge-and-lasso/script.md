# Script — Regularization: Ridge & Lasso

## Segment 1 (title)

Give a regression model enough features and enough freedom, and it will find patterns that aren't really there. That's overfitting. Regularization fights it by adding a penalty for large coefficients, so the model has to earn every bit of complexity it uses.

## Segment 2 (steps)

The loss becomes squared errors plus alpha times a penalty. Ridge penalizes the sum of squared coefficients. It shrinks everything toward zero but rarely reaches it. Lasso penalizes the sum of absolute values, and it can push coefficients to exactly zero, removing features. Alpha sets the strength.

## Segment 3 (code)

Here's a problem built to overfit: forty features, only four that matter, and just sixty training rows. We put a StandardScaler and each model in a pipeline, because penalties depend on coefficient size, and size depends on units.

## Segment 4 (code)

Look at the results. Plain regression scores point nine one nine on training rows, but negative point six four five on test rows. Worse than guessing the average. Ridge scores point four nine two on test. Lasso scores point six three six, and keeps only ten of the forty features.

## Segment 5 (screenshot)

This is the output of the code above. Regression's coefficients swing wildly, mostly fitting noise. Ridge squeezes them toward zero. Lasso leaves most at exactly zero, and keeps a handful.

## Segment 6 (steps)

A few practical rules. Scale features first. Choose alpha with cross-validation, using ridge C V or lasso C V, never the test set. Prefer ridge for many small, correlated effects, and lasso when you suspect only a few features matter. And remember: regularization can't create a signal that isn't there.

## Segment 7 (outro)

Now we need proper ways to measure regression models. Next up: regression metrics.
