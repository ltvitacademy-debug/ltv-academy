# Writing a Simple CUDA Kernel

Every piece has been introduced separately: host/device, the launch hierarchy, global and shared memory. This lesson puts them together into one complete, working CUDA C++ program — a vector addition kernel, the "hello world" of CUDA, written and explained end to end.

## What you'll learn

- The complete structure of a compilable CUDA C++ program
- How to compile and run it with `nvcc`
- How to check for a CUDA error after a kernel launch
- Why vector addition is the canonical first CUDA example

## The full program: vector addition

```cpp
#include <stdio.h>

__global__ void vectorAdd(const float *a, const float *b, float *c, int n) {
    int i = blockIdx.x * blockDim.x + threadIdx.x;
    if (i < n) {
        c[i] = a[i] + b[i];
    }
}

int main() {
    int n = 1 << 20;                 // ~1 million elements
    size_t size = n * sizeof(float);

    float *h_a = (float*)malloc(size);
    float *h_b = (float*)malloc(size);
    float *h_c = (float*)malloc(size);
    for (int i = 0; i < n; i++) { h_a[i] = 1.0f; h_b[i] = 2.0f; }

    float *d_a, *d_b, *d_c;
    cudaMalloc(&d_a, size);
    cudaMalloc(&d_b, size);
    cudaMalloc(&d_c, size);

    cudaMemcpy(d_a, h_a, size, cudaMemcpyHostToDevice);
    cudaMemcpy(d_b, h_b, size, cudaMemcpyHostToDevice);

    int threadsPerBlock = 256;
    int blocks = (n + threadsPerBlock - 1) / threadsPerBlock;
    vectorAdd<<<blocks, threadsPerBlock>>>(d_a, d_b, d_c, n);

    cudaMemcpy(h_c, d_c, size, cudaMemcpyDeviceToHost);
    printf("c[0] = %f (expect 3.0)\n", h_c[0]);

    cudaFree(d_a); cudaFree(d_b); cudaFree(d_c);
    free(h_a); free(h_b); free(h_c);
    return 0;
}
```

Every piece from this chapter appears here: a `__global__` kernel, a global thread index with a bounds check, `cudaMalloc`/`cudaMemcpy`/`cudaFree`, and a launch with a computed block count.

## Compiling and running it

CUDA C++ is compiled with `nvcc`, NVIDIA's compiler, which handles both the host C++ code and the device kernel code in the same file:

```
$ nvcc vector_add.cu -o vector_add
$ ./vector_add
c[0] = 3.000000 (expect 3.0)
```

## Checking for errors

CUDA calls don't throw C++ exceptions — they return an error code you have to check explicitly, or the kernel can silently fail:

```cpp
cudaError_t err = cudaGetLastError();
if (err != cudaSuccess) {
    printf("CUDA error: %s\n", cudaGetErrorString(err));
}
```

It's common practice to wrap every CUDA call in a macro that checks this automatically, since a kernel launch itself doesn't block or return a value you can inspect directly — the error, if any, only shows up on the next CUDA call that does check.

## Why vector addition

Vector addition is the simplest possible kernel that's still genuinely parallel and memory-bound (it does one add per two reads and one write — very low arithmetic intensity), which makes it the standard first example: it exercises the full host/device/kernel/launch pattern without any algorithmic complexity getting in the way.

## Key terms

- **`nvcc`** — NVIDIA's CUDA compiler, handling both host and device code in one file
- **`cudaGetLastError()`** — retrieves the most recent CUDA error, since kernel launches don't return errors directly
- **Vector addition** — the canonical minimal CUDA example: one add, one read from two arrays, one write
- **`.cu` file** — the file extension for CUDA C++ source compiled by `nvcc`
