# Script — Caching Strategies for Training Data

## Segment 1 (title)

Lesson 27 named storage throughput as one of the most common data-loader bottlenecks, and one of its most common causes is reading the same shards from S3 over and over, every epoch, at full S3 latency. Training runs a dataset through many epochs, so the same bytes get read many times. Caching turns that repetition into an advantage instead of a repeated cost.

## Segment 2 (steps)

There are two cache layers at play, with two different scopes. FSx for Lustre, linked to S3 through the data repository association from Lesson 26, functions as a cluster-wide cache: the first node to read a shard pulls it from S3, and after that every one of the sixty-four nodes reads it from FSx instead, at much lower latency. Underneath that, each node also has fast local NVMe scratch space it can use as a node-local cache — faster still, but it only helps that one node.

## Segment 3 (code)

In practice this is automatic, not something the training script has to manage. The first epoch's reads pay S3 latency and populate FSx's SSD-backed storage. Every epoch after that reads the same shards straight from FSx, at the parallel filesystem throughput Lesson 26 described.

## Segment 4 (steps)

Because the cache starts empty, the first epoch of a run is slower than every epoch after it — it's the one paying full S3 latency while the cache fills up. The Solara ML Platform team treats this explicitly as a warm-up pass: step-time numbers from epoch one aren't representative, and capacity planning should use post-warm-up, steady-state numbers instead.

## Segment 5 (outro)

Layering a cluster-wide FSx cache over S3 and a node-local NVMe cache underneath turns repeated reads into a one-time cost, as long as the first epoch is accounted for. That closes out Chapter 5. Chapter 6 turns to monitoring and cost, starting with Lesson 29: GPU utilization monitoring.
