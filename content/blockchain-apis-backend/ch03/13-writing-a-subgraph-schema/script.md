# Script — Writing a Subgraph Schema

## Segment 1 (title)

schema.graphql is the most important of the three subgraph files to get right first, because it's the actual answer to what questions this subgraph can answer. The mapping code in Lesson 14 only exists to populate whatever this file declares.

## Segment 2 (code: entity syntax)

It's standard GraphQL with one addition, the @entity directive, marking a type as its own indexed table. Every entity needs a unique id — for an event-log entity that's usually the transaction hash plus log index. BigInt and Bytes are chain-native scalars that avoid the precision loss a normal Int would hit.

## Segment 3 (code: immutable vs mutable)

Transfer is marked immutable true because a historical event never changes once indexed. An Account entity isn't immutable, because every new transfer updates its balance and transfer count — Lesson 14's mapping code loads it, mutates it, saves it back.

## Segment 4 (code: derivedFrom relationship)

To get every transfer an account was involved in, you use derivedFrom — a virtual field computed from the other side of the relationship. The Graph finds every Transfer whose from field points at this account, so you never maintain an array by hand.

## Segment 5 (outro)

With the schema defining what's queryable, the next question is how a raw event actually becomes one of these entities. That's Lesson 14: mapping handlers.
