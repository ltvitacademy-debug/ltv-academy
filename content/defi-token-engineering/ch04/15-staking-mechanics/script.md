# Script — Staking Mechanics

## Segment 1 (title)

Staking locks your tokens so a protocol can rely on them -- as security collateral, as a liquidity commitment, or just as a demand sink -- and pays you a reward for the liquidity and risk you're giving up.

## Segment 2 (code: reward formula)

The basic reward is simple: staked amount times rate times time. One thousand tokens at a 10 percent annual rate for 90 days earns about 24 and two-thirds tokens -- no compounding, the rate just applies to your original principal.

## Segment 3 (code: APR vs APY)

APR is the simple non-compounding rate. APY accounts for compounding, where each reward starts earning its own reward. The same 10 percent APR becomes about 10.52 percent APY when compounded daily, versus 10.47 percent compounded monthly. More frequent compounding means a bigger gap between the advertised rate and what you actually realize.

## Segment 4 (steps: staking lifecycle)

Stake, lock or bond, earn rewards, unbond through a cooldown period, then withdraw. That cooldown isn't an accident -- it stops the system from being drained instantly during a panic or an attack.

## Segment 5 (outro)

APR versus APY, and a lifecycle that trades liquidity for yield -- with slashing as the risk the headline APY never prices in. Next up: yield farming and how incentive design stacks rewards on top of trading fees.
