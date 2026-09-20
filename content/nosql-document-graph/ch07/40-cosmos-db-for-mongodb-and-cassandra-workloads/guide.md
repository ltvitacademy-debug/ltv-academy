# Cosmos DB for MongoDB & Cassandra Workloads

So far this chapter has assumed the Core (SQL) API — Cosmos DB's native document model, queried
with SQL-like syntax. But Cosmos DB is a multi-model engine underneath a set of wire-protocol-
compatible APIs, and two of those APIs exist specifically so you don't have to rewrite an
application at all: the **API for MongoDB** and the **API for Apache Cassandra**.

## What you'll learn

- What wire-protocol compatibility actually means, and why it's different from "a similar API"
- How an existing MongoDB or Cassandra application points at Cosmos DB instead
- The honest caveat every migration plan needs: compatibility isn't 100% feature parity

## Wire-protocol compatibility, not a rewrite

MongoDB drivers and tools speak the **MongoDB wire protocol** — the binary protocol client
libraries use to talk to a MongoDB server. Cosmos DB's API for MongoDB implements that same wire
protocol at the network level. A real consequence: your existing application, using its existing
MongoDB driver, `mongosh`, or a GUI tool like MongoDB Compass, can connect to Cosmos DB by
changing the connection string — not by rewriting queries or swapping libraries.

```
# Native MongoDB
mongodb://user:pass@localhost:27017/mydb

# Cosmos DB for MongoDB — same driver, different connection string
mongodb://myaccount:<key>@myaccount.mongo.cosmos.azure.com:10255/mydb
  ?ssl=true&replicaSet=globaldb
```

Cosmos DB's **API for Apache Cassandra** works the same way, but for the CQL (Cassandra Query
Language) wire protocol — existing Cassandra drivers, `cqlsh`, and CQL statements can target a
Cosmos DB account by pointing the connection at Cosmos DB's Cassandra endpoint instead of an
Apache Cassandra cluster.

## The honest caveat: not 100% feature parity

Wire-protocol compatibility does not mean full feature parity with native MongoDB or Cassandra.
Both APIs implement a large, growing subset of their respective protocols and commands — but some
aggregation operators, administrative commands, or CQL features may be unsupported, behave
slightly differently, or have different performance characteristics on Cosmos DB's underlying
engine. Real migration work still means checking Microsoft's published feature-support and
compatibility matrix against your application's actual usage, not assuming everything will "just
work" because the connection succeeded.

## When this is the right move

These APIs exist for real lift-and-shift scenarios: an application already built on MongoDB or
Cassandra that wants Cosmos DB's global distribution, elastic throughput, and SLA-backed
availability, without a full rewrite onto the Core (SQL) API. It's a genuine option — not a
gimmick — but it's a tradeoff, not a free upgrade: verify feature compatibility first, on the
specific operations your application depends on.

## Key terms

| Term | Meaning |
|---|---|
| Wire protocol | The binary/network protocol a database's client drivers use to communicate with the server |
| API for MongoDB | Cosmos DB's implementation of the MongoDB wire protocol, letting existing MongoDB apps connect with minimal changes |
| API for Cassandra | Cosmos DB's implementation of the CQL wire protocol for existing Cassandra apps |
| Feature-support matrix | Microsoft's documentation of which protocol commands/operators are and aren't supported |

## Check yourself

A team wants to move their MongoDB application to Cosmos DB's API for MongoDB purely by changing
the connection string, assuming full compatibility. What real step does this lesson say they
shouldn't skip before doing that?
