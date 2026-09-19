# A Real Kinesis Streaming Pipeline

Four lessons of individual Kinesis services are only useful once you see them wired
together. This lesson walks a single real pipeline end to end: clickstream events landing in
a Kinesis Data Stream, Firehose buffering and delivering them to S3, and Athena querying the
result — the same pattern that shows up in production behind "real-time analytics" features.

## What you'll learn

- Why clickstream ingestion is the canonical Kinesis use case
- How Firehose can read directly from a Kinesis Data Stream as its source
- What the data looks like landing in S3, and how it gets cataloged
- Where Athena fits as the final, queryable step

## The scenario: clickstream events

A web application emits an event every time a user does something worth tracking — a page
view, an add-to-cart, a checkout. Each event is a small JSON object: user ID, event type,
timestamp, page URL. These events arrive continuously and in high volume, which is exactly
the shape of workload Kinesis Data Streams is built for: the application's producer code
calls `PutRecord` (or `PutRecords` for batching) with the user ID as the partition key, so
one user's session stays ordered on one shard.

## Firehose reads the stream as its source

Rather than writing a custom consumer application, this pipeline points a Firehose delivery
stream directly at the Kinesis Data Stream as its **source**. Firehose continuously pulls
records off the stream, buffers them (by size or time, as covered in Lesson 49), and delivers
them to an S3 bucket as batched files — commonly partitioned by ingestion time
(`year=2024/month=01/day=15/hour=09/`) so the resulting layout is Athena-friendly from the
start.

## Cataloging and querying the landed data

Once clickstream data is landing in S3 as files, the rest of the pipeline is familiar from
earlier chapters: a Glue crawler catalogs the new partitions into the Glue Data Catalog, and
Athena queries the table directly — for example, counting page views by URL for the last
hour. The stream handled the real-time ingestion; Athena handles the ad hoc, on-demand
analysis after the fact. Kinesis Data Analytics (Lesson 50) could also sit earlier in this
same pipeline, computing a live "orders per minute" metric straight off the stream while
Firehose separately archives every raw event to S3.

## Why this shape is so common

This pattern — durable stream, managed delivery, queryable landing zone — shows up
constantly because it separates concerns cleanly: Data Streams guarantees nothing is lost and
supports real-time consumers, Firehose removes the operational burden of writing to storage,
and S3 plus Athena gives you a durable, cheap, queryable archive of every event that ever
happened. No single service does all three jobs well, which is exactly why production
pipelines combine them instead of picking just one.

## Key terms

| Term | Meaning |
|---|---|
| Producer | Application code writing clickstream events into the Kinesis Data Stream |
| Firehose source | A Kinesis Data Stream configured as Firehose's input instead of direct-put |
| Ingestion-time partitioning | Organizing landed S3 files by year/month/day/hour for efficient querying |
| Glue crawler | Discovers new S3 partitions and updates the Glue Data Catalog |
| Landing zone | The S3 location where streamed data comes to rest, queryable by Athena |

## Check yourself

Why does this pipeline use a Kinesis Data Stream *and* Firehose, instead of having the web
application write clickstream events directly to Firehose? What capability would be lost if
the Data Stream were removed from the middle of this pipeline?
