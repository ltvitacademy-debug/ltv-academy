# Script — Kinesis Data Firehose

## Segment 1 (title)

Firehose is the opposite philosophy from Data Streams: point it at a destination, and it handles capacity, buffering, and delivery for you. If the goal is just getting a stream into S3, Firehose is almost always the right tool.

## Segment 2 (code: buffering, size or time first wins)

Firehose doesn't deliver every record instantly — it batches. You set a buffer size in megabytes and a buffer interval in seconds, and Firehose flushes the moment either threshold hits. There's no shard count to provision and no consumer library to write.

## Segment 3 (steps: delivery stream, source to destination)

Records arrive either directly or from a Kinesis data stream, the buffer fills until size or time triggers a flush, an optional Lambda step can transform or reshape records in flight, and Firehose delivers to S3, Redshift, OpenSearch, Splunk, or an HTTP endpoint.

## Segment 4 (outro)

Buffering and managed delivery down. Next up: Kinesis Data Analytics — running SQL or Apache Flink directly against a stream for real-time processing.
