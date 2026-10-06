# Script — Indexing Listings & Sales

## Segment 1 (title)

SimpleNFTMarketplace has no function that lists every active listing, and it never will -- that's
expensive on-chain. What it has is three events. This lesson turns Listed, Sale, and Cancelled into
something a frontend can actually query.

## Segment 2 (steps: event to query)

Four steps, every time. The contract emits an event. An indexer, watching that contract, catches
it. A handler processes the raw event into a stored entity. And the frontend queries that index --
never the raw chain -- when it needs "everything for sale right now."

## Segment 3 (code: schema.graphql)

The Graph calls this the schema. A Listing entity holds the current state -- seller, price, and
whether it's still active. A Sale entity is a permanent record of what happened, keyed by
transaction hash, so history never gets overwritten.

## Segment 4 (code: mapping handler)

The mapping handler is AssemblyScript, and The Graph runs it automatically every time a Listed
event matches the subgraph's manifest. It builds an ID from the NFT contract and token ID, and
saves a new Listing entity with active set to true.

## Segment 5 (code: querying the index)

Once deployed, the frontend asks a question the contract itself can't answer: every active
listing, sorted cheapest first. That's a plain GraphQL query against the subgraph -- no scanning
blocks, no calling the contract in a loop.

## Segment 6 (code: custom listener alternative)

If you'd rather own the infrastructure, a custom listener does the same conceptual job with
ethers.js and your own database -- contract.on for each event, writing rows yourself. More
control, but now you're running and maintaining that process.

## Segment 7 (outro)

Either approach is a legitimate choice for this capstone. Next: the frontend that connects a
wallet, lists an NFT, buys one, and reads its listings straight from whichever index you just
built.
