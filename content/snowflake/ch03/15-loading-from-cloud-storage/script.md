# Script — Loading From Cloud Storage

## Segment 1 (title)

Loading from cloud storage is the external stage from Lesson 12, made real — pointed at a bucket you actually own, with credentials or an integration behind it.

## Segment 2 (screenshot: Create Stage filled with S3 settings)

Same Create Stage dialog as Lesson 12, but now with a real S3 bucket URL and path filled in — the step that turns the concept into a working connection to storage you control.

## Segment 3 (code: STORAGE INTEGRATION)

Typing AWS keys directly into CREATE STAGE works, but a storage integration authorizes Snowflake to assume your cloud IAM role instead — no secret keys stored in Snowflake, and rotating credentials doesn't mean editing every stage that used them.

## Segment 4 (code: the four-step pattern)

Whichever provider the bucket lives on, the sequence is the same: authorize with an integration, point a stage at the bucket, define the file format, then COPY INTO. Only the identity plumbing changes between S3, Azure Blob, and GCS.

## Segment 5 (outro)

Next lesson: what happens when a load doesn't go cleanly — ON_ERROR options, validation mode, and where to look when rows fail to parse.
