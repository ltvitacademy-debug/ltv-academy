# Script — Pinned Memory & Data Transfer

## Segment 1 (title)

Getting a tensor onto the GPU is a transfer over PCIe, and that transfer can be fast or slow depending on one easily missed detail: whether the source memory is pinned.

## Segment 2 (steps)

Ordinary pageable host memory can be moved by the operating system at any time, so a direct memory access transfer from it has to go through an extra staging copy the driver manages. Pinned memory is guaranteed to stay at a fixed physical address, so the GPU's DMA engine can transfer it directly, skipping that staging copy and getting measurably higher bandwidth.

## Segment 3 (code)

The most common way to get pinned memory is pin_memory=True on a DataLoader, so every batch tensor it produces is already page-locked before it reaches your training loop. You can also pin a single tensor manually, though it's used selectively, since locking physical pages isn't free.

## Segment 4 (code)

non_blocking=True on a dot-to call asks PyTorch to issue the copy asynchronously instead of waiting for it to finish. But that only actually behaves asynchronously if the source tensor is pinned — on ordinary pageable memory the driver has no choice but to copy synchronously regardless of the flag, so non_blocking silently becomes a no-op without pin_memory upstream.

## Segment 5 (outro)

The real payoff is overlap: while the GPU computes on one batch, the next batch's pinned, non-blocking transfer can happen concurrently, so data movement hides behind compute instead of stalling it. Up next, lesson twenty: automatic mixed precision, revisited — doing the math itself in a cheaper format.
