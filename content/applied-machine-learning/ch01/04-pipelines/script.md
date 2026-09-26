# Script — Pipelines

## Segment 1 (title)

You have a preprocessor and a model, and a rule: fit on training data, transform everything else. Keeping two objects in sync by hand is where mistakes creep in. A pipeline chains them into one estimator that you fit, score, tune, and save as a single unit.

## Segment 2 (steps)

A pipeline gives you four things. One object, so nothing gets out of sync. It accepts raw rows, so new customers can go straight in. It re-fits preprocessing inside every cross-validation fold, which prevents leakage. And when you save it, the preprocessing travels with the model.

## Segment 3 (code)

Building one is a list of name and estimator pairs. Every step but the last is a transformer. Here it's our preprocessor, then a logistic regression. Fit runs each step in order. Predict pushes raw rows through the fitted steps into the model. The test score is point seven six eight.

## Segment 4 (code)

You can look inside with named steps, or slice the pipeline, so model minus one is everything before the final model. Settings use the step name, two underscores, then the parameter, like clf double underscore C. That naming is how hyperparameter search tunes preprocessing and model together.

## Segment 5 (code)

Pass the whole pipeline to cross val score with the raw X and y. Each fold gets a fresh clone, so medians, scaling, and categories are learned from that fold's training rows only. Logistic regression averages point seven eight three AUC. Swapping in a random forest is a one-word change, and it scores point seven three five.

## Segment 6 (code)

Here's what a pipeline protects you from. On pure noise, five hundred random features and random labels, the true accuracy is fifty percent. Select the ten best features first, then cross-validate, and you get a fantasy seventy percent.

## Segment 7 (code)

Put the same selector inside a pipeline, and it's redone within each training fold. The honest answer is fifty percent, which exposes the model as worthless.

## Segment 8 (outro)

Everything is now one object, so saving it is a single call. Next up, saving and loading models.
