# Script — Data Leakage

## Segment 1 (title)

Data leakage is the most expensive mistake in applied machine learning, because nothing crashes. Your validation score is superb, and the model collapses in production. Leakage means information that wouldn't exist at prediction time snuck into training or evaluation.

## Segment 2 (steps)

There are two main kinds. Target leakage: a feature that's a consequence of the outcome. Train-test contamination: test data influencing training through preprocessing. Two other forms to watch for are temporal leakage, training on the future, and duplicates that appear in both train and test.

## Segment 3 (code)

Target leakage first. We're predicting churn, and the table has a refund issued column. Refunds happen when a customer cancels. So the column carries the answer, but when you need the prediction, there's no refund yet. We train one forest on honest features, and one with the leaky column added.

## Segment 4 (code)

The honest model gets seventy-two percent, beating the fifty-eight percent baseline. Add the refund column and accuracy leaps to ninety-six, on a proper held-out test set. The split didn't protect us, because the leak lives inside the features. The question that catches it: will I know this value at the moment I need to predict?

## Segment 5 (code)

Now contamination. The labels here are pure random noise, so no model can beat chance. The wrong way picks the twenty best of a thousand noise features using all rows, then splits. The right way splits first and selects using only the training rows.

## Segment 6 (code)

Averaged over thirty runs, the wrong order scores seventy-nine percent on labels that are literally coin flips. The right order scores fifty-one, which is chance. Selecting on all rows let the test labels influence which columns survived. Scaling has the same trap.

## Segment 7 (screenshot)

Here are both experiments as a chart, the output of the code above. The fix is always the same order: split first, fit every transformation on training rows only, then apply it to validation and test. A score that looks too good to be true usually is.

## Segment 8 (outro)

Ask whether each feature is known at prediction time, and split before you fit anything. Up next, lesson nine: encoding categorical variables.
