# Lesson 12 — Liquidations

**Chapter 3 · Lending & Borrowing Protocols · Lesson 12 of 30**

## What you'll learn

- Exactly what triggers a liquidation, continuing Lesson 10's health factor
- A full worked example: a price drop, the resulting health factor, and the liquidation itself
- What a liquidation bonus is, and why it's what makes liquidators actually show up
- Why liquidations are automated and competitive, not run by the protocol team

## Picking up from the health factor

Lesson 10 defined health factor as `(collateral value * liquidation
threshold) / borrowed value`, and noted that it falls automatically as
collateral's price drops. Liquidation is what happens the moment that
number crosses below 1.0 — not a penalty applied after the fact, but a
threshold that makes the position eligible for anyone to act on.

## A full worked example

```
Position: 1 ETH collateral @ 2,000 USDC, 1,000 USDC borrowed
Liquidation threshold: 80%

Health factor = (2,000 * 0.80) / 1,000 = 1.60   <- safe

ETH price drops to 1,200 USDC:
Health factor = (1,200 * 0.80) / 1,000 = 0.96   <- below 1.0, eligible

The position is now eligible for liquidation.
```

Nothing about the loan itself changed — the borrower didn't take any new
action. A pure market price move was enough to cross the line.

## What a liquidator actually does

A liquidator is not the protocol team — it's any address (usually an
automated bot) that calls the contract's public `liquidate` function once
a position is eligible. In exchange for repaying part of the borrower's
debt, the liquidator seizes a slightly larger dollar value of the
borrower's collateral — the difference is the **liquidation bonus**, the
economic incentive that makes someone actually want to do this the
instant it becomes possible.

```
Liquidator repays: 500 USDC of the borrower's debt (50%, a common cap)
Liquidation bonus: 5%

Collateral seized: 500 * 1.05 = 525 USDC worth of ETH
  (at 1,200 USDC/ETH, that's 525 / 1,200 = 0.4375 ETH)

Liquidator's profit: 525 - 500 = 25 USDC, for repaying the debt
Borrower's remaining position: 0.5625 ETH collateral, 500 USDC debt
```

## Why this is automated and competitive, not discretionary

Any address can call `liquidate` the instant a position crosses the
threshold — there's no queue, no case review, no protocol employee
deciding who gets liquidated first. In practice, specialized bots monitor
every position's health factor continuously and race each other (often
paying extra gas to be included first) to be the one that captures the
liquidation bonus. This competition is actually what keeps the system
solvent: if liquidations were slow or discretionary, undercollateralized
debt could pile up faster than anyone could clean it up, risking bad debt
the protocol itself would have to absorb.

## Key terms

| Term | Meaning |
|---|---|
| Liquidation | Forced partial or full repayment of an undercollateralized loan, triggered automatically |
| Liquidator | Any address (typically a bot) that calls the public liquidate function to profit from the bonus |
| Liquidation bonus | The extra collateral value a liquidator receives above the debt they repay |
| Close factor | The maximum fraction of a position's debt a single liquidation can repay |

## Check yourself

You're ready for Lesson 13 when you can explain, without looking: why is
competition among liquidator bots actually good for a lending protocol's
solvency, rather than being a problem the protocol should try to prevent?
