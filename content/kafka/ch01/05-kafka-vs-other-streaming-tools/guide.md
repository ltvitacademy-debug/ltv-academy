# Lesson 5 — Kafka vs. Other Streaming Tools

**Chapter 1 · Event Streaming Fundamentals · Lesson 5 of 30**

## What you'll learn

- Why Kafka is log-first, and what that means compared to a queue-first tool like RabbitMQ
- How Fabric's Eventstreams relates to Kafka: managed, Azure-native, and built for a different trade-off
- Where AWS Kinesis fits: Kafka's closest conceptual cousin, but not compatible with it
- How to actually decide, honestly, which tool fits a given situation

## Kafka vs. RabbitMQ: log-first vs. queue-first

RabbitMQ is a message broker built around **queues**: a producer
publishes a message, it's routed to a queue, a worker consumes it,
and it's gone. That's the traditional queue model Lesson 1 contrasted
Kafka against. RabbitMQ is genuinely excellent at what it's built
for — complex routing (topic exchanges, fanout, priority queues),
per-message acknowledgment, and task distribution where "exactly one
worker handles this job" is the actual goal.

Kafka flips the default: the log is retained, and multiple
independent consumers can each read the whole history at their own
pace. That's a strictly better fit when you need replay (Lesson 1)
or multiple independent teams reading the same event stream for
different purposes. It's a worse fit for pure task-queue workloads,
where RabbitMQ's per-message ack/nack and dead-lettering are more
directly built for the job than Kafka's own retry patterns
(Chapter 6's Lesson 27 covers Kafka-specific error handling).

```
RabbitMQ (queue-first):        Kafka (log-first):
producer -> queue -> worker    producer -> log (retained)
  (exactly-once handoff            consumer A, B, C each read
   is the natural model)            independently, at their own pace
```

## Kafka vs. Fabric Eventstreams: self-managed vs. Azure-native

Fabric & Real-Time Analytics' Eventstreams (that course's Lesson 19)
already taught the shape of this problem inside the Fabric ecosystem:
point at a source, get a managed stream, route it into an Eventhouse
or a KQL database with almost no infrastructure to run yourself.
Eventstreams can actually ingest from a Kafka-compatible endpoint
directly — it isn't a separate universe from Kafka, it's a managed
layer that speaks Kafka's own protocol in places.

The real trade-off: Eventstreams gives up some configurability (you
don't tune partition counts, replication factor, or broker settings
directly) in exchange for near-zero operational burden inside
Microsoft's ecosystem. Kafka gives you the raw configurability — at
the cost of running (or paying someone to run) the cluster yourself.
Chapter 4's Lesson 20 makes this exact comparison in more depth, once
Kafka Connect and Kafka Streams are on the table too.

## Kafka vs. AWS Kinesis: the closest cousin, not a drop-in

Kinesis Data Streams is conceptually Kafka's nearest relative: a
retained, ordered log (Kinesis calls a partition a "shard" instead),
consumers that track their own position, and replay from history.
The concepts map closely enough that understanding Kafka's vocabulary
transfers directly to reading Kinesis documentation. What doesn't
transfer: the two are not wire-compatible. A Kafka client can't talk
to Kinesis without a compatibility shim, and Kinesis is AWS-only,
the same way Eventstreams is Azure-only inside Fabric.

## Choosing honestly

None of this is "Kafka is always right." A real decision usually
comes down to:

- **Need pure task distribution, not replay?** RabbitMQ (or a real
  queue product) is a more natural fit than forcing Kafka to act
  like one.
- **Already all-in on Fabric, and the audience is internal BI /
  KQL dashboards?** Eventstreams removes almost all the operational
  burden this chapter has been describing.
- **Already all-in on AWS, no cross-cloud requirement?** Kinesis
  gets you the same log-first model with less to manage yourself.
- **Need a vendor-neutral, highly configurable, replayable log, and
  you're willing to own (or pay for) the operations?** That's
  Kafka's actual niche — which is why the rest of this course is
  about it specifically.

## Key terms

| Term | Meaning |
|---|---|
| Queue-first | RabbitMQ's model: a message is routed and consumed once, then gone |
| Log-first | Kafka's model: events are retained and replayable by any number of consumers |
| Managed alternative | A vendor-run service (Eventstreams, Kinesis) that trades configurability for near-zero ops |

## Check yourself

Chapter 1 is complete when you can explain, without looking: for a
workload that genuinely needs "exactly one worker processes this
job, then it's gone," why is RabbitMQ's queue-first model a more
natural fit than forcing Kafka's log-first model to behave like one?
