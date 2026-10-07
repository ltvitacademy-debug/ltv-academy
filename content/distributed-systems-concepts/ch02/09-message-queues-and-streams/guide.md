# Message Queues and Streams

The CAP theorem showed that distributed systems must sometimes favor availability over an immediate response from every node. One of the most common tools for building that kind of resilience into a real system is putting a message broker between components instead of calling each other directly. This lesson covers the main patterns — queues, pub/sub, and log-based streams — and the delivery guarantees each one can realistically offer.

## What you'll learn

- Point-to-point queues vs. publish/subscribe vs. log-based streaming
- Why putting a broker between producer and consumer decouples them
- The three delivery guarantees: at-most-once, at-least-once, exactly-once
- Why "exactly-once" in practice usually means "effectively-once"

## Three communication patterns

- **Point-to-point message queue** — a producer places a message on a queue; exactly one consumer takes and processes it. Good for distributing units of work across a pool of workers.
- **Publish/subscribe (pub/sub)** — a producer publishes a message to a topic; every subscriber to that topic receives its own copy. Good for broadcasting an event to multiple independent interested parties.
- **Log-based streaming** (the Kafka-style model) — messages are appended to a durable, ordered log per topic/partition, and consumers each track their own read position (offset) in that log. Multiple consumer groups can replay or independently progress through the same log, which point-to-point queues and classic pub/sub generally don't support.

## Why a broker decouples producer and consumer

Without a broker, a producer calling a consumer directly needs that consumer to be up, reachable, and fast enough right now — a synchronous dependency, with all the fragility Lesson 6 described. With a broker in between, the producer only needs the broker to be up. It can publish a message and move on; the consumer can be slow, temporarily down, or scaled up and down independently, and the message waits safely in the broker until a consumer is ready. This decoupling is also what lets you scale producers and consumers independently and absorb short traffic spikes without dropping work.

## Delivery guarantees

- **At-most-once** — a message is delivered zero or one times; if something fails after sending but before confirmation, the message may simply be lost. Fast, but risky for anything that matters.
- **At-least-once** — the system retries until it gets confirmation of delivery, which means a message might be delivered more than once (if the confirmation itself was lost, for example). This is the most common guarantee in real systems.
- **Exactly-once** — each message is delivered and processed exactly one time, with no loss and no duplication. True exactly-once delivery across an unreliable network is provably very hard; most systems that advertise it actually implement **at-least-once delivery plus deduplication** on the receiving side (an idempotency key, covered fully in Lesson 11, is exactly the mechanism that makes this work). The practical result is often better described as "effectively-once."

## Choosing a pattern

A point-to-point queue fits work that should be done once by one worker (processing an order). Pub/sub fits an event that multiple independent systems need to react to (an "order placed" event triggering billing, shipping, and analytics separately). A log-based stream fits cases where you need ordered history, replay, or multiple independent consumer groups reading the same event sequence at their own pace.

## Key terms

- **Message broker** — the intermediary system that holds and routes messages between producers and consumers
- **Point-to-point queue** — one message, consumed by exactly one consumer
- **Publish/subscribe** — one message, delivered independently to every subscriber of a topic
- **Offset** — a consumer's current read position in a log-based stream
- **At-least-once delivery** — a message may be delivered more than once, but is never silently lost

## Recap

Message queues, pub/sub, and log-based streams all decouple producers from consumers, trading direct synchronous calls for a broker in between — and the delivery guarantee you pick (usually at-least-once, paired with deduplication) determines how safely you can rely on it. Next, in Lesson 10, you'll see how systems detect and respond when a node — producer, consumer, or broker — actually fails.
