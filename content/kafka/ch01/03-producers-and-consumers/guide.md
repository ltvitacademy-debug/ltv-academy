# Lesson 3 — Producers & Consumers

**Chapter 1 · Event Streaming Fundamentals · Lesson 3 of 30**

## What you'll learn

- The basic shape of a producer: what actually gets sent, and where it goes
- How a key decides which partition an event lands in
- The basic shape of a consumer: subscribing and polling, not being pushed to
- Why producers and consumers know nothing about each other directly

## What a producer actually sends

A **producer** is any piece of code that writes events into a topic.
What it sends is a key-value pair (the key is optional, but as
Lesson 2 set up, it matters a lot when it's present) plus the topic
name:

```python
# Honest shape of a Kafka producer call (Python, confluent-kafka client)
producer.produce(
    topic="orders",
    key="order-4471",       # optional, but decides the partition
    value='{"order_id": "4471", "total": 58.20}',
)
producer.flush()
```

That's the whole mental model at the surface: pick a topic, optionally
pick a key, send a value. Everything else — which partition it
actually lands in, how durably it's written, how it's batched — is
configuration the producer controls (Lesson 6 covers this in depth).

## How the key decides the partition

If a key is given, Kafka hashes it and uses that hash to pick a
partition — deterministically, so the same key always lands in the
same partition. That's how you get ordering for a specific entity
(every event for `order-4471` lands in the same partition, so they're
strictly ordered relative to each other) without needing every event
in the topic to be globally ordered. If no key is given, Kafka spreads
events across partitions instead (round-robin or a sticky variant,
depending on client version), since there's nothing to keep together.

```
producer.produce(topic="orders", key="order-4471", value=...)
                                        |
                                 hash("order-4471") % num_partitions
                                        |
                                        v
                              always the same partition
```

## What a consumer actually does

A **consumer** doesn't get pushed events — it **polls** for them. It
subscribes to one or more topics, then repeatedly asks the broker "do
you have anything new for me?" in a loop:

```python
# Honest shape of a Kafka consumer loop
consumer.subscribe(["orders"])
while True:
    records = consumer.poll(timeout=1.0)
    for record in records:
        handle(record.key(), record.value())
    consumer.commit()  # mark these as processed (Lesson 7 covers this choice)
```

Lesson 7 goes deeper on exactly what happens inside that loop — where
`auto.offset.reset` matters, and the real difference between letting
the client auto-commit offsets versus committing manually after
`handle()` actually succeeds.

## Producers and consumers don't know about each other

This is the property that makes Kafka fundamentally different from a
request-response system: a producer writes to a topic and has no idea
who, if anyone, is reading it. A consumer reads from a topic and has
no idea who wrote what it's reading, or when. The topic — the durable
log from Lesson 1 — is the only thing connecting them. That
decoupling is exactly what lets you add a second, third, or tenth
independent consumer of the same topic later, with zero changes to
the producer.

## Key terms

| Term | Meaning |
|---|---|
| Producer | Code that writes key-value events to a topic |
| Partitioning key | The optional key whose hash determines which partition an event lands in |
| Consumer | Code that subscribes to a topic and polls it in a loop for new events |
| Decoupling | Producers and consumers interact only through the topic, never directly |

## Check yourself

You're ready for Lesson 4 when you can explain, without looking: if
two events both use the key `"order-4471"`, why are you guaranteed
they land in the same partition — and why does a consumer never get
pushed an event, only poll for one?
