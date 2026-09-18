# Lesson 29 — Capstone: A Real-Time Event Pipeline on Kafka

**Chapter 7 · Capstone · Lesson 29 of 30**

## What you'll learn

- How to build one real event pipeline that uses this whole course's
  decisions together, not in isolation
- How to size a topic and a dead-letter topic for what they're each
  actually for
- Why this capstone reuses Lesson 25's producer and Lesson 27's
  error-handling choices instead of inventing new ones
- How this exact pipeline shape maps onto a real production system —
  Career & Capstone's streaming fraud detector

## The shape of this capstone

A build-along capstone isn't new material — it's proof the earlier
material actually composes. This one builds a `clickstream` pipeline:
real click events in, a sized topic in the middle, a consumer group with
a dead-letter path on the way out.

```
kafka-topics.sh --create \
  --topic clickstream \
  --partitions 8 \
  --replication-factor 3 \
  --config retention.ms=259200000

kafka-topics.sh --create --topic clickstream-dlq \
  --partitions 1 --replication-factor 3
```

`clickstream` gets 8 partitions — Lesson 12's partitioning strategy,
sized for this topic's real expected throughput and its consumer group's
target parallelism — and 3 days of retention (Lesson 13), enough room to
replay a day's worth of traffic if a downstream bug needs reprocessing
without keeping every click forever. `clickstream-dlq` gets just 1
partition: failures routed there should be rare, and unlike the main
topic, there's no reason ordering among them needs to be preserved.

## The producer and consumer, reusing this course's own choices

```python
producer = Producer({
    "bootstrap.servers": BOOTSTRAP,
    "acks": "all",
    "enable.idempotence": True,
})
producer.produce("clickstream", key=str(session_id),
                  value=event_json, callback=on_delivery)
```

```python
consumer.subscribe(["clickstream"])
msg = consumer.poll(1.0)
try:
    process_event(msg.value())
except Exception:
    producer.produce("clickstream-dlq", value=msg.value())
finally:
    consumer.commit(msg)
```

The producer makes the exact same call Lesson 25's pipeline made:
`acks=all` plus `enable.idempotence`, because that's still the right
call for any producer where losing or duplicating an event is a real
problem. The consumer applies Lesson 27's dead-letter pattern directly —
a malformed event goes to `clickstream-dlq` instead of stalling the
partition, and the offset commits either way so the pipeline keeps
moving.

## What this pipeline is actually for

This exact shape — a producer, a topic sized for its own throughput and
replay needs, a consumer group, and a dead-letter topic for what it can't
handle — isn't specific to clickstream data. It's the same shape Career &
Capstone's Project 3, the end-to-end streaming fraud detector (Lessons
75-78), is built on: ingest real-time events, compute features, score
them, and alert — with the same need for a sized topic and somewhere for
a malformed transaction to go instead of blocking scoring for every
transaction behind it. Career & Capstone's Lesson 21, Case Study: A
Real-Time Fraud Detection System, covers that same kind of system's design
in more depth, for anyone who wants the fuller picture.

## Key terms

| Term | Meaning |
|---|---|
| Partition count | Sized for both the topic's real throughput and its consumer group's target parallelism |
| Dead-letter topic sizing | A DLQ can usually be small (even 1 partition) since failures there should be rare |
| Reused decisions | A capstone applies a course's own proven choices, rather than inventing new ones |

## Check yourself

You're ready for Lesson 30 when you can explain, without looking: why
does this capstone's dead-letter topic get only 1 partition while the
main `clickstream` topic gets 8 — what's actually different about the
traffic each one is expected to carry?
