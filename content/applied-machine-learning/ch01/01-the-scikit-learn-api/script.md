# Script — The scikit-learn API

## Segment 1 (title)

Welcome to Applied Machine Learning. In the fundamentals course you learned what the algorithms do. Here we do the work the way a professional team does: repeatable workflows, honest evaluation, careful tuning, and models you can save and defend. The tool for all of it is scikit-learn, and its whole design rests on one small, consistent interface.

## Segment 2 (steps)

Every supervised model works the same way. Create it with its settings. Fit it on training data. Predict on new data. And score it. Learn those four verbs once, and every model in the library feels familiar.

## Segment 3 (code)

Here's our illustrative customer table. We pick two numeric columns as X, the churn label as y, and split off a test set. We keep the class mix the same in both halves with stratify.

## Segment 4 (code)

Now we create a logistic regression and call fit on the training data. Predict returns a class for each row. Predict proba returns a probability per class, so the second column is the chance of churn. Score runs predict and grades it, and for classifiers that means accuracy, here point seven six eight, on data the model never saw.

## Segment 5 (code)

Because every model speaks the same language, comparing algorithms is a loop. Notice the dummy classifier that always predicts stayed already scores point seven six four. A number means nothing without a baseline, and our model barely beats it. The rest of the course fixes that.

## Segment 6 (steps)

A few conventions to memorize. Constructor arguments are settings you choose before training, called hyperparameters. Anything learned during fit ends with an underscore, like coef underscore. And X is a two-dimensional table while y is one-dimensional.

## Segment 7 (outro)

Next, we look at the three roles objects play in this API: estimators, transformers, and predictors.
