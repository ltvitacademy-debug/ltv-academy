# Script — Why You Can't Just Query the Chain

## Segment 1 (title)

An RPC node is great at one kind of question: balanceOf this address, ownerOf this token, one storage slot, one answer. It's terrible at a different kind: every trade this wallet has ever made, which has no single storage slot to read.

## Segment 2 (code: naive log scan)

The naive fix is looping eth_getLogs over every block range since deployment. That breaks fast — providers cap how many blocks or logs one call returns, so an old contract means thousands of chunked calls, all counted against the same rate limit from Chapter 1, redone from scratch on every single request.

## Segment 3 (steps: no joins or filters)

There's no SQL-style "where balance greater than 100" you can send to a node. Asking which of ten thousand addresses hold over 100 tokens means calling balanceOf ten thousand times, or replaying every Transfer event yourself.

## Segment 4 (steps: the actual fix)

Every real solution follows the same pattern: listen for the events that matter from the start block forward, write each one into a database shaped for the questions you'll ask, then query that database instead of the chain. That's the entire job of an indexer.

## Segment 5 (outro)

That listen-write-query pattern is what the rest of this chapter builds. Next up: The Graph, the most widely used managed indexer, and what a subgraph actually is.
