# Script — The Real Cost of GPU Idle Time

## Segment 1 (title)

MIG and time-slicing exist because of one simple, expensive fact: an idle GPU costs exactly the same as a busy one. This lesson makes that concrete with real numbers.

## Segment 2 (code)

A data-center GPU instance can run several dollars per GPU-hour, whether it's running a kernel or sitting idle. nvidia-smi's utilization numbers sitting at ten to fifteen percent for sustained periods, as shown here, is a strong signal that something upstream of the GPU is the actual bottleneck.

## Segment 3 (steps)

Idle time traces back through this whole course. A CPU-bound data loader starves the GPU between batches. A memory-bound kernel leaves the GPU waiting on HBM instead of computing. Slow inter-GPU communication leaves GPUs idle waiting on an all-reduce. And poor cluster scheduling leaves one job pending while another sits barely used.

## Segment 4 (code)

A single snapshot can be misleading — nvidia-smi dmon streams continuous numbers, and a real monitoring stack like NVIDIA DCGM averages utilization over a job's full duration, which is what actually answers whether a GPU-hour is being used well.

## Segment 5 (outro)

Every tool in this chapter exists to solve exactly this problem: keeping expensive hardware as close to continuously busy as possible. Next up, the capstone, lesson thirty-two: diagnosing a slow training job, putting every signal from this course together.
