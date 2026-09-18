# Lesson 4 — Brokers & Clusters

**Chapter 1 · Event Streaming Fundamentals · Lesson 4 of 30**

## What you'll learn

- What a broker actually is: one server, holding some partitions
- What a cluster is: many brokers working together as one logical system
- How partitions get distributed across brokers, and why that matters
- What a real, running cluster overview actually looks like

## A broker is one server, holding some partitions

A **broker** is a single Kafka server process. It holds a subset of
the partitions (Lesson 2) that exist across all the topics in the
cluster, handles the produce and consume requests for those
partitions, and talks to the other brokers to keep everything in
sync. No single broker holds every partition of every topic — that
would defeat the purpose of partitioning for scale in the first
place.

```
Topic "orders" — 3 partitions, spread across 3 brokers:

Broker 1: orders-partition-0
Broker 2: orders-partition-1
Broker 3: orders-partition-2
```

## A cluster is many brokers acting as one system

A **cluster** is the set of brokers working together, coordinated
(via KRaft in modern Kafka, or ZooKeeper in older deployments —
Lesson 14 covers this transition directly) so that from a producer or
consumer's point of view, it looks like one system. A client connects
to any broker in the cluster, asks "who's the leader for this
partition?", and gets routed to the right broker automatically — you
don't manually track which broker holds which partition.

## Why brokers matter beyond just "more capacity"

Adding brokers to a cluster isn't just about raw throughput. It's
also how Kafka survives a broker going down: each partition is
replicated across multiple brokers (Lesson 11 goes deep on this), so
if the broker currently leading a partition fails, another broker
that already has a replica of that partition's data takes over as the
new leader — no data loss, and only a brief interruption. A
single-broker Kafka deployment (fine for local development) has none
of that protection; production clusters are built specifically to
avoid a single point of failure.

## What a real cluster actually looks like

This isn't an abstract diagram — it's a real, monitorable resource.
Confluent Cloud's cluster overview page shows exactly the properties
that matter operationally for a real running cluster: throughput,
storage, and the health of the brokers underneath it:

![Confluent Cloud's cluster overview page, showing a real running Kafka cluster's throughput, storage, and broker health.](/courses/kafka/ch01/04-brokers-and-clusters/cluster-overview-page.png)

Whether you're running Kafka yourself or on a managed service like
this one (Chapter 5 covers managed vs. self-hosted Kafka directly),
the broker-and-cluster model underneath is the same.

## Where this leaves you

That's the physical picture: Kafka is a durable log (Lesson 1)
organized into topics split across partitions with partition-local
offsets (Lesson 2), written to and read from by producers and
consumers that never talk to each other directly (Lesson 3), and
physically hosted across brokers that together form a cluster (this
lesson). One question is still open: why choose Kafka's log-and-
broker model over a traditional message queue, or a managed
alternative like Fabric's Eventstreams? Lesson 5 closes out this
chapter by answering that directly.

## Key terms

| Term | Meaning |
|---|---|
| Broker | A single Kafka server process, holding a subset of the cluster's partitions |
| Cluster | The set of brokers coordinating together as one logical system |
| Leader (of a partition) | The broker currently serving reads/writes for a given partition |
| Replica | A copy of a partition's data held on another broker, for fault tolerance |

## Check yourself

You're ready for Lesson 5 when you can explain, without looking: why
does adding more brokers to a cluster help with both throughput and
fault tolerance, and what actually happens when the broker leading a
partition fails?

