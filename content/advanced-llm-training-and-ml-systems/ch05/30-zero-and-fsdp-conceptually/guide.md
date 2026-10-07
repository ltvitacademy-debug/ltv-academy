# ZeRO & FSDP, Conceptually

Lesson 28 pointed out the real cost of plain data parallelism: every GPU holds a full, redundant copy of the weights, the gradients, and the optimizer state, even though each replica only ever needs its own slice during the actual computation. Lesson 29 solved the "model too big" problem by restructuring the model itself across devices. This lesson solves a related but different problem with a less invasive idea: keep training *structured* like data parallelism -- same model, different data per replica -- but stop storing full redundant copies of everything on every GPU. That idea is ZeRO, and PyTorch's native implementation of essentially the same idea is FSDP.

## What you'll learn

- Why plain data parallelism's redundancy is wasteful, and what ZeRO shards instead
- ZeRO's three stages: optimizer state, then gradients, then parameters
- FSDP as PyTorch's native equivalent of ZeRO stage 3
- The mechanism: shards are gathered on demand, then freed again
- The real trade-off: less memory per GPU in exchange for more communication

## The redundancy ZeRO removes

In plain DDP, every one of N GPUs stores a complete copy of the model's parameters, a complete copy of the gradients, and a complete copy of the optimizer state. For AdamW, the optimizer state alone (two extra float32 moment buffers per parameter) is typically the single largest consumer of memory -- larger than the model weights themselves at mixed precision. ZeRO's insight is that none of this needs to be fully redundant: each GPU can own just a 1/N shard of the optimizer state (or gradients, or parameters), and reconstruct the rest on demand via communication with the other GPUs, exactly when it's needed and no longer.

## ZeRO's three stages

ZeRO (Zero Redundancy Optimizer) is implemented as three progressively more aggressive stages, each sharding more of the memory-heavy state:

- **Stage 1** shards only the optimizer state across the data-parallel group. Gradients and parameters remain fully replicated. This alone removes the biggest redundant cost (AdamW's moment buffers) with the smallest change to communication patterns.
- **Stage 2** additionally shards the gradients -- each GPU only ends up holding the gradient shard it needs to update its own parameter shard, rather than a full gradient copy.
- **Stage 3** additionally shards the parameters themselves. No GPU holds the full model at rest; each layer's full weights are gathered (via all-gather) just before they're needed for that layer's forward or backward computation, then freed immediately afterward.

Each stage trades more memory savings for more communication: stage 3 uses the least memory per GPU but requires gathering parameter shards continuously throughout the forward and backward pass, not just once per step.

```json
{
  "zero_optimization": {
    "stage": 3,
    "offload_optimizer": { "device": "cpu" },
    "offload_param": { "device": "cpu" },
    "overlap_comm": true,
    "contiguous_gradients": true
  }
}
```

This is a real DeepSpeed configuration fragment: `stage: 3` turns on full parameter, gradient, and optimizer-state sharding, and the `offload_*` options push the sharded state further out to CPU memory (or NVMe) when even the shards don't fit in GPU memory.

## FSDP: PyTorch's native equivalent

PyTorch's `FullyShardedDataParallel` (FSDP) implements the same core idea -- roughly equivalent to ZeRO stage 3 -- as a first-class, native PyTorch API rather than a separate framework layer. A model is wrapped with an auto-wrap policy that decides how to partition it into shardable units (commonly one transformer block at a time):

```python
from torch.distributed.fsdp import FullyShardedDataParallel as FSDP
from torch.distributed.fsdp import ShardingStrategy
from torch.distributed.fsdp.wrap import transformer_auto_wrap_policy

model = FSDP(
    model,
    sharding_strategy=ShardingStrategy.FULL_SHARD,
    auto_wrap_policy=transformer_auto_wrap_policy,
)
```

`ShardingStrategy.FULL_SHARD` is FSDP's ZeRO-stage-3-equivalent mode; `SHARD_GRAD_OP` corresponds roughly to ZeRO stage 2 (shard gradients and optimizer state, keep parameters gathered during compute). Hugging Face's Accelerate and Trainer both support launching training with an FSDP configuration directly, without hand-writing the wrap logic.

## The trade-off: memory for communication

None of this is free. Because stage-3/FULL_SHARD sharding reconstructs each layer's parameters right before they're used, the volume of communication per training step goes up compared to plain DP or even ZeRO stage 1 or 2 -- there's an all-gather for every sharded unit's forward pass and another for its backward pass, on top of the usual gradient reduction. That's why the choice of ZeRO/FSDP stage is a real trade-off, not a strictly-better upgrade: pick the least aggressive stage that actually lets your model and batch size fit, since every stage beyond that buys memory headroom at the cost of extra communication time.

## Key terms

- **ZeRO (Zero Redundancy Optimizer)** -- shards optimizer state, gradients, and/or parameters across data-parallel replicas instead of replicating them
- **ZeRO stage 1/2/3** -- progressively shard optimizer state, then gradients, then parameters
- **FSDP (Fully Sharded Data Parallel)** -- PyTorch's native implementation, roughly equivalent to ZeRO stage 3
- **All-gather** -- the collective operation that reconstructs a full parameter (or shard) from pieces held across GPUs, on demand
- **Offloading** -- pushing sharded optimizer or parameter state further out to CPU or NVMe when GPU memory still isn't enough
