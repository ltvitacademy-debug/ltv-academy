# Script — CPU vs. GPU Workload Characteristics

## Segment 1 (title)

This closes out the architecture chapter by making the CPU-GPU decision concrete. You know why GPUs have thousands of simple cores, how their memory is laid out, and what tensor cores add — now we turn that into a practical checklist.

## Segment 2 (steps)

A workload runs faster on a GPU when it has high arithmetic intensity, lots of independent repeatable work, and enough total volume to amortize launch and transfer overhead. A workload belongs on a CPU when it's small, branch-heavy and sequential, or I/O-bound — none of which a GPU accelerates.

## Segment 3 (code)

A typical training loop is already a CPU-GPU split, even if it doesn't look like one. The data loader's file reading, augmentation, and batching deliberately stay on the CPU, often across worker processes, while every tensor operation after dot-to-cuda runs on the GPU. A CPU-bound data loader that can't keep up is a common real bottleneck.

## Segment 4 (code)

Every tensor and model parameter in PyTorch has a device attribute you can check directly. Mixing a tensor on CPU with one on GPU in the same operation raises a runtime error at the first point they touch.

## Segment 5 (outro)

Chapter 1 is done. Next up, lesson six: the CUDA programming model, where you start writing the code that actually runs on all those cores.
