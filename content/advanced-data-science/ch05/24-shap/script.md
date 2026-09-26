# Script — SHAP

## Segment 1 (title)

Permutation importance tells you which features matter overall. It cannot tell you why this customer was flagged, or which direction a feature pushed. SHAP can. It splits any single prediction into one contribution per feature, and those contributions add up exactly to the model's output.

## Segment 2 (idea)

The idea comes from game theory. Treat the features as players cooperating to produce a prediction, and divide the credit fairly for moving it away from the average. For one row you get a base value, plus a signed contribution per feature. Positive pushes risk up, negative pushes it down, and everything adds up to the model's output.

## Segment 3 (code)

Install it with pip install shap. We train a gradient-boosting churn model, build a TreeExplainer, and ask for the SHAP values of the test set. For a binary boosted classifier the contributions are in log-odds, not probability.

## Segment 4 (output)

Averaging the absolute values gives a global ranking: tenure first, then contract type, monthly charge, support tickets, and late payments. And for customer zero, the base value plus the five contributions equals negative one point oh eight, exactly the model's own output.

## Segment 5 (summary plot)

The summary plot shows every customer as a dot. Red is a high feature value. High tenure sits on the left, pushing toward staying. A monthly contract sits on the right, pushing toward churn. That is direction, which importance bars alone cannot show.

## Segment 6 (waterfall)

The waterfall explains one customer. A non-monthly contract pulls churn risk down by point five six. Charge and late payments push it up. The total is a churn probability of about twenty-five percent.

## Segment 7 (cautions)

A few cautions. State your units, since these are log-odds. SHAP explains the model, not the world. Correlated features can share credit in surprising ways. And other explainers exist for other model types, so check the current documentation.

## Segment 8 (outro)

Next lesson, communicating model decisions to stakeholders.
