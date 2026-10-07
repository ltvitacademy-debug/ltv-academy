# Activation Checkpointing

The last two lessons dealt with weights, gradients, and optimizer state -- the parts of memory that ZeRO and FSDP shard across GPUs. There's a fourth big consumer of GPU memory that none of those techniques touch: **activations**, the intermediate outputs of every layer that the backward pass needs in order to compute gradients. This lesson covers the technique that targets activations specifically, and it works by doing something that sounds backwards at first: throwing activations away on purpose, and recomputing them later.

## What you'll learn

- Why activation memory scales with depth, batch size, and sequence length -- independently of parameter count
- The core trade-off: activation checkpointing spends extra compute to save memory
- The real PyTorch mechanism: `torch.utils.checkpoint.checkpoint`
- The simpler path in Hugging Face Transformers: `gradient_checkpointing_enable()`
- Why this technique stacks with every parallelism strategy from this chapter, rather than competing with them

## Why activations pile up

During the forward pass, every layer produces an output tensor that has to be kept around, because the backward pass needs it to compute that layer's local gradient via the chain rule. For a transformer, this means storing attention outputs, feed-forward activations, and layer-norm outputs for every layer, for every token in the sequence, for every example in the batch -- all simultaneously, until backward propagation finally reaches that layer and consumes it. That memory footprint scales with **depth × batch size × sequence length**, which is a separate axis entirely from the model's parameter count. A model can have "enough" memory for its weights and still run out of memory purely from activations, especially at long context lengths.

## The trade-off: recompute instead of store

Activation checkpointing (also called gradient checkpointing) breaks the model into segments and, during the forward pass, discards each segment's intermediate activations immediately after using them -- keeping only the segment's input. When the backward pass reaches that segment, it re-runs the forward pass for just that segment to reconstruct the activations it needs, then immediately computes the backward pass using them. This trades a second forward pass (extra compute, typically adding roughly 20-30% to step time) for a significant cut in peak activation memory, since most of the activations for most of the model never exist in memory at the same time.

## The real mechanism: `torch.utils.checkpoint`

PyTorch exposes this directly as a function wrapper:

```python
from torch.utils.checkpoint import checkpoint

class TransformerBlock(nn.Module):
    def forward(self, x):
        x = checkpoint(self.attention, x, use_reentrant=False)
        x = checkpoint(self.feed_forward, x, use_reentrant=False)
        return x
```

`checkpoint(fn, *args)` runs `fn` normally in the forward pass but doesn't save its intermediate activations; it instead recomputes `fn` during the backward pass when gradients are needed. `use_reentrant=False` selects PyTorch's newer, more robust checkpointing implementation (the current recommended default over the older reentrant-autograd-based one).

## The simpler path: Hugging Face Transformers

For most fine-tuning work, there's no need to hand-wrap individual blocks -- Hugging Face models expose this as a single call:

```python
model.gradient_checkpointing_enable()
```

or, equivalently, as a flag on `TrainingArguments`/`SFTConfig`:

```python
training_args = TrainingArguments(
    gradient_checkpointing=True,
    # ...
)
```

Either call applies checkpointing at the transformer-block granularity throughout the model, with no architecture-specific code needed.

## Why this stacks with everything else in this chapter

Activation checkpointing isn't an alternative to data parallelism, tensor/pipeline parallelism, or ZeRO/FSDP -- it attacks a completely different line item in the memory budget and is routinely combined with all of them. A production training config commonly enables ZeRO/FSDP sharding *and* activation checkpointing *and* data parallelism simultaneously, because each one frees up a different kind of memory. Lesson 34's full config walkthrough shows exactly this combination in one real configuration.

## Key terms

- **Activations** -- intermediate layer outputs kept in memory during the forward pass for use by the backward pass
- **Activation checkpointing (gradient checkpointing)** -- discarding activations and recomputing them during backward instead of storing them
- **`torch.utils.checkpoint.checkpoint`** -- PyTorch's function-level checkpointing API
- **`gradient_checkpointing_enable()`** -- Hugging Face Transformers' model-level shortcut for the same technique
- **Compute-memory trade-off** -- spending a second forward pass to cut peak activation memory
