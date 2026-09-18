# Script — Delivery Semantics

## Segment 1 (title)

At-most-once is fire and forget: a producer that doesn't retry, or a consumer that commits before processing finishes. An event is processed zero or one times — never more, but a failure at the wrong moment loses it entirely.

## Segment 2 (code: at-least-once)

At-least-once flips the ordering: retry until acknowledged, commit only after processing succeeds. Nothing is silently lost anymore, but retries can create duplicates — the common default in real systems.

## Segment 3 (code: exactly-once mechanics)

Exactly-once requires two real mechanisms: an idempotent producer, where the broker detects and discards a retried duplicate using a producer ID and sequence number, and transactions that make a read-then-write pipeline atomic.

## Segment 4 (code: the real cost)

This is real, working exactly-once, not a marketing claim — but it adds coordination overhead, and it only covers the Kafka-to-Kafka hop. A write to something outside Kafka still needs its own idempotency handling.

## Segment 5 (outro)

At-most, at-least, and exactly-once — three real trade-offs, not one right answer. Next up: serialization formats, Avro and JSON, closing out Chapter 2.
