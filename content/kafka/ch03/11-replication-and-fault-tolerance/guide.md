# Lesson 11 — Replication & Fault Tolerance

**Chapter 3 · Kafka Architecture Deep Dive · Lesson 11 of 30**

## What you'll learn

- Why a single copy of a partition is a single point of failure
- Leaders, followers, and what "in-sync" actually means for a replica
- `min.insync.replicas` — the setting that decides how much data loss is tolerable
- What actually happens, step by step, when a broker holding a leader dies

## One copy is a liability, not a shortcut

Every partition you write to lives on disk on one broker — but Kafka
never keeps it at just one copy. `replication.factor` (set per
topic, commonly 3 in production) tells Kafka how many total copies
of each partition to keep, spread across different brokers:

```
Topic "orders", partition 0, replication.factor = 3:

  Broker 1: partition 0  <- LEADER (all reads & writes go here)
  Broker 2: partition 0  <- follower (in-sync replica)
  Broker 3: partition 0  <- follower (in-sync replica)
```

Only the **leader** serves reads and writes. **Followers** just pull
new records from the leader and replicate them — they exist purely
so there are other complete, current copies sitting on other
hardware. A follower that has fully caught up to the leader is an
**in-sync replica (ISR)**; one that's fallen behind (a slow disk, a
network blip) temporarily drops out of the ISR set until it catches
back up.

## `min.insync.replicas`: how much safety you're actually buying

Replication factor alone doesn't guarantee durability — it depends
on how many of those replicas a write has to reach before it's
considered successful:

```
server.properties (topic-level, can override per topic):

replication.factor      = 3   # total copies of each partition
min.insync.replicas     = 2   # writes need >= 2 replicas to ack
```

Combined with a producer's `acks=all` (Lesson 9's delivery
semantics), `min.insync.replicas=2` means: a write only succeeds
once the leader *and* at least one follower have it. Lose one
broker, and the topic keeps accepting writes safely. Lose two out
of three at once, and Kafka refuses new writes rather than silently
accepting data it can't guarantee survives — that's a deliberate
trade-off between availability and durability, not a bug.

## What happens when the leader actually dies

This is the whole reason replication exists — not as an abstract
setting, but as a concrete sequence of events:

1. **Leader broker dies** — a crash, a network partition, a hardware
   fault. It stops responding to the cluster.
2. **The controller notices** — every Kafka cluster (Lesson 14 covers
   exactly how, ZooKeeper- or KRaft-based) has a controller
   tracking broker liveness. The dead broker misses its session
   timeout.
3. **A new leader is elected from the ISR set** — one of the
   in-sync followers (the ones that were fully caught up) is
   promoted to leader for that partition. No data is lost, because
   an ISR member had everything the old leader had.
4. **Producers and consumers reconnect transparently** — Kafka
   clients discover the new leader automatically on their next
   metadata refresh. No manual failover, no application code change.

## Key terms

| Term | Meaning |
|---|---|
| Replication factor | How many total copies of a partition Kafka keeps, across different brokers |
| Leader / follower | The one replica serving reads and writes vs. the copies just replicating it |
| ISR (in-sync replica) | A follower that has fully caught up to the leader — eligible to become the new leader |
| `min.insync.replicas` | The minimum number of replicas a write must reach before it's acknowledged |

## Check yourself

You're ready for Lesson 12 when you can explain: if
`replication.factor=3` and `min.insync.replicas=2`, how many brokers
can go down at once before that topic stops accepting writes — and
why does Kafka choose to stop writes rather than accept them anyway?
