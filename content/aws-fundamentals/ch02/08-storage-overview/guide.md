# Lesson 8 — Storage Overview: S3 & EBS

**Chapter 2 · Core AWS Services Overview · Lesson 8 of 18**

## What you'll learn

- What S3 is: object storage, and what "object" actually means here
- S3 storage classes, and why they exist
- What EBS is, and how it fundamentally differs from S3
- Which one a data pipeline actually reaches for, and when

## S3: object storage, decoupled from any server

**S3 (Simple Storage Service)** stores **objects** — files, plus
metadata, plus a unique key — inside **buckets**, accessed over
HTTP(S) via API rather than mounted like a disk. There's no
practical size limit on a bucket, no server it's "attached to," and
objects are addressed by their key (effectively a path) rather than a
file-system location. This is why S3 is the default landing zone for
data pipelines: raw files, staged data, Parquet output — anything
gets written to a bucket and read back by any compute (Lambda, Glue,
EMR, Redshift Spectrum, Athena) that needs it, without that compute
needing to "own" the storage.

```
bucket: my-pipeline-data
  ├─ raw/2024-01-15/orders.csv
  ├─ staged/2024-01-15/orders.parquet
  └─ curated/orders_by_region.parquet

Accessed by key over HTTPS — not mounted as a drive.
```

S3 also offers multiple **storage classes** trading retrieval speed
for price: **Standard** (frequent access), **Standard-IA**
(infrequent access, cheaper storage, a retrieval fee), and the
**Glacier** family (archival, cents-per-GB storage, retrieval takes
minutes to hours). AWS advertises S3 Standard's durability at
"eleven nines" (99.999999999%) — data loss is designed to be
essentially a non-event, because every object is redundantly stored
across multiple Availability Zones automatically.

## EBS: a virtual hard drive for one EC2 instance

**EBS (Elastic Block Store)** is fundamentally different: it provides
**block storage** — a virtual hard drive — that attaches to a single
EC2 instance, the way a physical drive attaches to a physical
server. An EBS volume lives in one specific Availability Zone, and
(with rare exceptions) can only be attached to one instance at a
time. The operating system on an EC2 instance treats an EBS volume
like any local disk — it can be formatted, mounted, and used for
anything that needs a real filesystem, like a database's data files.

```
S3:                                  EBS:
  object storage, key-value           block storage, a virtual disk
  accessed via HTTPS API              accessed as a mounted filesystem
  not attached to any instance        attached to exactly one instance
  practically unlimited scale         sized per volume, resizable
```

Multiple EBS volume types exist for different needs — `gp3` (general
purpose SSD, the default for most workloads) and `io2` (provisioned
IOPS, for demanding database workloads) being the two most common.

## Which one a pipeline actually uses

In a real data pipeline, S3 is almost always the answer for the data
itself — it's what Glue reads from, what Redshift's `COPY` command
loads from, what Athena queries directly. EBS shows up underneath
compute that needs a real disk — the root volume of an EC2 instance,
or the data volume for a database engine you're running yourself on
EC2. The two aren't competing options for the same job; they solve
different problems.

## Key terms

| Term | Meaning |
|---|---|
| S3 | AWS's object storage service — buckets and keys, accessed via API |
| Bucket | A named container for S3 objects |
| Storage class | An S3 pricing/retrieval tier — Standard, Standard-IA, Glacier |
| EBS | AWS's block storage service — a virtual disk attached to one EC2 instance |

## Check yourself

You're ready for Lesson 9 when you can explain, without looking: why
is S3 the default choice for a data pipeline's raw and staged files,
while EBS is not?
