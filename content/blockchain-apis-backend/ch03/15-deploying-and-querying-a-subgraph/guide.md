# Lesson 15 — Deploying & Querying a Subgraph

**Chapter 3 · Indexing Blockchain Data · Lesson 15 of 24**

## What you'll learn

- The difference between deploying to Studio and publishing to The Graph Network
- What "adding signal" means and why it affects whether anyone indexes your subgraph
- How to find and query a published subgraph's real endpoint
- The actual shape of a GraphQL query against your schema

## Deployed to Studio is not the same as live

Lesson 12 got a subgraph deployed to Subgraph Studio — synced, queryable
by you, but free, rate-limited, and invisible to anyone else. That's
intentional: Studio is a staging environment. Making a subgraph public
and indexed by the decentralized network is a separate, deliberate step
called **publishing**, triggered from the same dashboard with the
Publish button:

![Subgraph Studio's dashboard with the Publish button highlighted — the deliberate step that makes a subgraph public.](/courses/blockchain-apis-backend/ch03/15-deploying-and-querying-a-subgraph/publish-button.png)

## What publishing actually changes

Clicking Publish opens a modal confirming which network you're
publishing to and, critically, whether to add **curation signal** —
GRT tokens staked on this specific subgraph to economically signal to
indexers that it's worth indexing:

![The "Publish to The Graph Network" modal, with the signal toggle circled — staking GRT to incentivize indexers to pick up this subgraph.](/courses/blockchain-apis-backend/ch03/15-deploying-and-querying-a-subgraph/publish-modal.png)

Publishing is an on-chain action, and it does three concrete things:
makes the subgraph indexable by The Graph Network's decentralized
indexers instead of only the Studio's single upgrade indexer, removes
the rate limit that applied in Studio, and makes it publicly searchable
and queryable in Graph Explorer. Without any curation signal, indexers
have no economic incentive to prioritize indexing it — signal is what
actually gets a subgraph picked up quickly rather than sitting unindexed.

## Finding the query endpoint

Once published and synced, a subgraph gets a real card in Graph
Explorer — and the **Query** button is the entire point of everything
built so far: this is where Lesson 11's problem gets solved for real.

![A published subgraph's card in Graph Explorer, showing live query volume, signal, and the Query button circled.](/courses/blockchain-apis-backend/ch03/15-deploying-and-querying-a-subgraph/query-button.png)

That button leads to the actual production query URL, built from a
fixed format — a base URL, your API key, and the subgraph's own ID:

![The Query URL format panel, showing the exact production endpoint pattern with the api-key and subgraph-id placeholders highlighted.](/courses/blockchain-apis-backend/ch03/15-deploying-and-querying-a-subgraph/query-url-format.png)

```
https://gateway.thegraph.com/api/{api-key}/subgraphs/id/{subgraph_id}
```

## Writing the query

With that URL in hand, querying is a standard GraphQL POST — and this is
where Lesson 13's schema pays off directly. Every entity and
relationship you defined becomes a queryable field:

```graphql
{
  transfers(
    first: 5
    orderBy: blockTimestamp
    orderDirection: desc
    where: { to: "0xabc..." }
  ) {
    id
    from
    to
    value
    blockTimestamp
  }
}
```

`first`, `orderBy`, `orderDirection`, and `where` are all generated
automatically from the schema — you didn't write any of that filtering
or sorting logic. That's the entire payoff of Lesson 11's listen/write/
query pattern: a query that would have meant scanning years of logs by
hand is now one indexed, filtered, sorted call.

## Key terms

| Term | Meaning |
|---|---|
| Publishing | The on-chain action making a subgraph public, indexed by the network, and rate-limit-free |
| Curation signal | GRT staked on a subgraph to economically incentivize indexers to index it |
| Graph Explorer | The public directory where published subgraphs are searchable and queryable |
| Query endpoint | The `gateway.thegraph.com` URL, keyed by API key and subgraph ID |

## Check yourself

You're ready for Lesson 16 when you can explain: what specifically stops
a subgraph deployed only to Studio from being usable by someone outside
your own team?
