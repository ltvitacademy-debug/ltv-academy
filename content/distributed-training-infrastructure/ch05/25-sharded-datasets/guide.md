# Sharded Datasets

Lesson 24 ended on a problem: millions of individual training samples stored as individual objects turn every read into its own request, and that latency tax adds up fast across 512 GPUs. The Solara ML Platform team's answer is to never store samples individually in the first place. Instead, Solara-70B's training corpus is packed into **shards** — fixed-size bundles of samples — before training ever starts. This lesson covers how sharding works and why it's the layout that makes everything in Lesson 24 possible.

## What you'll learn

- What a shard is and why datasets are packed into them before training
- The WebDataset tar-shard pattern and how it streams
- How to size and count shards relative to cluster size
- How shuffling works when data lives in sequential shards instead of random-access files

## What a shard actually is

A shard is a single file — commonly a `.tar` archive — holding hundreds or thousands of training samples packed back to back. Instead of `solara-checkpoints`-style small-object storage holding one tokenized document per object, Solara AI's data pipeline pre-processes raw text into shards like `shard-000001.tar`, `shard-000002.tar`, and so on, each a few hundred megabytes to a couple of gigabytes. Reading a shard is one sequential, streamable request instead of thousands of tiny ones — which is exactly the throughput win Lesson 24 called for.

## The WebDataset pattern

[WebDataset](https://github.com/webdataset/webdataset) is the library the Solara ML Platform team uses to read tar shards directly into a PyTorch pipeline, streaming samples off disk or object storage without ever extracting the archive:

```python
import webdataset as wds

shard_urls = "s3://solara-checkpoints-data/shards/shard-{000000..001023}.tar"

dataset = (
    wds.WebDataset(shard_urls, shardshuffle=True, resampled=True)
    .shuffle(5000)              # in-memory shuffle buffer, in samples
    .decode()
    .to_tuple("input_ids.pth", "labels.pth")
    .batched(16)
)

loader = wds.WebLoader(dataset, batch_size=None, num_workers=8)
```

`{000000..001023}` is brace expansion — 1,024 shards, one dataset. Each DataLoader worker opens and streams through whichever shards it's assigned, reading sequentially rather than seeking around.

## Sizing shards against cluster size

Two competing goals decide shard count: too few, large shards and some of the 512 GPUs starve waiting for a worker to finish streaming through its current shard with no next one ready; too many, tiny shards and the per-request overhead Lesson 24 warned about creeps back in. The practical rule the Solara ML Platform team follows is **shards should significantly outnumber the total worker count across the job** — with 64 nodes × 8 workers per node, that's 512 concurrent readers, so a dataset split into roughly 1,000+ shards gives every worker room to move to a fresh shard without the whole job waiting on stragglers.

## Shuffling without random access

True random-access shuffling — jumping to arbitrary offsets across a multi-terabyte corpus — doesn't work well against streaming object storage. WebDataset instead shuffles at two levels: **shard-level shuffling** randomizes which shard a worker reads next, and an **in-memory shuffle buffer** (the `.shuffle(5000)` above) randomizes sample order *within* a sliding window as the shard streams past. Together they give good-enough randomness for training without requiring random-access reads, and because the shard order and buffer are seeded, the shuffle is reproducible run to run — important for the resumability Chapter 4 covered.

## Key terms

- **Shard** — a fixed-size bundle (commonly a `.tar` file) of many training samples, read sequentially
- **WebDataset** — a library for streaming tar-shard datasets directly into a PyTorch pipeline
- **Shard-level shuffle** — randomizing which shard is read next
- **Shuffle buffer** — an in-memory sliding window that randomizes sample order within a streaming shard

## Recap

Sharding trades random access for sequential, streamable reads — exactly the trade Lesson 24's throughput math demanded — by packing samples into tar files sized and counted against the cluster's worker count, with two-level shuffling standing in for true random access. Next, Lesson 26 looks at the storage backends those shards actually live on: object, block, and parallel filesystems.
