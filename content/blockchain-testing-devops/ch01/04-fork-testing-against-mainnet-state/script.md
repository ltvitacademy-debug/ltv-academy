# Script — Fork Testing Against Mainnet State

## Segment 1 (title)

Every test so far deployed into an empty EVM. Your real contract calls into Uniswap pools with billions in liquidity and Chainlink feeds with real staleness windows — none of that exists in a fresh deployment.

## Segment 2 (code: fork-url basics)

Fork testing runs your tests against a local copy of real chain state at a given block. Pinning fork-block-number makes the test reproducible — the exact same real-world state every run, instead of whatever mainnet looks like right now.

## Segment 3 (code: multi-fork)

Cross-chain contracts need to test interactions between chains in one test. createFork and selectFork let a test hold multiple forks and switch which chain state subsequent calls actually see — testing both sides of a bridge transfer in one function.

## Segment 4 (code: caching)

Forge caches fetched fork state locally, keyed by chain and block number, so repeated runs read from disk instead of re-querying your RPC provider every time. Retry backoff handles rate limiting gracefully.

## Segment 5 (outro)

Fork testing proves your contract behaves correctly against real external state. Lesson 5 shifts focus to a different concern entirely — what your tests cost to run, and catching when that cost quietly creeps up.
