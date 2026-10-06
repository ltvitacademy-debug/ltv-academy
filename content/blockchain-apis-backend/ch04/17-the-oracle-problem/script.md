# Script — The Oracle Problem

## Segment 1 (title)

Lesson 14 required mapping handlers to be deterministic. The EVM has the identical requirement, for the identical reason — consensus requires it. An HTTP call might return different answers at the same moment, which is exactly why a smart contract cannot make one.

## Segment 2 (steps: why it's a real problem)

Most of what makes smart contracts useful depends on external data — a lending protocol needs a price, an insurance contract needs a flight status. None of that originates on-chain, and none of it can be fetched by the contract itself. Something has to get it there: an oracle.

## Segment 3 (code: the naive fix)

The simplest oracle is one trusted server pushing a value on-chain. That's a single point of failure and trust — if that server lies or goes offline, every contract depending on it inherits the failure. It hasn't removed a trusted intermediary, just renamed it.

## Segment 4 (steps: the real fix)

A real fix needs what blockchain consensus itself relies on: multiple independent nodes retrieving data independently, aggregating their answers so one bad response gets outvoted, with real economic cost for lying or failing to deliver.

## Segment 5 (outro)

That's the oracle problem, and it's specifically what Chainlink exists to solve. Next up: Chainlink's price feeds, the most widely used oracle in production today.
