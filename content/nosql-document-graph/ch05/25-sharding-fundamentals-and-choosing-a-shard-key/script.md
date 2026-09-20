# Script — Sharding Fundamentals & Choosing a Shard Key

## Segment 1 (title)

A replica set solves availability and read scaling, but nothing for write scaling or data too large for one server. MongoDB's answer is sharding — horizontally partitioning a collection's documents across multiple machines.

## Segment 2 (steps: three pieces)

A sharded cluster has three pieces. Shards hold the data, each typically its own replica set. Config servers store the cluster's metadata — which key ranges live where. And mongos is the query router applications actually connect to, which consults the config servers and routes each operation.

## Segment 3 (code: two mistakes)

The shard key determines which shard each document lives on, chosen once and hard to change later. Low cardinality caps how many chunks the data can split into. A monotonically increasing key, like an auto-incrementing _id, sends every new write to the same shard — the same hotspot failure mode as a bad relational partition key.

## Segment 4 (outro)

A good shard key has high cardinality and spreads writes evenly, often by hashing the key. Next up: actually configuring a sharded cluster, from config servers through sh.shardCollection().
