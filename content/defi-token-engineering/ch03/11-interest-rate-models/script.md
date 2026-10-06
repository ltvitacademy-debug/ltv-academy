# Script — Interest Rate Models

## Segment 1 (title)

A lending pool's interest rate isn't a number a team types in. It's computed from utilization — the fraction of supplied assets currently borrowed out — through a curve almost every major protocol shapes the same way.

## Segment 2 (code: utilization and the kinked curve)

Utilization is total borrowed divided by total supplied. Almost every protocol uses a kinked rate model: a gentle slope below a target utilization, around 80 percent, then a much steeper slope above it. At 50 percent utilization the borrow rate sits around 2.5 percent. At 95 percent, deep into the steep slope, it's over 40 percent.

## Segment 3 (code: why the kink exists)

Below the kink, the protocol wants borrowing cheap enough to attract demand, since idle liquidity earns suppliers nothing. Above the kink, the incentive flips hard — a pool that hits 100 percent utilization can't process withdrawals, so the steep slope deliberately makes borrowing expensive fast enough to pull utilization back down before the pool runs dry.

## Segment 4 (code: what suppliers actually earn)

Suppliers don't earn the borrow rate directly. The supply rate is the borrow rate scaled down by utilization itself, minus the protocol's reserve factor cut — at 80 percent utilization and a 4 percent borrow rate, suppliers earn closer to 2.9 percent, because only the utilized portion of the pool is generating interest at all.

## Segment 5 (outro)

Utilization drives the rate, and the kink is what keeps a pool from running dry. Next up: what actually happens when a position's health factor crosses below 1.0 — liquidations.
