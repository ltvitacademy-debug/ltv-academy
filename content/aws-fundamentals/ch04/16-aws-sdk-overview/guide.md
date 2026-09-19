# Lesson 16 — AWS SDK, Overview

**Chapter 4 · Working in AWS · Lesson 16 of 18**

## What you'll learn

- What an AWS SDK is, and how `boto3` (the Python SDK) relates to the
  CLI you just learned
- The client vs. resource interface split in `boto3`, and when to
  reach for each
- How the SDK finds credentials — the credential chain, and why it
  usually means you never hardcode a key in code
- Where the SDK fits in a real data engineering pipeline

## The SDK is the CLI's sibling, not its replacement

An **AWS SDK** (Software Development Kit) is a language-specific
library that calls the exact same AWS APIs the CLI does — `boto3` for
Python is the one you'll meet constantly in data engineering, since
Glue, Lambda, and most pipeline glue code is Python.

```
CLI:    aws s3 cp file.csv s3://my-bucket/raw/
boto3:  s3_client.upload_file("file.csv", "my-bucket", "raw/file.csv")

Same API call underneath. Different interface on top.
```

The CLI is for humans typing commands or shell scripts; the SDK is
for code that needs to make AWS calls as part of a larger program —
a Lambda function, a Glue job's PySpark script, a scheduled Python
job in Step Functions.

## Client vs. resource: two interfaces, one library

`boto3` offers two ways to talk to most services:

```python
import boto3

# Client: low-level, maps 1:1 onto the API
s3_client = boto3.client("s3")
s3_client.put_object(Bucket="my-bucket", Key="raw/data.csv", Body=data)

# Resource: higher-level, object-oriented
s3_resource = boto3.resource("s3")
bucket = s3_resource.Bucket("my-bucket")
bucket.put_object(Key="raw/data.csv", Body=data)
```

The **client** interface is a near-literal mapping onto every API
action — it exists for every service and is the one you can always
fall back on. The **resource** interface is a more Pythonic,
object-oriented layer available for a subset of services (S3,
DynamoDB, EC2 among them) — convenient, but not universal, so
production pipeline code often standardizes on `client` for
consistency across services.

## Where credentials actually come from: the credential chain

The SDK never asks you to hardcode an access key in your script.
Instead, `boto3` (like the CLI) searches a fixed order of places,
called the **credential chain**, and uses the first one it finds:

```
1. Explicit credentials passed in code (avoid this)
2. Environment variables
   (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)
3. Shared credentials file (~/.aws/credentials)
4. IAM role attached to the compute running the code
   (EC2 instance profile, Lambda execution role, ECS task role)
```

That fourth option is the one real pipelines rely on: code running
inside a Lambda function or a Glue job automatically picks up that
job's execution role's temporary credentials, with zero credential
handling in the code itself — a direct, practical payoff of
Chapter 3's execution-role pattern.

## Where the SDK actually shows up in a pipeline

```
Lambda function:   triggered by an S3 upload, uses boto3
                   to read the file and write to DynamoDB
Glue PySpark job:   uses boto3 alongside Spark APIs to read
                   job parameters, log to CloudWatch
Airflow/Step         orchestration code calling boto3 to
Functions task:      start a Glue job run or check its status
```

## Key terms

| Term | Meaning |
|---|---|
| AWS SDK | A language-specific library that calls AWS APIs from code |
| `boto3` | The official AWS SDK for Python |
| Client interface | `boto3`'s low-level interface, mapping directly onto each API action |
| Resource interface | `boto3`'s higher-level, object-oriented interface (a subset of services) |
| Credential chain | The fixed order boto3 searches to find credentials automatically |

## Check yourself

You're ready for Lesson 17 when you can explain, without looking: why
does code running inside a Lambda function typically never need to
call `boto3.client("s3", aws_access_key_id=...)` with an explicit key?
