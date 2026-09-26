# S3 for Data Science

Welcome to AWS Data Science. You already know how to explore data, build features and train models with scikit-learn on your own machine. This course is about doing that same work on Amazon Web Services, where the data is bigger, the compute is rented by the hour, and a teammate has to be able to reproduce your result.
We start with the service almost everything else on AWS leans on: Amazon S3. If you took the AWS Data Engineer path you already know what buckets, keys and storage classes are, so we will not repeat that. This lesson is about how a **data scientist** uses S3: how to lay out an ML project, which file format to choose, and how to keep a dataset reproducible.

A note on names and code. Everything in this course follows the current AWS documentation as of this writing, and AWS products get renamed often. The AWS snippets are illustrative and were **not run** here, because no AWS account is used in this course text. The pandas and scikit-learn snippets were run, and the output you see is real.

## What you'll learn

- Why S3 is the hub of an ML project on AWS
- A project layout that separates raw data, processed splits and models
- CSV versus Parquet, with a measured size comparison
- How to read only the columns you need
- How versioning and fixed prefixes keep experiments reproducible

## S3 is where ML data lives

On AWS, a training job does not read from your laptop. Amazon SageMaker AI, the managed ML service we meet in Chapter 2, copies or streams training data from S3 into the training container, and writes the finished model artifact back to S3. Athena, Glue and Redshift, the next four lessons, all read from or write to S3 too. One documented rule to remember: the dataset must be in the **same Region** as the training job.

## A project layout that scales

Treat prefixes as your folders and give every stage its own home:

```
s3://my-ds-bucket/churn-project/
    raw/customers.parquet
    processed/v1/train/part-0000.parquet
    processed/v1/validation/part-0000.parquet
    processed/v1/test/part-0000.parquet
    models/
```

Two habits pay off. Never overwrite `raw/`; treat it as read-only. And put a version in the processed path (`v1`, `v2`) so a new feature set never silently replaces the one an old model was trained on.

## CSV or Parquet?

CSV is readable, but it stores everything as text and you must read whole rows. Parquet is a columnar, compressed binary format that keeps types and lets you read only some columns. I generated a synthetic 50,000-row customer table and saved it both ways:

```
csv bytes     2080741
parquet bytes  646285
```

Same data, about 31 percent of the size. Reading three columns from the Parquet file is a one-line change, `pd.read_parquet(path, columns=[...])`, and returned a `(50000, 3)` frame. Smaller files also mean less data to move and, with Athena, less data to pay to scan.

## Reading and writing S3 from Python

Two routes are common (illustrative, not run here). The `boto3` library is the general AWS SDK for Python; the AWS SDK for pandas (`awswrangler`, imported as `wr`) gives pandas-shaped helpers on top of it.

```python
import boto3
import awswrangler as wr

s3 = boto3.client("s3")
s3.upload_file("customers.parquet", "my-ds-bucket",
               "churn-project/raw/customers.parquet")

df = wr.s3.read_parquet(
    "s3://my-ds-bucket/churn-project/processed/v1/train/",
    dataset=True, columns=["tenure_months", "churned"])
```

pandas can also open `s3://` paths directly when the `s3fs` package is installed. Credentials should come from an IAM role, never hard-coded in a notebook; Lesson 5 covers that.

## Make the dataset reproducible

Fix the split once, write it to fixed prefixes, and every experiment uses identical data. I ran a stratified 70/15/15 split with `random_state=42`: train 35,000 rows, validation 7,500, test 7,500, and the churn rate stayed at 0.189 in all three.

Then turn on **S3 Versioning** for the bucket. It is off by default. Once enabled, overwriting an object creates a new version instead of destroying the old one, and you can fetch an exact version with `get_object(..., VersionId=...)`. Two cautions from the docs: each version is stored as a full object and billed as such, and a bucket can be suspended but never returned to the unversioned state.

Finally, some good news on security. S3 now encrypts all new objects with SSE-S3 by default, and new buckets do not allow public access by default. You still control who can read your data, which is exactly the subject of Lesson 5.

## Recap

- S3 is the input and output store for nearly every ML workflow on AWS.
- Use `raw/`, versioned `processed/` and `models/` prefixes.
- Prefer Parquet: smaller, typed, and column-selectable.
- Fix your split, write it to fixed paths, and enable bucket versioning.

Next, Lesson 2 shows how the Glue Data Catalog turns those S3 files into named, queryable tables.
