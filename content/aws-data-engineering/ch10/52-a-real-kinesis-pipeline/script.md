# Script — A Real Kinesis Streaming Pipeline

## Segment 1 (title)

Four lessons of individual Kinesis services are only useful once you see them wired together. This lesson walks a single real pipeline end to end: clickstream events into a Kinesis Data Stream, Firehose delivering to S3, and Athena querying the result.

## Segment 2 (code: a clickstream event, in flight)

Each event is a small JSON object — user ID, event type, page URL, timestamp — written with PutRecord, using the user ID as the partition key so one user's whole session stays ordered on the same shard.

## Segment 3 (steps: stream to storage to query)

The Kinesis Data Stream handles durable, ordered, real-time ingestion. Firehose reads directly from that stream as its source, buffers, and delivers to S3. A Glue crawler catalogs the new partitions automatically. And Athena queries the landed clickstream data whenever someone needs an answer.

## Segment 4 (code: querying the landed data)

Once the data's landed and cataloged, it's an ordinary Athena query — counting page views by URL for a given day, reading exactly what Firehose already wrote to S3.

## Segment 5 (outro)

A full streaming pipeline, stitched together. Next up: CloudWatch — the monitoring layer that watches every service this course has covered, from S3 to Kinesis.
