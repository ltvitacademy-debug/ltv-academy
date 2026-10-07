# Script — Activation Checkpointing

## Segment 1 (title)

The last two lessons dealt with weights, gradients, and optimizer state. There's a fourth big memory consumer none of those techniques touch: activations, the intermediate outputs every layer produces that the backward pass needs. This lesson covers a technique that throws activations away on purpose, then recomputes them later.

## Segment 2 (steps)

Activation memory scales with depth times batch size times sequence length -- a completely separate axis from parameter count. Every layer's output has to be kept around, for every token, for every example in the batch, all at once, until backward propagation finally reaches that layer. At long context lengths, that alone can exhaust memory even when the weights fit comfortably.

## Segment 3 (steps)

Activation checkpointing breaks the model into segments and discards each segment's activations right after using them in the forward pass, keeping only the segment's input. When backward reaches that segment, it re-runs the forward pass just for that piece to reconstruct what it needs, then computes the gradient. That's a second forward pass -- more compute -- in exchange for a major cut in peak memory.

## Segment 4 (code)

In PyTorch, this is torch.utils.checkpoint.checkpoint, wrapping whichever submodule you want checkpointed, with use_reentrant=False as the current recommended setting over the older reentrant-autograd implementation. In Hugging Face Transformers, it's even simpler: one call, model.gradient_checkpointing_enable, applied at the transformer-block level automatically, with no architecture-specific code needed.

## Segment 5 (outro)

This isn't an alternative to data parallelism or ZeRO or FSDP -- it attacks a different line item in the memory budget entirely, and production configs typically turn all of them on together at once. Next: with four techniques now on the table, how do you actually choose which ones to combine for a given model and cluster.
