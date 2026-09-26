# Script — Regression Metrics in Practice

## Segment 1 (title)

When a model predicts a number, there is no confusion matrix. Every prediction is off by some amount, and you need one honest figure to summarize them. Here are the four regression metrics you will use most.

## Segment 2 (steps)

M A E is the typical miss, in dollars. R M S E squares each miss first, so a few big errors count for a lot. R squared measures skill against a baseline that just predicts the mean. And M A P E expresses each miss as a percent of the true value.

## Segment 3 (code)

Try five homes you can check by hand. Four predictions miss by ten thousand dollars, and one misses by a hundred thousand. M A E is twenty-eight thousand. R M S E is forty-five thousand six hundred, much bigger, because the single large miss dominates. Fix that one miss, and both drop to exactly ten thousand.

## Segment 4 (code)

On the illustrative housing data, a baseline that always predicts the mean misses by about ninety-five thousand dollars, with an R squared of zero. Ridge cuts M A E to thirty thousand eight hundred sixty. Gradient boosting is slightly better, at twenty-nine thousand one hundred thirty-three. Its worst miss topped two hundred thousand, so R M S E sits well above M A E.

## Segment 5 (code)

In cross-validation, error metrics are negated, so scikit-learn's rule that greater is better still holds. Use names like neg mean absolute error, then flip the sign back when you report.

## Segment 6 (code)

Now a useful check. Split the test homes into cheap, mid, and expensive bands, and compare the average error in dollars against the error in percent.

## Segment 7 (screenshot)

This is the output of the code above. In dollars, the error nearly triples from cheap to expensive homes. As a percent, it stays near ten percent everywhere. Report M A E if dollars matter, M A P E if a ten percent miss is equally bad anywhere. And never compare R squared across datasets, because it depends on the spread of the data.

## Segment 8 (outro)

A single score is only a start. Next up: cross-validation.
