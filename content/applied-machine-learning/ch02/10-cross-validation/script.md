# Script — Cross-Validation

## Segment 1 (title)

A single split gives you a single score, and it depends on which rows happened to land where. On our illustrative churn data, four random splits gave accuracy from point eight one five to point eight five. Cross-validation replaces that one roll of the dice with several.

## Segment 2 (steps)

Here is the idea. Cut the training data into k folds, say five. Hold one fold out, train on the other four, and score on the held-out fold. Rotate so every fold gets a turn as the exam. You end up with five scores, and you report their mean and their spread.

## Segment 3 (code)

In scikit-learn, cross_val_score does all of that in one call. We pass a pipeline, the training data, a StratifiedKFold so every fold keeps the churn mix, and F1 as the metric. The five scores run from point six six to point eight one, averaging point seven three with a standard deviation of about point zero five.

## Segment 4 (code)

For more than one metric, use cross_validate with a list of scorers. Set return_train_score to true and you also get training scores. Test accuracy is point eight four six against point eight five six on train. That small gap says the model is not badly overfit.

## Segment 5 (code)

Plotting the fold scores makes the point visible. The code draws a bar per fold and a crimson line at the mean.

## Segment 6 (screenshot)

This is the output of the code above. Fold two looks great and fold five looks weak, yet it is the same model and the same data. If you had evaluated on only one fold, you could have told a very different story.

## Segment 7 (code)

One more rule: everything that learns from data lives inside the pipeline. Take a hundred rows of pure noise. Selecting the best ten features first, outside cross-validation, reports point seven nine, which is impossible. Inside a pipeline, the honest score is point five four, a coin flip.

## Segment 8 (outro)

Use stratified folds for classification, report mean and spread, and keep preprocessing inside the pipeline. Next, lesson eleven: learning curves and diagnostics.
