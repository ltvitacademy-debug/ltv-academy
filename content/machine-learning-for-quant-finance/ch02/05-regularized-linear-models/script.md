# Script — Regularized Linear Models

## Segment 1 (title)

Chapter one explained why financial data is noisy, prone to overfitting, hard to label well, and non independent once labeled. Chapter two starts building the actual models, and it starts with linear models on purpose. They're the easiest to reason about, the fastest to fit, and with the right regularization, often a very reasonable baseline when a complex model has more room to overfit than to find real structure.

## Segment 2 (steps)

Financial feature sets are often noisy and collinear. Momentum measured over five, ten, and twenty days all capture overlapping information. Ordinary least squares with collinear, noisy features tends to produce large, unstable coefficients that swing wildly with small changes in the training data, which is exactly the instability you don't want when the underlying signal is already faint. Regularization fixes this by penalizing large coefficients, trading a little bias for a lot less variance.

## Segment 3 (code)

Ridge regression adds a penalty proportional to the sum of squared coefficients. It shrinks every coefficient toward zero but rarely sets any to exactly zero, which makes it a good default when you believe most of your features carry at least a little real signal. Notice the features get standardized first, since ridge penalizes coefficient magnitude directly, so features need to be on comparable scales.

## Segment 4 (code)

Lasso regression instead penalizes the sum of absolute coefficients, and that can push some coefficients to exactly zero, effectively performing feature selection. That's attractive if you suspect only a handful of your factors carry real signal. The catch is that with strongly correlated features, lasso tends to arbitrarily pick one from a correlated group and zero out the rest, so the selected features can be unstable across retrainings. Elastic net blends both penalties as a practical middle ground.

## Segment 5 (outro)

Regularized linear models give this course a stable, interpretable baseline before we move to more complex models. Up next, lesson six: tree based models, where we start capturing the non-linear interactions linear models can't see.
