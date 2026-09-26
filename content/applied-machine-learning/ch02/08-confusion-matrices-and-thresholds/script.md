# Script — Confusion Matrices & Thresholds

## Segment 1 (title)

Every classifier quietly makes a decision for you: predict calls anything at fifty percent or above a positive. That's a default, not a law. The cutoff is one of the most powerful dials you have, because it moves a model along the precision recall trade-off without retraining anything.

## Segment 2 (steps)

The idea in four steps. Get honest probabilities. Price each kind of error. Pick the cheapest cutoff. And confirm it once on the test set. Lowering the cutoff flags more customers, raising recall and lowering precision.

## Segment 3 (code)

To pick a cutoff without touching the test set, we use cross val predict, which gives each training row a probability from a model that never saw it. At point five, the model flags one hundred seven customers and finds thirty-seven percent of churners. At point one five, it flags four hundred sixteen and finds eighty-seven percent, but is right only thirty-seven percent of the time.

## Segment 4 (code)

Suppose an unneeded retention offer costs twenty dollars, and a missed churner costs a hundred. Those are assumed numbers. Total cost is twenty times false positives plus a hundred times false negatives. Sweeping the cutoff, the cheapest is point one five, at seven thousand six hundred forty, against twelve thousand twenty at the default.

## Segment 5 (code)

Only now do we touch the test set, to confirm. At point five the cost is four thousand six hundred. At point one five, it's two thousand eight hundred sixty. Sanity check: flagging everyone would cost three thousand eight hundred twenty, and flagging nobody five thousand nine hundred. The tuned model beats both.

## Segment 6 (code)

Confusion matrix display draws the matrix. Here we compare the two cutoffs side by side.

## Segment 7 (screenshot)

This is the output of the code above. Moving from point five to point one five shifts weight out of the missed churner cell, forty-three down to twelve, and into the false alarm cell, fifteen up to eighty-three. That's the price of catching more churners.

## Segment 8 (outro)

Now we leave classification behind. Next up: regression metrics in practice.
