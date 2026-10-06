# Script — Evaluation Metrics, Overview

## Segment 1 (title)

Accuracy is the first metric everyone learns, and the first one that fools people. Imagine a fraud model where only 1% of transactions are actually fraud. Predict "not fraud" for every single one, and you score 99% accuracy while catching zero fraud.

## Segment 2 (screenshot)

This is a real confusion matrix from scikit-learn's docs, for a 3-class flower classifier. Read it as rows of truth, columns of prediction. Setosa is perfect — all 13 true examples predicted correctly. Versicolor is a mess: only 3 of 16 were predicted correctly, and 13 were called virginica instead. A single accuracy number would hide that confusion completely.

## Segment 3 (code)

For binary classification it reduces to four outcomes: true positive, false negative, false positive, true negative. Every other metric is built from these four numbers.

## Segment 4 (steps)

Precision asks: of everything I flagged as positive, how much actually was? Recall asks: of everything that actually was positive, how much did I catch? They trade off against each other — a filter that flags everything catches all the real cases but buries you in false alarms. F1 score balances both into one number.

## Segment 5 (code)

Regression problems don't have a "class" to be right or wrong about, so they use different metrics entirely: mean absolute error, root mean squared error, which punishes big misses harder, and R-squared, the share of the outcome's variance the model explains.

## Segment 6 (outro)

Next, we move into chapter two and start with the simplest model of all: linear regression.
