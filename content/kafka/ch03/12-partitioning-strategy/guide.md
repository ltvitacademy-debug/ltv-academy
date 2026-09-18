# Lesson 12 — Partitioning Strategy

**Chapter 3 · Kafka Architecture Deep Dive · Lesson 12 of 30**

## What you'll learn

- How a producer decides which partition a message actually lands on
- Why choosing a partition key is a real design decision, not a formality
- The trade-off between too few partitions and too many
- How a bad key choice quietly creates a hot partition

## Where a message actually lands

Topics, Partitions & Offsets (Lesson 2) introduced partitions as the
unit Kafka parallelizes across. This lesson is about how a producer
actually decides which one a given message goes to:

```
If the producer supplies a key:
  partition = hash(key) % numPartitions
  -> Same key ALWAYS lands on the same partition.

If the producer supplies no key (key = null):
  Kafka distributes round-robin (or sticky-batch) across partitions.
  -> Even spread, but no ordering guarantee tied to any value.
```

Keying by something meaningful — `customer_id`, `order_id`, `device_id`
— buys you a real guarantee: every message for that key arrives at
its consumer **in the order it was produced**, because they all land
on the same partition, and a partition is only ever read by one
consumer within a consumer group (Lesson 8) at a time. Skip the key,
and you get even load, but no per-entity ordering at all.

## Too few, too many

Partition count isn't a "set it once" afterthought — it directly
bounds parallelism in both directions:

```
Too FEW partitions:                 Too MANY partitions:
- Max parallel consumers            - More open file handles per broker
  = number of partitions              (partitions are just files on disk)
- Extra consumers in the group      - Slower leader election / rebalances
  just sit idle                       (Lesson 8) — more metadata to move
- Throughput ceiling, even          - More replication traffic between
  with more hardware                  brokers for the same total data
```

A topic with 4 partitions can never use more than 4 consumers doing
real work in one consumer group, no matter how much hardware you
throw at it — the 5th consumer just idles. But doubling partition
count "to be safe" isn't free either: every partition is real
per-broker overhead, and a cluster with tens of thousands of
partitions measurably slows down leader elections and rebalances.

## When a key choice backfires: the hot partition

The hashing formula above only spreads load evenly if the key values
themselves are reasonably even. Pick the wrong key, and you can
build in a bottleneck on day one:

```
BAD:  partition key = "country"
      -> 90% of traffic is from one country
      -> that one partition (and the one broker holding its
         leader) takes 90% of the load; the other partitions sit idle

BETTER: partition key = "customer_id" or "device_id"
      -> naturally high-cardinality, spreads evenly across partitions
```

A hot partition doesn't show up as an error — it shows up as one
consumer instance in a group falling behind while its siblings sit
comfortably idle, which is a much harder problem to diagnose than an
outright failure.

## Key terms

| Term | Meaning |
|---|---|
| Partition key | The value a producer hashes to pick a message's partition — same key, same partition, always |
| Round-robin | What happens with no key — even spread, no ordering guarantee |
| Hot partition | One partition (and its consumer) taking disproportionate load from a low-cardinality key |

## Check yourself

You're ready for Lesson 13 when you can explain: why does keying by
`customer_id` guarantee per-customer ordering, while keying by
`country` risks a hot partition — and what do those two keys have
in common that determines the outcome?
