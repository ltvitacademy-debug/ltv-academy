# The GPU Memory Hierarchy

A GPU with thousands of cores is only fast if those cores can be fed data fast enough. This lesson covers the memory hierarchy — the different places data can live on a GPU, how big and how fast each one is, and why the gap between them shapes almost every performance decision you'll make later in this course.

## What you'll learn

- The tiers of GPU memory: registers, shared memory, L2 cache, and global (HBM) memory
- The rough size and latency trade-off at each tier
- Why "memory-bound" is the default state of most GPU kernels
- How this hierarchy appears in real CUDA code and PyTorch tensor behavior

## The tiers, fastest to slowest

- **Registers** — per-thread, the fastest possible storage, but tiny (a few hundred per thread) and private to that thread.
- **Shared memory** — per-block, on-chip, extremely fast (roughly 100x faster than global memory), but small (up to ~164KB per SM on an A100) and must be explicitly managed in CUDA C++ with `__shared__`.
- **L2 cache** — shared across the whole GPU, a few tens of MB, automatically managed, sits between the SMs and global memory.
- **Global memory (HBM)** — the large pool everyone means when they say "GPU memory" (e.g. 80GB on an A100), implemented as High Bandwidth Memory. It's the slowest tier by far relative to registers or shared memory, even though its bandwidth (~2TB/s on an A100) sounds enormous next to a CPU's RAM.

```cpp
__global__ void sumBlock(float *in, float *out) {
    __shared__ float cache[256];       // shared memory: fast, per-block
    int tid = threadIdx.x;
    cache[tid] = in[blockIdx.x * 256 + tid];   // read from global memory once
    __syncthreads();
    // ... reduce within cache, write one result per block to out
}
```

## Why "memory-bound" is the default

A CUDA core can issue a floating-point operation far faster than global memory can deliver a fresh operand to it. This imbalance — compute capacity vastly exceeding memory bandwidth — means most real kernels spend more time waiting on memory than computing, a state you'll learn to diagnose precisely in Chapter 3 ("compute-bound vs. memory-bound"). The entire reason shared memory and caching exist is to avoid going back to slow global memory more than necessary.

## Seeing this from PyTorch

PyTorch tensors live in global (HBM) memory by default once moved to a GPU. You can inspect total and currently-allocated memory:

```python
import torch
x = torch.randn(1024, 1024, device="cuda")
print(torch.cuda.memory_allocated() / 1e6, "MB allocated")
print(torch.cuda.get_device_properties(0).total_memory / 1e9, "GB total (HBM)")
```

PyTorch's internal kernels (matrix multiply, convolution) are themselves written to exploit shared memory and registers under the hood — you don't manage that tiling yourself, but it's exactly why a hand-tuned cuBLAS call outperforms a naive kernel doing the same math.

## Key terms

- **Register** — the fastest, smallest, per-thread storage tier
- **Shared memory** — fast, on-chip memory shared by all threads in a block, explicitly managed
- **L2 cache** — a GPU-wide automatic cache between SMs and global memory
- **Global memory (HBM)** — the large, slower memory pool most code means by "GPU memory"
- **Memory-bound** — a kernel whose runtime is limited by memory bandwidth rather than compute capacity
