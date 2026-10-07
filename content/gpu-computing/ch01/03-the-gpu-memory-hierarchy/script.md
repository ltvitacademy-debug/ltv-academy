# Script — The GPU Memory Hierarchy

## Segment 1 (title)

A GPU with thousands of cores is only fast if those cores can be fed data fast enough. This lesson covers the memory hierarchy — the different places data can live, how big and how fast each tier is, and why that gap shapes almost every performance decision ahead.

## Segment 2 (steps)

Four tiers, fastest to slowest. Registers are per-thread and fastest, but tiny. Shared memory is per-block, on-chip, roughly a hundred times faster than global memory, but capped around 164 kilobytes per SM. L2 cache sits GPU-wide between the SMs and global memory, automatically managed. Global memory, built as high bandwidth memory, is the large pool everyone means by GPU memory, and the slowest tier relative to the others.

## Segment 3 (code)

This kernel reads from global memory once into shared memory, then every thread in the block reuses that cached copy instead of going back to the slow tier repeatedly. That's the entire reason shared memory exists.

## Segment 4 (code)

You don't need CUDA C++ to see this — a PyTorch tensor moved to a GPU lives in global, HBM memory by default, and memory allocated and get device properties let you inspect exactly how much of that pool is in use.

## Segment 5 (outro)

Keep the tier order in mind: registers, shared memory, L2, global. Next up, lesson four: tensor cores and mixed precision, the specialized hardware that makes modern deep learning training fast.
