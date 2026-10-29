# Lesson 22 — Replicating Data Across Clouds Without Breaking Consistency

**Chapter 6 · Data Architecture Across Hybrid and Multi-Cloud · Lesson 22 of 32**

## What you'll learn

- The real reasons organizations replicate data across clouds, instead
  of just picking one cloud and leaving the data there
- The actual mechanisms used to replicate data across clouds: native
  database replication, change data capture (CDC), and cloud-native
  copy services — and why ad hoc dual writes from the application
  layer are a trap
- Why strict, always-consistent replication across clouds is
  essentially impossible without unacceptable latency, and why
  **eventual consistency** is the realistic default instead
- How real conflict-resolution strategies handle multi-writer
  scenarios: last-writer-wins, application-level merge logic, and
  conflict-free replicated data types (CRDTs)

## Why replicate across clouds at all

Lesson 21 established that data gravity pulls workloads toward wherever
a large dataset already lives — so replication across clouds is the
exception, done for specific reasons, not the default. The real
reasons organizations take on the cost and complexity of cross-cloud
replication are:

- **Disaster recovery.** A second, independent copy in a different
  cloud survives a failure — provider-wide outage, account
  compromise, or regional disaster — that a single-cloud copy can't.
- **Low-latency reads for distributed users.** Users in Europe reading
  data that's replicated into a European region perform far better
  than users reading across an ocean from wherever the primary copy
  sits.
- **Compliance and sovereignty.** Lesson 23 covers this in depth, but
  some regulations require a copy of certain data to physically reside
  within a specific country or region.
- **Deliberate multi-cloud redundancy.** Some organizations replicate
  specifically to avoid being fully dependent on one vendor's
  continued existence and pricing.

## How replication actually happens

Three real mechanisms cover almost every cross-cloud replication setup
in production:

1. **Native database replication.** Many databases ship with their
   own replication protocol — Postgres logical replication, for
   example — that can stream changes from a primary instance to a
   replica running anywhere network connectivity reaches, including a
   different cloud entirely.
2. **Change data capture (CDC).** A CDC tool reads a database's
   transaction log (not the live tables) and streams every insert,
   update, and delete as an event. Tools like AWS Database Migration
   Service, Azure Data Factory's change-tracking pipelines, and
   Kafka-based CDC connectors (such as Debezium) all work this way,
   continuously streaming changes into a target in another cloud.
3. **Cloud-native global replication features.** Some managed
   databases build cross-region, and in some cases cross-cloud-style,
   replication directly into the product: Azure Cosmos DB's
   multi-region writes and DynamoDB Global Tables both maintain
   continuously synchronized copies with a built-in conflict-handling
   policy, which is where the next section picks up.

What you should actively avoid is **dual-writing from the application
layer** — having application code write to two databases in two
clouds in the same request. It looks simple, but a partial failure
(the first write succeeds, the second times out) leaves the two copies
silently inconsistent with no systematic way to detect or repair it.
Dedicated replication mechanisms exist specifically because they
handle partial failure, ordering, and retries correctly; hand-rolled
dual writes generally don't.

## The consistency tradeoff: eventual, not strict

Within a single data center, it's realistic to guarantee that a write
is immediately visible to every subsequent read — strict consistency.
Across clouds and regions, separated by real network latency, that
guarantee becomes prohibitively expensive: enforcing it would mean
every write waits for acknowledgment from a replica possibly tens or
hundreds of milliseconds away, for every single write. In practice,
essentially every cross-cloud replication system instead accepts
**eventual consistency**: a write is immediately durable and correct
in its origin location, and replicas converge to the same value
shortly afterward — typically within milliseconds to a few seconds,
depending on the mechanism and distance involved.

This isn't a compromise anyone is embarrassed about. It's the
realistic, working default for cross-cloud data, and the architectural
skill is in designing around it — not pretending it isn't true.

## Conflict resolution for multi-writer scenarios

Eventual consistency is manageable as long as there's one place a
given piece of data is written. It gets genuinely harder the moment
**more than one location can write the same record** — the
multi-writer, or active-active, scenario. If a customer record is
updated in both the US and EU copies within the same few hundred
milliseconds, which update wins?

Real strategies used in production:

- **Last-writer-wins (LWW).** The update with the latest timestamp is
  kept, and the other is discarded. This is the default conflict
  policy in both Cosmos DB and DynamoDB Global Tables. It's simple and
  predictable, but it silently drops data — acceptable for some fields,
  unacceptable for others (you don't want a customer's address update
  silently lost because of clock skew).
- **Application-level merge logic.** Cosmos DB also supports a custom
  merge procedure, letting application code decide how to combine two
  conflicting versions of a record rather than discarding one
  outright — for example, keeping both items in a conflicting shopping
  cart rather than one overwriting the other.
- **Conflict-free replicated data types (CRDTs).** For specific data
  shapes — counters, sets, certain collaborative-editing structures —
  CRDTs are designed so that concurrent updates can always be merged
  deterministically without conflict, by construction.
- **Avoiding multi-writer where possible.** The simplest and most
  reliable strategy is architectural: partition writes so each record
  has exactly one authoritative writer location (active-passive, or
  sharded by region), and only accept the complexity of true
  multi-writer when the business genuinely requires low-latency local
  writes everywhere at once.

## Key terms

| Term | Meaning |
|---|---|
| Change data capture (CDC) | Reading a database's transaction log and streaming every change as an event, used to replicate data continuously into another cloud |
| Eventual consistency | A guarantee that replicas converge to the same value shortly after a write, rather than being immediately identical everywhere |
| Last-writer-wins (LWW) | A conflict-resolution policy that keeps the update with the latest timestamp and discards the other, when the same record is written in two places |
| Active-active replication | A multi-writer setup where more than one location can accept writes to the same record, requiring an explicit conflict-resolution policy |

## Check yourself

You're ready for Lesson 23 when you can explain, without looking: why
is eventual consistency the realistic default for cross-cloud
replication rather than strict consistency, and what's the simplest
architectural way to avoid needing conflict resolution at all?
