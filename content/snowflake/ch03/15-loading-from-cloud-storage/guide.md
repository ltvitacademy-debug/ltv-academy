# Lesson 15 — Loading From Cloud Storage

**Chapter 3 · Loading Data Into Snowflake · Lesson 15 of 60**

## What you'll learn

- How to point a stage at an S3, Azure Blob, or GCS bucket you already own
- Why `STORAGE INTEGRATION` is preferred over hardcoded credentials
- The full path from bucket to table: integration, stage, format, COPY INTO
- What changes (and what doesn't) across the three cloud providers

## The pattern from Lesson 12, filled in for real

Lesson 12 introduced external stages conceptually. Loading from cloud
storage in practice is that same `CREATE STAGE`, pointed at a bucket you
already control, with real credentials behind it:

![The Create Stage dialog in Snowsight filled in with a real S3 bucket URL and path, as part of Snowflake's own Getting Started with Snowflake tutorial.](/courses/snowflake/ch03/15-loading-from-cloud-storage/create-stage-s3-settings.png)
*Same dialog as Lesson 12 — but now with an actual bucket and path filled in, the step that turns the concept into a working connection.*
Source: [Snowflake Quickstarts — Getting Started with Snowflake](https://quickstarts.snowflake.com/guide/getting_started_with_snowflake/index.html)

## Skip hardcoded keys: STORAGE INTEGRATION

Typing `AWS_KEY_ID` and `AWS_SECRET_KEY` directly into a `CREATE STAGE`
statement works, but it means every person or process reading that DDL
can see your bucket credentials, and rotating keys means editing every
stage that used them. A **storage integration** authorizes Snowflake to
assume an IAM role (AWS), a service principal (Azure), or a service
account (GCP) instead — no secret keys stored in Snowflake at all:

```sql
-- One-time setup: authorize Snowflake against your cloud IAM role
CREATE OR REPLACE STORAGE INTEGRATION s3_int
  TYPE = EXTERNAL_STAGE
  STORAGE_PROVIDER = 'S3'
  ENABLED = TRUE
  STORAGE_AWS_ROLE_ARN = 'arn:aws:iam::123456789012:role/snowflake_role'
  STORAGE_ALLOWED_LOCATIONS = ('s3://my-bucket/data/');

-- Then a stage references the integration, not raw keys
CREATE OR REPLACE STAGE my_s3_stage
  URL = 's3://my-bucket/data/'
  STORAGE_INTEGRATION = s3_int
  FILE_FORMAT = (FORMAT_NAME = 'csv_ff');
```

`DESC INTEGRATION s3_int;` afterward gives you the IAM user ARN and
external ID you hand to AWS to complete the trust relationship — a
one-time exchange between your Snowflake account and your cloud account,
not something you repeat per stage.

## The same four-step pattern loads any file

Whichever provider the bucket lives on, the sequence is identical:

```sql
-- 1. Authorize (storage integration) — one-time, per cloud account
-- 2. Point a stage at the bucket
CREATE OR REPLACE STAGE cloud_stage
  URL = 's3://my-bucket/incoming/'
  STORAGE_INTEGRATION = s3_int;

-- 3. Define how the files are shaped (Lesson 13)
-- (reusing csv_ff from Lesson 13)

-- 4. Load it
COPY INTO target_table
FROM @cloud_stage
FILE_FORMAT = (FORMAT_NAME = 'csv_ff')
ON_ERROR = 'CONTINUE';
```

Azure Blob and GCS follow the same shape with provider-specific integration
fields (`AZURE_TENANT_ID`, or a GCS service account email) — the mental
model doesn't change, only the identity plumbing underneath it.

## Key terms

| Term | Meaning |
|---|---|
| Storage integration | An object that lets Snowflake assume a cloud IAM identity instead of storing raw keys |
| STORAGE_ALLOWED_LOCATIONS | The bucket paths an integration is permitted to access |
| Trust relationship | The one-time exchange of IAM role ARN / external ID between Snowflake and your cloud account |

## Lab

1. Read (don't necessarily execute, unless you have a real AWS account
   handy) the `CREATE STORAGE INTEGRATION` syntax above and identify
   which three values you'd need to fill in from your own AWS console.
2. Write out, from memory, the four-step sequence: integration, stage,
   file format, `COPY INTO`.

## Check yourself

You're ready for Lesson 16 when you can explain why a storage integration
is preferable to putting `AWS_KEY_ID` directly into a `CREATE STAGE`
statement.
