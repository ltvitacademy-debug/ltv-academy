# Lesson 1 — What Is Kafka & Why Event Streaming?

**Chapter 1 · Event Streaming Fundamentals · Lesson 1 of 30**

## What you'll learn

- What Kafka actually is: a distributed, durable log — not a message queue
- Why Fabric's Eventstreams already taught you the real shape of this problem
- The one property that makes Kafka different from a queue: replay
- What a real Kafka deployment's topics actually look like, running

## A durable log, not a queue

Fabric & Real-Time Analytics's Eventstreams already introduced the
core idea: events flow in continuously, and something downstream
processes them as they arrive. Kafka is the tool most of that pattern
in the industry is actually built on. But Kafka isn't a message
queue in the traditional sense (think: a task queue where a worker
takes a job, and it's gone) — it's a **durable, ordered log**. Every
event written to it stays there for a configured retention period
(Lesson 13), readable by any number of independent consumers, as many
times as needed.

```
Traditional queue:            Kafka (a log):
producer -> queue -> worker   producer -> log (retained) -> consumer A (reads from offset 0)
  (message removed              consumer B (reads from offset 500, independently)
   once consumed)                consumer C (re-reads from offset 0 next week)
```

## Why replay is the whole point

That one property — a consumer can start reading from any point in
the log's history, not just "whatever arrives from now on" — is what
makes Kappa architecture (Career & Capstone Lesson 7) actually work
in practice. Reprocessing history isn't a separate batch job; it's
replaying the same log through the same consumer logic.

## What this actually looks like, running

A real Kafka deployment isn't an abstraction — it's a set of topics,
each one a named, partitioned log, visible and monitorable in a real
dashboard:

![Confluent Control Center's Topics Overview page, showing a real running Kafka cluster's topics with live throughput and partition counts — not a diagram, an actual dashboard.](/courses/kafka/ch01/01-what-is-kafka/c3-topics-overview-page.png)

Lesson 2 breaks down exactly what a topic, a partition, and an offset
each are — the three concepts that dashboard is actually showing.

## Where Kafka fits next to what you already know

Fabric's Eventstreams solve the same real-time ingestion problem
inside the Fabric ecosystem specifically. Kafka is the vendor-neutral
version of that same idea — and Chapter 4's Lesson 20 compares the
two directly, concept by concept, once you know Kafka's own vocabulary
well enough to make that comparison meaningful.

## Key terms

| Term | Meaning |
|---|---|
| Durable log | Kafka's core data structure — an ordered, retained sequence of events, not a disappearing queue |
| Replay | Reading from any earlier point in the log — the property that makes reprocessing possible |
| Topic | A named, partitioned log — what you're actually creating and reading from |

## Check yourself

You're ready for Lesson 2 when you can explain, without looking: why
does a traditional message queue make replay hard or impossible,
while Kafka's log design makes it the default?
