# Lesson 1 — The Ask Grows: Finance Wants a Repeatable Dataset

**Chapter 1 · Intermediate Capstone: A Repeatable Curated Dataset · Lesson 1 of 16**

## What you'll learn

- Why Finance's new request can't be satisfied with the Beginner project's ad hoc queries
- What "repeatable" actually requires that "queryable" doesn't
- The new pieces this tier adds: a Glue ETL job, a Redshift warehouse, a schedule, two reports, and two real bugs
- How this project fits between the Beginner tier below it and the Advanced tier above it

## A quick recap, if you built the Beginner project

In the Beginner capstone, Northfield Outdoor Supply's raw order exports landed in
`s3://northfield-raw-zone/orders/`, an on-demand Glue crawler named `northfield-raw-crawler`
scanned them into a Glue Data Catalog table (`northfield_catalog.northfield_orders_raw`), and
analysts queried that table directly with Athena whenever someone had a question. It worked —
but every query was a one-off: someone opened the Athena console, wrote SQL against raw,
uncorrected columns (strings and numbers exactly as the CSVs wrote them), and ran it by hand.
If you haven't built that project, nothing here depends on it line by line — just know
`northfield_catalog.northfield_orders_raw` already exists, with columns `order_id`,
`customer_id`, `product_sku`, `quantity`, `unit_price`, `order_date`, `region`, and a `dt`
partition, none of it cleaned or typed.

## The ask grows

Finance noticed the Athena queries were useful enough to want them every month, not just
whenever someone remembered to run one. Their actual request:

> "We need the same regional revenue numbers every month, without anyone re-writing or
> re-running a query by hand — and we need to be able to trust the totals."

That's a different problem than "can you answer this question about the data." It's "can this
answer itself, correctly, on a schedule, forever." Two things the Beginner tier's approach can't
give Finance:

- **Repeatability** — the same transformation logic has to run again next month without anyone
  retyping it, and it has to produce the same shape of result every time.
- **Trustworthy numbers** — the raw table's `quantity` and `unit_price` are untyped strings
  straight from the CSV. Summing them "by hand" in ad hoc SQL risks silent casting mistakes;
  a real pipeline fixes the types once, centrally.

## Why ad hoc Athena queries don't scale to "repeatable"

Nothing is technically broken about querying `northfield_orders_raw` with Athena — you still will,
occasionally (Lesson 7). The problem is relying on it as the *primary* path for a recurring,
trusted report:

- **No single place owns the transformation logic.** Every analyst who writes their own query
  might cast types, dedupe, or filter nulls slightly differently — and "slightly differently"
  is exactly how two reports end up disagreeing.
- **Raw data stays raw, forever.** The crawler only describes what's in S3; it never cleans or
  reshapes it. Every query re-does the same casting and cleanup work from scratch.
- **No warehouse for repeat, join-heavy access.** Athena is excellent for occasional scans over
  S3, but a monthly report that joins orders against product and customer dimensions, every
  month, by multiple people, is exactly the workload a real warehouse is built for.

## What this tier adds

This chapter builds the repeatable path end to end, piece by piece:

| Lesson(s) | What gets built |
|---|---|
| 2 | The plain-English plan: Glue ETL → Redshift, replacing ad hoc Athena with a repeatable load |
| 3-4 | The real Glue ETL job (`northfield-orders-etl`) and the Redshift tables it feeds |
| 5-6 | Loading Redshift with `COPY`, then validating the load actually matches the source |
| 7 | Athena kept as a *secondary* path, now querying the curated data via Redshift Spectrum |
| 8 | A scheduled nightly refresh — no one has to remember to run anything |
| 9-10 | The two real stakeholder reports: Finance's monthly revenue report and a lighter Ops report |
| 11-13 | A real production bug — a nightly load starts failing — diagnosed and fixed |
| 14-15 | A second real bug — a silent schema-shift that corrupts data without erroring — diagnosed and fixed |
| 16 | Wrap-up, and the bridge to the Advanced tier |

## Where this sits in the bigger picture

This is the middle of three capstone tiers in the AWS Data Engineer path. The Beginner tier
(below this one) stopped at raw S3 plus ad hoc Athena. The Advanced tier (`aws-capstone`, already
built) picks up *exactly where this one leaves off* — it adds Step Functions orchestration,
CloudWatch monitoring, CI/CD, IAM hardening, and disaster recovery on top of the same
`northfield-orders-etl` → Redshift pipeline you're about to build. That means every resource name
you create in this chapter is real and permanent for this course — nothing gets renamed later.

## Key terms

| Term | Meaning |
|---|---|
| Repeatable dataset | A dataset produced by the same transformation logic every run, not a one-off query |
| ETL | Extract, Transform, Load — reading raw data, cleaning/reshaping it, and writing it somewhere durable |
| Data warehouse | A database optimized for repeated, join-heavy analytical queries (here, Redshift) |
| Ad hoc query | A one-time, hand-written query run once to answer a specific question |

## Check yourself

You're ready for Lesson 2 when you can answer, without looking: what specifically can a scheduled
ETL job plus a warehouse give Finance that running the same Athena query by hand every month
cannot?
