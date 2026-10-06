# Script — Monitoring Contract & Protocol Health

## Segment 1 (title)

Chapter 4 got the off-chain stack running. This chapter asks the next question: how do you actually know when something -- a contract, a protocol, the stack watching it -- goes wrong, ideally before users find out the hard way?

## Segment 2 (screenshot: Aave pool overview)

A lending protocol's health shows up as a handful of live numbers: total supplied, total borrowed, and utilization -- how much of that supplied liquidity is actually out on loan. At over 80 percent utilization here, withdrawals start competing for a shrinking pool of available liquidity.

## Segment 3 (screenshot: Morpho vault withdrawals)

A single large withdrawal isn't necessarily a problem. Seven of them in under two hours, from related wallets, is a pattern -- exactly the kind of thing a real-time dashboard surfaces instantly, and a one-transaction-at-a-time block explorer makes you dig for.

## Segment 4 (screenshot: Uniswap pool activity)

A decentralized exchange pool tells its own version of the same story -- price, 24-hour volume, swap direction, active liquidity. This is the same live transaction feed Lesson 23 turns into actual alert conditions, not just numbers on a screen.

## Segment 5 (steps: four numbers worth watching)

Four numbers worth watching on any protocol: utilization, because too high strains withdrawals; TVL trend, because a sudden drop is a symptom worth investigating; transaction pattern, because a burst of same-type calls from one source is unusual; and price deviation, because a pool pricing far from the rest of the market is a red flag.

## Segment 6 (outro)

Watching a dashboard works until nobody's watching it. Lesson 23 turns these same conditions into alerts that page a human automatically, the moment something crosses a threshold.
