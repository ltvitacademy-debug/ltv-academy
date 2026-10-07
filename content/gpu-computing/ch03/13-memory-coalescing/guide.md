# Memory Coalescing

A warp of 32 threads doesn't issue 32 separate memory requests when it reads global memory — the hardware tries to combine them into as few transactions as possible. Whether it can depends entirely on the pattern your threads use to access memory. This lesson covers coalescing: the single biggest lever for fixing a memory-bound kernel without changing a single FLOP of math.

## What you'll learn

- What a coalesced memory access is, and why the GPU cares about the pattern, not just the volume
- How a strided or scattered access pattern multiplies the number of memory transactions
- How array-of-structures (AoS) layouts hurt coalescing compared to structure-of-arrays (SoA)
- How to recognize and fix an uncoalesced access in a simple kernel

## What coalescing actually means

Threads in a warp execute the same instruction in lockstep, including a global memory load. If the 32 threads in a warp access 32 consecutive, aligned addresses — thread 0 reads address `k`, thread 1 reads `k+4`, thread 31 reads `k+124` — the memory controller can satisfy that entire warp with a small number of wide memory transactions. That's a **coalesced** access. If those same 32 threads instead access addresses scattered far apart, the controller has to issue a separate transaction per thread (or per small cluster of threads), and bandwidth utilization collapses even though the total number of bytes requested hasn't changed.

## Why the pattern matters more than the volume

A kernel that reads 4 bytes per thread with a coalesced pattern might use one 128-byte transaction per warp. The same kernel reading the same 4 bytes per thread with a fully scattered pattern can require up to 32 separate transactions — the GPU fetches whole cache lines to satisfy each thread's tiny request, discarding most of each line's bytes. Effective bandwidth can drop by an order of magnitude with the request volume completely unchanged. This is why two kernels with identical arithmetic intensity can have wildly different real-world throughput.

```c
// Coalesced: thread i reads index i — consecutive addresses across the warp
__global__ void coalesced(float *in, float *out) {
    int i = blockIdx.x * blockDim.x + threadIdx.x;
    out[i] = in[i] * 2.0f;
}

// Strided / uncoalesced: thread i reads index i * stride — scattered addresses
__global__ void strided(float *in, float *out, int stride) {
    int i = blockIdx.x * blockDim.x + threadIdx.x;
    out[i] = in[i * stride] * 2.0f;
}
```

## Array-of-structures vs. structure-of-arrays

A common source of accidental uncoalesced access is data layout. Given particles with `x`, `y`, `z` fields:

```c
// Array-of-structures (AoS) — accessing just .x per thread skips over y and z
struct Particle { float x, y, z; };
Particle particles[N];
// thread i reads particles[i].x — addresses are 12 bytes apart, not 4

// Structure-of-arrays (SoA) — each field is its own contiguous array
float x[N], y[N], z[N];
// thread i reads x[i] — addresses are 4 bytes apart, fully coalesced
```

AoS is the natural layout in ordinary C++ or Python code, but it spaces each thread's access 12 bytes apart instead of 4, breaking coalescing for any kernel that only touches one field. SoA keeps each field in its own contiguous array, so a kernel touching just `x` reads it with a fully coalesced pattern. This is one reason PyTorch tensors store each field as a separate contiguous array rather than an array of per-element structs.

## Recognizing the problem

The warning sign is almost always an index computed with a multiply or an indirection — `in[i * stride]`, `in[index_array[i]]`, or `particles[i].field` — instead of a plain `in[i]`. Nsight Compute, covered in a later lesson, reports a kernel's achieved memory throughput against the theoretical peak; a large gap between the two, on a kernel with otherwise low arithmetic intensity, is the classic fingerprint of poor coalescing.

## Key terms

- **Coalesced access** — a warp's memory requests that combine into few, wide memory transactions
- **Warp** — the group of 32 threads that execute in lockstep on an SM
- **Strided access** — reading memory with a fixed gap between consecutive threads' addresses, breaking coalescing
- **Array-of-structures (AoS)** — storing each record's fields together, which spaces single-field access apart
- **Structure-of-arrays (SoA)** — storing each field in its own contiguous array, which favors coalescing
- **Memory transaction** — one fetch of a fixed-size chunk (e.g. 32 or 128 bytes) from global memory
