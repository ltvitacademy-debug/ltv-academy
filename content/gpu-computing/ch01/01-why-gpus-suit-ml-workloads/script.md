# Script — Why GPUs Suit ML Workloads

## Segment 1 (title)

Welcome to GPU Computing, the first course in the AI Infrastructure track. You already know Linux and PyTorch — this course explains the hardware underneath every dot-to-cuda call you've written. We start with the basic question: why is a chip built to paint pixels also the right machine for training neural networks?

## Segment 2 (steps)

A CPU has a handful of large, complex cores built to finish one task as fast as possible, with deep pipelines and branch prediction for code full of unpredictable jumps. A GPU bets the opposite way: thousands of small, simple cores that are bad at branching but excellent at doing the same arithmetic on many pieces of data at once. That's latency-oriented versus throughput-oriented design.

## Segment 3 (code)

Here's nvidia-smi on a server with one data-center GPU. A single A100 has 6,912 CUDA cores, where a high-end server CPU has maybe 64. That hundred-times difference in core count, not clock speed, is the entire reason GPUs dominate model training.

## Segment 4 (steps)

Training a neural network is mostly matrix multiplication and element-wise operations — every output element can be computed without knowing any other element. That's data parallelism, and it's exactly the shape of workload a GPU was designed for. A GPU is a poor fit for sequential work, like parsing a config file, where each step depends on the last.

## Segment 5 (outro)

Keep that distinction in mind: throughput over latency, independent elements over sequential steps. Next up, lesson two: streaming multiprocessors and CUDA cores, where we open up the GPU and see how those thousands of cores are actually organized.
