# Script — Mapping Handlers

## Segment 1 (title)

The manifest's eventHandlers section connects a raw contract event to the function that processes it. Here's a real one: Approval, ApprovalForAll, OwnershipTransferred, and Transfer, each wired to its own handler name.

## Segment 2 (screenshot: manifest eventHandlers)

When this contract emits a Transfer event on-chain, The Graph's indexer calls handleTransfer — and that function is where the schema from Lesson 13 actually gets populated.

## Segment 3 (code: AssemblyScript handler, immutable entity)

mapping.ts compiles to WebAssembly through AssemblyScript, a strict TypeScript subset. For an immutable entity it's the whole lifecycle: build a new Transfer with event.params fields, call save.

## Segment 4 (code: load-or-create, mutable entity)

A mutable entity like Account follows load, mutate, save. Account.load returning null on the first-ever transfer to an address is normal, not an error — every handler touching a mutable entity needs that branch.

## Segment 5 (steps: pure and deterministic)

A handler can't fetch, read the clock, or use randomness. Every indexer syncing this subgraph has to compute the exact same entities from the exact same events, or the network's indexers would disagree about the result.

## Segment 6 (outro)

Schema, manifest, and mapping are now all connected. Next up: actually deploying this and running a query against it, in Lesson 15.
