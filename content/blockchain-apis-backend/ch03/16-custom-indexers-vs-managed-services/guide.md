# Lesson 16 — Custom Indexers vs. Managed Services

**Chapter 3 · Indexing Blockchain Data · Lesson 16 of 24**

## What you'll learn

- What you actually give up and gain by choosing a managed indexer over your own
- When a subgraph's constraints become a real blocker, not just friction
- What "rolling your own indexer" concretely means, in terms of Lesson 10's listener
- A framework for making this call on a real project, not a fixed answer

## The Graph isn't the only implementation of Lesson 11's pattern

Every lesson in this chapter has been building toward one conclusion:
listen, write, query is the fix for "you can't just query the chain" —
and The Graph is one well-built, widely adopted implementation of it, not
the only one. The honest alternative is building that same pattern
yourself, on infrastructure you fully control: the event listener from
Chapter 2, writing into a Postgres or Mongo database you design, served
by an API you write.

## What a managed service buys you

Subgraph Studio and The Graph Network hand you several things for free
that you'd otherwise build and operate yourself: the indexing
infrastructure itself (no servers to run, scale, or keep synced), a
GraphQL query layer generated automatically from your schema, a public
directory in Graph Explorer so other developers can find and reuse your
subgraph, and a decentralized network of indexers providing redundancy
no single self-hosted service gives you by default.

## What it costs you

Those benefits come with real constraints. A subgraph's mapping handlers
must be pure and deterministic, as Lesson 14 covered — no calling out to
a third-party API mid-handler, no arbitrary business logic that needs
non-chain data. The query shape is whatever GraphQL generates from your
schema — custom aggregations, complex joins across unrelated entities,
or anything resembling a specialized SQL `GROUP BY` often need workarounds
or don't fit cleanly. And production query volume runs through the
gateway's billing model, which is a cost curve you don't control the same
way you'd control your own database's hosting bill.

## Rolling your own: the same pattern, your infrastructure

A custom indexer is Lesson 10's event-listener service, extended: listen
for events (with the reorg-handling from Lesson 9), write normalized rows
into a database you chose and designed, and expose whatever API shape —
REST, GraphQL, or something else entirely — your actual consumers need.
Nothing about this is exotic; it's the same three-step pattern, just
without a managed platform's guardrails or its conveniences.

```
Custom indexer = Chapter 2's listener
                + your own database schema
                + your own API layer
                + you operate and scale all of it
```

The tradeoff is the mirror image of the managed option: full control over
query shape, data model, and business logic, in exchange for owning
uptime, scaling, and reorg correctness yourself, with no public directory
or decentralized redundancy unless you build that too.

## Making the call

A subgraph is usually the right default for straightforward "index these
events, make them queryable" needs — especially public-facing data other
developers might also want to query, where Graph Explorer's reusability
is a real advantage. Reach for a custom indexer when the mapping logic
needs non-deterministic inputs, when the query patterns genuinely don't
fit GraphQL's shape, or when the data needs to live alongside other
business logic in a system you already operate. Several projects don't
choose one exclusively — using a subgraph for public, reusable data while
running a custom indexer for internal, proprietary queries is a common
split, not a sign of indecision.

## Key terms

| Term | Meaning |
|---|---|
| Managed indexer | A platform like The Graph that runs the listen/write/query pipeline for you |
| Custom indexer | A self-built, self-operated version of the same pattern, with full control |
| Deterministic constraint | The requirement that mapping handlers can't use non-chain, non-deterministic inputs |
| Query fit | Whether your actual query patterns map cleanly onto GraphQL's generated shape |

## Check yourself

You're ready for Lesson 17 when you can explain: name one concrete kind
of business logic that a subgraph's handler constraints would block, and
why a custom indexer wouldn't have that limitation.
