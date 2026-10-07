# Script — SHAP & Model Explanation

## Segment 1 (title)

Permutation importance and MDA tell you which features matter across a whole dataset. They don't tell you why the model flagged this one stock on this one day. SHAP answers that, and it's become close to the industry standard for explaining individual predictions.

## Segment 2 (steps)

The idea comes from cooperative game theory. Treat each feature as a player and the prediction's distance from the model's average output as a payoff to be split fairly among them. A feature's Shapley value is its average marginal contribution to that payoff, computed across every possible ordering in which features could be added one at a time. Averaging over every ordering is what makes the split fair, and it guarantees that the Shapley values for one prediction add up exactly to the gap between that prediction and the baseline.

## Segment 3 (code)

In practice you compute this with the shap library. For tree-based models like random forests or gradient boosting, TreeExplainer gives you fast, exact Shapley values. For any other kind of model, the general-purpose Explainer works too, just more slowly. Either way, calling the explainer on a batch of data returns an object holding one row of Shapley values per prediction, alongside the baseline it's measured against.

## Segment 4 (steps)

This matters in finance for two reasons. Risk committees and compliance teams often want more than "the model said so" before capital gets allocated on a signal, and SHAP gives a documented, per-prediction breakdown you can actually hand to a reviewer. It also doubles as a sanity check: a summary plot ranks features by their average absolute SHAP value, and if the top-ranked feature's contributions look scattered and incoherent rather than cleanly directional, that's a sign the model may be riding on noise rather than genuine signal, even if the backtest numbers looked fine.

## Segment 5 (outro)

SHAP explains individual predictions using a fair, game-theoretic allocation of credit. Up next, lesson twenty-one: stability of signals over time, where we check whether a feature that looks important today still looks important a year from now.
