# Lesson 2 — Topics, Partitions & Offsets

**Chapter 1 · Event Streaming Fundamentals · Lesson 2 of 30**

## What you'll learn

- What a topic actually is: a named log, and nothing more mysterious than that
- Why a topic is split into partitions, and what that buys you
- What an offset is, and why it's local to a partition, not to the topic
- What a real topic table looks like, with partition counts, in a running cluster

## A topic is a named log

Lesson 1 established that Kafka's core structure is a durable, ordered
log. A **topic** is that log, given a name — `orders`, `page-views`,
`sensor-readings`. When a producer sends an event, it sends it to a
topic. When a consumer reads, it reads from a topic. That's the whole
concept at the naming layer. The interesting part is what's actually
underneath a topic.

## A partition is how the log is actually split

A topic isn't one physical log file — it's split into **partitions**,
and each partition is its own independently ordered, appended-to log.
Splitting a topic into partitions is what makes Kafka scale: different
partitions can live on different brokers (Lesson 4), be written to and
read from in parallel, and be consumed by different members of a
consumer group (Lesson 8) at the same time.

```
Topic: orders  (3 partitions)

Partition 0:  [e0][e1][e2][e3][e4] ...
Partition 1:  [e0][e1][e2] ...
Partition 2:  [e0][e1][e2][e3] ...
```

The trade-off: Kafka only guarantees ordering **within** a partition,
never across the whole topic. Two events in partition 0 are strictly
ordered relative to each other. An event in partition 0 and an event
in partition 1 have no ordering guarantee relative to each other at
all. This is why the partitioning key a producer chooses (Lesson 6)
matters — everything with the same key lands in the same partition,
which is how you get ordering for the things that actually need it
(e.g., all events for one `order_id`).

## An offset is a partition-local sequence number

Every event appended to a partition gets an **offset** — a simple,
increasing integer, starting at 0, unique within that partition. It
is not unique across the whole topic; partition 0's offset 500 and
partition 1's offset 500 are two unrelated events. A consumer's whole
job is to track "the next offset I haven't read yet" for each
partition it's assigned — that position is what makes replay
(Lesson 1) possible: rewind the tracked offset, and you re-read
history from that point forward.

## What this looks like in a real cluster

Every one of these ideas is visible in a real running deployment, not
just a diagram. Confluent Control Center's topic table shows exactly
this: each row is a topic, and the partition count is a real, visible
column — not an abstraction:

![Confluent Control Center's Topics page, showing a table of real topics with their partition counts in Normal mode.](/courses/kafka/ch01/02-topics-partitions-offsets/c3-topics-page.png)

That partition count per topic is a deployment decision someone made
(Lesson 12 covers partitioning strategy in depth) — it directly bounds
how much parallelism that topic can support.

## Where this fits next to what you already know

Fabric's Eventstreams (Fabric & Real-Time Analytics Lesson 19)
abstract a lot of this away for you — you point at a source and get a
stream. Kafka makes topic, partition, and offset first-class, visible
concepts you configure directly, which is exactly why understanding
them now pays off for the rest of this course.

## Key terms

| Term | Meaning |
|---|---|
| Topic | A named log — the thing producers write to and consumers read from |
| Partition | One independently ordered sub-log of a topic; the unit of parallelism |
| Offset | A partition-local, increasing integer identifying an event's position |

## Check yourself

You're ready for Lesson 3 when you can explain, without looking: why
does Kafka guarantee ordering within a partition but not across an
entire topic, and why does that make the producer's choice of
partitioning key matter?
