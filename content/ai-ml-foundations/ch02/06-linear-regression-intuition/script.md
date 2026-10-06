# Script — Linear Regression, Intuition

## Segment 1 (title)

Linear regression predicts a continuous number by fitting a straight line through the training data. It's the oldest model in this course, and almost everything else either builds on it or was invented to overcome its limits.

## Segment 2 (screenshot)

Here's a real scikit-learn example: one linear regression, shown on the train set it learned from and a separate test set it never saw. The orange line is the whole model — just one straight line. The points don't sit exactly on it, real data never does, but it captures the trend. And the same line, learned only from the train set, still tracks the test set — that's the entire point: the pattern generalizes.

## Segment 3 (code)

The line itself is the equation from school, renamed: y equals weight times x plus bias. Training a linear regression means finding the two numbers, weight and bias, that fit the data best. That's it — those are the only numbers the model learns.

## Segment 4 (steps)

"Best fit" has a precise meaning: measure the distance from the line to every point, square each one so big misses hurt more and errors can't cancel out, and minimize the total. There's a direct formula for the exact answer, which is why linear regression trains almost instantly.

## Segment 5 (steps)

That speed and simplicity comes from the same place as its limit: a straight line can only represent a straight-line relationship. If the real pattern curves, linear regression underfits no matter how much data you give it.

## Segment 6 (outro)

Next, we look at the classification counterpart — predicting a category instead of a number.
