# Lesson 23 — Modeling Token Supply & Demand

**Chapter 5 · Tokenomics Design · Lesson 23 of 30**

## What you'll learn

- A simplified quantity-theory framework for thinking about token value
- Why token velocity is a problem utility tokens specifically run into
- How to build an inflows/outflows supply model from the pieces of this chapter
- The basic structure of a token model you could actually build in a spreadsheet

## A simplified quantity-theory framework

Borrowed loosely from monetary economics, the **equation of exchange**
gives a rough mental model for how a token's required price relates to
its usage:

```
M x V = P x Q

M = token supply in circulation
V = velocity (how many times, on average, a token changes hands per year)
P = price per unit of the thing being transacted
Q = quantity of transactions per year

Rearranged for the token's implied value:  Token_value_needed = (P x Q) / V
```

Read practically: if a protocol needs $100,000,000/year in transaction
value (P × Q) flowing through it, and each token changes hands 10 times a
year on average (V = 10), the market only needs $10,000,000 worth of the
token in circulation to support that activity — **not** $100,000,000.
High velocity means a token can support a lot of economic activity with
comparatively little market cap backing it, which is exactly why high
velocity is a *problem* for a utility token's price, not a feature.

## The velocity problem, worked

```
Protocol processes $50,000,000/year in transaction volume via its token

Low velocity (V = 2, tokens held/staked, not just passed through):
  required token market value = 50,000,000 / 2 = $25,000,000

High velocity (V = 20, tokens bought, used, immediately sold):
  required token market value = 50,000,000 / 20 = $2,500,000
```

Same usage, radically different implied token value — purely because of
how long tokens are held before being sold. This is exactly why staking
lockups (Lesson 15), vesting (Lesson 21), and utility functions that
require *holding* rather than instantly passing through (governance
weight, fee discounts tied to a holding period) all work to reduce
velocity and support price, independent of usage growth.

## Building the inflows/outflows model

Tie the chapter together: every period, circulating supply changes based
on what's added and what's removed.

```
Inflows (increase circulating supply):
  + staking/farming emissions (Lesson 18)
  + vesting unlocks crossing the cliff (Lesson 21)
  + treasury/ecosystem fund disbursements

Outflows (decrease circulating supply):
  - burns, including fee-switch buyback-and-burn (Lesson 20)
  - new tokens entering staking lockups (removed from "liquid" circulating)
  - long-term treasury/DAO-controlled re-accumulation

Example, one quarter:
  Emissions:            +3,000,000
  Vesting unlocks:       +2,000,000
  Burns:                 -1,500,000
  New staking lockups:   -2,500,000
  ------------------------------------------
  Net change to liquid circulating supply: +1,000,000
```

## A model you could actually build

1. **List every inflow** — emissions schedule, vesting schedule, treasury
   disbursement plans — each as a function of time.
2. **List every outflow** — burn rate (tie to projected fee revenue),
   staking participation rate, lockup durations.
3. **Net it per period** — compute circulating supply change month by
   month or quarter by quarter.
4. **Stress-test against demand assumptions** — what usage/demand growth
   would be needed to absorb the *net* new liquid supply without price
   declining, and is that growth plausible?

## Key terms

| Term | Meaning |
|---|---|
| Velocity | How many times, on average, a token changes hands per year |
| Equation of exchange | M x V = P x Q — a rough framework relating supply, velocity, and transaction value |
| Liquid circulating supply | Circulating supply minus tokens currently locked in staking/vesting |
| Net supply change | Total inflows minus total outflows for a given period |

## Check yourself

You've finished Chapter 5 when you can explain why high token velocity
hurts price even if usage is growing, and sketch out the four inflow/
outflow categories you'd need to build a basic supply model for any token.
