# Lesson 24 — Monitoring Kafka

**Chapter 5 Finale · Kafka in the Cloud · Lesson 24 of 30**

## What you'll learn

- The single most important Kafka metric to watch: consumer lag
- Under-replicated partitions, and why they're an early-warning signal
- Broker disk usage, and why it matters even on a managed service
- What a real cluster's monitoring view actually shows

## Consumer lag: the metric that matters most

If you watch exactly one Kafka metric, watch **consumer lag** — the
gap between the latest offset written to a partition and the offset
a consumer group (Lesson 8) has actually committed. Lag climbing
means a consumer is falling behind the rate events are arriving,
which eventually means real-time processing stops being real-time.
Lag is directly comparable to the watermark/late-data concepts from
Fabric & Real-Time Analytics (Lessons 33–34) — both are ways of
asking "how far behind is processing, relative to when things
actually happened?" Kafka's answer is a number of offsets (or the
time delta those offsets represent); Fabric's answer is expressed
against event time and a watermark threshold. Different vocabulary,
same underlying concern.

## Under-replicated partitions: the early warning

Lesson 11 covered replication as Kafka's fault-tolerance mechanism —
each partition has replicas across multiple brokers, so losing one
broker doesn't lose data. An **under-replicated partition** means one
or more of those replicas has fallen behind or is unreachable — the
safety margin Lesson 11 described is currently thinner than it
should be. It's not necessarily an outage yet, but it's the signal
that precedes one: a broker in trouble, a network issue, or a cluster
under more load than it can currently keep up with across all
replicas.

## Broker disk usage: still matters, even managed

Retention (Lesson 13) means Kafka is deliberately holding onto data
for a configured window — which means disk usage is a real,
ongoing concern, not a one-time sizing decision. Even on a managed
service (Confluent Cloud, Lesson 21; Event Hubs, Lesson 22), where
you're not physically watching a disk fill up, the underlying
capacity and retention settings still determine cost and, in
self-hosted deployments specifically, whether a broker actually runs
out of room and starts rejecting writes.

## What a real cluster's monitoring view shows

Every one of these concerns shows up in an actual monitoring
dashboard, not just as abstract numbers:

![Confluent Cloud's cluster detail page, showing a real cluster's settings and monitoring header — cluster ID, type, and status for an actual provisioned Kafka cluster.](/courses/kafka/ch05/24-monitoring-kafka/cluster-detail-header.png)

That header is the entry point to exactly the metrics this lesson
covers — throughput, partition health, and the cluster's overall
status — for the same kind of cluster Lesson 21 walked through
creating.

## Chapter 5 complete

That closes Chapter 5. You've gone from provisioning Kafka without
running a broker (Confluent Cloud) to Azure's own compatibility
bridge (Event Hubs) to the honest managed-vs-self-hosted trade-off,
to this: what actually matters once something is running, wherever
it runs. Chapter 6, **Practical Patterns**, is next — starting with
building a real producer-to-Kafka-to-consumer pipeline end to end.

## Key terms

| Term | Meaning |
|---|---|
| Consumer lag | The gap between the latest offset written and what a consumer group has committed — the single most important metric |
| Under-replicated partition | A partition where one or more replicas has fallen behind or is unreachable — an early-warning signal, not yet an outage |
| Broker disk usage | An ongoing concern driven by retention settings, not a one-time sizing decision |

## Check yourself

You're ready for Chapter 6 when you can explain, without looking:
why is consumer lag described as the single most important metric to
watch, and how does an under-replicated partition relate to what
Lesson 11 taught about replication?
