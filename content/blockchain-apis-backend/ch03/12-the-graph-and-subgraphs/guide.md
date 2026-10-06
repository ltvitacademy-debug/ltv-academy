# Lesson 12 — The Graph & Subgraphs

**Chapter 3 · Indexing Blockchain Data · Lesson 12 of 24**

## What you'll learn

- What The Graph actually is, in terms of the listen/write/query pattern from Lesson 11
- What a "subgraph" is and the three files that define one
- What the indexing workflow looks like in a real terminal and a real dashboard
- Where The Graph fits versus running your own indexer (previewed here, covered fully in Lesson 16)

## The Graph is a managed version of Lesson 11's pattern

Lesson 11 ended on a three-step pattern: listen for events, write them into
a queryable database, query that database instead of the chain. The Graph
is the most widely used managed implementation of exactly that pattern.
You describe *what* to listen for and *how* to shape the data; The Graph's
infrastructure runs the listening, writing, and GraphQL query layer for
you, instead of you standing up your own event listener and Postgres
instance.

The unit of "what to listen for and how to shape it" is called a
**subgraph** — and a subgraph is defined by three files, which the next
two lessons each dig into:

```
subgraph.yaml    — the manifest: which contract, which events, which
                    network, which block to start from
schema.graphql   — the entities you want queryable (Lesson 13)
mapping.ts       — the code that turns a raw event into an entity
                    (Lesson 14)
```

## Building one starts with the CLI, not a web form

A subgraph is scaffolded and deployed from the command line with the
Graph CLI, authenticated against **Subgraph Studio** — the dashboard
where you manage, test, and eventually publish a subgraph. `graph init`
walks you through picking a protocol, a contract address, and a start
block, then generates the three files above from your contract's ABI:

![A real terminal running `graph init`, prompting for protocol, contract address, and start block, then scaffolding a subgraph directory.](/courses/blockchain-apis-backend/ch03/12-the-graph-and-subgraphs/graph-init-terminal.png)

Notice the CLI fetching the ABI straight from Etherscan and failing to
find a start block automatically for this particular contract — that's
normal, and it's why `graph init` lets you type one in by hand rather
than requiring it to be auto-detected.

## What a deployed subgraph looks like

Once you run `graph deploy`, the subgraph shows up in Subgraph Studio with
a live dashboard: its sync status, which network it's indexing, an entity
count, and — highlighted below — its **deploy key**, the credential that
authenticates further pushes to this specific subgraph.

![Subgraph Studio's dashboard for a deployed subgraph, showing status, indexed network, entity count, and the deploy key field circled.](/courses/blockchain-apis-backend/ch03/12-the-graph-and-subgraphs/studio-dashboard-deploy-key.jpg)

A subgraph being "Synced" at 100% means every block in its target range
has been processed. That doesn't happen instantly — a contract with years
of history can take a real indexer hours to catch up on, and Studio's
**Logs** tab is where you watch that happen and catch mapping errors as
they occur, rather than discovering them only after querying bad data:

![Subgraph Studio's Logs tab, showing real-time debug output as the indexer processes blocks.](/courses/blockchain-apis-backend/ch03/12-the-graph-and-subgraphs/studio-logs-tab.png)

## Studio vs. the network — a preview

What you've just seen — `graph deploy`, the Studio dashboard — gets you a
subgraph that's free, rate-limited, and only visible to you: good for
development and testing. Making it public and queryable at scale is a
separate step, **publishing** to The Graph Network, which Lesson 15
covers in full. And The Graph isn't the only option at all — Lesson 16
compares it against running a custom indexer yourself.

## Key terms

| Term | Meaning |
|---|---|
| Subgraph | A listen/write/query definition for The Graph: manifest + schema + mappings |
| Subgraph Studio | The dashboard for building, testing, and deploying a subgraph before it's public |
| `graph init` / `graph deploy` | CLI commands that scaffold a subgraph and push it to Studio |
| Deploy key | The credential authenticating further CLI pushes to a specific subgraph |

## Check yourself

You're ready for Lesson 13 when you can explain: in terms of Lesson 11's
listen/write/query pattern, which of the three subgraph files corresponds
to each step?
