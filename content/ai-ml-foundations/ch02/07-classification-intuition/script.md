# Script — Classification, Intuition

## Segment 1 (title)

Where linear regression outputs a continuous number, classification outputs a category: spam or not spam, fraud or not fraud. Internally it's still numeric math — a score per class — but the final output is a label.

## Segment 2 (screenshot)

This is a real scikit-learn comparison: the same two datasets, run through ten classifiers, each drawing its own decision boundary. Look at the top row — two interleaved crescents. Linear SVM can only draw a straight line and scores 0.88. RBF SVM and the neural net curve their boundary to match the shape and score 0.97. Same data, very different shapes of "line," very different results.

## Segment 3 (code)

In the simplest case, a prediction comes down to a score compared against a threshold. The decision boundary is exactly the set of points where that score crosses zero.

## Segment 4 (steps)

A straight-line model can only ever draw a straight boundary, no matter how it's tuned. Curved models like RBF SVM or a neural net can bend to match the data. And a decision tree draws something different again: boxy, rectangular regions, which is what we look at next.

## Segment 5 (steps)

Classification can be binary, like spam detection, or multi-class, like ten handwritten digits. And most classifiers don't just output a hard label — they output a probability per class, so you know not just the prediction but how confident it is.

## Segment 6 (outro)

Next, we look closely at that boxy boundary a decision tree draws, and how putting many trees together improves on just one.
