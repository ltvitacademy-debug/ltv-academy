# Script — Gradient Boosting on Financial Features

## Segment 1 (title)

Random forests in the last lesson build many trees independently and average them. Gradient boosting instead builds trees sequentially, where each new tree is trained specifically to correct the errors of the trees before it. That usually gets more predictive power out of the same features, but it also hands you more ways to overfit, which is a tradeoff you need to manage carefully on low signal financial data.

## Segment 2 (steps)

Each boosting round fits a new tree to whatever error is left in the ensemble so far. That sequential refinement is powerful precisely because it keeps chasing whatever pattern remains in the errors, including noise, if you let it run too long or too aggressively. On data where real signal is one to two percent of variance, an under regularized boosted model will happily fit the remaining noise round after round.

## Segment 3 (code)

Xgboost is one of the two dominant boosting libraries. The key knobs here are a small learning rate so the model needs many rounds to overfit, a shallow max depth since financial signal rarely needs deep interactions, subsampling of rows and features per tree for extra regularization, and l1 and l2 penalties on the leaf weights. Early stopping halts training once validation error stops improving, letting the data decide how many rounds are actually useful instead of guessing.

## Segment 4 (code)

Lightgbm is the other dominant library, using a different, typically faster tree growing strategy, with a nearly identical vocabulary of parameters. In practice, for financial features, the knobs that matter most, roughly in order, are a small learning rate paired with early stopping, a shallow max depth, and meaningful row and feature subsampling. The l1 and l2 penalties are a secondary lever on top of those.

## Segment 5 (outro)

Gradient boosting usually outperforms random forests on tabular financial features, but only with deliberate regularization to keep it from chasing noise. Up next, lesson eight: neural networks for tabular financial data, where we ask whether deep learning earns a place in this picture at all.
