# Script — Automated File Loading & Monitoring Loads

## Segment 1 (title)

Making auto_ingest actually fire means connecting two systems that don't know about each other by default: your cloud bucket and your Snowflake pipe.

## Segment 2 (screenshot: S3 event notification setup)

SHOW PIPES gives you an SQS ARN that Snowflake already created and is already listening to. In the AWS console, you configure the S3 bucket to send object-created events to that exact queue — copy the ARN wrong, and files land with nothing happening.

## Segment 3 (screenshot: SHOW PIPES result)

The same SHOW PIPES command serves two purposes: during setup, it's where you copy the ARN from; afterward, it's your at-a-glance check that the pipe still exists and is enabled.

## Segment 4 (code: SYSTEM$PIPE_STATUS)

For whether files are actually loading right now, not just whether the pipe exists, SYSTEM$PIPE_STATUS returns execution state, pending file count, and the last time it received a file — the fastest health check available.

## Segment 5 (steps: least-privilege permissions)

A pipe should run under its own narrowly-scoped role, not the admin credentials used to set it up — insert and select on exactly the table it needs, usage on exactly the stage it reads from, nothing more.

## Segment 6 (outro)

Next lesson: what to do when a pipe stops working — stuck files, permission errors, and where COPY_HISTORY and PIPE_USAGE_HISTORY show you exactly what went wrong.
