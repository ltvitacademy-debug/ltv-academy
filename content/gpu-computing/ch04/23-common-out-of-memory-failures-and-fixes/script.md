# Script — Common Out-of-Memory Failures & Fixes

## Segment 1 (title)

Every PyTorch GPU user eventually hits an out-of-memory error. This lesson closes the chapter with what actually consumes GPU memory during training and the specific fixes that match each cause, rather than reflexively lowering the batch size and hoping.

## Segment 2 (steps)

Four categories compete for the same memory pool. Parameters are a fixed cost set by the architecture. Gradients roughly double that during backward, one tensor per parameter. Optimizer state can be bigger still — Adam keeps two extra moving-average tensors per parameter. And activations, the intermediate tensors saved during forward for use in backward, scale with batch size and are usually what blows the budget first.

## Segment 3 (code)

PyTorch's out-of-memory error distinguishes allocated memory, which is actually holding live tensors, from reserved-but-unallocated memory, which is cached by the allocator for reuse but not backing anything right now. Memory_summary and max_memory_allocated give you the fuller picture of exactly where that memory went.

## Segment 4 (code)

Calling empty_cache releases that cached-but-unallocated memory back to the driver, which helps another process on the same GPU, but does nothing for memory your own tensors are actively holding — if your model genuinely needs more than fits, empty_cache won't fix that, and can even slow things down.

## Segment 5 (steps)

The fix has to match the cause. If activations dominate, gradient checkpointing recomputes them during backward instead of storing them. If you need a bigger effective batch without more memory, gradient accumulation sums gradients over several smaller passes before one optimizer step. And mixed precision roughly halves the memory for whatever it touches.

## Segment 6 (outro)

Up next, chapter five: multi-GPU node basics, starting with lesson twenty-four, NVLink and PCIe topology — how multiple GPUs are actually wired together before you can use more than one.
