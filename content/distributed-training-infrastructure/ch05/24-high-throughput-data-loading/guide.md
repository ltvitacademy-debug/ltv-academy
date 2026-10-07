# High-Throughput Data Loading

Chapter 4 made sure Solara-70B's training run can survive a crash — checkpoints land in `solara-checkpoints` every 30 minutes, and a restart loses minutes, not days. But fault tolerance only protects progress the cluster has already made. It does nothing about a slower, quieter problem: 512 H100 GPUs that sit partially idle every single step because the data to train on hasn't arrived yet. This chapter is about making sure that never happens — starting with what "fast enough" actually means for a data loader.

## What you'll learn

- Why data loading throughput, not just network bandwidth, can bottleneck a 512-GPU job
- How to work out the throughput a training step actually requires
- The PyTorch `DataLoader` settings that matter at this scale: `num_workers`, `prefetch_factor`, `pin_memory`, `persistent_workers`
- Why streaming reads of large shards beat random reads of many small files

## GPU starvation: the bottleneck nobody notices in `nvidia-smi`

When a training step is slow, the instinct is to blame the GPUs or the network. But a very common cause is simpler: the Python-side `DataLoader` can't produce the next batch before the GPU finishes the current one, so the GPU sits idle waiting on the CPU. The Solara ML Platform team calls this **GPU starvation**, and it's dangerous precisely because it's invisible to a casual glance — the job is "running," the loss is still printing, it's just running slower than the hardware allows. Chapter 6 covers the monitoring that makes starvation visible; this lesson is about preventing it in the first place.

## Working out the throughput you actually need

Before tuning anything, it helps to know the target. Suppose Solara-70B trains with a global batch of 4 million tokens per step, a sequence length of 4,096 tokens (so roughly 1,000 sequences per step), and a measured step time of 6 seconds once compute and communication overlap well. Across 64 nodes, that's about 16 sequences per node per step, which has to be read, tokenized or deserialized, and handed to the GPU comfortably inside that 6-second window — every step, for the life of the run. The number itself matters less than the exercise: **data loading throughput is a hard requirement derived from batch size and step time, not something to leave to defaults.** If a node's loader can only sustain half that rate, the run doesn't crash — it just quietly trains at half speed.

## Tuning `DataLoader` for a training-cluster node

PyTorch's `DataLoader` has four settings that do most of the work:

```python
from torch.utils.data import DataLoader

loader = DataLoader(
    dataset,
    batch_size=16,          # per-GPU micro-batch, from the math above
    num_workers=8,          # worker subprocesses prefetching in parallel
    prefetch_factor=4,      # batches each worker queues ahead of time
    pin_memory=True,        # page-locked host memory for faster H2D copy
    persistent_workers=True,  # keep worker processes alive across epochs
    drop_last=True,
)
```

- **`num_workers`** spins up separate processes to read and preprocess data off the main training process, so decoding/tokenization doesn't block the GPU-facing loop. Too few, and the main process stalls waiting for data; too many, and workers compete for the node's CPU cores and can actually slow things down.
- **`prefetch_factor`** controls how many batches *each* worker prepares in advance. A higher value smooths out variance in per-sample read time, at the cost of more host memory.
- **`pin_memory=True`** allocates the batch in page-locked ("pinned") host memory, which lets the CUDA driver do an asynchronous, faster host-to-device copy instead of a slower pageable-memory copy.
- **`persistent_workers=True`** keeps worker processes alive between epochs instead of tearing them down and respawning them — on a 64-node job, that respawn overhead happening on every node, every epoch, adds up.

## Why sequential, streaming reads beat random small-file reads

The other half of the throughput story is *how* data is laid out, not just how it's read. Object storage like S3 has meaningful per-request latency — tens of milliseconds is typical — and a dataset split into millions of individual small files turns every sample into its own request. At 512-GPU scale, that latency multiplies into real wasted time across every rank, every step. The fix the Solara ML Platform team uses, covered in full in the next lesson, is to pack samples into larger sequential shards and stream through them, so one request pulls many samples instead of one.

## Key terms

- **GPU starvation** — GPUs sitting idle because the data loader can't keep pace with training steps
- **`num_workers`** — subprocesses that read and preprocess data in parallel with the training loop
- **`prefetch_factor`** — how many batches each worker prepares ahead of when they're needed
- **`pin_memory`** — page-locked host memory that speeds up the host-to-device copy
- **`persistent_workers`** — keeps `DataLoader` worker processes alive across epochs instead of respawning them

## Recap

A training step has a hard throughput requirement derived from batch size and step time, and `DataLoader` settings like `num_workers`, `prefetch_factor`, `pin_memory`, and `persistent_workers` are how a node meets it — along with avoiding the request-latency tax of millions of small files. Next, Lesson 25 covers how Solara AI actually lays its data out on disk to make that streaming possible: sharded datasets.
