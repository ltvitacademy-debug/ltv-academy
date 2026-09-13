# Lesson 12 — Internal vs. External Stages

**Chapter 3 · Loading Data Into Snowflake · Lesson 12 of 60**

## What you'll learn

- What a Snowflake *stage* actually is, and why every load goes through one
- The three kinds of internal stage (user, table, named) vs. named external stages
- When to reach for an internal stage vs. pointing at storage you already own
- The `CREATE STAGE` syntax for both

## The landing zone before the table

In SQL Server, you'd typically load a flat file straight into a staging
table with `BULK INSERT` or SSIS, pointing directly at a file path. Snowflake
splits that into two steps: first the file lands in a **stage** — a named
reference to a location holding data files — then `COPY INTO` moves rows
from the stage into a table. Nothing loads directly from your laptop or a
bucket into a table without a stage in between.

A stage is not a copy of your data; it's a pointer plus some metadata
(file format, credentials) that Snowflake remembers so you don't retype
them on every load.

## Internal stages: storage Snowflake already manages

Every Snowflake account has internal stages already provisioned, no
`CREATE STAGE` needed for two of the three kinds:

1. **User stage** (`@~`) — private to your user, good for one-off personal
   uploads.
2. **Table stage** (`@%table_name`) — tied to a specific table, convenient
   when a stage's whole purpose is loading into that one table.
3. **Named internal stage** (`CREATE STAGE my_stage`) — a stage you create
   and name yourself, shareable across users and roles, the one you'll use
   most for anything beyond a quick personal test.

```sql
-- Named internal stage — Snowflake manages the storage
CREATE OR REPLACE STAGE my_internal_stage
  FILE_FORMAT = (TYPE = 'CSV');

-- Upload a local file into it (via SnowSQL, not Snowsight's browser UI)
PUT file:///local/path/data.csv @my_internal_stage;
```

Internal stages live inside Snowflake's own storage. You never see or manage
the underlying S3/Blob/GCS bucket — Snowflake does. That's the appeal: zero
cloud-storage setup, at the cost of your data physically living wherever
Snowflake put it rather than a bucket your team already controls.

## External stages: storage you already own

A **named external stage** points at cloud storage you already have —
an S3 bucket, an Azure Blob container, or a GCS bucket — without copying
the files into Snowflake first:

![The Create Stage dialog in Snowsight, opened via Databases > Create > Stage > Amazon S3, showing the CREATE STAGE SQL statement with a URL pointing at an external S3 bucket.](/courses/snowflake/ch03/12-internal-vs-external-stages/create-stage-dialog.png)
*Snowsight's "Create Stage" wizard writes the same `CREATE STAGE ... URL = 's3://...'` statement you could type by hand — the UI is a shortcut, not a different mechanism.*
Source: [Snowflake Quickstarts — Getting Started with Snowflake](https://quickstarts.snowflake.com/guide/getting_started_with_snowflake/index.html)

```sql
-- Named external stage — pointing at a bucket you already own
CREATE OR REPLACE STAGE my_s3_stage
  URL = 's3://my-existing-bucket/data/'
  CREDENTIALS = (AWS_KEY_ID = '...' AWS_SECRET_KEY = '...')
  FILE_FORMAT = (TYPE = 'CSV');
```

In production you'd almost never hardcode keys like that — Chapter 4 covers
`STORAGE INTEGRATION`, the credential-free way to authorize a stage against
a bucket using your cloud provider's own IAM role instead.

## Choosing between them

| | Internal stage | External stage |
|---|---|---|
| Storage location | Inside Snowflake | Your own S3/Blob/GCS bucket |
| Setup | Nothing, or one `CREATE STAGE` | `CREATE STAGE` + credentials/integration |
| Best for | Quick loads, no existing cloud storage | Data already living in a data lake, files other tools also read |
| Data residency | Snowflake decides | You control the bucket and its lifecycle |

Most production pipelines at a company with an existing data lake use
external stages, because the raw files need to keep existing in that lake
for other tools too — Snowflake is one consumer among several, not the
only owner of the files.

## Key terms

| Term | Meaning |
|---|---|
| Stage | A named reference to a file location (internal or external) that `COPY INTO` reads from |
| User stage (`@~`) | Personal internal stage, always exists, one per user |
| Table stage (`@%table`) | Internal stage tied to one table, always exists |
| Named stage | A stage you create with `CREATE STAGE`, internal or external, sharable via grants |
| PUT | The command that uploads a local file into an internal stage |

## Lab

1. Run `CREATE OR REPLACE STAGE my_internal_stage;` in a worksheet.
2. Run `LIST @my_internal_stage;` — note it's empty.
3. Run `LIST @~;` to see your own user stage.
4. Write (but don't execute, unless you have a real bucket handy) a
   `CREATE STAGE` statement pointing at an S3 URL, to practice the syntax.

## Check yourself

You're ready for Lesson 13 when you can explain, in one sentence, why a
company with an existing S3 data lake would default to external stages
instead of copying everything into Snowflake's internal storage first.
