# Checkpointing at Scale

Everything in the last chapter — pretraining, SFT, LoRA, QLoRA — assumed a training run that actually finishes. At the scale this course is about, that assumption breaks: a run spanning days or weeks across hundreds of GPUs *will* hit a hardware fault, a network blip, or a preemption before it reaches its last step. Checkpointing is the mechanism that turns "the run died" from a catastrophe into an inconvenience. This lesson covers what has to be saved, why naive checkpointing doesn't scale, and the sharded, asynchronous approaches real training stacks use.

## What you'll learn

- What a full training checkpoint actually contains, beyond just model weights
- Why saving a single consolidated file doesn't scale to large models or large clusters
- Sharded checkpointing with `torch.distributed.checkpoint` and framework-native equivalents
- Asynchronous checkpointing and why it matters for GPU utilization
- How checkpoint frequency trades off against both wasted compute and I/O overhead

## What's actually in a checkpoint

A training checkpoint is more than model weights. To resume a run and get the *same* trajectory it would have had without the interruption, you need: the model parameters, the optimizer state (for Adam, this includes first and second moment estimates — often 2x the size of the parameters themselves), the learning-rate scheduler state, the current step/epoch counter, and the data loader's position in the dataset so you don't re-train on data you've already seen. Skipping the optimizer state is a common shortcut that silently degrades resumed training — Adam's moment estimates took many steps to warm up, and restarting them from zero causes a visible loss spike right after resume.

## Why naive checkpointing doesn't scale

The simplest approach — gather every shard of a distributed model onto one rank and write a single consolidated file — works fine for a model that fits in one GPU's memory. At the scale where you're using FSDP or DeepSpeed ZeRO to shard parameters and optimizer state across dozens or hundreds of GPUs, that single-file approach means one rank has to materialize the *entire* model and optimizer state in memory just to write it out, which can exceed that rank's memory even though the sharded training itself never does. It also serializes all the I/O through one rank's network and disk bandwidth, turning a save that could be parallel into a bottleneck every rank has to wait on.

## Sharded checkpointing

The fix is to have each rank write only the shard it already holds, directly, with no cross-rank gather. PyTorch's `torch.distributed.checkpoint` (DCP) module is built for exactly this: each rank writes its local shard to a shared filesystem path, and on load, DCP redistributes shards to whatever parallelism layout the resuming job uses — which doesn't even have to match the layout that saved it (useful if you resume with a different number of GPUs).

```python
import torch.distributed.checkpoint as dcp
from torch.distributed.checkpoint.state_dict import get_state_dict, set_state_dict

# Saving: each rank contributes only its local shard
model_state, optim_state = get_state_dict(model, optimizer)
dcp.save(
    state_dict={"model": model_state, "optim": optim_state, "step": step},
    checkpoint_id="./checkpoints/step-12000",
)

# Loading: DCP redistributes shards to the current parallelism layout
state_dict = {"model": model_state, "optim": optim_state, "step": step}
dcp.load(state_dict=state_dict, checkpoint_id="./checkpoints/step-12000")
set_state_dict(model, optimizer, model_state_dict=state_dict["model"], optim_state_dict=state_dict["optim"])
```

DeepSpeed takes the same sharded approach through its own API — `model_engine.save_checkpoint(ckpt_dir)` and `model_engine.load_checkpoint(ckpt_dir)` write and read per-rank partition files under the hood, with an option to consolidate to a single fp32 file later via DeepSpeed's offline `zero_to_fp32.py` utility for deployment, not for resuming training.

## Asynchronous checkpointing and frequency trade-offs

Even sharded, a checkpoint write of a large model's state is seconds to minutes of disk I/O — time the GPUs would otherwise spend idle waiting for the save to finish before the next step starts. Asynchronous checkpointing (DCP supports this via `dcp.async_save`) copies state to pinned host memory quickly and lets the actual disk write happen on a background thread while training continues, overlapping I/O with compute instead of blocking on it. This changes the calculus on checkpoint frequency: checkpointing too rarely risks losing a large amount of compute to a failure between saves, while checkpointing too often adds I/O overhead and storage cost even with async saves. A common practice is to checkpoint every few hundred to low-thousands of steps, tuned against the cluster's observed failure rate from Lesson 36.

## Key terms

- **Checkpoint** — a saved snapshot of model weights, optimizer state, scheduler state, step counter, and data loader position, sufficient to resume training identically
- **Sharded checkpointing** — each rank saves only the parameter/optimizer shard it already holds locally, with no cross-rank gather
- **`torch.distributed.checkpoint` (DCP)** — PyTorch's native module for sharded, resharding-capable checkpoint save/load
- **Asynchronous checkpointing** — overlapping the checkpoint write with continued training compute instead of blocking on it
- **Resharding** — loading a checkpoint saved under one parallelism layout into a job running a different layout (e.g., a different GPU count)
