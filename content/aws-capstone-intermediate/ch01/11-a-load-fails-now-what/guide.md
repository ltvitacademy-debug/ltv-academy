# Lesson 11 — A Load Fails, Now What?

**Chapter 1 · Intermediate Capstone: A Repeatable Curated Dataset · Lesson 11 of 16**

## What you'll learn

- Why reproducing a production failure comes before investigating its cause
- Running the Lesson 5 COPY statement manually to confirm what's actually broken
- Reading a Redshift load failure message for what it does and doesn't tell you
- Why "it's probably X" is exactly the wrong move at this stage

## Both reports have been in regular use

Finance has been running its monthly revenue report (Lesson 9) and Ops its weekly volume report
(Lesson 10) for a while now, both built on top of the nightly refresh from Lesson 8 — the
EventBridge rule `northfield-nightly-refresh` triggering `northfield-orders-etl`, which on
success triggers the small `northfield-redshift-load` job to re-run the `COPY` into
`fact_orders`. It's been working. Then it stops.

## The report comes in

Someone on the Finance team emails: "This morning's revenue numbers look stale — they match
yesterday's totals exactly." Separately, or instead, you might just notice the alert yourself:
the `northfield-redshift-load` Glue job shows a failed run overnight. Either way, the signal is
the same — the nightly `COPY` that's supposed to refresh `fact_orders` didn't happen, or didn't
finish.

That's a real incident, and "the numbers look stale" isn't something to act on by guessing. The
first job is the same discipline this course has used for every bug so far: reproduce the problem
yourself, under known conditions, before touching anything or assuming a cause.

## Reproduce it: run the COPY manually

Open the Redshift Query Editor and run the exact `COPY` statement from Lesson 5 by hand — the
same one `northfield-redshift-load` runs automatically every night:

```sql
COPY analytics.fact_orders (order_id, customer_id, product_sku, dt, region, quantity, unit_price, order_total)
FROM 's3://northfield-curated-zone/orders/'
IAM_ROLE 'arn:aws:iam::111122223333:role/northfield-redshift-copy-role'
FORMAT AS PARQUET;
```

Running the real statement manually, rather than just reading the Glue job's log, matters because
it rules out anything specific to the scheduled trigger itself — a stuck EventBridge rule, a Glue
job misconfiguration — and isolates the question to the `COPY` operation alone.

## What happens

The statement fails:

```
ERROR: Load into table 'fact_orders' failed.  Check 'sys_load_error_detail' system table for details.
```

That's it — a generic failure pointing you at a system table, not a specific root cause. It
confirms the incident is real and reproducible on demand, which is exactly what you needed before
doing anything else. It does **not** yet tell you whether this is a permissions problem, a
malformed file, a schema mismatch, or something else entirely.

## Resist the urge to guess

It would be easy to jump straight to "the IAM role probably expired" or "a bad file must have
landed in the curated zone" — and either guess might even turn out right. But guessing and
checking one thing at a time, without a system to actually confirm the cause, risks "fixing"
something that was never broken while the real problem stays in place. You have one thing
confirmed: the `COPY` fails, reproducibly, right now. That's the lesson's entire scope.

## Key terms

| Term | Meaning |
|---|---|
| Reproduce | Trigger a reported failure yourself, under known conditions, before investigating further |
| sys_load_error_detail | Redshift Serverless's system view holding the specific reason a COPY load failed |
| Generic failure message | An error that confirms something broke without yet saying what |

## Lab

On your own Redshift Serverless workgroup, run the exact `COPY` statement above against your
curated zone and IAM role. If it succeeds, that's fine — the point of this lab is practicing the
reproduce-first discipline, not necessarily recreating the failure. Either way, note exactly what
message Redshift returns before moving to the next lesson.

## Check yourself

You're ready for Lesson 12 when you can answer, without looking: why run the Lesson 5 `COPY`
statement manually instead of just reading the failed Glue job's log and guessing from there?
