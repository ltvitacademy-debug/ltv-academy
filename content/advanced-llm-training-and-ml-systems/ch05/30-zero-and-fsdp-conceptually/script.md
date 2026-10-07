# Script — ZeRO & FSDP, Conceptually

## Segment 1 (title)

Plain data parallelism stores a full redundant copy of weights, gradients, and optimizer state on every GPU. ZeRO, and PyTorch's native FSDP, keep training structured the same way -- same model, different data per replica -- but stop storing full redundant copies of everything each replica doesn't actually need at once.

## Segment 2 (steps)

ZeRO comes in three stages. Stage 1 shards just the optimizer state, which for AdamW is usually the biggest memory cost, since it holds two extra moment buffers per parameter. Stage 2 adds sharding the gradients, so each GPU only keeps the slice it needs for its own parameter shard. Stage 3 shards the parameters themselves too, so no GPU holds the full model at rest. Each stage trades more memory savings for more communication.

## Segment 3 (steps)

Under stage 3, each layer's full weights get reconstructed with an all-gather right before they're needed for that layer's forward or backward pass, and freed immediately after. That's how a model that would never fit fully-replicated on one GPU can still train -- at the cost of doing that gather-and-free dance constantly throughout the step, for every layer.

## Segment 4 (code)

PyTorch's native version is FullyShardedDataParallel, FSDP. You wrap the model with an auto-wrap policy that decides how to split it into shardable units -- typically one transformer block at a time -- and FULL_SHARD mode gives you the ZeRO-stage-3 equivalent behavior natively in PyTorch, without a separate framework layer.

## Segment 5 (outro)

None of this is free -- more sharding means more communication, so the right move is the least aggressive stage that actually fits your model and batch size, not automatically reaching for stage 3. Next: activation checkpointing, which trades extra compute for memory in a completely different part of the training step entirely.
