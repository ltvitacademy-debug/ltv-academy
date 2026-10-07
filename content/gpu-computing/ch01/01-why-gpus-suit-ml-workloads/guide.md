# Why GPUs Suit ML Workloads

Welcome to GPU Computing, the first course in the AI Infrastructure / ML Systems Engineer destination. You already know Linux administration and you've trained models in PyTorch — this course pulls back the curtain on the hardware underneath every `.to('cuda')` call and every `nvidia-smi` you've glanced at without really reading. This lesson starts with the most basic question: why does a GPU, a chip originally built to paint pixels, turn out to be the right machine for training neural networks?

## What you'll learn

- The core architectural difference between a CPU and a GPU
- Why matrix multiplication and convolution map so well onto GPU hardware
- What "throughput-oriented" design means, and why it trades away per-task latency
- Where the real performance comes from: not clock speed, but parallelism

## A CPU is built to think, a GPU is built to count

A modern CPU might have 8 to 64 large, complex cores. Each core is packed with branch prediction, deep pipelines, and large caches, because its job is to run one instruction stream as fast as possible, including code full of `if` statements and unpredictable jumps. A GPU takes the opposite bet: instead of a few powerful cores, it has thousands of small, simple cores (NVIDIA calls them CUDA cores) that are bad at branching but extremely good at doing the exact same arithmetic operation on many pieces of data at once.

This is the distinction between **latency-oriented** design (CPU) and **throughput-oriented** design (GPU). A CPU tries to finish one task as quickly as possible. A GPU tries to finish thousands of tasks per second in aggregate, even if any single one of them takes longer to start.

## Why neural networks fit this model

Training a neural network is, at its core, an enormous number of matrix multiplications and element-wise operations: `Y = W @ X + b`, then an activation function applied to every element of the result independently. Every element of that output matrix can be computed without needing to know the other elements — this is called **data parallelism**, and it is exactly the workload shape a GPU was designed for.

Compare that to a web server handling a database transaction, full of conditional logic and sequential dependencies — that workload wants a CPU's branch prediction and single-thread speed, not a GPU's raw core count.

## A first look at the numbers

Here is `nvidia-smi` on a machine with a single data-center GPU, which you'll learn to read in depth in Chapter 3:

```
$ nvidia-smi
+-----------------------------------------------------------------------------------------+
| NVIDIA-SMI 550.90.07              Driver Version: 550.90.07      CUDA Version: 12.4     |
|-----------------------------------------+----------------------+----------------------+
| GPU  Name                 Persistence-M | Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp   Perf          Pwr:Usage/Cap |          Memory-Usage | GPU-Util  Compute M. |
|=========================================+======================+======================|
|   0  NVIDIA A100-SXM4-80GB          On  | 00000000:07:00.0 Off |                    0 |
| N/A   34C    P0             68W / 400W  |      0MiB /  81920MiB |      0%      Default |
+-----------------------------------------------------------------------------------------+
```

A single A100 like this one has 6,912 CUDA cores. A high-end server CPU might have 64. That 100x-plus difference in core count is the entire reason GPUs dominate ML training — not clock speed (GPU cores actually run at a lower clock than CPU cores), but sheer parallel throughput.

## What a GPU is worse at

A GPU is a poor choice for work that is inherently sequential — a chain of steps where each one depends on the previous one's output and can't be split into independent pieces, like parsing a config file or running a single-threaded loop with heavy branching. It also pays a real cost just to get started: launching a GPU kernel and moving data across the PCIe bus both take time, so very small or very short-lived workloads can finish faster on a CPU simply by skipping that overhead. The rest of this course is about running the large, parallel, GPU-shaped half of a workload well, while knowing when a step belongs back on the CPU.

## Key terms

- **CUDA core** — a single small arithmetic unit on an NVIDIA GPU; thousands run in parallel
- **Throughput-oriented design** — optimizing for total work done per second across many tasks, not the speed of any one task
- **Latency-oriented design** — optimizing for how fast a single task finishes (the CPU's priority)
- **Data parallelism** — a workload where the same operation is applied independently to many pieces of data
- **Kernel launch overhead** — the fixed cost of starting work on a GPU, which makes tiny workloads unsuited to it
