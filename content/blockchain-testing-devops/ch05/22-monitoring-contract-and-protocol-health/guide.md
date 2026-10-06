# Lesson 22 — Monitoring Contract & Protocol Health

**Chapter 5 · Monitoring & Incident Response · Lesson 22 of 29**

## What you'll learn

- Why "deployed and verified" (Chapter 3) isn't the same as "healthy right now"
- What utilization, TVL trend, transaction pattern, and price deviation each actually tell you
- Why a real-time dashboard surfaces patterns a block explorer makes you dig for
- How today's numbers become tomorrow's alert thresholds (Lesson 23)

## Deployed isn't the same as healthy

Chapters 1 through 4 got a contract tested, shipped through CI, deployed, verified, and its supporting infrastructure hosted. None of that tells you whether the protocol is healthy *right now*, in production, under real usage. A contract can be perfectly correct and still be in the middle of an incident -- a liquidity crunch, a price manipulation attempt, an unusual concentration of activity from one actor. Monitoring is the practice of watching the live numbers that would tell you.

## Utilization: the lending-protocol number that matters most

![Tenderly's live view of an Aave USDC reserve, showing total supplied, total borrowed, utilization percentage, and supply/borrow APY.](/courses/blockchain-testing-devops/ch05/22-monitoring-contract-and-protocol-health/aave-pool-overview.jpg)

For a lending protocol, utilization -- the share of supplied liquidity that's actually been borrowed out -- is the single number to watch first. At 81.8% utilization, as shown here, withdrawals are increasingly competing for a shrinking pool of available liquidity. It's not automatically a crisis, but it's the kind of number that turns a routine market move into a liquidity event if it climbs further.

## A pattern a dashboard catches that a block explorer doesn't

![Tenderly's live view of a Morpho vault, showing a sequence of large withdrawal transactions in a short window.](/courses/blockchain-testing-devops/ch05/22-monitoring-contract-and-protocol-health/morpho-vault-overview.jpg)

A single large withdrawal is routine. Several in quick succession, from related addresses, is a different story -- and it's exactly the kind of pattern a real-time, aggregated view surfaces at a glance, where a block explorer (one transaction at a time, no aggregation) makes you go looking for it. Monitoring isn't just "is the number currently bad" -- it's "does the recent shape of activity look normal."

## Watching the other side: a DEX pool

![Tenderly's live view of a Uniswap V3 WBTC/ETH pool, showing price, 24-hour volume, active liquidity, and a stream of recent buy/sell transactions.](/courses/blockchain-testing-devops/ch05/22-monitoring-contract-and-protocol-health/uniswap-pool-transactions.jpg)

A decentralized exchange pool exposes a parallel set of signals: price, swap volume, and the live transaction feed itself. This is the same raw stream Lesson 23 turns into actual alert triggers -- a price moving too far from the rest of the market, or an unusually large single swap, both become conditions you can watch for automatically rather than noticing by chance.

## Four numbers worth watching on any protocol

- **Utilization** -- too high strains withdrawals and signals liquidity stress.
- **TVL trend** -- a sudden drop is a symptom, not a diagnosis, but always worth investigating.
- **Transaction pattern** -- a burst of same-type transactions from a single source, in a short window, is unusual by definition.
- **Price deviation** -- a pool pricing an asset meaningfully away from the rest of the market is a red flag for manipulation or a broken oracle.

## Key terms

| Term | Meaning |
|---|---|
| Utilization | The share of a lending pool's supplied liquidity that's currently borrowed out |
| TVL | Total Value Locked -- the aggregate value held in a protocol's contracts |
| Price deviation | A pool's price diverging meaningfully from the broader market's price for the same asset |

## Check yourself

You're ready for Lesson 23 when you can explain: why does a real-time monitoring dashboard surface a pattern like a wave of related withdrawals faster than a block explorer does, and which of the four numbers in this lesson would you check first for a lending protocol specifically?
