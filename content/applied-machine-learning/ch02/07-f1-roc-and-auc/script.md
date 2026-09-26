# Script — F1, ROC & AUC

## Segment 1 (title)

Precision and recall pull against each other, and comparing two models on two numbers is awkward. This lesson introduces a single score that combines them, F1, and then a way of judging a model that doesn't depend on any one cutoff at all: the ROC curve and its AUC.

## Segment 2 (steps)

F1 is the harmonic mean of precision and recall. A harmonic mean is dragged toward the smaller value, so you can't hide weak recall behind strong precision. F-beta adds a weight: beta of two favors recall, beta of point five favors precision. Pick the weight from the business cost.

## Segment 3 (code)

Our precision was point five one six and recall point two seven one. The plain average would be point three nine four, but F1 is lower, point three five six. Beta two, weighting recall, gives point three. Beta of point five gives point four three seven.

## Segment 4 (steps)

Predict applies a cutoff to a probability. The ROC curve sweeps that cutoff from strict to loose, plotting the true positive rate, which is recall, against the false positive rate, the share of stayers wrongly flagged. A useless model lies on the diagonal. A good one bows toward the top left.

## Segment 5 (code)

AUC, the area under that curve, is point seven four five here. It has a concrete meaning: the probability that a random churner is scored higher than a random stayer. We can check by comparing every churner with every stayer, and we get point seven four five again. Note we score with probabilities, not hard predictions.

## Segment 6 (code)

Here's the code that draws the ROC curves for both models, with the chance line for reference.

## Segment 7 (screenshot)

This is the output of the code above. Logistic regression, AUC point seven five, sits above the forest, point seven two. Yet at the default cutoff, the forest's F1 is higher, point four three against point three six. AUC judges the whole ranking. F1 judges one operating point.

## Segment 8 (outro)

So how do you choose the cutoff on purpose? Next up: confusion matrices and thresholds.
