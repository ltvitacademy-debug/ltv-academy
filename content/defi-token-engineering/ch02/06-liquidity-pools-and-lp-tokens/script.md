# Script — Liquidity Pools & LP Tokens

## Segment 1 (title)

When a trader swaps against a pool, they're not trading against another order — they're trading against reserves that liquidity providers deposited. Every fee they pay flows back to those providers, represented by a token that's the subject of this lesson.

## Segment 2 (code: a deposit, worked out)

Deposit 5 ETH and 10,000 USDC into a 100 ETH / 200,000 USDC pool with 1,000 LP tokens outstanding — that's 5 percent of each reserve. The pool mints you 50 new LP tokens. After your deposit, the pool holds 105 ETH and 210,000 USDC with 1,050 tokens outstanding, and your 50 tokens are 4.76 percent of the total.

## Segment 3 (code: fees accrue into the pool itself)

Every trade pays a fee that stays inside the reserves instead of being paid out separately, so k grows slightly with every trade. Your share percentage doesn't change, but the pool it's a share of keeps getting bigger — burn your LP tokens later and you redeem a proportional share of everything the reserves have grown to.

## Segment 4 (code: why the ratio you get back can differ)

The pool's ratio of the two assets moves with every trade. Redeem your LP tokens later and you get back the current ratio, not your original deposit ratio — if ETH rose relative to USDC while you were an LP, you'll get back less ETH and more USDC, because the pool mechanically sold some of your ETH the same way it would for any trader.

## Segment 5 (outro)

LP tokens are a proportional claim that grows with fees but rebalances with price. Next up: putting a number on that rebalancing cost — impermanent loss.
