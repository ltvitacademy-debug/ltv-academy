# Script — S3 Event Notifications

## Segment 1 (title)

Most pipelines shouldn't sit around polling a bucket, wondering if a file showed up. S3 can publish an event notification the instant an object is created, deleted, or restored — and that's the mechanism behind "land a file, pipeline runs automatically."

## Segment 2 (code: object created, prefix-scoped)

Scope a notification to a prefix and suffix — say, raw slash orders, ending in dot-parquet — and point it at a Lambda function that calls glue colon StartJobRun. A file lands, the pipeline runs. Nothing is polling the bucket on a timer.

## Segment 3 (steps: three destinations)

S3 events can go to three places: SNS for fan-out to multiple subscribers at once, SQS as a durable queue that buffers events until a consumer is ready, or Lambda for a direct, lightweight invoke per event.

## Segment 4 (outro)

Event notifications down. Next up: S3 as a data lake foundation — raw, staged, and curated zones, and why S3 plus Glue plus Athena adds up to a real data lake.
