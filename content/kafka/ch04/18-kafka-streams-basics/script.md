# Script — Kafka Streams Basics

## Segment 1 (title)

Kafka Streams is a Java library, not a separate cluster or service. It's a regular application that reads from and writes to Kafka topics, using consumer and producer clients under the hood.

## Segment 2 (code: the topology pattern)

A Kafka Streams app is built as a topology: pull events from a source topic, transform them, write the result to an output topic — a continuous pipeline reacting to every new event, not a batch job.

## Segment 3 (code: stateless vs. stateful)

Stateless operations like filter process each event alone. Stateful operations, like a running count per customer, need memory — Kafka Streams keeps that in a local state store, backed by a changelog topic so it survives a failure.

## Segment 4 (steps: where this fits)

Kafka Connect moves data in and out without code. Kafka Streams is real application code against a topic, with Kafka handling scaling and fault tolerance. ksqlDB sits in between — the same engine, SQL syntax instead of Java.

## Segment 5 (outro)

A library, not a cluster — topologies process what's already in a topic, with stateful operations backed by a recoverable local store. Next up: ksqlDB, the SQL layer over the same idea.
