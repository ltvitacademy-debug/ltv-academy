# Cosmos DB APIs: Core (SQL), MongoDB, Cassandra, Gremlin & Table

Lesson 29 established that Cosmos DB is one engine presenting through multiple APIs. This
lesson gets concrete about what those APIs actually are, what each one is genuinely good
for, and — honestly, not diplomatically — which one to choose when starting a new project
versus which ones exist mainly to ease migration off another database.

## What you'll learn

- The five Cosmos DB APIs and what each one presents
- Why Core (SQL/NoSQL) API is the native, recommended default for new projects
- Why the other APIs exist, and when reaching for one of them is the right call

## The five APIs

- **Core (SQL) API** — the native API, storing data as JSON documents and querying with a
  SQL-like dialect (covered fully in Lesson 35). This is Cosmos DB's original, first-class
  interface — every other API is a compatibility layer built on top of the same underlying
  engine.
- **API for MongoDB** — speaks the MongoDB wire protocol, so existing MongoDB drivers and
  tools (including `mongosh` and Compass) can connect to a Cosmos DB account as if it were a
  MongoDB server.
- **Cassandra API** — speaks the Cassandra Query Language (CQL) wire protocol, for
  applications built against Apache Cassandra.
- **Gremlin API** — a graph API implementing the Apache TinkerPop Gremlin traversal
  language, letting Cosmos DB serve as a property-graph database with nodes, edges, and
  traversal queries.
- **Table API** — compatible with Azure Table Storage's API, for applications already built
  against that simpler key-value/entity model.

## Why Core API is the honest recommendation for new projects

This is worth being direct about, because course material sometimes glosses over it: for a
brand-new project with no existing codebase to migrate, Core (SQL) API is the right default.
It's the native API — every feature Cosmos DB ships lands there first, sometimes exclusively.
The other APIs are wire-protocol compatibility layers, which means they carry real
constraints: they don't always expose 100% feature parity with their "native" counterpart
(a genuine Cassandra cluster or a genuine MongoDB server), because they're translating that
protocol onto Cosmos DB's own underlying document/partition model rather than being a
ground-up native implementation of it.

## Why the other APIs exist: migration, not preference

The MongoDB, Cassandra, Gremlin, and Table APIs earn their place for one real reason:
migration compatibility. An organization with an existing MongoDB application, a large
investment in MongoDB drivers and developer familiarity, and a desire to move onto Azure's
globally-distributed, elastically-scaling engine can do so by pointing existing MongoDB
drivers at a Cosmos DB account configured for the MongoDB API — often with far less
application-code rewrite than a full migration to Core API would require. The same logic
applies to a team already deep in Cassandra or Gremlin tooling. Choosing one of these APIs
is a legitimate, honest engineering tradeoff: less migration friction now, in exchange for
not being on the fully-native API.

## Key terms

| Term | Meaning |
|---|---|
| Core (SQL) API | Cosmos DB's native API — JSON documents, SQL-like query dialect, full feature access |
| Wire protocol compatibility | An API surface that speaks another database's network protocol, translated onto Cosmos DB's engine |
| Gremlin | The Apache TinkerPop graph traversal language, exposed by Cosmos DB's graph API |
| CQL | Cassandra Query Language, the protocol Cosmos DB's Cassandra API speaks |

## Check yourself

A team is starting a brand-new application with no existing codebase. Per this lesson, which
Cosmos DB API should they choose, and why isn't "whichever API I'm personally most familiar
with" the right deciding factor?
