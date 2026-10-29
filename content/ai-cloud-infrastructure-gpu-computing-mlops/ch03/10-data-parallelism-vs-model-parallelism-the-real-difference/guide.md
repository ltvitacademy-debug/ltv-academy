# Lesson 10 — Data Parallelism vs. Model Parallelism: The Real Difference

**Chapter 3 · Distributed Training Infrastructure · Lesson 2 of 4**

## What you'll learn

- What data parallelism actually does: the same model, fully
  replicated on every GPU, each seeing a different slice of data
- How gradient synchronization (AllReduce) keeps every replica's
  weights identical after each step
- What model parallelism actually does, and why it's a different
  solution to a different problem than data parallelism
- The two flavors of model parallelism — tensor parallelism and
  pipeline parallelism — and why real large-scale training combines
  all of this into "3D parallelism"

## Data parallelism: same model, different data

Data parallelism is the simpler, more common case, and it directly
answers the "time" problem from Lesson 9. Every GPU in the job holds
a **complete copy** of the model — same architecture, same weight
values. The training dataset is split into shards, and each GPU
processes a different mini-batch through its own copy of the model,
independently and in parallel.

After each GPU computes gradients from its own batch (the backward
pass), those gradients have to be reconciled before any weight update
happens — otherwise each replica would drift into a different model.
This is done with an **AllReduce** operation: every GPU's gradients are
summed (or averaged) across all GPUs, and the result is broadcast back
to every GPU, so each one applies the exact same update to its own
copy of the weights. After the AllReduce, every replica is identical
again, ready for the next batch.

The core requirement for data parallelism is simple: the model has to
fit, in full, on a single GPU, including its gradients and optimizer
state. If it does, data parallelism is usually the first lever pulled
to cut training time, because doubling the GPU count roughly doubles
the data throughput.

## Model parallelism: splitting the model, not the data

Model parallelism exists for the other problem from Lesson 9: the
model itself doesn't fit on one GPU, no matter how small the batch is.
Instead of copying the whole model everywhere, the model is cut into
pieces, and different GPUs hold different pieces. There are two
distinct ways to cut it:

**Tensor parallelism** splits individual layers. A single weight
matrix in a transformer's attention or feed-forward block is divided
across GPUs — for example, each GPU holds one slice of columns, computes
a partial matrix multiply against its slice, and the partial results
are combined (via another collective communication step) to produce
the full layer output. Every GPU participates in every layer, but only
on its own slice of the math.

**Pipeline parallelism** splits the model by layer groups instead of
within a layer. GPU 1 might hold layers 1–8, GPU 2 holds layers 9–16,
and so on — data flows through the pipeline stage by stage, like an
assembly line. To avoid GPUs sitting idle while waiting for data to
arrive from the previous stage, the batch is broken into smaller
**micro-batches** that are fed through the pipeline in a staggered
sequence, keeping every stage busy.

## Why real training uses both at once

Tensor parallelism needs very fast communication between GPUs (it's
communicating inside every single layer), which makes it best suited
to GPUs on the same machine connected by NVLink — the subject of
Lesson 11. Pipeline parallelism communicates only at stage boundaries,
so it tolerates slower links between machines better. Data parallelism
sits on top of both, replicating an entire tensor-parallel-plus-
pipeline-parallel "model shard" across multiple groups of machines.

Combining all three — data, tensor, and pipeline — is exactly what
practitioners mean by **3D parallelism**, the standard approach for
training the largest models, implemented in frameworks like
Megatron-LM and DeepSpeed. None of the three is a replacement for the
others; each solves a different piece of the memory-and-time problem
from Lesson 9.

## Key terms

| Term | Meaning |
|---|---|
| Data parallelism | Full model replicated per GPU; each GPU trains on a different data shard; gradients synchronized via AllReduce |
| AllReduce | A collective operation that sums/averages a value (e.g. gradients) across all GPUs and returns the result to every GPU |
| Tensor parallelism | Splitting an individual layer's weight matrix across GPUs, so every GPU computes part of the same layer |
| Pipeline parallelism | Splitting the model by groups of layers across GPUs, with micro-batches flowing through like an assembly line |

## Check yourself

You're ready for Lesson 11 when you can explain, without looking: why
does data parallelism require the model to already fit on a single
GPU, while model parallelism exists precisely for the case where it
doesn't — and what's the real difference between tensor parallelism
and pipeline parallelism as ways of splitting a model?
