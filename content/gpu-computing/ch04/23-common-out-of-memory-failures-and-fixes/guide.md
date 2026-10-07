# Common Out-of-Memory Failures & Fixes

Every PyTorch GPU user eventually hits `torch.cuda.OutOfMemoryError`. This lesson closes the chapter by covering what actually consumes GPU memory during training, how to read the error and PyTorch's own memory diagnostics, and the specific fixes that match each cause — rather than reflexively lowering the batch size and hoping.

## What you'll learn

- What actually occupies GPU memory during training: parameters, gradients, optimizer state, and activations
- How to read `torch.cuda.OutOfMemoryError` and `torch.cuda.memory_summary()`
- Why `torch.cuda.empty_cache()` usually isn't the fix people think it is
- The specific techniques — gradient accumulation, gradient checkpointing, mixed precision — and which problem each one solves

## What's actually using the memory

Training memory isn't just the model's weights. Four categories compete for the same pool:

- **Parameters** — the model's weights, a fixed cost set by architecture size.
- **Gradients** — one gradient tensor per parameter, roughly doubling the parameter memory during backward.
- **Optimizer state** — Adam, for example, keeps two extra moving-average tensors per parameter (`exp_avg`, `exp_avg_sq`), which can be larger than the parameters and gradients combined.
- **Activations** — every intermediate tensor saved during the forward pass for use in backward. This is the piece that scales with batch size and sequence length, and is usually what blows the budget first.

## Reading the error and the diagnostics

```python
>>> output = model(huge_batch)
torch.cuda.OutOfMemoryError: CUDA out of memory. Tried to allocate 2.35 GiB.
GPU 0 has a total capacity of 40.00 GiB of which 1.12 GiB is free.
Process 8842 has 38.50 GiB memory in use. Of the allocated memory,
36.80 GiB is allocated by PyTorch, and 1.10 GiB is reserved by PyTorch
but unallocated.
```

The message distinguishes allocated (actually holding live tensors) from reserved-but-unallocated (cached by PyTorch's allocator for reuse, but not currently backing a tensor). `torch.cuda.memory_summary()` gives the fuller breakdown, and `torch.cuda.max_memory_allocated()` reports the peak since the last reset — useful for finding exactly which line in a training loop pushes memory over the edge.

## Why empty_cache() usually isn't the fix

```python
torch.cuda.empty_cache()
```

This releases PyTorch's cached-but-unallocated memory back to the OS/driver — useful if another process on the same GPU needs that memory, but it does nothing for the memory your own tensors are actively holding. If your model genuinely needs more memory than fits, calling `empty_cache()` won't change that; it can even slow things down by forcing the allocator to re-request memory it had already cached for reuse.

## Fixes that match the cause

- **Activations dominating (the common case)** — reduce batch size, or use **gradient checkpointing** (`torch.utils.checkpoint`), which discards intermediate activations during forward and recomputes them during backward, trading compute time for memory.
- **Need a larger effective batch size without more memory** — **gradient accumulation**: run several smaller forward/backward passes, summing gradients, before one optimizer step — same effective batch size, a fraction of the activation memory.
- **Precision is doubling everything** — mixed precision (Lesson 20) roughly halves the memory for parameters, gradients, and activations stored in the reduced dtype.
- **Optimizer state is the biggest piece** — an optimizer with less per-parameter state (SGD has none of Adam's moving averages) or an 8-bit optimizer variant reduces that specific category.
- **Fragmentation, not genuine shortage** — repeated alloc/free of varying tensor sizes can fragment the allocator's cached memory; setting the environment variable `PYTORCH_CUDA_ALLOC_CONF=expandable_segments:True` addresses this specific pattern.

## Key terms

- **`torch.cuda.OutOfMemoryError`** — PyTorch's exception when a GPU allocation can't be satisfied
- **Activations** — intermediate forward-pass tensors retained for use during backpropagation
- **Gradient checkpointing** — recomputing activations during backward instead of storing them, trading compute for memory
- **Gradient accumulation** — summing gradients over several smaller passes before one optimizer step
- **`torch.cuda.empty_cache()`** — returns PyTorch's cached-but-unallocated memory to the driver; doesn't free memory actively in use
- **Allocated vs. reserved** — allocated memory backs live tensors; reserved memory is cached by PyTorch's allocator for reuse
