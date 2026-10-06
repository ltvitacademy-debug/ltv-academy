# Script — Deploying & Querying a Subgraph

## Segment 1 (title)

A subgraph deployed to Studio is synced and queryable by you, but free, rate-limited, and invisible to anyone else. Making it public is a separate, deliberate step called publishing.

## Segment 2 (screenshot: publish button)

It's triggered from the same Studio dashboard, with the Publish button.

## Segment 3 (screenshot: publish modal)

Clicking it opens a modal confirming which network, and whether to add curation signal — GRT staked on this subgraph to economically signal indexers it's worth indexing. Without signal, nobody's incentivized to prioritize it.

## Segment 4 (screenshot: query button)

Once published and synced, the subgraph gets a real card in Graph Explorer, with live query volume and signal — and the Query button is the entire point of everything built so far.

## Segment 5 (screenshot: query URL format)

That leads to the actual production endpoint: a base URL, your API key, and the subgraph's own ID.

## Segment 6 (code: GraphQL query)

Querying is a standard GraphQL POST, and it's where the schema from Lesson 13 pays off — first, orderBy, orderDirection, and where are all generated automatically. A query that meant scanning years of logs by hand is now one indexed call.

## Segment 7 (outro)

That closes the loop on The Graph. Next up, Lesson 16 compares this managed path against running a custom indexer yourself.
