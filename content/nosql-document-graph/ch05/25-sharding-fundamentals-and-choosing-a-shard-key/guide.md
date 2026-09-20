# Sharding Fundamentals & Choosing a Shard Key

A replica set solves availability and read scaling — every secondary holds the full data
set. It does nothing for write scaling or data sets larger than one server can hold. MongoDB's
answer to that problem is **sharding**: horizontally partitioning a collection's documents
across multiple machines. The architecture has real, specific components, and the single
highest-leverage decision you'll make is the **shard key** — get it wrong and you can create
a cluster that's technically "sharded" but still funnels all its traffic through one shard.

## What you'll learn

- The three architectural pieces of a sharded cluster: `mongos`, config servers, shards
- What a shard key is and why it's chosen once, carefully, up front
- Cardinality and monotonic shard keys — the two classic ways to create a hotspot

## The three pieces of a sharded cluster

A sharded MongoDB cluster has three distinct components working together:

- **Shards** — each shard holds a subset of the collection's data, and in production each
  shard is itself a replica set (for its own availability, independent of sharding).
- **Config servers** — a small replica set that stores the cluster's metadata: which shard
  key ranges live on which shard. Every routing decision depends on this metadata.
- **`mongos`** — the query router. Applications never talk to shards directly; they connect
  to `mongos`, which consults the config servers and routes each operation to the right
  shard (or shards, if the query can't be targeted to one).

This is architecturally similar in spirit to a SQL Server DBA's mental model of a distributed
system with a routing layer sitting in front of partitioned storage — the names are
MongoDB's own, but the separation of "route" from "store" from "describe the layout" is a
familiar pattern.

## What a shard key actually does

The **shard key** is one or more fields chosen from every document in a sharded collection;
MongoDB uses it to determine which shard each document lives on. It's chosen when a
collection is first sharded and is difficult to change afterward (via `reshardCollection`
under real operational constraints) — so this is very much a "measure twice" decision, not
one to default without thinking.

## Cardinality and monotonic keys: the two classic mistakes

Two shard key properties matter most, and both have a direct, real analog to bad partition
key choices a relational DBA already recognizes:

- **Low cardinality** — a shard key with few distinct values (like a `status` field with
  only three possible values) can only ever be split into a few chunks, capping how far the
  data can actually spread across shards, no matter how many shards exist.
- **Monotonically increasing keys** — a shard key like an auto-incrementing `_id` or a
  timestamp means every new document's key value is higher than the last, so all new writes
  land on the same shard (whichever one owns the highest range) until it splits. This is
  genuinely the same failure mode as a monotonically increasing partition key creating a
  "hot" partition that absorbs all new inserts while the rest of the partitions sit idle.

A good shard key has high cardinality and distributes writes evenly across the key's range —
often achieved by hashing the key (a **hashed shard key**) specifically to break up
monotonic write patterns.

## Key terms

| Term | Meaning |
|---|---|
| Shard | One partition of a sharded collection's data, itself typically a replica set |
| Config server | Replica set storing the cluster's metadata — which key ranges live on which shard |
| `mongos` | The query router applications connect to; routes operations to the correct shard(s) |
| Shard key | Field(s) used to determine which shard a document belongs on; chosen once, hard to change |

## Check yourself

Why does a monotonically increasing shard key (like an auto-incrementing `_id`) cause a
write hotspot, and how is that the same underlying problem a relational DBA already knows
from bad partition key selection?
