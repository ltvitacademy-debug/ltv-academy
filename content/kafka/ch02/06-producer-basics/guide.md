# Lesson 6 — Producer Basics

**Chapter 2 · Producing & Consuming · Lesson 6 of 30**

## What you'll learn

- What `acks` actually controls, and the real durability trade-off behind 0, 1, and all
- The two partitioning strategies a producer chooses between: key-based and round-robin
- What batching and `linger.ms` actually buy you, and what they cost
- How these settings combine into one honest, realistic producer configuration

## `acks`: how much durability are you actually asking for

Lesson 3 showed the basic shape of `producer.produce(...)`. What
wasn't shown is the setting that decides how safe that write actually
is: `acks`.

```
acks=0     Producer doesn't wait for any acknowledgment at all.
           Fastest. Can silently lose events if the broker fails
           right after receiving them.

acks=1     Producer waits for the partition's leader broker to
           acknowledge the write. Lost only if the leader fails
           before replicating to a follower.

acks=all   Producer waits for the leader AND enough in-sync
           replicas to acknowledge. Slowest, but a write isn't
           acknowledged until it's durable across brokers.
```

This is a real trade-off, not a "just always use `all`" answer:
`acks=0` fits high-volume telemetry where losing an occasional metric
doesn't matter and speed does; `acks=all` fits anything where losing
an event has a real cost (an order, a payment, an inventory change).

## Partitioning strategy: key-based vs. round-robin

Lesson 3 introduced this at the concept level; here's the actual
choice a producer configuration makes:

- **Key-based**: give every event with the same logical entity (an
  `order_id`, a `user_id`) the same key, and Kafka's hash-based
  routing (Lesson 2 and 3) keeps them in the same partition, in
  order, automatically.
- **Round-robin / sticky** (no key given): spread events evenly
  across partitions when there's no entity to keep together and you
  just want load spread out.

Choosing key-based when you don't actually need per-entity ordering
just concentrates load on fewer partitions for no benefit. Choosing
no key when you do need ordering silently breaks it — the two
decisions aren't interchangeable.

## Batching and `linger.ms`: trading latency for throughput

A producer doesn't have to send every event the instant `produce()`
is called. `linger.ms` tells it to wait a short window (say, 5ms) to
see if more events show up for the same partition, so it can send
them as one batch instead of many tiny requests:

```
linger.ms=0     Send immediately. Lowest latency per event,
                but more requests, lower overall throughput.

linger.ms=5     Wait up to 5ms to batch events together.
                Slightly higher latency per event, much higher
                overall throughput under real load.
```

Combined with `batch.size` (the max bytes to accumulate before
sending regardless of `linger.ms`), this is the actual lever most
production Kafka producers tune for throughput — and it's a genuine
latency/throughput trade-off, not a free win.

## Putting it together: an honest producer config

```python
producer_config = {
    "bootstrap.servers": "broker1:9092,broker2:9092",
    "acks": "all",          # durability: wait for replication
    "linger.ms": 5,         # batch briefly for throughput
    "batch.size": 32768,    # 32KB max batch before forced send
}
# key="order-4471" on every produce() call for this entity
# keeps its events ordered in one partition (Lesson 2, Lesson 3)
```

None of these settings are exotic — they're the same three trade-offs
(durability, partitioning, latency-vs-throughput) every real producer
configuration makes, tuned differently depending on what's actually
being produced.

## Key terms

| Term | Meaning |
|---|---|
| `acks` | How many brokers must acknowledge a write before the producer considers it done (0, 1, or all) |
| Key-based partitioning | Routing same-key events to the same partition for per-entity ordering |
| `linger.ms` | How long a producer waits to batch events before sending, trading latency for throughput |
| `batch.size` | The max batch size (bytes) before a producer sends regardless of `linger.ms` |

## Check yourself

You're ready for Lesson 7 when you can explain, without looking: why
is `acks=all` slower than `acks=0`, and what real-world event would
make that slowdown worth it?
