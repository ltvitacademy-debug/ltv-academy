# Script — Comparing Models Fairly

## Segment 1 (title)

You can tune a model honestly. The next question is which model to tune, and whether a winner is really a winner. Scoreboards are easy to build and easy to misread. This lesson gives you a checklist for fair comparisons.

## Segment 2 (steps)

Four rules. Give every model the same folds. Choose one metric before you look at results. Put a baseline in the table. And keep the test set for the finalist, scored once. Also keep preprocessing inside each pipeline, and give each model comparable tuning effort.

## Segment 3 (code)

Here are five candidates, scored on the same five folds with R O C A U C. The baseline scores exactly point five, a coin flip. Logistic regression gets point seven eight one, nearest neighbors point eight three two, the forest point eight nine three, and boosting point eight nine. But is the forest really better than boosting?

## Segment 4 (code)

Compare fold by fold. Forest minus nearest neighbors is positive on all five folds, averaging point zero six. That's a clear win. Forest minus boosting wins three folds and loses two, averaging point zero zero four, smaller than its own wobble. That's a tie.

## Segment 5 (code)

Why does pairing work? Plot every model's score on every fold.

## Segment 6 (screenshot)

This is the output of the code above. Fold five is hard for every model. Subtracting scores fold by fold cancels that shared difficulty, so the comparison is far sharper than comparing the averages.

## Segment 7 (code)

To firm up a close call, repeat the cross-validation three times. Now the means are point eight nine six and point eight nine seven, and the forest wins seven of fifteen pairs. A tie. And if each model gets its own folds, the gap swings from negative point zero one eight to positive point zero two two, from luck alone. When models tie, decide on speed, simplicity and cost.

## Segment 8 (outro)

Next up: understanding class imbalance.
