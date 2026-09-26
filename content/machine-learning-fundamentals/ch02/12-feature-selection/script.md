# Script — Feature Selection

## Segment 1 (title)

After feature engineering, you may have dozens or hundreds of columns. It's tempting to hand them all to the model. But more features mean more noise to overfit, slower training, and harder explanations. Feature selection keeps the features that earn their place.

## Segment 2 (steps)

There are three families of methods. Filter methods score each feature on its own, with a statistic like correlation or an F-test, and keep the top scorers. Wrapper methods train a model on different subsets and keep the best one. Embedded methods select while training, like lasso regression, which you'll meet soon.

## Segment 3 (code)

Here's a filter on scikit-learn's bundled diabetes data, ten features, four hundred forty-two patients. SelectKBest with the F-regression score keeps b m i, b p, s four and s five. Sex scores almost nothing, so it's the first to go.

## Segment 4 (code)

A wrapper works differently. Recursive feature elimination trains a linear model, drops the weakest feature, and repeats until four remain. It picks b m i, s one, s two and s five, a different set than the filter. That's normal, because a wrapper judges features together, while a filter scores each one alone.

## Segment 5 (code)

Now the important part. If you select features on the whole dataset and then validate, you've leaked. Put the selector inside a pipeline so it's refit on each training fold. Four features score an R squared of point four six, against point four eight two for all ten. Most of the performance, with a simpler model.

## Segment 6 (outro)

Selection is a modeling choice, so measure it, don't assume it. Now we start the core algorithms. Next up: linear regression.
