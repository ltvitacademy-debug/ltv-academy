# Script — RPC Providers & Nodes

## Segment 1 (title)

There's no single server called "the blockchain" to call. Ethereum is thousands of independently run nodes, each holding a full copy of chain state, each answering JSON-RPC requests. Talking to the chain always means talking to one specific node.

## Segment 2 (screenshot: chainlist)

Chainlist.org is a live directory of public RPC endpoints per chain — because there's no single answer to "what node do I call." Each entry shows its own current block height and latency, so you can compare them.

## Segment 3 (screenshot: Infura)

Running your own node is real infrastructure — hundreds of gigabytes, hours to sync, a server you have to keep patched forever. Most teams skip that and pay a node provider instead. Infura and Alchemy are the two biggest, and signing up hands you an RPC endpoint URL with your API key baked right into it.

## Segment 4 (screenshot: Alchemy dashboard)

Providers also give you a dashboard — creating keys, choosing networks, and watching live request volume and success rate for your app.

## Segment 5 (code: the endpoint URL)

Point a library at that URL and that's the whole setup — you're talking to a real synced node without running one yourself.

## Segment 6 (outro)

A managed provider is almost always the right default — no infrastructure, generous free tiers, dozens of chains behind one account. Next up: actually using that endpoint to read real chain data with ethers.js and viem.
