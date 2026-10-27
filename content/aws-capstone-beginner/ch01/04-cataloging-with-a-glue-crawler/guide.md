# Cataloging the Data With a Glue Crawler

**Chapter 1 · Beginner Capstone: First Look at the Files · Lesson 4 of 10**

## What you'll learn

- The real Glue Crawler setup: database, crawler, IAM role, and S3 target
- What happens when the crawler runs, step by step
- Why this crawler runs on demand, once, instead of on a schedule

## Setting up the Glue Database

A Glue Crawler needs somewhere to register the table it creates — a Glue **database**,
which is just a logical namespace in the Data Catalog, not a running database engine.
Create one for Northfield's raw data:

```
aws glue create-database \
  --database-input '{"Name": "northfield_raw_db", "Description": "Raw, uncataloged Northfield exports"}'
```

## Giving the crawler permission

The crawler needs an IAM role that lets it read from S3 and write table definitions into
the Glue Catalog — nothing more. Northfield's AWS account already has a role scoped for
this:

```
Role: AWSGlueServiceRole-NorthfieldCapstone
Permissions:
  - AmazonS3ReadOnlyAccess (scoped to s3://northfield-raw-zone/*)
  - AWSGlueServiceRole (managed policy — Catalog read/write, CloudWatch Logs)
```

Least privilege matters even on a small project: this role can read the raw zone and
write to the Catalog, and nothing else — it can't touch Redshift, delete S3 objects, or
reach any other bucket in the account.

## Creating the crawler

Point the crawler at the exact prefix from Lesson 3:

```
aws glue create-crawler \
  --name northfield-orders-raw-crawler \
  --role AWSGlueServiceRole-NorthfieldCapstone \
  --database-name northfield_raw_db \
  --targets '{"S3Targets": [{"Path": "s3://northfield-raw-zone/orders-raw/"}]}'
```

## Running it

```
aws glue start-crawler --name northfield-orders-raw-crawler
```

The crawler runs through four stages, visible in the Glue console: **Starting**,
**Running** (sampling files, inferring schema), **Stopping**, and **Ready**. For 31 small
CSV files, this takes well under a minute. When it finishes, check what it created:

```
aws glue get-tables --database-name northfield_raw_db
```

That returns a table named `orders_raw` — Glue names the table after the S3 prefix folder
by default — with a column list the crawler inferred by sampling the files. Lesson 5 digs
into exactly what it found, and where it got something not quite right.

## On demand, not on a schedule

Glue Crawlers support a schedule (cron-style, like "every day at 2 AM"), which is exactly
what the automated version of this pipeline uses once ingestion is recurring. This
crawler runs **on demand** — triggered by hand, once — because the raw files aren't
changing daily yet; they're a one-time August export. Running a scheduled crawler against
data that never changes would just burn a small amount of cost for no benefit.

## Key terms

| Term | Meaning |
|---|---|
| Glue database | A logical namespace in the Data Catalog, not a running database engine |
| Crawler | Scans files in S3, infers schema, and registers a table in the Catalog |
| On-demand run | Triggered manually, once, as opposed to a recurring schedule |
| Least privilege | Granting a role only the exact permissions it needs, nothing more |

## Check yourself

Why does the IAM role for this crawler only need S3 read access and Glue Catalog
read/write — and why run the crawler on demand instead of putting it on a schedule?
