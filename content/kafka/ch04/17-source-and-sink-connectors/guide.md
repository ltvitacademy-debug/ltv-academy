# Lesson 17 — Source & Sink Connectors

**Chapter 4 · Kafka Connect & Stream Processing · Lesson 17 of 30**

## What you'll learn

- A concrete source connector example: CDC out of a database, into Kafka
- A concrete sink connector example: out of Kafka, into a data warehouse
- Why these two, chained together, form a full pipeline with no custom code
- What a running connector actually looks like once deployed

## The source side: change data capture, streamed

Lesson 16 introduced source connectors abstractly. A concrete,
common example is a **CDC (change data capture) source connector**
— one that watches a database's write-ahead log directly and turns
every insert, update, and delete into a Kafka message, in order, as
it happens:

```
{
  "name": "postgres-orders-cdc",
  "config": {
    "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
    "tasks.max": "1",
    "database.hostname": "orders-db.internal",
    "database.dbname": "orders",
    "table.include.list": "public.orders",
    "topic.prefix": "cdc"
  }
}
```

This is meaningfully different from polling the database with a
`SELECT` on a timer — CDC reads the database's own replication log,
so it catches every change, in the exact order it happened, with no
gap between polls and no missed deletes.

## The sink side: into a data warehouse

On the other end, a **sink connector** takes messages off a topic
and writes them into a destination system — here, a warehouse:

```
{
  "name": "snowflake-orders-sink",
  "config": {
    "connector.class": "com.snowflake.kafka.connector.SnowflakeSinkConnector",
    "tasks.max": "2",
    "topics": "cdc.public.orders",
    "snowflake.database.name": "ANALYTICS",
    "snowflake.schema.name": "RAW"
  }
}
```

Same config shape as the source side — `connector.class` and
`tasks.max` again — just pointed at a different kind of external
system. Databricks & Delta Lake Lesson 33 covered Structured
Streaming as one way to land streaming data into a lakehouse; a sink
connector solves the equivalent "get this into my analytics system"
problem for a warehouse target, without a Spark job to write and
maintain.

## Chained together: a full pipeline, no custom code

```
Postgres        cdc.public.orders        ANALYTICS.RAW
(orders table)  ------------------>       (Snowflake table)
       \                Kafka topic              /
        source connector          sink connector
        (Debezium CDC)            (Snowflake sink)
```

Every order insert in Postgres flows through Kafka and lands in
Snowflake, continuously, without a single custom producer or
consumer written for either hop — both ends are Connect
configuration, not code.

## What a running connector actually looks like

This isn't hypothetical — here's Confluent Cloud showing a real,
running connector on the Connectors page:

![Confluent Cloud's Connectors page, showing a running connector's status.](/courses/kafka/ch04/17-source-and-sink-connectors/cloud-connectors-page.png)

That status view is where you'd actually monitor the pipeline
described above — whether the CDC source is running, whether the
sink is keeping up, and how many tasks each one has active.

## Key terms

| Term | Meaning |
|---|---|
| CDC (change data capture) | Reading a database's own replication log to capture every change in order, as it happens |
| Debezium | A widely used CDC source connector implementation, common for Postgres/MySQL/MongoDB |
| Sink connector config | Same shape as a source connector's — `connector.class`, `tasks.max` — pointed at a destination system |

## Check yourself

You're ready for Chapter 5 when you can explain: why does a CDC
source connector reading a database's replication log catch changes
that a timer-based polling query would miss?
