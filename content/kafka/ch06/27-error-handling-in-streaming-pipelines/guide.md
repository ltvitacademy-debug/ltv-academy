# Lesson 27 — Error Handling in Streaming Pipelines

**Chapter 6 · Practical Patterns · Lesson 27 of 30**

## What you'll learn

- What a poison-pill message is, and why it's a fundamentally different
  problem than a normal failure
- Why a dead-letter topic keeps one bad message from blocking an entire
  partition
- Why a transient failure deserves a bounded retry instead of an
  immediate dead-letter
- Why idempotent processing is what makes any of this actually safe

## The dead-letter topic

```python
try:
    process_order(msg.value())
    consumer.commit(msg)
except Exception as e:
    producer.produce("orders-dlq", key=msg.key(),
                      value=msg.value(), headers={"error": str(e)})
    producer.flush()
    consumer.commit(msg)
```

A batch job that hits a bad row can fail the whole job and get fixed
before the next run. A streaming pipeline can't do that — Lesson 8's
consumer group is still supposed to be reading, right now, from every
other partition. If a message can never be processed successfully — a
malformed payload, a schema the consumer doesn't recognize — retrying it
forever just blocks every event behind it on that same partition, since
Kafka guarantees order *within* a partition (Lesson 2) and won't skip
ahead. Sending it to `orders-dlq` instead, and still committing the
original offset, is what actually keeps the partition moving.

## Retry before giving up

```python
for attempt in range(3):
    try:
        process_order(msg.value())
        break
    except TransientError:
        time.sleep(2 ** attempt)
else:
    send_to_dlq(msg)
consumer.commit(msg)
```

Not every failure is a poison pill, and treating every failure like one
throws away perfectly good messages. A downstream database connection
timing out for a second is a transient failure — the same message,
retried a moment later, usually succeeds. A short, bounded retry loop
with exponential backoff catches that case; only a message that still
fails after those attempts earns the dead-letter treatment above.

## Why this only works if processing is idempotent

Both patterns above have one thing in common: a message can end up
processed more than once — a retry that actually succeeded but whose
confirmation was lost, or a consumer that crashed after `process_order()`
but before `consumer.commit()`. Career & Capstone's Lesson 11, Designing
for Idempotency, covers exactly this: processing logic written so that
handling the same event twice produces the same result as handling it
once (an `UPSERT` on order ID, not a blind `INSERT`). Without that,
retries and dead-letter handling both just trade "lost events" for
"duplicated events" — neither is actually safe on its own.

## Key terms

| Term | Meaning |
|---|---|
| Poison-pill message | A message that fails processing no matter how many times it's retried |
| Dead-letter topic (DLQ) | A separate topic a failed message is routed to, instead of blocking the partition |
| Idempotent processing | Handling the same event twice produces the same result as handling it once |

## Check yourself

You're ready for Lesson 28 when you can explain, without looking: why
does retrying a poison-pill message forever actually make the problem
worse, instead of eventually fixing it, on a partition that guarantees
order?
