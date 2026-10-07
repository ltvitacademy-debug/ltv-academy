# Streaming Multiprocessors & CUDA Cores

Last lesson established that a GPU wins on parallelism, not clock speed. This lesson opens the box: how are those thousands of CUDA cores actually organized, and what is a "streaming multiprocessor"? Understanding this hierarchy matters because it's the physical reason CUDA code is written the way it is — in groups of threads, not one thread at a time.

## What you'll learn

- What a Streaming Multiprocessor (SM) is, and how it relates to CUDA cores
- What a warp is, and why 32 threads move together
- Why warp divergence (branching inside a warp) hurts performance
- How this hardware layout shows up when you read `nvidia-smi` or CUDA device properties

## The Streaming Multiprocessor

A GPU isn't one flat pool of CUDA cores — it's organized into **Streaming Multiprocessors (SMs)**, and each SM contains its own set of CUDA cores, registers, shared memory, and schedulers. An NVIDIA A100, for example, has 108 SMs, each with 64 FP32 CUDA cores, for a total of 6,912 cores. Every block of threads you launch in a CUDA kernel gets assigned to run on one SM, and an SM can run several blocks concurrently if it has enough resources.

You can query this from a CUDA program:

```cpp
cudaDeviceProp prop;
cudaGetDeviceProperties(&prop, 0);
printf("SMs: %d, CUDA cores/SM: %d\n", prop.multiProcessorCount, 64);
```

## Warps: the real unit of execution

Within an SM, threads don't execute one at a time or even one block at a time — they execute in groups of 32 called a **warp**. All 32 threads in a warp execute the same instruction at the same time, on their own data (this is SIMT — Single Instruction, Multiple Threads). The warp, not the thread, is the real scheduling unit on NVIDIA hardware.

This explains why thread counts in CUDA code are almost always multiples of 32. Launching a block of 100 threads doesn't waste anything conceptually, but the hardware still processes it in four warps (32+32+32+4), and that last warp runs with 28 of its lanes idle.

## Warp divergence

Because every thread in a warp executes the same instruction in lockstep, an `if`/`else` branch where threads in the same warp take different paths is expensive — the warp executes BOTH paths serially, masking off the threads that don't apply to each path. This is called **warp divergence**:

```cpp
__global__ void branchy(int *data) {
    int i = threadIdx.x;
    if (i % 2 == 0) {
        data[i] = data[i] * 2;   // even threads take this path
    } else {
        data[i] = data[i] + 1;   // odd threads take this path, serialized
    }
}
```

Here, every warp has half its threads idle during each branch's execution — a 2x slowdown compared to code where all 32 threads in a warp agree on which path to take.

## Seeing SM count on your own hardware

```
$ nvidia-smi --query-gpu=name,count --format=csv
name, count
NVIDIA A100-SXM4-80GB, 1

$ python -c "import torch; print(torch.cuda.get_device_properties(0))"
_CudaDeviceProperties(name='NVIDIA A100-SXM4-80GB', major=8, minor=0,
  total_memory=81920MB, multi_processor_count=108)
```

PyTorch's `torch.cuda.get_device_properties()` exposes `multi_processor_count` directly — that's the number of SMs on the card, the same number you'd get from the CUDA C++ `cudaDeviceProp` struct.

## Key terms

- **Streaming Multiprocessor (SM)** — a self-contained execution unit on a GPU with its own CUDA cores, registers, and schedulers
- **CUDA core** — a single arithmetic lane within an SM
- **Warp** — a group of 32 threads that execute in lockstep (SIMT)
- **SIMT (Single Instruction, Multiple Threads)** — the execution model where one instruction stream drives many threads on different data
- **Warp divergence** — the slowdown that occurs when threads within a warp take different branches, forcing serialized execution
