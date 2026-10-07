# Compute-Bound vs. Memory-Bound Operations

Every kernel that runs on a GPU spends its time doing one of two things: performing arithmetic, or waiting for data to arrive from memory. Which one dominates determines what "faster" even means for that kernel — more compute throughput won't help a kernel that's stuck waiting on memory, and a wider memory bus won't help one that's already saturating the cores. This lesson gives you the vocabulary and the back-of-envelope math to tell the two apart before you reach for a profiler.

## What you'll learn

- What arithmetic intensity is and how it's calculated from FLOPs and bytes moved
- The roofline model, and how it visualizes a kernel's achievable performance ceiling
- Why operations like matrix multiplication and elementwise addition land on opposite sides of that line
- How knowing which side a kernel is on changes what optimization is actually worth trying

## Arithmetic intensity: FLOPs per byte

Arithmetic intensity is the ratio of floating-point operations performed to bytes of data moved from memory to perform them:

```
Arithmetic Intensity = Total FLOPs / Total Bytes Moved
```

A kernel with high arithmetic intensity does a lot of math per byte it reads — it's compute-bound, limited by how fast the cores can crunch numbers. A kernel with low arithmetic intensity moves a lot of data relative to the math it does on that data — it's memory-bound, limited by how fast bytes can travel over the memory bus, regardless of how many idle cores are sitting around.

## The roofline model

The roofline model plots achievable performance (FLOPs/second) against arithmetic intensity (FLOPs/byte) on a log-log chart. It has two regimes, separated by a "ridge point":

- A sloped line on the left: performance is capped by memory bandwidth. Every kernel in this region, no matter how well written, can't exceed `bandwidth × arithmetic intensity`.
- A flat line on the right: performance is capped by the GPU's peak compute throughput. Kernels here are bound by the number and speed of the cores, not by memory.

A kernel's position on this chart — determined entirely by its own arithmetic intensity — tells you which ceiling it's actually hitting, and therefore which ceiling is worth trying to raise.

## Where common ML operations fall

- **General matrix multiply (GEMM)**, the core of linear layers and attention projections, reuses each loaded value many times across the multiply-accumulate pattern. It has high arithmetic intensity and is typically compute-bound on modern GPUs — this is exactly what Tensor Cores are built to accelerate.
- **Elementwise operations** — activation functions like ReLU or GELU, bias adds, dropout masks — read one value, do one or two operations, and write one value back. Arithmetic intensity is near 1, so these are memory-bound: the GPU spends most of its time waiting on the memory bus, not computing.
- **Reductions** (sum, softmax normalization, batch norm statistics) are also typically memory-bound, since each element is touched only a small, fixed number of times.

## Why the distinction changes what you optimize

If a kernel is memory-bound, adding more compute (a "faster" algorithm with more FLOPs but the same data movement) won't help — you need to reduce bytes moved, for example by fusing several elementwise ops into one kernel so data stays in registers or shared memory between steps instead of round-tripping to global memory. If a kernel is compute-bound, the opposite holds: reducing memory traffic won't move the needle, but switching to lower precision (FP16/BF16 math on Tensor Cores) or restructuring the algorithm to do fewer FLOPs will. Profiling tools like Nsight Compute, covered later in this chapter, report a kernel's achieved occupancy and throughput against both roofs directly, so you don't have to estimate arithmetic intensity by hand in practice — but knowing the concept is what makes those numbers mean something.

## Key terms

- **Arithmetic intensity** — the ratio of FLOPs performed to bytes moved from memory
- **Compute-bound** — a kernel limited by the GPU's peak arithmetic throughput
- **Memory-bound** — a kernel limited by memory bandwidth, not by core speed
- **Roofline model** — a chart plotting achievable performance against arithmetic intensity, with memory-bandwidth and compute-throughput ceilings
- **Ridge point** — the arithmetic intensity where a kernel transitions from memory-bound to compute-bound
- **Kernel fusion** — combining multiple operations into one kernel to cut memory round-trips
