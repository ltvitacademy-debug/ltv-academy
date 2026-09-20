# Script — Azure Cosmos DB Overview & the Multi-Model Engine

## Segment 1 (title)

Chapter 6 starts with what Cosmos DB actually is: Microsoft's globally-distributed, multi-model database service, built from the ground up for multi-region distribution in a way on-prem SQL Server or a self-managed MongoDB replica set never was.

## Segment 2 (steps: real SLAs)

Cosmos DB backs its performance with actual financial guarantees — single-digit-millisecond latency at the 99th percentile, 99.999% availability for multi-region accounts, and guaranteed, not best-effort, provisioned throughput. These are specific numeric commitments Microsoft is financially accountable for.

## Segment 3 (code: globally-distributed by design)

Adding multi-region replication to a self-hosted MongoDB deployment means a DBA designing the replica set topology and wiring up members by hand. Adding a region to Cosmos DB is a configuration change — data automatically replicates there, with configurable consistency behavior covered fully in Chapter 8.

## Segment 4 (outro)

Multi-model means one underlying engine, several API surfaces. Next up: Cosmos DB's actual APIs — Core, MongoDB, Cassandra, Gremlin, and Table — and which one to reach for on a new project.
