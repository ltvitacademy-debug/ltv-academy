# Script — Occupancy & Utilization

## Segment 1 (title)

An SM can only run so many warps at once, and most kernels don't come close to that ceiling. Occupancy tells you how close you actually got, and why — it connects your kernel's launch configuration to how well the hardware can hide memory latency behind other work.

## Segment 2 (steps)

Three resources cap how many warps fit on an SM at once. Registers per thread come out of a fixed register file shared by the whole SM. Shared memory per block comes out of another fixed pool. And threads per block decides how evenly your blocks divide up against both of those limits — whichever resource runs out first sets your occupancy.

## Segment 3 (code)

The threads-per-block and blocks you choose at kernel launch interact directly with those three resources, and the CUDA runtime has a function, cudaOccupancyMaxActiveBlocksPerMultiprocessor, that reports exactly how many blocks can be resident per SM for a given configuration — so you can check it instead of guessing.

## Segment 4 (steps)

A warp stalled on a memory load isn't doing useful work, but the SM's scheduler can switch to a different resident warp that's ready to go, keeping the cores busy. More resident warps means more chances to hide that latency. But it's not automatically the only goal — a compute-bound kernel that's already saturating its cores gains little from more warps, and sometimes using more registers per thread to avoid spilling beats cramming in more warps.

## Segment 5 (outro)

Occupancy tells you how many warps are in flight; it doesn't tell you whether that's even the bottleneck. Up next, lesson fifteen: profiling with nvidia-smi, where you start reading these numbers directly off a running GPU.
