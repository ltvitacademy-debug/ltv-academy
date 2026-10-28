# Lesson 9 — S3 Buckets, Objects, and Storage Classes

**Chapter 3 · AWS Storage: S3 and EBS · Lesson 9 of 32**

## What you'll learn

- What an S3 **bucket** actually is, and why its name has to be globally unique across every
  AWS account on the planet, not just your own
- What an S3 **object** is, and how a "key" stands in for the folder structure S3 doesn't
  really have
- The three storage classes you'll reach for most — S3 Standard, S3 Standard-IA, and S3
  Glacier — and the cost/retrieval-time tradeoff each one makes
- How to create a bucket and upload an object at a specific storage class with the AWS CLI

## Buckets: a globally unique container, not a folder

An **S3 bucket** is the top-level container for everything you store in Amazon S3 (Simple
Storage Service). Every bucket name has to be unique across **all of AWS**, worldwide — not
just unique within your account — because S3 bucket names form part of a predictable URL
(`https://bucket-name.s3.amazonaws.com/...`), and two different customers can't both claim
`company-backups`. That single global namespace is the first thing that trips people up coming
from on-premises storage, where a share name only has to be unique on one server. A bucket
lives in one AWS Region you choose at creation time, and that's also where its data physically
stays unless you explicitly set up cross-region replication later in this course.

```bash
aws s3api create-bucket \
  --bucket ltv-academy-media-backups \
  --region us-east-1
```

## Objects and keys: a flat namespace that looks like folders

An **object** is the actual file you store — along with its metadata — and every object is
identified by a **key**, which is just a string like `invoices/2026/october-summary.pdf`. S3
itself has no real folder hierarchy underneath a bucket (the same flat-namespace design the
prior Azure course covered for blob containers — an S3 bucket is the direct equivalent). The
`/` characters in a key are just characters; the AWS console renders them as folders for your
convenience, but under the hood every object sits directly in the bucket, addressed by its
full key.

```bash
aws s3 cp ./october-summary.pdf \
  s3://ltv-academy-media-backups/invoices/2026/october-summary.pdf
```

## Storage classes: paying for how "hot" the data is

Every object you upload lives in a **storage class**, and the three you'll use constantly are:

- **S3 Standard** — the default. Highest storage cost, but millisecond retrieval with no
  retrieval fee. Use it for anything read or written regularly.
- **S3 Standard-IA** (Infrequent Access) — lower storage cost than Standard, still millisecond
  retrieval, but AWS charges a per-GB **retrieval fee** when you actually read the object. Fits
  data you need fast *if* someone asks for it, but rarely does.
- **S3 Glacier** — by far the cheapest storage, but the data isn't instantly available. Glacier
  retrieval ranges from minutes to hours depending on the retrieval tier you choose, which is
  the real tradeoff: you're giving up speed entirely in exchange for the lowest possible cost on
  data you're unlikely to ever need in a hurry.

```bash
aws s3 cp ./2025-archive.tar.gz \
  s3://ltv-academy-media-backups/archive/2025-archive.tar.gz \
  --storage-class GLACIER
```

## Key terms

| Term | Meaning |
|---|---|
| Bucket | S3's top-level container; its name must be globally unique across all of AWS |
| Object | A file plus its metadata, stored inside a bucket |
| Key | The string that identifies an object — looks like a file path, but S3's namespace is flat |
| S3 Standard | Default storage class — highest cost, no retrieval fee, millisecond access |
| S3 Standard-IA | Lower storage cost, millisecond access, per-GB retrieval fee |
| S3 Glacier | Cheapest storage, retrieval takes minutes to hours depending on tier |

## Check yourself

You're ready for Lesson 10 when you can explain, without looking: why would a company upload a
file it reads constantly to S3 Standard-IA, and what would that mistake actually cost them?
