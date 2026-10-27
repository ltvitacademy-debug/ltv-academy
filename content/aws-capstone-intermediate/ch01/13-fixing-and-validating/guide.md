# Lesson 13 — Fixing and Validating

**Chapter 1 · Intermediate Capstone: A Repeatable Curated Dataset · Lesson 13 of 16**

## What you'll learn

- Adding the missing `s3:ListBucket` statement to `northfield-redshift-copy-role`
- Why COPY needs both a bucket-level permission and an object-level permission
- Re-running the Lesson 5 COPY manually and checking `sys_load_error_detail` for new errors
- Re-running the Lesson 6 validation query pair to confirm the load now matches source exactly

## The fix: one missing statement

Lesson 12 found the root cause: the inline policy on `northfield-redshift-copy-role` only grants
`s3:GetObject` on the curated zone's objects. It never grants `s3:ListBucket` on the bucket
itself. The fix is to add that missing statement alongside the existing one — not to replace
anything, not to widen anything further:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::northfield-curated-zone/orders/*"
    },
    {
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::northfield-curated-zone"
    }
  ]
}
```

Notice the `Resource` values are shaped differently on purpose. `s3:GetObject`'s resource ends in
`/orders/*` — an object-level ARN, naming individual files. `s3:ListBucket`'s resource is just
`arn:aws:s3:::northfield-curated-zone` — a bucket-level ARN, with no object path at all. That
difference isn't a typo to clean up; it's required. `s3:ListBucket` is one of the few S3 actions
that only makes sense against the bucket itself, never against an object key.

## Why COPY needs both permission scopes

This is the part that's easy to glide past when a role first gets created, which is exactly how
Lesson 5 ended up with the gap. COPY against a Parquet prefix is really two different operations
against two different things:

1. **Enumerate.** Before COPY can read anything, it has to ask S3 "what files actually exist
   under `orders/`?" — because a partitioned Parquet dataset isn't one file, it's an unknown
   number of part-files spread across `dt=` folders. That enumeration is a bucket-level
   operation, and it's gated by `s3:ListBucket` on the bucket, not by any permission on the
   objects themselves.
2. **Read.** Only after COPY knows which object keys exist can it actually fetch each one's
   bytes. That's `s3:GetObject`, gated per object.

`s3:GetObject` alone "feels" sufficient, because reading the files is the part that sounds like
the actual job. But COPY can't get to step 2 without completing step 1 first — and step 1 is
gated by a completely different action, scoped to a completely different resource type (the
bucket, not the objects in it). A role with `GetObject` but no `ListBucket` can, in principle,
read any specific key it's told about — but Redshift's COPY doesn't get told keys one at a time.
It has to list the prefix itself, which is precisely the step that was failing in Lesson 12's
`sys_load_error_detail` output.

## Apply the fix

In the IAM console, open `northfield-redshift-copy-role`, open its inline policy, and add the
`s3:ListBucket` statement exactly as shown above — same policy document, second statement
appended to the existing `Statement` array. Save.

## Re-run the load and confirm

Go back to the Redshift Serverless Query Editor and re-run the exact Lesson 5 COPY statement by
hand:

```sql
COPY analytics.fact_orders
FROM 's3://northfield-curated-zone/orders/'
IAM_ROLE 'arn:aws:iam::111122223333:role/northfield-redshift-copy-role'
FORMAT AS PARQUET;
```

This time it should complete without error. Confirm two things:

```sql
-- 1. No new errors logged for this load
SELECT *
FROM sys_load_error_detail
ORDER BY start_time DESC
LIMIT 5;

-- 2. Row count and sum match source exactly (Lesson 6's pair, re-run)
SELECT COUNT(*), SUM(order_total) FROM analytics.fact_orders;
```

against the equivalent query over `northfield_catalog.northfield_orders_curated` in Athena. The
two numbers should match exactly — not approximately, since COPY is an idempotent reload of the
same curated Parquet files.

## The nightly refresh is fixed, too

The scheduled refresh built in Lesson 8 — EventBridge rule `northfield-nightly-refresh` running
`northfield-orders-etl`, then Glue trigger `northfield-load-trigger` kicking off the
`northfield-redshift-load` Python Shell job that re-issues this same COPY — was failing for the
exact same reason, every night, since the role was first created. There was no separate fix
needed for the schedule itself. Fixing the role's policy once fixes every future run of the
nightly chain, because they all call through the same IAM role.

## Key terms

| Term | Meaning |
|---|---|
| `s3:ListBucket` | Bucket-level S3 permission; required to enumerate which objects exist under a prefix |
| `s3:GetObject` | Object-level S3 permission; required to read the bytes of a specific object |
| `sys_load_error_detail` | Redshift system table recording per-row and per-load COPY failures |
| Idempotent reload | Re-running the same COPY against unchanged source data and getting the same result |

## Lab

Add the `s3:ListBucket` statement to `northfield-redshift-copy-role`'s policy exactly as shown.
Re-run the Lesson 5 COPY by hand, confirm `sys_load_error_detail` shows no new errors, and re-run
the row-count/sum pair against both `analytics.fact_orders` and
`northfield_catalog.northfield_orders_curated` to confirm they match exactly.

## Check yourself

You're ready for Lesson 14 when you can answer, without looking: why does COPY need both
`s3:ListBucket` and `s3:GetObject` instead of just one of them, and why does fixing the IAM
role's policy once also fix every future run of the Lesson 8 nightly schedule?
