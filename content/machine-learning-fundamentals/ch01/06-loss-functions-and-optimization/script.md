# Script — Loss Functions & Optimization

## Segment 1 (title)

So far, fit has been a black box. This lesson opens it. Nearly every supervised algorithm learns the same way: define a number that measures how wrong the model is, then adjust its parameters step by step to shrink that number.

## Segment 2 (steps)

The number is the loss function. The steps come from gradient descent. The gradient tells you which direction is downhill for each parameter. The learning rate sets how big a step to take. Repeat until the loss stops falling. That loop is training.

## Segment 3 (code)

The choice of loss encodes what you care about. Take five houses, with one big miss. Mean squared error squares each miss, so that single outlier dominates: one hundred eighty-two. Mean absolute error treats every dollar equally: seven point two. For classification, log loss punishes confident mistakes. Saying ninety percent and being right costs point one; saying ten percent and being wrong costs over two.

## Segment 4 (code)

Now gradient descent from scratch, fitting a line to our house prices. Each step computes the error, then nudges the slope and the intercept a little in the direction that reduces the mean squared error. The learning rate multiplies the nudge. A few lines of numpy, and no library.

## Segment 5 (code)

Same starting point, three learning rates. At point zero one, the loss falls, but too slowly. At point one, it plunges to about three hundred fifty and levels off. At one point zero five, each step overshoots the valley and lands higher on the far side, so the loss explodes to billions. That's divergence.

## Segment 6 (screenshot)

This chart, the output of the code above, shows it. The red curve settles at the bottom. The gray one crawls. The gold one races upward. Run the good setting longer, and it lands on exactly the same line as the direct least squares formula.

## Segment 7 (outro)

When scikit-learn warns that logistic regression failed to converge, this is what it means: the optimizer ran out of steps. Choose a loss that matches your costs, and a learning rate that converges. Up next, chapter two, starting with lesson seven: train, validation and test splits.
