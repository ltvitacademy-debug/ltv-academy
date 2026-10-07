# Script — Compute-Bound vs. Memory-Bound Operations

## Segment 1 (title)

Every kernel that runs on a GPU spends its time either crunching numbers or waiting on memory. Which one dominates decides what "faster" even means for that kernel — this lesson gives you the vocabulary to tell the two apart before you ever open a profiler.

## Segment 2 (steps)

Arithmetic intensity is the ratio of total FLOPs performed to total bytes moved from memory to perform them. A kernel with high arithmetic intensity does a lot of math per byte it reads, so it's compute-bound. A kernel with low arithmetic intensity moves a lot of data relative to the math done on it, so it's memory-bound — stuck waiting on the bus no matter how many cores sit idle.

## Segment 3 (code)

Matrix multiplication reuses each loaded value many times across the multiply-accumulate pattern, giving it high arithmetic intensity — it's typically compute-bound, which is exactly what tensor cores are built to accelerate. An elementwise operation like relu reads one value, does one operation, and writes one value back, so its arithmetic intensity is close to one — that makes it memory-bound.

## Segment 4 (steps)

The roofline model plots achievable performance against arithmetic intensity. Below the ridge point, a kernel is memory-bound, capped by bandwidth times arithmetic intensity no matter how well written it is. Above the ridge point, it's compute-bound, capped by the GPU's peak FLOPs per second instead.

## Segment 5 (outro)

Knowing which side of that line a kernel sits on tells you what's actually worth optimizing — more compute won't fix a memory-bound kernel, and less memory traffic won't fix a compute-bound one. Up next, lesson thirteen: memory coalescing, which is one of the biggest levers for fixing a memory-bound kernel.
