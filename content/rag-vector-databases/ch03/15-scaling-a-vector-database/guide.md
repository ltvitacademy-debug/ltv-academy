# Lesson 15 — Scaling a Vector Database

**Chapter 3 · Vector Databases · Lesson 15 of 31**

## What you'll learn

- The two directions a vector database actually has to scale in
- A real, vendor-published formula for estimating how much RAM a collection needs
- Vertical vs. horizontal scaling, shown on a real cluster console
- Why monitoring, not guessing, is what tells you when it's time to scale

## Two directions of growth

A RAG pipeline that works great in a demo with 10,000 chunks can hit two completely different
walls in production: more **data** (millions of chunks instead of thousands) and more
**throughput** (hundreds of concurrent users querying at once instead of just you). Scaling a
vector database means addressing both — and every cluster, on every vendor, starts the same way:
provisioned through a console like this one.

![Qdrant Cloud's "Create a cluster" page, showing Cloud Provider options (AWS, GCP, Azure, Hybrid Cloud), a Region picker with North America and Europe options, a generated cluster Name field, and a Cluster Settings panel for choosing the Qdrant version.](/courses/rag-vector-databases/ch03/15-scaling-a-vector-database/qdrant-cloud-create-cluster.png)
*Every cluster, however it eventually scales, starts as a choice of provider, region, and starting size.*
Source: [Qdrant Documentation — Creating a Qdrant Cloud Cluster](https://qdrant.tech/documentation/cloud/create-cluster/)

## A real formula for RAM

HNSW (Lesson 12) keeps its graph largely in memory for speed, which means RAM is usually the
first resource a growing collection runs into. Qdrant's own cluster-scaling screen publishes the
exact formula it wants you to use to estimate it:

```
memory_size = vectors * dims * 4 bytes * 1.5

1,000,000 vectors x 1,536 dims x 4 bytes x 1.5
= ~9.2 GB of RAM needed
```

That's 1 million chunks, embedded at 1,536 dimensions (Lesson 8) — a real-sized RAG corpus — and
it already needs over 9 GB of RAM just to hold the index comfortably. This is exactly why
dimensionality trade-offs and quantization (compressing the stored vectors) matter in practice,
not just in theory: they directly change this number.

## Vertical vs. horizontal

Once you know you need more capacity, a cluster scales in one of two directions — shown here on
Qdrant Cloud's own "Scale your cluster" screen:

![Qdrant Cloud's "Scale your cluster" page for a cluster named "target-cluster," showing its current resources (RAM, vCPUs, Disk Space, Nodes) and two tabs, "Scale – vertical" and "Scale – horizontal," with a RAM slider for vertical scaling shown active.](/courses/rag-vector-databases/ch03/15-scaling-a-vector-database/qdrant-cloud-scale-cluster.png)
*The same cluster, the same screen — but two structurally different ways to give it more capacity.*
Source: [Qdrant Documentation — Scaling Qdrant Cloud Clusters](https://qdrant.tech/documentation/cloud/cluster-scaling/)

- **Vertical scaling**: give each existing node more RAM, CPU, or disk. Simple, and it's exactly
  the RAM slider shown above — but it has a ceiling (a single machine's maximum size) and
  typically requires a rolling restart of the node.
- **Horizontal scaling**: add more nodes, and **shard** the collection — splitting it so each
  node holds only part of the data, with **replication** (extra copies of each shard) for
  availability and extra read throughput. No hard ceiling, but it's structurally more involved.

## Knowing when to scale

None of this should be guesswork. Every managed console ships real-time monitoring so you can see
resource pressure building before it becomes an outage:

![Qdrant Cloud's "Metrics" tab for a cluster, showing a Resources graph of RAM usage over a 1-hour window, with a Node selector and time-range buttons (5M, 1H, 6H, 1D, 1W, 1MON).](/courses/rag-vector-databases/ch03/15-scaling-a-vector-database/qdrant-cloud-cluster-metrics.png)
*RAM, CPU, and disk, over whatever time window you need — the signal that tells you it's time to scale, before a collection runs out of headroom.*
Source: [Qdrant Documentation — Monitor Clusters](https://qdrant.tech/documentation/cloud/cluster-monitoring/)

## Key terms

| Term | Meaning |
|---|---|
| Vertical scaling | Giving existing nodes more RAM/CPU/disk — simple, but has a ceiling |
| Horizontal scaling | Adding more nodes and sharding the collection across them — no hard ceiling |
| Sharding | Splitting a collection so each node holds only part of the total data |
| Replication | Keeping extra copies of each shard, for availability and read throughput |

## Lab

1. Using the formula above, estimate the RAM needed for 5,000,000 vectors at 768 dimensions.
2. Explain, in your own words, why vertical scaling has a ceiling but horizontal scaling doesn't.
3. Name one metric (besides RAM) you'd want to watch on a production vector database, and why.

## Check yourself

You're ready for Chapter 4 when you can explain the difference between vertical and horizontal
scaling, and estimate a collection's RAM footprint using the real formula from this lesson.
