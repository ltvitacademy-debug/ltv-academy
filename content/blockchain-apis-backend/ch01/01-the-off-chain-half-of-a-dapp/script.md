# Script — The Off-Chain Half of a dApp

## Segment 1 (title)

A deployed smart contract just sits at an address holding state and exposing functions. It doesn't fetch a price, push a notification, or remember you're logged in. That's the job of the other half of a dApp — the half this course is about.

## Segment 2 (steps: what runs where)

A browser wallet can sign things and call the chain directly, but it can't run on a schedule, index history, or hold an API key server side. Every real dApp pairs its contracts with an actual backend doing off-chain work — on a server you control, outside the EVM.

## Segment 3 (code: the backend's job list)

That backend reads chain state, sends transactions on a user's behalf, listens for events the instant they happen, indexes history so you can answer "show me everything," talks to oracles for real-world data, and manages sessions so your app knows who's logged in.

## Segment 4 (steps: course roadmap)

This course builds each of those jobs, one chapter at a time: talking to the chain, listening for events, indexing at scale with The Graph, pulling in oracles, and handling wallets and sessions on the server.

## Segment 5 (outro)

None of this is optional — a dashboard that can't read a balance, or a marketplace that can't react to a sale, isn't shippable. Next up: what you're actually connecting to when your backend talks to the chain — RPC providers and nodes.
