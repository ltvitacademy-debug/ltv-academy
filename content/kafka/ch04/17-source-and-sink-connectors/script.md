# Script — Source & Sink Connectors

## Segment 1 (title)

Lesson 16 introduced source and sink connectors abstractly. A concrete source example is change data capture — a connector that watches a database's own replication log and turns every insert, update, and delete into a Kafka message, in order, as it happens.

## Segment 2 (code: CDC source config)

A CDC source connector like Debezium reads the database's write-ahead log directly, not a polling query on a timer — so it catches every change in the exact order it happened, with no gap between polls and no missed deletes.

## Segment 3 (code: sink config)

On the other end, a sink connector takes messages off a topic and writes them into a destination — here, a Snowflake warehouse. Same config shape as the source side, connector.class and tasks.max, just pointed at a different kind of system.

## Segment 4 (screenshot: running connector)

Here's Confluent Cloud's Connectors page, showing a real running connector's status — this is where you'd actually monitor whether the CDC source is running and whether the sink is keeping up.

## Segment 5 (outro)

Chained together, a source and a sink connector move data continuously from a database into a warehouse without a single custom producer or consumer written for either hop. That closes out Chapter 4's start — Kafka Streams and ksqlDB pick up from here.
