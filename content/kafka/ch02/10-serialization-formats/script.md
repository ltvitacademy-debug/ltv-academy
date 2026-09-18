# Script — Serialization Formats: Avro & JSON

## Segment 1 (title)

Kafka stores bytes, nothing more. It never parses, validates, or knows the shape of a message — producer and consumer have to independently agree on a serialization format, with nothing forcing them to stay in sync.

## Segment 2 (code: JSON, no enforcement)

JSON is the easy first choice — human-readable, no extra tooling. But nothing enforces a shape. A producer can rename "amount" to "amt" next month, Kafka accepts it either way, and the consumer's code breaks silently, usually in production.

## Segment 3 (code: Avro, schema-first)

Avro flips the order — a schema defining field names and types comes first, and every message is validated against it. It's also more compact than JSON. But the real payoff is what it makes possible: a central place to store that schema and check every message against it before it's written.

## Segment 4 (screenshot: schema rejected before it ships)

Here's Confluent Cloud rejecting an Avro schema change that would have broken existing consumers, before the producer is ever allowed to register it. That's the entire value proposition of schema-first serialization in one screenshot — the JSON mistake from a moment ago simply can't reach the topic.

## Segment 5 (outro)

JSON is easy but enforces nothing; Avro enforces a shape up front, which only matters once something is actually checking it. Next up: Chapter 3, starting with what happens to that message once it's written — replication and fault tolerance.
