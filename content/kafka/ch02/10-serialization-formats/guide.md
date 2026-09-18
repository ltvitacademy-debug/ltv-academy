# Lesson 10 — Serialization Formats: Avro & JSON

**Chapter 2 · Producing & Consuming · Lesson 10 of 30**

## What you'll learn

- Kafka stores bytes — it has no idea what's inside a message unless producer and consumer agree
- Why plain JSON is easy to start with but enforces nothing about shape
- Avro's schema-first approach, and why it pairs naturally with a Schema Registry
- What Confluent Cloud actually does when a producer tries to register a broken Avro schema

## Kafka doesn't know what a message is

Every value written to a Kafka topic is just a byte array. Kafka
never parses it, validates it, or knows whether it's JSON, Avro,
plain text, or a serialized image. That's entirely between the
producer that wrote it and the consumer that reads it — which means
producer and consumer have to independently agree on a format, with
nothing forcing them to stay in sync.

## JSON: easy to start, nothing stops it from drifting

JSON is the obvious first choice — human-readable, no extra tooling,
every language can produce and parse it. But nothing enforces a
shape:

```
Producer writes:
{"user_id": 42, "amount": 19.99, "currency": "USD"}

A different service starts producing to the same topic next month:
{"userId": 42, "amt": 19.99, "currency": "USD"}

Kafka accepts both -- it's just bytes to the broker.
The consumer's code, expecting "amount", breaks silently.
```

Nothing in Kafka catches that field rename. The topic keeps
accepting messages; only the consumer, downstream, discovers the
problem — usually in production.

## Avro: the schema comes first

Avro flips the order: you define a schema — field names and types —
before anyone writes a message, and every message is validated
against it:

```
{
  "type": "record",
  "name": "Payment",
  "fields": [
    {"name": "user_id", "type": "long"},
    {"name": "amount", "type": "double"},
    {"name": "currency", "type": "string"}
  ]
}
```

Avro also encodes more compactly than JSON (binary, not
text-with-quotes-and-braces), which matters at Kafka's typical
volumes. But the real reason it's the standard choice for serious
Kafka deployments is what it makes possible next: a place to store
that schema centrally, and check every message against it before
it's ever written.

## Catching the mistake before it ships

That's exactly what a Schema Registry (Lesson 15) does — and it's
not theoretical. Here's Confluent Cloud rejecting an Avro schema
change that would have broken existing consumers, before the
producer is ever allowed to register it:

![Confluent Cloud's Schema Registry showing a warning banner for an invalid Avro schema, caught before it can be registered.](/courses/kafka/ch02/10-serialization-formats/cloud-schema-invalid-avro-warning-banner.png)

That warning is the entire value proposition of schema-first
serialization in one screenshot: the mistake from the JSON example
above simply can't reach the topic in the first place.

## Key terms

| Term | Meaning |
|---|---|
| Serialization format | The byte-level shape producers and consumers agree to use — Kafka itself is format-agnostic |
| Schema-first | Avro's approach — a schema is defined and validated against before a message can be written |
| Schema drift | What happens to unenforced JSON over time as different producers quietly change field shapes |

## Check yourself

You're ready for Chapter 3 when you can explain: why does Kafka
itself have no way to reject the broken JSON message in this
lesson's first example, and what has to sit in front of the
producer to make that kind of mistake catchable?
