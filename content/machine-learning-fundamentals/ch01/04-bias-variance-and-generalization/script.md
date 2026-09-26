# Script — Bias, Variance & Generalization

## Segment 1 (title)

A model can score brilliantly on its training data and still fail on new data. Two ideas explain why: bias and variance. Understand them, and you'll know what to do when a model disappoints.

## Segment 2 (steps)

Generalization is the real goal: how well the model does on new rows. Bias is systematic error from a model too simple to capture the pattern, which is underfitting. Variance is sensitivity to the particular sample it saw, so a different sample gives a very different model, which is overfitting. Noise is randomness no model can remove.

## Segment 3 (code)

Let's measure it. We generate noisy points from a sine curve, so we know the truth, split them in half, and fit polynomials of degree one, three and nine. Higher degree means a more flexible curve. All illustrative, all seeded.

## Segment 4 (code)

Look at the test error, the last column. The straight line is poor on both sets: high bias. Degree three is good on both. Degree nine has the lowest training error, but a test error of about six point eight, far worse than any other. If you'd judged by training error, you would have picked the worst model.

## Segment 5 (code)

To see variance directly, we refit each model on two hundred fresh samples and record its prediction at one point, where the true value is one. The line averages point four nine: biased. Degree nine averages nearly right, but scatters four times more than degree three. That scatter is variance.

## Segment 6 (screenshot)

Here are the three fits, the output of the code above, with the true pattern dashed. The line ignores the curve. Degree three follows it. Degree nine chases noise and swings wildly at the edge.

## Segment 7 (outro)

Flexibility always lowers training error, so only held-out data can tell you which side you're on. Next up, lesson five: diagnosing and fixing overfitting and underfitting.
