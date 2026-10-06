# Script — Flash Loans

## Segment 1 (title)

Chapter 1 called flash loans the purest example of composability. Here's exactly why zero collateral is actually safe for the lender: the entire borrow, use, and repay sequence happens inside one atomic transaction, and a transaction either fully succeeds or fully reverts.

## Segment 2 (code: the callback pattern)

The lending pool calls executeOperation on the borrower's own contract mid-transaction, hands it the funds, and checks its balance the instant that call returns. Do whatever the loan was for, transfer back the amount plus fee, and return true — if the balance isn't back to what's owed, the pool's own code reverts everything, including the original loan.

## Segment 3 (code: three legitimate uses)

Arbitrage: borrow, buy cheap on one AMM, sell higher on another, repay, keep the difference. Self-liquidation: a borrower about to be liquidated can flash-borrow to repay their own debt and avoid paying someone else's liquidation bonus. Collateral swap: move a lending position between assets in one transaction, with no bridging capital required.

## Segment 4 (steps: why exploits use them)

A flash loan doesn't create new vulnerabilities — it removes the capital constraint on exploiting one that already exists. An attacker who finds a price-oracle bug no longer needs millions of their own dollars; the flash loan supplies that capital for one transaction and a small fee, and the vulnerability does the rest.

## Segment 5 (outro)

Zero collateral, zero default risk, and zero capital barrier to whatever a contract is programmed to do. Next up: building a simple lending pool yourself, so you can see exactly where the health-factor check and the liquidation logic actually live in code.
