# Script — Overcollateralized Lending Mechanics

## Segment 1 (title)

A bank lends you more than you put down because it can repossess, sue, and report you to a credit bureau. A DeFi protocol can do none of that — so the model flips. You can only ever borrow less than your collateral is worth.

## Segment 2 (code: a worked deposit and borrow)

Deposit 1 ETH worth 2,000 USDC, with a 75 percent max loan-to-value for ETH collateral. Your maximum borrow is 1,500 USDC — and that 75 percent figure is a risk parameter set per asset, lower for volatile assets that can move further before the protocol can react.

## Segment 3 (code: the health factor)

Health factor equals collateral value times the liquidation threshold, divided by what you've borrowed. With an 80 percent threshold on 2,000 dollars of collateral against a 1,000 dollar loan, that's 1.60 — safely above 1.0. But it isn't static: the numerator depends on current market value, so the same loan gets riskier automatically the moment collateral's price falls.

## Segment 4 (code: the receipt token)

When you deposit, the pool mints an interest-bearing receipt token — an aToken in Aave's naming, the same composability pattern from Chapter 1. Its balance grows as interest accrues, and you redeem it one-to-one for the underlying asset plus interest whenever you withdraw.

## Segment 5 (outro)

Overcollateralization replaces a credit check with collateral sitting in the contract right now. Next up: where the interest rate on that borrowed amount actually comes from.
