# Lesson 10 — Overcollateralized Lending Mechanics

**Chapter 3 · Lending & Borrowing Protocols · Lesson 10 of 30**

## What you'll learn

- Why DeFi lending requires *more* collateral value than the loan, not less
- A worked example of a deposit, a borrow limit, and the resulting health factor
- What an aToken (Lesson 3's receipt-token example) represents in a real lending pool
- Why overcollateralization is the mechanism that replaces a credit check entirely

## Why "over," not "under"

A bank lends you 80% of a house's value because it can repossess the
house, sue you, and report you to a credit bureau if you default. A DeFi
lending protocol has none of those tools — it can't identify you, can't
sue an anonymous wallet, and can't check a credit history that doesn't
exist on-chain. Its only lever is the collateral sitting in the contract
*right now*. So the model flips: instead of borrowing more than you put
down, you can only borrow *less* than your collateral is worth, by a
margin wide enough to absorb a price drop before the position becomes
unrecoverable (Lesson 12 covers what happens when it doesn't).

## A worked deposit-and-borrow example

```
You deposit: 1 ETH as collateral, worth 2,000 USDC
Protocol's max LTV (loan-to-value) for ETH collateral: 75%

Maximum you can borrow: 2,000 * 0.75 = 1,500 USDC

You choose to actually borrow: 1,000 USDC (below the max, for safety margin)
```

The 75% figure is a risk parameter the protocol sets per asset, based on
that asset's volatility — a volatile asset gets a lower max LTV than a
stable one, because its price can move further before the next price
update or liquidation can react.

## The health factor

```
Health factor = (collateral value * liquidation threshold) / borrowed value

Using a liquidation threshold of 80% (slightly above the 75% max-LTV,
a common real-world pattern):
  Health factor = (2,000 * 0.80) / 1,000 = 1.60

Health factor > 1.0  -> position is safe
Health factor = 1.0  -> position is exactly at the liquidation line
Health factor < 1.0  -> position becomes eligible for liquidation (Lesson 12)
```

A health factor isn't a static number — it moves every time the
collateral's price moves, since the numerator depends on current market
value. The same 1,000 USDC loan against 1 ETH gets riskier automatically
if ETH's price falls, with no action required from the borrower.

## The receipt token, in a real lending pool

When you deposit, the pool mints you an interest-bearing receipt token
(an aToken, in Aave's naming — Lesson 3 already showed this pattern as an
example of composability). That token's balance increases over time as
interest accrues to suppliers, and you redeem it 1:1 for the underlying
asset plus accrued interest whenever you withdraw. Lesson 11 covers
exactly where that interest rate comes from.

## Key terms

| Term | Meaning |
|---|---|
| Loan-to-value (LTV) | The maximum percentage of collateral value a protocol allows you to borrow |
| Liquidation threshold | The LTV level at which a position becomes eligible for liquidation |
| Health factor | A ratio measuring how close a position is to liquidation; below 1.0 is eligible |
| aToken | An interest-bearing receipt token representing a deposit in a lending pool |

## Check yourself

You're ready for Lesson 11 when you can calculate, by hand, the health
factor of a position with 2 ETH collateral (at 2,000 USDC/ETH), an 80%
liquidation threshold, and a 2,500 USDC loan — without looking at the
worked example above.
