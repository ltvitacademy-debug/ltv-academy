# Lesson 18 — Reward Emission Schedules

**Chapter 4 · Staking & Yield · Lesson 18 of 30**

## What you'll learn

- The difference between linear (constant) and decaying emission schedules
- The halving pattern and the math behind it
- Why "farm and dump" happens, and which schedule shapes invite it
- How to taper a schedule toward sustainability

## Two basic emission shapes

Every staking or farming reward ultimately comes from somewhere — usually
a fixed pool of tokens set aside at launch (Lesson 19's "emission
reserve"), paid out according to a schedule written into the contract.
Two shapes dominate:

**Linear (constant) emission** — the same number of tokens released every
block or epoch, for as long as the reserve lasts.

```
tokens_per_block = constant_rate

Example: 10 tokens/block, 2,000,000 blocks/year
annual_emission = 10 x 2,000,000 = 20,000,000 tokens/year
reserve of 100,000,000 tokens lasts exactly 5 years, then emissions stop
```

**Decaying emission** — the rate shrinks on a schedule, most commonly by
halving at fixed intervals (the Bitcoin pattern), so emissions front-load
early adopters and taper toward near-zero over time.

```
reward(t) = initial_rate x (0.5)^floor(t / halving_period)

Example: initial_rate = 50 tokens/block, halving every 210,000 blocks
  blocks 0 - 210,000:        50 tokens/block
  blocks 210,001 - 420,000:  25 tokens/block
  blocks 420,001 - 630,000:  12.5 tokens/block
  ...approaching (but never quite reaching) zero
```

## Why the shape matters for farmer behavior

A linear schedule with no end in sight keeps paying the same rate
indefinitely — fine if the protocol wants durable, predictable incentives,
but it also means the reserve never signals "this is temporary," so
farmers treat the yield as permanent income rather than a bootstrap
subsidy.

A decaying schedule explicitly tells participants emissions are richest
*now* and will shrink — which is exactly what triggers "farm and dump":
early farmers maximize the current high rate, sell the reward token
immediately (since they expect the rate, and the token's appeal, to
decline), and move on before the next halving. The schedule itself creates
the sell pressure problem flagged in Lesson 16.

## Tapering toward sustainability

Protocols that want to avoid both failure modes — "permanent inflation"
and "front-loaded dump-and-leave" — typically combine three moves:

1. **Bootstrap high** — emissions start elevated to attract initial
   liquidity and users when the protocol has no organic fee revenue yet.
2. **Taper on a defined schedule** — emissions decrease predictably
   (linearly or by halving), announced in advance so participants can plan
   around it instead of being surprised.
3. **Shift the weight to real yield** — as trading/protocol fee revenue
   grows, the *proportion* of total rewards coming from emissions (vs. fees)
   declines, so the protocol isn't permanently dependent on inflation to
   retain participants once emissions taper to near zero.

```
Year 1: 90% of rewards from emissions, 10% from real fees
Year 2: 60% of rewards from emissions, 40% from real fees
Year 3: 20% of rewards from emissions, 80% from real fees
```

## Key terms

| Term | Meaning |
|---|---|
| Emission reserve | The fixed pool of tokens set aside to fund staking/farming rewards |
| Linear emission | Constant tokens released per block/epoch until the reserve is exhausted |
| Decaying emission | Rate shrinks on a schedule (often halving), front-loading early participants |
| Farm and dump | Farmers maximizing a high current rate, then selling and leaving before it declines |

## Check yourself

Before Lesson 19, make sure you can compute a token's annual emission from
a linear rate and block time, and explain why a decaying schedule can
create more sell pressure than a linear one, even if the total tokens
emitted end up similar.
