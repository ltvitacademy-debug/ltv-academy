# Script — Cosmos DB for MongoDB & Cassandra Workloads

## Segment 1 (title)

Cosmos DB is a multi-model engine underneath a set of wire-protocol-compatible APIs. Two of them exist so you don't have to rewrite an application at all: the API for MongoDB and the API for Apache Cassandra.

## Segment 2 (code: wire-protocol compatibility, not a rewrite)

MongoDB drivers speak the MongoDB wire protocol, and Cosmos DB's API for MongoDB implements that same protocol — your existing driver, mongosh, or Compass connects by changing the connection string, not by rewriting queries. The API for Cassandra does the same for the CQL wire protocol.

## Segment 3 (steps: the honest caveat)

Wire-protocol compatibility doesn't mean full feature parity. Some aggregation operators, admin commands, or CQL features may be unsupported or behave differently. Real migration work means checking the compatibility matrix against your actual usage, not assuming it because the connection succeeded.

## Segment 4 (outro)

These APIs are a genuine option for lift-and-shift onto Cosmos DB's global distribution and elastic throughput — but a tradeoff to verify, not a free upgrade. Next up, Chapter Eight: global distribution and multi-region writes.
