# Script — Liquidations

## Segment 1 (title)

Lesson 10 showed that a health factor falls automatically as collateral's price drops. Liquidation is what happens the instant that number crosses below 1.0 — not a penalty applied after the fact, but a threshold that makes a position eligible for anyone to act on.

## Segment 2 (code: a full worked example)

A 1 ETH position borrowed against at 2,000 dollars starts with a health factor of 1.60 — safe. ETH drops to 1,200. Recompute the same formula and the health factor falls to 0.96 — below 1.0, eligible for liquidation, with no new action from the borrower at all.

## Segment 3 (code: what a liquidator actually does)

A liquidator isn't the protocol team — it's any address, usually a bot, that calls the public liquidate function. Repay 500 dollars of the borrower's debt and seize 525 dollars worth of their collateral; the 5 percent difference is the liquidation bonus, the economic incentive that makes someone show up the instant it becomes possible.

## Segment 4 (steps: automated and competitive)

Any address can call liquidate the moment a position crosses the threshold — no queue, no case review. Specialized bots monitor every position continuously and race each other for the bonus, and that competition is what keeps the system solvent — slow or discretionary liquidations would let bad debt pile up faster than anyone could clean it up.

## Segment 5 (outro)

A price move, a threshold crossed, a bot racing to profit from the difference — that's liquidation end to end. Next up: flash loans, the tool liquidators and arbitrageurs actually use to act without tying up their own capital.
