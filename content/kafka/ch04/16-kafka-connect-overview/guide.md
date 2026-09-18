# Lesson 16 — Kafka Connect Overview

**Chapter 4 · Kafka Connect & Stream Processing · Lesson 16 of 30**

## What you'll learn

- The problem Kafka Connect exists to solve: integration without custom code
- Source connectors (pulling data in) vs. sink connectors (pushing data out)
- The shape of a Connect worker's job — connector class, tasks, topics
- What browsing a real connector catalog actually looks like

## The problem: everyone keeps writing the same producer

Producers and Consumers (Lesson 3) covered writing your own
client code — and that's exactly right when your logic is genuinely
custom. But most integrations aren't custom at all: "get rows out of
Postgres and into a topic," "get messages out of a topic and into
Snowflake" are problems thousands of teams solve identically. Kafka
Connect exists so none of them have to write that producer or
consumer by hand.

```
Without Kafka Connect:               With Kafka Connect:
  write a custom producer              configure a connector
  handle reconnects, retries,          (Connect handles reconnects,
  offsets, error handling               retries, offsets, error handling)
  yourself, per integration            declaratively, via config
```

## Source connectors pull in; sink connectors push out

Every Connect connector is one of exactly two directions:

```
SOURCE connector:  external system  ---->  Kafka topic
                   (e.g. Postgres, MongoDB, a SaaS API)

SINK connector:    Kafka topic  ---->  external system
                   (e.g. Snowflake, S3, Elasticsearch)
```

A **source** connector's job is to watch an external system and
turn its changes into Kafka messages. A **sink** connector's job is
the mirror image — read from a topic and write into an external
system. Lesson 17 walks through a real connector pair on each side.

## What a connector's config actually looks like

Connect runs as its own cluster of **workers**, and each connector
you configure is just a JSON (or properties-file) description of
what to run:

```
{
  "name": "postgres-orders-source",
  "config": {
    "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
    "tasks.max": "1",
    "database.hostname": "orders-db.internal",
    "topic.prefix": "orders"
  }
}
```

`connector.class` tells the worker which connector implementation to
load; `tasks.max` controls how much of that connector's work runs in
parallel. Connect handles distributing tasks across workers,
retrying failed tasks, and tracking source offsets — all of it
without a single line of producer or consumer code from you.

## Finding a connector before you configure one

Before writing a config like the one above, you'd typically start by
browsing what already exists — hundreds of pre-built connectors for
common systems, ready to configure rather than write from scratch:

![Confluent Cloud's connector catalog, showing search results for available connectors.](/courses/kafka/ch04/16-kafka-connect-overview/cloud-search-datagen.png)

That search is the entire point of Connect: instead of asking "how
do I write a producer for this system," the question becomes "does
a connector for this already exist" — and for most common systems,
it does.

## Key terms

| Term | Meaning |
|---|---|
| Kafka Connect | A framework for moving data in and out of Kafka via configured connectors, not custom code |
| Source connector | Pulls data from an external system into a Kafka topic |
| Sink connector | Pushes data from a Kafka topic into an external system |
| Worker | A Connect process that runs one or more connectors' tasks |

## Check yourself

You're ready for Lesson 17 when you can explain: why is "get data
out of Postgres and into Kafka" a good candidate for a Connect
source connector, rather than a custom-written producer?
