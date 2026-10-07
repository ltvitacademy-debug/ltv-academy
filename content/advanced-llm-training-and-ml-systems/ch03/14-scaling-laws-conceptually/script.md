# Script — Scaling Laws, Conceptually

## Segment 1 (title)

As you make a model bigger, train it on more data, or throw more compute at it, how much better does it actually get? The surprising answer is: predictably, within limits. That predictable relationship is called a scaling law, and it's what this lesson is about.

## Segment 2 (steps)

Researchers scale three things independently: N, the parameter count; D, the dataset size in tokens; and C, the compute, which works out to roughly six times N times D floating point operations. Kaplan and colleagues' 2020 paper trained a huge family of models varying each of these and found something useful.

## Segment 3 (code)

Plot loss against model size on log-log axes and the points fall on a straight line — meaning loss follows a power law in N, with no plateau across many orders of magnitude. The exponent is small, so returns diminish, but they never flatly stop. The same style of fit applies separately to dataset size and to compute, each with its own exponent.

## Segment 4 (steps)

That's the practical payoff. You can't afford to train twenty full-scale candidates to see what wins — a frontier run can cost millions of dollars. Instead you train a cheap ladder of small models, fit the power-law curve to that ladder, and extrapolate it out to predict the loss of the expensive run you actually intend to train, before you spend the big budget.

## Segment 5 (outro)

Scaling laws predict loss, not every capability directly, and some abilities appear suddenly rather