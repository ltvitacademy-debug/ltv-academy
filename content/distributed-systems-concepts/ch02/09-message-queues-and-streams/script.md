# Script — Message Queues and Streams

## Segment 1 (title)

The CAP theorem showed that systems sometimes have to favor availability over an instant response from every node. One of the most common tools for building that resilience in is putting a message broker between components instead of calling each other directly. This lesson covers queues, pub/sub, and streams, and what each can really guarantee.

## Segment 2 (steps)

A point-to-point queue has one producer place a message and exactly one consumer take it — good for distributing work across a pool of workers. Publish/subscribe sends a copy of each message to every subscriber of a topic — good for broadcasting an event to several independent systems. A log-based stream, the Kafka-style model, keeps a durable ordered log that multiple consumer groups can each read at their own pace, which plain queues and pub/sub generally can't do.

## Segment 3 (steps)

Without a broker, a producer calling a consumer directly needs that consumer up, reachable, and fast right now. Put a broker in between, and the producer only needs the broker to be up — it publishes and moves on, while the message waits safely until a consumer is ready. That's also what lets you scale producers and consumers independently and absorb traffic spikes without dropping work.

## Segment 4 (steps)

Brokers can only really promise one of three things. At-most-once is fast but a message can simply vanish if something fails before confirmation. At-least-once retries until it's confirmed, which means a message might arrive twice. Exactly-once — delivered once, no loss, no duplicates — is extremely hard to guarantee over an unreliable network.

## Segment 5 (code)

So what most systems that advertise exactly-once are really doing is at-least-once delivery plus deduplication: the consumer checks a message's ID against what it's already seen, and discards the duplicate. That dedup check is exactly what an idempotency key does, which you'll see in full in lesson eleven. The honest name for this is effectively-once.

## Segment 6 (outro)

Queues, pub/sub, and streams all decouple producers from consumers — the guarantee you pick, usually at-least-once plus dedup, determines how safely you can rely on it. Next, lesson ten: failure handling, what happens when a node in this picture actually goes down.
