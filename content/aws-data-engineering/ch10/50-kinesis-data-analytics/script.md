# Script — Kinesis Data Analytics

## Segment 1 (title)

Data Streams gets records in and Firehose gets them out to storage, but neither one processes the data in transit. Kinesis Data Analytics runs real-time computation directly against a stream, before anything lands anywhere.

## Segment 2 (code: SQL running continuously on the stream)

You can write continuous SQL against the incoming stream, grouped into windows — here, counting page views per URL over a rolling 1-minute tumbling window. It behaves nothing like a one-time batch query: it emits a fresh result every time the window closes.

## Segment 3 (steps: two ways to write the logic)

There's a SQL application model for straightforward continuous aggregations with no app code, and Apache Flink for a full Java, Python, or Scala programming model — which AWS now markets as Amazon Managed Service for Apache Flink. Either way, results flow back out to a stream, to Firehose, or to a Lambda function.

## Segment 4 (outro)

Real-time stream processing down. Next up: how Kinesis actually compares to Kafka and Fabric Eventstreams — a fair look at managed versus portable streaming.
