# Script — Portfolio Construction Methods

## Segment 1 (title)

A signal tells you which instruments look attractive. Portfolio construction is the separate step of turning that ranking into actual position weights, and the method you pick changes your risk profile even if the underlying signal never changes.

## Segment 2 (steps)

Equal weighting just splits capital evenly across the selected names, ignoring how strong the signal is. Signal weighting scales each position by its own signal value, so the most convicted names get the most capital. Inverse-volatility weighting sizes positions so each contributes roughly equal risk rather than equal capital — that's the basic idea behind risk parity. And mean-variance optimization tries to be mathematically optimal using the full covariance matrix.

## Segment 3 (code)

Concretely, inverse-volatility weighting divides one over each asset's rolling volatility by the sum across the portfolio — a low-volatility asset ends up with a bigger dollar position, so no single name dominates the portfolio's risk just because it happens to be more volatile.

## Segment 4 (code)

Mean-variance optimization is optimal on paper, but it's notoriously sensitive to errors in the estimated expected return vector — tiny changes in that estimate can swing the weights to extreme, concentrated positions. Because expected returns are genuinely hard to estimate precisely, this fancier method often does worse out of sample than the much simpler approaches.

## Segment 5 (outro)

The fanciest construction method isn't always the most robust one — that's worth remembering before you reach for an optimizer. Up next, lesson nine goes deeper on sizing a single position correctly, including the Kelly criterion.
