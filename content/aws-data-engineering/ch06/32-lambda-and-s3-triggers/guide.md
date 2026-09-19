# Lambda + S3 Triggers

S3 PUT events were the first item on Lesson 31's list of event sources for a reason: it's the
single most common Lambda trigger pattern in data engineering. A file lands in S3, and a
Lambda function processes it automatically, within moments, with nothing polling anything.

## What you'll learn

- The real S3 event notification → Lambda pattern
- Event filtering by prefix and suffix
- The two permission pieces that make this actually work
- Why this pattern is so common in data pipelines

## The pattern

A bucket (or a specific prefix inside it) is configured with an **S3 event notification**:
"whenever an object matching this rule is created, invoke this Lambda function." The
notification configuration looks like this, conceptually:

```
Bucket: incoming-uploads
Event:  s3:ObjectCreated:Put
Filter: prefix = "raw/", suffix = ".csv"
Target: Lambda function "validate-and-load"
```

The moment a `.csv` object lands under `raw/` in that bucket, S3 invokes `validate-and-load`
and passes it an event payload containing the bucket name and object key. The function reads
those two values, fetches the object from S3, and does whatever it's built to do — validate
its schema, convert it, kick off a downstream load. No schedule, no checking loop: the instant
the file exists, processing starts.

## Filtering by prefix and suffix

Real buckets hold more than one kind of object, so notifications support filtering by **key
prefix** (e.g. only `raw/orders/`) and **suffix** (e.g. only `.parquet` files), so a bucket
that receives ten different file types can route each one to the Lambda function built to
handle it, without that function needing to check the key itself first.

## The permissions that make it work

Two separate permission pieces have to be in place, and it's a common source of confusion when
one is missing:

1. A **resource-based policy** on the Lambda function itself, granting the S3 service
   principal (`s3.amazonaws.com`) permission to invoke it — S3 needs explicit permission to
   call *into* Lambda.
2. An **execution role** attached to the Lambda function, granting it permission to read (and
   write, if it processes and stores results) the relevant S3 objects — Lambda needs its own
   permission to call *out to* S3.

Miss the first and S3 silently can't invoke the function; miss the second and the function
gets invoked but fails with an access-denied error the moment it tries to fetch the object.

## Why this pattern is everywhere

It's the natural fit for "process a file the moment it arrives": ingestion validation,
converting an uploaded CSV to Parquet, kicking off a larger pipeline (often by handing off to
Step Functions, covered in Lesson 34), or simply logging metadata about every new object. It
costs nothing when no files are landing, and reacts within moments when they are.

## Key terms

| Term | Meaning |
|---|---|
| S3 event notification | Bucket configuration that invokes a target (e.g. Lambda) on matching events |
| s3:ObjectCreated:Put | The event type fired when a new object is uploaded |
| Prefix/suffix filter | Restricts a notification to objects matching a key pattern |
| Resource-based policy | Permission on the Lambda function allowing S3 to invoke it |
| Execution role | Permission the Lambda function itself uses to access other AWS resources |

## Check yourself

A Lambda function configured as an S3 trigger gets invoked successfully every time a file
lands, but every invocation fails with an access-denied error when it tries to read the
object. Which of the two permission pieces is most likely missing, and why?
