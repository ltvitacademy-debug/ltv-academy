# Script — Hyperparameter Search, Basics

## Segment 1 (title)

By now you've met a long list of knobs — learning rate, batch size, weight decay, dropout, patience. Hyperparameter search is choosing good values for those knobs systematically, instead of guessing once and hoping.

## Segment 2 (code)

Grid search tries every combination of a fixed set of values per hyperparameter. It's simple and exhaustive, but the combinations multiply fast — three hyperparameters with five values each is already a hundred and twenty five full training runs.

## Segment 3 (code)

Random search instead samples a fixed number of configurations rather than every combination. Counterintuitively, it usually finds a good setup faster than grid search for the same budget, because grid search burns a lot of that budget exploring hyperparameters that barely matter, at full resolution.

## Segment 4 (steps)

To keep the cost down, people commonly train each candidate for just a few epochs as a cheap proxy for how it'll do, and cut off clearly bad trials early instead of running them to completion. Purpose-built libraries like Ray Tune formalize both ideas once your search space gets large.

## Segment 5 (outro)

That closes out chapter three on training deep networks in practice. Up next, lesson twenty-three opens chapter four: convolutions, conceptually — the building block behind every vision network you'll see from here on.
