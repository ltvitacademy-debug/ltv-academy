# Script — Building a Simple Price-Triggered Service

## Segment 1 (title)

Chainlink Automation is deprecated. Watching a price and acting on a threshold is exactly the job it used to do — the honest alternative is Chapter 2's event listener shape: an off-chain Node service polling a feed and submitting transactions itself.

## Segment 2 (code: reading the feed)

It's the same AggregatorV3Interface from Lesson 18, called with ethers.js. Calling decimals() instead of hardcoding 8 matters — not every feed uses the same scale, and hardcoding it breaks silently when this code points at a different feed later.

## Segment 3 (code: the polling loop)

A naive loop fires every single tick. The fix tracks the last known state and only acts on an actual crossing — wasAbove not null guards the first poll, and the crossing check stops it from re-triggering every minute while the price just sits above the threshold.

## Segment 4 (code: submitting the transaction)

triggerAction is Chapter 1's send pattern directly — build the call, sign with a wallet the service controls, submit, wait for confirmation, using the same nonce and gas handling from Lesson 5.

## Segment 5 (steps: the honest tradeoff)

This service has no decentralization, no redundancy, no on-chain guarantee it's even running. That's deliberate — simple and fully under your control, in exchange for exactly the guarantees a managed oracle network provided.

## Segment 6 (outro)

That closes out oracles and external data. Chapter 5 turns to a different backend problem: proving who's behind a wallet, starting with Sign-In with Ethereum.
