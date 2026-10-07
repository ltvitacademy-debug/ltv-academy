# Caching Strategies for Training Data

Lesson 27 named "storage throughput, not CPU" as one of the most common data-loader bottlenecks — and one of its most common causes is reading the same shards from S3 over and over, every epoch, at full S3 latency. Training runs a dataset through many epochs, which means the same bytes get read many times. Caching turns that repetition into an advantage instead of a repeated cost. This lesson closes out Chapter 5 by covering how the Solara ML Platform team caches training data across the layers introduced in Lesson 26.

## What you'll learn

- Why repeated epochs make caching training data worth the engineering effort
- How FSx for Lustre's lazy loading functions as a cluster-wide cache in front of S3
- The role of local NVMe as a node-local cache layer
- What a cache warm-up pass is and why the first epoch of a run is special

## The case for caching: training reads the same data many times

A single epoch through Solara-70B's training corpus might take hours; a full run trains for many epochs. Every one of those passes reads largely the same shards. Paying S3's per-request latency on *every* epoch, for every node, is paying a cost that's entirely avoidable after the first read — which is exactly what caching exploits.

## Layer one: FSx for Lustre as a cluster-wide cache

Lesson 26 introduced the S3 data repository association: an FSx for Lustre filesystem linked to the `solara-checkpoints-data` bucket, lazily loading an object the first time any job reads it. In practice this makes FSx function as a **cluster-wide cache** sitting in front of S3 — the first epoch's reads are the ones that pay S3 latency, pulling shards onto FSx's SSD-backed storage, and every epoch after that reads the same shards from FSx instead, at dramatically lower latency and with the full parallel-filesystem throughput Lesson 26 described. Because the cache lives on the shared filesystem rather than on any one node, every one of solara-train's 64 nodes benefits from a shard that *any* node already pulled.

## Layer two: local NVMe as a node-local cache

Underneath the cluster-wide FSx cache, each node also has fast local NVMe scratch space. For shards a given node reads especially often — or when a job wants to avoid even FSx's network hop — the data pipeline can cache a working set of shards directly on that node's local disk. This is a smaller, node-specific cache: it doesn't help other nodes, and it's lost if the node is replaced, but it's the fastest tier available for whatever one node is actively grinding through.

## Cache warm-up and why the first epoch is different

Because the cache starts empty, the **first epoch of a run is slower than every epoch after it** — it's the one paying full S3 latency while FSx fills up. The Solara ML Platform team treats this explicitly as a **warm-up pass**: step-time measurements from epoch one aren't representative of steady-state throughput, and capacity planning (Lesson 5 of this course) should use post-warm-up numbers, not first-epoch ones. For very large datasets that won't fully fit in FSx's provisioned capacity, the team also runs an explicit pre-training warm-up job that reads through the full dataset once, specifically to populate the cache before the real training job starts billing GPU time against a cold cache.

## Cache eviction and staleness

FSx for Lustre's cache isn't unlimited — once provisioned capacity fills, older or less-recently-used data can be evicted to make room, following a roughly least-recently-used pattern. This is rarely a problem for actively-training shards (they're read every epoch, so they stay "hot"), but it means a cache sized too small for the active dataset can thrash, evicting shards that get re-requested the very next epoch. Sizing FSx capacity against the working set, not just the data read in any single pass, avoids this.

## Key terms

- **Cluster-wide cache** — a cache shared by every node, such as FSx for Lustre's lazy-loaded data from an S3 data repository association
- **Node-local cache** — a cache on one node's local disk (e.g. NVMe), benefiting only that node
- **Cache warm-up pass** — the first read-through of a dataset, during which the cache is populated and step times aren't representative
- **Cache eviction** — removing less-recently-used data from a full cache to make room for new reads

## Recap

Because training reads the same shards many times across epochs, layering a cluster-wide FSx for Lustre cache over S3 and a node-local NVMe cache underneath turns repeated reads into a one-time cost — as long as the cache is sized for the working set and the first, slower warm-up epoch is accounted for in capacity planning. That closes out Chapter 5's look at storage and data loading. Chapter 6 turns to monitoring and cost: starting with Lesson 29, GPU utilization monitoring.
