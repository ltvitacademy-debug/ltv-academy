# Lesson 9 — Delivery Semantics: At-Most/At-Least/Exactly-Once

**Chapter 2 · Producing & Consuming · Lesson 9 of 30**

## What you'll learn

- At-most-once: fire and forget, and the real way it can lose events
- At-least-once: retry until acknowledged, and the real way it duplicates events
- Exactly-once: what it actually requires under the hood, and its real cost
- Why at-least-once is the common default, not exactly-once

## At-most-once: fire and forget

If a producer sends an event and never retries on failure — or a
consumer commits its offset (Lesson 7) **before** processing
actually finishes — you get **at-most-once** delivery: an event is
processed zero or one times, never more, but a failure at the wrong
moment loses it entirely.

```
Producer sends, doesn't retry on failure:
  send() fails -> event never arrives -> gone, no retry

Consumer commits offset before processing:
  commit() -> [crash] -> handle() never ran -> silently lost
```

This is the cheapest option, and it's a legitimate choice when
occasionally losing an event costs less than the complexity of
guaranteeing it isn't lost — some metrics and logs genuinely fit
this.

## At-least-once: retry until acknowledged

Flip the ordering: a producer retries on failure until it gets an
`ack`, and a consumer commits its offset **after** `handle()`
actually succeeds (exactly the manual-commit pattern from Lesson 7).
Nothing gets silently lost anymore — but retries can create
**duplicates**: if the producer's ack was lost in transit (not the
write itself, just the acknowledgment), it retries a write that
already succeeded. Same story on the consumer side: if the consumer
crashes after `handle()` finishes but before `commit()` lands, the
next consumer to take that partition re-reads and re-processes the
same event.

```
Producer retries until acked:
  send() -> ack lost in transit -> retry -> SAME event written twice

Consumer commits after handle() succeeds:
  handle() succeeds -> [crash before commit] -> next consumer
  re-reads the same offset -> handle() runs AGAIN
```

At-least-once is the **common default** in real systems: it never
silently loses data, and duplicates are a problem you can design
around (an idempotent `handle()` — e.g., "set the order status to
shipped" rather than "increment the shipped counter" — makes
processing the same event twice harmless).

## Exactly-once: real, but with a real cost

**Exactly-once** delivery means every event is processed exactly one
time — no loss, no duplicates — but it requires two specific
mechanisms working together, not just careful configuration:

- **Idempotent producer** (`enable.idempotence=true`): the broker
  itself detects and discards a duplicate write from a retried
  producer, using a producer ID and sequence number per partition.
- **Transactional consumer-then-produce**: when a pipeline reads
  from one topic and writes to another (a common stream-processing
  shape), Kafka transactions make the read's offset commit and the
  downstream write atomic — both happen, or neither does.

```
Idempotent producer:
  retry with same producer ID + sequence number
  -> broker recognizes it, discards the duplicate

Transaction (read -> process -> write):
  offset commit + downstream write succeed together, or both roll back
```

This is real, working exactly-once — not a marketing claim — but it
has a real cost: idempotent producers and transactions add
coordination overhead, and exactly-once only covers the Kafka-to-
Kafka hop. The moment a pipeline writes to something outside Kafka
(a database, an API call), that external write needs its own
idempotency handling — Kafka's guarantee doesn't extend past its own
boundary.

## Where this connects

Career & Capstone Lesson 12, "Exactly-Once vs. At-Least-Once
Delivery," picks this exact trade-off back up from the pipeline-
design side — deciding which one an actual system needs, not just
how each one works mechanically. Chapter 4's streaming fraud-detector
capstone (that course's Lesson 75) is a concrete case where this
choice has real consequences: double-charging a duplicate transaction
event is a much worse failure than double-flagging one for review.

## Key terms

| Term | Meaning |
|---|---|
| At-most-once | Zero or one delivery; a failure at the wrong moment loses the event entirely |
| At-least-once | One or more deliveries; nothing is silently lost, but duplicates are possible |
| Exactly-once | Precisely one delivery; requires an idempotent producer and, for pipelines, transactions |
| Idempotent producer | A producer whose retried writes are deduplicated by the broker itself |

## Check yourself

You're ready for Lesson 10 when you can explain, without looking: why
is at-least-once delivery the common default in real systems rather
than exactly-once, and what does an idempotent producer actually have
to track to make exactly-once real rather than just a configuration
checkbox?
