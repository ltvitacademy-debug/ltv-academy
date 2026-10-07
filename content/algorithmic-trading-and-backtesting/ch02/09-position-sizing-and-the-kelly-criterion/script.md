# Script — Position Sizing & the Kelly Criterion

## Segment 1 (title)

Having a real edge isn't enough — sizing it wrong can bankrupt a genuinely profitable strategy. The Kelly criterion is the classic framework for sizing a bet to maximize long-run growth, and it comes with a sharp warning about estimation error you need to internalize before you use it.

## Segment 2 (code)

The discrete version is for a simple win-or-lose bet: Kelly's fraction is your payout odds times your win probability, minus your loss probability, divided by the payout odds. At fifty-five percent on an even-money bet, that works out to ten percent of capital. If the formula comes out negative, it's telling you the bet has no edge at those odds — don't take it.

## Segment 3 (code)

Real strategies don't have one win-or-lose outcome, they have a stream of returns. For roughly normal returns, the continuous form is just expected return divided by variance. Higher expected return sizes the position up; higher variance sizes it down, which is the formula correctly penalizing uncertainty.

## Segment 4 (steps)

Full Kelly maximizes long-run growth, but it does it by accepting enormous short-term swings — drawdowns of fifty percent or more, even with a completely real edge. The deeper problem is that the formula assumes you know the true expected return exactly, when really it's estimated from a noisy, finite sample. Overestimate it even a little, and you get an oversized position. That's exactly why fractional Kelly — scaling down to a half or a quarter of the full formula — is the standard practice, not excess caution.

## Segment 5 (outro)

Treat your edge estimate as uncertain, because it is, and size accordingly. Up next, lesson ten zooms out from a single position to the whole portfolio: risk budgeting and leverage.
