# Script — Avoiding Overfitting the Validation Set

## Segment 1 (title)

You already know not to tune on the test set. But there is a subtler trap. If you tune long enough against your cross-validation folds, the validation score itself stops being honest. This lesson measures that effect, and shows how to get an estimate you can trust.

## Segment 2 (steps)

Every dataset has a job. The training rows fit the parameters. The validation folds compare models and tune hyperparameters. The test set gives one final, honest check. The trouble starts when the validation folds are used to make hundreds of decisions.

## Segment 3 (code)

Here is a noisy dataset and a grid of two hundred sixty-four combinations. The best combination scores point seven six seven in cross-validation. But the average combination scores only point six one four. The winner is the luckiest of two hundred sixty-four noisy estimates, so its score is flattering.

## Segment 4 (steps)

Nested cross-validation fixes this. Hold out one outer fold. Run the full grid search on the rest. Score the winner on the held-out fold. Then repeat for every outer fold and average. The search never sees the data it is graded on.

## Segment 5 (code)

In scikit-learn, grid search is itself an estimator, so you pass it straight to cross val score. The nested estimate is point seven three eight, a few points below the point seven six seven that best score reported. Across ten different datasets, the gap averaged about three and a half points.

## Segment 6 (code)

To see it, plot the score of every combination as a histogram, and mark the best score and the nested estimate.

## Segment 7 (screenshot)

This is the output of the code above. The best score sits at the far right edge of the distribution, above the honest nested estimate. Nested cross-validation is expensive, so use it to estimate performance, then fit your final model normally on all the training data.

## Segment 8 (outro)

Next, we put different models on a level playing field. Up next: comparing models fairly.
