# Lesson 14 — ZooKeeper vs. KRaft

**Chapter 3 · Kafka Architecture Deep Dive · Lesson 14 of 30**

## What you'll learn

- What ZooKeeper actually did for a Kafka cluster, historically
- Why that meant running and operating an entirely separate system
- KRaft: Kafka's own built-in consensus, replacing ZooKeeper's job
- Which one is the current recommended default for a new deployment

## What ZooKeeper actually did

Lesson 11 talked about a "controller" tracking broker liveness and
driving leader election when a broker dies — for most of Kafka's
history, ZooKeeper is what made that possible. It wasn't part of
Kafka itself; it's a separate, general-purpose coordination system
(originally built for Hadoop) that Kafka leaned on for:

```
ZooKeeper's job, historically:
  - Storing cluster metadata (which brokers exist, topic configs, ACLs)
  - Electing the cluster's controller broker
  - Detecting broker failures (session timeouts)
```

That worked, but it meant every Kafka cluster was really *two*
systems to run, patch, monitor, and scale: the Kafka brokers, and a
separate ZooKeeper ensemble underneath them — its own cluster, its
own failure modes, its own operational surface area.

## KRaft: Kafka doing it itself

KRaft (short for **K**afka **Raft**) replaces ZooKeeper with a
consensus protocol built directly into Kafka. A small set of
brokers take on a **controller** role and use the Raft algorithm to
agree on cluster metadata among themselves — no external system:

```
KRaft's job, built into Kafka itself:
  - The same metadata ZooKeeper used to store, now in a Kafka-
    managed metadata log, replicated via Raft
  - Controller election happens among Kafka's own controller nodes
  - One system to run, not two
```

```
server.properties, KRaft mode:
process.roles = broker,controller     # combined mode (small clusters)
controller.quorum.voters = 1@host1:9093,2@host2:9093,3@host3:9093
```

## Which one is actually current

KRaft reached production-ready status starting with Kafka 3.3
(2022), and ZooKeeper mode was deprecated across the 3.x line as
KRaft matured. As of Kafka 4.0, ZooKeeper support was removed
entirely — KRaft is not just the recommended default for a new
cluster, it's the only supported mode. Any cluster still running on
ZooKeeper today is running an older version and has a real
migration ahead of it, not a stylistic choice to make either way.

## Why this matters even though it's "just infrastructure"

This isn't a lesson about a UI or a workflow — it's about what
holds the whole cluster's shared truth together. Every fact from
Lesson 11 (who's the leader, who's in the ISR, is a broker alive)
has to live somewhere durable and agreed-upon by the whole cluster.
ZooKeeper answered that question with an external system; KRaft
answers it with Kafka itself, which is simpler to operate and scales
to far more partitions per cluster — one less moving part between
you and a working deployment.

## Key terms

| Term | Meaning |
|---|---|
| ZooKeeper | The external coordination system Kafka historically depended on for metadata and controller election |
| KRaft | Kafka's own built-in Raft-based consensus, replacing ZooKeeper entirely |
| Controller | The broker (or quorum, in KRaft) responsible for cluster metadata and leader election |

## Check yourself

You're ready for Lesson 15 when you can explain: what specific
operational cost did running ZooKeeper alongside Kafka actually
impose, and what did KRaft remove to eliminate that cost?
