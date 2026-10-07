# Occupancy & Utilization

An SM can only run so many warps at once, and most kernels don't come close to that ceiling. Occupancy tells you how close you actually got, and why — it's the metric that connects your kernel launch configuration (threads per block, registers per thread, shared memory per block) to how well the hardware's scheduler can hide memory latency behind other work.

## What you'll learn

- What occupancy means and how it's defined as a ratio of active to maximum warps per SM
- The three resources — registers, shared memory, and threads per block — that cap occupancy
- Why higher occupancy helps hide memory latency, and why it isn't automatically the only goal
- How to reason about occupancy limits without memorizing a specific GPU's numbers

## What occupancy measures

Occupancy is the ratio of active warps on an SM to the maximum number of warps that SM supports:

```
Occupancy = Active Warps per SM / Maximum Warps per SM
```

Every SM has hard limits: a maximum number of resident threads, a maximum number of resident blocks, a fixed pool of registers, and a fixed amount of shared memory. Whichever of these your kernel's configuration exhausts first determines how many blocks (and therefore warps) can be resident on that SM at the same time — and that number, divided by the SM's absolute maximum, is your occupancy.

## The three resources that cap occupancy

1. **Registers per thread.** Every thread needs a private set of registers for its local variables. If a kernel's compiled code uses more registers per thread, fewer threads (and therefore fewer blocks) fit in the SM's fixed register file.
2. **Shared memory per block.** `__shared__` memory is also a fixed pool per SM. A block that requests a large shared memory allocation leaves room for fewer concurrently resident blocks.
3. **Threads per block.** The block size you choose in the kernel launch directly affects how many blocks are needed to reach a given thread count, and how evenly they divide the SM's thread and block limits.

```c
// Launch configuration — these numbers interact with all three resources above
dim3 threadsPerBlock(256);
dim3 blocks((N + threadsPerBlock.x - 1) / threadsPerBlock.x);
myKernel<<<blocks, threadsPerBlock>>>(data, N);
```

`cudaOccupancyMaxActiveBlocksPerMultiprocessor` is the CUDA runtime API that reports, for a given kernel and block size, how many blocks can actually be resident per SM — useful for checking a configuration programmatically instead of guessing.

## Why occupancy matters: hiding latency

A warp stalled waiting on a memory load isn't doing useful work, but the SM's scheduler can switch to a different resident warp that's ready to execute instead, keeping the cores busy. The more warps resident on an SM, the more opportunities the scheduler has to hide memory latency behind other warps' compute. This is the main reason occupancy correlates with throughput on memory-bound kernels: more warps in flight means more chances to overlap waiting with useful work.

## Occupancy isn't the only goal

Higher occupancy helps up to a point, but 100% occupancy is not automatically the fastest configuration. A compute-bound kernel that already keeps its cores saturated gets little benefit from more resident warps — and a kernel that deliberately uses more registers per thread to avoid spilling to slower local memory may run faster at lower occupancy than a version that fits more warps but spills constantly. Nsight Compute, covered next, reports both achieved occupancy and the limiter (registers, shared memory, or blocks) that's capping it, so you can tell whether raising occupancy is actually the fix your kernel needs.

## Key terms

- **Occupancy** — the ratio of active warps per SM to the maximum warps that SM supports
- **Resident block** — a thread block currently scheduled and running on an SM
- **Register spilling** — when a thread needs more registers than available and falls back to slower local memory
- **Shared memory** — fast, on-chip memory shared by all threads in a block, allocated per block
- **Latency hiding** — using other resident warps' work to cover a stalled warp's memory wait
- **`cudaOccupancyMaxActiveBlocksPerMultiprocessor`** — the CUDA API that reports max resident blocks for a kernel/block-size combination
