# Lesson 1 — What Is AWS?

**Chapter 1 · Cloud & AWS Concepts · Lesson 1 of 18**

## What you'll learn

- What AWS actually is, and the scale it operates at
- Why this course teaches AWS on its own terms, not as "Azure with different names"
- The real shape of an AWS data engineering stack — the services this course builds toward
- What's ahead in this course

## The first, and still the largest, public cloud

**Amazon Web Services (AWS)** launched in 2006 and remains the
largest public cloud provider by market share. It's a collection of
well over 200 individual services — compute, storage, databases,
networking, machine learning, and (the focus of this course) data
engineering — available on demand, billed by actual usage, across
data centers on every populated continent.

```
Not one product:                 A catalog of services:
"AWS" isn't a single thing         S3 (storage), Glue (ETL),
you turn on                        Redshift (warehouse), Lambda
                                    (compute), and 200+ more —
                                    each one its own tool, used
                                    together
```

## Not "Azure with different button names"

If you've already worked through an Azure-flavored course in this
catalog, resist the urge to map every AWS service directly onto its
closest Azure equivalent and call it done — S3 isn't just "Blob
Storage with a different console," and Glue isn't just "Data Factory
renamed." Some ideas really do transfer directly (object storage is
object storage, IAM's core concepts are genuinely similar to Entra
ID's), but AWS has its own service boundaries, its own naming
conventions, and its own idioms that this course teaches on their own
terms — not as a translation exercise.

## The real shape of this course's stack

This course (and the deeper AWS Data Engineering course that follows
it) is built around the exact combination of services real AWS data
engineering job postings ask for:

```
Storage & Cataloging:   S3, Glue Data Catalog
ETL & Compute:          Glue ETL, Lambda, EMR
Warehousing & Query:    Redshift, Athena
Orchestration:          Step Functions
Streaming:               Kinesis
Migration:               DMS
Monitoring:               CloudWatch
```

Every one of those gets its own real depth in AWS Data Engineering.
This course's job is narrower: the cloud and AWS fundamentals —
accounts, IAM, networking, cost — that everything else assumes you
already have.

## What's ahead

```
Ch1  Cloud & AWS Concepts       infrastructure, the console, accounts, shared responsibility
Ch2  Core AWS Services Overview  IAM, compute, storage, networking, pricing — at a glance
Ch3  IAM Deep Dive               the identity model this course leans on constantly
Ch4  Working in AWS              CLI, SDK, deploying something real, the certification landscape
```

## Key terms

| Term | Meaning |
|---|---|
| AWS | Amazon's public cloud platform — 200+ services, on demand, billed by usage |
| Service | One individual AWS product (S3, Lambda, Redshift) — AWS is a catalog, not one thing |

## Check yourself

You're ready for Lesson 2 when you can explain, without looking: why
does this course avoid treating AWS services as a direct one-to-one
translation of Azure's, even where the underlying idea is similar?
