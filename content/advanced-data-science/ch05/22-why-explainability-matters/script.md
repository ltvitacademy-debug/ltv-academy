# Script — Why Explainability Matters

## Segment 1 (title)

A model that predicts well is not automatically a model you can use. Before a retention team spends budget on your churn scores, someone will ask why those customers are flagged. Explainability is the set of tools that answer that question.

## Segment 2 (four reasons)

There are four reasons it matters. Trust and adoption, because stakeholders act on predictions they understand. Debugging, because a model can score well for the wrong reasons. Decisions about people, where regulations and policies may require reasons and bias checks. And improvement, because knowing what drives predictions tells you where to invest.

## Segment 3 (two axes)

Explanations come in two axes. Global explanations describe the model overall. Local explanations describe one single prediction. And intrinsic models, like logistic regression, can be read directly, while post-hoc methods explain a black box after it is trained.

## Segment 4 (interpretable code)

Our running example is subscription churn, with two thousand illustrative customers. We standardize the features, fit a logistic regression, and read its coefficients.

## Segment 5 (coefficients)

Tenure has a negative coefficient, so longer customers churn less. Support tickets, contract type, charges, and late payments all push risk up. Notice the logistic regression scored an AUC of point seven four one, while default gradient boosting scored point seven oh six. A black box is not automatically better.

## Segment 6 (leak)

Now the important part. Someone adds a column recording a cancellation call, which happens because the customer is already leaving. The AUC jumps to point nine five two. Feature importance shows that one column carries eighty-eight percent of the weight. The explanation exposed a leak the metric hid.

## Segment 7 (outro)

Next lesson, feature importance and permutation importance.
