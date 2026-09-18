# Lesson 26 — Kafka + Snowflake & Databricks

**Chapter 6 · Practical Patterns · Lesson 26 of 30**

## What you'll learn

- How Snowflake's Kafka Sink Connector lands a topic's events as table rows,
  config-driven, no transform code
- How Databricks reads the same shape of topic with Structured Streaming,
  full Spark transforms included
- Why a real data platform might run both off the very same topic
- Where each pattern connects to this course's own earlier platform courses

## Landing in Snowflake — config, not code

```properties
name=snowflake-sink
connector.class=com.snowflake.kafka.connector.SnowflakeSinkConnector
topics=orders
snowflake.url.name=myaccount.snowflakecomputing.com
snowflake.database.name=ANALYTICS
snowflake.schema.name=RAW
buffer.flush.time=60
```

This is a Kafka Connect sink connector (Lesson 16-17's own territory) —
the Snowflake-specific one. Point it at the `orders` topic and Snowflake's
own connection details, and Snowpipe Streaming underneath buffers events
and lands them as rows in `ANALYTICS.RAW.ORDERS`, on the schedule
`buffer.flush.time` sets. Snowflake's own course covers this from the
warehouse side: Lesson 18's Snowpipe & Continuous Ingestion is the general
pattern, Lesson 19 covers monitoring those loads, and Lesson 20 covers what
happens when one fails — all in that course's own Chapter 4, "Snowpipe &
Automated Ingestion." No custom code runs on this path at all.

## Reading it in Databricks — full Spark, before it lands

```python
df = (spark.readStream
      .format("kafka")
      .option("kafka.bootstrap.servers", "b1:9092,b2:9092")
      .option("subscribe", "orders")
      .option("startingOffsets", "latest")
      .load())

parsed = df.selectExpr("CAST(value AS STRING) AS json")
```

Azure Databricks & Delta Lake's Lesson 33, Structured Streaming Basics,
already taught this exact API — `spark.readStream.format(...)` — reading
from a file source. Kafka is just another source: swap `"format(...)"` to
`"kafka"`, point `subscribe` at the topic, and the same DataFrame API
applies from there. What's different from Snowflake's path is real:
`parsed` is a live DataFrame. Any transform Spark can express — parsing,
joining against a Delta table, aggregating a window — runs before anything
lands, which is exactly what that lesson's bronze-to-silver pipelines
(Lessons 29-30) already do once the data's file-based.

## Why a real platform might run both

These aren't competing choices for the same job. Snowflake's connector is
the right call when the destination just needs the raw events as rows,
fast, with no transform logic worth writing. Databricks' `readStream` is
the right call when the events need real processing — joins, aggregation,
feature computation — before they're useful anywhere. A real platform
might point both at the same `orders` topic for different downstream
purposes, since Kafka's replay property (Lesson 1) means neither consumer
affects the other.

## Key terms

| Term | Meaning |
|---|---|
| Snowflake Sink Connector | A Kafka Connect connector that lands a topic's events as Snowflake table rows, config-driven |
| Snowpipe Streaming | The mechanism underneath the connector that actually buffers and loads the data |
| `spark.readStream.format("kafka")` | Databricks Structured Streaming reading a live Kafka topic as a DataFrame |

## Check yourself

You're ready for Lesson 27 when you can explain, without looking: why is
the Snowflake connector's path config-driven with no transform logic,
while the Databricks path can run a full Spark transform before the data
lands — and when would you actually want each one?
