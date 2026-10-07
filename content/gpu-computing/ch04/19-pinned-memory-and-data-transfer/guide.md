# Pinned Memory & Data Transfer

Getting a tensor onto the GPU is a transfer over PCIe, and that transfer can be fast or slow depending on one easily-missed detail: whether the source memory is pinned. This lesson covers what pinned (page-locked) memory is, how to use it in PyTorch's `DataLoader`, and why `non_blocking=True` only actually helps when memory is pinned.

## What you'll learn

- What page-locked (pinned) host memory is, and why it transfers faster than ordinary memory
- How to enable it with `DataLoader(pin_memory=True)` and `tensor.pin_memory()`
- Why `non_blocking=True` has no effect on an unpinned tensor
- How overlapping transfer with compute using streams depends on pinned memory

## Why pinned memory transfers faster

Ordinary (pageable) host memory can be moved by the operating system's virtual memory manager at any time — paged out to disk, relocated, swapped. Because of that, a direct memory access (DMA) transfer from pageable memory to the GPU has to go through an intermediate staging buffer that the driver manages, costing an extra copy. **Pinned** (page-locked) memory is guaranteed by the OS to stay at a fixed physical address, so the GPU's DMA engine can transfer it directly — skipping that staging copy entirely. The result is measurably higher host-to-device bandwidth for pinned sources.

## Enabling pinned memory in PyTorch

The most common way to get pinned memory is through the `DataLoader`:

```python
loader = torch.utils.data.DataLoader(
    dataset, batch_size=64, pin_memory=True, num_workers=4
)
```

With `pin_memory=True`, each batch tensor the `DataLoader` produces is already allocated in page-locked memory before it reaches your training loop. You can also pin a tensor manually:

```python
x = torch.randn(1024, 1024)
x_pinned = x.pin_memory()      # returns a new tensor in page-locked memory
```

Pinning memory isn't free — it's a system call that locks physical pages, and over-pinning can starve the rest of the system's memory — so it's used selectively for data that's about to be transferred repeatedly, like dataloader batches, not for every tensor in a program.

## non_blocking=True only works with pinned memory

`.to(device, non_blocking=True)` asks PyTorch to issue the host-to-device copy asynchronously, returning control to the CPU immediately instead of waiting for the transfer to finish:

```python
for inputs, labels in loader:        # loader has pin_memory=True
    inputs = inputs.to(device, non_blocking=True)
    labels = labels.to(device, non_blocking=True)
    outputs = model(inputs)
```

This only actually behaves asynchronously if the source tensor is pinned. On ordinary pageable memory, the CUDA driver has no choice but to perform the copy synchronously regardless of the flag, because it first has to stage the data through a pinned buffer it controls — so `non_blocking=True` silently becomes a no-op without `pin_memory=True` upstream.

## Overlapping transfer with compute

The real payoff of async, pinned transfers is overlap: while the GPU is busy computing on batch N, the next batch's host-to-device copy can be happening concurrently on a separate CUDA stream, so it's ready the moment the GPU finishes. This is exactly what `pin_memory=True` combined with `non_blocking=True` sets up — the `DataLoader`'s prefetching and the asynchronous copy let data movement hide behind compute instead of happening in series with it, which is often the difference between a GPU that's starved every iteration and one that stays busy.

## Key terms

- **Pageable memory** — ordinary host memory the OS can move or swap at any time
- **Pinned (page-locked) memory** — host memory fixed at a physical address, enabling direct DMA transfer
- **DMA (Direct Memory Access)** — the GPU transferring data without CPU involvement in the copy itself
- **`pin_memory=True`** — a `DataLoader` option that allocates batches in pinned memory
- **`non_blocking=True`** — requests an asynchronous transfer; only effective when the source is pinned
- **Transfer/compute overlap** — hiding the next batch's transfer behind the current batch's GPU compute
