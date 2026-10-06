# Lesson 6 — Liquidity Pools & LP Tokens

**Chapter 2 · Automated Market Makers · Lesson 6 of 30**

## What you'll learn

- How a liquidity pool actually forms, and who's on the other side of every trade
- What an LP token mathematically represents, with a worked deposit example
- How trading fees accrue into the pool and flow to LP token holders
- Why withdrawing later can hand you back a different ratio of assets than you deposited

## Who's on the other side of a trade?

In Lesson 5's pool, the trader who swapped ETH for USDC didn't trade
against another person placing an order — they traded against the pool
itself. The pool's reserves came from **liquidity providers (LPs)**: users
who deposited both tokens, in proportion to the pool's current ratio, to
seed and grow that pool. Every trader who swaps against the pool pays a
fee that goes to those LPs, not to the protocol's team (in most designs).

## LP tokens, mathematically

When you deposit liquidity, the pool mints you an **LP token** representing
your proportional claim on the reserves. If the pool already has 1,000 LP
tokens outstanding and you deposit liquidity worth 10% of what's already
in the pool, the pool mints you 100 new LP tokens (1,000 × 0.10) — your
LP tokens are now 100 / 1,100 = 9.09% of the new total supply.

```
Before your deposit:
  Pool: 100 ETH / 200,000 USDC, 1,000 LP tokens outstanding

You deposit (matching the current ratio, as the contract requires):
  5 ETH + 10,000 USDC  (5% of each reserve)

Pool mints you:
  1,000 * 0.05 = 50 LP tokens

After your deposit:
  Pool: 105 ETH / 210,000 USDC, 1,050 LP tokens outstanding
  Your share: 50 / 1,050 = 4.76% of the pool
```

## Fees accrue to the pool, not to a separate payout

Every trade pays a fee (0.3% is the Uniswap v2 reference rate) that stays
inside the pool's reserves instead of being paid out directly — which
means `k` (Lesson 5's invariant) grows slightly with every trade. Your LP
token's share of the pool doesn't change, but the pool it represents a
share *of* keeps getting bigger. Burn your LP tokens later, and you
redeem a proportional share of whatever the reserves have grown to —
original deposit plus your share of every fee collected since.

## Why you don't necessarily get back what you put in

Because the pool's *ratio* of the two assets moves with every trade (that's
the whole mechanism from Lesson 5), redeeming your LP tokens later hands
you back the current reserve ratio, not your original deposit ratio. If
ETH's price rose relative to USDC while you were an LP, you'll redeem
*less* ETH and *more* USDC than you originally deposited — the pool
mechanically sold some of your ETH into USDC as the price moved, the same
way it would for any trader. That's the setup for Lesson 7's topic,
impermanent loss: the cost of that forced rebalancing versus simply
holding the two assets yourself.

## Key terms

| Term | Meaning |
|---|---|
| Liquidity provider (LP) | A user who deposits both pool assets to seed/grow a pool's reserves |
| LP token | A token minted to represent a proportional claim on a pool's reserves |
| Pool share | An LP's percentage ownership of the pool, equal to their LP tokens / total LP tokens |
| Fee accrual | Trading fees that stay in the pool's reserves, growing k over time |

## Check yourself

You're ready for Lesson 7 when you can explain, without looking: why does
burning your LP tokens later hand you back a different ratio of ETH and
USDC than you originally deposited, if the price moved in between?
