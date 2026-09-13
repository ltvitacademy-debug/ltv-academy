# Lesson 19 — Automated File Loading & Monitoring Loads

**Chapter 4 · Snowpipe & Automated Ingestion · Lesson 19 of 60**

## What you'll learn

- The exact end-to-end setup connecting an S3 bucket to a live Snowpipe
- Why the notification ARN has to travel from Snowflake to AWS, not the other way around
- `SHOW PIPES` and `SYSTEM$PIPE_STATUS` for checking whether a pipe is actually working
- The permission model a pipe needs to run without a human in the loop

## Wiring the trigger: storage integration to S3 event

Lesson 18 introduced `AUTO_INGEST = TRUE` conceptually. Making it actually
fire requires connecting two systems that don't know about each other by
default — your cloud bucket and your Snowflake pipe:

1. Create a storage integration and stage (Lesson 15's pattern).
2. Create the pipe with `AUTO_INGEST = TRUE` (Lesson 18).
3. Run `SHOW PIPES;` and copy the ARN in its `notification_channel`
   column — this is an SQS queue Snowflake already created and is
   already listening to.
4. In AWS, configure the S3 bucket to send `ObjectCreated` events to
   *that* SQS queue.

```sql
SHOW PIPES;
-- notification_channel column holds an SQS ARN like:
-- arn:aws:sqs:us-east-1:123456789012:sf-snowpipe-AIDA...-abc123
```

Step 4 happens in the AWS console, not Snowsight — configuring the S3
bucket's event notification to point at that exact ARN:

![The AWS S3 console's Create Event Notification form, configured with event type 'All object create events' and destination 'SQS Queue' pointing at the Snowpipe-managed queue ARN.](/courses/snowflake/ch04/19-automated-file-loading-and-monitoring-loads/s3-event-notification.png)
*The ARN in this form has to be copied exactly from SHOW PIPES's notification_channel — a typo here means files land and nothing happens.*
Source: [Snowflake Quickstarts — Getting Started with Snowpipe](https://quickstarts.snowflake.com/guide/getting_started_with_snowpipe/index.html)

Once that's saved, dropping any new file into the bucket's configured
path fires the event, which triggers the pipe, which runs its `COPY INTO`
— no human runs anything from this point forward.

## Checking that it's actually working

`SHOW PIPES` is also where you confirm a pipe exists and see its
definition and notification channel at a glance:

![The result of SHOW PIPES in Snowsight, listing pipe name, definition, and the notification_channel ARN column used to wire up the S3 event.](/courses/snowflake/ch04/19-automated-file-loading-and-monitoring-loads/show-pipes-result.png)
*Same command, two purposes: setup (copying the ARN) and ongoing monitoring (confirming the pipe still exists and is enabled).*
Source: [Snowflake Quickstarts — Getting Started with Snowpipe](https://quickstarts.snowflake.com/guide/getting_started_with_snowpipe/index.html)

For whether recent files actually loaded, not just whether the pipe
exists, use the pipe-specific status function:

```sql
SELECT SYSTEM$PIPE_STATUS('my_db.public.my_pipe');
```

This returns JSON including `executionState` (`RUNNING` or `PAUSED`),
`pendingFileCount`, and the last time it received a file — the fastest
health check for "is this pipe actually doing anything right now."

## The permission model

A pipe needs its own role with narrow, specific grants — not the
account admin credentials you used to set everything up:

```sql
CREATE OR REPLACE ROLE snowpipe_role;
GRANT USAGE ON DATABASE my_db TO ROLE snowpipe_role;
GRANT USAGE ON SCHEMA my_db.public TO ROLE snowpipe_role;
GRANT INSERT, SELECT ON my_db.public.my_table TO ROLE snowpipe_role;
GRANT USAGE ON STAGE my_db.public.my_stage TO ROLE snowpipe_role;
GRANT OWNERSHIP ON PIPE my_db.public.my_pipe TO ROLE snowpipe_role;
```

This is least-privilege applied to automation: the pipe's role can insert
into exactly the one table it needs to, and nothing else — the same
instinct as a service account in any other system, scoped tightly rather
than reusing an admin identity for something unattended.

## Key terms

| Term | Meaning |
|---|---|
| notification_channel | The SQS/Event Grid/Pub-Sub ARN a pipe listens on, shown by SHOW PIPES |
| SYSTEM$PIPE_STATUS | Function returning a pipe's live execution state and pending file count |
| Least-privilege role | A narrowly-scoped role granted only what a pipe needs to run unattended |

## Lab

1. Run `SHOW PIPES;` against any pipe you've created and locate the
   `notification_channel` value.
2. Run `SELECT SYSTEM$PIPE_STATUS('<your pipe>');` and identify
   `executionState` and `pendingFileCount` in the JSON it returns.
3. Write out the least-privilege grant statements a pipe's role would
   need for a table it only ever inserts into.

## Check yourself

You're ready for Lesson 20 when you can name the exact value that has to
travel from Snowflake's `SHOW PIPES` output into the AWS S3 console for
the automation to work at all.
