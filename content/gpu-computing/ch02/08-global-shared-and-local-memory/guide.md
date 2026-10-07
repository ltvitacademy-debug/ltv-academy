# Global, Shared & Local Memory

Chapter 1 introduced the memory hierarchy conceptually: registers, shared memory, L2 cache, global memory. This lesson makes it concrete in code — how you actually declare and use global memory, shared memory, and local memory from inside a CUDA kernel, and the scope rules that go with each.

## What you'll learn

- How global memory is allocated and accessed from a kernel
- How to declare and use `__shared__` memory within a block
- What "local memory" means in CUDA (and why it's not actually fast)
- The scope and lifetime rules that separate all three

## Global memory

Global memory is the large pool (HBM) allocated with `cudaMalloc` and passed into a kernel as a pointer. Any thread, in any block, can read or write any location in global memory — there's no restriction, but also no automatic cooperation; two threads writing the same location without coordination is a race condition:

```cpp
__global__ void scale(float *data, float factor, int n) {
    int i = blockIdx.x * blockDim.x + threadIdx.x;
    if (i < n) {
        data[i] = data[i] * factor;   // global memory read + write
    }
}
```

## Shared memory

Shared memory is declared with `__shared__` inside a kernel, and it's scoped to one block — every thread in that block sees the same shared array, but a different block gets its own separate copy:

```cpp
__global__ void reverseBlock(int *data) {
    __shared__ int temp[256];
    int tid = threadIdx.x;
    temp[tid] = data[tid];        // load into shared memory
    __syncthreads();              // wait for every thread to finish loading
    data[tid] = temp[255 - tid];  // read a different thread's slot, reversed
}
```

`__syncthreads()` is a barrier — it forces every thread in the block to reach that line before any of them proceeds, which matters here because thread `tid` reads a slot that a different thread wrote, and that write has to have already happened.

## Local memory

Confusingly, "local memory" in CUDA does NOT mean fast per-thread storage — that's what registers are for. Local memory is private to a single thread (like a register), but it's physically stored in the same slow global memory space, used automatically by the compiler when a thread needs more storage than fits in its allotted registers (for example, a large local array, or too many live variables):

```cpp
__global__ void bigArray(int *out) {
    int localBuffer[200];   // likely spills to local memory, not registers
    // ... use localBuffer ...
}
```

A kernel that spills heavily to local memory is effectively doing extra global-memory-speed traffic it didn't ask for — this is one of the first things a profiler like Nsight Compute (Chapter 3) will flag.

## Scope and lifetime summary

| Memory type | Scope | Lifetime | Speed |
|---|---|---|---|
| Register | One thread | One kernel launch | Fastest |
| Shared (`__shared__`) | One block | One kernel launch | Very fast |
| Local | One thread | One kernel launch | Slow (physically global) |
| Global (`cudaMalloc`) | All threads, all blocks | Until explicitly freed | Slowest |

## Key terms

- **Global memory** — the large HBM pool visible to every thread in every block
- **`__shared__` memory** — fast, on-chip memory scoped to one block
- **`__syncthreads()`** — a barrier forcing all threads in a block to reach the same point before continuing
- **Local memory** — per-thread storage that overflows into slow global-memory space when registers run out
- **Race condition** — undefined behavior from multiple threads writing the same memory location without coordination
