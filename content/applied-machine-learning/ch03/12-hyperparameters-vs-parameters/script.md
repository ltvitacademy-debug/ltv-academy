# Script — Hyperparameters vs. Parameters

## Segment 1 (title)

Every scikit-learn model has numbers inside it, and they come in two very different kinds. Knowing which is which is the foundation of tuning.

## Segment 2 (steps)

Parameters are learned from the data while fit runs. The coefficients of a regression are parameters. Hyperparameters are settings you choose before fit, like how deep a tree may grow. The model never learns those on its own. Tuning means searching for the hyperparameters that generalize best, using validation.

## Segment 3 (code)

Here is a logistic regression fit on our illustrative churn data. Learned parameters carry a trailing underscore, so coef_ and intercept_. The model found eight coefficients, like point nine one for the second feature and minus point seven two for the seventh, plus an intercept of point one nine. These attributes do not exist until you call fit.

## Segment 4 (code)

Hyperparameters go in the constructor. Call get_params to read them all and set_params to change them. Inside a pipeline, each name gets the step name, two underscores, and then the parameter, like clf double underscore C. Remember that syntax, because grid search uses it in the next lesson.

## Segment 5 (code)

A hyperparameter changes what gets learned. In logistic regression, C controls regularization: small C means strong regularization. With C of point zero zero one, the coefficients shrink to a total size of point six two, and test accuracy is only point seven two five. At C of point one, the coefficients grow and test accuracy rises to point eight one.

## Segment 6 (code)

Choose hyperparameters with validation, never training scores. On a decision tree, training accuracy climbs to a perfect one point zero as depth grows, because deeper always memorizes more. Cross-validation tells the truth: depth eight scores point nine one six, and no limit scores point nine one nine. That difference is smaller than the fold-to-fold spread of about point zero two, so it is a tie.

## Segment 7 (steps)

The habit: list candidate values, cross-validate each, keep the best while watching the spread, and check the winner once on the test set.

## Segment 8 (outro)

Next, lesson thirteen automates that search with grid search.
