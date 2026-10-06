# Lesson 9 — Concentrated Liquidity Concepts

**Chapter 2 · Automated Market Makers · Lesson 9 of 30**

## What you'll learn

- What "full-range" liquidity (Lessons 5–8's model) actually costs an LP in capital efficiency
- How concentrated liquidity lets an LP choose a specific price range instead
- A worked capital-efficiency comparison between full-range and a tight range
- What happens when the price exits your chosen range — the real trade-off

## Full-range liquidity's hidden cost

Every pool in Lessons 5–8 spread an LP's capital across the *entire*
price curve, from 0 to infinity. In practice, an asset pair rarely trades
across more than a narrow band of prices over any given stretch of time —
which means most of that capital sits at price levels that will realistically
never be reached, earning zero fees while still being "deployed." Uniswap
v3 introduced **concentrated liquidity** specifically to fix this: instead
of spreading liquidity across the whole curve, an LP picks a price range
and deposits only within it.

```
Full-range (v2-style):           Concentrated (v3-style):
  liquidity spread 0 -> infinity    liquidity spread only $1,800 -> $2,200
  most of it never gets touched     all of it sits where price actually is
  lower fee income per dollar       higher fee income per dollar, IF price
  deposited                         stays inside the chosen range
```

## A worked capital-efficiency comparison

Say ETH trades in a tight band around 2,000 USDC. To provide the same
amount of *active* liquidity at the current price:

```
Full-range LP: deposits capital spread from $0 to infinity
  -> roughly 1-2% of that capital is actually active near $2,000 at any
     given moment

Concentrated LP, range $1,800-$2,200: deposits the SAME dollar amount,
  but ALL of it sits inside that range
  -> can provide the same fee-earning depth near $2,000 using roughly
     10-20x less total capital than the full-range LP

Same fees earned, far less capital tied up — or the same capital,
far more fee income, as long as price stays in range.
```

This capital-efficiency gain is the entire point of concentrated
liquidity: it turns a fixed deposit into meaningfully more fee income
*when the price behaves as expected*.

## Ticks and active liquidity

A concentrated-liquidity pool is divided into discrete price
boundaries called **ticks**. An LP's position is defined by a lower tick
and an upper tick, and their liquidity only counts toward swap pricing
("active liquidity") while the current price sits between those two
ticks. Multiple LPs can stack overlapping ranges, and the pool's total
active liquidity at any price is just the sum of every position whose
range currently contains that price.

## The real trade-off: range risk

Concentrated liquidity doesn't eliminate impermanent loss (Lesson 7) —
it concentrates that exposure the same way it concentrates the capital.
And it adds a new risk full-range LPs never faced:

```
If price moves OUTSIDE your chosen range:
  -> your position converts entirely into whichever asset is now
     cheaper (e.g., all ETH if price fell below your range)
  -> you stop earning any trading fees until price re-enters your range
  -> you must actively choose whether to withdraw, wait, or re-range
```

A full-range position never "runs out of range" — it just earns less
efficiently everywhere. A concentrated position earns much more
efficiently, but only within the boundaries the LP chose, which turns LP
management from a deposit-and-forget action into an active, ongoing
decision.

## Key terms

| Term | Meaning |
|---|---|
| Concentrated liquidity | Depositing liquidity only within a chosen price range, instead of the full 0-to-infinity curve |
| Tick | A discrete price boundary that defines the edges of a liquidity position |
| Active liquidity | The liquidity currently counted toward swap pricing, because the price sits within its range |
| Range risk | The risk that price exits a concentrated position's range, stopping fee income until it re-enters |

## Check yourself

You're ready for Lesson 10 when you can explain, without looking: why
does a concentrated-liquidity position stop earning fees entirely once
price exits its range, while a full-range position never does?
