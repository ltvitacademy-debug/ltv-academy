# Lesson 7 — Impermanent Loss

**Chapter 2 · Automated Market Makers · Lesson 7 of 30**

## What you'll learn

- A precise definition of impermanent loss — compared against what, exactly
- A full worked example with real dollar amounts, from Lesson 6's own pool
- The standard IL-vs-price-ratio table every LP should have memorized
- Why it's called "impermanent," and when it actually becomes permanent

## Compared against what?

Impermanent loss (IL) is the gap between **what your LP position is worth
right now** and **what you'd have if you had just held the two assets
separately instead of depositing them**. It only shows up when the price
ratio between the pool's two assets changes after you deposit — if the
price never moves, there is no IL, only fee income.

## A full worked example

Start exactly where Lesson 6 left off: you deposit into a 100 ETH /
200,000 USDC pool at 2,000 USDC/ETH, and (to keep the math simple) assume
you own the *entire* pool.

```
At deposit:
  Pool: 100 ETH + 200,000 USDC
  Value: 100 * 2,000 + 200,000 = 400,000 USDC
  HODL alternative: just hold 100 ETH + 200,000 USDC

ETH price doubles to 4,000 USDC/ETH. The pool rebalances to keep x*y=k:
  New reserves: 70.71 ETH + 282,842.70 USDC  (solved from x*y=20,000,000)
  Pool value now: 70.71*4,000 + 282,842.70 = 565,685.40 USDC

HODL value now (if you'd just held, never deposited):
  100*4,000 + 200,000 = 600,000 USDC

Impermanent loss: 565,685.40 - 600,000 = -34,314.60 USDC  (-5.72%)
```

Being an LP cost you 34,314.60 USDC compared to simply holding, *before*
counting any trading fees you earned along the way — which is the entire
reason LPs need fee income (and, in Chapter 4, extra token incentives) to
make providing liquidity worthwhile at all.

## The standard reference table

```
Price ratio change     Impermanent loss vs. HODL
      1.25x                   -0.6%
      1.5x                    -2.0%
      2x                      -5.7%   <- the example above
      3x                      -13.4%
      4x                      -20.0%
      5x                      -25.5%
```

Notice IL is symmetric in the ratio, not the direction: a price that falls
to half its original value produces the *same* -5.7% IL as a price that
doubles — what matters is how far the ratio moved from 1, not which asset
moved relative to the other.

## Why "impermanent"

It's called impermanent because if the price ratio returns to exactly
what it was when you deposited, the loss disappears — the pool
rebalances back to your original reserve ratio, and you're left only with
fee income earned in between. It becomes **permanent** the moment you
withdraw while the price ratio is still different from your deposit
ratio — at that point there's no more "waiting for it to come back," the
loss is realized and locked in.

## Key terms

| Term | Meaning |
|---|---|
| Impermanent loss (IL) | The value gap between an LP position and simply holding the two assets |
| HODL alternative | What the LP's funds would be worth if never deposited, just held |
| Realized / permanent loss | IL that's locked in because the LP withdrew before the price ratio reverted |

## Check yourself

You're ready for Lesson 8 when you can explain, without looking: why does
a price falling to half its original value produce the same IL percentage
as a price doubling, rather than a smaller or larger one?
