# Kinesis Data Analytics

Data Streams gets records in, Firehose gets them out to storage — but neither one actually
*processes* the data in transit. Kinesis Data Analytics is the piece that runs real-time
computation directly against a stream, before anything lands anywhere. That's the difference
between "we'll compute this metric in tomorrow's batch job" and "we know this metric right
now, while it's still happening."

## What you'll learn

- Why Kinesis Data Analytics runs computation on data in motion, not at rest
- The two ways to write stream processing logic: SQL and Apache Flink
- Windowed aggregations as the core real-time analytics pattern
- Where AWS's branding has shifted, and what stayed the same underneath

## Processing data while it's still in motion

Every other query tool in this course — Athena, Redshift — runs against data that has
already landed. Kinesis Data Analytics is different: it reads directly from a Kinesis data
stream (or a Firehose delivery stream), runs continuous processing logic against records as
they arrive, and writes results back out to another stream, Firehose, or a Lambda function.
Nothing has to be written to S3 first for this processing to happen.

## Two ways to write the logic: SQL or Flink

Kinesis Data Analytics originally offered a **SQL-based application** model — you write
queries almost like standard SQL, running continuously against the incoming stream rather
than once against a static table. AWS has since shifted its primary emphasis toward
**Apache Flink**, the open-source stream-processing framework, and rebranded that runtime as
**Amazon Managed Service for Apache Flink**. Flink gives you a full programming model (Java,
Python, or Scala) for complex event processing, while the SQL option stays useful for
straightforward continuous aggregations without writing application code.

## Windowed aggregations: the core real-time pattern

The signature real-time analytics pattern is a **windowed aggregation** — computing a metric
over a rolling slice of time instead of the whole stream at once. A tumbling 1-minute window
counting page views per URL, or a sliding 5-minute window computing average order value, are
both windowed aggregations. This is fundamentally different from a batch `GROUP BY`: the
computation runs continuously, emitting a fresh result as each window closes, rather than
running once against a finished dataset.

## Key terms

| Term | Meaning |
|---|---|
| Kinesis Data Analytics | Real-time processing engine that reads and computes directly on a stream |
| Managed Service for Apache Flink | AWS's current branding for the Flink-based runtime |
| Tumbling window | Fixed, non-overlapping time slice used for a windowed aggregation |
| Sliding window | Overlapping time slice that moves forward continuously |
| Windowed aggregation | A metric computed over a rolling slice of stream time, not the whole dataset |

## Check yourself

A team wants a dashboard showing "orders per minute" updating in near real time, without
waiting for a nightly batch job. Would you reach for Athena querying yesterday's S3 data, or
Kinesis Data Analytics running a windowed aggregation directly on the stream? Why?
