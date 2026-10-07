# Checkpoint Storage Strategies

Lesson 18 made the case that a 512-GPU run needs a way to recover from failure without losing weeks of progress. Checkpointing is that mechanism: periodically saving enough state to resume training from close to where it left off. For Solara-70B, that means writing sharded model, optimizer, and training state to the `solara-checkpoints` S3 bucket roughly every 500 steps — about every 30 minutes. This lesson covers how that actually works with `torch.distributed.checkpoint` (DCP), and the storage decisions behind it.

## What you'll learn

- Why a 70B-parameter model's checkpoint can't be saved as one single file the way a small model's can
- How `torch.distributed.checkpoint` (DCP) saves a sharded checkpoint in parallel across all 64 nodes
- Why Solara AI checkpoints every ~500 steps (~30 minutes) instead of every step or once a day
- Why checkpoints land in S3 rather than on each node's local disk

## Why one file doesn't work at this scale

Solara-70B's weights, under FSDP, are sharded across all 512 GPUs — no single GPU ever holds the full model. A naive checkpoint approach (gather everything onto one rank, write one file) would mean that one rank's memory has to momentarily hold the entire 70B-parameter model plus optimizer state, which can be several times the parameter count in bytes once you include Adam's momentum and variance buffers. That single-rank gather is also a serialization bottleneck: every other GPU sits idle waiting for one rank to write potentially hundreds of gigabytes to storage.

## How torch.distributed.checkpoint (DCP) actually saves

DCP solves this by having every rank save its own shard in parallel, directly from the sharded state it already holds — no gather step, no single bottleneck rank:

```python
import torch.distributed.checkpoint as dcp

state_dict = {
    "model": model.state_dict(),
    "optimizer": optimizer.state_dict(),
    "step": current_step,
}

dcp.save(
    state_dict=state_dict,
    checkpoint_id="s3://solara-checkpoints/solara-70b/step-012500/",
)
```

Each of the 512 GPUs writes only the shard it already holds, all 512 writes happening concurrently to the same checkpoint directory — turning what would be one enormous sequential write into 512 small parallel ones. DCP also writes metadata describing how the shards fit back together, which is what makes a later `dcp.load` (Lesson 20) able to resume onto a *different* number of GPUs than the run that saved it.

## Choosing the checkpoint interval: every ~500 steps

Checkpointing has a real cost — writing hundreds of gigabytes to S3, even in parallel, takes time the GPUs aren't spending on the next forward/backward pass. Checkpoint too often (every step) and that overhead eats meaningfully into training throughput; checkpoint too rarely (once a day) and Lesson 18's failure math means the expected loss from a mid-run failure climbs back toward "most of a day's compute." Solara AI's platform team settled on roughly every 500 steps, about 30 minutes of wall-clock time, as the point where checkpoint overhead stays a small fraction of total training time while capping the worst-case loss from any single failure at roughly half an hour of GPU-hours across the fleet — not zero, but not weeks either.

## Why S3, not local disk

Writing checkpoints to each node's local disk would be faster, but it ties the checkpoint to that specific, possibly now-dead, node — exactly the thing a fault-tolerance mechanism can't depend on. `solara-checkpoints` in S3 is durable, independent of any single node's health, and reachable from a replacement node that gets provisioned to replace a failed one. The bandwidth cost of writing to S3 instead of local NVMe is the price paid for that independence, and at a 30-minute interval it's a cost the fleet can absorb.

## Key terms

| Term | Meaning |
|---|---|
| torch.distributed.checkpoint (DCP) | PyTorch API for saving/loading a sharded checkpoint in parallel across ranks |
| Sharded checkpoint | A checkpoint split across many files, one (or more) per rank, with metadata describing reassembly |
| Checkpoint interval | How often a checkpoint is written; trades steady-state overhead against worst-case failure loss |
| solara-checkpoints | Solara AI's S3 bucket holding all Solara-70B checkpoints, independent of any single node |

## Recap

DCP's parallel, sharded saves make it possible to checkpoint a 70B-parameter model every 30 minutes without each save becoming its own bottleneck, and writing to S3 instead of local disk means a checkpoint survives the exact node failures it exists to protect against. Next lesson: Resuming a Large Training Job, covering the other half of DCP — `dcp.load`.
