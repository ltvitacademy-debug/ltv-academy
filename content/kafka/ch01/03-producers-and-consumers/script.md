# Script — Producers & Consumers

## Segment 1 (title)

A producer is any code that writes events into a topic. What it sends is a key-value pair plus a topic name — that's the whole mental model at the surface.

## Segment 2 (code: producer send)

Pick a topic, optionally pick a key, send a value. Everything else — which partition it lands in, how durably it's written, how it's batched — is configuration the producer controls.

## Segment 3 (code: key decides the partition)

If a key is given, Kafka hashes it to pick a partition, deterministically — the same key always lands in the same partition. That's how you get ordering for one entity without needing the whole topic globally ordered.

## Segment 4 (code: consumer poll loop)

A consumer doesn't get pushed events — it polls for them, subscribing to a topic and repeatedly asking the broker for anything new in a loop, then committing what it's processed.

## Segment 5 (outro)

Producers and consumers never talk to each other directly — only through the topic. That decoupling is what lets you add another independent consumer later with zero changes to the producer. Next up: brokers and clusters.
