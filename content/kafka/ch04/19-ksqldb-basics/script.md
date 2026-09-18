# Script — ksqlDB Basics

## Segment 1 (title)

ksqlDB is a SQL layer over Kafka topics, compiling statements into the same engine Kafka Streams builds by hand — a different interface onto the same underlying engine, not a competing product.

## Segment 2 (code: the CSAS statement)

The core statement is CREATE STREAM ... AS SELECT, a CSAS. It reads a topic, filters and transforms it, and continuously writes the result to a new stream — EMIT CHANGES marks it as a running query, not a one-time snapshot.

## Segment 3 (code: tables and aggregation)

For aggregation, ksqlDB has a table concept — a continuously updated, keyed view, the SQL-layer equivalent of Kafka Streams' KTable, grouping and counting as events keep arriving.

## Segment 4 (steps: familiar from KQL, but not KQL)

This should feel familiar from KQL over Eventhouse — the where and summarize instinct transfers directly. But ksqlDB is Kafka's own dialect, with its own syntax, running against Kafka topics specifically, not KQL.

## Segment 5 (outro)

SQL over the same engine as Kafka Streams — reach for it when filters, projections, and aggregations are enough. Next up: comparing Kafka's whole toolset to Fabric's Eventstreams, concept by concept.
