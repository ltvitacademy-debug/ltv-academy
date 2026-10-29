# Lesson 12 — Checkpointing and Fault Tolerance for Long Training Runs

**Chapter 3 · Distributed Training Infrastructure · Lesson 4 of 4**

## What you'll learn

- Why a training run spanning days or weeks across hundreds of GPUs
  makes failure a near-certainty, not an edge case
- What actually has to go into a checkpoint for it to be useful, and
  why that's more than just the model weights
- The real trade-off between checkpointing often (safety) and
  checkpointing rarely (overhead), and how teams tune it
- How checkpoint cadence maps onto the RPO/RTO language from this
  path's resilience and disaster-recovery course

## At scale, hardware failure stops being rare

A single GPU might run for months between hardware issues. A cluster
of 512 or 1,024 GPUs, running continuously for days or weeks, does
not get that luxury — the probability that *at least one* GPU, NIC,
or node fails during the run climbs sharply with GPU-hours, simply
because there are so many components that each have some nonzero
failure rate. On top of hardware failure, large training jobs are
also disrupted by preemption on spot/preemptible capacity, driver
crashes, NCCL communication errors, and plain software bugs.

Without any fault-tolerance strategy, a single failure on day 12 of a
3-week training run would mean losing all 12 days of progress and
starting over from scratch. At the GPU-hour costs involved in training
a large model, that's not an inconvenience — it can be a budget-ending
mistake. Checkpointing exists to make a single failure cost minutes or
hours, not days.

## What a real checkpoint actually contains

A checkpoint has to capture everything needed to resume training as if
the failure never happened, which is more than just "the model":

- **Model weights** — the parameters themselves, sharded across
  whichever GPUs hold them under the parallelism strategy in use.
- **Optimizer state** — Adam's per-parameter moment estimates (the
  same large memory consumer from Lesson 9) have to be saved too, or
  resumed training effectively restarts the optimizer from scratch
  and destabilizes.
- **Training step / epoch counter** — so the learning-rate schedule
  and data iteration resume at the right point, not step zero.
- **RNG (random number generator) state** — for data shuffling and
  dropout, so resumed training is as reproducible as possible.
- **Data loader position** — which shard/offset in the dataset
  training had reached, so resuming doesn't skip or re-feed data
  unpredictably.

Because the model is sharded across many GPUs under data, tensor, and
pipeline parallelism, a full checkpoint is itself a large, distributed
write — each GPU (or each data-parallel replica) typically writes its
own shard of the checkpoint in parallel to shared, durable storage
(an object store or a parallel filesystem), rather than funneling
everything through one node.

## The real trade-off: checkpoint frequency vs. overhead

Checkpointing isn't free. Writing a large model's full state —
multiplied by however many bytes of optimizer state from Lesson 9 — to
durable storage takes real time and real I/O bandwidth, and if that
write blocks training, it's wasted GPU time on every single checkpoint.
That creates a genuine trade-off:

- **Checkpoint too rarely**, and a failure loses more progress — more
  GPU-hours wasted when it happens.
- **Checkpoint too often**, and the overhead of writing checkpoints
  itself eats into total training throughput, slowing down the run
  even when nothing fails.

In practice, teams tune checkpoint interval based on cluster size and
observed failure rates, and increasingly rely on **asynchronous
checkpointing** — writing the checkpoint to fast local/host memory
first and letting training continue immediately, while the data is
flushed to durable storage in the background. This decouples
checkpoint overhead from blocking GPU time, letting teams checkpoint
more frequently without paying the full I/O cost on the training
critical path.

## This is RPO/RTO, applied to a training job

This course's path already covered resilience and disaster recovery
in terms of RPO (Recovery Point Objective — how much data/progress you
can afford to lose) and RTO (Recovery Time Objective — how long you
can afford to be down). Training checkpointing is the exact same
trade-off in a different setting:

- The **checkpoint interval** is the RPO — if you checkpoint every 30
  minutes, you can lose at most 30 minutes of training progress to any
  single failure.
- The **time to detect a failure, restart the job, and load the last
  checkpoint** is the RTO — how long the cluster sits idle before
  training resumes.

A well-run training job, like a well-run production system, picks a
checkpoint interval deliberately, based on what a failure actually
costs — not by default, and not by accident.

## Key terms

| Term | Meaning |
|---|---|
| Checkpoint | A saved snapshot of everything needed to resume training: weights, optimizer state, step counter, RNG state, data position |
| Asynchronous checkpointing | Writing checkpoint data to fast local storage first and flushing to durable storage in the background, without blocking training |
| RPO (Recovery Point Objective) | Maximum acceptable progress loss; maps directly to checkpoint interval in a training job |
| RTO (Recovery Time Objective) | Maximum acceptable downtime; maps to how long it takes to detect a failure and resume from the last checkpoint |

## Check yourself

You're ready to move on when you can explain, without looking: why is
hardware failure a near-certainty rather than an edge case on a
large, long-running training cluster, what has to be in a checkpoint
besides the model weights, and how does checkpoint interval map onto
the RPO/RTO language from this path's resilience content?
