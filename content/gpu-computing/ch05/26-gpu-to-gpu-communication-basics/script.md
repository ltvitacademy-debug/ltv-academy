# Script — GPU-to-GPU Communication Basics

## Segment 1 (title)

The last lesson initialized a process group with the NCCL backend without explaining what that actually does. This lesson covers it directly: the communication pattern distributed training depends on.

## Segment 2 (steps)

In DDP, every GPU computes its own gradients from its own slice of the batch. For the model to update consistently, every GPU needs the average of all of them, identically. That combine-and-return-to-everyone operation is called an all-reduce.

## Segment 3 (steps)

A naive all-reduce has one GPU collect, average, and broadcast back — the same bottleneck DataParallel had. NCCL instead commonly uses a ring all-reduce: GPUs arranged in a logical ring, each one only ever talking to its immediate neighbor, passing partial sums around until everyone has the full result.

## Segment 4 (code)

Setting NCCL_DEBUG to INFO makes NCCL log exactly which transport it chose for each communication channel — a quick way to confirm a multi-GPU job is actually using NVLink rather than silently falling back to something slower.

## Segment 5 (outro)

All-reduce is the operation; NCCL is the library that implements it efficiently over whatever topology is available. Next up, lesson twenty-seven: checking topology with nvidia-smi topo, reading the full table this chapter has been building toward.
