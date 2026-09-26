# Script — Grid Search

## Segment 1 (title)

In the last lesson you tuned one hyperparameter at a time by hand. Real models have several, and they interact. Grid search tries every combination for you, cross-validating each one.

## Segment 2 (steps)

Grid search takes four steps. You give it a grid, which is a dictionary mapping each hyperparameter to a list of values to try. It cross-validates every combination, ranks them by mean validation score, and finally refits the best one on all of the training data.

## Segment 3 (code)

Here we tune a random forest on our illustrative churn data. The grid has two values for n_estimators, three for max_depth, and two for min_samples_leaf. That is twelve combinations. With five folds, scikit-learn runs sixty fits. We pass the model, the grid, five folds, and F1 as the score, then call fit.

## Segment 4 (code)

Afterward, best_params_ holds the winner: no depth limit, min_samples_leaf of one, and two hundred trees. best_score_ is the cross-validated F1, point nine one seven. Because refit defaults to true, best_estimator_ is already trained on all the training data, and predict uses it. On the untouched test set, F1 is point nine one eight.

## Segment 5 (code)

Do not stop at the winner. Turn cv_results_ into a data frame and look at every row. The top two scores, point nine one seven and point nine oh nine, differ by less than their standard deviations, so they are close to a tie. The worst combination, depth three, scores only point seven eight two. Depth matters far more than tree count here.

## Segment 6 (steps)

A few habits. If the best value sits at the edge of your grid, like no depth limit here, widen the grid and search again. The cost is combinations times folds, so grids explode quickly. Top scores may be statistical ties. And n_jobs of minus one runs fits in parallel.

## Segment 7 (code)

With a pipeline, name each parameter as the step name, two underscores, then the parameter. Because the scaler is inside the pipeline, it is refit inside every fold, so there is no leakage. Here the best C is one, with F1 of point seven three.

## Segment 8 (outro)

Next, lesson fourteen: random and Bayesian search, for when grids get too big.
