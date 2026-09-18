# Lesson 18 — Kafka Streams Basics

**Chapter 4 · Kafka Connect & Stream Processing · Lesson 18 of 30**

## What you'll learn

- What Kafka Streams actually is: a Java library, not a separate cluster or service
- The topology pattern: read a topic, transform, write to another topic
- Stateless vs. stateful operations, at a conceptual level
- Where this fits next to what Fabric already taught you about processing streams

## A library, not a service

Kafka Connect (Lessons 16–17) moves data in and out of Kafka topics.
**Kafka Streams** does the other job: it processes data that's
already in a topic. The important distinction is architectural —
Kafka Streams is a **Java library** you add to a regular application.
There's no separate cluster to stand up, no extra service to run
alongside your brokers. A Kafka Streams app is just a JVM process
that happens to read from and write to Kafka topics, using consumer
and producer clients (Lessons 6–7) under the hood.

That's a real contrast with a dedicated stream-processing engine like
Flink or Spark Structured Streaming, which run as their own clusters
with their own schedulers. Kafka Streams has no equivalent — scaling
out means running more instances of your own application, and Kafka's
consumer group protocol (Lesson 8) automatically divides the input
topic's partitions across them.

## The topology pattern

A Kafka Streams application is built as a **topology**: a chain of
operations wired together, starting from one or more source topics
and ending at one or more output topics.

```java
StreamsBuilder builder = new StreamsBuilder();

KStream<String, Order> orders = builder.stream("orders");

orders
    .filter((key, order) -> order.getAmount() > 100)
    .mapValues(order -> order.withStatus("high-value"))
    .to("high-value-orders");

KafkaStreams streams = new KafkaStreams(builder.build(), props);
streams.start();
```

Read that as: pull events from the `orders` topic, keep only the ones
over $100, tag each one, and write the result to a new
`high-value-orders` topic. Nothing here is a batch job — it's a
continuous pipeline that reacts to every new event on `orders` as it
arrives, the same push-forward model Fabric's Eventstreams (Fabric &
Real-Time Analytics Lesson 19) already trained you to expect.

## Stateless vs. stateful operations

`filter` and `mapValues` above are **stateless** — each event is
processed on its own, with no memory of any event before it. Most
Kafka Streams operations you reach for first are stateless.

**Stateful** operations need to remember something across events —
a running count, a running total, a join against another stream.
Kafka Streams keeps that state in a local **state store** (backed by
RocksDB on disk, and replicated back to Kafka as a **changelog
topic** so it can be rebuilt if an instance fails):

```java
KTable<String, Long> countsByCustomer = orders
    .groupBy((key, order) -> order.getCustomerId())
    .count();
```

That single line is doing real work: grouping the stream by customer
ID and maintaining a continuously updated count per customer, without
you managing a database yourself. This is conceptually the same
territory as windowing and watermarks (Fabric & Real-Time Analytics
Lessons 29 and 33) — Kafka Streams has its own windowed aggregation
operators for exactly the "count per five-minute window" problem
those lessons covered, just expressed in Java instead of a no-code
canvas.

## Where this fits next to what you already know

If Kafka Connect is "get data in and out without writing code,"
Kafka Streams is "write actual application code against a topic,
with Kafka doing the scaling and fault tolerance." ksqlDB (Lesson 19)
sits in between — SQL-like syntax over the same underlying engine,
for teams who want the topology pattern without writing Java.

## Key terms

| Term | Meaning |
|---|---|
| Topology | The chain of operations a Kafka Streams app wires from source topic(s) to output topic(s) |
| Stateless operation | Processes each event independently, with no memory of prior events (`filter`, `mapValues`) |
| State store | Local storage (RocksDB) backing stateful operations, replicated via a changelog topic |

## Check yourself

You're ready for Lesson 19 when you can explain, without looking: why
doesn't a Kafka Streams application need its own separate cluster the
way Flink or Spark does, and what does a changelog topic protect
against?
