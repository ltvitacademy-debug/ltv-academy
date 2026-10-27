# Lesson 12 — Finding the Real Cause

**Chapter 1 · Intermediate Capstone: A Repeatable Curated Dataset · Lesson 12 of 16**

## What you'll learn

- Querying `sys_load_error_detail` to get Redshift's actual, specific failure reason
- Recognizing an S3 Access Denied–style error as a permissions problem, not a data problem
- Reading an IAM policy JSON against AWS's documented `COPY` requirements
- The exact missing statement, and why it was never caught before now

## Step 1: ask Redshift what actually happened

Lesson 11 confirmed the `COPY` fails, but the generic error message didn't say why. Redshift
Serverless logs the specific reason in a system view built for exactly this:

```sql
SELECT query_id, file_name, error_message
FROM sys_load_error_detail
ORDER BY start_time DESC
LIMIT 10;
```

This isn't a guess or a log file to interpret loosely — `sys_load_error_detail` is Redshift's own
record of precisely what went wrong on the most recent failed load attempts, one row per file or
error encountered.

## What it shows

The `error_message` column comes back with something in the shape of an S3 Access Denied error —
Redshift tried to read from `s3://northfield-curated-zone/orders/` and was refused. That single
fact reframes the whole investigation: this isn't a data problem (a malformed Parquet file, a
schema mismatch, a bad value) and it isn't a scheduling problem (EventBridge, the Glue trigger).
It's a permissions problem, specifically between Redshift and S3.

## Step 2: check the IAM role against what COPY actually needs

The `COPY` statement authenticates as `northfield-redshift-copy-role`
(`arn:aws:iam::111122223333:role/northfield-redshift-copy-role`), set up back in Lesson 5. Pull up
that role's actual policy:

```json
{
  "Effect": "Allow",
  "Action": "s3:GetObject",
  "Resource": "arn:aws:s3:::northfield-curated-zone/orders/*"
}
```

That `Resource` is the object-level ARN — `s3:GetObject` scoped to the objects under the
`orders/` prefix. That's the *only* statement on the role. Compare it against what AWS actually documents a `COPY` needs: the role must be able to
both **list** the bucket (`s3:ListBucket`, on the bucket ARN itself,
`arn:aws:s3:::northfield-curated-zone`) and **get** each object (`s3:GetObject`, on the object
prefix). This policy has the second half. It is missing the first entirely.

## Why that matches the symptom exactly

`COPY` doesn't know in advance which Parquet files sit under `orders/` — Glue writes a different
set of part files on every run. To find them, `COPY` first has to **list** the bucket's contents
to enumerate what's actually there, and only then issue a `GetObject` call for each file it finds.
A role that can `GetObject` but can't `ListBucket` fails at that very first step, before it ever
gets to read a single file — which is exactly the Access Denied behavior Lesson 11 reproduced and
this lesson just confirmed in `sys_load_error_detail`.

## Confirmed, not fixed

This is the root cause, confirmed two ways: the error detail points to S3 access, and the policy
JSON shows the specific missing permission that explains it. The `s3:ListBucket` statement was
simply never added when this role was first created in Lesson 5 — a one-statement gap that had no
effect until something depended on listing that exact bucket at exactly this path. Nothing gets
changed yet. Confirming the cause, cleanly, is this lesson's entire job.

## Key terms

| Term | Meaning |
|---|---|
| sys_load_error_detail | Redshift Serverless's system view recording the specific reason behind failed load attempts |
| s3:ListBucket | The IAM permission needed to enumerate a bucket's contents — required on the bucket ARN itself |
| s3:GetObject | The IAM permission needed to read a specific object — required on the object/prefix ARN |

## Lab

On your own setup, query `sys_load_error_detail` after a failed (or deliberately misconfigured)
`COPY` and read the `error_message` it returns. Then pull the IAM role's policy JSON and check it
statement by statement against what `COPY` actually needs: `ListBucket` on the bucket, `GetObject`
on the prefix. Confirm which one, if either, is missing before moving on.

## Check yourself

You're ready for Lesson 13 when you can answer, without looking: why does a role with
`s3:GetObject` but no `s3:ListBucket` fail a `COPY` before it ever reads a single file?
