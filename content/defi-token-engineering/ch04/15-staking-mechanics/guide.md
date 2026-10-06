# Lesson 15 — Staking Mechanics

**Chapter 4 · Staking & Yield · Lesson 15 of 30**

## What you'll learn

- What staking actually locks, and why a protocol pays you for it
- The difference between simple reward accrual and compounding
- How APR and APY diverge once compounding frequency increases
- Unbonding periods and slashing — the real risk side of staking

## Staking, in plain terms

Staking means locking tokens into a contract so the protocol can rely on
them — as security collateral on a proof-of-stake chain, as a liquidity
commitment, or simply as a demand sink the protocol wants to reward. In
exchange, the protocol pays a reward, usually denominated in the same
token or a second reward token.

The reward is compensation for two things you're giving up: **liquidity**
(your tokens are locked, at least for an unbonding period) and **risk**
(slashing on proof-of-stake chains, smart-contract risk everywhere, and
token-price risk if rewards are paid in the same volatile asset you
staked).

## The basic reward formula

```
reward = staked_amount × rate × time

Example: 1,000 tokens staked at a 10% annual rate for 90 days
reward = 1,000 × 0.10 × (90 / 365)
reward = 1,000 × 0.10 × 0.2466
reward ≈ 24.66 tokens
```

That's simple, non-compounding accrual — the rate applies to your
original principal the whole time.

## APR vs. APY — where compounding changes the number

**APR** (annual percentage rate) is the simple, non-compounding yearly
rate. **APY** (annual percentage yield) accounts for compounding — each
reward gets added to principal and starts earning its own reward.

```
APY = (1 + APR / n)^n − 1        n = compounding periods per year

10% APR, compounded daily (n = 365):
APY = (1 + 0.10 / 365)^365 − 1
APY ≈ 0.10516 → 10.516%

10% APR, compounded monthly (n = 12):
APY = (1 + 0.10 / 12)^12 − 1
APY ≈ 0.10471 → 10.471%

10% APR, no compounding (n = 1):
APY = APR = 10.000%
```

The more frequently rewards compound, the bigger the gap between the
advertised APR and the APY you actually realize — which is exactly why
auto-compounding vaults (Lesson 17) exist as a separate product.

## The staking lifecycle

1. **Stake** — deposit tokens into the staking contract; they're now
   illiquid.
2. **Lock / bond** — the protocol counts your stake toward security or
   rewards; some designs require a minimum bonding period before you can
   even start unstaking.
3. **Earn rewards** — rewards accrue per block, per epoch, or per period,
   according to the emission schedule (Lesson 18).
4. **Unbond / cooldown** — you request withdrawal; many protocols enforce
   a cooldown (days to weeks) before tokens are liquid again, specifically
   so the system can't be drained instantly in a panic or an attack.
5. **Withdraw** — principal plus any unclaimed rewards return to your
   wallet.

## Slashing — the risk simple reward math leaves out

On proof-of-stake networks, staking isn't risk-free yield: validators who
sign conflicting blocks or go offline for extended periods can have a
portion of their stake **slashed** — permanently destroyed as a penalty.
Delegators who staked through that validator usually share the loss
proportionally. Any staking APY you see is a gross number; it doesn't
price in slashing risk, smart-contract risk, or the opportunity cost of
illiquidity during the unbonding window.

## Key terms

| Term | Meaning |
|---|---|
| APR | Simple annual rate, no compounding |
| APY | Annual yield including the effect of compounding |
| Unbonding period | Enforced delay between requesting withdrawal and receiving liquid tokens |
| Slashing | Protocol-enforced destruction of staked tokens as a penalty, usually for validator misbehavior |

## Check yourself

Before Lesson 16, make sure you can compute the APY for a given APR and
compounding frequency, and explain in one sentence why a protocol would
enforce an unbonding period instead of letting stakers exit instantly.
