# Script — Regression Theory & the Gauss-Markov Assumptions

## Segment 1 (title)

The single most-used tool in empirical finance is linear regression — estimating a market beta, decomposing returns into factors, testing whether a manager generates genuine alpha. This lesson derives ordinary least squares from first principles and states exactly when it's the best possible linear estimator you could use.

## Segment 2 (code)

Ordinary least squares chooses the coefficients that minimize the sum of squared residuals, and that minimization has a closed form: the coefficient vector equals X transpose X, inverted, times X transpose y. That inverse only exists when there's no perfect collinearity among the regressors — which is exactly the first technical condition the theorem needs.

## Segment 3 (steps)

The Gauss-Markov assumptions are five conditions. The model has to actually be linear in its parameters. The errors have to have zero mean and be uncorrelated with every regressor, called exogeneity. The regressor matrix has to have full rank. And the errors need constant variance across observations, with no correlation between different observations' errors.

## Segment 4 (steps)

When all five hold, the Gauss-Markov theorem gives you something strong: ordinary least squares is BLUE, the best linear unbiased estimator. Best means minimum variance among every linear, unbiased alternative. Lose homoscedasticity or lose the no-autocorrelation condition, and ordinary least squares stays unbiased, but it stops being best, and its reported standard errors become unreliable.

## Segment 5 (code)

The capital asset pricing model turns this into one specific regression: regress an asset's excess return on the market's excess return. The slope, beta, measures how much the asset amplifies market moves — systematic risk. The intercept, alpha, is whatever return is left over once that market exposure is accounted for, and whether it's statistically significant is exactly the hypothesis test from the previous lesson.

## Segment 6 (outro)

Derive it, know when it's the best choice, and you can run and trust a regression instead of just running one. Up next, lesson twenty-two: multiple testing and false discovery, what happens to your p-values when you test thousands of strategies at once.
