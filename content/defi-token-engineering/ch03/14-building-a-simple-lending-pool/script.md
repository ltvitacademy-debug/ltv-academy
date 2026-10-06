# Script — Building a Simple Lending Pool

## Segment 1 (title)

Health factor, overcollateralization, liquidation — three lessons of math, all in about twenty-five lines of Solidity. Same caveat as the AMM contract: this is a simplified teaching example, not production code.

## Segment 2 (code: the health factor check)

healthFactor is Lesson 10's exact formula written as integer arithmetic — collateral value times the liquidation threshold, divided by debt. The borrow function adds the new debt first, then checks the health factor as if that debt already existed, and reverts the entire borrow if it would drop below 1.0.

## Segment 3 (code: liquidation in code)

Liquidate requires the target's health factor to already be below 1.0 — enforcing exactly what Lesson 12 described. It seizes the repaid amount times 1.05, the same five percent liquidation bonus calculated by hand two lessons ago, now computed on-chain.

## Segment 4 (steps: what's deliberately missing)

getPrice is hardcoded here, but a real pool reads a decentralized oracle. Debt never actually grows with interest. There's only one asset instead of independent collateral and debt per asset. And there's still no reentrancy guard and no real token transfers.

## Segment 5 (outro)

Three chapters of AMM and lending mechanics, now visible in actual contract code. That's the foundation the rest of this course — staking, tokenomics, governance — builds directly on top of.
