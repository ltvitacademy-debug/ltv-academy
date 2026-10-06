# Lesson 13 — Writing a Subgraph Schema

**Chapter 3 · Indexing Blockchain Data · Lesson 13 of 24**

## What you'll learn

- What `schema.graphql` actually defines, and why it comes before the mapping code
- GraphQL's entity, field, and relationship syntax as The Graph uses it
- The difference between an immutable event-log entity and a mutable aggregate entity
- How to model a one-to-many relationship (one account, many transfers)

## The schema is the contract for what you can ask

Lesson 12 named `schema.graphql` as the second of a subgraph's three
files. It's the most important one to get right first, because it's not
implementation detail — it's the actual answer to "what questions will
this subgraph be able to answer." Lesson 14's mapping code only exists to
populate whatever entities this file declares. Design the schema around
the questions a frontend or API consumer will ask, not around whatever
fields happen to be easiest to pull off an event.

## Entity syntax

A subgraph schema is standard GraphQL Schema Definition Language, with
one addition: the `@entity` directive, which tells The Graph "this type
gets its own indexed table."

```graphql
type Transfer @entity(immutable: true) {
  id: ID!
  from: Bytes!
  to: Bytes!
  value: BigInt!
  blockNumber: BigInt!
  blockTimestamp: BigInt!
  transactionHash: Bytes!
}
```

`id` is required on every entity and must be unique — for an event-log
entity like this one, the convention is to build it from the transaction
hash and log index (`event.transaction.hash.concatI32(event.logIndex)`),
guaranteeing uniqueness without you having to think about it. `Bytes`,
`BigInt`, and `ID` are Graph-specific GraphQL scalar types built for
chain data — `BigInt` avoids the precision loss a normal GraphQL `Int`
would hit on a token amount with 18 decimals.

## Immutable vs. mutable entities

`Transfer` above is marked `immutable: true` because a historical event
never changes after it's indexed — The Graph can store it more
efficiently knowing that. Compare that to an entity that *does* change
over time, like a running account balance:

```graphql
type Account @entity {
  id: ID!
  balance: BigInt!
  transferCount: Int!
}
```

No `immutable` flag here, because every new `Transfer` involving this
account updates its `balance` and `transferCount` — Lesson 14's mapping
code loads the existing `Account`, mutates it, and saves it back, which
only mutable entities support.

## Relationships: one account, many transfers

Modeling "give me every transfer this account was ever involved in" is a
one-to-many relationship, expressed with a `@derivedFrom` field — a
*virtual* field computed from the other side of the relationship, not
stored on `Account` itself:

```graphql
type Account @entity {
  id: ID!
  balance: BigInt!
  sentTransfers: [Transfer!]! @derivedFrom(field: "from")
}
```

`@derivedFrom` tells The Graph to compute `sentTransfers` by finding
every `Transfer` entity whose `from` field points at this account — so
you never have to maintain an array of transfer IDs by hand, and the
relationship stays correct no matter how many transfers get indexed
later.

## Key terms

| Term | Meaning |
|---|---|
| `@entity` | Directive marking a GraphQL type as an indexed, queryable table |
| `immutable: true` | Marks an entity that never changes after creation (most event-log entities) |
| `BigInt` / `Bytes` | Graph-specific scalars for chain-native numbers and hex data, avoiding precision loss |
| `@derivedFrom` | Defines a virtual, computed relationship field instead of a stored one |

## Check yourself

You're ready for Lesson 14 when you can explain: why is `Transfer`
marked `immutable: true` while `Account` isn't — what would break if you
swapped those two flags?
