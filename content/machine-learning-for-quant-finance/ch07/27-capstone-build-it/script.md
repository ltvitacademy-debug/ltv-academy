# Script — Capstone: Build It

## Segment 1 (title)

Lesson twenty-six laid out the brief, and crucially, the validation plan decided before any model gets trained. This lesson walks through a worked example of the full pipeline, from features through a gradient-boosted model to the out-of-sample metrics that tell you whether any of it actually worked.

## Segment 2 (code)

Start by engineering a small set of standard features per asset, something like twenty-day momentum, twenty-day realized volatility, and a ten-day mean-reversion z-score, the same toolkit built up across chapters two and three. The label looks five days forward. Then set up a gradient-boosted classifier, but notice it isn't fit yet. Fitting happens inside each fold of the validation loop, never once on the whole dataset beforehand, because fitting once and validating afterward is exactly the bolted-on mistake the kickoff lesson warned against.

## Segment 3 (code)

The validation loop itself walks forward through time, training on everything up to a point, then skipping a purge gap, then testing on the fold after that, with an embargo trimmed off its end. That purge and embargo exist specifically because the label looks five days into the future, so without that gap, a test observation's label window would overlap the training set and leak information backward.

## Segment 4 (code)

Once every fold has produced predictions, compute the information coefficient per fold, the rank correlation between predictions and actual outcomes, and look at the mean and the standard deviation across folds, not just the mean alone. The fold-by-fold series matters more than the average, because a healthy-looking mean can still be hiding a signal that worked in two folds and collapsed in the other three.

## Segment 5 (outro)

If the information coefficient is small but consistently positive across folds, that's a genuinely interesting, honestly-earned result. If it swings between positive and negative with a wide spread, the honest conclusion is weak or no robust signal, and that's a legitimate finding too. Up next, the final lesson of the course: wrapping up the capstone and presenting it for a portfolio.
