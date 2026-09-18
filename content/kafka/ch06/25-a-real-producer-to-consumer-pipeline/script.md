# Script — A Real Producer-to-Kafka-to-Consumer Pipeline

## Segment 1 (title)

This lesson ties Lessons 6 through 9 together into one real, running pipeline: a producer sending real events, a topic sized on purpose, and a consumer group reading them with an honest delivery guarantee.

## Segment 2 (code: the producer, for real)

The producer sets acks=all and enable.idempotence. Together, no order event is lost on the way to the broker, and a network retry never writes the same event twice.

## Segment 3 (code: the topic, sized on purpose)

The orders topic gets 6 partitions and 7 days of retention. 6 partitions means the consumer group can scale to 6 members; 7 days means there's room to replay if something downstream needs to reprocess.

## Segment 4 (code: the consumer group, for real)

The consumer group turns off auto-commit and commits its offset manually, right after processing. That's the deliberate choice: an event only counts as handled once it's actually been handled.

## Segment 5 (steps: what Lessons 6-9 actually built)

Put together, this is Lessons 6 and 7's basic API, Lesson 8's consumer group scaling to as many members as there are partitions, and Lesson 9's delivery semantics landing on effectively at-least-once.

## Segment 6 (outro)

A real producer, a real topic, a real consumer group — not three separate ideas anymore. Next up: where this same topic actually lands, in Snowflake and Databricks.
