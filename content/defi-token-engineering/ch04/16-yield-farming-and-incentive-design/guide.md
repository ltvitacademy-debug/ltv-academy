# Lesson 16 — Yield Farming & Incentive Design

**Chapter 4 · Staking & Yield · Lesson 16 of 30**

## What you'll learn

- How yield farming layers reward-token emissions on top of LP fee income
- The APY formula protocols use to advertise farm returns
- Why the "incentive flywheel" can turn into a death spiral
- The mercenary-capital problem and why it matters for design

## From liquidity pool to yield farm

Lesson 6 covered LP tokens: deposit two assets into an AMM pool, receive an
LP token representing your share, and earn a cut of trading fees. A
**yield farm** adds a second layer — stake that LP token into a separate
rewards contract, and the protocol emits its own governance or utility
token to you on top of the trading fees you're already earning.

Two income streams, two different risk profiles:

- **Trading fees** — real revenue, paid in the pool's actual assets,
  roughly proportional to trading volume.
- **Emission rewards** — newly minted protocol tokens, whose dollar value
  depends entirely on that token holding its price under constant sell
  pressure from farmers cashing out.

## The farm APY formula

```
farm_APY = (annual_reward_value_USD / TVL_USD) × 100

Example: a farm emits $2,000,000/year in reward tokens (at current price)
into a pool with $10,000,000 total value locked (TVL):

farm_APY = (2,000,000 / 10,000,000) × 100 = 20%
```

That 20% is only as real as the reward token's price. If farmers sell the
reward as fast as they receive it and the price halves, the *effective*
APY earned by anyone still holding the reward token is already cut in
half — the advertised number is a snapshot, not a guarantee.

## The incentive flywheel — and where it breaks

```
Emit reward tokens → Attract LPs → Deeper liquidity
    → Lower slippage, more trading volume → More fee revenue
```

That's the virtuous loop a well-designed farm aims for. It breaks when
emissions are the *only* reason LPs are there:

```
Emit reward tokens → Farmers deposit purely for the reward
    → Farmers immediately sell the reward → Reward token price falls
    → Advertised APY falls → Farmers withdraw and move to the next farm
```

This is **mercenary capital** — liquidity with no loyalty to the
protocol, present only because the yield is temporarily the highest
available. It arrives fast when emissions start and leaves just as fast
when a competing farm offers a better rate, taking the protocol's
liquidity depth with it.

## Designing against the death spiral

A durable farm design typically combines:

- **Vesting or lock-ups on reward claims** — rewards vest linearly over
  weeks/months instead of paying out instantly, so farmers can't dump the
  moment they're credited (ties directly into Lesson 21's vesting math).
- **Tapering emissions** — start high to bootstrap liquidity, then
  decrease on a schedule (Lesson 18) so the protocol isn't permanently
  dependent on inflation to keep farmers around.
- **A real-yield component** — route a share of actual trading fees to
  farmers directly, so some of the APY survives even if the reward token's
  price falls to zero.

## Key terms

| Term | Meaning |
|---|---|
| Yield farm | A contract that pays emission rewards to stakers of an LP token (or other asset) |
| TVL | Total value locked — the USD value of all assets deposited in a pool or farm |
| Mercenary capital | Liquidity that moves purely to chase the highest current yield, with no protocol loyalty |
| Real yield | Returns paid from actual protocol revenue (fees), not from token inflation |

## Check yourself

Before Lesson 17, make sure you can compute a farm's advertised APY from
its annual reward value and TVL, and explain in your own words why that
number can fall even if nothing about the farm's rules changes.
