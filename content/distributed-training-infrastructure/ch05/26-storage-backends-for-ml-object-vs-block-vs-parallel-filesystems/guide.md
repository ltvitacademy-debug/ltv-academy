# Storage Backends for ML: Object, Block & Parallel Filesystems

Lesson 25 assumed Solara-70B's shards live somewhere the 512-GPU cluster can stream from — but "somewhere" is actually a real decision with real trade-offs. The Solara ML Platform team has three fundamentally different kinds of storage to choose from for training data, and picking the wrong one for a given job shows up directly as idle GPUs. This lesson lays out what each one is actually good at.

## What you'll learn

- The three storage categories: object, block, and parallel filesystem — and what each one is built for
- Why block storage doesn't work as *shared* training-data storage across many nodes
- Real throughput and latency characteristics of S3 versus FSx for Lustre
- How Solara AI actually combines object and parallel filesystem storage rather than choosing just one

## Object storage: S3

Amazon S3 is where Solara AI's raw and sharded training data lives at rest — cheap, durable, effectively unlimited in capacity, and accessed over HTTP as whole objects rather than as a mounted filesystem. Its throughput scales horizontally rather than per-file: a single S3 prefix supports **at least 3,500 PUT/COPY/POST/DELETE or 5,500 GET/HEAD requests per second**, and that limit multiplies with each additional prefix a workload spreads its objects across. The catch is per-request latency — typically tens of milliseconds — which is exactly why Lesson 25's shard-and-stream pattern exists: it turns millions of small-object requests into a few thousand large sequential ones.

## Block storage: fast, but not shared

Block storage — Amazon EBS and equivalents — attaches to a *single* compute instance as a raw volume, the way a local SSD would. It delivers excellent IOPS and low latency for that one node, which is why it's a fine choice for a node's OS disk or local scratch space. What it can't do is serve as **shared** training-data storage across 64 nodes at once: an EBS volume is attached to one instance, full stop. Mentioning it mainly rules it out — training clusters need storage every node can read concurrently, which block storage by itself isn't built for.

## Parallel filesystem: FSx for Lustre

Amazon FSx for Lustre is a distributed, POSIX-compliant filesystem that many nodes mount concurrently and that spreads a single file's data across many backing disks for genuinely parallel I/O. AWS documents FSx for Lustre moving data to and from S3 at **up to hundreds of gigabytes per second** in aggregate, with EFA-enabled file systems supporting up to 700 Gbps of per-client throughput — numbers object storage's per-request model doesn't reach for a single consumer. The feature the Solara ML Platform team actually relies on is the **S3 data repository association (DRA)**: an FSx for Lustre filesystem can link directly to the `solara-checkpoints-data` S3 bucket and **lazily load** objects the first time a job reads them, after which that data lives on FSx's high-performance SSD storage with far lower latency than S3 for every read after the first.

## How Solara AI actually combines them

In practice, the choice isn't "S3 or FSx" — it's both, in layers: S3 holds the durable, cheap source of truth for every shard Solara AI has ever produced; FSx for Lustre, linked to that bucket via a DRA, acts as a high-throughput, low-latency cache in front of it for whichever shards the current training job is actively reading. Lesson 28 goes deeper on exactly this caching pattern. Local NVMe on each node (effectively block storage) handles OS scratch space and short-lived temp files, but never the shared dataset itself.

## Key terms

- **Object storage (S3)** — durable, cheap, horizontally scalable storage accessed as whole objects over HTTP; real per-request latency
- **Block storage (EBS)** — a raw volume attached to a single instance; fast, but not shared across nodes
- **Parallel filesystem (FSx for Lustre)** — a POSIX filesystem many nodes mount concurrently, with I/O spread across many backing disks
- **Data repository association (DRA)** — a link between an FSx for Lustre filesystem and an S3 bucket, enabling lazy-loaded caching

## Recap

Object storage is the durable source of truth, block storage is fast but node-local, and a parallel filesystem like FSx for Lustre bridges the two — mountable by every node, and lazily cached from S3 via a data repository association. Next, Lesson 27 looks at what happens when the storage layer *isn't* the bottleneck but the data loader still is: diagnosing data loader bottlenecks.
