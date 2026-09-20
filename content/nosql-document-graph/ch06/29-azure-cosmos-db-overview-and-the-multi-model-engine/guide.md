# Azure Cosmos DB Overview & the Multi-Model Engine

Chapter 1 introduced Cosmos DB as the natural next step for a DBA already carrying SQL
Server and Azure Database Administrator knowledge into this course. This lesson starts
Chapter 6 by covering what Cosmos DB actually is: Microsoft's globally-distributed,
multi-model database service, built from the ground up for the kind of multi-region
distribution that on-prem SQL Server, or even a self-managed MongoDB replica set, was never
architected for.

## What you'll learn

- What "globally-distributed" and "multi-model" genuinely mean for Cosmos DB
- Cosmos DB's real, distinctive SLAs — latency and availability
- How Cosmos DB's elastic scale differs from the manual capacity planning in Lesson 28

## A globally-distributed engine, not a database you replicate manually

Where a self-hosted MongoDB deployment (or SQL Server, for that matter) requires a DBA to
deliberately design and wire up multi-region replication, Cosmos DB is built with global
distribution as a first-class, built-in capability. Adding a region to a Cosmos DB account
is a configuration change — turning on a region in the Azure portal or via the SDK — not an
infrastructure project involving new replica set members and network topology decisions.
Data is automatically replicated to every region added to the account, with configurable
consistency behavior (covered fully in Chapter 8).

## Real, distinctive SLAs

Cosmos DB is unusual among databases in that Microsoft backs its performance and
availability characteristics with actual financial-backed Service Level Agreements:

- **Single-digit-millisecond latency** — Microsoft guarantees reads and writes at the 99th
  percentile complete in under 10 milliseconds, for accounts provisioned with dedicated
  throughput.
- **99.999% availability for multi-region accounts** — for accounts configured with more
  than one region, Cosmos DB guarantees "five nines" availability, a stronger guarantee than
  a single-region deployment gets.
- **Guaranteed throughput** — provisioned Request Units (introduced properly in Lesson 34)
  are contractually available, not best-effort.

These aren't marketing language — they're specific, numeric commitments Microsoft is
financially accountable for, which is a genuinely different posture than "should perform
well in most cases."

## Multi-model: one engine, several APIs

"Multi-model" means Cosmos DB's underlying engine can present itself through more than one
API surface — a document/SQL-like Core API, plus wire-protocol-compatible APIs for MongoDB,
Cassandra, Gremlin (graph), and Table workloads. Lesson 30 covers this in full, including the
honest recommendation of which API to reach for on a new project. The important idea for
this lesson: it's genuinely one underlying storage and distribution engine, not five
separate databases bundled under one brand.

## Elastic scale, not manual capacity planning

Lesson 28 walked through a MongoDB capacity planning framework built around a DBA
deliberately choosing vertical scaling, replicas, or sharding. Cosmos DB's elastic scale
model is different in kind: throughput and storage scale automatically (in autoscale mode)
or by direct provisioning (in manual/serverless mode, both covered in Lesson 34), without a
DBA choosing a shard key or standing up new cluster members by hand. The partitioning that
makes this possible (Lesson 32) still requires real design decisions — elastic scale doesn't
mean zero-thought scaling, just that the mechanics of adding capacity are handled by the
service rather than by manual infrastructure work.

## Key terms

| Term | Meaning |
|---|---|
| Globally-distributed | Data automatically replicated across Azure regions added to a Cosmos DB account, as a built-in capability |
| SLA (Service Level Agreement) | A financially-backed guarantee — here, on latency, availability, throughput, and consistency |
| Multi-model | One underlying engine exposing multiple API surfaces (Core, MongoDB, Cassandra, Gremlin, Table) |
| Elastic scale | Automatic or direct throughput/storage scaling without manual cluster topology changes |

## Check yourself

How does adding a new geographic region to a Cosmos DB account differ, in practice, from
adding multi-region replication to a self-hosted MongoDB deployment?
