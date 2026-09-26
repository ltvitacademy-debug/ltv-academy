# Script — Statistics & Machine Learning Interview Questions

## Segment 1 (title)

Statistics and machine learning rounds test judgment more than memorization. Interviewers want to hear you reason: state the idea, give a concrete example, and name a limit. This lesson walks through questions that commonly come up, with answers grounded in the Harvest Table churn project. Every number was produced by running code, and all of it is illustrative.

## Segment 2 (code: bias and variance)

Bias and variance. A too-simple model does poorly on both training and test data. A too-flexible one nails the training data and stumbles on new data. On a noisy dataset, a depth-one tree scored fifty-five percent on test. An unlimited tree scored a perfect one hundred on training, but only sixty-three on test. Depth three balanced the two, at seventy-one.

## Segment 3 (steps: p-values and precision)

A p-value is the probability of a result at least this extreme if the null hypothesis is true. It is not the chance the null is true, and not the effect size. For precision versus recall, tie the answer to cost. A cheap retention email favors recall. An expensive discount call favors precision.

## Segment 4 (code: leakage)

Leakage means information from outside the training data influences the model. Here we select features on pure noise before cross-validation. The leaky version scored point eight three, when random labels should score about point five. Fitting selection inside a pipeline gave point four nine. Fit every step inside the fold.

## Segment 5 (steps: imbalance and regularization)

With a two percent cancel rate, predicting no one cancels scores ninety-eight percent accuracy, so accuracy misleads. Use precision, recall and threshold choice. Class weights raised recall from forty to seventy-four percent, but precision fell. For regularization, ridge shrinks coefficients, while lasso can zero some out, selecting features.

## Segment 6 (steps: A/B pitfalls)

For A/B tests, watch for peeking, many comparisons, and small samples. In my simulation with no true difference, stopping at the first significant result across five looks gave a fourteen percent false-positive rate, not five. Detecting a rise from ten to eleven percent needs roughly fourteen thousand seven hundred per group.

## Segment 7 (outro)

Answer in three beats: the idea, an example, a caveat. Next, we practice SQL and coding problems.
