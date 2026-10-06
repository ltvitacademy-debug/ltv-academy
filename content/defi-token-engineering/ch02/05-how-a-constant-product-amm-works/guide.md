# Lesson 5 — How a Constant-Product AMM Works

**Chapter 2 · Automated Market Makers · Lesson 5 of 30**

## What you'll learn

- The constant-product formula, x · y = k, and what each variable actually represents
- How to calculate the exact output of a trade by hand, with real numbers
- Why larger trades move the price more than smaller ones ("price impact")
- Where the 0.3%-style trading fee fits into the formula

## The formula

A constant-product pool (the model Uniswap v2 popularized) holds two
reserves — call them `x` and `y` — and enforces one invariant: **x · y = k**,
where `k` must stay constant (or increase, from fees) after every trade.
There's no order book and no one setting a price; the price is just
whatever ratio of reserves makes the product hold.

```
Pool: 100 ETH / 200,000 USDC
k = x * y = 100 * 200,000 = 20,000,000

Spot price of ETH in USDC = y / x = 200,000 / 100 = 2,000 USDC per ETH
```

## Working a real trade by hand

Say a trader sends 10 ETH into the pool to swap for USDC. The pool must
keep `k` constant, so the new `y` is found by solving for it:

```
New x = 100 + 10 = 110 ETH
New y = k / new x = 20,000,000 / 110 = 181,818.18 USDC

USDC out = old y - new y = 200,000 - 181,818.18 = 18,181.82 USDC

Effective price paid: 18,181.82 / 10 = 1,818.18 USDC per ETH
(vs. the 2,000 spot price before the trade)
```

The trader got a worse price than the pre-trade spot price — that gap is
**price impact**, and it's a direct, mechanical consequence of the
formula, not a fee the protocol is charging on top. The deeper the pool
(the larger `x` and `y` are relative to the trade size), the smaller that
gap, which is why pool depth is the thing that actually determines
execution quality, not any setting a team can tune.

## Why bigger trades hurt more

```
Trade size    New price (ETH/USDC)    Price impact vs. 2,000 spot
   1 ETH         1,980.20                  -0.99%
  10 ETH         1,818.18                  -9.09%
  50 ETH         1,333.33                 -33.33%
```

The curve x · y = k is a hyperbola — it gets steeper as a reserve gets
depleted. Pulling the last 10% of a reserve out of a pool costs far more
than pulling the first 10%, because the pool has to give up
proportionally more of the scarcer asset to hold the product constant.

## Where the fee fits in

Real pools (Uniswap v2's 0.3% fee is the reference case) take a small cut
of the input amount before applying the formula, and that fee stays in
the pool — which is exactly why `k` actually *increases* slightly with
every trade, growing LP token value over time (Lesson 6 covers LP tokens
directly). A trade's real output is calculated on the post-fee input
amount, not the full amount sent in.

## Key terms

| Term | Meaning |
|---|---|
| Constant-product formula | x · y = k — the invariant a constant-product pool enforces on every trade |
| Reserves | The two token balances (x and y) actually held by the pool |
| Spot price | The pool's current implied price, equal to y / x |
| Price impact | How much a trade moves the price away from the pre-trade spot price |
| Pool depth | How large the reserves are; deeper pools produce less price impact per trade |

## Check yourself

You're ready for Lesson 6 when you can calculate, by hand, the USDC
output of a 20 ETH swap into the 100 ETH / 200,000 USDC pool above —
without looking at the worked example.
