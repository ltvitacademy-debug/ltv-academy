# Loading Data Into Redshift: the COPY Command

Redshift is a warehouse you load data *into*, which raises the obvious question: how? The
answer is almost never a plain SQL `INSERT`. It's the **COPY** command — Redshift's purpose-
built bulk loader, designed to move data from S3 into a table using every compute node at
once instead of one row at a time.

## What you'll learn

- The real COPY command syntax, loading from S3
- Why COPY dramatically outperforms row-by-row INSERT
- Manifest files, and the consistency problem they solve

## The COPY command

A basic COPY loading Parquet files from S3 looks like this:

```
COPY sales.orders
FROM 's3://my-data-lake/curated/orders/'
IAM_ROLE 'arn:aws:iam::123456789012:role/RedshiftLoadRole'
FORMAT AS PARQUET;
```

`FROM` points at an S3 prefix (or a manifest file — see below). `IAM_ROLE` is the role
Redshift assumes to read from that S3 location; it needs `s3:GetObject` and `s3:ListBucket`
permissions on the source. `FORMAT AS` tells Redshift how to parse the objects — `PARQUET`,
`CSV`, `JSON`, and `AVRO` are all supported, among others. For CSV you'd typically also specify
a `DELIMITER` and options like `IGNOREHEADER 1` to skip a header row.

## Why COPY beats INSERT

A plain `INSERT INTO sales.orders VALUES (...)` — or worse, thousands of them — runs through
the leader node one statement at a time, writing sequentially. **COPY works completely
differently**: the leader node reads the list of source files, then hands portions of that
list out to be loaded **in parallel across every compute node's slices simultaneously**. Ten
compute nodes with four slices each means forty parallel load streams instead of one. For
anything beyond a handful of rows — which in data engineering is basically always — COPY is
the only load pattern that scales, and it's the pattern every production Redshift pipeline
uses.

## Manifest files

Pointing `FROM` at an S3 prefix works, but it has an edge case: if new objects land in that
prefix *while* the COPY is running, or if you need to load an exact, known set of files rather
than "everything currently under this prefix," a prefix isn't precise enough. A **manifest
file** solves this — it's a JSON file listing the exact S3 object URLs to load, each with an
explicit path:

```
{
  "entries": [
    {"url": "s3://my-data-lake/curated/orders/part-0001.parquet", "mandatory": true},
    {"url": "s3://my-data-lake/curated/orders/part-0002.parquet", "mandatory": true}
  ]
}
```

You then run `COPY ... FROM 's3://my-data-lake/manifests/orders.json' IAM_ROLE '...' MANIFEST
FORMAT AS PARQUET;`. `mandatory: true` tells Redshift to fail the whole load if that specific
file is missing, instead of silently loading a partial dataset — exactly the guarantee you
want in a pipeline that expects a known, complete batch of files each run.

## Key terms

| Term | Meaning |
|---|---|
| COPY | Redshift's bulk-load command; loads S3 data in parallel across all compute nodes |
| IAM_ROLE | The role COPY assumes to read from the source S3 location |
| FORMAT AS | Tells COPY how to parse source files (PARQUET, CSV, JSON, AVRO, etc.) |
| Manifest file | A JSON file listing the exact S3 objects to load, for precision and consistency |
| mandatory | Manifest entry flag that fails the whole load if that file is missing |

## Check yourself

A nightly pipeline needs to load exactly the 40 Parquet files a Glue job produced last night —
no more, no less, even if a 41st file starts landing in the same S3 prefix mid-load. Would you
point COPY's `FROM` at the S3 prefix directly, or at a manifest file? Why?
