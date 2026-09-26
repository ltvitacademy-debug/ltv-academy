# Script — Scaling & Normalization

## Segment 1 (title)

Real columns live on wildly different scales: alcohol near thirteen, proline in the hundreds. Many algorithms treat numbers as numbers, so a big-valued column can drown out a small one. Feature scaling puts them on a comparable footing.

## Segment 2 (steps)

Who needs it? Distance-based models like k nearest neighbors and k-means, because big columns dominate the distance. Gradient-based and regularized models like logistic regression, which converge faster and penalize fairly. Who doesn't? Tree-based models, which only ask whether a value is above a threshold.

## Segment 3 (code)

On scikit-learn's wine data, we split first, then fit a StandardScaler on the training rows only. We transform both train and test using those training statistics. The test columns won't average exactly zero, and they shouldn't. They're measured with the training yardstick, just as new data will be.

## Segment 4 (code)

Now the payoff. K nearest neighbors scores seventy-two percent on raw features and ninety-six percent scaled, on the same test wines. The decision tree scores ninety-four percent either way. With fifty-four test rows, treat exact figures with care. The size of the jump is the point.

## Segment 5 (screenshot)

Here's why. This is the output of the code above. On the left, proline spans over a thousand, and the other features are flat lines beside it. On the right, after standardization, all four share a common scale, so each gets a fair say in the distance.

## Segment 6 (steps)

Which scaler? Standard scaling subtracts the mean and divides by the standard deviation, and is the default. Min-max squeezes values into zero to one, but is sensitive to outliers. Robust scaling uses the median and interquartile range, so outliers barely move it.

## Segment 7 (code)

See it with one outlier, three hundred among values near ten. Standard and min-max crush the ordinary values into a sliver. Robust scaling keeps them spread from about negative one to point six, and lets the outlier stay large.

## Segment 8 (outro)

Scale for distance and gradient models, skip it for trees, and always fit on training data only. Up next, lesson eleven: creating new features.
