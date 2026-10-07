# Script — Streaming Multiprocessors & CUDA Cores

## Segment 1 (title)

Last lesson established that a GPU wins on parallelism, not clock speed. This lesson opens the box: how are those thousands of CUDA cores actually organized, and what's a streaming multiprocessor?

## Segment 2 (steps)

A GPU isn't one flat pool of cores — it's organized into streaming multiprocessors, or SMs, each with its own CUDA cores, registers, and shared memory. An A100 has 108 SMs with 64 cores each, for 6,912 total. Every block of threads you launch gets assigned to run on one SM.

## Segment 3 (steps)

Within an SM, threads execute in groups of 32 called a warp, all running the same instruction at the same time on their own data — that's SIMT, single instruction, multiple threads. The warp, not the thread, is the real scheduling unit, which is why thread counts in CUDA code are almost always multiples of 32.

## Segment 4 (code)

Because every thread in a warp executes in lockstep, a branch where threads disagree on which path to take is expensive — the warp runs both paths serially, masking off the threads that don't apply to each one. That's warp divergence, and it can cost you a two-times slowdown.

## Segment 5 (code)

You don't need CUDA C++ to see this hierarchy — PyTorch's get device properties call exposes multi processor count directly, and that number is exactly the SM count on the card.

## Segment 6 (outro)

Hold onto the GPU-to-SM-to-core hierarchy and the idea of warps moving in lockstep. Next up, lesson three: the GPU memory hierarchy, where we look at where data actually lives relative to those SMs.
