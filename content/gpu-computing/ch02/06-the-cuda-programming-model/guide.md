# The CUDA Programming Model

Chapter 1 covered the hardware: SMs, warps, memory tiers, tensor cores. This chapter is about the software model NVIDIA built to program that hardware — CUDA (Compute Unified Device Architecture). This lesson lays out the mental model everything else in this chapter builds on: host and device, kernels, and the host/device code split in a single CUDA program.

## What you'll learn

- The host/device split: what runs on the CPU versus the GPU
- What a kernel is, and the `__global__` keyword that marks one
- The basic shape of a CUDA C++ program (allocate, copy, launch, copy back, free)
- How this relates to what PyTorch does for you automatically

## Host and device

In CUDA terminology, the **host** is the CPU and its RAM; the **device** is the GPU and its memory. A CUDA program is ordinary C++ that runs on the host, with specific functions — **kernels** — that get launched to run on the device instead. Data has to be explicitly moved between host memory and device memory; the two are physically separate pools connected by PCIe (or NVLink, covered in Chapter 5).

## Kernels and the `__global__` keyword

A kernel is a function marked `__global__`, meaning it's callable from host code but executes on the device, across many threads at once:

```cpp
__global__ void addOne(int *data, int n) {
    int i = blockIdx.x * blockDim.x + threadIdx.x;
    if (i < n) {
        data[i] += 1;
    }
}
```

Every thread that runs this kernel executes the identical code, but `threadIdx.x` and `blockIdx.x` give each thread a different value, so each one works on a different array element. You'll go deeper on this indexing in the next lesson.

## The basic shape of a CUDA program

Every CUDA C++ program follows roughly the same five steps:

```cpp
int n = 1024;
int *h_data = (int*)malloc(n * sizeof(int));     // 1. host memory
int *d_data;
cudaMalloc(&d_data, n * sizeof(int));            // 2. device memory
cudaMemcpy(d_data, h_data, n * sizeof(int), cudaMemcpyHostToDevice);  // 3. copy to device

addOne<<<(n + 255) / 256, 256>>>(d_data, n);     // 4. launch kernel

cudaMemcpy(h_data, d_data, n * sizeof(int), cudaMemcpyDeviceToHost);  // 5. copy back
cudaFree(d_data);
free(h_data);
```

Allocate on both sides, copy input to the device, launch the kernel (the `<<<...>>>` syntax specifies how many blocks and threads per block, covered next lesson), copy the result back, then free both allocations.

## What PyTorch does for you

When you write `x = torch.randn(1024, device="cuda")` or `y = x.to("cuda")`, PyTorch is doing the `cudaMalloc` and `cudaMemcpy` steps for you behind a Python API. When you call `torch.matmul(a, b)` on CUDA tensors, PyTorch is launching a highly-tuned cuBLAS kernel instead of a `<<<...>>>` launch you wrote by hand. Understanding the raw model in this chapter is what lets you reason correctly about what PyTorch is actually doing underneath, even though you rarely write `cudaMalloc` yourself in an ML codebase.

## Key terms

- **Host** — the CPU and its memory (RAM)
- **Device** — the GPU and its memory (HBM)
- **Kernel** — a `__global__` function that runs on the device across many threads
- **`cudaMalloc` / `cudaMemcpy` / `cudaFree`** — device memory allocation, host-device data transfer, and deallocation
- **Kernel launch (`<<<...>>>`)** — the syntax specifying how many blocks and threads execute a kernel
