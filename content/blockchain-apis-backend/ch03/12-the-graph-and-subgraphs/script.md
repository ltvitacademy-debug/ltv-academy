# Script — The Graph & Subgraphs

## Segment 1 (title)

Lesson 11 ended on listen, write, query. The Graph is the most widely used managed version of exactly that pattern — you describe what to listen for and how to shape it, and The Graph runs the listening, writing, and query layer for you.

## Segment 2 (steps: three files)

That description is called a subgraph, and it's three files: subgraph.yaml, the manifest naming the contract, events, and start block; schema.graphql, the entities you want queryable; and mapping.ts, the code turning a raw event into an entity. The next two lessons dig into the last two.

## Segment 3 (screenshot: graph init)

Building one starts with the CLI, not a web form. graph init walks you through picking a protocol, a contract address, and a start block, fetching the ABI straight from Etherscan, then scaffolds all three files for you.

## Segment 4 (screenshot: studio dashboard)

Once deployed, the subgraph shows up in Subgraph Studio with a live dashboard — sync status, indexed network, entity count, and the deploy key, the credential that authenticates further pushes to this specific subgraph.

## Segment 5 (screenshot: logs tab)

Syncing to 100% isn't instant — a contract with years of history can take hours. Studio's Logs tab is where you watch that happen and catch mapping errors as they occur, not after you've already queried bad data.

## Segment 6 (outro)

What you've seen here is free, rate-limited, and private — good for development. Publishing it for real, public use is Lesson 15. Next up, though: Lesson 13, writing the schema that defines what you can actually query.
