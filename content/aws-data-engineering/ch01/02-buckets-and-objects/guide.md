# Buckets & Objects

S3 Fundamentals gave you the mental model: buckets are containers, objects are the immutable
blobs inside them, and keys are flat string identifiers, not real paths. Before you start
building pipelines around S3, you need the concrete rules that govern buckets and objects —
naming, metadata, versioning, and how S3 actually handles a large file — because these rules
shape how you design a bucket layout from day one, not something you can retrofit later.

## What you'll learn

- The naming rules every bucket must follow, and why they're stricter than you'd expect
- What travels with an object besides the raw bytes: system and user-defined metadata
- What versioning actually does to a bucket once you turn it on
- Why S3 splits large uploads into parts instead of sending one giant PUT

## Bucket naming rules

A bucket name isn't just a label — it becomes part of a DNS hostname
(`bucket-name.s3.amazonaws.com`), so AWS enforces DNS-compliant naming:

- **Globally unique across all of AWS**, not just your account. If another AWS customer
  anywhere in the world already owns `my-data-lake`, you can't have it either.
- **3–63 characters**, lowercase letters, numbers, hyphens, and periods only — no
  underscores, no uppercase.
- **Must start and end with a letter or number**, not a hyphen or period.
- **Can't be formatted like an IP address** (e.g. `192.168.5.4`).

In practice, most data engineering teams prefix bucket names with an org or account
identifier (`acme-prod-raw-orders`) precisely because the good short names are usually taken.

## Objects: metadata and versioning

Every object carries more than its bytes. **System metadata** (content type, size, last
modified date, ETag) is managed by S3 itself. **User-defined metadata** is a set of
key-value pairs you attach yourself (`x-amz-meta-source: salesforce-export`) — useful for
tagging where data came from without needing a separate tracking system.

**Versioning**, when enabled on a bucket, changes what a PUT or DELETE actually does. With
versioning off, uploading to an existing key overwrites it and the old bytes are gone.
With versioning on, every PUT creates a new version and the old one is kept; a DELETE
doesn't erase anything — it adds a **delete marker** on top of the version stack, and you
can still retrieve or restore any prior version. This matters for data pipelines because an
accidental bad overwrite (a botched ETL re-run, for instance) becomes recoverable instead of
a permanent loss.

## Multipart upload: how S3 handles large objects

A single S3 object can be up to **5 TB**, but a single PUT request is capped at 5 GB. To
upload anything larger — and AWS recommends it for anything above roughly 100 MB — you use
**multipart upload**: the object is split into parts (each 5 MB–5 GB, uploaded in parallel),
and S3 assembles them into one object once every part has arrived. This isn't just about the
5 GB ceiling — parallel parts mean faster uploads over unreliable connections, and a failed
part can be retried without re-sending the whole object. Most SDKs and CLI tools (including
the AWS CLI's `s3 cp`) use multipart upload automatically above a size threshold, so you
rarely write this logic by hand, but you need to recognize it when you see it in logs or
IAM permission errors (`s3:PutObject` alone isn't enough — multipart needs
`s3:AbortMultipartUpload` and related permissions too).

## Key terms

| Term | Meaning |
|---|---|
| Bucket naming | Globally unique, DNS-compliant, 3–63 chars, lowercase only |
| System metadata | Object attributes S3 manages itself (size, type, ETag) |
| User-defined metadata | Custom key-value pairs you attach to an object |
| Versioning | Keeps every prior version of an object instead of overwriting it |
| Delete marker | What a DELETE creates on a versioned object, instead of erasing data |
| Multipart upload | Splitting a large object into parts uploaded in parallel, then assembled by S3 |

## Check yourself

A teammate enables versioning on a bucket, then accidentally re-runs an ETL job that
overwrites `curated/customers.parquet` with bad data. Is that data recoverable? What about
after they also run a DELETE on that key?
