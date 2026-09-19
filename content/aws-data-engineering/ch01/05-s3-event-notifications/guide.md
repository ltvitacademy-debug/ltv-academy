# S3 Event Notifications

Most data pipelines don't run on a fixed schedule waiting for new files to maybe show up —
they react the moment a file actually lands. S3 makes that possible natively: a bucket can
publish an **event notification** the instant an object is created, deleted, or restored,
and route that event to another AWS service that kicks off the next step. This is the
mechanism behind "land a file, pipeline runs automatically" without a single polling job.

## What you'll learn

- Which S3 events you can subscribe to
- The three destinations S3 can send events to: SNS, SQS, and Lambda
- How a real pipeline uses this to trigger Glue or Lambda on object creation
- Why this beats polling S3 on a schedule

## What triggers a notification

S3 can publish events for object-level actions, the most commonly used being:

- `s3:ObjectCreated:*` — any way an object gets created (PUT, POST, COPY, multipart
  completion)
- `s3:ObjectRemoved:*` — deletes, including delete markers on versioned buckets
- `s3:ObjectRestore:*` — completion of a Glacier restore request

Notifications are configured per bucket, and can be scoped to a **key prefix and/or suffix**
— for example, only fire for objects landing under `raw/orders/` and ending in `.parquet`,
ignoring everything else written to the same bucket.

## Where events can go

S3 events route to one of three destinations, each suited to a different pattern:

- **SNS (Simple Notification Service)** — fan-out to multiple subscribers at once (email,
  SQS queues, Lambda functions). Use this when more than one system needs to react to the
  same event.
- **SQS (Simple Queue Service)** — a durable queue that holds events until a consumer is
  ready to process them. Use this when you need buffering, retry handling, or a
  single downstream worker pulling at its own pace.
- **Lambda** — directly invokes a function per event. Use this for lightweight, immediate
  reactions with no separate polling process needed.

**EventBridge** is also available as a more flexible routing option (rule-based filtering
across many event types), but for a straightforward "object landed, react now" case, a
direct SNS/SQS/Lambda destination is usually the simpler choice.

## A real use case: triggering ETL on arrival

A common pattern in a data lake's raw zone: a source system drops a new export file into
`s3://my-data-lake/raw/orders/`. An `s3:ObjectCreated:*` notification scoped to that prefix
fires a **Lambda function**, which either processes the file directly (for small,
lightweight transforms) or calls `glue:StartJobRun` to kick off a full **Glue ETL job** that
reads the new object, transforms it, and writes the result to the curated zone. This is
strictly event-driven — nothing is polling S3 on a timer, checking "is there a new file
yet?" The pipeline only runs, and only costs anything, when data actually arrives.

## Key terms

| Term | Meaning |
|---|---|
| Event notification | A message S3 publishes when a configured action happens to an object |
| `s3:ObjectCreated:*` | Event type covering any way an object is created |
| SNS | Fan-out notification service — one event, multiple subscribers |
| SQS | Durable queue holding events until a consumer processes them |
| Event-driven pipeline | A pipeline triggered by an actual event, not a polling schedule |

## Check yourself

A partner system uploads a new file to your raw zone at unpredictable times, sometimes twice
a day, sometimes not for a week. Why is an S3 event notification triggering a Lambda or Glue
job a better fit here than a scheduled job that checks the bucket every hour?
