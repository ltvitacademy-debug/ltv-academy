# Script — Impermanent Loss

## Segment 1 (title)

Impermanent loss is the gap between what your LP position is worth right now and what you'd have if you'd just held the two assets instead. It only shows up when the price ratio moves after you deposit.

## Segment 2 (code: a full worked example)

Deposit the entire 100 ETH, 200,000 USDC pool at 2,000 per ETH — that's 400,000 dollars either way you slice it. ETH doubles to 4,000. The pool rebalances to about 70.71 ETH and 282,843 USDC, worth 565,685 total. Simply holding the original 100 ETH and 200,000 USDC would be worth 600,000. The gap, 34,315 dollars, is impermanent loss — about 5.7 percent, before counting any fees earned along the way.

## Segment 3 (code: the standard reference table)

Memorize this table: a 1.25x price move costs about 0.6 percent, 1.5x costs 2 percent, 2x costs 5.7 percent, and 4x costs a full 20 percent. Notice it's symmetric — a price that falls to half its value produces the exact same loss as a price that doubles, because what matters is how far the ratio moved from 1, not which direction.

## Segment 4 (steps: why it's called impermanent)

If the price ratio returns to exactly what it was at deposit, the loss disappears — the pool rebalances back and you're left only with fee income. It becomes permanent the instant you withdraw while the ratio is still different from your deposit ratio. At that point the loss is realized and locked in.

## Segment 5 (outro)

Impermanent loss is the real cost of providing liquidity, and fee income is what's supposed to cover it. Next up: building a simple AMM contract yourself, so you can see exactly where in the code that rebalancing actually happens.
