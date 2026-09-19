# S3 Fundamentals

Amazon S3 (Simple Storage Service) is the single most load-bearing service in AWS data
engineering. Nearly every pipeline in this course either lands data in S3, reads data from
S3, or both — Glue crawls it, Athena queries it, Redshift Spectrum reads it directly, EMR
and Kinesis Firehose write to it. Before touching any of those services, you need a working
mental model of what S3 actually is.

## What you'll learn

- What S3 is, and what it is deliberately *not*
- The object storage model: buckets, keys, and objects
- Durability, availability, and consistency guarantees
- Why S3 is the default landing zone for nearly every AWS data pipeline

## Object storage, not a filesystem

S3 stores **objects** — immutable blobs of data, each identified by a **key** (a string,
not a real directory path) inside a **bucket** (a globally-unique-named top-level
container). There is no real folder structure underneath a bucket. The AWS console renders
keys like `raw/orders/2024/01/15/part-0001.parquet` as if they were nested folders, but
that's a display convenience — the key is one flat string, and the "folders" are just
common prefixes.

This distinction matters the moment you start designing a data lake layout: partitioning
schemes (which Lesson 4 covers in depth) are really just key-prefix conventions that tools
like Athena and Glue know how to parse, not physical directory trees.

## Durability vs. availability

AWS quotes S3 Standard at **11 nines of durability** (99.999999999%) — meaning the
probability of losing an object is vanishingly small, because S3 automatically replicates
every object across a minimum of three physical Availability Zones. **Availability** is a
separate number (99.99% for S3 Standard) describing how often the service is reachable and
serving requests. A data engineer should know the difference: durability is about whether
your data survives; availability is about whether you can reach it right now.

## Why S3 is the default landing zone

Three properties make S3 the natural first stop for data instead of a database:

1. **Effectively unlimited capacity.** You don't provision size — a bucket scales from
   zero bytes to petabytes with no resizing step.
2. **Decoupled storage and compute.** Glue, Athena, Redshift Spectrum, and EMR can all read
   the same S3 objects without you copying data between systems for each tool.
3. **Cheap enough to keep everything.** Even the coldest data (Lesson 3 covers storage
   classes) costs a fraction of what block or database storage costs, so "store it in S3
   first, decide what to do with it later" is a standard pattern rather than a compromise.

## Key terms

| Term | Meaning |
|---|---|
| Bucket | Top-level, globally-unique-named container for objects |
| Object | An immutable blob of data plus metadata, identified by a key |
| Key | The full string identifier of an object within a bucket (looks like a path, isn't one) |
| Durability | Probability that a stored object is never lost |
| Availability | Probability the service is reachable to serve a request right now |

## Check yourself

A key named `raw/orders/2024/01/15/part-0001.parquet` looks like a nested folder path. Is
it actually stored in a real directory structure inside the bucket? Why does this matter
for how Athena and Glue later read S3 data by prefix?
