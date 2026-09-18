# Lesson 25 — A Real Producer-to-Kafka-to-Consumer Pipeline

**Chapter 6 · Practical Patterns · Lesson 25 of 30**

## What you'll learn

- How Lessons 6-9's separate ideas — producers, consumers, consumer groups,
  delivery semantics — actually compose into one working pipeline
- Why this producer sets `acks=all` and `enable.idempotence`, specifically
- Why this topic gets 6 partitions and 7 days of retention, specifically
- Why this consumer group commits its offset manually, and what that buys

## The producer, for real

```python
producer = Producer({
    "bootstrap.servers": "b1:9092,b2:9092,b3:9092",
    "acks": "all",
    "enable.idempotence": True,
})
producer.produce("orders", key=str(cust_id),
                  value=order_json, callback=on_delivery)
producer.flush()
```

`acks=all` means the broker doesn't confirm the write until every in-sync
replica has it — Lesson 11's replication guarantee, actually turned on.
`enable.idempotence` closes the one gap `acks=all` leaves open: if the
producer's own retry logic resends a message the broker already wrote
(because the acknowledgment itself got lost, not the write), the broker
recognizes the duplicate and drops it instead of writing it twice.

## The topic, sized on purpose

```
kafka-topics.sh --create \
  --topic orders \
  --partitions 6 \
  --replication-factor 3 \
  --config retention.ms=604800000
```

Two real decisions, not defaults: 6 partitions, because Lesson 8's consumer
group can only ever have as many *active* members as there are partitions —
sizing for 6 leaves room to scale the group to 6 before any consumer sits
idle. And 7 days of retention (Lesson 13), because a replay window is only
useful if it's actually long enough to catch a downstream bug before the
data it would need to reprocess has already aged out.

## The consumer group, for real

```python
consumer = Consumer({
    "bootstrap.servers": "b1:9092,b2:9092,b3:9092",
    "group.id": "orders-processor",
    "enable.auto.commit": False,
})
consumer.subscribe(["orders"])
msg = consumer.poll(1.0)
process_order(msg.value())
consumer.commit(msg)
```

`enable.auto.commit=False` is the deliberate choice this lesson is built
around. Auto-commit advances the offset on a timer, whether or not the
message was actually processed yet — a crash between the commit and the
processing silently loses that event. Committing manually, right after
`process_order()` succeeds, means the worst case on a crash is
re-processing an event that already went through once (Lesson 9's
at-least-once), never silently dropping one.

## What this actually proves

None of this is new material — Lessons 6 through 9 already covered
producers, consumers, consumer groups, and delivery semantics one at a
time. What's new here is seeing them chosen together, on purpose, for one
real pipeline: an idempotent producer writing into a topic sized for its
consumer group, a group that commits its own progress only once the work
is actually done.

## Key terms

| Term | Meaning |
|---|---|
| `acks=all` | The broker confirms a write only once every in-sync replica has it |
| `enable.idempotence` | The broker drops a producer's duplicate resend instead of writing it twice |
| Manual offset commit | The consumer advances its own position only after processing succeeds |

## Check yourself

You're ready for Lesson 26 when you can explain, without looking: why does
committing the offset manually, after processing, protect against lost
events in a way that auto-commit on a timer doesn't?
